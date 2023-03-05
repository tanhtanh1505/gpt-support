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
      url: `https://woparadise.tech/gpt-support/question?q=${text}`,
      type: "popup",
      width: 500,
      height: 500,
    });
  }
});
