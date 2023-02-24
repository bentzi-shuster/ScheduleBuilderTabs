//on the message from the background script, start the process, the message is sent when the super slow file is loaded to the page
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "injectScripts") {
//https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-using-a-content-script
let scriptarr=["utilFuncs.js","gui.js","tabs.js","autoUpdatePlan.js","pageLoad.js","remove.js"];
for (let i = 0; i < scriptarr.length; i++) {
var s = document.createElement('script');
s.src = chrome.runtime.getURL(scriptarr[i]);
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
        }   
    }
    sendResponse({message: "done"});
});


