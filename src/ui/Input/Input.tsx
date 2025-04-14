import React from 'react';

import styles from './Input.module.css';

type InputVariant = 'default' | 'compact';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

const variantStyles: Record<InputVariant, string> = {
  default: styles.inputDefault,
  compact: styles.inputCompact,
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${variantStyles[variant]}`}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
