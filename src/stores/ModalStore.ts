import type { ReactNode } from "react";
import { create } from "zustand";

interface ModalStoreInterface {
	isOpen: boolean;
	content?: ReactNode;
	openDialog: (content: ReactNode) => void;
	closeDialog: () => void;
	updateContent: (content: ReactNode) => void;
	clearContent: () => void;
}

export const useModalStore = create<ModalStoreInterface>((set) => ({
	isOpen: false,
	content: undefined,

	openDialog: (content) =>
		set({
			content,
			isOpen: true,
		}),

	closeDialog: () =>
		set({
			isOpen: false,
		}),

	updateContent: (content) => set({ content }),
	clearContent: () => set({ content: undefined }),
}));
