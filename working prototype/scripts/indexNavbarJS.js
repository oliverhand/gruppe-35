// Fetching the html elements needed for the create project function
var domCreateProject = document.getElementById("createProject");
var domCreateProjectPopUp = document.getElementById("createProjectPopUp");
var domCloseCreateProjectPopUp = document.getElementById("closeCreateProjectPopUp");
var domProjectName = document.getElementById("projectName");
var domSetProjectName = document.getElementById("setProjectName");
var domSetProjectNameValue;

// Adding eventlisteners to the html elements that open and close the create project, also onto the input field that reads the project name 
domCreateProject.addEventListener("click", showCreateProject);
domCloseCreateProjectPopUp.addEventListener("click",closeCreateProject);
domSetProjectName.addEventListener("input", function(){
    domSetProjectNameValue = domSetProjectName.value; 
});

// Displaying the pop up
function showCreateProject() {
        domCreateProjectPopUp.style.visibility = "visible";
        domCreateProjectPopUp.style.opacity = "1";
        domCreateProjectPopUp.style.top = "150px";
}

/* Depending on the result of the control structure, will either let you "create" a project or not. Will give you corresponding error messages depending on which criteria you have not fulfilled */
function closeCreateProject() {
    // Control structure to check if you are both logged in, and have given your project a name
    if (domLogIn.innerHTML == "<strong>Logged in as guest</strong>" && domSetProjectNameValue != null) {
    domCreateProjectPopUp.style.visibility = "hidden";
    domCreateProjectPopUp.style.opacity = "0";
    domCreateProjectPopUp.style.top = "800px";
    // Setting the input.value of the input field, as the innerHTML text of the projectName field
    domProjectName.innerHTML = domSetProjectNameValue;
    document.getElementById("foreignContainer").innerHTML = null;
    } else if (domLogIn.innerHTML != "<strong>Logged in as guest</strong>" && domSetProjectNameValue != null) {
        alert("You have to be logged in to create a project");
        domCreateProjectPopUp.style.visibility = "hidden";
        domCreateProjectPopUp.style.opacity = "0";
        domCreateProjectPopUp.style.top = "800px";
    } else if (domLogIn.innerHTML == "<strong>Logged in as guest</strong>" && domSetProjectNameValue == null) {
        alert("You got to give your project a name");
    } else if (domLogIn.innerHTML != "<strong>Logged in as guest</strong>" && domSetProjectNameValue == null) {
        alert("Either your project does not have a name, or you are not logged in");
        domCreateProjectPopUp.style.visibility = "hidden";
        domCreateProjectPopUp.style.opacity = "0";
        domCreateProjectPopUp.style.top = "800px";
    }
}

// Fetching the html elements needed for the add member function
var domSetMemberInput = document.getElementById("setMember");
var domSetMemberOutput = document.getElementById("projectMembersContent");
var domAddMemberBtn = document.getElementById("addMemberBtn");
var domBtnAssignMembers = document.getElementById("btnAssignMembers");
var domMemberAddedFeedback = document.getElementById("memberAddedFeedback");
var domAddMembers = document.getElementById("addMembers");
var domAddMembersPopUp = document.getElementById("addMembersPopUp");
var domCloseAddMemberPopUp = document.getElementById("closeAddMemberPopUp");

domAddMembers.addEventListener("click", showAddMember);

// Simple functions to add and display the pop up
function showAddMember() {
    domAddMembersPopUp.style.visibility = "visible";
    domAddMembersPopUp.style.opacity = "1"; 
    domAddMembersPopUp.style.top = "150px";
}

domCloseAddMemberPopUp.addEventListener("click", closeAddMember);

function closeAddMember() {
    domAddMembersPopUp.style.visibility = "hidden";
    domAddMembersPopUp.style.opacity = "0"; 
    domAddMembersPopUp.style.top = "800px";
    domMemberAddedFeedback.style.visibility = "hidden";
}

domAddMemberBtn.addEventListener("click", addMember);

// Depending on if you are logged in, and if the member you are trying to add has a name, adds a member to the project
// Appends the textnode both to the dropdown menu in navigation bar, and onto the boxes we create themselves
function addMember() {
    if(domProjectName.innerHTML != "<strong>New project</strong>" && domSetMemberInput.value != "Add member") {
        
    var optionField = document.createElement("option");
    var optionFieldAssign = document.createElement("option");
    var optionFieldValue = document.createTextNode(domSetMemberInput.value);
    var optionFieldValueAssign = document.createTextNode(domSetMemberInput.value);
    optionField.appendChild(optionFieldValue);
    optionFieldAssign.appendChild(optionFieldValueAssign);
    domSetMemberOutput.appendChild(optionField);    
    document.getElementById("boxAssignMembersContent21").appendChild(optionFieldAssign);    
    domMemberAddedFeedback.style.visibility = "visible";
           
    } else if(domProjectName.innerHTML != "<strong>New project</strong>" && domSetMemberInput.value == "Add member"){
        alert("You can not add a member without a name.");
    } else if(domProjectName.innerHTML == "<strong>New project</strong>" && domSetMemberInput.value != "Add member"){
        alert("You can not add a member to a project that does not exist.");
    } else if(domProjectName.innerHTML == "<strong>New project</strong>" && domSetMemberInput.value == "Add member"){
        alert("You are either trying to add a member to a project that does not exist, or a member without a name");
    }
}

// A function to hide the feedback message when you add a member successfully
domSetMemberInput.addEventListener("input", function(){
    domMemberAddedFeedback.style.visibility = "hidden";
});

var selectedMemberIndex;
// Because this.selectedIndex was different depending on if you tested in the html or javascript, this function is called 'onchange' in the html element
function getMemberIndex(index){
    selectedMemberIndex = index;

}

document.body.addEventListener('click',assignMember)
// The button would not register a press, so a workaround was to have an eventlistener on the whole body, but only run the function if the target's classname was the classname // of the button. 
// Adds the selected member to the cloned copy of the box so it live updates, instead of appending it to the parent box which wont update until you create another box 
function assignMember(e){
        if(e.target.className=="AssignMembers"){
        
        var newMember= document.createElement('div');
        
        var selectedOptionIndexValue = document.getElementById("boxAssignMembersContent21")[selectedMemberIndex].value;
        var textNode= document.createTextNode(selectedOptionIndexValue);
        newMember.appendChild(textNode);
        newMember.className="newMember";
        
        e.target.parentElement.appendChild(newMember);          
    }       
}


// Fetching the html elements for the log in function
var domLogIn = document.getElementById("logIn");
var domLogInPopUp = document.getElementById("LogInPopUp");
var domLogInAsUser = document.getElementById("logInAsUser");
var domCreateAccount = document.getElementById("createAccount");


domLogIn.addEventListener("click", showLogInPopUp);

// Checks if the user is logged in allready or not
function showLogInPopUp() {
    if(domLogIn.innerHTML != "<strong>Logged in as guest</strong>"){
    domLogInPopUp.style.visibility = "visible";    
    domLogInPopUp.style.opacity = "1";
    domLogInPopUp.style.top = "150px";
    } else {
        alert("You are already logged in");
    }
}

domLogInAsUser.addEventListener("click", logIn)

// Changes the innerHTML text to give the illusion of being logged inn
function logIn() {
    domLogInPopUp.style.visibility = "hidden";
    domLogIn.innerHTML = "<strong>Logged in as guest</strong>";
}

domCreateAccount.addEventListener("click", createAccount);

function createAccount() {
    alert("We do not support that feature yet");
}


var domDarkLightMode = document.getElementById("darkLightMode");
var domIndexCSS = document.getElementById("indexCSS");
var toggleThemeDarkLight = false;

domDarkLightMode.addEventListener("click", changeTheme);

// Changes the stylesheet that we link to in html to give either dark mode or light mode, depending on which one you were in when pressing the button
function changeTheme() {
    var domSvg = document.getElementById("svg");
    var className= document.getElementsByClassName("newDivHeader");
    if(toggleThemeDarkLight == false){
        toggleThemeDarkLight = !toggleThemeDarkLight;
        domIndexCSS.setAttribute("href", "stylesheets/lightModeCSS.css")
        for (var i = 0; i < className.length; i++){
            className[i].style.backgroundColor = "rgb(220, 220, 220)";
        }
    } else if(toggleThemeDarkLight) {
        toggleThemeDarkLight = !toggleThemeDarkLight;
        domIndexCSS.setAttribute("href", "stylesheets/index.css")
        for (var i = 0; i < className.length; i++){
            className[i].style.backgroundColor = "grey";
        }
    }
}

var domKanBanbBackground = document.getElementById("kanBanBackground");
var domMainContainer = document.getElementsByClassName("mainContainer");
var toggleThemeKanBan = false;
domKanBanbBackground.addEventListener("click", changeToKanBan);

function changeToKanBan() {
    if(toggleThemeKanBan == false){
        toggleThemeKanBan = !toggleThemeKanBan;
        domIndexCSS.setAttribute("href", "stylesheets/lightModeCSSKanBan.css")
    } else if(toggleThemeKanBan){
        toggleThemeKanBan = !toggleThemeKanBan;
        domIndexCSS.setAttribute("href", "stylesheets/indexKanBan.css")   
    }
}
    



 

