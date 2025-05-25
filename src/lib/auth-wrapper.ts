import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export function withAuth<T extends { params: unknown } = { params: unknown }>(
	handler: (req: NextRequest, context: T) => Promise<NextResponse>,
) {
	return async (req: NextRequest, context: T) => {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session) {
			return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
		}

		return handler(req, { ...context, session });
	};
}
