/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f7fb",
          200: "#c9d1ea",
          500: "#495173",
          700: "#232949",
          900: "#0f1429"
        },
        accent: {
          300: "#7ae3c8",
          500: "#35c29f",
          700: "#19876a"
        },
        sunset: {
          300: "#ffb38a",
          500: "#ff7e51"
        }
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "system-ui", "sans-serif"],
        body: ["\"Manrope\"", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 18px 40px rgba(15, 20, 41, 0.12)"
      }
    }
  },
  plugins: []
};
