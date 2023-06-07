console.log("main.js loaded");




window.addEventListener("message", (event) => {
    if (event.source !== window) {
      return;
    }
    if (event.data.type && (event.data.type === "FROM_EXTENSION")) {
      console.log("page received: " + event.data.text);
    }
  }
);


/*

to send a message to background use 

postMessage({
    type : "FROM_PAGE", 
    text : "Hello from the webpage!"
    }, 
"*");
});

*/
