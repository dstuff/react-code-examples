import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from 'stores';
import { CheckBoxList } from 'components';

import styles from '../overviewFilter.module.scss';

export const BatchStatusesCheckboxList = observer(() => {
  const { overviewFilterStore } = useStores();

  const { batchStatusesForSelect, setHistoricalStatuses } = overviewFilterStore;

  const onSelectValuesHandler = useCallback((values: string[]) => {
    setHistoricalStatuses(values.map((v) => Number(v)));
  }, []);

  return (
    <CheckBoxList
      name="historicalStatus"
      multiple={true}
      perOneInRow={true}
      className={styles.checkBoxList}
      items={batchStatusesForSelect}
      selectValues={onSelectValuesHandler}
      translationPrefix="historyStatus"
    />
  );
});
