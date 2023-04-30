import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Layout from '../components/layout';
import '../styles/blog-post.css';
import '../styles/global.css';

const cascadiaCode = localFont({ src: '../../public/CascadiaCode.woff2' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <style jsx global>{`
        code {
          font-family: ${cascadiaCode.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Layout>
  );
}
