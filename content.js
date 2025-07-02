chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getToken") {
    const tokenString = localStorage.getItem("token");
    const {access_token} = JSON.parse(tokenString)
    sendResponse({ token:access_token });
  }
});
