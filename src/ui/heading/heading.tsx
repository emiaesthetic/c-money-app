import React from 'react';

import styles from './heading.module.css';

interface Props {
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'sizeLarge' | 'sizeMedium';
  marginBottom?: 'mbLarge' | 'mbMedium' | 'mbSmall';
  center?: boolean;
  children: React.ReactNode;
}

export const Heading = ({
  level = 'h2',
  size = 'sizeLarge',
  marginBottom,
  center = false,
  children,
}: Props) => {
  const Tag = level;
  const marginClass = marginBottom ? styles[marginBottom] : '';
  const centerClass = center ? styles.center : '';

  return (
    <Tag
      className={`${styles.title} ${styles[size]} ${marginClass} ${centerClass}`}
    >
      {children}
    </Tag>
  );
};
