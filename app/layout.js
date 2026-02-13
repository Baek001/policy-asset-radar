export const metadata = { title: 'PPulse' };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: 'sans-serif', margin: 20 }}>{children}</body>
    </html>
  );
}
