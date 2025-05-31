import { PostgisUtils } from "@/db/utils/geography/PostgisUtils";
import { handleApiError, withAuth } from "@/lib/auth-wrapper";
import { PointService } from "@/services/features/PointService";
import { validatePoint } from "@/types/features/point";
import { sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const POST = withAuth(async (req: NextRequest, ctx) => {
	try {
		const body = await req.json();
		const validated = validatePoint.parse(body);
		const postgisQuery = PostgisUtils.createPostgisPoint(2.3522, 48.8566);
		console.log(postgisQuery);
		const payload = {
			...validated,
			location: sql.raw(postgisQuery),
		};
		console.log("bruh");
		const point = await PointService.store(payload);
		return NextResponse.json({ point, message: "Point créé avec succès" }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
});
