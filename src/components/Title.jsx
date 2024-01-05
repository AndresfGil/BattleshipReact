import React from "react";
import logo from "../resources/TitleIcon.png";

export const Title = () => {
  return (
    <div className="title-container">
      <h1>
        <img src={logo} alt="Logo del mapa" width={60} height={60} /> 
        Battleship{" "}
        <img src={logo} alt="Logo del mapa" width={60} height={60} />
      </h1>
    </div>
  );
};
