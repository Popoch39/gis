import { useModalStore } from "@/stores/ModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { DialogFooter, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { createLayerForm, type LayerType, type createLayerFormType } from "@/types/layer";
import { apiClient } from "@/lib/api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const CreateLayerModal = () => {
	const { closeDialog } = useModalStore();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<createLayerFormType>({
		resolver: zodResolver(createLayerForm),
	});

	const onSubmit = async (data: createLayerFormType) => {
		try {
			await apiClient.post<LayerType>("/layers", data);
			queryClient.invalidateQueries({ queryKey: ["layers"] });
			reset();
			closeDialog();
			toast.success("La couche a été créée avec succès !");
		} catch (error: unknown) {
			if (error instanceof AxiosError || error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Une erreur est survenu lors de la creation de la couche.");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<DialogHeader>
				<DialogTitle>Créer une couche</DialogTitle>
			</DialogHeader>
			<div className="grid gap-4 my-6">
				<div className="grid gap-3">
					<Label htmlFor="name">Nom de la couche</Label>
					<Input {...register("name")} name="name" id="name" />
					{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
				</div>
			</div>
			<DialogFooter>
				<Button variant="outline" onMouseDown={closeDialog}>
					Annuler
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{!isSubmitting ? "Créer la couche" : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				</Button>
			</DialogFooter>
		</form>
	);
};

export default CreateLayerModal;
