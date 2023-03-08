window.addEventListener("load", function () {
  initTabRow();
  makeContextMenu();
  initDetailsPopup();
  //add the tabs
  regenerateTabs_pageLoad();
});
function regenerateTabs_pageLoad() {
  //clear the tab row
  document.getElementById("tabRow").innerHTML = "";
  //add the plus button
  initPlusButton();
  //add the tabs

  //loop through the local storage and make an ordered list of the tabs based on the index
  let tabList = [];
  for (let i = 0; i < localStorage.length; i++) {
    //check if the item is a plan using a uuid 4 regex
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        localStorage.key(i)
      )
    ) {
      continue;
    }

    let plan = [
      JSON.parse(localStorage.getItem(localStorage.key(i))),
      localStorage.key(i),
    ];
    tabList = [...tabList, plan];
  }
  tabList.sort((a, b) => a[0].index - b[0].index);
  for (let i = 0; i < tabList.length; i++) {
    let tab = document.createElement("button");
    tab.id = tabList[i][1];
    tab.classList.add("tab");
    tab.innerText = tabList[i][0].name;
    document
      .getElementById("tabRow")
      .insertBefore(tab, document.getElementById("plusbutton"));
    tab.setAttribute("data-index", tabList[i][0].index);
    let close = document.createElement("button");
    close.classList.add("closebutton", "sv-closer", "ui-icon", "ui-icon-close");//close tab button
    close.addEventListener("click", function (e) {
      e.preventDefault();
      deletePlan(tab.id);
    });
    tab.appendChild(close);
    tab.addEventListener("pointerup", function (e) {
      if(e.target.classList.contains("closebutton"))return;
      if (e.button == 0) {
        if (!tab.hasAttribute("disabled")) {
          selectPlan(tab.id);
        }
      } else if (e.button == 1) {
        e.preventDefault();
        deletePlan(tab.id);
      }
    });
    tab.addEventListener("pointerdown",(e)=>{if(e.target.classList.contains("closebutton"))return;tabPointerDown(e,tab)});

    window.addEventListener("contextmenu", function (e) {
      if (e.target===tab) {
      e.preventDefault();
      showContextMenu(e, tab);
  }
  })
    let delayTillpopup = 500;
    let timer;
    tab.addEventListener("pointerenter", function (e) {//the menu the shows the details of the plan on hover
      timer = setTimeout(function () {
        if (document.querySelectorAll(".tab:hover").length > 0) {
          showDetailsPopup(e, tab);
        }
      }, delayTillpopup);
    });
    tab.addEventListener("pointerout", function () {
      clearTimeout(timer);
    });
  }
  if(tabList.length===0){
    makeNewTab();
  }
  //select the first tab if there no session data
  if (sessionStorage.getItem("selectedPlan") === null) {
    if (tabList.length > 0) {
      selectPlan(tabList[0][1]);
    }
  } else {
    selectPlan(sessionStorage.getItem("selectedPlan"));
  }
}
