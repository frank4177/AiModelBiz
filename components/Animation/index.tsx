import { motion} from "framer-motion";

export const PullUpAnimation = ({ children, isActive = true }: any) => {
    return (
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 1, y: 10 }}
      transition={{ 
        duration: 0.9, 
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      >
        {children}
      </motion.div>
    );
  };