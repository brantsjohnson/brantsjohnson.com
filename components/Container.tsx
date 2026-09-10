import { ReactNode } from "react";

/**
 * Container component.
 *
 * Purpose: keeps content at a comfortable reading width and applies consistent
 * horizontal padding on every screen size. Used to wrap page sections so the
 * whole site shares one set of margins.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
