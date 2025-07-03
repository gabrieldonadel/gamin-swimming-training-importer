chrome.runtime.onMessage.addListener(
  (
    request: { action: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: { token: string | null }) => void
  ) => {
    if (request.action === "getToken") {
      const tokenString = localStorage.getItem("token");
      const { access_token } = JSON.parse(tokenString ?? "{}");
      sendResponse({ token: access_token });
    }
  }
);
