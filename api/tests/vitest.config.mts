import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Run integration test suites sequentially — each suite shares state
		// (register → login → create items → rentals → reviews)
		sequence: { concurrent: false },
		testTimeout: 15000,
	},
});
