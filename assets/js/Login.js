// ? HTML ELEMENTS
// ^ Login Varibles
var loginEmailInput = document.querySelector("#loginEmail");
var loginPassInput = document.querySelector("#loginPass");
var loginBtn = document.querySelector(" form button");
var alertLoginEl= document.querySelector("#alert");
// ^ SignUp Varibles
var signNameInput =document.querySelector("#signName");
var signEmailInput=document.querySelector("#signEmail");
var signPassInput=document.querySelector("#signPass");
var signBtn=document.querySelector("form button");
var alertSignUpEl =document.querySelector("#alert");
// ^ LOGOUT Varibles
var homecontentEl= document.querySelector(".homecontent p")
var logoutBtn= document.querySelector("#logout");
// console.log(homecontentEl);
// ? App Varibles
var allUsers=[];
if(JSON.parse(localStorage.getItem("allUsers")) !=null){
    allUsers = JSON.parse(localStorage.getItem("allUsers"));
}
//* ============= For SignUp ================
// ? fUNCTIONS
function checkEmail(){
    for(var i=0;i<allUsers.length; i++){
        if(allUsers[i].signEmailInputValue.toLowerCase() == signEmailInput.value.toLowerCase()){
            return false;
        }

    }
}
function signUp(){
if(isEmpty()==true){
    alertSignUpEl.innerHTML=`<i class="icon-exclamation-triangle text-danger alert"> All Inputs Requierd</i>`;
    return false;
}
var person={
            signNameInputValue:signNameInput.value,
            signEmailInputValue:signEmailInput.value,
            signPassInputValue:signPassInput.value
} 
if(allUsers.length==0) {
    allUsers.push(person) 
    localStorage.setItem("allUsers",JSON.stringify(allUsers));
    clearInput()
    alertSignUpEl.innerHTML=`<i class="icon-exclamation-triangle text-success alert"> Success SignUp</i>`;
    return true;
}
if( checkEmail()==false){
    alertSignUpEl.innerHTML= '<i class="icon-exclamation-triangle text-dark alert"> Email Already Exists</i>'

}else{
        allUsers.push(person) 
        localStorage.setItem("allUsers",JSON.stringify(allUsers));
        clearInput()
        alertSignUpEl.innerHTML=`<i class="icon-exclamation-triangle text-success alert"> Success SignUp</i>`;
    }
} 
//* ============= General Functions  ================
// ! Make sure that all the entries are there
function isEmpty() {
    if (signNameInput.value == "" || signEmailInput.value == "" || signPassInput.value == "") {
        return true;
    } else {
        return false;
    }
}
// ! Clear the fields
function clearInput(){
signNameInput.value=""
signEmailInput.value=""
signPassInput.value=""
alertSignUpEl.innerHTML=""
}
function isLoginEmpty() {

    if (loginPassInput.value == "" || loginEmailInput.value == "") {
        // console.log("true");
        return true;
    } else {
        return false;
    }
}

//* ============= For Login ================
// ? fUNCTIONS
function login(){
    if( isLoginEmpty()==true){
    //    console.log("true"); 
        alertLoginEl.innerHTML= `<i class="icon-exclamation-triangle text-danger alert"> All Inputs Requierd</i>`;
    }
    else{
    var loginEmailInputValue = loginEmailInput.value;
    var loginPassInputValue = loginPassInput.value;
    for(var i=0;i<allUsers.length;i++){
        if(allUsers[i].signEmailInputValue.toLowerCase() == loginEmailInputValue.toLowerCase()
        && allUsers[i].signPassInputValue.toLowerCase() == loginPassInputValue.toLowerCase()){
            localStorage.setItem('activeUser', allUsers[i].signNameInputValue)
            window.location.replace("./welcome.html");
            return;
        }
        else{
        alertLoginEl.innerHTML='<i class="icon-exclamation-triangle text-danger alert"> Incoreect Password OR Email  </i>'
        }
    }
        }

}
function welcome() {
    var userName= localStorage.getItem('activeUser');
    homecontentEl.innerHTML= ` Welcome To Our WebSite  ${userName}`

}

function logout() {
    localStorage.removeItem('activeUser')
    window.location.replace("./index.html");

}
// ? EVENTS 
signBtn.addEventListener("click",signUp)
loginBtn.addEventListener("click",login)
logoutBtn.addEventListener("click",logout)
window.onload = function() {
    welcome();
};

