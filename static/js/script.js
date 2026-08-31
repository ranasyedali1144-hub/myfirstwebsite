function openLogin(){

    document.getElementById("loginModal").style.display="flex";

}



function closeLogin(){

    document.getElementById("loginModal").style.display="none";

}




function openSignup(){

    document.getElementById("signupModal").style.display="flex";

}



function closeSignup(){

    document.getElementById("signupModal").style.display="none";

}




window.onclick=function(event){


    let login =
    document.getElementById("loginModal");


    let signup =
    document.getElementById("signupModal");



    if(event.target == login){

        login.style.display="none";

    }



    if(event.target == signup){

        signup.style.display="none";

    }


}