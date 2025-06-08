import axios, { type AxiosError } from "axios";

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const message = (error.response?.data as any)?.message || error.message || "Une erreur est survenue";
		return Promise.reject(new Error(message));
	},
);
