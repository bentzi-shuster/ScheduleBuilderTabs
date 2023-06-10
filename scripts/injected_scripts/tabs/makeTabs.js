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
    }
    
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