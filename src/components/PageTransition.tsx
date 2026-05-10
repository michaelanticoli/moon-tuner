import { motion } from "framer-motion";
import { ReactNode } from "react";
import { pageEnter } from "@/design-system/motion";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageEnter}
    >
      {children}
    </motion.div>
  );
}
