(function(){

    window.onload = function () {

        console.log("hello");
        let clickedArray = [];
        let imgArray = imgArrayHandler();
        setGrid(imgArray, clickedArray);

    };

    let imgArrayHandler =function(){
        let totalPaires = 0;
        let imgArray = [];
        while (totalPaires <35){
            let random = Math.floor(Math.random()*32);

            imgArray.push(random);
            imgArray.push(random);
            totalPaires ++;
        }
        function shuffle(arr) {
            let i = arr.length;
            while(i){
                let j = Math.floor(Math.random()* i--);
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
        }
        console.log(imgArray);
        shuffle(imgArray);
        return imgArray;
    };

    let setGrid = function (imgArray, clickedArray) {
        const rows = 7;
        const  cols = 10;

        let container = document.getElementById("container");
        for(let i = 1; i < rows+1; i++){
            let row = document.createElement("div");
            row.className = "row";

            for(let j = 1; j < cols+1; j++){
                let col = document.createElement("div");
                col.className = "col "+i+"_"+j;
                setImage(col, imgArray);
                row.appendChild(col);
                col.addEventListener("click", function () {
                    clickHandler(col, clickedArray);
                });
            }
            container.appendChild(row);
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
            if(clickedArray.length !== 0){
                if (clickedArray[0].innerHTML !== col.innerHTML){
                    let className =  clickedArray[0].className.split("clicked");
                    clickedArray[0].className = className.splice(0, className.length-1);
                    clickedArray[0].style.borderColor = "white";
                    clickedArray[0].style.boxShadow = "";
                    clickedArray.pop();
                    console.log("poped");
                }else{
                    //judge cols with the same image!


                }

            }
            col.className = col.className +" clicked";
            col.style.borderColor = "pink";
            col.style.boxShadow = "5px 8px 8px red";
            clickedArray.push(col);
        }

        console.log(clickedArray);
    }


})();