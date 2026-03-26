import React from 'react';
import { Bug, LucideProps } from 'lucide-react';

// Custom Bee icon using Lucide's Bug as base
export const Bee = (props: LucideProps) => (
  <Bug {...props} className={`${props.className || ''}`} />
);

// Custom language icons if needed
export const Icons = {
  Bee
};

export default Icons;