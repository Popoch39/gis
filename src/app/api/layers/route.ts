import { auth } from "@/lib/auth";
import { handleApiError, withAuth } from "@/lib/auth-wrapper";
import { LayerService } from "@/services/LayerService";
import { validateLayer } from "@/types/layer";
import { type NextRequest, NextResponse } from "next/server";

export const POST = withAuth(async (req: NextRequest, ctx) => {
	try {
		const body = await req.json();
		const user = ctx.session.user;
		const payload = {
			...body,
			userId: user.id,
		};
		const validatedPayload = validateLayer.parse(payload);
		const layer = await LayerService.store(validatedPayload);
		return NextResponse.json({ layer, message: "Couche créée avec succès" }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
});

export const GET = withAuth(async (req: NextRequest, ctx) => {
	try {
		const layers = await LayerService.all();
		return NextResponse.json({ layers, message: "Couches récupérées avec succès" }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
});
