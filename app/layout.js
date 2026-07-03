import "./globals.css";

export const metadata = {
  title: "App Idea Research Agent",
  description: "Revenue-first app idea research agent that turns market gaps into DOCX PRDs."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
