import React from "react";

export default function Repositorio({match}) {
  return (
    <div>
      <h1 style={{color: "#FFF"}}>
        Repositório {decodeURIComponent(match.params.repositorioParam)}
      </h1>
    </div>
  );
}