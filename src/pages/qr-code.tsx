import qrcode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import SEO from '../components/seo';
import TextInput from '../components/text-input';
import TextLink from '../components/text-link';

export default function QRCodePage() {
  const txtCanvasRef = useRef<HTMLCanvasElement>(null);
  const wifiCanvasRef = useRef<HTMLCanvasElement>(null);
  const [qrText, setQrText] = useState(`Hey, I'm a QR Code!! 😎`);
  const [ssid, setSsid] = useState('');
  const [key, setKey] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [qrWifi, setQrWifi] = useState('');

  useEffect(() => {
    async function getQR() {
      await qrcode.toCanvas(txtCanvasRef.current, qrText);
    }
    getQR();
  }, [qrText]);

  useEffect(() => {
    async function getQR() {
      await qrcode.toCanvas(wifiCanvasRef.current, qrWifi);
    }
    if (qrWifi !== '') getQR();
  }, [qrWifi]);

  return (
    <div>
      <SEO
        title="QR Code Generator"
        description="A QR Code generator for fun"
      />
      <h1 className="mt-20">QR Code Generator</h1>
      <p>
        You can scan these to read them on{' '}
        <TextLink href="https://play.google.com/store/apps/details?id=com.google.android.GoogleCamera&hl=en_US">
          Google's camera app (in the "lens" mode)
        </TextLink>{' '}
        on Android or{' '}
        <TextLink href="https://support.apple.com/en-us/HT208843">
          the default camera app
        </TextLink>{' '}
        on iPhone or iPad.
      </p>
      <h2>Encoded text</h2>
      <div className="flex flex-col lg:flex-row">
        <div>
          <p>Type some text, your QR code generates as you type!</p>
          <textarea
            rows={3}
            cols={30}
            onChange={(e) => setQrText(e.target.value)}
            className="rounded-md border-gray-300 bg-gray-100 px-2 shadow-sm transition-colors duration-75 focus:border-teal-400 focus:bg-transparent focus:ring focus:ring-teal-300 focus:ring-opacity-50"
          >
            Hey, I'm a QR Code!! 😎
          </textarea>
        </div>
        <canvas ref={txtCanvasRef} className="ml-8 mt-2"></canvas>
      </div>
      <h2>Encoded WiFi</h2>
      <p>
        You can also create a QR code for your WiFi information. Scanning it
        will connect you to the associated network, if it is in range. The QR
        code is generated entirely client side, you can{' '}
        <TextLink href="https://github.com/Daynil/dlibin-gatsby/blob/master/src/pages/qr-code.tsx">
          vet the code here
        </TextLink>
        .
      </p>
      <div className="flex flex-col lg:flex-row">
        <div>
          <div className="flex flex-col">
            <label htmlFor="ssid" className="font-semibold">
              SSID
            </label>
            {/* TODO: style text inputs for dark */}
            <TextInput
              type="text"
              id="ssid"
              onChange={(e) => setSsid(e.target.value)}
            />
            <input
              type="text"
              id="ssid"
              onChange={(e) => setSsid(e.target.value)}
              className="w-64 rounded-md border-gray-300 bg-gray-100 px-2 shadow-sm transition-colors duration-75 focus:border-teal-400 focus:bg-transparent focus:ring focus:ring-teal-300 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="encryption" className="mt-4 font-semibold">
              Enryption
            </label>
            <div>
              <input
                type="radio"
                name="encryption"
                value="WPA"
                id="wpa"
                className="text-teal-500 focus:ring-teal-300"
                checked={encryption === 'WPA'}
                onChange={(e) => setEncryption(e.target.value)}
              />
              <label className="ml-2" htmlFor="wpa">
                WPA/WPA2
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="encryption"
                value="WEP"
                id="wep"
                className="text-teal-500 focus:ring-teal-300"
                checked={encryption === 'WEP'}
                onChange={(e) => setEncryption(e.target.value)}
              />
              <label className="ml-2" htmlFor="wep">
                WEP
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="encryption"
                value="nopass"
                id="none"
                className="text-teal-500 focus:ring-teal-300"
                checked={encryption === 'nopass'}
                onChange={(e) => setEncryption(e.target.value)}
              />
              <label className="ml-2" htmlFor="none">
                None
              </label>
            </div>
            <div className="mt-4 flex flex-col">
              <label htmlFor="key" className="font-semibold">
                Key
              </label>
              <input
                type="password"
                id="key"
                onChange={(e) => setKey(e.target.value)}
                className="w-64 rounded-md border-gray-300 bg-gray-100 px-2 shadow-sm transition-colors duration-75 focus:border-teal-400 focus:bg-transparent focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              />
            </div>
            <button
              onClick={() =>
                setQrWifi(`WIFI:T:${encryption};S:${ssid};P:${key};;`)
              }
              className="mt-4 w-32 rounded-md bg-teal-500 p-2 font-semibold text-white transition-all duration-150 hover:bg-teal-400"
            >
              Generate!
            </button>
          </div>
        </div>
        <canvas ref={wifiCanvasRef} className="ml-8 mt-2"></canvas>
      </div>
    </div>
  );
}
