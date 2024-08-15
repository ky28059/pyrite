import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';


const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                theme: 'rgb(var(--theme) / <alpha-value>)',
                primary: 'rgb(var(--primary) / <alpha-value>)',
                secondary: 'rgb(var(--secondary) / <alpha-value>)',
                tertiary: 'rgb(var(--tertiary) / <alpha-value>)',
                content: 'rgb(var(--content) / <alpha-value>)',
                'content-secondary': 'rgb(var(--content-secondary) / <alpha-value>)',
                pulse: { // Loading pulse bg color
                    DEFAULT: colors.gray['300'],
                    dark: '#313135'
                },

                // Period colors
                lecture: '#f1b42f', // TODO
                laboratory: '#7851A9',
                pso: '#6A5ACD',
                recitation: '#f56fa1',
                event: '#73C2FB',
                midterm: '#FF8F00'
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            }
        },
    },
    plugins: [
        require('@headlessui/tailwindcss'),
        plugin(({ addVariant }) => {
            addVariant('scrollbar', ['&::-webkit-scrollbar']);
            addVariant('scrollbar-thumb', ['&::-webkit-scrollbar-thumb']);
        })
    ]
};

export default config;
