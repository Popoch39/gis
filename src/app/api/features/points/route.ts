// import { PostgisUtils } from "@/db/utils/geography/PostgisUtils";
// import { PointService } from "@/services/features/PointService";
// import { createPointType, validatePoint } from "@/types/features/point";
// import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async () => {
	return NextResponse.json({ hello: "world" });
};

// export const POST = withAuth(async () => {
// 	try {
// 		console.log("test");
// 		return NextResponse.json({ hello: "world" });
// 		// const body = await req.json();
// 		//
// 		// const validated = validatePoint.parse(body);
// 		// const postgisQuery = PostgisUtils.createPostgisPoint(2.3522, 48.8566);
// 		// console.log(postgisQuery);
// 		// const payload = {
// 		// 	...validated,
// 		// 	location: sql.raw(postgisQuery),
// 		// };
// 		// const point = await PointService.store(payload);
// 		// return NextResponse.json({ point, message: "Point créé avec succès" }, { status: 200 });
// 	} catch (error) {
// 		return handleApiError(error);
// 	}
// });
