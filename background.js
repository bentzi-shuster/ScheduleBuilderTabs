importScripts("startup.js")



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.source === "fromPage") {
          console.log("background script received: " + request.text);
        }
      }
  );



  function postMessagetToPage(messsage){
          
            (async () => {
             
                const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
                if(!tab?.id){
                  console.log("you need to have the tab selected / in focus")
                  return;
                }
                const response = await chrome.tabs.sendMessage(tab.id, {text: messsage});
                // do something with response here, not outside the function
                console.log(response);
              })();
  }

/*

to send a message to page use 
postMessagetToPage("test")

*/

          
      