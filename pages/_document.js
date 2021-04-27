import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="bg-gray-800">
                    <Main />
                    <div id="portal" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
