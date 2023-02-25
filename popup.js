//keep the content script running, not sure if this is needed
//https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
(function connect() {
    chrome.runtime.connect({name: 'keepAlive'})
      .onDisconnect.addListener(connect);
  })();
  console.log("content script running");

//https://stackoverflow.com/questions/45267928/open-chrome-extension-link-within-popup
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByName("newtab");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});