import { ButtonHTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, disabled, ...props }: Props) => {
  return (
    <button
      className={` px-8 py-4 m-1 border-2 border-gray-300 rounded-md ${
        disabled ? 'bg-gray-800 text-gray-500' : 'bg-blue-500 text-white '
      } ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};

export default Button;
