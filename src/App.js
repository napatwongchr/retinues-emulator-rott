import React, { useState, useEffect, useCallback } from "react";
import heroes from "./heroes.json";
import BONUS_ELEMENT_BUFFS from "./elementBuffs.json";
import BONUS_AURA_BUFFS from "./auraBuffs.json";
import "./App.css";

const uuidv4 = require("uuid/v4");

function App() {
  const [heroList, setHeroList] = useState([]);
  const [resonanceAuraCount, setResonanceAuraCount] = useState({});
  const [resonanceElementCount, setResonanceElementCount] = useState({});
  const [resonanceElementBuffs, setResonanceElementBuffs] = useState([]);
  const [resonanceAuraBuffs, setResonanceAuraBuffs] = useState([]);

  const countResonances = useCallback(() => {
    let countElements = {};
    let countAuras = {};
    // count types
    heroList.forEach(item => {
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

    setResonanceAuraCount(countAuras);
    setResonanceElementCount(countElements);
  }, [heroList]);

  const handleOnDragStart = heroId => e => {
    e.dataTransfer.setData("id", heroId);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleOnDrop = e => {
    if (heroList.length < 5) {
      let droppedHeroId = e.dataTransfer.getData("id");
      let filteredHero = heroes.data
        .filter(hero => hero.id === droppedHeroId)
        .map(item => {
          return {
            ...item,
            id: `${item.id}-${uuidv4()}`
          };
        });
      setHeroList([...heroList, ...filteredHero]);
    }
  };

  const handleOnHeroDelete = heroId => e => {
    let deletedHeroList = heroList.filter(item => item.id !== heroId);
    setHeroList([...deletedHeroList]);
  };

  const checkElementBuffCondition = useCallback(() => {
    let resultBuffs = [];

    Object.keys(BONUS_ELEMENT_BUFFS).forEach(bonus => {
      let isConditionValid = Object.keys(
        BONUS_ELEMENT_BUFFS[bonus]["conditions"]
      ).map(element => {
        return (
          resonanceElementCount[element] >=
          BONUS_ELEMENT_BUFFS[bonus]["conditions"][element]
        );
      });

      if (BONUS_ELEMENT_BUFFS[bonus]["isSomeConditions"] || false) {
        isConditionValid = isConditionValid.some(value => value === true);
      } else {
        isConditionValid = isConditionValid.every(value => value === true);
      }

      if (isConditionValid) {
        resultBuffs.push(bonus);
      }

      setResonanceElementBuffs(resultBuffs);
    });
  }, [resonanceElementCount]);

  const checkAuraBuffCondition = useCallback(() => {
    let resultBuffs = [];

    Object.keys(BONUS_AURA_BUFFS).forEach(bonus => {
      let isConditionValid = Object.keys(BONUS_AURA_BUFFS[bonus]["conditions"])
        .map(aura => {
          return (
            resonanceAuraCount[aura] >=
            BONUS_AURA_BUFFS[bonus]["conditions"][aura]
          );
        })
        .every(value => value === true);

      if (isConditionValid) {
        resultBuffs.push(bonus);
      }
    });

    setResonanceAuraBuffs(resultBuffs);
  }, [resonanceAuraCount]);

  useEffect(() => {
    countResonances();
  }, [countResonances, heroList.length]);

  useEffect(() => {
    checkAuraBuffCondition();
  }, [checkAuraBuffCondition, resonanceAuraCount]);

  useEffect(() => {
    checkElementBuffCondition();
  }, [checkElementBuffCondition, resonanceElementCount]);

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
          {heroList.map(item => {
            return (
              <div key={item.id} className="Hero-item">
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
            {Object.keys(resonanceAuraCount).map((key, index) => {
              return (
                <div key={index} className="Retinues-aura-count">
                  <span>{key}</span>
                  <span>{resonanceAuraCount[key]}</span>
                </div>
              );
            })}

            {Object.keys(resonanceElementCount).map((key, index) => {
              return (
                <div key={index} className="Retinues-element-count">
                  <span>{key}</span>
                  <span>{resonanceElementCount[key]}</span>
                </div>
              );
            })}
          </div>
          <div className="Resonance-summary-info">
            <div className="Resonance-summary-info-elements-buffs">
              {resonanceElementBuffs.map((elementBuff, index) => {
                return <span key={index}>{elementBuff}</span>;
              })}
            </div>
            <div className="Resonance-summary-info-auras-buffs">
              {resonanceAuraBuffs.map((auraBuff, index) => {
                return <span key={index}>{auraBuff}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
