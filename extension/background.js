chrome.tabs.onUpdated.addListener((tabId, tab) => {
  chrome.tabs.sendMessage(tabId, {
    type: "NEW",
  });
});

// Create a new tab if a message is received
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type, text } = obj;
  if (type === "SUPPORT") {
    //Send data to your web here
    chrome.windows.create({
      url: `http://localhost:8080?text=${text}`,
      type: "popup",
      width: 500,
      height: 500,
    });
  }
});
