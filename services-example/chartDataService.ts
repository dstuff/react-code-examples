import { PredictionResponse } from 'models';
import { IChartDataService } from './interfaces';
import { HttpClient } from '../http';
import { BaseUrls } from './baseUrls';

export class ChartDataService implements IChartDataService {
  private readonly http: HttpClient;

  constructor() {
    this.http = new HttpClient({
      baseUrl: `${BaseUrls.slaughterWeight()}/api/v1/Prediction`,
      useAuthToken: true,
      useLanguage: true
    });
  }

  async getChartData(batchId: string): Promise<PredictionResponse | null> {
    try {
      return await this.http.get<PredictionResponse>(`/batch/${batchId}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  }
}
