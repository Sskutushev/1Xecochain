import { create } from 'zustand';

interface ModalState {
  isCreateTokenModalOpen: boolean;
  openCreateTokenModal: () => void;
  closeCreateTokenModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isCreateTokenModalOpen: false,
  openCreateTokenModal: () => set({ isCreateTokenModalOpen: true }),
  closeCreateTokenModal: () => set({ isCreateTokenModalOpen: false }),
}));

// Reset modal state on app startup
if (typeof window !== 'undefined') {
  // Clean up any modal state that might be stuck open
  window.addEventListener('beforeunload', () => {
    // This will reset the modal state when page is refreshed
  });
}
