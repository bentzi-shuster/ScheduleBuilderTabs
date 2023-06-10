console.log("%cmakeTabs.js loaded","color:green;font-weight:bold");
function addEventListenerstoTabNode(TabNode){
    TabNode.addEventListener("pointerup", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        //middle click
        if (e.button === 1) {
            e.preventDefault();
            //delete tab
            if (TabNode.classList.contains("active")) {
                return;
            }
            postMessage({
                type : "FROM_PAGE", 
                text : "Delete plan by middle click",
                action: "deletePlan",
                planID: TabNode.id,
            },
                 
              "*");
        
        }})
        TabNode.addEventListener("pointerdown", (e)=>{
            if (e.button === 1) {
            e.preventDefault();
            e.stopPropagation();
            }
        })
        TabNode.addEventListener("contextmenu", (e)=>{
                e.preventDefault();
let name = prompt("Enter new name for plan", TabNode.innerText);
if (name === null) {
    return;
}
postMessage({
    type : "FROM_PAGE",
    text : "Rename plan",
    action: "renamePlan",
    planID: TabNode.id,
    planName: name,
},
);

            
        })
    }
    
    window.addEventListener("message", (event) => {
    console.log(event.data);
    if(event?.data?.data?.from === "renamePlan"){
        document.getElementById(event.data.data.planID).innerText = event.data.data.planName;
    }


})
    
    function makeTab(data){
        let li = document.createElement("li")
        if(data.current){
            li.classList.add("ui-state-active")
        }else{
        li.classList.add("ui-state-default")
        }
        li.innerText = data.name
        li.id = data.id
        addEventListenerstoTabNode(li)
        
        return li
    }
  