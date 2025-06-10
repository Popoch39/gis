"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/stores/ModalStore";
import { useEffect } from "react";

const GenericModal = () => {
	const { isOpen, content, closeDialog, clearContent } = useModalStore();

	const handleOpenChange = (open: boolean): void => {
		if (!open) {
			setTimeout(() => {
				clearContent();
			}, 150);
			closeDialog();
		}
	};

	useEffect(() => {
		if (isOpen) return;

		const timer = setTimeout(() => {
			clearContent();
		}, 150);

		return () => clearTimeout(timer);
	}, [isOpen, clearContent]);

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">{content}</DialogContent>
		</Dialog>
	);
};

export default GenericModal;
