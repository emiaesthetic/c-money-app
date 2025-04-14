import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'iconText' | 'icon';
  size?: 'small' | 'medium' | 'large';
  gap?: 'gap3' | 'gap6';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', fullWidth = false, size, gap, children, ...props },
    ref,
  ) => {
    const variantClass = styles[`${variant}`] || '';
    const sizeClass = styles[`${size}`] || '';
    const gapClass = gap ? styles[`${gap}`] : '';
    const widthClass = fullWidth ? styles.fullWidth : '';

    return (
      <button
        ref={ref}
        className={`${styles.button} ${variantClass} ${sizeClass} ${gapClass} ${widthClass}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
