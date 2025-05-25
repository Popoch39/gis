import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export function withAuth(handler: (req: NextRequest, context: any) => Promise<NextResponse>) {
	return async (req: NextRequest, context: any) => {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session) {
			return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
		}

		return handler(req, { ...context, session });
	};
}
