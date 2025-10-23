// src/components/features/CreateTokenModal.tsx

import { useModalStore } from '@/store/useModalStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button';

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
      showCloseButton={false}
    >
      <div className="flex flex-col gap-[20px]">
        <Button
          onClick={handleLaunchWithoutLiquidity}
          variant="primary"
          size="lg"
          className="!rounded-35"
        >
          {t('modal.withoutLiquidity')}
        </Button>
        
        <Button
          onClick={handleLaunchWithLiquidity}
          variant="outline"
          size="lg"
          className="!rounded-35"
        >
          {t('modal.withLiquidity')}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateTokenModal;