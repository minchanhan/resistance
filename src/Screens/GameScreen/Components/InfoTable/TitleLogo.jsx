import React from "react";
import "../../../../App.css";

function TitleLogo() {
  return (
    <svg id="titleLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100">
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Impact, sans-serif"
        fontSize={40}
        fill="#000000"
        transform="rotate(-15 200 50)"
      >
        <animate attributeName="fill" values="#DF4730;#000000;#000000;#000000;#DF4730" dur="8s" repeatCount="indefinite" />
        {"The Rebellion"}
      </text>
    </svg>
  )
}

export default TitleLogo;
