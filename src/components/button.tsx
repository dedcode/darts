import React from 'react';
import { classNames } from '../utils/util';
import Spinner from './svg/spinner';

export function getButtonVariantClasses(variant: string) {
  let variantText = '';
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantText = 'text-white';
      variantStyle = classNames(
        'bg-teal-600 hover:bg-teal-500 disabled:bg-teal-400 font-semibold',
        variantText
      );
      break;

    case 'red':
      variantText = 'text-white';
      variantStyle = classNames(
        'bg-red-600 hover:bg-red-500 disabled:bg-red-400 font-semibold',
        variantText
      );
      break;

    case 'green':
      variantText = 'text-white';
      variantStyle = classNames(
        'bg-green-600 hover:bg-green-500 disabled:bg-green-400 font-semibold',
        variantText
      );
      break;

    case 'secondary':
      variantText = 'text-teal-900 disabled:text-gray-500';
      variantStyle = classNames(
        'bg-teal-200 hover:bg-teal-300 disabled:bg-gray-200',
        variantText
      );
      break;

    case 'outline':
      variantText = 'text-gray-700 disabled:text-gray-400';
      variantStyle = classNames(
        'border border-gray-300 bg-white hover:bg-gray-100 disabled:border-gray-100 font-semibold',
        variantText
      );
      break;

    case 'blank':
      variantText = 'text-gray-600 disabled:text-gray-400';
      variantStyle = classNames(
        'border border-none shadow-none bg-transparent hover:text-gray-900 hover:bg-gray-200 disabled:border-gray-100 font-semibold',
        variantText
      );
      break;
  }
  return {
    variantText,
    variantStyle
  };
}

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'blank'
  | 'red'
  | 'green'
  | 'unstyled';

type Props = React.PropsWithRef<JSX.IntrinsicElements['button']> & {
  isLoading?: boolean;
  variant?: ButtonVariants;
};

export default function Button({
  className,
  children,
  isLoading = false,
  variant = 'primary',
  ...delegated
}: Props) {
  const { variantStyle, variantText } = getButtonVariantClasses(variant);

  return (
    <button
      className={classNames(
        !(variant === 'unstyled') &&
          'relative w-full rounded-xl px-5 py-[10px] font-semibold shadow-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 disabled:cursor-not-allowed',
        variantStyle,
        className
      )}
      {...delegated}
    >
      <>
        {isLoading && (
          <Spinner
            className={classNames(
              'absolute inset-0 m-auto h-5 w-5',
              variantText
            )}
          />
        )}
        <span
          aria-hidden={isLoading}
          className={classNames(isLoading && 'invisible')}
        >
          {children}
        </span>
      </>
    </button>
  );
}
