import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="mr">
      <Head>
        {/* Marathi + English fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
