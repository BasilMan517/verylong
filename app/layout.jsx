import "./globals.css";

export const metadata = {
  title: "Doom Twin | 升天档案局",
  description: "A darkly funny social longevity game for fake ending reports and doom twin matching.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
