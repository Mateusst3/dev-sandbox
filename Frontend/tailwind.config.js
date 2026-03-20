import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Chivo", "ui-sans-serif", "system-ui"],
        display: ["Syne", "ui-serif", "Georgia"],
      },
      colors: {
        app: {
          bg: "#f8f7f4",
          ink: "#101828",
          card: "#ffffff",
          border: "#e2e8f0",
          muted: "#64748b",
          accent: "#f86336",
          accent2: "#0f766e",
        },
      },
      keyframes: {
        "typing-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
        "landing-rise": {
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "typing-bounce": "typing-bounce 1.2s infinite ease-in-out",
        "landing-rise": "landing-rise 0.7s ease forwards",
      },
      boxShadow: {
        panel: "0 12px 32px rgba(15, 23, 42, 0.08)",
        accent: "0 0 0 2px rgba(248, 99, 54, 0.25)",
      },
      backgroundImage: {
        "landing-hero":
          "radial-gradient(circle at 20% 20%, rgba(248, 99, 54, 0.25), transparent 45%), radial-gradient(circle at 80% 10%, rgba(2, 132, 199, 0.2), transparent 45%), linear-gradient(140deg, rgba(15, 23, 42, 0.04), rgba(148, 163, 184, 0.2))",
        "landing-grid":
          "linear-gradient(rgba(148, 163, 184, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.18) 1px, transparent 1px)",
        "app-body":
          "radial-gradient(circle at 10% 20%, rgba(248, 99, 54, 0.18), transparent 40%), radial-gradient(circle at 90% 10%, rgba(14, 165, 233, 0.2), transparent 40%), linear-gradient(140deg, rgba(2, 6, 23, 0.04), rgba(241, 245, 249, 0.7))",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
    },
  },
  plugins: [
    lineClamp,
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          width: "0",
          height: "0",
        },
        ".animation-delay-100": { "animation-delay": "0.1s" },
        ".animation-delay-200": { "animation-delay": "0.2s" },
        ".animation-delay-300": { "animation-delay": "0.3s" },
      });
    },
  ],
};
