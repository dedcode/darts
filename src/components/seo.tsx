import Head from 'next/head';

type Props = {
  title: string;
} & typeof defaultProps;

const defaultProps = {
  lang: 'en',
  description: '',
  featuredImagePath: '',
  index: false
};

SEO.defaultProps = defaultProps;

export default function SEO({
  description,
  lang,
  title,
  featuredImagePath,
  index
}: Props) {
  const metaDescription = description || 'Danny Libin Personal Website';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="Danny Libin" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {featuredImagePath && (
        <meta
          property="og:image"
          content={`https://dlibin.net${featuredImagePath}`}
        />
      )}
      {featuredImagePath && (
        <meta
          name="twitter:image"
          content={`https://dlibin.net${featuredImagePath}`}
        />
      )}
      {index ? <link href="mailto:dlibinrx@gmail.com" rel="me" /> : null}
      <link
        rel="webmention"
        href="https://webmention.io/dlibin.net/webmention"
      />
      <link rel="pingback" href="https://webmention.io/dlibin.net/xmlrpc" />
    </Head>
  );
}
