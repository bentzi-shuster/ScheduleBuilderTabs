async function addCourse(coursecode){
    $('input#search_input')?.autocomplete("search", coursecode, 0); //search for the course
setTimeout(() => {
    document.querySelector("ul.ui-autocomplete.ui-menu.ui-widget.ui-widget-content")?.firstChild?.firstChild?.click();
}, 0);
}
function selectSection(coursecode,sectionnum){
    //CS101_002
    let section = document.querySelector(`#${coursecode}_${sectionnum}`);
    section?.click();
}
function addSection(coursecode,sectionnum){
    // console.log(coursecode,sectionnum);
    coursecode=coursecode.toString().toUpperCase();
    
    addCourse(coursecode);
    console.log(sectionnum);
    if(sectionnum){
        console.log("test")
    sectionnum=sectionnum.toString().toUpperCase();
        setTimeout(() => {
            selectSection(coursecode,sectionnum);
        }, 0);
    }
}
function removeCourse(coursecode){
    coursecode=coursecode.toString().toUpperCase();
    let close = document.querySelector(`#${coursecode}_button_title`)?.querySelector("a.close");
    close?.click();
}
function loadPlan(courseArray){
    if (courseArray.length===0) return;
    if(!courseArray) return;
    // disable all the tabs
    document.querySelectorAll(".tab").forEach((tab) => {
        tab.setAttribute("disabled", "true");
    });
    document.querySelector("#plusbutton").setAttribute("disabled","true");
    sessionStorage.setItem("StopPlanCorruption", "true");
    for (let i=0;i<courseArray.length;i++){
        let course = courseArray[i];
        // console.log(course.coursecode,course.sectionnum);
        setTimeout(() => {
             addSection(course.coursecode,course.sectionnum);  
        }, 100*i);
       
    }
    setTimeout(() => {
        // enable all the tabs
        document.querySelectorAll(".tab").forEach((tab) => {
            tab.removeAttribute("disabled");
        });
        document.querySelector("#plusbutton").removeAttribute("disabled");
        sessionStorage.removeItem("StopPlanCorruption");
    }, 60*courseArray.length);
    //{coursecode: "CS101", sectionnum: "002"}

}
function uuidv4() {//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  } 

  function clearPlan(){
    //clear all the courses
    document.querySelectorAll("a.close").forEach((close) => {
        close.click();
    });
  }

  function savePlan(tab){
    if(sessionStorage.getItem("StopPlanCorruption")=="true") return;
    if(tab?.id==="clone") return;
    if(verifyPlan(tab.id)===false){
        // console.log("plan not on page");
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
    localStorage.setItem(tab.id, JSON.stringify({"name": tab.innerText,"index":tab.getAttribute("data-index"), "courses": courseArray}));
    // console.log("saved");
    }
    
function deletePlan(tabid){
    if(sessionStorage.getItem("StopPlanCorruption")=="true") return;
    if(document.querySelectorAll(".tab").length===1) {
        alert("You can't delete the last tab!");
        return;
    };
    sessionStorage.setItem("lastRemovedTab", tabid);
    sessionStorage.setItem("lastRemovedTabData", localStorage.getItem(tabid));
    localStorage.removeItem(tabid); 
    //animate the tab closing
    let tab = document.getElementById(tabid);
    
    tab.style.overflow = "hidden";
    tab.style.ponterEvents = "none";

    tab.animate([
        // keyframes
        { width: tab.offsetWidth+"px",minWidth: tab.offsetWidth+"px",maxWidth: tab.offsetWidth+"px" } ,
        { width: "0px",minWidth: "0px",maxWidth: "0px" }
        ], {
        // timing options
        duration: 200,
        iterations: 1,
        fill: "forwards",
        easing: "ease-in-out"
        });
    setTimeout(() => {
        let issel = tab?.classList.contains("selected")
            if (issel){
        // if the tab is selected, select the next tab
        // if there is no next tab, select the previous tab
        // if there is no previous tab, select the first tab
        // if there is no first tab, do nothing
        let next = document.getElementById(tabid).nextElementSibling;
        let prev = document.getElementById(tabid).previousElementSibling;
        let first = document.querySelector(".tab");
        if (next!=null&&next.classList.contains("tab")){
            selectPlan(next.id);
        }
        else if (prev!=null&&prev.classList.contains("tab")){
            selectPlan(prev.id);
        }

        
        
    }
        tab.remove();
        saveTabOrder()
        
    }
    , 200);

}
function renamePlan(tabid){
    let tabelm = document.getElementById(tabid);
    let input = document.createElement("input");
    input.type="text";
    input.value=tabelm.innerText;
    //disable the tab
    tabelm.setAttribute("disabled", "true");
    input.addEventListener("keydown", function (e) {
        if (e.key==="Enter"){
            input.blur();
        }
        if (e.key==="Escape"){
            input.blur();
        }
    })
    input.addEventListener("blur", function (e) {
        tabelm.removeAttribute("disabled");
        tabelm.innerText=input.value;
        input.remove();
        // re-add the close button
        let close = document.createElement("button");
        close.classList.add("closebutton", "sv-closer", "ui-icon", "ui-icon-close");
        close.addEventListener("click", function () {
            deletePlan(tabid);
        })
        tabelm.appendChild(close);
        savePlan(tabelm);
    })
    tabelm.innerText="";
    tabelm.appendChild(input);
    input.focus();
    input.select();
}
function duplicatePlan(tabid){
    localStorage.setItem(uuidv4(), JSON.stringify({"name": JSON.parse(localStorage.getItem(tabid)).name,"index":getNextIndex(), "courses": JSON.parse(localStorage.getItem(tabid)).courses}));
    tabRow.innerHTML="";
    regenerateTabs_pageLoad();
}
function removeCourseFromPlan(coursecode){
    //remove the course from the plan in local storage
    let tab = document.querySelector(".tab.selected");
    let tabid = tab.id;
    let courses = JSON.parse(localStorage.getItem(tabid)).courses;
    let newcourses = courses.filter((course) => {
        return course.coursecode!==coursecode;
    }); 
    localStorage.setItem(tabid, JSON.stringify({"name": JSON.parse(localStorage.getItem(tabid)).name,"index":JSON.parse(localStorage.getItem(tabid)).index, "courses": newcourses}));
    //remove the course from the plan on the page
    removeCourse(coursecode);   
}
function copyPlan(tabid){
    //copy the plan to the clipboard
    navigator.clipboard.writeText(localStorage.getItem(tabid));
}
function pastePlan(tabid){
    //paste the plan from the clipboard and load it
    navigator.clipboard.readText().then(text => {
        let json =JSON.parse(text);
        //check that the json is valid
        if (json.name==undefined||json.courses==undefined){
            alert("Invalid plan");
            return;
        }
        json.index = document.getElementById(tabid).getAttribute("data-index");
        localStorage.setItem(tabid, JSON.stringify(json));
        
        regenerateTabs_pageLoad();
    });
}
function getNextIndex(){
    //get the next index for a new tab
    let max = 0;
    for (let i=0;i<localStorage.length;i++){
        let key = localStorage.key(i);
        if (!key.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) continue;

        let index = JSON.parse(localStorage.getItem(key))?.index;
        if (index>max){
            max=index;
        }
    }
    return parseInt(max)+1;
}


function restorePlan(){
    //bring back the last deleted tab
    let tabid = sessionStorage.getItem("lastRemovedTab");
    let tabdata = JSON.parse(sessionStorage.getItem("lastRemovedTabData"));
    localStorage.setItem(tabid, JSON.stringify({name:tabdata.name, index:getNextIndex(), courses:tabdata.courses}));
    regenerateTabs_pageLoad();
    sessionStorage.removeItem("lastRemovedTab");
    sessionStorage.removeItem("lastRemovedTabData");
}


function saveTabOrder() {
    //save the order of the tabs
    let tabs = document.querySelectorAll(".tab");
    // set the index of each tab in local storage
    tabs.forEach((node,i) => {
        if(localStorage.getItem(node.id)){ //incase its deleted in the meantime
        let plan = JSON.parse(localStorage.getItem(node.id));
        plan.index = i;
        localStorage.setItem(node.id, JSON.stringify(plan));
        node.setAttribute("data-index", i);
    }
    });
    }

    function mergeIntoNewPlan(id1,id2){
    //merge two plans into a new plan
    let plan1 = JSON.parse(localStorage.getItem(id1));
    let plan2 = JSON.parse(localStorage.getItem(id2));
    //make a new course list without duplicate course codes
    let newcourses = [];
    plan1?.courses?.forEach((course) => {
        if (!newcourses.some((c) => c.coursecode===course.coursecode)){
            newcourses.push(course);
        }
    });
    plan2?.courses?.forEach((course) => {
        if (!newcourses.some((c) => c.coursecode===course.coursecode)){
            newcourses.push(course);
        }
    });
    //if there is a duplicate course code, keep the one from plan 1
    //make a new plan
    let newplan = {"name": plan1.name+"+"+plan2.name, "index": getNextIndex(), "courses": newcourses};
    //save the new plan
    localStorage.setItem(uuidv4(), JSON.stringify(newplan));
    //add the new plan to the tabs
    regenerateTabs_pageLoad();
    
    }