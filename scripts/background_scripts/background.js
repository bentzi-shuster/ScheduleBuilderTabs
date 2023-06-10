importScripts("startup.js")
importScripts("plans.js")


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.source === "fromPage") {
          console.log("background script received: " + request.text);
          switch(request.action){
        case("createPlan"):
          console.log("createPlan action")
          let  data = newPlan(request.planData,request.index,request.planName,request.current) 
          let planID = Object.keys(data)[0]
          let planData = data[planID]
          let current = planData.current
          let index = planData.index
          let name = planData.name
          postMessagetToPage(param={from: "createPlan",planID: planID,planData: planData,current: current,index: index,name: name})
          break;
          case("updatePlan"):
          chrome.storage.local.get("plansLoading", function(result) {
          if (result.plansLoading){
            console.log("plans are updating, loading, or creating, cant update")
          }else{
            console.log("plans are not updating, loading, or creating, doing update")
            updatePlan(request.planID,request.planData)
            postMessagetToPage(param={from: "updatePlan",planID: request.planID,planData: request.planData})
          }
          });
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
          }).then(()=>{
            //set in session storage that the plans are loading, so the plan doesnt get updated
            chrome.storage.local.set("plansLoading",true, function() {
              console.log("plans are loading");
            });
          })

          break;
          case("openPlan"):
          makePlanCurrent(request.planID).then(()=>{
          getPlan(request.planID).then((planData)=>{
          postMessagetToPage(param={planData: planData,from: "openPlan"})
          })
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
        case("doneLoadingPlans"):
        chrome.storage.local.set("plansLoading",false, function() {
          console.log("plans are done loading");
        });
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

          
      