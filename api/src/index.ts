import { ApiException, fromHono } from "chanfana";
import { Hono } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import type { Env } from "./types";

// Auth
import { RegisterEndpoint } from "./endpoints/auth/register";
import { TokenEndpoint } from "./endpoints/auth/token";

// Users
import { MeEndpoint } from "./endpoints/users/me";
import { UserProfileEndpoint } from "./endpoints/users/profile";

// Categories
import { CategoriesListEndpoint } from "./endpoints/categories/list";

// Items
import { ItemsListEndpoint } from "./endpoints/items/list";
import { ItemsNearbyEndpoint } from "./endpoints/items/nearby";
import { ItemGetEndpoint } from "./endpoints/items/get";
import { ItemCreateEndpoint } from "./endpoints/items/create";
import { ItemUpdateEndpoint } from "./endpoints/items/update";

// Rentals
import { RentalCreateEndpoint } from "./endpoints/rentals/create";
import { RentalsIncomingEndpoint } from "./endpoints/rentals/incoming";
import { RentalsOutgoingEndpoint } from "./endpoints/rentals/outgoing";
import { RentalGetEndpoint } from "./endpoints/rentals/get";
import { RentalUpdateStatusEndpoint } from "./endpoints/rentals/update-status";

// Reviews
import { ReviewCreateEndpoint } from "./endpoints/reviews/create";
import { ItemReviewsEndpoint } from "./endpoints/reviews/item-reviews";
import { UserReviewsEndpoint } from "./endpoints/reviews/user-reviews";

const app = new Hono<{ Bindings: Env }>();

app.onError((err, c) => {
	if (err instanceof ApiException) {
		return c.json(
			{ success: false, errors: err.buildResponse() },
			err.status as ContentfulStatusCode,
		);
	}
	console.error("Unhandled error:", err);
	return c.json({ error: "Internal Server Error", message: "An unexpected error occurred" }, 500);
});

const openapi = fromHono(app, {
	docs_url: "/",
	schema: {
		info: {
			title: "SET09102 Library of Things API",
			version: "1.0.0",
			description:
				"Shared REST API for the SET09102 'Library of Things' coursework. " +
				"Students connect their .NET MAUI apps to this hosted endpoint — no SSH tunnel required.",
		},
	},
});

// Auth
openapi.post("/auth/register", RegisterEndpoint);
openapi.post("/auth/token", TokenEndpoint);

// Users
openapi.get("/users/me", MeEndpoint);
openapi.get("/users/:id/profile", UserProfileEndpoint);

// Categories
openapi.get("/categories", CategoriesListEndpoint);

// Items — /nearby must be registered before /:id so the router matches correctly
openapi.get("/items/nearby", ItemsNearbyEndpoint);
openapi.get("/items", ItemsListEndpoint);
openapi.get("/items/:id", ItemGetEndpoint);
openapi.post("/items", ItemCreateEndpoint);
openapi.put("/items/:id", ItemUpdateEndpoint);

// Item reviews
openapi.get("/items/:id/reviews", ItemReviewsEndpoint);

// Rentals
openapi.post("/rentals", RentalCreateEndpoint);
openapi.get("/rentals/incoming", RentalsIncomingEndpoint);
openapi.get("/rentals/outgoing", RentalsOutgoingEndpoint);
openapi.get("/rentals/:id", RentalGetEndpoint);
openapi.patch("/rentals/:id/status", RentalUpdateStatusEndpoint);

// Reviews
openapi.post("/reviews", ReviewCreateEndpoint);
openapi.get("/users/:id/reviews", UserReviewsEndpoint);

export default app;
