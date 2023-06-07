(function createTabHTML(){
    let appendElm = document.getElementById('page');
    let tabRow = document.createElement('div');
    tabRow.id = 'tabRow';
    appendElm.insertBefore(tabRow, appendElm.firstChild);
    let wrapper = document.createElement("div")
    wrapper.id = "tabs"
    let ul = document.createElement("ul")
    ul.id="sortable"
    postMessage({
          type : "FROM_PAGE", 
          text : "Requesting plan data for tab creation",
          action: "getPlan",
          planID: null //gets all plans
        },
        "*");
    window.addEventListener("message", (event) => {
        if (event.source !== window) {
            return;
        }
        if (event.data.type && (event.data.type === "FROM_EXTENSION")) {

            if (event.data.text==="responding from background"&&event.data.data.from==="getPlan"){
            let planLength = Object.keys(event.data.data.planData).length
            for(let i = 0; i < planLength; i++){
                let li = document.createElement("li")
                li.classList.add("ui-state-default")
                // li.id = Object.keys(event.data.data.planData[i])
                // li.innerText = event.data.data.planData[i].planName
                li.innerText = "plan " + (i+1) 
                li.id = Object.keys(event.data.data.planData)[i]
                ul.appendChild(li)
            }
            wrapper.appendChild(ul)
            tabRow.appendChild(wrapper)
        }

            if (event.data.text==="responding from background"&&event.data.data.from==="createPlan"){
                let li = document.createElement("li")
                li.classList.add("ui-state-default")
                // li.id = Object.keys(event.data.data.planData[i])
                // li.innerText = event.data.data.planData[i].planName
                li.innerText = "plan " + (document.querySelectorAll("li.ui-state-default").length+1) 
                li.id =event.data.data.planID
                ul.appendChild(li)
                
            
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



        }




        $( function() {
            $( "#sortable" ).sortable({
                axis: "x"
            })
        
            $( "#sortable" ).on( "click", function( event, ui ) {
                console.log("click")
            } );
            $( "#sortable" ).on( "sort", function( event, ui ) {
                console.log(ui.item[0].innerText)
            } );
          } );


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
