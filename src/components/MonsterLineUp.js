import React from "react";
import { css } from "emotion/macro";

function MonsterLineUp({ monsterList, setMonsterList }) {
  const handleOnHeroDelete = heroId => e => {
    let deletedmonsterList = monsterList.filter(item => item.id !== heroId);
    setMonsterList([...deletedmonsterList]);
  };
  return (
    <div className={styles.container}>
      {monsterList.length ? (
        monsterList.map(monster => {
          let monsterImgName = monster.name
            .split(" ")
            .map(word => word.toLowerCase())
            .join("-");
          return (
            <div key={monster.id} className={styles.monsterCard}>
              <span
                className={styles.cardDeleteBtn}
                onClick={handleOnHeroDelete(monster.id)}
              >
                X
              </span>
              <img
                className={styles.monsterImage}
                src={require(`../images/monsters/${monsterImgName}.png`)}
                width={80}
                height={80}
                alt={monster.name}
              />

              <span className={styles.monsterName}>{monster.name}</span>
            </div>
          );
        })
      ) : (
        <div className={styles.noCardInfoBox}>
          <h1>Drag monster here !</h1>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: css`
    display: flex;
    justify-content: center;
  `,
  monsterCard: css`
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
    background-color: white;
    width: 140px;
    height: 180px;
    margin: 0 10px;
  `,
  monsterImage: css`
    margin-top: 30px;
  `,
  monsterName: css`
    font-size: 20px;
  `,
  noCardInfoBox: css`
    width: 100%;
    border: 3px dashed rgb(238, 238, 238);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    color: white;
    padding: 70px 0;
    letter-spacing: 3px;
  `,
  cardDeleteBtn: css`
    position: absolute;
    top: 6px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
  `
};

export default MonsterLineUp;
