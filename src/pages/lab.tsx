import React from 'react';
import SEO from '../components/seo';
import TextLink from '../components/text-link';

export default function LabPage() {
  return (
    <div>
      <SEO title="Lab" />
      <div className="mt-20 mb-12">
        <h1>Some fun experiments 👨‍🔬🧪</h1>
        <div>
          <div>
            <TextLink href="/qr-code">QR Code Generator</TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
