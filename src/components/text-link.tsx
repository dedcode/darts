import Link from 'next/link';
import React from 'react';
import { classNames } from '../utils/util';

type Props = React.PropsWithRef<JSX.IntrinsicElements['a']>;

export default function TextLink({
  href,
  target,
  rel,
  className,
  children,
  ...delegated
}: Props) {
  const external = href.match(/(^http|^mailto)/i);
  const internalImage = href.match(/(^\/static\/)/i);

  // Open external links and internal images in a new tab
  // If we use Gatsby's link for an internal image, it breaks
  if (typeof target === 'undefined')
    target = external || internalImage ? '_blank' : '_self';

  // External links should have noopener for security
  // Prevents the new page from being able to access to window.opener
  if (external) rel = 'noopener';

  const link =
    external || internalImage ? (
      <a
        className={classNames(
          'rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
          className
        )}
        href={href}
        rel={rel}
        target={target}
        {...delegated}
      >
        {children}
      </a>
    ) : (
      <Link href={href} legacyBehavior>
        {children}
      </Link>
    );

  return (
    <span
      className={classNames(
        'border-b-2 border-teal-500 text-gray-900 transition duration-200 ease-in-out hover:border-transparent hover:text-teal-500 focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-gray-300 dark:hover:text-teal-500',
        className
      )}
    >
      {link}
    </span>
  );
}
