import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { ok, err } from "neverthrow";
import { ApiError, type ApiResult, createApiError } from "@/types/api-types";
import type { RequestValidation } from "@/lib/api-handler";

export async function validateRequest(
	req: NextRequest,
	context: { params?: unknown },
	validation: RequestValidation,
): Promise<ApiResult<void>> {
	try {
		if (validation.body && req.method !== "GET") {
			const body = await req.json();
			validation.body.parse(body);
			if (validation.query) {
				const url = new URL(req.url);
				const query = Object.fromEntries(url.searchParams.entries());
				validation.query.parse(query);
			}

			if (validation.params && context.params) {
				validation.params.parse(context.params);
			}
		}
		return ok(undefined);
	} catch (error) {
		if (error instanceof ZodError) {
			return err(
				createApiError(
					"VALIDATION_ERROR",
					"Données invalides",
					error.errors, // On passe les détails de l'erreur Zod
				),
			);
		}

		return err(createApiError("VALIDATION_ERROR", "Erreur de validation"));
	}
}

export function getStatusFromError(error: ApiError): number {
	switch (error.code) {
		case "VALIDATION_ERROR":
			return 400;
		case "NOT_FOUND":
			return 404;
		case "UNAUTHORIZED":
			return 401;
		case "FORBIDDEN":
			return 403;
		case "CONFLICT":
			return 409;
		default:
			return 500;
	}
}
