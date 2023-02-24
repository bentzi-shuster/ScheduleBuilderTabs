//when the request for https://uisapppr3.njit.edu/scbldr/include/datasvc.php?p=/ is done
chrome.webRequest.onCompleted.addListener(
    function(details) {
            (async () => {
                const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
                const response = await chrome.tabs.sendMessage(tab.id, {message: "injectScripts"});
                // do something with response here, not outside the function
                console.log(response);
              })();
        }   
   , {
        urls: ["https://uisapppr3.njit.edu/scbldr/include/*"]
    }
);



//keep the content script running, not sure if this is needed
//https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
const onUpdate = (tabId, info, tab) => /^https?:/.test(info.url) && findTab([tab]);
findTab();
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    setTimeout(() => port.disconnect(), 250e3);
    port.onDisconnect.addListener(() => findTab());
  }
});
async function findTab(tabs) {
  if (chrome.runtime.lastError) { /* tab was closed before setTimeout ran */ }
  for (const {id: tabId} of tabs || await chrome.tabs.query({url: '*://*/*'})) {
    try {
      await chrome.scripting.executeScript({target: {tabId}, func: connect});
      chrome.tabs.onUpdated.removeListener(onUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(onUpdate);
}
function connect() {
  chrome.runtime.connect({name: 'keepAlive'})
    .onDisconnect.addListener(connect);
}

