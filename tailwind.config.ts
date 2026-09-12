import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#1b1730', peach: '#5969ee', mist: '#fafaff', moss: '#271054' }, boxShadow: { card: '0 14px 35px rgba(47,48,93,.09)' } } }, plugins: [] };
export default config;
