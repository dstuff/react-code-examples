import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { UIDivider } from '@apollo/apollo-ui-reactjs';

import { useStores } from 'stores';
import { ContentPanel, ExpansionPanel, SearchPanel } from 'components';
import { OverviewFilter } from '../filter';
import { BatchesTable } from '../batchesTable';

import styles from '../overview.module.scss';

export const OverviewPageBody = observer(
  (): JSX.Element => {
    const { overviewFilterStore, overviewBatchesTableStore } = useStores();
    const { show, setShow } = overviewFilterStore;
    const { searchFor, updateSearchText } = overviewBatchesTableStore;

    const handleOnChange = useCallback((text: string) => {
      updateSearchText(text);
    }, []);

    const toggleFilter = useCallback(() => {
      setShow(!show);
    }, [show]);

    return (
      <ExpansionPanel left={<OverviewFilter />} showLeft={show} className={styles.page__body}>
        <ContentPanel>
          <SearchPanel
            onFilterButtonClick={toggleFilter}
            isFiltersVisible={show}
            showSearchBox={true}
            searchText={searchFor}
            onSearchTextChanged={handleOnChange}
          />
          <UIDivider size="small" />

          <BatchesTable />
        </ContentPanel>
      </ExpansionPanel>
    );
  }
);
