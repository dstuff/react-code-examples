import {
  OverviewBatchReport,
  OverviewBatchReportPdfWarningTypesRequest,
  twParameterList,
  TwType,
  TwTypesByParameter
} from 'models';

export const mapReportDataToRows = (reportData: { [key: number]: OverviewBatchReport[] }): OverviewBatchReport[] => {
  return Object.keys(reportData).reduce((arr: OverviewBatchReport[], item: any) => {
    const dayRecords = reportData[item];

    let record = {} as OverviewBatchReport;
    dayRecords.forEach((r: OverviewBatchReport) => {
      const key = `${r.houseId}-${r.batchId}-${r.parameter}-${r.batchNumber}`;
      record = { ...record, birdAge: r.birdAge, [key]: r[key as keyof OverviewBatchReport] };
    });
    arr.push(record);
    return arr;
  }, []);
};

export const filterByParamsTypes = (dayRecord: any, selectedWarnings: TwType[], index: number) => {
  const data = dayRecord[`warning${index}`];
  const filteredWarnings = data.warnings.filter((w: TwType) => selectedWarnings.includes(w));
  return { ...dayRecord, [`warning${index}`]: { ...data, warnings: filteredWarnings } };
};

export const getPdfRequestWarningTypes = (
  warningTypes: TwTypesByParameter
): OverviewBatchReportPdfWarningTypesRequest[] => {
  return twParameterList.reduce((result, parameter) => {
    warningTypes[parameter].forEach((w: TwType) => {
      result.push({
        type: parameter,
        eventType: w
      });
    });

    return result;
  }, [] as OverviewBatchReportPdfWarningTypesRequest[]);
};
