import { createApiHandler } from "@/lib/api-handler";
import { withAuth } from "@/lib/auth-wrapper";
import { createApiError } from "@/types/api-types";
import { postSchema } from "@/types/posts";
import { err, ok } from "neverthrow";
import { ApiError } from "next/dist/server/api-utils";

export const POST = withAuth(
	createApiHandler(
		async (req, context) => {
			const body = await req.json();
			return ok(body);
		},
		{
			body: postSchema,
		},
	),
);

export const GET = withAuth(
	createApiHandler(async (req, context) => {
		return err(createApiError("NOT_FOUND", "Not found"));
		return ok({ message: "Hello world" });
	}),
);
