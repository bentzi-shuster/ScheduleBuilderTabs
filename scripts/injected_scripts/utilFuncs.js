console.log("%cutilFuncs.js loaded","color:green;font-weight:bold");


function selectSection(coursecode,sectionnum){
    //CS101_002
    let section = document.querySelector(`#${coursecode}_${sectionnum}`);
    if(!section){
        console.error("section not found, adding course without section");
        return;
    }
    section?.click();
}
function courseIsOnPage(coursecode){
    //this checks if the course is on the page, not if it is in the plan!
    //this is to make sure we don't add a course twice and get a duplicate course error from the schedule builder
    coursecode=coursecode.toString().toUpperCase();
    let course = document.querySelector(`#${coursecode}_button_title`);
    if(course){
        return true;
    }
    return false;
}


let autoselect_first_result = false; //this is a global variable that is used to determine if the first result should be selected automatically

$( document ).ready(function() { 
    // this is the function that is called when the page is loaded to check if the first result is open and then selects it 
    // it only does this when a course is added by the extension, and not when the user types in the search box
$( "input#search_input" ).on( "autocompleteopen", function( event, ui ) {
    //select the first result
    if(autoselect_first_result){
    document.querySelector("ul.ui-autocomplete.ui-menu.ui-widget.ui-widget-content")?.firstChild?.firstChild?.click();
    autoselect_first_result = false;
}
   });

});

function addCourse(coursecode,sectionnum=null){
    autoselect_first_result = true;
    //both coursecode and sectionnum are strings! if sectionnum is a number, it causes problems
    coursecode=coursecode.toString().toUpperCase();
    if(courseIsOnPage(coursecode)){
        removeCourse(coursecode);
    }
    $('input#search_input')?.autocomplete("search", coursecode,0); //search for the course
   //after the course is searched for, select the first option

        // document.querySelector("ul.ui-autocomplete.ui-menu.ui-widget.ui-widget-content")?.firstChild?.firstChild?.click();
        if(sectionnum){
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



//make the above function async and use await to make sure the courses are added before the next one is added
async function loadPlan(planData){
    //this function loads the plan into the page
    //planData is an array of objects, each object has a cc and a sn property
    for (let i = 0; i < planData.length; i++) {
        const course = planData[i];
        await addCourse(course.cc,course.sn);
    }
  }
  /*
  example planData:
  [
    {
        "cc": "BME210",
        "sn": "001"
    },
    {
        "cc": "STS201",
        "sn": "103"
    },  {
        "cc": "BME111",
        "sn": "001"
    },  {
        "cc": "CS101",
        "sn": "001"
    },  {
        "cc": "IS117",
        "sn": "001"
    },

]
*/


  function clearPlan(){
    //clear all the courses
    document.querySelectorAll("a.close").forEach((close) => {
        close.click();
    });
  }
  