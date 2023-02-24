let input = document.querySelector("#input_column")
    /**
     * this function will update the plan in local storage with the current state of the plan on the page
     * it is called in the following places:
     *  - when a course is added to the plan
     *  - when a course is removed from the plan
     *  - when a section is selected for a course
     *  - when a section is removed from a course
     * 
     * PROBLEM: this is called too many times, and it is called when the page is loading, so if there is a disruption in the loading of the plan it the last saved plan will not be correct
     * 
     */
function updatePlan () {
if(sessionStorage.getItem("StopPlanCorruption")=="true") return;
    let tab = document.querySelector(".tab.selected");
    if(tab?.id==="clone") return;
    if (tab==null){
       return;
    }
    let courses=document.querySelectorAll(".course-name");
   let radios = document.querySelectorAll("input[type='radio']:checked")
   // get a list of all the courses, and the section they are in if they are in one
    let courseArray = [];   
    for (let i=0;i<courses.length;i++){
        let course = courses[i].innerText.replace(/\s/g, '').toUpperCase();
        //loop through the radios to find the section
        for (let j=0;j<radios.length;j++){
            let radio = radios[j];
            let section = radio.id.split("_")[1];
            let coursecode = radio.id.split("_")[0];
            if (coursecode===course){
                courseArray.push({coursecode: course, sectionnum: section});
                break;
            }
            if (j===radios.length-1){
                courseArray.push({coursecode: course});
            }
        }
    }
    //loop over all the courses that dont have a section selected
    for (let i=0;i<courses.length;i++){
        let course = courses[i].innerText.replace(/\s/g, '').toUpperCase();
        let found = false;
        for (let j=0;j<courseArray.length;j++){
            if (courseArray[j].coursecode===course){
                found=true;
                break;
            }
        }
        if (!found){
            courseArray.push({coursecode: course});
        }
    }
    
    // get the current tab

    //get the id
    let tabID = tab?.id;
    localStorage.setItem(tabID, JSON.stringify({"name": tab.innerText,"index":tab.getAttribute("data-index"), "courses": courseArray}));
    
        
// console.log("updated plan");    
}
        

window.addEventListener("load", function () {
    // add event listener to all input fields   
                document.querySelectorAll("ui-menu-item").forEach((node) => {
                node.addEventListener("pointerdown",updatePlan ,{bubbles: true});
                node.addEventListener("keydown",updatePlan ,{bubbles: true});
                node.addEventListener("input",updatePlan ,{bubbles: true});
                });

            document.querySelector("#input_column").addEventListener("change",updatePlan ,{bubbles: true});
            document.querySelector("#input_column").addEventListener("input",updatePlan ,{bubbles: true});
            document.querySelector("#input_column").addEventListener("keydown",updatePlan ,{bubbles: true});
            document.querySelector("#input_column").addEventListener("pointerdown",updatePlan ,{bubbles: true});

});
//#input_column mutation observer
// Create an observer that will call updatePlan when an element is added or removed from the input column
const observer = new MutationObserver(updatePlan, {bubbles: true});
// Start observing the target node for configured mutations
observer.observe(input, { childList: true , subtree: true, attributes: true, characterData: true});