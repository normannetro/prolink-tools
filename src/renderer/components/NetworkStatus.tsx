import styled from '@emotion/styled';
import {observer} from 'mobx-react';
import {NetworkState} from 'prolink-connect/lib/types';

import {AppStore} from 'src/shared/store';
import withStore from 'src/utils/withStore';

const status = {
  [NetworkState.Offline]: {label: 'offline', bg: '#45433D', text: '#fff'},
  [NetworkState.Online]: {label: 'connecting...', bg: '#FF9417', text: null},
  [NetworkState.Connected]: {label: 'connected', bg: '#5FF65B', text: null},
  [NetworkState.Failed]: {label: 'connection error', bg: '#ff5757', text: null},
};

type Props = {
  store: AppStore;
};

const NetworkStatus = observer(({store}: Props) => (
  <StatusIndicator state={store.networkState}>
    {status[store.networkState].label}
  </StatusIndicator>
));

const StatusIndicator = styled('div')<{state: NetworkState}>`
  background: ${p => status[p.state].bg};
  color: ${p => status[p.state].text ?? 'inherit'};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  font-size: 0.625rem;
  text-transform: uppercase;
  border-radius: 4px;
`;

export default withStore(NetworkStatus);
