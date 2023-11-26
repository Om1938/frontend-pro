import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import envMonoRepo from "../../mono-env.config.js";

// Function to transform envConfig into Vite's define format
function transformDefineConfig(envConfig) {
  const defineConfig = {};
  for (const key in envConfig) {
    defineConfig[`import.meta.env.${key}`] = JSON.stringify(envConfig[key]);
  }
  return defineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  define: transformDefineConfig(envMonoRepo["sortable-list-component"]),
  plugins: [react()],
  base: envMonoRepo["sortable-list-component"]?.base || "/",
  build: {
    outDir:
      "../../dist/" +
      (envMonoRepo["sortable-list-component"]?.name ??
        "sortable-list-component"),
    emptyOutDir: true,
  },
  server: {
    port: envMonoRepo["sortable-list-component"]?.port || 4000,
  },
});
