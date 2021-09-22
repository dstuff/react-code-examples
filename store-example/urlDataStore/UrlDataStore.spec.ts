import { configure } from 'mobx';

import { UrlDataStore } from './UrlDataStore';
import { TStore } from '../store';
import { TwWarningDetailsStore } from '../twStore';

describe('UrlDataStore', () => {
  const getRootStore = (): jest.Mocked<TStore> => {
    return {
      twWarningDetailsStore: {
        batchInfo: undefined,
        setBatchInfo: jest.fn()
      } as Partial<TwWarningDetailsStore>
    } as TStore;
  };

  const getStore = (): UrlDataStore => {
    return new UrlDataStore(getRootStore());
  };

  beforeEach(() => {
    configure({ enforceActions: 'never' });
  });

  it('should set default values', () => {
    const store = getStore();
    expect(store.params).toStrictEqual(null);
  });

  it("#getParams shouldn't set any params", () => {
    const store = getStore();
    store.getParams(undefined);
    expect(store.params).toStrictEqual(null);
  });

  it('#getParams should set batchId, parameter, type, batchDayMoment', () => {
    const store = getStore();
    const batchId = '1df8292b-e0aa-506a-8568-08cea42fb0ff';
    const parameter = '1';
    const type = '4';
    const batchDayMoment = '4';
    const query = `?batchId=${batchId}&parameter=${parameter}&type=${type}&batchDayMoment=${batchDayMoment}`;
    store.getParams(query);

    expect(store.params).toStrictEqual({ batchId, parameter, type, batchDayMoment });
  });

  it('#resetParams should reset params', () => {
    const store = getStore();
    const batchId = '1df8292b-e0aa-506a-8568-08cea42fb0ff';
    const parameter = 1;
    const type = 4;
    const batchDayMoment = 4;
    store.setParams({ batchId, parameter, type, batchDayMoment });
    store.resetParams();

    expect(store.params).toStrictEqual(null);
  });
});
