// src/pages/CreateToken/CreateToken.tsx
// 
// PURPOSE: Token creation form page with image upload and validation
// RESPONSIBILITY: Allows users to create new tokens with required information
// IMPLEMENTS: Token creation specifications from design system
// 
// KEY FEATURES:
// - Image upload with preview
// - Form validation with error messages
// - Shake animation on validation error
// - Loading states during submission
// - Proper input formatting (symbol uppercase, emission number formatting)
// - Responsive design
// 
// SPECIFICATION COMPLIANCE:
// - Container: 480px desktop, 350px mobile
// - Form fields with proper styling and validation
// - Button: "Create token" with green styling
// - Image upload: circular avatar display
// - Validation: required fields with error messages

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenContract } from '@/hooks/web3/useTokenContract';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input/Input';

const CreateToken: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createToken, isCreating } = useTokenContract();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    emission: '',
    info: '',
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Format emission with spaces for thousands
    if (name === 'emission') {
      processedValue = value.replace(/\D/g, ''); // Only numbers
      // Add spaces for thousands: 1000000 -> 1 000 000
      if (processedValue.length > 3) {
        // Use regex to add space every 3 digits from the right
        processedValue = processedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      }
    }
    
    // Automatically convert symbol to uppercase
    if (name === 'symbol') {
      processedValue = value.toUpperCase();
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: 'Invalid file type. Please upload PNG, JPG, or SVG.'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'File size too large. Maximum 5MB.'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear image error if one existed
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  // Format number with spaces for thousands
  const formatNumberWithSpaces = (num: string) => {
    return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    else if (formData.name.length > 50) newErrors.name = 'Name must be less than 50 characters';
    
    if (!formData.symbol.trim()) newErrors.symbol = 'Symbol is required';
    else if (formData.symbol.length < 2) newErrors.symbol = 'Symbol must be at least 2 characters';
    else if (formData.symbol.length > 10) newErrors.symbol = 'Symbol must be less than 10 characters';
    else if (!/^[A-Z]+$/.test(formData.symbol)) newErrors.symbol = 'Symbol must contain only letters';
    
    if (!formData.emission) newErrors.emission = 'Emission is required';
    else {
      const emission = parseFloat(formData.emission.replace(/\s/g, ''));
      if (isNaN(emission) || emission <= 0) newErrors.emission = 'Emission must be a positive number';
      else if (emission > 1000000000000) newErrors.emission = 'Emission too large';
    }
    
    if (!formData.info.trim()) newErrors.info = 'Description is required';
    else if (formData.info.length < 10) newErrors.info = 'Description must be at least 10 characters';
    else if (formData.info.length > 1000) newErrors.info = 'Description must be less than 1000 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      // Add shake animation to form
      const form = document.getElementById('create-token-form');
      if (form) {
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 400);
      }
      return;
    }
    
    try {
      // Format emission number (remove spaces)
      const formattedEmission = parseFloat(formData.emission.replace(/\s/g, ''));
      
      await createToken({
        name: formData.name,
        symbol: formData.symbol.toUpperCase(),
        emission: formattedEmission,
        info: formData.info,
        image: formData.image,
      });
      
      // On success, navigate to listing
      navigate('/listing');
    } catch (error) {
      console.error('Error creating token:', error);
      // In a real app, show error message to user
    }
  };

  return (
    <div className="max-w-[480px] mobile:max-w-[350px] mx-auto px-[25px] pt-[80px] mobile:pt-[60px] relative z-1">
      <h1 className="text-3xl mobile:text-2xl font-semibold text-center text-primary-green dark:text-dark-accent mb-[60px] mobile:mb-10">
        {t('createToken.title')}
      </h1>
      
      <form 
        id="create-token-form"
        onSubmit={handleSubmit}
        className="w-[480px] mobile:w-[350px] rounded-10 bg-white dark:bg-[rgba(217,217,217,0.05)] dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-5 mobile:p-4"
      >
        {/* Upload Image */}
        <div className="w-[442px] mobile:w-full h-[74px] mobile:h-[70px] flex items-center gap-2.5 mb-5">
          <div className="w-[74px] mobile:w-[60px] h-[74px] mobile:h-[60px] rounded-full bg-light-avatar flex items-center justify-center cursor-pointer relative overflow-hidden"
               onClick={() => document.getElementById('image-upload')?.click()}>
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-6 h-6 text-light-text50 dark:text-dark-text50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleImageChange}
            />
          </div>
          
          <div className="flex-1 text-xs text-light-text dark:text-dark-text opacity-70">
            {t('createToken.uploadImage')}
          </div>
          
          <button
            type="button"
            className="w-[100px] mobile:w-[80px] h-[30px] mobile:h-[28px] rounded-10 bg-white dark:bg-[rgba(255,255,255,0.1)] border border-primary-green dark:border-white flex items-center justify-center gap-1"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <span className="text-[12px] font-bold text-primary-green dark:text-white">
              {t('createToken.uploadButton')}
            </span>
            <svg className="w-1.5 h-1 text-primary-green dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 8 4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l3 3 3-3" />
            </svg>
          </button>
        </div>
        
        {/* Display image error if exists */}
        {errors.image && <p className="mt-1 text-xs text-sell-red">{errors.image}</p>}
        
        {/* Name Input */}
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={t('createToken.namePlaceholder')}
          error={errors.name}
          fullWidth
        />
        
        {/* Symbol Input */}
        <Input
          label="Symbol"
          name="symbol"
          value={formData.symbol}
          onChange={handleInputChange}
          placeholder={t('createToken.symbolPlaceholder')}
          error={errors.symbol}
          fullWidth
          className="mt-3"
        />
        
        {/* Emission Input */}
        <Input
          label="Emission"
          name="emission"
          value={formData.emission}
          onChange={handleInputChange}
          placeholder={t('createToken.emissionPlaceholder')}
          error={errors.emission}
          fullWidth
          className="mt-3"
        />
        
        {/* Info Textarea */}
        <div className="mt-3">
          <label className="mb-2 text-xs font-normal text-light-text50 dark:text-dark-text50 block">
            Info
          </label>
          <div className="w-[442px] mobile:w-full h-[221px] mobile:h-[180px] rounded-20 bg-white dark:bg-[rgba(255,255,255,0.05)] border border-light-inputBorder dark:border-dark-inputBorder p-3">
            <textarea
              name="info"
              value={formData.info}
              onChange={handleInputChange}
              placeholder={t('createToken.infoPlaceholder')}
              className="w-full h-full bg-transparent outline-none text-sm text-light-text dark:text-dark-text placeholder:text-light-text50 dark:placeholder:text-dark-text50 resize-none"
              rows={6}
            />
          </div>
          {errors.info && <p className="mt-1 text-xs text-sell-red">{errors.info}</p>}
        </div>
        
        {/* Create Token Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          type="submit"
          disabled={isCreating}
          className="mt-5"
        >
          {isCreating ? t('listing.loading') : t('createToken.createButton')}
        </Button>
      </form>
    </div>
  );
};

export default CreateToken;