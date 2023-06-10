console.log("startup.js loaded")

//when the request for https://uisapppr3.njit.edu/scbldr/include/datasvc.php?p=/ is done
chrome.webRequest.onCompleted.addListener(
    function(details) {
            (async () => {
              console.log("request completed");
                const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
                const response = await chrome.tabs.sendMessage(tab.id, {message: "dataLoaded"});
                // do something with response here, not outside the function
                console.log(response);
              })();
        }   
   , {
        urls: ["https://uisapppr3.njit.edu/scbldr/include/*"]
    }
);