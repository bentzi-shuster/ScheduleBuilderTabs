//----------------------
// this script is injected into the page as a content script
// the use of this script is to inject other scripts into the page so that they can access the page's variables and functions
//----------------------

//on the message from the background script, start the process, the message is sent when the super slow file is loaded to the page
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "dataLoaded") {

let scriptarr=["main.js","tabs.js","utilFuncs.js"]; //the scripts to inject into the page
for (let i = 0; i < scriptarr.length; i++) {
var s = document.createElement('script');
s.src = chrome.runtime.getURL(scriptarr[i]);
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
        }   
        sendResponse({message: "done injecting scripts into page"})
    }
    
});

// refrence
// https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-using-a-content-script


