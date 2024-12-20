'use client';

type ButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const baseClass = ` ${disabled ? 'opacity-50' : 'hover:bg-blue-700'}`;
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-blue-500 px-4 py-2 font-bold text-white ${baseClass}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
