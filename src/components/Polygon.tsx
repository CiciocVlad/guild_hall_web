export const Polygon = ({ color, style }: { color: string; style: any }) => (
  <svg
    width="10"
    height="16"
    viewBox="0 0 10 16"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M9.17412 7.25671C9.6155 7.65395 9.6155 8.34605 9.17412 8.74329L1.66897 15.4979C1.02544 16.0771 1.18085e-06 15.6204 1.21869e-06 14.7546L8.55526e-07 1.24536C8.9337e-07 0.379591 1.02544 -0.0771021 1.66897 0.502068L9.17412 7.25671Z"
      fill={color}
    />
  </svg>
);
