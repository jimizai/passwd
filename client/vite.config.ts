import { UserConfig } from "vite";
import reactPlugin from "vite-plugin-react";

/**
 * @type { import('vite').UserConfig }
 */
const config: UserConfig = {
  jsx: "react",
  plugins: [reactPlugin],
};

export default config;
