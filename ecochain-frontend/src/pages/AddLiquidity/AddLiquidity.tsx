import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenContract } from '@/hooks/web3/useTokenContract';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button';

const AddLiquidity: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addLiquidity, isCreating } = useTokenContract();
  const [formData, setFormData] = useState({
    x1TokenAmount: '',
    nktTokenAmount: '',
    tokenPriceUSD: '',
    tokenPriceX1: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => { /* ... validation logic from original file ... */ return true; };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { return; }
    try {
      await addLiquidity({
        x1TokenAmount: parseFloat(formData.x1TokenAmount),
        nktTokenAmount: formData.nktTokenAmount,
        tokenPriceUSD: parseFloat(formData.tokenPriceUSD),
        tokenPriceX1: parseFloat(formData.tokenPriceX1),
      });
      navigate('/listing');
    } catch (error) {
      console.error('Error adding liquidity:', error);
    }
  };

  return (
    <div className="max-w-[480px] mobile:max-w-[350px] mx-auto px-4 py-20 relative z-1">
      <h1 className="text-2xl font-semibold text-center text-primary-green dark:text-dark-accent mb-12">
        {t('addLiquidity.title')}
      </h1>
      
      <form 
        id="add-liquidity-form"
        onSubmit={handleSubmit}
        className="w-full rounded-10 bg-white dark:bg-dark-bgSecondary dark:shadow-card-dark dark:backdrop-blur-73 p-5 flex flex-col gap-4"
      >
        <Input
          label={t('addLiquidity.x1Amount')}
          name="x1TokenAmount"
          value={formData.x1TokenAmount}
          onChange={handleInputChange}
          placeholder="100 000"
          error={errors.x1TokenAmount}
          fullWidth
        />
        
        <Input
          label={t('addLiquidity.nktAmount')}
          name="nktTokenAmount"
          value={formData.nktTokenAmount}
          onChange={handleInputChange}
          placeholder="NTK"
          error={errors.nktTokenAmount}
          fullWidth
        />
        
        <Input
          label={t('addLiquidity.priceUSD')}
          name="tokenPriceUSD"
          value={formData.tokenPriceUSD}
          onChange={handleInputChange}
          placeholder="$0,004"
          error={errors.tokenPriceUSD}
          fullWidth
        />
        
        <Input
          label={t('addLiquidity.priceX1')}
          name="tokenPriceX1"
          value={formData.tokenPriceX1}
          onChange={handleInputChange}
          placeholder="4"
          error={errors.tokenPriceX1}
          fullWidth
        />
        
        <Button
          type="submit"
          disabled={isCreating}
          variant="primary"
          size="lg"
          fullWidth
          className="mt-2 !rounded-30"
        >
          {isCreating ? t('listing.loading') : t('addLiquidity.createButton')}
        </Button>
      </form>

      <button
        type="button"
        onClick={() => navigate('/listing')}
        className="w-full text-center mt-8 text-lg text-light-text50 dark:text-dark-text50 font-normal hover:text-light-text dark:hover:text-dark-text transition-colors"
      >
        {t('addLiquidity.skipButton')}
      </button>
      
      {/* Vector Background - appears at x=590px from left, y=100px from top */}
      <img
        src="/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      
      {/* Create Token Background Element - full width with 25px margins, flush with bottom */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[1000px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="/assets/Create token.svg"
          alt="Create Token Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:brightness-[0.22] dark:contrast-[1.2]"
        />
      </div>
    </div>
  );
};

export default AddLiquidity;