import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import Button from '@/components/common/Button';

// Этот компонент можно вынести в common, если он будет переиспользоваться
// ==================================================================================================
// КОМПОНЕНТЫ ФОРМЫ (можно вынести в /components/common)
// ==================================================================================================

// --------------------------------------------------------------------------------------------------
// 1. КАСТОМНОЕ ПОЛЕ ВВОДА
// Обертка над стандартным <input> с едиными стилями для всего проекта.
// --------------------------------------------------------------------------------------------------
const CustomInput = ({ label, ...props }: any) => (
  <div>
    {label && <label className="block text-xs font-regular mb-1 text-black/50 dark:text-white/50">{label}</label>}
    <input 
      {...props}
      className="w-full h-[48px] md:h-[48px] rounded-20 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 text-black dark:text-white placeholder:text-black/50 focus:border-2 focus:border-[#5B9D07] outline-none transition-all duration-200" 
    />
  </div>
);

// --------------------------------------------------------------------------------------------------
// 2. КАСТОМНОЕ ТЕКСТОВОЕ ПОЛЕ
// Обертка над <textarea> с едиными стилями.
// --------------------------------------------------------------------------------------------------
const CustomTextarea = ({ label, ...props }: any) => (
    <div>
      {label && <label className="block text-xs font-regular mb-1 text-black/50 dark:text-white/50">{label}</label>}
      <textarea 
        {...props}
        className="w-full h-[221px] rounded-20 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 text-black dark:text-white placeholder:text-black/50 focus:border-2 focus:border-[#5B9D07] outline-none transition-all duration-200 resize-none"
      />
    </div>
  );


// ==================================================================================================
// ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ СОЗДАНИЯ ТОКЕНА
// ==================================================================================================
const CreateToken: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-[132px] relative z-1">
      {/* Decorative Backgrounds */}
      <img
        src="assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[1000px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="assets/Create token.svg"
          alt="Create Token Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:opacity-[.46]"
        />
      </div>
      
      {/* Main Container */}
      <div className="w-full max-w-[350px] h-[535px] md:max-w-[480px] md:h-[750px]">
        <h1 className={`${i18n.language === 'ru' ? 'text-lg md:text-xl' : 'text-xl md:text-3xl'} font-semibold text-[#5B9D07] dark:text-white text-center mb-[25px]`}>
          {t('createToken.title', 'Create new token')}
        </h1>

        {/* Content Card */}
        <div className="w-full md:h-[685px] bg-white dark:bg-white/5 rounded-10 dark:backdrop-blur-[73.2px] p-[15px] md:p-[20px] ring-1 ring-inset ring-white">
          <div className="flex flex-col gap-[10px]">
            
            {/* Image Upload */}
            <div className="w-full h-[74px] flex items-center gap-[10px] relative">
              <div className="w-[74px] h-[74px] rounded-full bg-[#D9D9D9] flex-shrink-0" />
              <p className="text-xs font-regular text-[#1C4430] dark:text-white max-w-[140px] sm:max-w-none">
                {t('createToken.uploadImage', 'Загрузите изображение вашего токена')}
              </p>
              <input id="file-upload" type="file" className="hidden" />
              <button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="absolute top-[20px] right-0 w-[100px] h-[30px] rounded-[15px] bg-white dark:bg-[#1C4430] border border-[#5B9D07] flex items-center justify-center gap-1 text-[#5B9D07] dark:text-white text-xs font-bold">
                {t('createToken.uploadButton', 'Загрузить')}
                <div style={{ maskImage: 'url(assets/wallet_2.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} className="w-5 h-4 bg-[#5B9D07] dark:bg-white"></div>
              </button>
            </div>

            {/* Form Fields */}
            <CustomInput name="name" label="Name" />
            <CustomInput name="symbol" label="Symbol" />
            <CustomInput name="emission" label="Emission" />
            <CustomTextarea name="info" label="Info" />

            {/* Submit Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="!h-[50px] !rounded-30 !text-sm !font-semibold mt-[5px]"
            >
              {t('createToken.createButton', 'Create token')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
