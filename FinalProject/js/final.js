/* Shiyu Cheng (23329948), Jiaxu Kang (23373848)
* This is the final project of CSC 337, SP. 2019
* 
* Purpose: login system.
* user input username and password to sign up account by sign up button.
* If account already existed do that. Another is check account and password correct.
* If correct, go to play game.

* Tips: please use comment "npm install client-sessions" before read service.

* 04/24/2019
* */

(function(){
	"use strict";
window.onload = function() {
	document.getElementById("login").onclick = log_in;
	document.getElementById("sign_up").onclick = sign_up;
};
//check account.txt. If account correct, go to game.
//If account does not exist, create one.
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
			document.getElementById("confirm").innerHTML= responseText;
			//if created one account, do nothing, else create one or check account correct.
			if (responseText == "account created successfully!"){

			}else{
      
		      	var url = "http://localhost:3000?login=no&name="+name;
		        fetch(url)
		        .then(checkStatus)
		        .then(function(responseText){
		          var account = responseText;
		          var accounts = account.trim().split("\n");
		      
		          var wrong = "False";
		          for (var i = 0; i < accounts.length; i++) {
		            if (name == accounts[i].split(" ")[0] && password == accounts[i].split(" ")[1]) {
		              wrong = "True";
		              }
		          }
		          if (wrong == "False") {

		          document.getElementById("wrong").innerHTML= "wrong password";

		          }else if (wrong == "True"){ //if account correct, jump to game.
		            console.log("jump");
		            window.location.href = "play.html";
		          }		          
		          });
		    }
      
    });	
}
//sign up account, if account does not have, create one,
//if have one, show account existed.
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
