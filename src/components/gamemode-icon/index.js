import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faFrog, faChess, faFire } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  BULLET: faBolt,
  BLITZ: faFire,
  RAPID: faFrog,
  CLASSICAL: faChess,
};

export default ({ mode = null }) => {
  return <FontAwesomeIcon icon={iconMap[mode]} />;
};
