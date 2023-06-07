(function createTabHTML(){
    let appendElm = document.getElementById('page');
    let tabRow = document.createElement('div');
    tabRow.id = 'tabRow';
    appendElm.insertBefore(tabRow, appendElm.firstChild);
    let wrapper = document.createElement("div")
    wrapper.id = "tabs"
    let ul = document.createElement("ul")
    ul.id="sortable"
    for(let i = 0; i < 3; i++){
        let li = document.createElement("li")
        li.classList.add("ui-state-default")
        li.innerText = "tab " + i   
        ul.appendChild(li)
    }
    wrapper.appendChild(ul)
    tabRow.appendChild(wrapper)
})()



$( function() {
    $( "#sortable" ).sortable({
        axis: "x"
    })

    $( "#sortable" ).on( "click", function( event, ui ) {
        console.log("click")
    } );
    $( "#sortable" ).on( "sort", function( event, ui ) {
        console.log(ui.item[0].innerText)
    } );
  } );
