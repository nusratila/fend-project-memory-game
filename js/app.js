/*
 * Create a list that holds all of your cards
 */
let allCards = ["fa-diamond", "fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb","fa-diamond", "fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
let clickCount = 0;
let previousId = -1;
let previousIcon ="none";
let currentId = -1;
let currentIcon ="none";
let matchCount = 0;
let totalSeconds = 0;
let setInId =  -1;
let finishTime = "none";
let starCount = -1;

// Shuffle function from http://stackoverflow.com/a/2450976
function initialize(){
    console.log("initialize");
    clickCount = 0;
    previousId = -1;
    previousIcon ="none";
    currentId = -1;
    currentIcon ="none";
    matchCount = 0;
    shuffle(allCards);
   let deck = document.querySelector("ul.deck");
    let cards = deck.querySelectorAll(".card");

   for (let i =0; i<16; i=i+1){
    let card = cards[i].querySelector("I");
    card.className= "fa " + allCards[i];
    cards[i].id= "card-li-"+i;
    cards[i].className="card";
    
    };

    secondsLabel.innerHTML = "Time:00:00:00" ;

   clearInterval(setInId);
   assignStar();
   document.querySelector(".moves").innerHTML = '0';
   document.getElementById("overlay").style.display = "none";
};
function doNothing(){
    document.getElementById("overlay").style.display = "none";
}
let secondsLabel = document.querySelector(".timer");
function setTime() {
    ++totalSeconds;
    let second = totalSeconds % 60;
    let minute = parseInt(totalSeconds/60); // it can go above 60
    let minutepart = minute % 60; //it will be less than 60 always
    let hour = parseInt(minute/60); 
    finishTime = hour.toString().padStart(2, '0') + ":" + minutepart.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0');

    secondsLabel.innerHTML = "Time: " +  finishTime ;

}


initialize();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

function showCard(ele){
    previousId =currentId;
    previousIcon = currentIcon; 
    currentId = ele.id;
    currentIcon = ele.firstElementChild.classList[1];
    ele.className = "card open show";
    //console.log(ele.firstElementChild.classList);
    clickCount++;
    if (clickCount==1){
       
        totalSeconds = 0;
        setInId= setInterval(setTime, 1000);
    }
    assignStar();

    let moves = document.querySelector(".moves");
    moves.innerHTML=clickCount;
    console.log(clickCount);

};

function changeStar(n){
    
    const ulStars = document.querySelector("ul.stars");
    let stars = ulStars.querySelectorAll("LI");

    for (let i =0; i<5; i=i+1){
        let star = stars[i].querySelector("I");
       
        if (i<n) {
            star.className= "fa fa-2x fa-star-o" ;
        }

      else{
        star.className = "fa fa-2x fa-spin fa-star";
      }
        
        
        };
    
}

function assignStar(){
    if(clickCount > 50){
        changeStar(4);
        starCount=4;
    }

    else if(clickCount > 40){
        changeStar(3);
        starCount=3;
    }

    else if(clickCount > 30){
        changeStar(2);
        starCount=2;
    }

    else if(clickCount > 20){
        changeStar(1);
        starCount=1;
    }

    else{
        changeStar(0);
        starCount=0;
    }

}


function matchCard(liid){
    let ele = document.querySelector("#"+liid);
    ele.className = "card match";
    
};

function hideCard(liid){
    setTimeout(function(){ 
        let ele = document.querySelector("#"+liid);
        ele.className = "card";
    },400);

};

function checkGameOver(){
    if (matchCount == 8){
        //alert("congratulations, total star : " + (5-starCount) + " time: " + finishTime );
        let starstr ="";
        for(let i=0; i<5-starCount;i++){
            starstr+='<i class="fa fa-spin fa-star"></i> ';
        }
        document.querySelector(".congtext").innerHTML = ("<h1>congratulations!!!</h1><br> You have earned " + starstr +'  <br> It took ' + finishTime );
        document.getElementById("overlay").style.display = "block";
        clearInterval(setInId);
    }

};



// function  showCard will accept li node

// Get the element, add a click listener...
document.querySelector(".deck").addEventListener("click", function(e) {
	// e.target is the clicked element!
    // If it was a list item
   

	if(e.target && e.target.nodeName == "LI") {
        //let currentId = e.target.id;
        //let currentIcon = e.target.firstElementChild.classList[1];

        let liClass = (e.target.className);
        //let liClass = Array(document.querySelector("#"+currentId).classList);
        //console.log("id "+currentId);
        //console.log(liClass);
        //console.log(liClass.includes("show"));
        if (!liClass.includes("match")){
            if (!liClass.includes("show")){
                showCard(e.target);
            };
    
            if (clickCount%2==0){
                
                if(previousIcon==currentIcon){
                    matchCard(previousId);
                    matchCard(currentId);
                    matchCount++;
    
                }
                else{
                    hideCard(previousId);
                    hideCard(currentId);
                }
                //check game over : 
                checkGameOver();
            }

        }
    };
});

const restart = document.querySelector(".restart");

restart.addEventListener("click",function(){
    initialize();
}
);



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



