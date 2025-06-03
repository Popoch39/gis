import { handleApiError, withAuth } from "@/lib/auth-wrapper";
import { LayerService } from "@/services/LayerService";
import { type NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async (req: NextRequest, { _, session }) => {
  try {
    console.log(session);
    const user_id = session.user.id;
    if (!user_id) {
      throw new Error("User id is required");
    }
    const layers = await LayerService.getByUserId(user_id);
    return NextResponse.json({ layers, message: "Couches récupérées avec succès" }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
});
