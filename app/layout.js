import './globals.css';

export const metadata = { title: 'PPulse' };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
