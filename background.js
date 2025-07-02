chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "editTraining") {
    const { token, trainingId, trainingData } = request.data;

    fetch(`https://connect.garmin.com/workout-service/workout/${trainingId}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: `Bearer ${token}`,
        "content-type": "application/json;charset=UTF-8",
        "di-backend": "connectapi.garmin.com",
      },
      body: JSON.stringify(trainingData),
      method: "PUT",
    })
      .then((response) => {
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        sendResponse({ success: false, error });
      });

    return true; // Indicates that the response is sent asynchronously
  }
});
