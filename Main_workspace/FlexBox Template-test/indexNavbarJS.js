// Getting the dom elements ID for the create project popUp
var domCreateProject = document.getElementById("createProject");
var domCreateProjectPopUp = document.getElementById("createProjectPopUp");
var domCloseCreateProjectPopUp = document.getElementById("closeCreateProjectPopUp");
var domProjectName = document.getElementById("projectName");
var domSetProjectName = document.getElementById("setProjectName");
var domSetProjectNameValue;
var domSetMemberInput = document.getElementById("setMember");
var domSetMemberOutput = document.getElementById("projectMembersContent");
var domAddMemberBtn = document.getElementById("addMemberBtn");
var domBtnAssignMembers = document.getElementById("btnAssignMembers");
var domBox1 = document.getElementById("box");
var domAddMemberNameValue;
var domMemberAddedFeedback = document.getElementById("memberAddedFeedback");

// Adding eventlisteners to the buttons that open and close the "create project" tab, and creating the functions that display the pop up and close it
domCreateProject.addEventListener("click", showCreateProject);
    
function showCreateProject() {
        domCreateProjectPopUp.style.visibility = "visible";
        domCreateProjectPopUp.style.opacity = "1";
        domCreateProjectPopUp.style.top = "150px";
}

domCloseCreateProjectPopUp.addEventListener("click",closeCreateProject);

domSetProjectName.addEventListener("input", function(){
    domSetProjectNameValue = domSetProjectName.value; 
});

function closeCreateProject() {
    // Control structure to check if you are both logged in, and have given your project a name
    if (domLogIn.innerHTML == "Logged in as guest" && domSetProjectNameValue != null) {
    domCreateProjectPopUp.style.visibility = "hidden";
    domCreateProjectPopUp.style.opacity = "0";
    domCreateProjectPopUp.style.top = "800px";
    // Setting the input.value of the input field, as the innerHTML text of the projectName field
    domProjectName.innerHTML = domSetProjectNameValue;
    document.getElementById("foreignContainer").innerHTML = null;
    // Control structure checking what error you have to give the correct error message
    } else if (domLogIn.innerHTML != "Logged in as guest" && domSetProjectNameValue != null) {
        alert("You have to be logged in to create a project");
        domCreateProjectPopUp.style.visibility = "hidden";
        domCreateProjectPopUp.style.opacity = "0";
        domCreateProjectPopUp.style.top = "800px";
    // Control structure checking what error you have to give the correct error message
    } else if (domLogIn.innerHTML == "Logged in as guest" && domSetProjectNameValue == null) {
        alert("You got to give your project a name");
    } else if (domLogIn.innerHTML != "Logged in as guest" && domSetProjectNameValue == null) {
        alert("Either your project does not have a name, or you are not logged in");
        domCreateProjectPopUp.style.visibility = "hidden";
        domCreateProjectPopUp.style.opacity = "0";
        domCreateProjectPopUp.style.top = "800px";
    }
}


// Getting the dom elements ID for the add members pop up
var domAddMembers = document.getElementById("addMembers");
var domAddMembersPopUp = document.getElementById("addMembersPopUp");
var domCloseAddMemberPopUp = document.getElementById("closeAddMemberPopUp");


// Adding eventlisteners to the buttons that open and close the "create project" tab, and creating the functions that display the pop up and close it
domAddMembers.addEventListener("click", showAddMember);

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

// Getting the dom elements ID for the Add Member and the Assign Member input and output fields. 


// Adding a eventlistener to the add member button, and creating a function that adds the member to the projectmembers field
domAddMemberBtn.addEventListener("click", addMember);

function addMember() {
    if(domProjectName.innerHTML != "<strong>New project</strong>" && domSetMemberInput.value != "Add member") {
    var optionField = document.createElement("option");
    var optionFieldAssign = document.createElement("option");
    var optionFieldValue = document.createTextNode(domSetMemberInput.value);
    var optionFieldValueAssign = document.createTextNode(domSetMemberInput.value);
    optionField.appendChild(optionFieldValue);
    optionFieldAssign.appendChild(optionFieldValueAssign);
    domSetMemberOutput.appendChild(optionField);    
    document.getElementById('boxAssignMembersContent21').appendChild(optionFieldAssign);
    document.getElementById('boxAssignMembersContent21').selectedIndex = domSetMemberOutput.selectedIndex;
    domMemberAddedFeedback.style.visibility = "visible";
        
    } else if(domProjectName.innerHTML != "<strong>New project</strong>" && domSetMemberInput.value == "Add member"){
        alert("You can not add a member without a name.");
    } else if(domProjectName.innerHTML == "<strong>New project</strong>" && domSetMemberInput.value != "Add member"){
        alert("You can not add a member to a project that does not exist.");
    } else if(domProjectName.innerHTML == "<strong>New project</strong>" && domSetMemberInput.value == "Add member"){
        alert("You are either trying to add a member to a project that does not exist, or a member without a name");
    }
}
domSetMemberInput.addEventListener("input", function(){
    domMemberAddedFeedback.style.visibility = "hidden";
});

var selectedMemberIndex;
function getMemberIndex(index){
    selectedMemberIndex = index;
}

document.body.addEventListener('click',assignMember)
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
// Getting the dom elements ID for logg inn 
var domLogIn = document.getElementById("logIn");
var domLogInPopUp = document.getElementById("LogInPopUp");
var domLogInAsUser = document.getElementById("logInAsUser");
var domCreateAccount = document.getElementById("createAccount");

// Adding eventlisteners to the buttons that open and close the "log in" tab, and creating the functions that display the pop up and close it
domLogIn.addEventListener("click", showLogInPopUp);

function showLogInPopUp() {
    if(domLogIn.innerHTML != "Logged in as guest"){
    domLogInPopUp.style.visibility = "visible";    
    domLogInPopUp.style.opacity = "1";
    domLogInPopUp.style.top = "150px";
    } else {
        alert("You are already logged in");
    }
}

domLogInAsUser.addEventListener("click", logIn)

function logIn() {
    domLogInPopUp.style.visibility = "hidden";
    domLogIn.innerHTML = "Logged in as guest";
}

domCreateAccount.addEventListener("click", createAccount);

function createAccount() {
    alert("We do not support that feature yet");
}

function removeMemberAddedFeedback(){   
    domMemberAddedFeedback.style.visibility = "hidden";
}








 

