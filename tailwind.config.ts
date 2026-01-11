import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';


const config: Config = {
    theme: {
        extend: {
            colors: {
                pulse: { // Loading pulse bg color
                    DEFAULT: colors.gray['300'],
                    dark: '#313135'
                },
            }
        },
    },
    plugins: [
        require('@headlessui/tailwindcss'),
    ]
};

export default config;
