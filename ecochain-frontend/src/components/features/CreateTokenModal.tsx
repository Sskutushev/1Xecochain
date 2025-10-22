// src/components/features/CreateTokenModal.tsx

import { useModalStore } from '@/store/useModalStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';

const CreateTokenModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isOpen = useModalStore((state) => state.isCreateTokenModalOpen);
  const closeModal = useModalStore((state) => state.closeCreateTokenModal);

  const handleLaunchWithoutLiquidity = () => {
    closeModal();
    navigate('/create-token');
  };

  const handleLaunchWithLiquidity = () => {
    closeModal();
    navigate('/add-liquidity');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={t('modal.createTitle')}
      size="md"
    >
      <div className="flex flex-col gap-[35px]">
        <button
          onClick={handleLaunchWithoutLiquidity}
          className="w-full h-[50px] bg-primary-green rounded-35 flex items-center justify-center"
        >
          <span className="text-sm font-semibold text-white">
            {t('modal.withoutLiquidity')}
          </span>
        </button>
        
        <button
          onClick={handleLaunchWithLiquidity}
          className="w-full h-[50px] bg-transparent border-2 border-primary-green dark:border-white rounded-35 flex items-center justify-center"
        >
          <span className="text-sm font-semibold text-primary-green dark:text-white">
            {t('modal.withLiquidity')}
          </span>
        </button>
      </div>
    </Modal>
  );
};

export default CreateTokenModal;