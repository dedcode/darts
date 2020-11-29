import React, { useEffect, useState } from 'react';
import Header from './header';

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  darkMode: false
});

const Layout = ({ children }: Props) => {
  //const { darkMode, setDarkMode } = useDarkMode(false);
  const darkMode = false;
  const [menuOpen, setMenuOpen] = useState(false);
  //const handleDarkSwitch = () => setDarkMode(!darkMode);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

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
        <div className="min-h-screen dk:bg-gray-900 transition duration-200 ease-in-out border-t-4 border-teal-500">
          <Header menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />
          <div className="m-auto text-gray-900 dk:text-gray-300 text-lg px-6 md:max-w-3xl transition duration-200 ease-in-out">
            <main>{children}</main>
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
