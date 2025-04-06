'use client';

type ButtonProps<T> = {
  children: React.ReactNode;
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
  return (
    <button
      onClick={onClick}
      className="min-w-48 rounded-xl bg-primary px-8 py-3 text-center text-[20px] font-bold text-black shadow-primary hover:opacity-80 disabled:opacity-50"
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
