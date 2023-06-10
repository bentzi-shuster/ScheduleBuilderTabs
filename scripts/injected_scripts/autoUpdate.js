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
    planData: ({data:courseArray,name:document.querySelector(".ui-state-active").innerText,current:true}),
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

scheduleEvents.bind("select.section", function(ev, crs, idx) {
    var sec = $("#" + crs)[0].getSection(idx);
    //console.info("select", crs.course, sec.section, idx);
//		alert($("#" + crs)[0].getField("credits"))
//		for (var i in sec) {
//			alert(i + ':' + sec[i])
//		}
    var evs = $("#scheduleView").schedule().update({
        id: sec.callnr,
        name: crs,
        title: sec.course + "-" + sec.section,
        type: "course",
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Changes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        credits: $("#" + crs)[0].getField("credits"),
        prof: sec.instructor,
        content: sec.title,
        cssClass: dijit.byId(crs).attr("iconClass")
    }, sec.slots);

    if (evs.length) {
        $(evs).on({
            mouseenter: function(e) {
                var tgt = $(e.target);
                if (!tgt.hasClass("sv-event"))
                    tgt = tgt.parents(".sv-event");
                showCourseTooltip($("#tooltip"), tgt, sec);
            },
            mouseleave: function(e) {
                hideCourseTooltip($("#tooltip"));
            }
        }).find(".sv-closer").on("click", function(e) {
            if (e.button > 0)
                return;
            if ($("#tooltip").is(":visible")) {
                hideCourseTooltip($("#tooltip"), 0);
            }
            var name = $(this.parentNode).attr("name");
//				alert(name)
            Schedules.clearSelected(name);
            $("#" + name)[0].clearSelection();
            $("#scheduleView").schedule().remove(this.parentNode);
            //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Changes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            scheduleEvents.trigger("change.section", [name, -1]);
            setTimeout(() => {
				updatePlan();
			}, 0);
			
        });
    }
});


scheduleEvents.bind("insert.course", function(ev, data, tbl) {
    $(".sec-input input", tbl).click(function(ev) {
        ev = window.event || ev;
        if (ev.ctrlKey) {
            ev.preventDefault();
            return false;
        }
        $(this).focus();
        if ($("#scheduleView").schedule().containsId(this.value)) {
            return;
        }
        var tbl = $(this).parents(".sec-table")[0];
        var idx = $(this).parents("tr")[0].rowIndex;
        //console.info("click", this.value, ev.target.value);
        //scheduleEvents.trigger("change.section", [obj, idx]);
        scheduleEvents._onSelectSection(this.name, idx);
        setTimeout(() => {
            updatePlan();
        }, 0);
    });
});