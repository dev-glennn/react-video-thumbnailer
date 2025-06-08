import { buttonVariant } from './Button.css';
import { type ButtonHTMLAttributes } from 'react';

type ButtonVariants = keyof typeof buttonVariant;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export const Button = ({ variant = 'primary', className, ...props }: Props) => {
  return (
    <button className={`${buttonVariant[variant]} ${className}`} {...props} />
  );
};
