// src/pages/AddLiquidity/AddLiquidity.tsx
// 
// PURPOSE: Liquidity addition form for token creators
// RESPONSIBILITY: Allows users to add liquidity to their tokens
// IMPLEMENTS: Liquidity management specifications from design system
// 
// KEY FEATURES:
// - Form validation with error messages
// - Shake animation on validation error
// - Loading states during submission
// - Skip option to bypass liquidity addition
// - Proper input formatting
// - Responsive design
// 
// SPECIFICATION COMPLIANCE:
// - Container: 480px desktop, 350px mobile
// - Form fields with proper styling and validation
// - Buttons: "Create token" (green) and "Skip" (text)
// - Validation: required fields with error messages

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenContract } from '@/hooks/web3/useTokenContract';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input/Input';

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
    let processedValue = value;
    
    // Format number inputs (remove non-numeric except decimal point)
    if (name === 'x1TokenAmount' || name === 'nktTokenAmount') {
      processedValue = value.replace(/[^\d.]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.x1TokenAmount) newErrors.x1TokenAmount = 'Amount is required';
    else {
      const amount = parseFloat(formData.x1TokenAmount);
      if (isNaN(amount) || amount <= 0) newErrors.x1TokenAmount = 'Amount must be greater than 0';
    }
    
    if (!formData.nktTokenAmount) newErrors.nktTokenAmount = 'Amount is required';
    else {
      const amount = parseFloat(formData.nktTokenAmount);
      if (isNaN(amount) || amount <= 0) newErrors.nktTokenAmount = 'Amount must be greater than 0';
    }
    
    if (!formData.tokenPriceUSD) newErrors.tokenPriceUSD = 'Price is required';
    else {
      const price = parseFloat(formData.tokenPriceUSD);
      if (isNaN(price) || price < 0.0001) newErrors.tokenPriceUSD = 'Price must be at least 0.0001';
    }
    
    if (!formData.tokenPriceX1) newErrors.tokenPriceX1 = 'Price is required';
    else {
      const price = parseFloat(formData.tokenPriceX1);
      if (isNaN(price) || price < 0.01) newErrors.tokenPriceX1 = 'Price must be at least 0.01';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      // Add shake animation to form
      const form = document.getElementById('add-liquidity-form');
      if (form) {
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 400);
      }
      return;
    }
    
    try {
      await addLiquidity({
        x1TokenAmount: parseFloat(formData.x1TokenAmount),
        nktTokenAmount: formData.nktTokenAmount,
        tokenPriceUSD: parseFloat(formData.tokenPriceUSD),
        tokenPriceX1: parseFloat(formData.tokenPriceX1),
      });
      
      // On success, navigate to listing
      navigate('/listing');
    } catch (error) {
      console.error('Error adding liquidity:', error);
      // In a real app, show error message to user
    }
  };

  return (
    <div className="max-w-[480px] mobile:max-w-[350px] mx-auto px-[25px] pt-[80px] mobile:pt-[60px] relative z-1">
      <h1 className="text-3xl mobile:text-2xl font-semibold text-center text-primary-green dark:text-dark-accent mb-[60px] mobile:mb-10">
        {t('addLiquidity.title')}
      </h1>
      
      <form 
        id="add-liquidity-form"
        onSubmit={handleSubmit}
        className="w-[480px] mobile:w-[350px] rounded-10 bg-white dark:bg-[rgba(217,217,217,0.05)] dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-5 mobile:p-4"
      >
        {/* X1 Token Amount */}
        <Input
          label={t('addLiquidity.x1Amount')}
          name="x1TokenAmount"
          type="number"
          value={formData.x1TokenAmount}
          onChange={handleInputChange}
          placeholder="100 000"
          error={errors.x1TokenAmount}
          fullWidth
        />
        
        {/* NKT Token Amount */}
        <Input
          label={t('addLiquidity.nktAmount')}
          name="nktTokenAmount"
          type="number"
          value={formData.nktTokenAmount}
          onChange={handleInputChange}
          placeholder="NTK"
          error={errors.nktTokenAmount}
          fullWidth
          className="mt-3"
        />
        
        {/* Token Price (USD) */}
        <Input
          label={t('addLiquidity.priceUSD')}
          name="tokenPriceUSD"
          type="number"
          step="0.0001"
          value={formData.tokenPriceUSD}
          onChange={handleInputChange}
          placeholder="$0,004"
          error={errors.tokenPriceUSD}
          fullWidth
          className="mt-3"
        />
        
        {/* Token Price (X1) */}
        <Input
          label={t('addLiquidity.priceX1')}
          name="tokenPriceX1"
          type="number"
          value={formData.tokenPriceX1}
          onChange={handleInputChange}
          placeholder="4"
          error={errors.tokenPriceX1}
          fullWidth
          className="mt-3"
        />
        
        {/* Create Token Button */}
        <button
          type="submit"
          disabled={isCreating}
          className="w-full h-[50px] mobile:h-[48px] bg-primary-green rounded-30 flex items-center justify-center mt-5"
        >
          {isCreating ? t('listing.loading') : t('addLiquidity.createButton')}
        </button>
        
        {/* Skip Button */}
        <button
          type="button"
          onClick={() => navigate('/listing')}
          className="w-full text-center mt-[30px] text-2xl mobile:text-xl text-white dark:text-light-text font-normal"
        >
          {t('addLiquidity.skipButton')}
        </button>
      </form>
    </div>
  );
};

export default AddLiquidity;