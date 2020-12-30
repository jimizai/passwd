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
    include: ['@material-ui/core/styles']
  }
};

export default config;
