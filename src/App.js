import React from "react";
import { css } from "emotion/macro";
import HeroList from "./components/HeroList";
import ResonanceCalArea from "./components/ResonanceCalArea";
import wallpaper from "./images/main-bg.png";

function App() {
  return (
    <div className={styles.container}>
      <HeroList />
      <ResonanceCalArea />
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
