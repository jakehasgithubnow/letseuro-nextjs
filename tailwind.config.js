// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'hotjar-orange': '#FF5C35',
          'hotjar-blue': '#0052CC',
        },
      },
    },
    plugins: [],
  };