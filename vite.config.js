import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tailwindcss from "tailwindcss";

export default defineConfig({
  define: {
    "process.env": {}
  },
  resolve: {
    alias: {
      api: "/src/api",
      pages: "/src/pages",
      layouts: "/src/layouts",
      assets: "/src/assets",
      components: "/src/components",
      constants: "/src/constants",
      context: "/src/context",
      helpers: "/src/helpers",
      utils: "/src/utils"
    }
  },
  plugins: [react(), tailwindcss(), svgr({ svgrOptions: { icon: true } })],
  server: {
    port: 3001
  }
});
