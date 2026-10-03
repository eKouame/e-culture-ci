import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg
        width="180"
        height="180"
        viewBox="0 0 187.95 187.95"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="avatar-gradient"
            x1="182.16"
            y1="214.32"
            x2="33.36"
            y2="11.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#e47b25" />
            <stop offset=".22" stopColor="#e47d28" />
            <stop offset=".42" stopColor="#e58633" />
            <stop offset=".61" stopColor="#e69546" />
            <stop offset=".8" stopColor="#e8aa5f" />
            <stop offset=".98" stopColor="#eac481" />
            <stop offset="1" stopColor="#ebc986" />
          </linearGradient>
        </defs>
        <rect
          x="-7.73"
          y="-7.73"
          width="203.4"
          height="203.4"
          fill="url(#avatar-gradient)"
        />
        <path
          fill="#fff"
          d="M124.9,85.88h-10.9c-.63-11-3.27-19.49-7.91-25.45-5.27-6.76-13.12-10.15-23.56-10.15s-18.9,3.61-24.63,10.82c-5.73,7.22-8.59,17.47-8.59,30.76v6.7c0,12.56,3.12,22.22,9.36,28.97,6.24,6.75,14.94,10.12,26.09,10.12,5.93,0,11.43-1.16,16.5-3.46,5.07-2.31,8.93-5.34,11.59-9.07l-8.52-13.32c-4.86,5.04-10.92,7.56-18.19,7.56-5.02,0-8.72-1.45-11.13-4.34-2.4-2.88-3.75-7.44-4.06-13.66h53.95v-15.48ZM82.38,68.59c3.78,0,6.45,1.3,7.98,3.89,1.53,2.6,2.35,6.41,2.46,11.45v1.96h-21.71c.31-6.04,1.32-10.43,3.03-13.17,1.71-2.75,4.46-4.13,8.25-4.13Z"
        />
        <rect x="132.2" y="85.88" width="16.8" height="16.8" fill="#2f8741" />
      </svg>
    ),
    { ...size },
  );
}
