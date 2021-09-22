import { action, autorun, observable } from 'mobx';

import { TwQueryParams } from 'models';
import { parseQuery } from 'services';
import { TStore } from '../store';

export class UrlDataStore {
  @observable params: TwQueryParams | null = null;

  constructor(private readonly rootStore: TStore) {
    autorun((reaction) => {
      this.getParams(location.search);
      reaction.dispose();
    });
  }

  @action
  setParams = (data?: TwQueryParams) => {
    if (data) {
      this.params = data;
    }
  };

  @action
  getParams = (query?: string | null) => {
    if (!query) {
      return;
    }

    const params: TwQueryParams = parseQuery(query);

    let houses = [];
    if (params.housesIds) {
      houses = Array.isArray(params.housesIds) ? params.housesIds : [params.housesIds];
      this.setParams({ ...params, housesIds: houses });
    } else {
      this.setParams(params);
    }
  };

  @action
  resetParams = (url?: string) => {
    history.pushState({}, document.title, '/' + (url ?? ''));
    this.params = null;
  };
}
