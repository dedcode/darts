import Image from 'next/image';
import { LlnDiceRolls } from '../components/charts/lln-dice-rolls';
import { PiEstimator } from '../components/charts/pi-estimator';
import { PiEstimatorChart } from '../components/charts/pi-estimator-chart';
import { StockSim } from '../components/charts/stock-sim';
import CodeBlock from '../components/code-block';
import TextLink from '../components/text-link';

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
// TODO: isProduction would still be true unless we read via APP_ENV
// https://github.com/vercel/next.js/issues/17032#issuecomment-691506975
export const isTest = process.env.APP_ENV === 'test';

export const mdxComponents: any = {
  a: TextLink,
  Image,
  CodeBlock: CodeBlock,
  PiEstimatorChart: PiEstimatorChart,
  LlnDiceRolls: LlnDiceRolls,
  PiEstimator: PiEstimator,
  StockSim: StockSim
};

/**
 * Check if we're executing code with Node (SSR and compile-time SSG).
 * Use as a guard when performing functions using browser-only APIs.
 */
export const isBrowser = () => typeof window !== 'undefined';

export const baseUrl = isProduction
  ? 'https://dlibin.net'
  : 'http://localhost:3000';
