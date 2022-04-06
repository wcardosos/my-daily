import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import {
  Tabs,
  TabList,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import TabTitle from '../../src/components/TabTitle';
import '@testing-library/jest-dom/extend-expect';

describe('Component: TabTitle', () => {
  it('Should render the tab title', () => {
    const iconMock = 'icon' as unknown as ReactElement<IconType>;

    /*
      This render is needed because the Chakra UI tab (used in the TabTitle component)
      needs the Tabs Chakra UI component context.
    */
    render((
      <Tabs>
        <TabList>
          <TabTitle icon={iconMock} title="tab title" />
        </TabList>
      </Tabs>
    ));

    expect(screen.getByText('tab title')).toBeInTheDocument();
  });
});
