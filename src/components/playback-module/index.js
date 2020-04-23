import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Flex from '../../components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from '@fortawesome/free-solid-svg-icons';

const PlaybackModule = styled.div``;
const PlaybackPanel = styled(Flex)``;
const SliderContainer = styled(Flex)``;
const Slider = styled.input.attrs({ type: 'range', step: '1' })``;
const IconButton = styled.div`
  font-size: 1rem;
  margin: 0 0.5em;
`;

const PlayButton = styled(IconButton)`
  font-size: 1.25rem;
`;

export default ({
  items = [],
  startIndex = 0,
  onChange = null,
  hasPlay = true,
  hasForward = true,
  hasFastForward = true,
  hasBackward = true,
  hasFastBackward = true,
  autoUpdate = 'never',
}) => {
  const [index, setIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);

  const change = value => {
    const val = Math.min(Math.max(value, 0), items.length - 1);
    setIndex(val);
    onChange && onChange(val);
  };

  useEffect(() => {
    if (autoUpdate === 'always') {
      change(items.length - 1);
    }
  }, [items]);

  return (
    <PlaybackModule>
      <PlaybackPanel align="center" justify="center">
        {hasFastBackward && (
          <IconButton>
            <FontAwesomeIcon onClick={() => change(0)} icon={faFastBackward} />
          </IconButton>
        )}
        {hasBackward && (
          <IconButton>
            <FontAwesomeIcon onClick={() => change(index - 1)} icon={faStepBackward} />
          </IconButton>
        )}
        {hasPlay && (
          <PlayButton onClick={() => setIsPlaying(!isPlaying)}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </PlayButton>
        )}
        {hasForward && (
          <IconButton>
            <FontAwesomeIcon onClick={() => change(index + 1)} icon={faStepForward} />
          </IconButton>
        )}
        {hasFastForward && (
          <IconButton>
            <FontAwesomeIcon onClick={() => change(items.length - 1)} icon={faFastForward} />
          </IconButton>
        )}
      </PlaybackPanel>
      <SliderContainer align="center" justify="center">
        <Slider value={index} min="0" max={Math.max(0, items.length - 1)} onChange={e => change(e.target.value)} />
      </SliderContainer>
    </PlaybackModule>
  );
};
