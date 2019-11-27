import React, { useState, useEffect, useCallback } from "react";
import heroes from "./heroes.json";
import "./App.css";
import { SlowBuffer } from "buffer";

function App() {
  const [retinuesList, setRetinuesList] = useState([]);
  const [retinuesAuraCount, setRetinuesAuraCount] = useState({});
  const [retinuesElementCount, setRetinuesElementCount] = useState({});

  const handleOnDragStart = heroId => e => {
    e.dataTransfer.setData("id", heroId);
  };

  const countRetinues = useCallback(() => {
    let countElements = {};
    let countAuras = {};
    // count types
    retinuesList.forEach(item => {
      if (countElements[item.element]) {
        countElements[item.element]++;
      } else {
        countElements[item.element] = 1;
      }
      // count auras
      item.auras.forEach(aura => {
        if (countAuras[aura]) {
          countAuras[aura]++;
        } else {
          countAuras[aura] = 1;
        }
      });
      // count additional auras
      item.additionalAuras.forEach(aura => {
        if (countAuras[aura]) {
          countAuras[aura]++;
        } else {
          countAuras[aura] = 1;
        }
      });
    });

    setRetinuesAuraCount(countAuras);
    setRetinuesElementCount(countElements);
  }, [retinuesList]);

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleOnDrop = e => {
    if (retinuesList.length < 5) {
      let droppedHeroId = e.dataTransfer.getData("id");
      let filteredHero = heroes.data.filter(hero => hero.id === droppedHeroId);
      setRetinuesList([...retinuesList, ...filteredHero]);
    }
  };

  const handleOnHeroDelete = heroId => e => {
    let deletedRetinuesList = retinuesList.filter(item => item.id !== heroId);
    setRetinuesList([...deletedRetinuesList]);
  };

  useEffect(() => {
    countRetinues();
  }, [countRetinues, retinuesList.length]);

  console.log(retinuesAuraCount, retinuesElementCount);

  return (
    <div className="App">
      <div className="Hero-list-section">
        <h1>Hero list</h1>
        <div className="Hero-list">
          {heroes.data.map(hero => {
            return (
              <span
                key={hero.id}
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
          {retinuesList.map((item, index) => {
            return (
              <div key={index} className="Hero-item">
                <span>{item.name}</span>
                <span
                  className="Hero-item-delete-btn"
                  onClick={handleOnHeroDelete(item.id)}
                >
                  X
                </span>
              </div>
            );
          })}
        </div>
        <div className="Retinues-summary">
          <h3>This is summary</h3>
          <div className="Retinues-count">
            {Object.keys(retinuesAuraCount).map((key, index) => {
              return (
                <div key={index} className="Retinues-aura-count">
                  <span>{key}</span>
                  <span>{retinuesAuraCount[key]}</span>
                </div>
              );
            })}

            {Object.keys(retinuesElementCount).map((key, index) => {
              return (
                <div key={index} className="Retinues-element-count">
                  <span>{key}</span>
                  <span>{retinuesElementCount[key]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
