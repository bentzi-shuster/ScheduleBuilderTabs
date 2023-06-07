importScripts("startup.js")
importScripts("plans.js")


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.source === "fromPage") {
          console.log("background script received: " + request.text);
          switch(request.action){
        case("createPlan"):
          console.log("createPlan action")
          let planID = newPlan(request.planData)
          postMessagetToPage(param={planID: planID,from: "createPlan"})
          break;
          case("updatePlan"):
          updatePlan(request.planID,request.planData)
          postMessagetToPage(param={from: "updatePlan",planID: request.planID,planData: request.planData})
          break;
          case("deletePlan"):
          deletePlan(request.planID)
          postMessagetToPage(param={planID: request.planID,from: "deletePlan"})
          break;  
          case("getPlan"):
          getPlan(request.planID).then((planData)=>{
          postMessagetToPage(param={planData: planData,from: "getPlan"})
          })
          break;
          case("loadPlans"):
            getPlan(request.planID).then((planData)=>{
            postMessagetToPage(param={planData: planData,from: "loadPlans"})
          })
          break;
          case("openPlan"):
        getPlan(request.planID).then((planData)=>{
          postMessagetToPage(param={planData: planData,from: "openPlan"})
        })
        break;
          case("getCurrentPlanId"): 
        getCurrentPlanId().then((planID)=>{
          postMessagetToPage(param={planID: planID,from: "getCurrentPlanId"})
        })
        break;
          case("makePlanCurrent"):
          makePlanCurrent(request.planID).then((planID)=>{
          postMessagetToPage(param={planID: planID,from: "makePlanCurrent"})
        })
        break;
        default:
        console.log("no action found")
        postMessagetToPage(param={from: "no action found"})
        break;
        
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

          
      