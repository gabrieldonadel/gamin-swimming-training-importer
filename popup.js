const baseTrainingData = {
  ownerId: 90209832,
  workoutName: "02/07 - import test",
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

document.addEventListener("DOMContentLoaded", () => {
  const importTrainingButton = document.getElementById("import-training");
  const trainingTextArea = document.getElementById("training-text");

  importTrainingButton.addEventListener("click", () => {
    const trainingText = trainingTextArea.value;
    const trainingData = parseTrainingText(trainingText);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const match = tab.url.match(/workout\/(\d+)/);
      const trainingId = match ? match[1] : null;

      if (trainingId) {
        chrome.tabs.sendMessage(tab.id, { action: "getToken" }, (response) => {
          if (response && response.token) {
            chrome.runtime.sendMessage(
              {
                action: "editTraining",
                data: {
                  token: response.token,
                  trainingId: trainingId,
                  trainingData: {
                    ...baseTrainingData,
                    workoutId: Number(trainingId),
                    ...trainingData,
                  },
                },
              },
              (response) => {
                if (response.success) {
                  console.log("Training edited successfully:", response.data);
                } else {
                  console.error("Error editing training:", response.error);
                }
              }
            );
          } else {
            console.error("Could not get token from Garmin Connect.");
          }
        });
      } else {
        console.error(
          "Could not extract training ID from the URL. Are you on a workout page?"
        );
      }
    });
  });
});
