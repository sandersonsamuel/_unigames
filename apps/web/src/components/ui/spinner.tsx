import { Loader, LucideProps } from "lucide-react";

interface SpinnerProps extends LucideProps {
  className?: string;
}

export const Spinner = ({ className, ...rest }: SpinnerProps) => {
  return <Loader {...rest} className={`animate-spin ${className || ""}`} />;
};
