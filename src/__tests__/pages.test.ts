import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("testing home page", () => {
	it("should render the home page", async () => {
		const jsx = await Home();
		render(jsx);
		expect(1).toEqual(1);
	});
});
