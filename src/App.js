import React, { useState } from "react";
import heroes from "./heroes.json";
import "./App.css";

function App() {
  const [retinuesList, setRetinuesList] = useState([]);

  const handleOnDragStart = heroId => e => {
    e.dataTransfer.setData("id", heroId);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleOnDrop = e => {
    let droppedHeroId = e.dataTransfer.getData("id");
    let filteredHero = heroes.data.filter(hero => hero.id === droppedHeroId);
    setRetinuesList([...retinuesList, ...filteredHero]);
  };

  return (
    <div className="App">
      <div className="Hero-list-section">
        <h1>Hero list</h1>
        <div className="Hero-list">
          {heroes.data.map(hero => {
            return (
              <span
                className="Hero-item"
                draggable
                onDragStart={handleOnDragStart(hero.id)}
              >
                {hero.name}
              </span>
            );
          })}
        </div>
      </div>
      <div
        className="Retinues-calculation-section"
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
      >
        <h1>Retinues calculation area</h1>
        <div className="Card-section">
          {/* Show card from hero list by dragging here */}
          {retinuesList.map(item => {
            return <span className="Hero-item">{item.name}</span>;
          })}
        </div>
        <div className="Retinues-summary">
          <h3>This is summary</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
