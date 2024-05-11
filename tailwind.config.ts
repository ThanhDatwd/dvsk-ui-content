import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"

  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
			colors: {
        primary: "#C0E7E5",
				primaryDark: "#1E1E22",
        secondary: "#3B3BFC",
				secondaryDark: "#D9610B",
        background: "#02000B",
        uscYellow: "#F0C546",
        grey: "#CFCFCF",
        success: "#239b06",
        grey100: "#989898",
        active: "#5FE0C7",
        grey_organ200: "#4D3D32",
        grey_organ300: "#342E29",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1504px",
      },
    },
  },
  plugins: [],
}
export default config
