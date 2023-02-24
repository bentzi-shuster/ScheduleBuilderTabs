document.querySelectorAll(".close").forEach((node) => {
    node.addEventListener("click", function () {
        let coursecode = node.parentNode.id.split("_")[0];
        removeCourseFromPlan(coursecode);
    });
})
// more reliable way to remove courses from plan


//div.sv-events-container had child div.sv-event with child span.ui-icon-close
//put an event listener on div.sv-events-container and check if the target is span.ui-icon-close
//if it is, remove the course from the plan
//if it is not, do nothing
document.querySelector("div.sv-events-container").addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN" && e.target.classList.contains("ui-icon-close")) {
        let coursecode = e.target.parentNode.getAttribute("name");
        console.log(coursecode);
        removeCourseFromPlan(coursecode);
        addCourse(coursecode);
        savePlan();
        // this is a hack to remove the section from the course
    }
})

document.getElementById("clearButton").addEventListener("click", function () {
    clearPlan();
})