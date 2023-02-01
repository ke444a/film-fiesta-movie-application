/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "white-1": "#F5F5FA",
                "dark": "#141010",
                "black-1": "#333333",
                "golden": "#F2DD1C",
                "red-highlight": "#F8333C",
                "orange-highlight": "#EA7317", 
                "dark-blue": "#032541",
            },
            keyframes: {
                "slide-in": {
                    "from": { transform: "translateX(100%)" },
                    "to": { transform: "translateX(0)" }
                },
                "click": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(0.9)" },
                    "100%": { transform: "scale(1)" }
                },

            },
            animation: {
                "slide-in": "slide-in .3s ease-in-out",
                "click": "click 0.5s ease-out",
            },
        },
        fontFamily: {
            "body": ["Roboto", "sans-serif"],
            "heading": ["Merriweather Sans", "sans-serif"],
        }
    },
    plugins: [],
};
