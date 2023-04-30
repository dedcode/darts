import SEO from '../components/seo';
import TextLink from '../components/text-link';

export default function LabPage() {
  return (
    <div>
      <SEO title="Lab" />
      <div className="mb-12 mt-20">
        <h1>Some fun experiments 👨‍🔬🧪</h1>
        <div>
          <div className="rounded-md border border-teal-500 p-6 shadow-md">
            <TextLink href="/qr-code">QR Code Generator</TextLink>
            <p className="mt-2">
              Every time I want to print a new QR code for my home WiFi, I go
              looking for QR code generator, then worry about exposing the
              password by typing it online. So, I whipped up a quick generator I
              can use for myself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
