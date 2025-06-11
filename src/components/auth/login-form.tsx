"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSignInOAuth from "@/hooks/use-sign-in-oAuth";
import { Globe } from "../magicui/globe";

export default function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	const router = useRouter();

	const [isPending, setIsPending] = useState(false);
	const { handleSignIn, isOAuthPending } = useSignInOAuth();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		console.log({ email, password });
		await signIn.email(
			{
				email,
				password,
			},
			{
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (ctx) => {
					setError(ctx.error.message);
				},
				onSuccess: () => {
					toast.success("Login successful. Welcome back ! 👋");
					router.push("/");
				},
			},
		);
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold">Welcome back</h1>
								<p className="text-balance text-muted-foreground">Login to your Acme Inc account</p>
							</div>
							<div className="grid gap-2">
								{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									className={error ? "border-red-500" : ""}
									onChange={() => setError(null)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<a href="/auth/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
										Forgot your password?
									</a>
								</div>
								<Input id="password" name="password" type="password" required className={error ? "border-red-500" : ""} onChange={() => setError(null)} />
							</div>
							<Button type="submit" className="w-full">
								{isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									</>
								) : (
									"Login"
								)}
							</Button>
							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<Button variant="outline" className="w-full cursor-pointer" onClick={() => handleSignIn("github")}>
									{!isOAuthPending ? (
										<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
											<g id="SVGRepo_bgCarrier" stroke-width="0" />
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
											<g id="SVGRepo_iconCarrier">
												{" "}
												<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													{" "}
													<g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#ffffff">
														{" "}
														<g id="icons" transform="translate(56.000000, 160.000000)">
															{" "}
															<path
																d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
																id="github-[#142]"
															>
																{" "}
															</path>{" "}
														</g>{" "}
													</g>{" "}
												</g>{" "}
											</g>
										</svg>
									) : (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									<span className="sr-only">Login with Apple</span>
								</Button>
								<Button variant="outline" className="w-full cursor-pointer" onClick={() => handleSignIn("google")}>
									{!isOAuthPending ? (
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
											<path
												d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
												fill="currentColor"
											/>
										</svg>
									) : (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									<span className="sr-only">Login with Google</span>
								</Button>
								<Button variant="outline" className="w-full cursor-pointer" onMouseDown={() => handleSignIn("discord")}>
									{!isOAuthPending ? (
										<svg viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
											<g id="SVGRepo_bgCarrier" stroke-width="0" />
											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
											<g id="SVGRepo_iconCarrier">
												<g>
													<path
														d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
														fill="#ffffff"
														fill-rule="nonzero"
													/>
												</g>
											</g>
										</svg>
									) : (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									<span className="sr-only">Login with Meta</span>
								</Button>
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link href="/auth/register" className="underline underline-offset-4">
									Sign up
								</Link>
							</div>
						</div>
					</form>
					<div className="relative bg-muted flex items-center justify-center">
						<Globe />
					</div>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
