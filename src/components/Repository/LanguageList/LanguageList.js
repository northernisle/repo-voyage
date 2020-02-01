import React, { useEffect, useState } from 'react';
import axios from '../../../utils/configs/axiosConfig';

import styles from './languageList.module.scss';

const percentage = (total, current) => +(current / total * 100).toFixed(1);
const sumBytes = data => Object.values(data).reduce((total, sum) => total + sum, 0);
const sortLanguages = data => Object.keys(data).sort((a, b) => data[b] - data[a]);
const sumRemaining = (data, totalBytes) => percentage(totalBytes, sumBytes(data));
const getTopLanguages = data => sortLanguages(data).slice(0, 3);
const getOtherLanguages = (data, index) => sortLanguages(data).slice(index).map(item => data[item]);

const LanguageList = ({ languages_url }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const getLanguages = async () => {
      const { data } = await axios.get(languages_url);

      if (!data) {
        return;
      }

      const totalBytes = sumBytes(data);
      const topLanguages = getTopLanguages(data);
      const otherLanguages = getOtherLanguages(data, topLanguages.length);

      const result = topLanguages.map(item => ({
        name: item,
        percentage: percentage(totalBytes, data[item])
      }));

      const otherPercentage = sumRemaining(otherLanguages, totalBytes);
      if (otherPercentage > 0) {
        result.push({ name: 'Other', percentage: otherPercentage });
      }

      setLanguages(result);
    };

    if (languages_url) {
      getLanguages();
    }
  }, [languages_url]);

  return (
    <div className={styles.container}>
      {languages.map(language => (
        <div key={language.name} className={styles.language}>
          <p>{language.name}</p>
          <p>{language.percentage}%</p>
        </div>
      ))}
    </div>
  );
};

export default LanguageList;