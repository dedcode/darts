import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TextLink from '../components/text-link';

type Props = {
  path: string;
  data: any;
};

export default function LabPage({ path, data }: Props) {
  return (
    <Layout path={path}>
      <SEO title="Lab" />
      <div className="mt-20 mb-12">
        <h1>Some fun experiments 👨‍🔬🧪</h1>
        <div>
          <div>
            <TextLink href="/qr-code">QR Code Generator</TextLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}
