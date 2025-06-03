"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignOutButton() {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const handleClick = async () => {
		await signOut({
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (ctx) => {
					console.log(ctx.error);
					toast.error(ctx.error.message);
				},
				onSuccess: () => {
					router.push("/auth/login");
				},
			},
		});
	};

	return (
		<Button onClick={handleClick}>
			{isPending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading...
				</>
			) : (
				"Sign Out"
			)}
		</Button>
	);
}
