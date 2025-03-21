"use client";

import { forwardRef, ReactNode, ElementType } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/classNames";

// Button variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-pink hover:bg-accent/90 text-white shadow",
        secondary: "bg-secondary hover:bg-secondary/80 text-white",
        outline:
          "border border-gray-600 hover:border-accent text-white bg-transparent hover:bg-secondary/50",
        ghost: "hover:bg-secondary/50 text-white bg-transparent",
        link: "text-accent underline-offset-4 hover:underline bg-transparent",
        success: "bg-success hover:bg-highlight/90 text-white shadow",
        dark: "bg-dark-300 hover:bg-highlight/90 text-white shadow",
      },
      size: {
        sm: "h-9 px-3 rounded-md text-xs",
        md: "h-10 px-4 py-2 rounded-md text-sm",
        lg: "h-12 px-6 py-3 rounded-md text-base",
        icon: "h-10 w-10 rounded-full",
        pill: "h-10 px-6 rounded-full",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Button props
interface ButtonProps extends VariantProps<typeof buttonVariants> {
  as?: ElementType;
  href?: string;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: string;
}

// Button component
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      fullWidth,
      leftIcon,
      rightIcon,
      isLoading,
      loadingText = "Loading...",
      as: Component = "button",
      href,
      ...props
    },
    ref
  ) => {
    const commonProps = {
      className: cn(
        buttonVariants({ variant, size, fullWidth }),
        isLoading && "opacity-70 cursor-wait",
        className
      ),
      "aria-disabled": isLoading || undefined, // 🛠 Sửa lỗi Booleanish
      ...props,
    };

    const content = isLoading ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {loadingText}
      </>
    ) : (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    if (Component === "a" || Component === Link) {
      return (
        <Component
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href || "#"}
          {...commonProps}
        >
          {content}
        </Component>
      );
    }

    return (
      <Component ref={ref as React.Ref<HTMLButtonElement>} {...commonProps}>
        {content}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
export { buttonVariants };
