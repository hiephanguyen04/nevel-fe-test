/**
 * Card Component
 * 
 * A reusable card component with multiple variants.
 * Used for displaying content in a contained card format.
 * 
 * @component
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description</Card.Description>
 *   </Card.Header>
 *   <Card.Body>Card content goes here</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 * ```
 */

'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/classNames';

/**
 * Card component props
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'elevated';
  hoverable?: boolean;
}

/**
 * Header component props
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Title component props
 */
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

/**
 * Description component props
 */
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

/**
 * Body component props
 */
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Footer component props
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Image component props
 */
export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Badge component props
 */
export interface CardBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

/**
 * Main Card component
 */
const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  children,
  variant = 'default',
  hoverable = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg overflow-hidden",
        variant === 'default' && "bg-secondary",
        variant === 'outline' && "bg-transparent border border-gray-700",
        variant === 'elevated' && "bg-secondary shadow-lg",
        hoverable && "transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

/**
 * Card Header component
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-b border-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

/**
 * Card Title component
 */
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

/**
 * Card Description component
 */
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-400", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

/**
 * Card Body component
 */
const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardBody.displayName = "CardBody";

/**
 * Card Footer component
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-t border-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

/**
 * Card Image component
 */
const CardImage = forwardRef<HTMLDivElement, CardImageProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardImage.displayName = "CardImage";

/**
 * Card Badge component
 */
const CardBadge = forwardRef<HTMLSpanElement, CardBadgeProps>(({
  className,
  children,
  variant = 'primary',
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "absolute top-2 left-2 px-2 py-1 text-xs rounded",
        variant === 'primary' && "bg-accent text-white",
        variant === 'secondary' && "bg-secondary text-white",
        variant === 'success' && "bg-highlight text-white",
        variant === 'warning' && "bg-yellow-500 text-black",
        variant === 'danger' && "bg-red-600 text-white",
        variant === 'info' && "bg-blue-500 text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

CardBadge.displayName = "CardBadge";

// Create compound component
type CardComponent = typeof Card & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof CardImage;
  Badge: typeof CardBadge;
};

// Set component hierarchy
(Card as CardComponent).Header = CardHeader;
(Card as CardComponent).Title = CardTitle;
(Card as CardComponent).Description = CardDescription;
(Card as CardComponent).Body = CardBody;
(Card as CardComponent).Footer = CardFooter;
(Card as CardComponent).Image = CardImage;
(Card as CardComponent).Badge = CardBadge;

export default Card as CardComponent;