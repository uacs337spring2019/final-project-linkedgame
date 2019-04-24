/* Shiyu Cheng (23329948), Jiaxu Kang (23373848)
* This is the final project of CSC 337, SP. 2019
* 04/24/2019
* */

(function(){
	"use strict";
window.onload = function() {
	document.getElementById("login").onclick = log_in;
	document.getElementById("sign_up").onclick = sign_up;
};
function log_in(){
	document.getElementById("confirm").innerHTML = "";
	document.getElementById("wrong").innerHTML = "";
	var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;
	var message = {};
	message["name"] = name;
	message["password"] = password ;
	// send name and password to service.
	var fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(message)
	};	

	var url = "http://localhost:3000?log=no";
	fetch(url,fetchOptions)
		.then(checkStatus)
		.then(function(responseText){
			
      
      	var url = "http://localhost:3000?login=no&name="+name;
        fetch(url)
        .then(checkStatus)
        .then(function(responseText){
          var account = responseText;
          var accounts = account.trim().split("\n");
          console.log(accounts.length);
          var wrong = "False";
          for (var i = 0; i < accounts.length; i++) {
            if (name == accounts[i].split(" ")[0] && password == accounts[i].split(" ")[1]) {
              wrong = "True";
              }
          }
          if (wrong == "False") {

          document.getElementById("wrong").innerHTML= "wrong password";

          }else if (wrong == "True"){
            console.log("jump");
            window.location.href = "play.html";

          }
          
          });
      
    });	
}
function sign_up(){
	document.getElementById("confirm").innerHTML = "";
	document.getElementById("wrong").innerHTML = "";
	var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;
	var message = {};
	message["name"] = name;
	message["password"] = password ;
	// send name and password to service.
	var fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(message)
	};	

	var url = "http://localhost:3000?log=no";
	fetch(url,fetchOptions)
		.then(checkStatus)
		.then(function(responseText){
			document.getElementById("confirm").innerHTML= responseText;
			if (responseText == "account created successfully!"){

			}else{

				document.getElementById("confirm").innerHTML="Account has already existed!";
	}
		});
	}
function checkStatus(response) {  
    if (response.status >= 200 && response.status < 300) {  
        return response.text();
    } else if (response.status == 404) {
    	// sends back a different error when we have a 404 than when we have
    	// a different error
    	return Promise.reject(new Error("Sorry, we couldn't find that page")); 
    } else {  
        return Promise.reject(new Error(response.status+": "+response.statusText));
    } 
}
})();
