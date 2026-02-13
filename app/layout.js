export const metadata = { title: 'Policy Asset Radar' };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: 'sans-serif', margin: 24 }}>{children}</body>
    </html>
  );
}
