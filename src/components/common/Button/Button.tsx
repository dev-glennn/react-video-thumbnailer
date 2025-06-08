import { buttonVariant } from './Button.css';
import { memo, type ButtonHTMLAttributes } from 'react';

type ButtonVariants = keyof typeof buttonVariant;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export const Button = memo(
  ({ variant = 'primary', className, ...props }: Props) => {
    return (
      <button className={`${buttonVariant[variant]} ${className}`} {...props} />
    );
  }
);
