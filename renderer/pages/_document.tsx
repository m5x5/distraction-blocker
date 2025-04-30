import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

class Document extends NextDocument {
  render() {
    const styles = getCssText();

    return (
      <Html lang="en">
        <Head>
          {/* eslint-disable-next-line react/no-danger */}
          <style id="stitches" dangerouslySetInnerHTML={{ __html: styles }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
