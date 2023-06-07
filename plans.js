console.log("plans.js loaded")
  


  function uuidv4() {//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  } 


function newPlan(planData){
let planID = uuidv4();
chrome.storage.sync.set({ [planID]:   planData }, function () {
    console.log("Successfully created new plan")
  });
  return planID;

}
function updatePlan(planID,planData){
chrome.storage.sync.set({ [planID]: planData }, function () {
    console.log("Successfully updated plan")
  });
}

function deletePlan(planID){
  if(planID===null){
    chrome.storage.sync.clear()
  }else{

chrome.storage.sync.remove([planID], function(result) {
    console.log("Removed plan")
});}

}
async function getPlan(planID){
    const planData = await chrome.storage.sync.get(planID)

  if(planID===null){
    return planData
  }

    return planData[planID];
}


/* clear all plans
chrome.storage.sync.get(null, function callback(items) {for (let item in items){


    deletePlan((item))
    
}})


//get all plans
chrome.storage.sync.get(null, function callback(items) {console.log(items)})
*/