import "./globals.css";

export const metadata = {
  title: "Weather App",
  description: "Search cities for checking the weather",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
