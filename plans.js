console.log("plans.js loaded")
  


  function uuidv4() {//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  } 


function newPlan(planData){
let planID = uuidv4();

let planobj = { [planID]:   {data:planData,current:false,index:0,name:"New Plan"}}

chrome.storage.sync.set(planobj, function () {
    console.log("Successfully created new plan")
  });
  return planID;
}

function updatePlan(planID,planData){
chrome.storage.sync.set({ [planID]: planData }, function () {
    console.log("Successfully updated plan")
  });
}

renamePlan = function(planID,planName){
  getPlan(planID).then(function(plan){
    plan.name=planName;
    updatePlan(planID,plan)
  })
}

reindexPlan = function(planID,planIndex){
  getPlan(planID).then(function(plan){
    plan.index=planIndex;
    updatePlan(planID,plan)
  })
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
async function getCurrentPlanId(){

const plans = await chrome.storage.sync.get(null)
if(Object.keys(plans).length===0){
  return null;
}
 for (let plan of Object.keys(plans)) {
    if(plans[plan].current===true){
      return plan;
    }
 }  
 return makePlanCurrent(Object.keys(plans)[0])

}
async function makePlanCurrent(planID){
  const plans = await chrome.storage.sync.get(null)
  for (let plan of Object.keys(plans)) {
    if(plans[plan].current===true){
      plans[plan].current=false;
      updatePlan(plan,plans[plan])
    }
 }  
  plans[planID].current=true;
  updatePlan(planID,plans[planID])
  return planID;
}


/* clear all plans
chrome.storage.sync.get(null, function callback(items) {for (let item in items){


    deletePlan((item))
    
}})


//get all plans
chrome.storage.sync.get(null, function callback(items) {console.log(items)})
*/