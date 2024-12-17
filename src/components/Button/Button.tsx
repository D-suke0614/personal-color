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
  const baseClass =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  return (
    <button onClick={onClick} className={baseClass} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
