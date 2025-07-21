import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: {},
    require: undefined, // Prevent "require is not defined" error
  },
  resolve: {
    alias: {
      quill: "quill/dist/quill.js",
    },
  },
});
