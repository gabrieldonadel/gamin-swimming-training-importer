export enum SportType {
  SWIMMING = "swimming",
}

export const SportTypes: Record<
  SportType,
  { sportTypeId: number; sportTypeKey: string; displayOrder: number }
> = {
  [SportType.SWIMMING]: {
    sportTypeId: 4,
    sportTypeKey: "swimming",
    displayOrder: 3,
  },
};

export const baseTrainingData = {
  ownerId: 90209832,
  workoutName: "Swim2Garmin",
  description: null,
  updatedDate: "2025-07-01T09:06:26.0",
  createdDate: "2025-06-13T19:55:28.0",
  sportType: {
    sportTypeId: 4,
    sportTypeKey: "swimming",
    displayOrder: 3,
  },
  subSportType: null,
  trainingPlanId: null,
  sharedWithUsers: null,
  estimatedDurationInSecs: 0,
  estimatedDistanceInMeters: null,
  poolLength: 25,
  poolLengthUnit: {
    unitId: 1,
    unitKey: "meter",
    factor: 100,
  },
  locale: null,
  workoutProvider: null,
  workoutSourceId: null,
  uploadTimestamp: null,
  atpPlanId: null,
  consumer: null,
  consumerName: null,
  consumerImageURL: null,
  consumerWebsiteURL: null,
  workoutNameI18nKey: null,
  descriptionI18nKey: null,
  avgTrainingSpeed: 0.83333333333334,
  estimateType: "TIME_ESTIMATED",
  estimatedDistanceUnit: {
    unitKey: null,
  },
  workoutThumbnailUrl: null,
  isSessionTransitionEnabled: null,
  shared: false,
  isWheelchair: false,
};
