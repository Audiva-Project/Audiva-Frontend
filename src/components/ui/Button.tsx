import type { ReactNode, ButtonHTMLAttributes } from "react"
import "./Button.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseClass = "btn"
  const variantClass = `btn-${variant}`
  const sizeClass = `btn-${size}`
  const loadingClass = loading ? "btn-loading" : ""

  const classes = [baseClass, variantClass, sizeClass, loadingClass, className].filter(Boolean).join(" ")

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="btn-spinner" />}
      {children}
    </button>
  )
}

export default Button
