import { ChanelType, server } from '@prisma/client';
import {create} from 'zustand';

export type ModalType= "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer";

interface ModalData{
    server?: server;
    ChannelType?: ChanelType;
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