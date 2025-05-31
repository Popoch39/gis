import { type NextRequest, NextResponse } from "next/server";
import { auth, SessionType } from "./auth";
import { ZodError } from "zod";

type ctxType = {
	params: unknown;
	session: SessionType;
};

export function withAuth(handler: (req: NextRequest, context: ctxType) => Promise<NextResponse>) {
	return async (req: NextRequest, context: ctxType) => {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session) {
			return NextResponse.json({ error: "Unauthorized", message: "You must be logged in to access this resource" }, { status: 401 });
		}

		return handler(req, { ...context, session });
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
