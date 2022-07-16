// @ts-ignore
export default (modelPath: string) => `
// @ts-ignore
import { Chain as ChainType } from '../${modelPath}';
export type Chain = ChainType;
export const __PLUGIN_WEB3 = 1;
`;
