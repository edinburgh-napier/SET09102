/**
 * Integration tests for the SET09102 Library of Things API.
 *
 * Tests run against the live deployed Worker at BASE_URL.
 * Suites are ordered and share state via a `ctx` object that accumulates
 * tokens, IDs, etc. as the test scenario progresses:
 *
 *   register (owner + borrower)
 *     → auth/token
 *       → POST /items
 *         → POST /rentals
 *           → PATCH /rentals/{id}/status  (full state machine)
 *             → POST /reviews
 */

import { beforeAll, describe, expect, it } from "vitest";

const BASE_URL = "https://set09102-api.b-davison.workers.dev";

// Unique suffix so repeated test runs don't collide on the unique email constraint
const RUN_ID = Date.now();

// Shared test context — populated as tests progress
const ctx: {
	ownerToken: string;
	borrowerToken: string;
	ownerId: number;
	borrowerId: number;
	itemId: number;
	rentalId: number;
	reviewId: number;
} = {} as any;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function api(path: string, init?: RequestInit) {
	return fetch(`${BASE_URL}${path}`, {
		headers: { "Content-Type": "application/json" },
		...init,
	});
}

function authApi(path: string, token: string, init?: RequestInit) {
	return api(path, {
		...init,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...(init?.headers ?? {}),
		},
	});
}

async function json(res: Response) {
	return res.json();
}

// ---------------------------------------------------------------------------
// 1. Categories
// ---------------------------------------------------------------------------

describe("GET /categories", () => {
	it("returns a list of categories with id, name, slug, itemCount", async () => {
		const res = await api("/categories");
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.categories).toBeInstanceOf(Array);
		expect(body.categories.length).toBeGreaterThan(0);

		const cat = body.categories[0];
		expect(cat).toHaveProperty("id");
		expect(cat).toHaveProperty("name");
		expect(cat).toHaveProperty("slug");
		expect(cat).toHaveProperty("itemCount");
	});
});

// ---------------------------------------------------------------------------
// 2. Auth — register
// ---------------------------------------------------------------------------

describe("POST /auth/register", () => {
	it("registers the owner account and returns user details", async () => {
		const res = await api("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				firstName: "Alice",
				lastName: "Owner",
				email: `alice.owner.${RUN_ID}@test.example`,
				password: "Test1234!",
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(201);
		expect(body.id).toBeGreaterThan(0);
		expect(body.email).toBe(`alice.owner.${RUN_ID}@test.example`);
		expect(body.firstName).toBe("Alice");
		expect(body.lastName).toBe("Owner");
		expect(body).toHaveProperty("createdAt");

		ctx.ownerId = body.id;
	});

	it("registers the borrower account", async () => {
		const res = await api("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				firstName: "Bob",
				lastName: "Borrower",
				email: `bob.borrower.${RUN_ID}@test.example`,
				password: "Test1234!",
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(201);
		ctx.borrowerId = body.id;
	});

	it("returns 400 when email is already registered", async () => {
		const res = await api("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				firstName: "Alice",
				lastName: "Duplicate",
				email: `alice.owner.${RUN_ID}@test.example`,
				password: "Test1234!",
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(400);
		expect(body.message).toMatch(/email already exists/i);
	});

	it("returns 400 when password fails complexity rules", async () => {
		const res = await api("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				firstName: "Bad",
				lastName: "Password",
				email: `bad.pw.${RUN_ID}@test.example`,
				password: "weakpassword",
			}),
		});

		expect(res.status).toBe(400);
	});
});

// ---------------------------------------------------------------------------
// 3. Auth — token
// ---------------------------------------------------------------------------

describe("POST /auth/token", () => {
	it("returns a JWT token for valid owner credentials", async () => {
		const res = await api("/auth/token", {
			method: "POST",
			body: JSON.stringify({
				email: `alice.owner.${RUN_ID}@test.example`,
				password: "Test1234!",
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(typeof body.token).toBe("string");
		expect(body.token.split(".").length).toBe(3); // valid JWT structure
		expect(body.userId).toBe(ctx.ownerId);
		expect(body).toHaveProperty("expiresAt");

		ctx.ownerToken = body.token;
	});

	it("returns a JWT token for valid borrower credentials", async () => {
		const res = await api("/auth/token", {
			method: "POST",
			body: JSON.stringify({
				email: `bob.borrower.${RUN_ID}@test.example`,
				password: "Test1234!",
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(200);
		ctx.borrowerToken = body.token;
	});

	it("returns 401 for wrong password", async () => {
		const res = await api("/auth/token", {
			method: "POST",
			body: JSON.stringify({
				email: `alice.owner.${RUN_ID}@test.example`,
				password: "WrongPassword1!",
			}),
		});

		expect(res.status).toBe(401);
	});

	it("returns 401 for unknown email", async () => {
		const res = await api("/auth/token", {
			method: "POST",
			body: JSON.stringify({
				email: `nobody.${RUN_ID}@test.example`,
				password: "Test1234!",
			}),
		});

		expect(res.status).toBe(401);
	});
});

// ---------------------------------------------------------------------------
// 4. Users
// ---------------------------------------------------------------------------

describe("GET /users/me", () => {
	it("returns the authenticated user's profile", async () => {
		const res = await authApi("/users/me", ctx.ownerToken);
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.id).toBe(ctx.ownerId);
		expect(body.email).toBe(`alice.owner.${RUN_ID}@test.example`);
		expect(body).toHaveProperty("itemsListed");
		expect(body).toHaveProperty("rentalsCompleted");
	});

	it("returns 401 without a token", async () => {
		const res = await api("/users/me");
		expect(res.status).toBe(401);
	});

	it("returns 401 with an invalid token", async () => {
		const res = await authApi("/users/me", "not.a.valid.token");
		expect(res.status).toBe(401);
	});
});

describe("GET /users/{id}/profile", () => {
	it("returns a public profile by user ID", async () => {
		const res = await api(`/users/${ctx.ownerId}/profile`);
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.id).toBe(ctx.ownerId);
		expect(body.firstName).toBe("Alice");
		expect(body).toHaveProperty("reviews");
	});

	it("returns 404 for a non-existent user ID", async () => {
		const res = await api("/users/99999999/profile");
		expect(res.status).toBe(404);
	});
});

// ---------------------------------------------------------------------------
// 5. Items
// ---------------------------------------------------------------------------

describe("POST /items", () => {
	it("creates a new item listing and returns it", async () => {
		const res = await authApi("/items", ctx.ownerToken, {
			method: "POST",
			body: JSON.stringify({
				title: "Test Power Drill",
				description: "A drill for testing purposes",
				dailyRate: 8.5,
				categoryId: 1,
				latitude: 55.9533,
				longitude: -3.1883,
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(201);
		expect(body.id).toBeGreaterThan(0);
		expect(body.title).toBe("Test Power Drill");
		expect(body.dailyRate).toBe(8.5);
		expect(body.ownerId).toBe(ctx.ownerId);
		expect(body.isAvailable).toBe(true);
		expect(body.latitude).toBeCloseTo(55.9533, 4);
		expect(body.longitude).toBeCloseTo(-3.1883, 4);

		ctx.itemId = body.id;
	});

	it("returns 401 without authentication", async () => {
		const res = await api("/items", {
			method: "POST",
			body: JSON.stringify({
				title: "Unauthenticated Item",
				dailyRate: 5,
				categoryId: 1,
				latitude: 55.9,
				longitude: -3.2,
			}),
		});
		expect(res.status).toBe(401);
	});

	it("returns 400 for an invalid categoryId", async () => {
		const res = await authApi("/items", ctx.ownerToken, {
			method: "POST",
			body: JSON.stringify({
				title: "Bad Category Item",
				dailyRate: 5,
				categoryId: 99999,
				latitude: 55.9,
				longitude: -3.2,
			}),
		});
		expect(res.status).toBe(400);
	});

	it("returns 400 when title is too short", async () => {
		const res = await authApi("/items", ctx.ownerToken, {
			method: "POST",
			body: JSON.stringify({
				title: "Hi",
				dailyRate: 5,
				categoryId: 1,
				latitude: 55.9,
				longitude: -3.2,
			}),
		});
		expect(res.status).toBe(400);
	});
});

describe("GET /items", () => {
	it("returns a paginated list of items", async () => {
		const res = await api("/items");
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.items).toBeInstanceOf(Array);
		expect(body).toHaveProperty("totalItems");
		expect(body).toHaveProperty("page");
		expect(body).toHaveProperty("pageSize");
		expect(body).toHaveProperty("totalPages");
	});

	it("filters items by category slug", async () => {
		const res = await api("/items?category=tools");
		const body = await json(res);

		expect(res.status).toBe(200);
		for (const item of body.items) {
			expect(item.category.toLowerCase()).toBe("tools");
		}
	});

	it("respects pageSize parameter", async () => {
		const res = await api("/items?pageSize=2");
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.items.length).toBeLessThanOrEqual(2);
		expect(body.pageSize).toBe(2);
	});
});

describe("GET /items/nearby", () => {
	it("returns items near Edinburgh city centre with distance", async () => {
		const res = await api("/items/nearby?lat=55.9533&lon=-3.1883&radius=50");
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.items).toBeInstanceOf(Array);
		expect(body.searchLocation.latitude).toBeCloseTo(55.9533, 4);
		expect(body.searchLocation.longitude).toBeCloseTo(-3.1883, 4);
		expect(body.radius).toBe(50);
		expect(body).toHaveProperty("totalResults");

		if (body.items.length > 0) {
			const item = body.items[0];
			expect(item).toHaveProperty("distance");
			expect(item).toHaveProperty("latitude");
			expect(item).toHaveProperty("longitude");
			// Items should be ordered by distance ascending
			for (let i = 1; i < body.items.length; i++) {
				expect(body.items[i].distance).toBeGreaterThanOrEqual(body.items[i - 1].distance);
			}
		}
	});

	it("returns 400 for out-of-range latitude", async () => {
		const res = await api("/items/nearby?lat=999&lon=0&radius=5");
		expect(res.status).toBe(400);
	});

	it("returns 400 when lat/lon are missing", async () => {
		const res = await api("/items/nearby?radius=5");
		expect(res.status).toBe(400);
	});
});

describe("GET /items/{id}", () => {
	it("returns full item details including reviews array", async () => {
		const res = await api(`/items/${ctx.itemId}`);
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.id).toBe(ctx.itemId);
		expect(body.title).toBe("Test Power Drill");
		expect(body.ownerId).toBe(ctx.ownerId);
		expect(body).toHaveProperty("reviews");
		expect(body.reviews).toBeInstanceOf(Array);
		expect(body).toHaveProperty("totalReviews");
		expect(body).toHaveProperty("latitude");
		expect(body).toHaveProperty("longitude");
	});

	it("returns 404 for a non-existent item", async () => {
		const res = await api("/items/99999999");
		expect(res.status).toBe(404);
	});
});

describe("PUT /items/{id}", () => {
	it("allows the owner to update their item", async () => {
		const res = await authApi(`/items/${ctx.itemId}`, ctx.ownerToken, {
			method: "PUT",
			body: JSON.stringify({ dailyRate: 12.0 }),
		});
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.dailyRate).toBe(12);
	});

	it("returns 403 when a non-owner tries to update", async () => {
		const res = await authApi(`/items/${ctx.itemId}`, ctx.borrowerToken, {
			method: "PUT",
			body: JSON.stringify({ dailyRate: 1.0 }),
		});
		expect(res.status).toBe(403);
	});
});

// ---------------------------------------------------------------------------
// 6. Rentals
// ---------------------------------------------------------------------------

describe("POST /rentals", () => {
	it("borrower creates a rental request", async () => {
		const start = new Date(Date.now() + 7 * 86400000); // +7 days
		const end   = new Date(Date.now() + 9 * 86400000); // +9 days
		const fmt   = (d: Date) => d.toISOString().slice(0, 10);

		const res = await authApi("/rentals", ctx.borrowerToken, {
			method: "POST",
			body: JSON.stringify({
				itemId: ctx.itemId,
				startDate: fmt(start),
				endDate: fmt(end),
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(201);
		expect(body.id).toBeGreaterThan(0);
		expect(body.itemId).toBe(ctx.itemId);
		expect(body.borrowerId).toBe(ctx.borrowerId);
		expect(body.status).toBe("Requested");
		expect(body.totalPrice).toBeGreaterThan(0);

		ctx.rentalId = body.id;
	});

	it("returns 400 when borrower tries to rent their own item", async () => {
		const start = new Date(Date.now() + 20 * 86400000);
		const end   = new Date(Date.now() + 22 * 86400000);
		const fmt   = (d: Date) => d.toISOString().slice(0, 10);

		const res = await authApi("/rentals", ctx.ownerToken, {
			method: "POST",
			body: JSON.stringify({
				itemId: ctx.itemId,
				startDate: fmt(start),
				endDate: fmt(end),
			}),
		});
		expect(res.status).toBe(400);
	});

	it("returns 400 when end date is before start date", async () => {
		const res = await authApi("/rentals", ctx.borrowerToken, {
			method: "POST",
			body: JSON.stringify({
				itemId: ctx.itemId,
				startDate: "2030-06-10",
				endDate: "2030-06-08",
			}),
		});
		expect(res.status).toBe(400);
	});
});

describe("GET /rentals/incoming", () => {
	it("returns the owner's incoming rental requests", async () => {
		const res = await authApi("/rentals/incoming", ctx.ownerToken);
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.rentals).toBeInstanceOf(Array);
		const ourRental = body.rentals.find((r: any) => r.id === ctx.rentalId);
		expect(ourRental).toBeDefined();
		expect(ourRental.status).toBe("Requested");
	});

	it("returns 401 without a token", async () => {
		const res = await api("/rentals/incoming");
		expect(res.status).toBe(401);
	});
});

describe("GET /rentals/outgoing", () => {
	it("returns the borrower's outgoing rental requests", async () => {
		const res = await authApi("/rentals/outgoing", ctx.borrowerToken);
		const body = await json(res);

		expect(res.status).toBe(200);
		const ourRental = body.rentals.find((r: any) => r.id === ctx.rentalId);
		expect(ourRental).toBeDefined();
		expect(ourRental.status).toBe("Requested");
	});
});

describe("GET /rentals/{id}", () => {
	it("returns rental details to the owner", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}`, ctx.ownerToken);
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.id).toBe(ctx.rentalId);
		expect(body.itemId).toBe(ctx.itemId);
		expect(body.borrowerId).toBe(ctx.borrowerId);
		expect(body.ownerId).toBe(ctx.ownerId);
	});

	it("returns 403 to an unrelated user", async () => {
		// Register a third user who has no relation to this rental
		await api("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				firstName: "Eve",
				lastName: "Outsider",
				email: `eve.${RUN_ID}@test.example`,
				password: "Test1234!",
			}),
		});
		const tokenRes = await api("/auth/token", {
			method: "POST",
			body: JSON.stringify({ email: `eve.${RUN_ID}@test.example`, password: "Test1234!" }),
		});
		const { token } = await json(tokenRes);

		const res = await authApi(`/rentals/${ctx.rentalId}`, token);
		expect(res.status).toBe(403);
	});
});

// ---------------------------------------------------------------------------
// 7. Rental state machine
// ---------------------------------------------------------------------------

describe("PATCH /rentals/{id}/status — state machine", () => {
	it("409 — invalid transition: Requested → Completed", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.ownerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Completed" }),
		});
		expect(res.status).toBe(409);
	});

	it("403 — borrower cannot approve (owner action)", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.borrowerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Approved" }),
		});
		expect(res.status).toBe(403);
	});

	it("200 — owner approves: Requested → Approved", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.ownerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Approved" }),
		});
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.status).toBe("Approved");
	});

	it("409 — cannot go backwards: Approved → Requested", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.ownerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Requested" }),
		});
		expect(res.status).toBe(409);
	});

	it("200 — owner marks as Out for Rent: Approved → Out for Rent", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.ownerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Out for Rent" }),
		});
		expect(res.status).toBe(200);
		expect((await json(res)).status).toBe("Out for Rent");
	});

	it("403 — owner cannot return (borrower action)", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.ownerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Returned" }),
		});
		expect(res.status).toBe(403);
	});

	it("200 — borrower marks as Returned: Out for Rent → Returned", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.borrowerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Returned" }),
		});
		expect(res.status).toBe(200);
		expect((await json(res)).status).toBe("Returned");
	});

	it("200 — owner completes: Returned → Completed", async () => {
		const res = await authApi(`/rentals/${ctx.rentalId}/status`, ctx.ownerToken, {
			method: "PATCH",
			body: JSON.stringify({ status: "Completed" }),
		});
		expect(res.status).toBe(200);
		expect((await json(res)).status).toBe("Completed");
	});

	it("item becomes available again after Completed", async () => {
		const res = await api(`/items/${ctx.itemId}`);
		const body = await json(res);
		expect(body.isAvailable).toBe(true);
	});
});

// ---------------------------------------------------------------------------
// 8. Reviews
// ---------------------------------------------------------------------------

describe("POST /reviews", () => {
	it("borrower submits a review for the completed rental", async () => {
		const res = await authApi("/reviews", ctx.borrowerToken, {
			method: "POST",
			body: JSON.stringify({
				rentalId: ctx.rentalId,
				rating: 5,
				comment: "Excellent item, highly recommended!",
			}),
		});
		const body = await json(res);

		expect(res.status).toBe(201);
		expect(body.id).toBeGreaterThan(0);
		expect(body.rentalId).toBe(ctx.rentalId);
		expect(body.reviewerId).toBe(ctx.borrowerId);
		expect(body.rating).toBe(5);

		ctx.reviewId = body.id;
	});

	it("returns 409 when trying to review the same rental twice", async () => {
		const res = await authApi("/reviews", ctx.borrowerToken, {
			method: "POST",
			body: JSON.stringify({ rentalId: ctx.rentalId, rating: 3 }),
		});
		expect(res.status).toBe(409);
	});

	it("returns 403 if the owner tries to review (not the borrower)", async () => {
		// Need a second completed rental to attempt this
		// We'll just check the rejection on the existing rental
		const res = await authApi("/reviews", ctx.ownerToken, {
			method: "POST",
			body: JSON.stringify({ rentalId: ctx.rentalId, rating: 4 }),
		});
		expect(res.status).toBe(403);
	});

	it("returns 400 for rating outside 1–5", async () => {
		const res = await authApi("/reviews", ctx.borrowerToken, {
			method: "POST",
			body: JSON.stringify({ rentalId: ctx.rentalId, rating: 6 }),
		});
		expect(res.status).toBe(400);
	});
});

describe("GET /items/{id}/reviews", () => {
	it("returns reviews for the item including our new review", async () => {
		const res = await api(`/items/${ctx.itemId}/reviews`);
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.reviews).toBeInstanceOf(Array);
		expect(body.totalReviews).toBeGreaterThanOrEqual(1);
		expect(body).toHaveProperty("averageRating");
		expect(body).toHaveProperty("totalPages");

		const ourReview = body.reviews.find((r: any) => r.id === ctx.reviewId);
		expect(ourReview).toBeDefined();
		expect(ourReview.rating).toBe(5);
	});
});

describe("GET /users/{id}/reviews", () => {
	it("returns reviews for the owner's items", async () => {
		const res = await api(`/users/${ctx.ownerId}/reviews`);
		const body = await json(res);

		expect(res.status).toBe(200);
		expect(body.reviews).toBeInstanceOf(Array);
		expect(body.totalReviews).toBeGreaterThanOrEqual(1);
		expect(body).toHaveProperty("averageRating");

		const ourReview = body.reviews.find((r: any) => r.id === ctx.reviewId);
		expect(ourReview).toBeDefined();
		expect(ourReview.itemId).toBe(ctx.itemId);
	});
});
