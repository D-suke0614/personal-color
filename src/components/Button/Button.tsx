'use client';

type ButtonProps<T> = {
  children: string;
  onClick?: () => T;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button = <T,>({
  children,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps<T>) => {
  const baseClass = `${disabled ? 'opacity-50' : 'hover:bg-blue-700'}`;
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-blue-500 px-10 py-4 font-bold text-white ${baseClass}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
