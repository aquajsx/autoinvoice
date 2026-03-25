import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇👇👇 添加下面这几行 👇👇👇
  server: {
    port: 3010, // 这里填您想要的端口号
    strictPort: true, // (可选) 如果端口被占用，直接报错而不是自动换一个
  },
  // 👆👆👆 添加上面这几行 👆👆👆
});
