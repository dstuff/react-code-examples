import { Mapper } from './mapper';
import {
  AgeIssue,
  PredictionQuality,
  PredictionByBatch,
  PredictionResponse,
  PredictionWeight,
  WeightData
} from 'models';

export class PredictionByBatchMapper implements Mapper<PredictionResponse[], PredictionByBatch[]> {
  map(data: PredictionResponse[]): PredictionByBatch[] {
    if (!data.length) {
      return [];
    }

    return data.map((predict) => {
      const batchPrediction: PredictionByBatch = {
        farmName: predict.farmName,
        farmPath: predict.farmPath,
        houseName: predict.houseName,
        housePath: predict.housePath,
        batchName: predict.batchName,
        batchId: predict.batchId,
        birdAge: predict.birdsAge,
        placementDate: predict.placementDate,
        plannedDate: predict.plannedPredictionDate,
        predictedWeightOnPlannedDate: PredictionByBatchMapper.getPlannedWeight(predict),
        hasValidationErrors: predict.hasValidationErrors
      };

      if (predict.comingDaysPredictions) {
        predict.comingDaysPredictions.forEach((p, index) => {
          // @ts-ignore
          batchPrediction[`predictedWeightOnComingDate${index}` as keyof SwPredictionByBatch] = {
            date: p.date,
            value: p.value,
            quality: p.quality,
            ageValidation: p.ageValidation
          } as PredictionWeight;
        });
      }

      return batchPrediction;
    });
  }

  private static getPlannedWeight(prediction: PredictionResponse): PredictionWeight | undefined {
    if (prediction.plannedPredictionWeight) {
      return {
        date: prediction.plannedPredictionDate,
        value: {
          value: prediction.plannedPredictionWeight.value,
          precision: prediction.plannedPredictionWeight.precision,
          unit: prediction.plannedPredictionWeight.unit
        },
        ageValidation: AgeIssue.Undefined,
        quality: PredictionQuality.HighKnownFarm
      };
    }
  }

  private static getWeightData(data: WeightData) {
    return {
      value: data.value,
      unit: data.unit
    };
  }
}
