var domCreateProject = document.getElementById("createProject");
var domCreateProjectPopUp = document.getElementById("createProjectPopUp");
var domCloseCreateProjectPopUp = document.getElementById("closeCreateProjectPopUp");

domCreateProject.addEventListener("click",showCreateProject);
    
function showCreateProject() {
    domCreateProjectPopUp.style.display = "block";
}

domCloseCreateProjectPopUp.addEventListener("click",closeCreateProject);

function closeCreateProject() {
    domCreateProjectPopUp.style.display = "none";
    domProjectName.innerHTML = domProjectName.innerHTML.replace("New project", domSetProjectName.value );
}

var domProjectName = document.getElementById("projectName");
var domSetProjectName = document.getElementById("setProjectName");

var domAddMembers = document.getElementById("addMembers");
var domAddMembersPopUp = document.getElementById("addMembersPopUp");
var domcloseAddMemberPopUp = document.getElementById("closeAddMemberPopUp");

domAddMembers.addEventListener("click", showAddMember);

function showAddMember() {
    domAddMembersPopUp.style.display = "block";
}

domcloseAddMemberPopUp.addEventListener("click", closeAddMember);

function closeAddMember() {
    domAddMembersPopUp.style.display = "none";
}

var domSetMemberInput = document.getElementById("setMember");
var domSetMemberOutput = document.getElementById("projectMembersDropDown");
var domAddMemberBtn = document.getElementById("addMemberBtn");

domAddMemberBtn.addEventListener("click", addMember);

function addMember() {
    var outputField = document.createElement('a');
    var outputFieldValue = document.createTextNode(domSetMemberInput.value);
    outputField.appendChild(outputFieldValue);
    domSetMemberOutput.appendChild(outputField);
}