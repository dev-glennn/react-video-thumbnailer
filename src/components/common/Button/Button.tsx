import { memo, type ButtonHTMLAttributes } from 'react';
import { buttonBase, buttonVariant, buttonSize } from './Button.css';

type ButtonVariants = keyof typeof buttonVariant;
type ButtonSizes = keyof typeof buttonSize;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

export const Button = memo(
  ({ variant = 'primary', size = 'md', className = '', ...props }: Props) => {
    return (
      <button
        className={`${buttonBase} ${buttonVariant[variant]} ${buttonSize[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
