let input = document.querySelector("#input_column")
    /**
     * this function will update the plan in local storage with the current state of the plan on the page
     * it is called in the following places:
     *  - when a course is added to the plan
     *  - when a course is removed from the plan
     *  - when a section is selected for a course
     *  - when a section is removed from a course
     * 
     */
function updatePlan () {
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
                courseArray.push({cc: course, sn: section});
                break;
            }
            if (j===radios.length-1){
                courseArray.push({cc: course});
            }
        }
    }
    //loop over all the courses that dont have a section selected
    for (let i=0;i<courses.length;i++){
        let course = courses[i].innerText.replace(/\s/g, '').toUpperCase();
        let found = false;
        for (let j=0;j<courseArray.length;j++){
            if (courseArray[j].cc===course){
                found=true;
                break;
            }
        }
        if (!found){
            courseArray.push({cc: course});
        }
    }
    if(document.querySelector(".ui-state-active")){
postMessage({
    type : "FROM_PAGE", 
    text : "update the plan",
    action: "updatePlan",
    planID: document.querySelector(".ui-state-active").id,  
    planData: JSON.stringify(courseArray)
},
     
  "*");

}}
        

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


