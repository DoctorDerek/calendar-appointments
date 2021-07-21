import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="w-full h-full">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="shortcut icon"
            href={`${process.env.PUBLIC_URL}/favicon.ico`}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <meta name="theme-color" content="#000000" />
          <link
            rel="manifest"
            href={`${process.env.PUBLIC_URL}/manifest.json`}
          />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </Head>

        <body className="w-full h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
