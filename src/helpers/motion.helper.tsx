import { motion, MotionStyle } from "framer-motion";

export const textVariants = {
   initial: {
     opacity: 0,
     x: 20,
   },
   animate: {
     opacity: 1,
     x: 0,
   },
 };
 
 export const warningVariants = {
   initial: {
     opacity: 0,
     y: -20,
   },
   animate: {
     opacity: 1,
     y: 0,
     transition: {
       delay: 0.625,
     },
   },
   exit: {
     opacity: 0,
     y: -5,
   },
 };
 
 export const buttonVariants = {
   initial: {
     opacity: 0,
     y: -50,
   },
   animate: {
     opacity: 1,
     y: 0,
     transition: {
       delay: 0.625,
     },
   },
   exit: {
     opacity: 0,
     y: 2,
   },
 };
 
 export const sentenceVariant = {
   initial: {
     opacity: 1,
   },
   animate: {
     opacity: 1,
     transition: {
       delayChildren: 0,
       staggerChildren: 0.02,
     },
   },
 };
 
 export const letterVariant = {
   initial: {
     opacity: 0,
     y: 0,
   },
   animate: {
     opacity: 1,
     y: 0,
   },
 };
 
 export const wrapperVariants = {
   initial: {
     opacity: 0,
     y: 10,
   },
   animate: {
     opacity: 1,
     y: 0,
   },
 };
 
 export const connectVariants = {
   initial: {
     opacity: 0,
     x: 10,
   },
   animate: {
     opacity: 1,
     x: 0,
   },
   exit: {
     opacity: 0,
     x: 10,
   },
 };
 
 export const accountVariants = {
   initial: {
     y: "-100%",
     opacity: 0,
   },
   animate: {
     opacity: 1,
     y: 0,
   },
   exit: {
     opacity: 0,
     y: -1,
   },
 };
 

export const effectText = (text: string, style?: MotionStyle) => {
   return (
      <motion.p
         variants={sentenceVariant}
         initial="initial"
         animate="animate"
         style={{ margin: `0`, ...style }}
      >
         {text.split("").map((letter, index) => (
            <motion.span key={`${letter}-${index}`} variants={letterVariant}>
               {letter}
            </motion.span>
         ))}
      </motion.p>
   );
};
