import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Svara — your AI calling employee', description: 'AI voice employees for Indian businesses.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
