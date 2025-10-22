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
          inputBorder: "rgba(28, 68, 48, 0.1)",
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
        },
        // Sell button color
        sell: {
          red: "#FF5858",
          hover: "#E04848",
        },
      },
      spacing: {
        18: "4.5rem", // 72px
        25: "6.25rem", // 100px (для отступов от края)
        30: "7.5rem", // 120px
        45: "11.25rem", // 180px
        50: "12.5rem", // 200px
        80: "20rem", // 320px
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
        tablet: "768px",
        desktop: "1240px",
        xl: "1920px",
      },
      fontSize: {
        // Кастомные размеры для проекта
        xs: ["12px", { lineHeight: "1.4" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["18px", { lineHeight: "1.6" }],
        lg: ["20px", { lineHeight: "1.4" }],
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