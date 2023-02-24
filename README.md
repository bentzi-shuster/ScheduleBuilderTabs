# NJIT Schedule Builder Tabs
## Now your thinking with tabs !

### Table of Contents
- [NJIT Schedule Builder Tabs](#njit-schedule-builder-tabs)
  - [Now your thinking with tabs !](#now-your-thinking-with-tabs-)
    - [Table of Contents](#table-of-contents)
    - [What is this? How do I use it?](#what-is-this-how-do-i-use-it)
    - [Tech Details](#tech-details)
    - [Reporting Issues](#reporting-issues)
    - [Contributing](#contributing)

### <a id="what-is-this"></a>What is this? How do I use it?
This is a chrome extension that adds tabs to the NJIT Schedule Builder. This allows you to work on multiple schedules at once which is useful if you are trying to make back up, or alternate schedules.  

If there is plan you are working on but no tabs are open and you click the new tab button, it will create a new tab for you and save the open plan to that tab. After that, adding a new tab will create a new blank tab and switch to it. Course and section selection changes will be saved to the current tab automatically.

Right clicking on a tab will give you more options. 
- rename - change the name of the tab, after you click rename, you can start typing the new name and then press enter or escape to save. 
- delete -  remove the tab and delete the plan permanently
- duplicate - make a copy of the tab and the plan
- copy - copy the tabs "code" to the clipboard
- paste - paste the "code" copied above from the clipboard into the current tab and overwrite the current plan
- restore - restore the last deleted tab and plan

Tabs can also be removed by clicking the X on the tab or by clicking the mouse scroll wheel button. 

To reorder tabs, click and drag the tab to the desired location in the tab bar.

### <a id="tech-details"></a>Tech Details
**Injecting the code into the page**
While most chrome extensions inject their code into the page by using the content script, this extension takes a different approach. The code is injected into the page by using a a script tag in the page. This is done by the background.js service worker watching for the page to load the slowest part of the page, the datasvc.php file. Once the datasvc.php file is loaded, the background.js service worker sends a message to the content script to append a script tag to the page. The script tag has a src attribute that points to the url of the asset we want to inject (specified in the manifest.json as a web accessible resources so its exposed to the web). The script tag is appended to the page and the injected code is executed. Then the script tag is removed from the page. This is done for all the assets we want to inject.
**The reason that this is required is so the scripts have access to the pages code and can interact with it without the sandbox.**
[stack overflow source](https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-using-a-content-script)

**Auto saving**
The plan is saved to the current tab when the user selects a course or section. This is done by adding a mutation observer and event listeners to the page. The mutation observer watches for changes to the DOM and the event listeners watch for clicks on key elements. When a change is detected, the plan has its data extracted and saved to the current tab in local storage.
**this is in 2 places, all of autoUpdatePlan.js and utilFuncs.js has a savePlan function that is used**

there is also remove.js that is used to add additional event listeners to the page. this is used to remove sections from the schedule when the x is clicked or the remove button is clicked. this is done by adding a event listener to the elements. 


**Adding courses and sections to the schedule**
```javascript
function addCourse(coursecode){
    $('input#search_input')?.autocomplete("search", coursecode);
    setTimeout(() => {
    document.querySelector("ul.ui-autocomplete.ui-menu.ui-widget.ui-widget-content")?.firstChild?.firstChild?.click();
    }, 0);
}
```
This function is used to add a course to the schedule. It uses the jquery autocomplete to search for the course and then clicks the first result. This is done in a setTimeout so that the autocomplete has time to load the results before clicking the first one. This is done for all the courses in the plan. the course code is passed in as a parameter and there is a assumption that the course code is valid and will return a single result.

```javascript
function selectSection(coursecode,sectionnum){
    let section = document.querySelector(`#${coursecode}_${sectionnum}`);
    section?.click();
}
```
This function is used to select a section for a course. It uses the course code and section number to find the section radio element and then clicks it. 


Due to the delays in adding a course, loading a large plan may take a few seconds so there is a 30ms delay between adding each course. This is done by using a setTimeout with a 60ms delay * i (index in a forloop).

**storage**

Plans are stored in local storage. Note that while there is a chrome.storage.local for chrome extentions, that is not in use due to the fact that chrome extention cant communicate with the background.js service worker. therefor the plans are stored in the page local storage. each plan has an asocciated tab id. the tab id is a uuid generated on creation of the tab. the tab id is used to store the plan in local storage and as a genral identifier for the tab.
the tab element has a id attribute that is set to the tab id. 
in the local storage, plan data is stored in the following format
```json
{
    "name":"tab name",
    "index":"0",
    "courses":
        [
            {"coursecode":"CS100","sectionnum":"002"},
            {"coursecode": "MATH111","sectionnum":"012"},
            {"coursecode": "PHYS111","sectionnum":"002"}
        ]
}
```
the tab index starts at 0 and is incremented by 1 for each new tab. this is used to keep the tabs in order. the tab index is used to sort the tabs when they are loaded.

There is also the session storage. this is used to store the current tab id. this is used to keep track of the current tab during the session. this is used to load the correct tab when the page is reloaded.
it is also used to block saving during loading of a plan so that the plan is not overwritten by the auto save and overwritten by the load if canceled by the user.
Session storage also contains the last deleted tabid and its data. this is used to restore the last deleted tab if the user clicks the restore button.

### <a id="reporting-issues"></a>Reporting Issues
If you find any issues, please report them on github.
alternatively, you can email me at <a href="mailto:bzs6@njit.edu">bzs6@njit.edu</a>
please try to include the following information
- browser (and version)
- extension version
- steps to reproduce the issue if possible
- screenshots if possible
- description of the issue

### <a id="contributing"></a>Contributing
If you would like to contribute to this project, please fork the repo and submit a pull request. If you have any questions, please email me at <a href="mailto:bzs6@njit.edu">bzs6@njit.edu</a> and I would be happy to help.


