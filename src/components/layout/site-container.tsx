import { cn } from "@/lib/utils";

interface SiteContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a different element (e.g. "article") without losing the container styling. */
  as?: "div" | "article" | "header" | "footer" | "nav";
}

/**
 * Reusable max-width container with the responsive horizontal padding
 * defined in the blueprint (mobile 20px, tablet 32px, desktop 48-64px).
 */
export function SiteContainer({
  as: Tag = "div",
  className,
  children,
  ...props
}: SiteContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
