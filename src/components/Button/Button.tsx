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
  const stateClass = `${disabled ? 'opacity-50' : 'hover:bg-blue-700'}`;
  return (
    <button
      onClick={onClick}
      className={`min-w-48 rounded-xl bg-primary px-4 py-3 text-center text-2xl font-bold text-black shadow-primary ${stateClass}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
