import { resolve } from "path"
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'loginPage.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        workerlist: resolve(__dirname, 'workerlist.html'),
        workerCreate: resolve(__dirname, 'workerCreate.html'),
        workerUpdate: resolve(__dirname, 'workerUpdate.html'),
      }
    }
  }
})
