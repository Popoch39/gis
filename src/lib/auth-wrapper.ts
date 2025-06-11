import { type NextRequest, NextResponse } from "next/server";
import { auth, type SessionType } from "./auth";
import { ZodError } from "zod";

type ctxType<T = unknown> = {
	params: Promise<T>;
	session: SessionType;
};

export function withAuth<T = unknown>(handler: (req: NextRequest, context: ctxType<T>) => Promise<NextResponse>) {
	return async (req: NextRequest, context: { params: Promise<T> }) => {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session) {
			return NextResponse.json({ error: "Unauthorized", message: "You must be logged in to access this resource" }, { status: 401 });
		}

		return handler(req, { params: context.params, session });
	};
}

export function handleApiError(error: unknown) {
	if (error instanceof ZodError) {
		return NextResponse.json({ error: "Bad Request", message: "Données invalides", details: error.errors }, { status: 400 });
	}

	if (error instanceof Error) {
		return NextResponse.json({ error: "une erreur est survenue", message: error.message }, { status: 500 });
	}

	return NextResponse.json({ error: "Internal Server Error", message: "Une erreur interne est survenue" }, { status: 500 });
}
