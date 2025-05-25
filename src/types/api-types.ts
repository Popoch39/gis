import type { Result } from "neverthrow";
export type ApiError = {
	code: string;
	message: string;
	details: any;
};

export type ApiResult<T> = Result<T, ApiError>;

export const createApiError = (code: string, message: string, details?: any): ApiError => ({
	code,
	message,
	details,
});
