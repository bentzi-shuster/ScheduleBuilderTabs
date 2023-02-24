(function connect() {
    chrome.runtime.connect({name: 'keepAlive'})
      .onDisconnect.addListener(connect);
  })();
  console.log("content script running");