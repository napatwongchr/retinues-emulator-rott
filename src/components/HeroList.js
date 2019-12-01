import React from "react";
import { css } from "emotion/macro";
import MONSTERS from "../data/monsters.json";

function MonsterPoolList() {
  const handleOnDragStart = heroId => e => {
    e.dataTransfer.setData("id", heroId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>MONSTER LIST</h1>
      </div>

      <div className={styles.monsterPoolList}>
        {MONSTERS.data.map(monster => {
          let monsterImgName = monster.name
            .split(" ")
            .map(word => word.toLowerCase())
            .join("-");
          return (
            <div
              key={monster.id}
              className={styles.monster}
              draggable
              onDragStart={handleOnDragStart(monster.id)}
            >
              <img
                src={require(`../images/monsters/${monsterImgName}.png`)}
                alt={monster.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: css`
    max-width: 350px;
    background-color: rgba(26.1, 25.9, 31.5, 0.8);
    box-shadow: 2px 0 5px -2px rgba(255, 255, 255, 0.9);
    overflow-y: scroll;
  `,
  heading: css`
    letter-spacing: 3px;
    display: flex;
    justify-content: center;
    color: white;
  `,
  monsterPoolList: css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `,
  monster: css`
    display: inline;
    margin: 10px;
    width: 60px;
    height: 60px;
  `
};

export default MonsterPoolList;
