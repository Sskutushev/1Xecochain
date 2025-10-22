/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Используем class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          green: "#5B9D07",
          purple: "#8247E5",
          yellow: "#F0B90B",
          darkGreen: "#05521A",
        },
        // Light theme colors
        light: {
          bg: "#F1F1F1",
          bgSecondary: "#FFFFFF",
          text: "#1C4430",
          text50: "rgba(28, 68, 48, 0.5)",
          avatar: "#D9D9D9",
          inputBg: "#FFFFFF",
          inputBgAlt: "#F5F5F5",
          inputBorder: "rgba(28, 68, 48, 0.1)",
          badgeBg: "#E2E2E2",
        },
        // Dark theme colors
        dark: {
          bg: "#0F0F16",
          bgSecondary: "rgba(217, 217, 217, 0.05)",
          text: "#FFFFFF",
          text50: "rgba(255, 255, 255, 0.5)",
          accent: "#58FF84",
          cardBg: "rgba(217, 217, 217, 0.05)",
          inputBg: "rgba(255, 255, 255, 0.05)",
          inputBorder: "rgba(255, 255, 255, 0.1)",
          overlay: "rgba(255, 255, 255, 0.22)",
        },
        // Sell button color
        sell: {
          red: "#FF5858",
          hover: "#E04848",
        },
      },
      spacing: {
        '15px': '0.9375rem', // 15px
        '18px': '1.125rem',  // 18px
        '25px': '1.5625rem', // 25px
        '30px': '1.875rem',  // 30px
        '35px': '2.1875rem',  // 35px
        '45px': '2.8125rem',  // 45px
        '50px': '3.125rem',  // 50px
        '60px': '3.75rem',   // 60px
        '80px': '5rem',      // 80px
        '300px': '18.75rem', // 300px
      },
      // Responsive font sizes using clamp for smooth scaling
      fontSize: {
        // Кастомные размеры для проекта
        xs: [
          'clamp(0.75rem, 1vw, 0.8rem)', 
          { lineHeight: '1.4' }
        ],
        sm: [
          'clamp(0.8rem, 1.2vw, 0.9rem)', 
          { lineHeight: '1.5' }
        ],
        base: [
          'clamp(0.9rem, 1.4vw, 1.1rem)', 
          { lineHeight: '1.6' }
        ],
        lg: [
          'clamp(1rem, 1.5vw, 1.2rem)', 
          { lineHeight: '1.4' }
        ],
        xl: [
          'clamp(1.2rem, 1.8vw, 1.5rem)', 
          { lineHeight: '1.3' }
        ],
        '2xl': [
          'clamp(1.5rem, 2.2vw, 1.8rem)', 
          { lineHeight: '1.2' }
        ],
        '3xl': [
          'clamp(2rem, 3vw, 3.125rem)', 
          { lineHeight: '1.2' }
        ],
      },
      maxWidth: {
        mobile: "350px",
        container: "1295px",
      },
      minHeight: {
        "screen-header": "calc(100vh - 120px)", // Высота экрана минус header
      },
      borderRadius: {
        8: "8.32px",
        10: "10px",
        20: "20px",
        30: "30px",
        35: "35px",
        500: "500px", // Для круглых элементов
      },
      backdropBlur: {
        30: "30.3px",
        73: "73.2px",
      },
      boxShadow: {
        "card-light": "0 2px 8px rgba(0, 0, 0, 0.05)",
        "card-dark":
          "0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)",
        header: "0 2px 8px rgba(0, 0, 0, 0.1)",
        modal: "0 8px 32px rgba(0, 0, 0, 0.2)",
        dropdown: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
      screens: {
        mobile: "360px",
        sm: "640px",
        md: "768px",  // Добавляем md брейкпоинт для адаптивности навигации
        tablet: "768px",
        desktop: "1240px",
        xl: "1920px",
      },
      fontSize: {
        // Кастомные размеры для проекта
        xs: ["12.6px", { lineHeight: "1.4" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["18px", { lineHeight: "1.6" }],
        lg: ["19px", { lineHeight: "1.4" }],
        xl: ["24px", { lineHeight: "1.3" }],
        "2xl": ["30px", { lineHeight: "1.2" }],
        "3xl": ["50px", { lineHeight: "1.2" }],
      },
      fontFamily: {
        sans: ["Nunito Sans", "system-ui", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        semibold: "600",
        bold: "700",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionDuration: {
        400: "400ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "slide-out-left": "slideOutLeft 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "scale-out": "scaleOut 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};