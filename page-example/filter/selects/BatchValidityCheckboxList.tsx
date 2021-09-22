import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from 'stores';
import { CheckBoxList } from 'components';

import styles from '../overviewFilter.module.scss';

export const BatchValidityCheckboxList = observer(() => {
  const { overviewFilterStore } = useStores();

  const { batchValidityStatusForSelect, setValidityStatuses } = overviewFilterStore;

  const onSelectValuesHandler = useCallback((values: string[]) => {
    setValidityStatuses(values.map((v) => Number(v)));
  }, []);

  return (
    <CheckBoxList
      name="validityStatus"
      multiple={true}
      perOneInRow={true}
      className={styles.checkBoxList}
      items={batchValidityStatusForSelect}
      selectValues={onSelectValuesHandler}
      translationPrefix="validityStatus"
    />
  );
});
