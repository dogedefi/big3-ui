import { defineConfig } from 'umi';
import pxToViewPort from 'postcss-px-to-viewport';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth: 750,
      viewportUnit: 'vw',
      mediaQuery: true,
      include: /(.*)mobile.less/i,
      exclude: /node_modules|antd|(.*)(pc|index).less/i,
    }),
    pxToViewPort({
      viewportWidth: 1920,
      viewportUnit: 'vw',
      mediaQuery: true,
      include: /(.*)(pc|index).less/i,
      exclude: /node_modules|antd|(.*)mobile.less/i,
      selectorBlackList: ['iframe-container', 'chat-entry'],
    }),
  ],
  plugins: [require.resolve('@doge/plugin-multichain')],
});
