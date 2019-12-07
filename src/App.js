import React, { useState } from "react";
import { css } from "emotion/macro";
import HeroList from "./components/HeroList";
import ResonanceCalArea from "./components/ResonanceCalArea";
import wallpaper from "./images/main-bg.png";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [monsterList, setMonsterList] = useState([]);

  return (
    <div className={styles.container}>
      <HeroList monsterList={monsterList} setMonsterList={setMonsterList} />
      <ResonanceCalArea
        monsterList={monsterList}
        setMonsterList={setMonsterList}
      />
    </div>
  );
}

const styles = {
  container: css`
    font-family: "Baloo Bhai", cursive;
    height: 100vh;
    display: flex;
    background-image: url(${wallpaper});
  `
};

export default App;
