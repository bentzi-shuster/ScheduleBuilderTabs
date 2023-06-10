(function createTabHTML(){
    let appendElm = document.getElementById('page');
    let tabRow = document.createElement('div');
    tabRow.id = 'tabRow';
    appendElm.insertBefore(tabRow, appendElm.firstChild);
    let wrapper = document.createElement("div")
    wrapper.id = "tabs"
    let ul = document.createElement("ul")
    ul.id="sortable"
    let plusbutton = document.createElement("button");
    plusbutton.id = "plusbutton";
    plusbutton.innerText = "+";
    plusbutton.title = "Make a new plan";
    ul.appendChild(plusbutton)
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

    postMessage({
          type : "FROM_PAGE", 
          text : "Requesting plan data for tab creation",
          action: "loadPlans",
          planID: null //gets all plans
        },
        "*");


    window.addEventListener("message", (event) => {
        if (event.source !== window) {
            return;
        }
        if (event.data.type && (event.data.type === "FROM_EXTENSION")) {

            if (event.data.text==="responding from background"&&event.data.data.from==="loadPlans"){
            let tabList = []
            tabList = [...tabList, ...Object.entries(event.data.data.planData)]
            tabList.sort((a, b) => a[1].index - b[1].index);
            for(let i = 0; i < tabList.length; i++){
                // let li = document.createElement("li")
                // if(i===0){
                //     li.classList.add("ui-state-active")
                // }else{
                // li.classList.add("ui-state-default")
                // }
                // // li.id = Object.keys(event.data.data.planData[i])
                // // li.innerText = event.data.data.planData[i].planName
                // // console.log(tabList);
                // li.innerText = tabList[i][1].name
                // li.id = tabList[i][0]
                // addEventListenerstoTabNode(li)
                li=makeTab({name:tabList[i][1].name,id:tabList[i][0],index:tabList[i][1].index,current:tabList[i][1].current})
                ul.insertBefore(li, plusbutton)
            }
if(tabList.length===0){
    // let li = document.createElement("li")
    // li.classList.add("ui-state-active")
    // li.innerText = "plan 1"
    // li.id = "plan1"
    // addEventListenerstoTabNode(li)
    // ul.insertBefore(li, plusbutton)
    li=makeTab({name:"New Plan",current:true})
    ul.insertBefore(li, plusbutton)

}

            wrapper.appendChild(ul)
            tabRow.appendChild(wrapper)
            $( function() {
                $( "#sortable" ).sortable({
                    axis: "x"
                })
            
                $( "#sortable" ).on( "click", function( event, ui ) {
                    if(event.target.id==="sortable"){
                        return
                    }
                    if (event.target.classList.contains("ui-state-active")){
                        return
                    }
                    if (event.target.id==="plusbutton"){
                        return
                    }
                    let tabs = [...document.querySelectorAll("li.ui-state-default"),...document.querySelectorAll("li.ui-state-active")]
                    for (let i=0;i<tabs.length;i++){
                        tabs[i].classList.remove("ui-state-active")
                    }

                    event.target.classList.add("ui-state-active")
                    
                    postMessage({
                        type : "FROM_PAGE", 
                        text : "open the requested plan",
                        action: "openPlan",
                        planID: event.target.id
                      },
                      "*");
              
    
                } );
                $( "#sortable" ).on( "sort", function( event, ui ) {
                    // console.log(ui.item[0].innerText)
                    // when a tab is dragged
                } );
                //if is sorting, disable the plus button
                $( "#sortable" ).on( "sortstart", function( event, ui ) {
                    plusbutton.disabled = true
                    console.log("plus button disabled")
                }
                );
                $( "#sortable" ).on( "sortstop", function( event, ui ) {
                    plusbutton.disabled = false
                    //TODO update the index of the plan here
                }   
                );
              } );
              setTimeout(() => {
                                postMessage({
                    type : "FROM_PAGE",
                    text : "done loading plans",
                    action: "doneLoadingPlans",
                    planID: null
                },
                "*");
              }, 1);


        }

            if (event.data.text==="responding from background"&&event.data.data.from==="createPlan"){
                // let li = document.createElement("li")
                // li.classList.add("ui-state-default")
                // // li.id = Object.keys(event.data.data.planData[i])
                // // li.innerText = event.data.data.planData[i].planName
                // li.innerText = event.data.data.planData[i].name
                // li.id =event.data.data.planID
                // addEventListenerstoTabNode(li)
                console.log(event.data)
                let li=makeTab({name:event.data.data.planData.name,id:event.data.data.planID,index:event.data.data.planData.index,current:event.data.data.planData.current})
                ul.insertBefore(li, plusbutton)
                
            
            }
            if (event.data.text==="responding from background"&&event.data.data.from==="deletePlan"){
                if(event.data.data.planID){
                    let li = document.getElementById(event.data.data.planID)
                    li.remove()
                } else{
                    let li = document.querySelectorAll("li.ui-state-default")
                    li.forEach(element => {
                        element.remove()
                });
            }
            }

            if (event.data.text==="responding from background"&&event.data.data.from==="openPlan"){
                clearPlan()
                // console.log(event.data.data.planData)    
                loadPlan((event.data.data.planData.data))


            }

        }




})
})()





  window.addEventListener("message", (event) => {
    if (event.source !== window) {
      return;
    }
    if (event.data.type && (event.data.type === "FROM_EXTENSION")) {
      
        console.log(event.data) 
        


    }
  }
);



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