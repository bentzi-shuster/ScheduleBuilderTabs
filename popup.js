


//https://stackoverflow.com/questions/45267928/open-chrome-extension-link-within-popup
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByName("newtab");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});