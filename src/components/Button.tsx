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
  const baseClass = 'font-medium';
  return (
    <button onClick={onClick} className={baseClass} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
