import {create} from 'zustand';

export type ModalType= "createServer";

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    onOpen: (modalType: ModalType) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (modalType) => set({type: modalType, isOpen: true}),
    onClose: () => set({type: null, isOpen: false}),
}));