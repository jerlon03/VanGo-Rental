'use client'
import { motion, MotionProps } from "framer-motion";
import React, { ReactNode } from "react";
import Image from 'next/image';  // Assuming you're using Next.js and Image component

// Interface for ScrollSection props
interface ScrollSectionProps {
  children: ReactNode; // To allow any valid React children
  animationProps?: MotionProps; // Framer Motion props for additional animations
  className?: string; // Optional className for custom styling
}

// ScrollSection component with animations
const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  animationProps,
  className, // Destructure className from props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }} // Start with opacity 0, slightly offset vertically, and scale down
      whileInView={{ opacity: 1, y: 0, scale: 1 }} // Fade in, move to normal position, and scale to 100%
      transition={{
        opacity: { duration: 1.2 },
        y: { type: 'spring', stiffness: 100, damping: 25, duration: 1.2 },
        scale: { duration: 1.2 },
      }} // Define the transition for each property
      className={className} // Apply the className to the motion.div
      {...animationProps} // Apply any additional animation props
      style={{
        display: "block", // Ensure the motion.div is treated as a block element
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSection;
