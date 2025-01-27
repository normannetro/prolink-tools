import * as React from 'react';
import styled from '@emotion/styled';
import {set} from 'mobx';
import {observer} from 'mobx-react';

import {AppStore} from 'src/shared/store';
import withStore from 'src/utils/withStore';
import Checkbox from 'ui/components/form/Checkbox';
import Field from 'ui/components/form/Field';
import InfoBox from 'ui/components/form/InfoBox';
import Text from 'ui/components/form/Text';

type Props = {
  store: AppStore;
};

const Settings = observer(({store}: Props) => {
  const config = store.config;

  return (
    <React.Fragment>
      <Heading>General</Heading>
      <Section>
        <Field
          size="md"
          name="ID Marker"
          description="Tracks containing this text anywhere in the metadata (title, artist, comment, etc) will be marked as 'IDs'. Additional configurations may be needed in tools for tracks marked as IDs. This value is case insensitive."
        >
          <Text
            type="text"
            style={{appearance: 'textfield'}}
            value={config.idMarker}
            onChange={e => set(config, {idMarker: e.target.value})}
          />
        </Field>
      </Section>

      <Heading>Debugging / Development</Heading>
      <Section>
        <Field
          top
          size="sm"
          name="Collect track events"
          description={
            <React.Fragment>
              Enables collecting <em>all</em> events reported by PROLINK devices on the
              network. Events are anonymized, and do not include track names or other
              private metadata.
              <InfoBox>
                Collecting track events is incredibly helpful when looking into issues
                where tracks were not marked as now-playing, or were marked as now-playing
                at the wrong time. You may want to turn this on if you run into frequent
                issues and can include that you&apos;ve enabled collecting track events
                when reporting bugs.
              </InfoBox>
            </React.Fragment>
          }
        >
          <Checkbox
            checked={config.reportDebugEvents}
            onChange={e => set(store.config, {reportDebugEvents: e.target.checked})}
          />
        </Field>
        {process.env.RELEASE_CHANNEL !== 'stable' && (
          <Field
            top
            size="sm"
            name="Enable Cloud Services"
            description={
              <React.Fragment>
                Enables cloud access to Prolink Tools. Overlays will be accessible from
                any network and additional features will be enabled.
                <InfoBox>
                  This feature is <em>highly</em> experimental!
                </InfoBox>
              </React.Fragment>
            }
          >
            <Checkbox
              checked={config.enableCloudApi}
              onChange={e => set(store.config, {enableCloudApi: e.target.checked})}
            />
          </Field>
        )}
      </Section>
    </React.Fragment>
  );
});

const Heading = styled(({children, ...p}: React.HTMLProps<HTMLHeadingElement>) => (
  <h2 {...p}>{children}</h2>
))`
  font-size: 0.85rem;
  text-transform: uppercase;
  margin: 0;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid ${p => p.theme.border};
  font-weight: 500;
`;

const Section = styled('section')`
  padding: 0.5rem 0;
  margin-left: 1.25rem;
  border-left: 1px solid ${p => p.theme.border};
`;

export default withStore(Settings);
