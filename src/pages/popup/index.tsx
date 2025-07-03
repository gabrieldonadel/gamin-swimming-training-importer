import { parseTrainingText } from "../../parser";

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
  const importTrainingButton = document.getElementById(
    "import-training"
  ) as HTMLButtonElement;
  const trainingTextArea = document.getElementById(
    "training-text"
  ) as HTMLTextAreaElement;
  const loader = document.getElementById("loader") as HTMLDivElement;
  const status = document.getElementById("status") as HTMLDivElement;

  importTrainingButton.addEventListener("click", () => {
    loader.style.display = "block";
    status.textContent = "";

    const trainingText = trainingTextArea.value;

    try {
      const trainingData = parseTrainingText(trainingText);

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const match = tab.url?.match(/workout\/(\d+)/);
        const trainingId = match ? match[1] : null;

        if (trainingId) {
          chrome.tabs.sendMessage(
            tab.id as number,
            { action: "getToken" },
            (response: { token: string | null }) => {
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
                  (response: { success: boolean; data?: any; error?: any }) => {
                    loader.style.display = "none";
                    if (response.success) {
                      status.textContent = "Training imported successfully!";
                      console.log(
                        "Training edited successfully:",
                        response.data
                      );
                      setTimeout(() => {
                        if (tab.id) {
                          chrome.tabs.reload(tab.id);
                          window.close();
                        }
                      }, 1000);
                    } else {
                      status.textContent = "Error importing training.";
                      console.error("Error editing training:", response.error);
                    }
                  }
                );
              } else {
                loader.style.display = "none";
                status.textContent = "Could not get token from Garmin Connect.";
                console.error("Could not get token from Garmin Connect.");
              }
            }
          );
        } else {
          loader.style.display = "none";
          status.textContent =
            "Could not extract training ID from the URL. Are you on a workout page?";
          console.error(
            "Could not extract training ID from the URL. Are you on a workout page?"
          );
        }
      });
    } catch (error) {
      loader.style.display = "none";
      status.textContent =
        "Something went wrong while parsing the training data.";
      console.log("error", error);
    }
  });
});
