const loopStepBase = {
  type: "RepeatGroupDTO",
  stepType: {
    stepTypeId: 6,
    stepTypeKey: "repeat",
    displayOrder: 6,
  },
  endCondition: {
    conditionTypeId: 7,
    conditionTypeKey: "iterations",
    displayOrder: 7,
    displayable: false,
  },
};

const swimmingSportType = {
  sportTypeId: 3,
  sportTypeKey: "other",
  displayOrder: 11,
};

const freeStrokeType = {
  strokeTypeId: 6,
  strokeTypeKey: "free",
  displayOrder: 6,
};

function parseTrainingText(text) {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const workoutSteps = [];
  let stepOrder = 1;

  for (const line of lines) {
    let repetitions = 1;
    let distance; //number;
    let description; //string;
    let rest = 0; //number;

    // if includes X it's a repeat
    // inclui o x sem espaço e o m
    const repeatMatch = line.match(/^(\d+)(?:\s*a\s*\d+)?x(\d+)m\s+(.*)/);
    if (repeatMatch) {
      repetitions = parseInt(repeatMatch[1], 10);
      distance = parseInt(repeatMatch[2], 10);
      description = repeatMatch[3];
    } else {
      // extrair distance and description
      const singleMatch = line.match(/^(\d+)m\s+(.*)/);
      if (singleMatch) {
        distance = parseInt(singleMatch[1], 10);
        description = singleMatch[2];
      }
    }

    // "com" represents rest in seconds
    const restMatch = description.match(/com (\d+)"/);
    if (restMatch) {
      rest = parseInt(restMatch[1], 10);
      description = description.replace(restMatch[0], "").trim();
    }

    const repeatSteps = [
      {
        type: "ExecutableStepDTO",
        stepOrder: stepOrder + 1,
        description,
        stepType: {
          stepTypeId: 8,
          stepTypeKey: "main",
          displayOrder: 8,
        },
        endCondition: {
          conditionTypeKey: "distance",
          conditionTypeId: 3,
          displayable: true,
        },
        endConditionValue: distance,
        strokeType: freeStrokeType,
      },
    ];

    if (rest > 0) {
      repeatSteps.push({
        type: "ExecutableStepDTO",
        stepOrder: stepOrder + 2,
        stepType: {
          stepTypeId: 5,
          stepTypeKey: "rest",
          displayOrder: 5,
        },
        endCondition: {
          conditionTypeId: 8,
          conditionTypeKey: "fixed.rest",
          displayOrder: 8,
          displayable: true,
        },
        endConditionValue: rest,
      });
    }

    workoutSteps.push({
      ...loopStepBase,
      stepOrder: stepOrder,
      numberOfIterations: repetitions,
      workoutSteps: repeatSteps,
    });

    stepOrder += repeatSteps.length + 1;
  }

  return {
    sportType: { sportTypeId: 4, sportTypeKey: "swimming" },
    workoutSegments: [
      {
        segmentOrder: 1,
        sportType: swimmingSportType,
        workoutSteps: workoutSteps,
      },
    ],
  };
}
