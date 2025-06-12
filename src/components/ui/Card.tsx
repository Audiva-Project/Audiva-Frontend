import type { ReactNode } from "react"
import "./Card.css"

interface CardProps {
  children: ReactNode
  className?: string
  padding?: "sm" | "md" | "lg"
  shadow?: "sm" | "md" | "lg" | "xl"
}

const Card = ({ children, className = "", padding = "md", shadow = "md" }: CardProps) => {
  const baseClass = "card"
  const paddingClass = `card-padding-${padding}`
  const shadowClass = `card-shadow-${shadow}`

  const classes = [baseClass, paddingClass, shadowClass, className].filter(Boolean).join(" ")

  return <div className={classes}>{children}</div>
}

export default Card
