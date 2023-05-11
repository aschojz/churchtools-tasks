const tailwind = require('tailwindcss/colors');
module.exports = {
    content: [
        './index.html',
        './formConfig.ts',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/churchtools-styleguide/src/components/**/*.{js,vue}',
        './node_modules/churchtools-styleguide/src/components_v1/**/*.{js,vue}',
    ],
    theme: {
        spacing: {
            0: '0px',
            px: '1px',
            0.5: '0.2rem',
            1: '0.4rem',
            1.5: '0.6rem',
            2: '0.8rem',
            2.5: '1rem',
            3: '1.2rem',
            3.5: '1.4rem',
            4: '1.6rem',
            4.5: '1.8rem',
            5: '2.0rem',
            6: '2.4rem',
            7: '2.8rem',
            8: '3.2rem',
            9: '3.6rem',
            10: '4.0rem',
            11: '4.4rem',
            12: '4.8rem',
            13: '5.2rem',
            14: '5.6rem',
            15: '6.0rem',
            16: '6.4rem',
            17: '6.8rem',
            18: '7.2rem',
            19: '7.6rem',
            20: '8.0rem',
            24: '9.6rem',
            28: '11.2rem',
            32: '12.8rem',
            36: '14.4rem',
            40: '16.0rem',
            44: '17.6rem',
            48: '19.2rem',
            52: '20.8rem',
            56: '22.4rem',
            60: '24rem',
            64: '25.6rem',
            72: '28.8rem',
            80: '32rem',
            96: '38.4rem',
        },
        lineHeight: {
            3: '1.2rem',
            4: '1.6rem',
            5: '2rem',
            6: '2.4rem',
            7: '2.8rem',
            8: '3.2rem',
            9: '3.6rem',
            10: '4rem',
        },
        borderRadius: {
            none: 0,
            sm: '0.3rem',
            md: '0.6rem',
            DEFAULT: '0.6rem',
            lg: '1rem',
            full: '9999px',
        },
        fontSize: {
            xs: ['1.1rem', '1.6rem'],
            sm: ['1.3rem', '2rem'],
            base: ['1.4rem', '2rem'],
            lg: ['1.8rem', '2.8rem'],
            xl: ['2rem', '2.6rem'],
            '2xl': ['2.8rem', '3.4rem'],
            '3xl': ['3.8rem', '4.6rem'],
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
            },
            cyan: tailwind.cyan,
            emerald: tailwind.emerald,
            fuchsia: tailwind.fuchsia,
            green: tailwind.green,
            gray: tailwind.slate,
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
            },
            error: tailwind.red,
            warning: tailwind.yellow,
            success: tailwind.green,
        },
        extend: {
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
