// function makeNewTab(e=null) {
//     e?.preventDefault();
// //create a new tab with a unique id 
// let tab = document.createElement("button");
// tab.id = uuidv4();
// // tab.title = "Right click for more options";
// tab.classList.add("tab");
// tab.innerText = "New Tab";

// //get the index of the new tab
// let index = document.querySelectorAll(".tab").length ;
// tab.setAttribute("data-index", index);
// let close = document.createElement("button");
// close.classList.add("closebutton", "sv-closer", "ui-icon", "ui-icon-close");
// close.addEventListener("click", function () {
//     deletePlan(tab.id);
// })
// tab.appendChild(close);
// localStorage.setItem(tab.id, JSON.stringify({"name": "New Tab","index":index, "courses": []}));

//     document.getElementById("tabRow").insertBefore(tab, document.getElementById("plusbutton")); 


// tab.addEventListener("pointerup", function (e) {
//     if(e.target.classList.contains("closebutton"))return;
//     if(e.button == 0){
//         if(!tab.hasAttribute("disabled")){
//     selectPlan(tab.id);
//         }
// }
//   else  if(e.button == 1){
//         e.preventDefault();
//         deletePlan(tab.id);

//     }

// });



// tab.addEventListener("pointerdown",(e)=>{if(e.target.classList.contains("closebutton"))return;tabPointerDown(e,tab)})
// window.addEventListener("contextmenu", function (e) {
//     if (e.target===tab) {
//     e.preventDefault();
//     showContextMenu(e, tab);
// }
// })
// // tab.addEventListener("dblclick", function () {
// //     renamePlan(tab.id);
// // })
// //if there are no other tabs, save the current plan to the new tab, if there are other tabs, load an empty plan
// if (document.querySelectorAll(".tab").length == 1) {
// savePlan(tab);
// } else {
// clearPlan();
// }

// let delayTillpopup = 500;
// let timer;
// tab.addEventListener("pointerenter", function (e) {
//     timer = setTimeout(function () {
//         if (document.querySelectorAll(".tab:hover").length > 0) {   
//             showDetailsPopup(e, tab);
//         }
//     }, delayTillpopup);
// });
// tab.addEventListener("pointerout", function () {
//     clearTimeout(timer);
// });







// selectPlan(tab.id);
// }


// function selectPlan(planID) {
//     if(planID==="clone") return;
//     clearPlan();
// //select the plan
// let plan = JSON.parse(localStorage.getItem(planID));
// //load the plan
// //uuidv4 regex
// if(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(planID)){
//     if (plan&&plan.courses.length > 0) {
// loadPlan(plan.courses);
//     }
// }
// //update the tab row
// document.querySelectorAll(".tab.selected").forEach((node) => {
//     node.classList.remove("selected");
// });
// document.getElementById(planID)?.classList.add("selected");
// sessionStorage.setItem("selectedPlan", planID);
// }

// function makeContextMenu() {
// //create the context menu
// let contextMenu = document.createElement("div");
// contextMenu.id = "contextMenu";
// contextMenu.classList.add("contextMenu");
// document.body.appendChild(contextMenu);

// contextMenu.addEventListener("contextmenu", function (e) {
//     e.preventDefault();
//     showContextMenu(e,document.getElementById(contextMenu.getAttribute("data-tab")));
// })



// //create the context menu items
// let deleteTab = document.createElement("button");
// deleteTab.id = "deleteTab";
// deleteTab.classList.add("contextMenuItem");
// deleteTab.innerText = "Delete Tab";
// deleteTab.addEventListener("click", function () {
//     deletePlan(contextMenu.getAttribute("data-tab"));
//     document.getElementById("contextMenu").style.display = "";
// })

// contextMenu.appendChild(deleteTab);
// let renameTab = document.createElement("button");
// renameTab.id = "renameTab";
// renameTab.classList.add("contextMenuItem");
// renameTab.innerText = "Rename Tab";
// renameTab.addEventListener("click", function () {
//     renamePlan(contextMenu.getAttribute("data-tab"));
//     document.getElementById("contextMenu").style.display = "";
// })
// contextMenu.appendChild(renameTab);
// let duplicateTab = document.createElement("button");
// duplicateTab.id = "duplicateTab";
// duplicateTab.classList.add("contextMenuItem");
// duplicateTab.innerText = "Duplicate Tab";
// duplicateTab.addEventListener("click", function () {
//     duplicatePlan(contextMenu.getAttribute("data-tab"));
//     document.getElementById("contextMenu").style.display = "";
// })
// contextMenu.appendChild(duplicateTab);
// //copy the json
// let copyJSON = document.createElement("button");
// copyJSON.id = "copyJSON";
// copyJSON.classList.add("contextMenuItem");
// copyJSON.innerText = "Copy to Clipboard";
// copyJSON.addEventListener("click", function () {
//     copyPlan(contextMenu.getAttribute("data-tab"));
//     document.getElementById("contextMenu").style.display = "";
// })
// contextMenu.appendChild(copyJSON);

// //paste the json
// let pasteJSON = document.createElement("button");
// pasteJSON.id = "pasteJSON";
// pasteJSON.classList.add("contextMenuItem");
// pasteJSON.innerText = "Paste from Clipboard";
// pasteJSON.addEventListener("click", function () {
//     pastePlan(contextMenu.getAttribute("data-tab"));
//     document.getElementById("contextMenu").style.display = "";
// })
// contextMenu.appendChild(pasteJSON);

// //merge tab with another tab to ther right
// let mergeTab = document.createElement("button");
// mergeTab.id = "mergeTab";
// mergeTab.classList.add("contextMenuItem");
// mergeTab.innerText = "Merge Tab with Tab to the Right";
// mergeTab.addEventListener("click", function () {
//     let tabid = contextMenu.getAttribute("data-tab");
//     let nextTab = document.getElementById(tabid).nextElementSibling
//     if(nextTab.classList.contains("tab")){
//         mergeIntoNewPlan(tabid,nextTab.id);
//     }
//     else{
//         alert("There is no tab to the right of this tab");
//     }   
//     document.getElementById("contextMenu").style.display = "";
// })
// contextMenu.appendChild(mergeTab);

// //bring back last deleted tab
// let restoreTab = document.createElement("button");
// restoreTab.id = "restoreTab";
// restoreTab.classList.add("contextMenuItem");
// restoreTab.innerText = "Restore Last Deleted Tab";
// restoreTab.addEventListener("click", function () {
//     restorePlan();
//     document.getElementById("contextMenu").style.display = "";
// })
// contextMenu.appendChild(restoreTab);
// }
// function showContextMenu(e, tab) {
//     // if the target if the close button, don't show the context menu
//     //if there is session storage for the last deleted tab, show the restore tab button
//     if(sessionStorage.getItem("lastRemovedTab")){
//         document.getElementById("restoreTab").style.color = "black";
//         document.getElementById("restoreTab").style.pointerEvents = "";
//     }else{
//         document.getElementById("restoreTab").style.color = "lightgrey";
//         document.getElementById("restoreTab").style.pointerEvents = "none";
//     }

// //show the context menu
// let contextMenu = document.getElementById("contextMenu");
// contextMenu.style.display = "flex";
// contextMenu.style.left = e.clientX + "px";
// contextMenu.style.top = e.clientY + window.scrollY  + "px";
// //set the context menu's tab to the tab that was right clicked
// contextMenu.setAttribute("data-tab", tab.id);
// if (tab.classList.contains("closebutton")) {//if the target is the close button, set the context menu's tab to the close button's parent which is the tab
//     contextMenu.setAttribute("data-tab", tab.parentElement.id);
// }
// contextMenu.addEventListener("mouseleave", function () {
//     contextMenu.style.display = "";
// });
// }


// function showDetailsPopup(e, tab) {
//     if(document.getElementById("contextMenu").style.display === "flex"){
//         return;
//     }
// //show the details popup that shows the courses in the tab
// let detailsPopup = document.getElementById("detailsPopup");
// detailsPopup.style.display = "flex";
// detailsPopup.style.left =tab.getBoundingClientRect().left+window.scrollX + "px";
// detailsPopup.style.top = tab.getBoundingClientRect().bottom + window.scrollY + "px";
// detailsPopup.style.width = tab.getBoundingClientRect().width -2 + "px";
// //2 is subtracted from the width to account for the border

// //set the details popup's tab to the tab that was hovered over
// detailsPopup.setAttribute("data-tab", e.target.id);
// //get the courses in the tab
// let plan = JSON.parse(localStorage.getItem(e.target.id));
// let courses = plan?.courses;

// //clear the details popup
// detailsPopup.innerHTML = "";
// if (courses==null||courses.length == 0) {
//     let noCourses = document.createElement("div");
//     noCourses.classList.add("noCourses");
//     noCourses.innerText = "No Courses";
//     detailsPopup.appendChild(noCourses);
// }else{
// //add the courses to the details popup
// courses?.forEach((course) => {
//     let courseDiv = document.createElement("div");
//     courseDiv.classList.add("course");
//     courseDiv.innerText = course.coursecode+(course.sectionnum?"-"+course.sectionnum:"");
//     detailsPopup.appendChild(courseDiv);
// })
// }
// window.addEventListener("pointerdown", function () {
//     detailsPopup.style.display = "";
// })
// window.addEventListener("contextmenu", function () {
//     detailsPopup.style.display = "";
// })
// let alltabs = document.querySelectorAll(".tab");
// alltabs.forEach((atab) => {
//     atab.addEventListener("click", function () {
//         detailsPopup.style.display = "";
//     })
//     atab.addEventListener("contextmenu", function () {
//         detailsPopup.style.display = "";
//     })
//     //atab.addEventListener("pointerleave", function () {
//        // detailsPopup.style.display = "";
//    // })
//     atab.addEventListener("pointerout", function () {
//         detailsPopup.style.display = "";
//     })
// })

// }
// function initDetailsPopup() {
// //create the details popup
// let detailsPopup = document.createElement("div");
// detailsPopup.id = "detailsPopup";
// detailsPopup.classList.add("detailsPopup");
// document.body.appendChild(detailsPopup);
// }


// function dropTab(tab, clone) {
//     document.body.style.cursor = "";
//             removeListeners();
//     //drop the tab
//     window.removeEventListener("pointermove", (ev) => {dragTab(ev, tab, clone, xdelta)});
//     window.removeEventListener("pointerup", () => {dropTab(tab, clone)});
//     window.removeEventListener("pointerleave", () => {dropTab(tab, clone)});
//     tab.style.position = "";
//     tab.style.zIndex = "";
//     tab.style.left = "";
//     tab.style.top = "";
//     tab.style.pointerEvents = "";
//     //place the tab in the position of the clone
//     document.getElementById("tabRow").insertBefore(tab, clone);
//     //remove the clone
//     document.getElementById("clone").remove();
//     //update the index of all the tabs that were moved
//     let tabs = document.querySelectorAll(".tab");
//     let index = 0;
//     tabs.forEach((node) => {
//         if (node.id != tab.id) {
//             node.setAttribute("data-index", index); 
//             index++;
//         }
//     });
//     //save the new order of the tabs    
//     saveTabOrder();


    
// tab.classList.remove("dragging");

    
// }
// let removeListeners;
// function startDrag(ev, tab, clone, xdelta) {
//     document.body.style.cursor = "grabbing";
// let callback = (ev) => {dragTab(ev, tab, clone, xdelta)};
// window.addEventListener("pointermove", callback);
// let callback2 = () => {dropTab(tab, clone)};
// window.addEventListener("pointerup", callback2);
// window.addEventListener("pointerleave", callback2);
// removeListeners = () => {
//     window.removeEventListener("pointermove", callback);
//     window.removeEventListener("pointerup", callback2);
//     window.removeEventListener("pointerleave", callback2);
// }
// }
// function tabPointerDown(e,tab) {
//     if(e.target.classList.contains("closebutton")){
//         return;
//     }
//     if(tab.hasAttribute("disabled")) {
//         return;
//       }
// if(e.button == 1){
//     e.preventDefault();
//     return;
// }
//         //if the tab is not selected, select it
// if (!tab.classList.contains("selected")) {
// selectPlan(tab.id);
// }
//     //make the tab draggable 
//     if(e.button == 0){
//        //clone the tab and leave it in the same place but invisible
//         let clone = tab.cloneNode(true);
//         clone.id = "clone";
//         clone.setAttribute("disabled", "true")
//         clone.classList.remove("tab");
//         clone.setAttribute("data-places-moved", 0);
//         document.getElementById("tabRow").insertBefore(clone, tab);
        
//         tab.style.zIndex = 1000;
//         let xdelta =tab.offsetWidth- ( tab.offsetLeft - e.clientX);
//         tab.style.left = e.clientX - xdelta + "px";
//         tab.style.top = tab.offsetTop + "px";
//         tab.style.pointerEvents = "none";
//         tab.style.position = "absolute"; 
// tab.classList.add("dragging");
// startDrag(e, tab, clone, xdelta);

//     }
// }


// function dragTab(ev, tab, clone, xdelta) {
//             tab.style.left = ev.clientX - xdelta +ev.movementX + "px";
//             //when the tab is moved, swap the clone with the ones it is moved over
//             let tabs = document.querySelectorAll(".tab");
            
//             tabs.forEach((node) => {
//                 if (node.id != tab.id && node.id != "clone") {
//                     if (ev.clientX > node.offsetLeft && ev.clientX < node.offsetLeft + node.offsetWidth) { 
//                         if (ev.clientX > node.offsetLeft + node.offsetWidth / 2) {
//                             if(node.previousSibling?.id != "clone"){
//                             // console.log("right");
//                             document.getElementById("tabRow").insertBefore(clone, node);//move the clone to the right of the node
//                             if (node.previousSibling != null&&!node.classList.contains("animateing")) {
//                                 node.classList.add("animateing");
//                                 node.animate([
//                                     { transform: "translateX(-100%)" },
//                                     { transform: "translateX(0)" }
//                                 ], {
//                                     duration: 300,
//                                     iterations: 1,
//                                     fill: "forwards",
//                                     easing: "ease-in-out"
//                                 }).onfinish = function () {
//                                     node.classList.remove("animateing");
//                                 };
//                                 clone.setAttribute("data-places-moved", parseInt(clone.getAttribute("data-places-moved")) + 1);
//                             }

//                             }
//                             return;
//                         } else  
//                              {
//                             if(node.nextSibling?.id != "clone"){
//                             // console.log("left");
//                             document.getElementById("tabRow").insertBefore(clone, node.nextSibling);
//                             //animate the node moving to the left of the clone
//                             if (node.nextSibling != null&&!node.classList.contains("animateing")) {
//                             node.classList.add("animateing");
//                             node.animate([
//                                 { transform: "translateX(100%)" },
//                                 { transform: "translateX(0)" }
//                             ], {
//                                 duration: 300,
//                                 iterations: 1,
//                                 fill: "forwards",
//                                 easing: "ease-in-out"
//                             }).onfinish = function () {
//                                 node.classList.remove("animateing");
//                             };
//                             clone.setAttribute("data-places-moved", parseInt(clone.getAttribute("data-places-moved")) - 1);
//                         }
//                     }

//                              return;

//                         }
//                     }
//                 }
//             }
//             )   


            
//         }