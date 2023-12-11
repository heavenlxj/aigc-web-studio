import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default ({ command, mode }: any) => {
  console.log(command, 'command');
  console.log(mode, 'mode');
  console.log(loadEnv(mode, process.cwd()));
  return defineConfig({
      plugins: [react()],
      css: {
          preprocessorOptions: {
              less: {
                  modifyVars: {
                      '@primary-color': '#4377FE',
                  },
                  javascriptEnabled: true,
              },
          },
      },
      resolve: {
          alias: {
              '@': path.join(__dirname, './src'),
          },
      },
      server: {
          host: '0.0.0.0',
          port: 3000,
          proxy: {
              '/api': {
                  target: 'http://api-server-api-server-wcvomnbccr.cn-hangzhou.fcapp-test.run';
                  changeOrigin: true,
              },
          },
      },
  });
};
