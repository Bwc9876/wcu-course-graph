/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                text: "#ebe5eb",
                background: "#0d090d",
                primary: "#ec8cec",
                secondary: "#88263f",
                accent: "#db8f52"
            }
        }
    },
    plugins: []
};
