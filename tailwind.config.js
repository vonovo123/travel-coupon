/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-navy": {
          DEFAULT: "#0B132B",
          muted: "#1C2541",
        },
        "starlight-gold": "#F3A712",
        "light-sand": "#F3EFE6",
        parchment: "#FBF7F0",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Noto Serif KR",
          "Apple Myungjo",
          "Nanum Myeongjo",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        treasure: "0 10px 24px rgba(243, 167, 18, 0.18)",
      },
    },
  },
  plugins: [],
};
