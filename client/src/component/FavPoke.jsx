import React from "react";
import LikePoke from "./LikePoke";

const FavPoke = ({ fav }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {fav.map((f, i) => (
        <div key={i}>
            <h3>{f.name}</h3>
            <img src={f?.sprites?.other?.home.front_default} alt={f?.name}/>
            <LikePoke/>
        </div>
      ))}
    </div>
  );
};

export default FavPoke;
