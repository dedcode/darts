import Document, { Head, Html, Main, NextScript } from 'next/document';

/**
 * Determine our dark mode preferences by priority:
 * 1. Previously set dark mode for website with button
 * 2. Has a system dark mode preference
 * 3. Fallback to light mode
 */
function setInitialColorScheme() {
  const persistedColorPref = window.localStorage.getItem('darkMode');
  const hasPersistedColorPref = typeof persistedColorPref === 'string';

  const html = document.getElementsByTagName('html')[0];

  if (hasPersistedColorPref) {
    if (persistedColorPref === 'dark') {
      html.classList.add(persistedColorPref);
    } else {
      html.classList.remove('dark');
    }
  } else {
    const systemDarkPref = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const hasSystemDarkPref = typeof systemDarkPref === 'boolean';

    if (hasSystemDarkPref) {
      if (systemDarkPref) {
        html.classList.add('dark');
      }
    }
  }
}

/**
 * This code is injected as a string
 * Thus, it is ignored on initial server render
 * It is only processed upon rehydration on the client side
 */
const colorSchemeIIFE = `(${String(setInitialColorScheme)})()`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Global site tag (gtag.js) - Google Analytics */}
          {process.env.NODE_ENV !== 'production' ? null : (
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-KEMRWMJM34"
            />
          )}
          {process.env.NODE_ENV !== 'production' ? null : (
            <script
              dangerouslySetInnerHTML={{
                __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KEMRWMJM34');
          `
              }}
            />
          )}
          <script dangerouslySetInnerHTML={{ __html: colorSchemeIIFE }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
