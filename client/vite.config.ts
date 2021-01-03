import { UserConfig } from 'vite';
import reactPlugin from 'vite-plugin-react';

/**
 * @type { import('vite').UserConfig }
 */
const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  port: 3001,
  optimizeDeps: {
    include: [
      '@material-ui/core/styles',
      'path-to-regexp',
      '@material-ui/lab',
      '@material-ui/lab/themeAugmentation'
    ]
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      ws: true,
      rewrite(path) {
        return path.replace('/api', '');
      }
    }
  }
};

export default config;
