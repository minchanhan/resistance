import React from "react";
import "../../../../App.css";

function TitleLogo() {
  return (
    <div className="titleLogo">
      <svg width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100">
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Impact, sans-serif"
        fontSize={40}
        fill="#FFFFFF"
      >
        <animate attributeName="fill" values="#DF4730;#FFFFFF;#FFFFFF;#FFFFFF;#FFFFFF;#DF4730" dur="10s" repeatCount="indefinite" />
        {"The Rebellion"}
      </text>
    </svg>
    </div>
  )
}

export default TitleLogo;
