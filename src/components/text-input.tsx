import React, { forwardRef, LegacyRef } from 'react';

type Props = React.PropsWithRef<JSX.IntrinsicElements['input']> & {
  symbolPrefix?: string;
  symbolSuffix?: string;
};

function TextInput(
  { symbolPrefix, symbolSuffix, className, ...delegated }: Props,
  ref: LegacyRef<HTMLInputElement>
) {
  const rawInput = (
    <input
      className={
        'rounded-md border-gray-300 bg-gray-100 shadow-sm transition-colors duration-75 hover:border-teal-300 focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 dark:text-gray-600' +
        (className ? ' ' + className : '')
      }
      ref={ref}
      {...delegated}
    />
  );

  if (!symbolPrefix && !symbolSuffix) return rawInput;
  return (
    <div className="relative">
      {symbolPrefix && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-medium text-gray-600">
          {symbolPrefix}
        </span>
      )}
      {rawInput}
      {symbolSuffix && (
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 font-medium text-gray-600">
          {symbolSuffix}
        </span>
      )}
    </div>
  );
}

export default forwardRef(TextInput);
