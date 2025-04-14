interface CautionTapeProps {
  className?: string;
  stripeColors?: {
    primary: string;
    secondary: string;
  };
  stripeWidth?: number;
  angle?: number;
}

export default function CautionTape({
  className = "",
  stripeColors = {
    primary: "#FFEB3B", // Yellow
    secondary: "#000000", // Black
  },
  stripeWidth = 16, // Width of each stripe in pixels
  angle = 45, // Angle of stripes in degrees
}: CautionTapeProps) {
  return (
    <div
      className={`h-7 w-full ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(
            ${angle}deg,
            ${stripeColors.secondary} 0px,
            ${stripeColors.secondary} ${stripeWidth}px,
            ${stripeColors.primary} ${stripeWidth}px,
            ${stripeColors.primary} ${stripeWidth * 2}px
          )`,
      }}
      aria-hidden="true"
    />
  );
}
