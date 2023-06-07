// //add the tab row and the plus button to the dom
// let appendElm = document.getElementById('header');
// function initTabRow() {
// let tabRow = document.createElement('div');
// tabRow.id = 'tabRow';
// appendElm.appendChild(tabRow);
// }
// function initPlusButton() {
// let plusbutton = document.createElement("button");
// plusbutton.id = "plusbutton";
// plusbutton.innerText = "+";
// plusbutton.title = "Make a new plan";
// plusbutton.onpointerup =(e)=>{
//   //check if dragging a tab
//   if (document.querySelector(".tab.dragging") != null) {
//         return;
//     } 
//     if (plusbutton.hasAttribute("disabled")) { // to stop the user from making a new tab while a plan is being loaded
//         return;
//     }
//   makeNewTab(e); 
// } 
// plusbutton.onpointerdown = function (e) {
// e.preventDefault();
// }
// tabRow.appendChild(plusbutton);
// }