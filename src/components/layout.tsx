import { MDXProvider } from '@mdx-js/react';
import React, { useEffect, useState } from 'react';
import { mdxComponents } from '../utils/constants';
import Header from './header';

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  darkMode: false
});

const Layout = ({ children }: Props) => {
  // const { darkMode, setDarkMode } = useDarkMode(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const handleDarkSwitch = () => setDarkMode(!darkMode);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  const [darkMode, rawSetDarkMode] = useState(undefined);

  useEffect(() => {
    // Retrieve initial darkmode after hydration
    const html = document.getElementsByTagName('html')[0];
    rawSetDarkMode(html.classList.contains('dark'));
  }, []);

  function handleDarkSwitch() {
    const newDarkMode = !darkMode;
    rawSetDarkMode(newDarkMode);

    const html = document.getElementsByTagName('html')[0];

    // Swap dark mode classes
    if (newDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('darkMode', newDarkMode ? 'dark' : 'light');
  }

  useEffect(() => {
    if (menuOpen) document.body.style.overflowY = 'hidden';
    else {
      document.body.style.overflowY = 'unset';
      document.body.style.overflowY = 'overlay';
    }
  }, [menuOpen]);

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      <div>
        <div className="min-h-screen border-t-4 border-teal-500 transition duration-200 ease-in-out dark:bg-gray-900">
          <Header
            handleDarkSwitch={handleDarkSwitch}
            menuOpen={menuOpen}
            handleMenuOpen={handleMenuOpen}
          />
          <div className="m-auto px-6 pb-10 text-lg text-gray-900 transition duration-200 ease-in-out dark:text-gray-300 md:max-w-3xl">
            <MDXProvider components={mdxComponents}>
              <main>{children}</main>
            </MDXProvider>
            {/* <footer className="text-gray-600 mt-32 pb-12">
              © {new Date().getFullYear()} Danny Libin. All Rights
              Reserved.
            </footer> */}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;
