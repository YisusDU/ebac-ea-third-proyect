import * as React from "react";
const SvgUser = (props) => (
  <svg viewBox="-0.5 0 33 33" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="99.045%" id="a">
        <stop stopColor="#B4B5C6" offset="0%" />
        <stop stopColor="#8F90A1" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M2520.5 35a9.5 9.5 0 0 1 4.581 17.825C2531.427 54.947 2536 60.94 2536 68h-32c0-7.3 4.888-13.458 11.57-15.379A9.5 9.5 0 0 1 2520.5 35"
      transform="translate(-2504 -35)"
      fill="url(#a)"
    />
  </svg>
);
export default SvgUser;
