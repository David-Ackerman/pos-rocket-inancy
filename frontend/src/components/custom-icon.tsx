import { cn } from "@/lib/utils";
import { getSecondaryColor } from "@/utils/categories-utils";
import { Car } from "lucide-react";

interface CustomIconProps {
  Icon: typeof Car;
  color: string;
  withoutBackground?: boolean;
}

export function CustomIcon({
  Icon,
  color,
  withoutBackground = false,
}: CustomIconProps) {
  const secondaryColor = getSecondaryColor(color);

  return (
    <div
      className={cn(
        "flex items-center size-10 rounded-md  justify-center",
        withoutBackground ? "" : secondaryColor,
      )}
    >
      <Icon className={cn("size-4", color)} />
    </div>
  );
}
