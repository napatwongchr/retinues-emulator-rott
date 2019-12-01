import React, { useState, useEffect, useCallback } from "react";
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
        <h2>SUMMARY</h2>
      </div>
      <div className={styles.resonanceSummaryContent}>
        <div className={styles.resonanceSummaryElementCount}>
          {Object.keys(resonanceElementCount).map((key, index) => {
            return (
              <div key={index} className="Resonance-element-count">
                <span>
                  {key} x{resonanceElementCount[key]}
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.resonanceSummaryAuraCount}>
          {Object.keys(resonanceAuraCount).map((key, index) => {
            return (
              <div key={index} className="Resonance-aura-count">
                <span>
                  {key} x{resonanceAuraCount[key]}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.resonanceSummaryBuffs}>
          <div className="Resonance-summary-info-elements-buffs">
            {resonanceElementBuffs.map((elementBuff, index) => {
              return (
                <span key={index}>
                  {elementBuff}
                  <br />
                </span>
              );
            })}
          </div>
          <div className="Resonance-summary-info-auras-buffs">
            {resonanceAuraBuffs.map((auraBuff, index) => {
              return (
                <span key={index}>
                  {auraBuff}
                  <br />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    margin-right: 150px;
  `,
  resonanceSummaryElementCount: css`
    margin-right: 150px;
  `,
  resonanceSummaryElementBuffs: css``,
  resonanceSummaryAuraBuffs: css``
};

export default ResonanceSummary;
