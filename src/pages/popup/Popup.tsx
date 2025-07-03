import React, { useEffect } from "react";

import myLogo from "@assets/rounded-logo.png";
import { parseTrainingText } from "@src/parser";
import { baseTrainingData } from "@src/constants";

export default function Popup() {
  const [token, setToken] = React.useState<string | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(
        tab.id as number,
        { action: "getToken" },
        (response: { token: string | null }) => {
          if (response && response.token) {
            setToken(response.token);
          } else {
            console.error("Could not get token from Garmin Connect.");
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    const main = () => {
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
                      (response: {
                        success: boolean;
                        data?: any;
                        error?: any;
                      }) => {
                        loader.style.display = "none";
                        if (response.success) {
                          status.textContent =
                            "Training imported successfully!";
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
                          console.error(
                            "Error editing training:",
                            response.error
                          );
                        }
                      }
                    );
                  } else {
                    loader.style.display = "none";
                    status.textContent =
                      "Could not get token from Garmin Connect.";
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
    };

    main();
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 flex flex-col">
      <div className="header">
        <img src={myLogo} alt="Swim2Garmin Logo" />
        <h1>Swim2Garmin</h1>
      </div>
      <textarea id="training-text" rows={10} cols={50}></textarea>
      <button id="import-training">Import Training</button>
      <div id="loader" className="loader">
        {" "}
      </div>
      <div id="status"></div>
      {token}
    </div>
  );
}
