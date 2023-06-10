console.log("%cmakePlusButton.js loaded","color:green;font-weight:bold");
function makePlusButton(){
    let plusbutton = document.createElement("button");
    plusbutton.id = "plusbutton";
    plusbutton.innerText = "+";
    plusbutton.title = "Make a new plan";
    plusbutton.onpointerup =(e)=>{
        if(e.target.disabled){
            return;
        }
        postMessage({
            type : "FROM_PAGE", 
            text : "Create Empty Plan!",
            action: "createPlan",
            planData:[],
            
          },
             
          "*");
    }
    
    return plusbutton
}