/**
 * Container Component
 *
 * A layout component that provides consistent padding and max-width
 * across the application.
 *
 * @component
 * @example
 * ```tsx
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 * ```
 */

import {
  forwardRef,
  ElementType,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils/classNames";

/**
 * Container sizes configuration
 */
const containerSizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-2xl",
  full: "max-w-full",
} as const;

// Type for the size prop
type ContainerSize = keyof typeof containerSizes;

// Generic polymorphic component type
type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>["ref"];

// Polymorphic props with "as" prop
type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  size?: ContainerSize;
  fluid?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "fluid">;

/**
 * Container component props
 */
export type ContainerProps<T extends ElementType = "div"> = PolymorphicProps<T>;

/**
 * Container component providing consistent padding and max-width
 */
const Container = forwardRef(
  <T extends ElementType = "div">(
    {
      children,
      className,
      size = "lg",
      fluid = false,
      as,
      ...props
    }: ContainerProps<T>,
    ref: PolymorphicRef<T>
  ) => {
    const Component = as || "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 md:px-6 lg:px-8 ",
          !fluid && (containerSizes[size] || containerSizes.lg),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export default Container;
