import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts Links moved here from index.js to comply with Next.js best practices */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@700&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      {/* Retaining the antialiased class for smoother font rendering */}
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}