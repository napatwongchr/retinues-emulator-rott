import React, { useState, useEffect, useCallback, Fragment } from "react";
import { css } from "emotion/macro";
import BONUS_ELEMENT_BUFFS from "../data/elementBuffs.json";
import BONUS_AURA_BUFFS from "../data/auraBuffs.json";

function ResonanceSummary({ monsterList }) {
  const [resonanceAuraCount, setResonanceAuraCount] = useState({});
  const [resonanceElementCount, setResonanceElementCount] = useState({});
  const [resonanceElementBuffs, setResonanceElementBuffs] = useState([]);
  const [resonanceAuraBuffs, setResonanceAuraBuffs] = useState([]);

  const countResonances = useCallback(() => {
    let countElements = {};
    let countAuras = {};
    // count types
    monsterList.forEach(item => {
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
  }, [monsterList]);

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
  }, [countResonances, monsterList.length]);

  useEffect(() => {
    checkAuraBuffCondition();
  }, [checkAuraBuffCondition, resonanceAuraCount]);

  useEffect(() => {
    checkElementBuffCondition();
  }, [checkElementBuffCondition, resonanceElementCount]);

  return (
    <div className={styles.resonanceSummaryContainer}>
      <div>
        <h2 className={styles.resonanceSummaryHeading}>SUMMARY</h2>
      </div>
      <div className={styles.resonanceSummaryContent}>
        <div className={styles.resonanceSummaryElementCount}>
          {Object.keys(resonanceElementCount).map((key, index) => {
            return (
              <div className={styles.resonanceElementCountInfo} key={index}>
                <img
                  src={require(`../images/elements/${key.toLowerCase()}.png`)}
                  alt={key}
                />{" "}
                <span className={styles.elementCountNumber}>
                  x{resonanceElementCount[key]}
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.resonanceSummaryAuraCount}>
          {Object.keys(resonanceAuraCount).map((key, index) => {
            return (
              <div className={styles.resonanceAuraCountInfo} key={index}>
                <img
                  src={require(`../images/auras/${key.toLowerCase()}.png`)}
                  alt={key}
                />{" "}
                <span className={styles.elementCountNumber}>
                  x{resonanceAuraCount[key]}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.resonanceSummaryBuffs}>
          <div className={styles.resonanceSummaryElementBuffs}>
            {resonanceElementBuffs.length ? (
              <Fragment>
                <span className={styles.buffsHeading}>Element buffs</span>
                {resonanceElementBuffs.map((elementBuff, index) => {
                  return (
                    <div key={index} className={styles.buffsDetail}>
                      <span className={styles.buffName}>{elementBuff}</span> :{" "}
                      {BONUS_ELEMENT_BUFFS[elementBuff].effect}
                      <br />
                    </div>
                  );
                })}
              </Fragment>
            ) : null}
          </div>
          <div className={styles.resonanceSummaryAuraBuffs}>
            {resonanceAuraBuffs.length ? (
              <Fragment>
                <span className={styles.buffsHeading}>Aura buffs</span>
                {resonanceAuraBuffs.map((auraBuff, index) => {
                  return (
                    <div key={index} className={styles.buffsDetail}>
                      <span className={styles.buffName}>{auraBuff}</span> :{" "}
                      {BONUS_AURA_BUFFS[auraBuff].effect}
                      <br />
                    </div>
                  );
                })}
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  resonanceSummaryHeading: css`
    margin-bottom: 5px;
  `,
  resonanceElementCountInfo: css`
    display: flex;
    align-items: center;
  `,
  resonanceAuraCountInfo: css`
    display: flex;
    align-items: center;
  `,
  elementCountNumber: css`
    margin-left: 10px;
    font-size: 24px;
  `,
  buffsHeading: css`
    width: 100%;
    font-size: 20px;
    background-color: white;
    color: black;
    margin-top: 0;
  `,
  buffName: css`
    color: coral;
    border-bottom: 4px dashed coral;
  `,
  buffsDetail: css`
    line-height: 1.6;
    max-height: 200px;
    margin-top: 10px;
    overflow-y: scroll;
  `,
  resonanceSummaryContainer: css`
    letter-spacing: 2px;
    font-size: 18px;
    margin-top: 70px;
    color: white;
  `,
  resonanceSummaryContent: css`
    display: flex;
  `,
  resonanceSummaryAuraCount: css`
    margin-right: 50px;
  `,
  resonanceSummaryElementCount: css`
    margin-right: 50px;
  `,
  resonanceSummaryBuffs: css`
    display: flex;
  `,
  resonanceSummaryElementBuffs: css`
    max-width: 350px;
    max-height: 200px;
    margin-right: 10px;
    word-break: break-all;
  `,
  resonanceSummaryAuraBuffs: css`
    max-width: 350px;
    max-height: 200px;
    margin-right: 10px;
    word-break: break-all;
  `
};

export default ResonanceSummary;
