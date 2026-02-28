import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'СОНЯ ТУБ',
  description: 'Минималистичная видеоплатформа в чёрно‑розовом стиле.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
