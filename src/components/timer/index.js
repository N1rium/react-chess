import React from 'react';
import { useRef, useState, useEffect } from 'react';

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

export default ({ endDate, interval = 1000, children, format = '{hh}:{mm}:{ss}', onDone, countdown = true }) => {
  const [time, setTime] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now());
  const timeRef = useRef(timestamp);
  let internalInterval = null;

  const calculate = () => {
    const { d, h, m, s, ms } = timeBetweenDates({ timestamp, endDate });

    const str = format
      .replace('{dd}', padNumber(d, 2))
      .replace('{hh}', padNumber(h, 2))
      .replace('{mm}', padNumber(m, 2))
      .replace('{ss}', padNumber(s, 2))
      .replace('{d}', d)
      .replace('{h}', h)
      .replace('{m}', m)
      .replace('{s}', s);

    setTime(str);
  };

  useEffect(() => {
    calculate();
    if (internalInterval) {
      clearInterval(internalInterval);
    }
    internalInterval = setInterval(() => {
      calculate();
    }, interval);
    return () => {
      clearInterval(internalInterval);
      internalInterval = null;
    };
  }, [timestamp]);

  return <>{children({ time })}</>;
};

export const Counter = ({ children, interval, format = '{mm}:{ss}' }) => {
  const [startTime, setStartTime] = useState(Date.now());
  const [time, setTime] = useState(null);

  const count = () => {
    const { d, h, m, s, ms } = timeBetweenDates({ startDate: Date.now(), endDate: startTime });
    const str = format
      .replace('{dd}', padNumber(d, 2))
      .replace('{hh}', padNumber(h, 2))
      .replace('{mm}', padNumber(m, 2))
      .replace('{ss}', padNumber(s, 2))
      .replace('{d}', d)
      .replace('{h}', h)
      .replace('{m}', m)
      .replace('{s}', s);
    setTime(str);
  };

  useEffect(() => {
    const _interval = setInterval(() => {
      count();
    }, interval);
    return () => {
      clearInterval(_interval);
    };
  }, []);

  return <>{children({ time })}</>;
};
