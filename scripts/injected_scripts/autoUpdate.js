console.log("%cautoUpdate.js loaded","color:green;font-weight:bold");
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
    console.log("courseArray");
    console.log(courseArray);
    if(document.querySelector(".ui-state-active")){
postMessage({
    type : "FROM_PAGE", 
    text : "update the plan",
    action: "updatePlan",
    planID: document.querySelector(".ui-state-active").id,  
    planData: ({data:courseArray,name:"temp",current:false})
},
     
  "*");


}}
        

$.extend(scheduleEvents, {
	_onInsertCourse: function(data) {
		var tbl = formatCourse(data);
		if (this.trigger("insert.course", [data, tbl]) !== false)
			this.trigger("change.course", [tbl.id.replace("tbl_", "")]);
       
			setTimeout(() => {
				updatePlan();
			}, 0);

	},
	_onRemoveCourse: function(name) {
		if (this.trigger("remove.course", [name]) !== false)
			this.trigger("change.course", [name]);

							setTimeout(() => {
				updatePlan();
			}, 0);
				
	},
	_onSelectSection: function(name, idx) {
		var selRow = $("#" + name + " .sec-table tr").filter(":has(input:checked)")[0];
		var changed = !selRow || selRow.rowIndex != idx;
		if (this.trigger("select.section", [name, idx]) === false)
			return false;
		if (changed) {
			this.trigger("change.section", [name, idx]);
			changeCount++;
		}
  
						setTimeout(() => {
				updatePlan();
			}, 0);
			

	}
});
