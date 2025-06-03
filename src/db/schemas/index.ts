import * as authSchemas from "./auth-schemas";
import * as layerSchema from "./layer-schema";
import * as pointSchema from "./point-schema";

export * from "./auth-schemas";
export * from "./layer-schema";
export * from "./point-schema";

export const schema = {
	...authSchemas,
	...layerSchema,
	...pointSchema,
};
