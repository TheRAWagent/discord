import { server } from '@prisma/client';
import {create} from 'zustand';

export type ModalType= "createServer" | "invite" | "editServer" | "members" | "createChannel";

interface ModalData{
    server?: server;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (modalType: ModalType,data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (modalType,data={}) => set({type: modalType, isOpen: true,data}),
    onClose: () => set({type: null, isOpen: false}),
}));