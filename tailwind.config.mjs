/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#02191D",
        blue1:'#197686', 
        btnBlue:'#24A0B5',
        headerBg:'#05252C', 
        darkBlue:'#041E23',
        bgBlue:'#0E464F',
        customBlue: 'rgba(5,37,44,0.4)', 
        foreground: "var(--foreground)",
        gray:"#B3B3B3",
        gray50:"#D9D9D9",
      },
      fontFamily: {
        jeju: ['Jeju Myeongjo', 'serif'],
        roadRage: ['Road Rage', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
};
