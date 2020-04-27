import React from 'react';
import { useState, useEffect } from 'react';

export const timeBetweenDates = ({ startDate = Date.now(), endDate }) => {
  const ms = Math.abs(endDate - startDate);
  const s = Math.floor((ms / 1000) % 60);
  const m = Math.floor((ms / 1000 / 60) % 60);
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  return { ms, s, m, h, d };
};

export const padNumber = (number, length) => {
  let str = `${number}`;
  while (str.length < length) {
    str = `0${str}`;
  }
  return str;
};

export default ({
  timestamp = Date.now(),
  interval = 1000,
  children,
  format = '{hh}:{mm}:{ss}',
  onDone,
  countdown = true,
}) => {
  const [time, setTime] = useState('');
  let internalInterval = null;

  const calculate = (withOnDone = false) => {
    if (countdown === true && timestamp <= Date.now()) {
      withOnDone && onDone && onDone();
      clearInterval(internalInterval);
      internalInterval = null;
      timestamp = Date.now();
    }

    const { d, h, m, s, ms } = timeBetweenDates({ startDate: Date.now(), endDate: timestamp });

    const str = format
      .replace('{dd}', padNumber(d, 2))
      .replace('{hh}', padNumber(h, 2))
      .replace('{mm}', padNumber(m, 2))
      .replace('{ss}', padNumber(s, 2))
      .replace('{d}', d)
      .replace('{h}', h)
      .replace('{m}', m)
      .replace('{s}', s);

    setTime(str), interval;
  };

  useEffect(() => {
    calculate();
    if (internalInterval) {
      clearInterval(internalInterval);
    }
    internalInterval = setInterval(() => {
      calculate(true);
    }, interval);
    return () => {
      clearInterval(internalInterval);
      internalInterval = null;
    };
  }, [timestamp]);

  return <>{children({ time })}</>;
};
