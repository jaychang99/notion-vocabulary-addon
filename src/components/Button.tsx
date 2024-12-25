import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = ({ className, disabled, isLoading, ...props }: Props) => {
  return (
    <button
      className={` px-8 py-4 m-1 border-2 border-gray-300 rounded-md ${
        disabled ? 'bg-gray-800 text-gray-500' : 'bg-blue-500 text-white '
      }
      ${isLoading ? 'bg-gray-800' : ''}
      ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};

export default Button;
