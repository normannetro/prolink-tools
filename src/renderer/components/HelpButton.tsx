import * as React from 'react';
import ReactDOM from 'react-dom';
import {HelpCircle} from 'react-feather';
import {useClickAway, useKey} from 'react-use';
import styled from '@emotion/styled';
import {AnimatePresence, motion} from 'framer-motion';

import LogoBig from 'src/shared/components/LogoBig';

import ActionButton from './ActionButton';

const HelpButton = () => {
  const [show, toggle] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => toggle(false));
  useKey(
    key => key.key === 'Escape',
    () => toggle(false)
  );

  return (
    <React.Fragment>
      <Button onClick={() => toggle(!show)}>
        <HelpCircle size="1rem" />
      </Button>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {show && (
            <Modal>
              <Info ref={containerRef}>
                <LogoBig />
                <p>
                  Built by a DJ, for DJs. prolink tools is a hand-built collection of
                  tools to hook into real-time performance data to enhance your sets. This
                  software is 100% free, the source code is{' '}
                  <a href="https://github.com/evanpurkhiser/prolink-tools">
                    available on GitHub
                  </a>
                  .
                </p>
                <p>
                  Prolink Tools was created by{' '}
                  <a href="https://evanpurkhiser.com">Evan Purkhiser</a>.
                </p>
                <hr />
                <p>
                  Need help? <a href="https://prolink.tools/manual">Read the Manual</a>{' '}
                  and <a href="http://discord.gg/3eyzdgXJuY">Join the Discord server</a>!
                </p>
                <small>
                  Like this software? Want to help support development?{' '}
                  <a href="https://ko-fi.com/evanpurkhiser">You can buy me a coffee</a> ❤️
                </small>
              </Info>
            </Modal>
          )}
        </AnimatePresence>,
        document.querySelector('body')!
      )}
    </React.Fragment>
  );
};

export default HelpButton;

const Button = styled(ActionButton)`
  background: ${p => p.theme.backgroundSecondary};
  color: ${p => p.theme.subText};
  border-radius: 50%;
  padding: 0.25rem;
  transition: background 150ms ease-in-out, color 150ms ease-in-out;

  &:hover {
    background: ${p => p.theme.backgroundBox};
    color: ${p => p.theme.primaryText};
  }
`;

const Modal = styled(motion.div)`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
`;

Modal.defaultProps = {
  initial: 'init',
  animate: 'animate',
  exit: 'init',
  transition: {duration: 0.15},
  variants: {
    init: {opacity: 0},
    animate: {opacity: 1},
  },
};

const Info = styled(motion.div)`
  background: ${p => p.theme.background};
  border-radius: 5px;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  font-family: Ubuntu;
  color: ${p => p.theme.primaryText};
  width: 600px;

  p {
    font-size: 0.95rem;
    line-height: 1.4;

    &:last-child {
      margin: 0;
    }
  }

  hr {
    border: 0;
    background: ${p => p.theme.border};
    height: 1px;
  }
`;

Info.defaultProps = {
  variants: {
    init: {scale: 0.9, opacity: 0},
    animate: {scale: 1, opacity: 1},
  },
  transition: {type: 'spring', delay: 0.1, duration: 0.15},
};
