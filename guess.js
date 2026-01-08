let gameName ="Guess Game";
document.title= gameName;
document.querySelector('h1').innerHTML=gameName;
document.querySelector('footer').innerHTML=`${gameName} Game Created by Hazem Wageh in ${new Date().getFullYear()}`;
let numberOfTries=7;
let numberOfLetters=7;
let curretTry=1;
let numberOfHints=2;
let wordToGuess="";
const words=["Create","Update", "Delete","Master","Branch","Mainly","School"];
wordToGuess=words[Math.floor(Math.random() * words.length)].toLowerCase();
// console.log(wordToGuess);
let messageArea=document.querySelector(".message");
document.querySelector(".hint span").innerHTML=numberOfHints;
let getHintButton=document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput(){
    const inputContainers=document.querySelector(".inputs");
    for (let i = 1; i < numberOfTries; i++) {
        const tryDiv=document.createElement("div");
        tryDiv.classList.add(`try-${i}`)
        tryDiv.innerHTML=`<span>Try ${i} </span>`;
        if(i!==1) tryDiv.classList.add(`disabled-inputs`)
        for (let j = 1; j < numberOfLetters; j++) {
            const input=document.createElement("input");
            input.type="text"
            input.id=`guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1")
            tryDiv.appendChild(input);
        }
        inputContainers.appendChild(tryDiv);
    }
    inputContainers.children[0].children[1].focus();

    const inputsInDesableDiv=document.querySelectorAll(".disabled-inputs input");
    inputsInDesableDiv.forEach(input =>input.disabled=true);

    const inputs=document.querySelectorAll("input");
    inputs.forEach((input,index)=>{
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            const nextInput=inputs[index + 1]
            // console.log(nextInput);
            // console.log(index);
            if(nextInput) nextInput.focus()
            
        })
        input.addEventListener("keydown",function(event){

            // console.log(event);
            const currentIndex=Array.from(inputs).indexOf(event.target)
            if(event.key==="ArrowRight"){

                const nextInput=currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(event.key==="ArrowLeft"){

                const prevInput=currentIndex - 1;
                if(prevInput >= 0) inputs[prevInput].focus();
            }


        })
    })
    
    
}

const guessButton=document.querySelector(".check");
guessButton.addEventListener("click",handelGuesses);
console.log(wordToGuess);
function handelGuesses() {
    let successGuess=true;
    for (let i = 1; i < numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${curretTry}-letter-${i}`);
        const letter=inputField.value.toLowerCase();
        // console.log(letter)
        let actaulLetter=wordToGuess[i - 1]
        // console.log(actaulLetter);
        
        if (letter===actaulLetter) {
            inputField.classList.add("yes-in-place");
        }else if(wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add("not-in-place")
            successGuess=false;
        }else{
            inputField.classList.add("no")
            successGuess=false;
        }

    }
    if (successGuess) {
        // console.log("good");
        messageArea.innerHTML=`You Win The Word Is <span> ${wordToGuess} </span>`;
        if(numberOfHints === 2){
            messageArea.innerHTML=`<p>Congrat you Didn't Use Hints</p>`;
        }

        
        let allTries=document.querySelectorAll(".inputs > div");
        // console.log(allTries);
        allTries.forEach((tryDiv)=>tryDiv.classList.add("disabled-inputs"));
        guessButton.disabled=true;
        getHintButton.disabled=true;
    }else{
        document.querySelector(`.try-${curretTry}`).classList.add("disabled-inputs");
        const curretTryInputs= document.querySelectorAll(`.try-${curretTry} input`);
        curretTryInputs.forEach((input)=>input.disabled=true);
        curretTry++
        
        const nextTryInputs= document.querySelectorAll(`.try-${curretTry} input`);
        nextTryInputs.forEach((input)=>input.disabled=false);
        let el =document.querySelector(`.try-${curretTry}`);
        // console.log(el)
        if(el){
            document.querySelector(`.try-${curretTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
            // console.log(el.children[1])
        }else{
            messageArea.innerHTML=`You lose The Word Is <span> ${wordToGuess} </span>`;
            guessButton.disabled=true;
            getHintButton.disabled=true;
        }
    }
}
function getHint() {
    if(numberOfHints > 0){
        numberOfHints--;
        document.querySelector(".hint span").innerHTML=numberOfHints;
    }
    if(numberOfHints === 0){
        getHintButton.disabled="ture";
    }
    const enableInputs=document.querySelectorAll("input:not([disabled])");
    const emtyEnableInputs=Array.from(enableInputs).filter((input)=> input.value==="");
    // console.log(emtyEnableInputs);
    if(emtyEnableInputs.length > 0){
        const randomIndex= Math.floor(Math.random() * emtyEnableInputs.length);
        const randomInput=emtyEnableInputs[randomIndex];
        const indexToFill=Array.from(enableInputs).indexOf(randomInput);
        // console.log(randomIndex);
        // console.log(randomInput);
        // console.log(indexToFill);
        if(indexToFill !== -1){
            randomInput.value=wordToGuess[indexToFill].toUpperCase()
        }
    }
}

function handelBackspace(event){
    if(event.key === "Backspace"){
        const inputs=document.querySelectorAll("input:not([disabled])");
        const currentIndex=Array.from(inputs).indexOf(document.activeElement);
        // console.log(currentIndex);
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
    
}
document.addEventListener("keydown",handelBackspace)
window.onload=function(){
    generateInput()
}





















