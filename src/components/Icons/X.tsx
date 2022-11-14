export function X({
  width = 192,
  height = 192,
  fill = "none",
  color = "#1a1919",
}: {
  width?: number;
  height?: number;
  fill?: string;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 256 256"
    >
      <rect width={width} height={height} fill={fill}></rect>
      <line
        x1="200"
        y1="56"
        x2="56"
        y2="200"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      ></line>
      <line
        x1="200"
        y1="200"
        x2="56"
        y2="56"
        fill="none"
        stroke="#1a1919"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      ></line>
    </svg>
  );
}
