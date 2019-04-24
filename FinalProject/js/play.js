/* Shiyu Cheng (23329948), Jiaxu Kang (23373848)
* This is the final project of CSC 337, SP. 2019
* 04/24/2019
* */

"use strict";
(function(){
    window.onload = function () {

        let clickedArray = [];
        let imgArray = imgArrayHandler();
        setGrid(imgArray, clickedArray);

        document.getElementById("tool").onclick = function () {
            console.log("shuffle images");
            shuffleImg();
        };

        let leftTime = 115; //total time
        setInterval(function () {
            timeIntervalHandler(leftTime);
            leftTime --; //time decreasing
            if (leftTime <= 0){ //when time ends, the game over appear up
                clearInterval();
                console.log("game over");
                let lose = document.getElementById("lose");
                let container = document.getElementById("container");
                container.style.display = "none";
                lose.style.display = "block";
            }
        }, 1000);

    };

    let timeIntervalHandler = function(leftTime){
        // decreasing the width of the process bar
        let progress = document.getElementById("process");
        progress.style.width = leftTime +"px";
    };

    let shuffleImg = function(){
        let leftCols = [];
        let leftImgs = [];
        let rows = document.getElementById("container");
        //loop the container
        for(let i = 2; i<rows.childNodes.length-1; i++){
            let cols = rows.childNodes[i];
            for(let j = 1; j< cols.childNodes.length-1; j++){
                let col = cols.childNodes[j];
                if(col.innerHTML !== "" && !col.className.includes("border")){
                    leftCols.push(col);
                    leftImgs.push(col.innerHTML);
                }
            }
        }
        shuffleArray(leftImgs);
        shuffleArray(leftCols);
        for (let col = 0; col<leftCols.length; col++){
            leftCols[col].innerHTML = leftImgs.pop();
        }
    };

    let checkFinish = function(){
        //this function is for checking if all images are linked
      let rows = document.getElementById("container");
        console.log(rows.childNodes);
      for(let i = 2; i<rows.childNodes.length-1; i++){
          console.log(rows.childNodes[i]);
          let cols = rows.childNodes[i];
          for(let j = 1; j< cols.childNodes.length-1; j++){
              let col = cols.childNodes[j];
              if(( col.innerHTML !== "" )&&(!cols.childNodes[j].className.includes("border"))){
                  return false;
              }
          }

        }

      return true;
    };


    let shuffleArray = function(arr){
        let i = arr.length;
        while(i){
            let j = Math.floor(Math.random()* i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
    };

    let imgArrayHandler =function(){
        let totalPairs = 0;
        let imgArray = [];
        while (totalPairs <35){
            let random = Math.floor(Math.random()*32);

            imgArray.push(random);
            imgArray.push(random);
            totalPairs ++;
        }

        console.log(imgArray);
        shuffleArray(imgArray);
        return imgArray;
    };

    let setGrid = function (imgArray, clickedArray) {
        const rows = 7;
        const  cols = 10;
        let container = document.getElementById("container");
        for(let i = 0; i < rows+2; i++){
            let row = document.createElement("div");
            row.className = "row "+i;
            //set border cells
            for(let j = 0; j < cols+2; j++){
                let col = document.createElement("div");
                col.className = "col "+i+"_"+j+" border";
                row.appendChild(col);
            }
            container.appendChild(row);
        }

      for(let i = 1; i < container.childNodes.length-2; i++){
            for(let j = 1; j < cols+1; j++){
                let col = document.getElementsByClassName(i+"_"+j)[0];
                col.className = "col "+i+"_"+j;
               setImage(col, imgArray);
                col.addEventListener("click", function () {
                    clickHandler(col, clickedArray);
                });
            }

        }

    };

    let setImage = function (col, imgArray) {
        let img = document.createElement("img");
        img.src = "images/gifts/"+imgArray.pop()+".png";
        img.style.cursor = "pointer";

        col.appendChild(img);
    };

    let clickHandler = function (col, clickedArray) {
        console.log("click"+col.className);
        if(! clickedArray.includes(col)){
            if(clickedArray.length !== 0){ //array has an element already
                if (clickedArray[0].innerHTML !== col.innerHTML){
                    let className =  clickedArray[0].className.split("clicked");
                    clickedArray[0].className = className.splice(0, className.length-1);
                    clickedArray[0].style.borderColor = "white";
                    clickedArray[0].style.boxShadow = "";
                    clickedArray.pop();
                    console.log("poped");
                    col.className = col.className +" clicked";
                    col.style.borderColor = "pink";
                    col.style.boxShadow = "5px 8px 8px red";
                    clickedArray.push(col);
                }else{
                    //judge cols with the same image!
                    clickedArray = conditions(clickedArray, col);
                }

            }else {
                col.className = col.className +" clicked";
                col.style.borderColor = "pink";
                col.style.boxShadow = "5px 8px 8px red";
                clickedArray.push(col);
            }

        }
        console.log(clickedArray);
    };

    let empty = function(cell){
        cell.innerHTML = "";
        cell.style.visibility = "hidden";
    };

    let conditions = function (array, p2) {
        let p1 = array[0];
        //check none_corner condition
        let checkNoneCorner = noneCorner(p1, p2);
        if (checkNoneCorner === true){
            empty(p1);
            empty(p2);
            array = [];
        }

        //check one_corner condition
        let checkOneCorner = oneCorner(p1, p2);
        if (checkOneCorner === true){
            empty(p1);
            empty(p2);
            array = [];
        }

        //check two_corner if both one_corner and none_corner condition are false
        if ((checkNoneCorner === false) && (checkOneCorner === false)){
            let checkTwoCorner = twoCorner(p1, p2);
            if(checkTwoCorner === true){
                empty(p1);
                empty(p2);
                array = [];
            }
        }

        if(checkFinish() === false){
            console.log("CONTINUE.......");
            return array;
        }else {
            console.log("YOU WIN!");
            let win = document.getElementById("win");
            let container = document.getElementById("container");
            container.style.display = "none";
            win.style.display = "block";
        }
    };

    let twoCorner = function(p1, p2){
        console.log("Processing twoCorner");
        let p1_x = getCoordinate(p1).getX;
        let p1_y = getCoordinate(p1).getY;
        let p2_x = getCoordinate(p2).getX;
        let p2_y = getCoordinate(p2).getY;

        //searching horizontal right direction
        //let p3 = false; // set p3 default
        console.log("searching horizontal right direction....")
        for (let i = p1_y+1; i<=11; i++){
            let row = document.getElementsByClassName("row "+p1_x)[0];
            console.log("horizontal right direction row.childNodes: "+row.childNodes[i].className);
                let p3 = row.childNodes[i];
                if(p3.innerHTML === ""){
                    if (oneCorner(p3, p2) === true){
                        console.log("searching horizontal right direction: true");
                        return true;
                    }
                } else {
                    break;
                }
        }
        console.log("searching horizontal right direction: false");

        // searching horizontal left direction
        console.log("searching horizontal left direction....");
        for(let i = p1_y-1 ; i >= 0; i--){
            let row = document.getElementsByClassName("row "+p1_x)[0];
            let p3 = row.childNodes[i];
            if (p3.innerHTML === ""){
                if (oneCorner(p3, p2) === true){
                    console.log("searching horizontal left direction: true");
                    return true;
                }
            }else {
                console.log("searching horizontal left direction: false");
                break;
            }
        }
        console.log("searching horizontal left direction: false");

        //searching vertical down direction
        console.log("searching vertical down direction....");
        for (let i = p1_x+1; i<9; i++){
            let row = document.getElementsByClassName("row "+(i))[0];
            console.log(row+"............"+" "+(p1_y));
            let p3 = row.childNodes[p1_y];
            if (p3.innerHTML === ""){
                if (oneCorner(p3, p2) === true){
                    console.log("searching vertical down direction: true");
                    return true;
                }

            }else{
                break;
            }
        }
        console.log("searching vertical down direction: false");

        //searching vertical up direction
        console.log("searching vertical up direction....");
        for (let i = p1_x-1; i>=0; i--){
            let row = document.getElementsByClassName("row "+(i))[0];
            let p3 = row.childNodes[p1_y];
            console.log(p3.className);
            if (p3.innerHTML === ""){
                if (oneCorner(p3, p2) === true){
                    console.log("searching vertical up direction: true");
                    return true;
                }
            }else{
                break
            }
        }
        console.log("searching vertical up direction: false");
        console.log("It does not have twoCorner");
        return false;

    };

    let oneCorner = function (p1, p2) {

        console.log("Processing oneCorner");
        let p1_x = getCoordinate(p1).getX;
        let p1_y = getCoordinate(p1).getY;
        let p2_x = getCoordinate(p2).getX;
        let p2_y = getCoordinate(p2).getY;
        // judge if it is oneCorner
        if ((p1_y === p2_y) || (p1_x === p2_x)){
            console.log("oneCorner false");
            return false;
        }

        // test a corner point
        let p3 = searchCornerPoint( p1, p2);
        if ((p3.innerHTML === "") || (p3.className.includes("border"))){
            if (noneCorner(p1, p3) === true && noneCorner(p2, p3) === true){
                console.log("oneCorner true");
                return true;
            }
        }

        // test another corner point
        p3 = searchCornerPoint(p2, p1);
        if ((p3.innerHTML === "") || (p3.className.includes("border"))){
            if (noneCorner(p1, p3) === true && noneCorner(p2, p3) === true){
                console.log("oneCorner true");
                return true;
            }
        }
        console.log("oneCorner false");
        return false;
    };

    let searchCornerPoint = function( p2, p1){
        let p3_y = getCoordinate(p1).getY;
        let p3_x = getCoordinate(p2).getX;

        let p3 = document.getElementsByClassName(p3_x+"_"+p3_y)[0];
        console.log("Searched corner point: "+ p3.className);
        return p3;
    };
    
    let noneCorner = function (p1, p2) {
        console.log("Processing none Corner");
        let max_num;
        let min_num;
        let p1_x = getCoordinate(p1).getX;
        let p1_y = getCoordinate(p1).getY;
        let p2_x = getCoordinate(p2).getX;
        let p2_y = getCoordinate(p2).getY;
        console.log("p1: "+p1_x, p1_y+" p2: "+p2_x,p2_y);

        if ((p1_x !== p2_x) && (p1_y !== p2_y)){
            console.log("noneCorner: false");
            return false;
        }

        //vertical searching
        if (p1_y === p2_y){
            console.log("Processing noneCorner Vertical Search");
            if (p1_x > p2_x){
                max_num = p1_x;
                min_num = p2_x;
            } else{
                max_num = p2_x;
                min_num = p1_x;
            }

            for (let i = (min_num+1); i<max_num; i++){
                let row = document.getElementsByClassName("row "+i)[0];
                if(row.childNodes[p1_y].innerHTML !== ""){
                    console.log("NoneCorner Vertical Search: false");
                    return false;
                }
            }
        }

        //horizontal searching
        if (p1_x === p2_x){
            console.log("Processing NoneCorner Horizontal Search");
            if(p1_y > p2_y){
                max_num = p1_y;
                min_num = p2_y;
            } else{
                max_num = p2_y;
                min_num = p1_y;
            }

            let row = document.getElementsByClassName("row "+p2_x)[0];
            for (let i = (min_num+1); i<max_num; i++){
                if(row.childNodes[i].innerHTML !== ""){
                    console.log("NoneCorner Horizontal Search: false");
                    return false;
                }
            }
        }
        console.log("NoneCorner: true");
        return true;
    };

    let getCoordinate = function(element){
        let elementList = element.className.split(" ");
        let coordinateString = elementList[1].split("_");
        return {
            getX: parseInt(coordinateString[0]),
            getY: parseInt(coordinateString[1])
        }
    }

})();
