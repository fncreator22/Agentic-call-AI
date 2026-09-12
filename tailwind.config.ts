import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#163132', peach: '#087e78', mist: '#f7fbfa', moss: '#123c3b' }, boxShadow: { card: '0 14px 35px rgba(18,60,59,.09)' } } }, plugins: [] };
export default config;
