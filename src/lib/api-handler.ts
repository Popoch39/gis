import type { ApiResult } from "@/types/api-types";
import { NextResponse, type NextRequest } from "next/server";
import type { ZodSchema } from "zod";
import { getStatusFromError, validateRequest } from "./validate-request";

export type RouteHandler<T = any> = (req: NextRequest, context: { params?: any }) => Promise<ApiResult<T>>;

export type RequestValidation = {
	body?: ZodSchema;
	query?: ZodSchema;
	params?: ZodSchema;
};

export function createApiHandler<T>(handler: RouteHandler<T>, validation?: RequestValidation) {
	return async (req: NextRequest, context: { params?: any }) => {
		try {
			if (validation) {
				const validationResult = await validateRequest(req, context, validation);
				if (validationResult.isErr()) {
					return NextResponse.json({ error: validationResult.error }, { status: 400 });
				}
			}

			const result = await handler(req, context);

			if (result.isErr()) {
				const status = getStatusFromError(result.error);
				return NextResponse.json({ error: result.error }, { status });
			}

			return NextResponse.json({ data: result.value });
		} catch (error) {
			console.error("API Error:", error);
			return NextResponse.json(
				{
					error: {
						code: "INTERNAL_ERROR",
						message: "Une erreur interne est survenue",
					},
				},
				{ status: 500 },
			);
		}
	};
}
