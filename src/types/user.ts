import type { user } from "@/db/schemas/auth-schemas";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type userType = InferSelectModel<typeof user>;
export type createUserType = InferInsertModel<typeof user>;
