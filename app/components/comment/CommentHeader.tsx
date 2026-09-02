import { motion } from "framer-motion";

type CommentHeaderProps = {
  title: string;
};

export function CommentHeader({ title }: CommentHeaderProps) {
  return (
    <motion.h2
      className="text-center text-3xl font-extrabold text-white drop-shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
  );
}
