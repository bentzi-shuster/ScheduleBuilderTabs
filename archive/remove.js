// document.querySelectorAll(".close").forEach((node) => {
//     node.addEventListener("click", function () {
//         let coursecode = node.parentNode.id.split("_")[0];
//         removeCourseFromPlan(coursecode);
//     });
// })
// // more reliable way to remove courses from plan


// //div.sv-events-container had child div.sv-event with child span.ui-icon-close
// //put an event listener on div.sv-events-container and check if the target is span.ui-icon-close
// //if it is, remove the course from the plan
// //if it is not, do nothing
// document.querySelector("div.sv-events-container").addEventListener("click", function (e) {
//     if (e.target.tagName === "SPAN" && e.target.classList.contains("ui-icon-close")) {
// let id =document.querySelector(".tab.selected")?.id;
// if (id!=null){
//     let data = JSON.parse(localStorage.getItem(id));
//     let courses = data.courses;
//     let index =data.index;
//     let name = data.name;
//     //filter out the course and re-save the plan without the course section
//     let newcourses = courses.filter((course) => {
//         return course.coursecode!==e.target.parentNode.getAttribute("name");    
//     })
//     newcourses.push({"coursecode": e.target.parentNode.getAttribute("name")});
//     console.log(newcourses);
// localStorage.setItem(id, JSON.stringify({"name": name,"index":index, "courses": newcourses}));

// }
//     }})

// document.getElementById("clearButton").addEventListener("click", function () {
//     clearPlan();
// })