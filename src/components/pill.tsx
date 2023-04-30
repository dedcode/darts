import { classNames } from '../utils/util';

type Props = {
  children: React.ReactNode;
  active?: boolean;
};
export default function Pill({ children, active }: Props) {
  return (
    <span
      className={classNames(
        'cursor-pointer rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold tracking-widest text-teal-700 transition duration-200 ease-in-out hover:bg-teal-200 hover:text-teal-800 dark:hover:bg-teal-500 dark:hover:text-teal-50',
        !active && 'dark:bg-teal-700 dark:text-teal-100',
        active && 'bg-teal-200 text-teal-800 dark:bg-teal-500 dark:text-teal-50'
      )}
    >
      {children}
    </span>
  );
}
