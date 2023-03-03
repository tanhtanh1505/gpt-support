(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type } = obj;
    if (type === "NEW") {
      //init();
    }
  });

  var selectedText = "";

  const init = () => {
    createIcon();

    document.addEventListener("mouseup", function (event) {
      var tempText = window.getSelection().toString();
      if (tempText !== selectedText) {
        selectedText = tempText;

        if (selectedText.length > 1) showIcon(event);
        else hideIcon();
      }
    });
  };

  const createIcon = () => {
    var icon = document.createElement("img");
    icon.id = "chatgpt-icon";
    icon.src = "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png";
    icon.width = "30";
    icon.height = "30";
    icon.style.position = "absolute";
    icon.style.zIndex = "9999";
    icon.style.display = "none";

    icon.addEventListener("click", function () {
      //send message to background.js
      chrome.runtime.sendMessage({
        type: "SUPPORT",
        text: selectedText,
      });
    });

    document.body.appendChild(icon);
  };

  const showIcon = (event) => {
    var x = event.pageX;
    var y = event.pageY;

    var icon = document.getElementById("chatgpt-icon");
    icon.style.display = "block";
    icon.style.left = x + "px";
    icon.style.top = y + "px";
  };

  const hideIcon = () => {
    var icon = document.getElementById("chatgpt-icon");
    icon.style.display = "none";
  };

  init();
})();
