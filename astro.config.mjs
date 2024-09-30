// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://bwc9876.github.io",
    base: "wcu-course-graph",
    integrations: [react(), tailwind()]
});
