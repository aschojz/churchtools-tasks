const tailwind = require('tailwindcss/colors');
module.exports = {
    content: [
        './index.html',
        './formConfig.ts',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/churchtools-styleguide/src/components/**/*.{js,vue}',
        './node_modules/churchtools-styleguide/src/components_v1/**/*.{js,vue}',
    ],
    darkMode: 'class',
    theme: {
        borderRadius: {
            none: 0,
            sm: '0.125rem',
            DEFAULT: '0.25rem',
            md: '0.25rem',
            lg: '0.5rem',
            xl: '0.625rem',
            full: '9999px',
        },
        fontSize: {
            xs: ['0.6875rem', '1rem'],
            sm: ['0.8125rem', '1.125rem'],
            base: ['0.875rem', '1.25rem'],
            lg: ['1.125rem', '1.625rem'],
            xl: ['1.25rem', '1.625rem'],
            '2xl': ['1.75rem', '2.125rem'],
            '3xl': ['2.375rem', '2.875rem'],
        },
        colors: {
            amber: tailwind.amber,
            black: tailwind.black,
            blue: {
                50: 'var(--blue-50)',
                100: 'var(--blue-100)',
                200: 'var(--blue-200)',
                300: 'var(--blue-300)',
                400: 'var(--blue-400)',
                500: 'var(--blue-500)',
                600: 'var(--blue-600)',
                700: 'var(--blue-700)',
                800: 'var(--blue-800)',
                900: 'var(--blue-900)',
                950: 'var(--blue-950)',
            },
            cyan: tailwind.cyan,
            emerald: tailwind.emerald,
            fuchsia: tailwind.fuchsia,
            green: tailwind.green,
            gray: {
                50: 'var(--gray-50)',
                100: 'var(--gray-100)',
                200: 'var(--gray-200)',
                300: 'var(--gray-300)',
                400: 'var(--gray-400)',
                500: 'var(--gray-500)',
                600: 'var(--gray-600)',
                700: 'var(--gray-700)',
                800: 'var(--gray-800)',
                900: 'var(--gray-900)',
                950: 'var(--gray-950)',
            },
            indigo: tailwind.indigo,
            lime: tailwind.lime,
            orange: tailwind.orange,
            pink: tailwind.pink,
            purple: tailwind.purple,
            red: tailwind.red,
            rose: tailwind.rose,
            sky: tailwind.sky,
            teal: tailwind.teal,
            transparent: tailwind.transparent,
            violet: tailwind.violet,
            white: tailwind.white,
            yellow: tailwind.yellow,
            primary: {
                50: 'var(--primary-50)',
                100: 'var(--primary-100)',
                200: 'var(--primary-200)',
                300: 'var(--primary-300)',
                400: 'var(--primary-400)',
                500: 'var(--primary-500)',
                600: 'var(--primary-600)',
                700: 'var(--primary-700)',
                800: 'var(--primary-800)',
                900: 'var(--primary-900)',
                950: 'var(--primary-950)',
            },
            error: tailwind.red,
            warning: tailwind.yellow,
            success: tailwind.green,
        },
        extend: {
            spacing: {
                4.5: '1.125rem',
                13: '3.25rem',
                15: '3.75rem',
                17: '4.25rem',
                18: '4.5rem',
                19: '4.75rem',
            },
            maxWidth: {
                0: '0px',
                none: 'none',
                xs: '20rem',
                sm: '24rem',
                md: '28rem',
                lg: '32rem',
                xl: '36rem',
                '2xl': '40rem',
            },
            fontFamily: {
                sans: [
                    'Lato',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    '"Noto Sans"',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};
