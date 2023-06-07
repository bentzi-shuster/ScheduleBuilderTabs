importScripts("startup.js")
importScripts("plans.js")


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.source === "fromPage") {
          console.log("background script received: " + request.text);
        if(request.action === "createPlan"){
          console.log("createPlan action")
          let planID = newPlan(request.planData)
          postMessagetToPage(param={planID: planID,from: "createPlan"})
        }
        if(request.action === "updatePlan"){
          updatePlan(request.planID,request.planData)
          postMessagetToPage(param={from: "updatePlan"})
        }
        if(request.action === "deletePlan"){
          deletePlan(request.planID)
          postMessagetToPage(param={planID: request.planID,from: "deletePlan"})
        }
        if(request.action === "getPlan"){
          getPlan(request.planID).then((planData)=>{
          postMessagetToPage(param={planData: planData,from: "getPlan"})
          })}

          if(request.action === "loadPlans"){
            getPlan(request.planID).then((planData)=>{
            postMessagetToPage(param={planData: planData,from: "loadPlans"})
          })
        }       
         if(request.action === "openPlan"){
          getPlan(request.planID).then((planData)=>{
          postMessagetToPage(param={planData: planData,from: "openPlan"})
        })
      }
        
      }
    }
  );


  function postMessagetToPage(param={}){          
            (async () => {
             
                const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
                if(!tab?.id){
                  console.log("you need to have the tab selected / in focus")
                  return;
                }
                const response = await chrome.tabs.sendMessage(tab.id, {message: "responding from background",data: param});
                // do something with response here, not outside the function
                console.log(response);
              })();
  }

/*

to send a message to page use 
postMessagetToPage("test")

*/

          
      