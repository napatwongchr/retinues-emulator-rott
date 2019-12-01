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
          return (
            <span
              key={monster.id}
              className={styles.monster}
              draggable
              onDragStart={handleOnDragStart(monster.id)}
            >
              {monster.name}
            </span>
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
    box-shadow: 2px 0 5px -2px rgba(211, 211, 214, 0.5);
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
    flex-wrap: wrap;
    padding: 0 10px;
  `,
  monster: css`
    display: inline;
    padding: 5px;
    margin: 5px;
    width: 60px;
    height: 60px;
    background-color: white;
  `
};

export default MonsterPoolList;
