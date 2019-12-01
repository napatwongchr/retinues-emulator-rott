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
        monsterList.map(item => {
          return (
            <div key={item.id} className={styles.monsterCard}>
              <span
                className={styles.cardDeleteBtn}
                onClick={handleOnHeroDelete(item.id)}
              >
                X
              </span>
              <span>hero pic</span>
              <span>{item.name}</span>
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
    background-color: white;
    width: 140px;
    height: 180px;
    margin: 0 10px;
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
  `
};

export default MonsterLineUp;
