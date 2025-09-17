import React from 'react'
import * as motion from 'motion/react-client'

type Direction = 'top' | 'bottom' | 'left' | 'right'

interface FadeInProps {
  children: React.ReactNode
  from?: Direction
  opacity?: boolean
  duration?: number
  delay?: number
  stagger?: boolean
  staggerDelay?: number
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  from,
  opacity = true,
  duration = 0.4,
  delay = 0,
  stagger = false,
  staggerDelay = 0.05,
}) => {
  const initialPosition = () => {
    switch (from) {
      case 'top':
        return { y: -50 }
      case 'bottom':
        return { y: 50 }
      case 'left':
        return { x: -50 }
      case 'right':
        return { x: 50 }
      default:
        return { y: 0 }
    }
  }

  return (
    <motion.div
      initial={{ ...initialPosition(), opacity: opacity ? 0 : 1 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        x: { duration, delay },
        y: { duration, delay },
        opacity: opacity ? { duration, delay: delay + duration * 0.3 } : { duration: 0 },
      }}
    >
      {stagger && React.Children.count(children) > 1 ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: staggerDelay }}
        >
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { ...initialPosition(), opacity: opacity ? 0 : 1 },
                visible: { x: 0, y: 0, opacity: 1 },
              }}
              transition={{
                x: { duration, delay: delay + index * staggerDelay },
                y: { duration, delay: delay + index * staggerDelay },
                opacity: opacity
                  ? { duration, delay: delay + index * staggerDelay + duration * 0.3 }
                  : { duration: 0 },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

export default FadeIn
