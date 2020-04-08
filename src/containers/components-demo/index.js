import React from 'react';
import styled from 'styled-components';
import Button from '../../components/styled/button';
import Chat from '../../components/chat';

import PlaybackModule from '../../components/playback-module';

const Layout = styled.div``;

export default () => {
  return (
    <Layout>
      <PlaybackModule />
    </Layout>
  );
};
