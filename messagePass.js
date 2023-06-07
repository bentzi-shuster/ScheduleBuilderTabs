console.log("messagePass.js loaded");
//---------------------------------------------------------------------------------------------
// This script is injected into the page as a content script
// It is used to pass messages between the page and the background script
//---------------------------------------------------------------------------------------------



//take a message from the page and send it to the background
window.addEventListener("message", (event) => {
    if (event.source !== window) {// We only accept messages from the window
      return;
    }
    if (event.data.type && (event.data.type === "FROM_PAGE")) { // event.data.text contains the text from the page
      console.log("Content script received: " + event.data.text);
    chrome.runtime.sendMessage({source: "fromPage", text: event.data.text}); // send the message to the background
    }
  });

//take a message from the background and send it to the page
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // pass the message to the page
      window.postMessage({ type: "FROM_EXTENSION", text: request.text }, "*");
      sendResponse({message: "done"});
    }
  );



// refrence 
// https://stackoverflow.com/questions/19035159/pass-a-message-from-chrome-extension-to-webpage