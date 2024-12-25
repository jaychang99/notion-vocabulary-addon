'use client';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const Textarea = ({ value, onChange, placeholder }: Props) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-96 h-20 p-2 border border-gray-300 rounded-md
      bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Textarea;
