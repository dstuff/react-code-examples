import React from 'react';
import { Filter, FilterBody, FilterFooter } from 'components';
import { FilterBodyLocationsPanel } from './FilterBodyLocationsPanel';
import { FilterBodyBatchDetailsPanel } from './FilterBodyBatchDetailsPanel';
import { FilterBodyValidityStatusPanel } from './FilterBodyValidityStatusPanel';

export const OverviewFilter = (): JSX.Element => {
  return (
    <Filter>
      <FilterBody>
        <FilterBodyLocationsPanel />
        <FilterBodyBatchDetailsPanel />
        <FilterBodyValidityStatusPanel />
      </FilterBody>
      <FilterFooter />
    </Filter>
  );
};
