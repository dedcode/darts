import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useContext } from 'react';
import { ThemeContext } from './layout';
import MoonIcon from './svg/moon-icon';
import SunIcon from './svg/sun-icon';

type Props = {
    handleDarkSwitch: () => void;
    menuOpen: boolean;
    handleMenuOpen: () => void;
};

const navClassName =
    'transition duration-200 ease-in-out md:ml-4 mt-2 md:mt-0 px-3 py-2 text-xl font-medium text-gray-900 border-b-2 border-transparent dark:text-gray-100 dk-hover:text-teal-500 hover:border-teal-500 hover:text-teal-500 hover:text-teal-500 focus:outline-none';
const mobileNavClassName =
    'transition duration-200 ease-in-out md:ml-4 mt-2 md:mt-0 px-3 py-2 text-xl font-medium text-teal-100 border-b-2 border-transparent hover:text-teal-500 hover:border-teal-500 focus:outline-none';
const activeClassName = ' border-b-2 border-teal-500 dark:border-teal-500';

type HeaderLinkProps = {
    href: string;
    isActive: boolean;
    isMobile: boolean;
    handleMenuOpen: () => void;
    children: React.ReactNode;
};

function HeaderLink({ href, isActive, isMobile, handleMenuOpen, children }: HeaderLinkProps) {
    let linkClass = isMobile ? mobileNavClassName : navClassName;
    if (isActive) linkClass += activeClassName;
    return (
        isMobile ?
            <Link href={href} className={linkClass} onClick={handleMenuOpen}>
                {children}
            </Link> :
            <Link href={href} className={linkClass}>
                {children}
            </Link>
    );
}

export default function Header({
    handleDarkSwitch,
    menuOpen,
    handleMenuOpen
}: Props) {
    const { darkMode } = useContext(ThemeContext);
    const router = useRouter();

    return (
        <header className="relative mx-auto mt-3 max-w-4xl px-6 text-xl lg:px-8">
            <div className="flex items-center justify-between md:h-16">
                <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
                    <div className="flex justify-between">
                        <Link
                            href="/"
                            className="rounded-md px-3 py-2 text-3xl font-medium text-gray-900 dark:text-teal-100"
                        >
                            <span className="flex flex-row items-center">
                                <img
                                    src={
                                        darkMode ? '/images/dl-dark.png' : '/images/dl-light.png'
                                    }
                                    alt="Danny Libin initials logo"
                                />
                            </span>
                        </Link>
                        {/* Mobile Nav Button */}
                        <div className="absolute right-0 top-0 mr-5 mt-2 flex md:hidden">
                            <button
                                onClick={handleMenuOpen}
                                className="dk-hover:text-teal-500 inline-flex items-center justify-center rounded-md p-2 text-gray-900 transition duration-200 ease-in-out hover:text-teal-500 focus:text-white focus:outline-none dark:text-gray-100"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={'inline-flex ' + (menuOpen ? 'hidden' : '')}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={'inline-flex ' + (menuOpen ? '' : 'hidden')}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Desktop Nav Bar */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline">
                            <HeaderLink
                                href="/posts/"
                                isMobile={false}
                                isActive={router.asPath.match(/(^\/posts)/i)?.length > 0}
                                handleMenuOpen={handleMenuOpen}
                            >
                                Posts
                            </HeaderLink>
                            <HeaderLink
                                href="/projects/"
                                isMobile={false}
                                isActive={router.asPath.match(/(^\/projects)/i)?.length > 0}
                                handleMenuOpen={handleMenuOpen}
                            >
                                Projects
                            </HeaderLink>
                            <HeaderLink
                                href="/lab/"
                                isMobile={false}
                                isActive={router.asPath.match(/(^\/lab)/i)?.length > 0}
                                handleMenuOpen={handleMenuOpen}
                            >
                                Lab
                            </HeaderLink>
                            <HeaderLink
                                href="/"
                                isMobile={false}
                                isActive={router.asPath == '/'}
                                handleMenuOpen={handleMenuOpen}
                            >
                                About
                            </HeaderLink>
                            <button
                                className="dk-hover:text-teal-400 ml-4 self-center border-b-2 border-transparent px-3 py-2 text-xl font-medium text-gray-900 transition duration-200 ease-in-out hover:border-transparent hover:text-teal-500 focus:outline-none dark:text-gray-100 dark:hover:text-teal-500"
                                onClick={handleDarkSwitch}
                            >
                                {darkMode ? (
                                    <SunIcon className="w-8" />
                                ) : (
                                    <MoonIcon className="w-8" />
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Mobile Nav Menu */}
                    <div
                        className={
                            'absolute inset-0 z-50 -mt-3 flex h-screen w-full justify-center text-center md:hidden ' +
                            (menuOpen ? '' : 'hidden')
                        }
                        style={{
                            backgroundColor: 'hsla(215, 41%, 28%, 97%)'
                        }}
                    >
                        <button
                            onClick={handleMenuOpen}
                            className="absolute right-0 top-0 mr-5 mt-5 inline-flex items-center justify-center rounded-md p-2 text-teal-100 transition duration-200 ease-in-out hover:text-teal-500 focus:text-white focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={'inline-flex ' + (menuOpen ? 'hidden' : '')}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={'inline-flex ' + (menuOpen ? '' : 'hidden')}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="flex flex-col justify-center">
                            <HeaderLink
                                href="/posts/"
                                isMobile={true}
                                isActive={router.asPath.match(/(^\/posts)/i)?.length > 0}
                                handleMenuOpen={handleMenuOpen}
                            >
                                Posts
                            </HeaderLink>
                            <HeaderLink
                                href="/projects/"
                                isMobile={true}
                                isActive={router.asPath.match(/(^\/projects)/i)?.length > 0}
                                handleMenuOpen={handleMenuOpen}
                            >
                                Projects
                            </HeaderLink>
                            <HeaderLink
                                href="/lab/"
                                isMobile={true}
                                isActive={router.asPath.match(/(^\/lab)/i)?.length > 0}
                                handleMenuOpen={handleMenuOpen}
                            >
                                Lab
                            </HeaderLink>
                            <HeaderLink
                                href="/"
                                isMobile={true}
                                isActive={router.asPath == '/'}
                                handleMenuOpen={handleMenuOpen}
                            >
                                About
                            </HeaderLink>
                            {/* <Link
                to="/about/"
                className={mobileNavClassName}
                activeClassName={mobileNavClassName + activeClassName}
              >
                About
              </Link> */}
                            <button
                                className="mt-2 block self-center border-b-2 border-transparent px-3 py-2 text-xl font-medium text-gray-100 transition duration-200 ease-in-out hover:border-transparent hover:text-teal-400 focus:outline-none"
                                onClick={handleDarkSwitch}
                            >
                                {darkMode ? (
                                    <SunIcon className="w-8" />
                                ) : (
                                    <MoonIcon className="w-8" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
