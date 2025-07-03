export interface WorkoutStep {
  type: string;
  stepOrder: number;
  description?: string;
  stepType?: { [key: string]: any };
  endCondition: { [key: string]: any };
  endConditionValue?: number;
  strokeType?: { [key: string]: any };
  numberOfIterations?: number;
  workoutSteps?: WorkoutStep[];
}

export interface WorkoutSegment {
  segmentOrder: number;
  sportType: { [key: string]: any };
  workoutSteps: WorkoutStep[];
}

export interface TrainingData {
  sportType: { [key: string]: any };
  workoutSegments: WorkoutSegment[];
}