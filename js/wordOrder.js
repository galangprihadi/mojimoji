
// Character map using two dimensional array
let charMap = [[
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を", "ん"
], [
    "a", "i", "u", "e", "o",
    "ka", "ki", "ku", "ke", "ko",
    "sa", "shi", "su", "se", "so",
    "ta", "chi", "tsu", "te", "to",
    "na", "ni", "nu", "ne", "no",
    "ha", "hi", "fu", "he", "ho",
    "ma", "mi", "mu", "me", "mo",
    "ya", "yu", "yo",
    "ra", "ri", "ru", "re", "ro",
    "wa", "wo", "n"
]];

let quesPanel = document.getElementById("quesPanel");
let ansPanel = document.getElementById("ansPanel");
let missText = document.getElementById("miss");

missText.remove();      // Block this command to show "Miss Value"

let questions = []
let currentQuest = 0
let miss = 0;
let isHiraGame = true;

let lastStart, lastEnd, lastN;

function checkDevice(){
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isMobile) {
        document.getElementById('desktopApp').style.display = 'block';
        document.getElementById('mobileApp').style.display = 'none';
    }
    else {
        document.getElementById('desktopApp').style.display = 'none';
    }
}

function switchGameplay(){
    if (lastStart != null){
        isHiraGame = !isHiraGame;
        startGame(lastStart, lastEnd, lastN);
    }
}

function startGame(startIndex, endIndex, nChar){
    
    navigator.vibrate(30);
    
    questions = [];
    currentQuest = 0;
    miss = 0;

    lastStart = startIndex;
    lastEnd = endIndex;
    lastN = nChar;
    
    missText.innerHTML = "Miss : " + miss;
    quesPanel.innerHTML = `<div class='title'>Guess the letters ${startIndex + 1} to ${endIndex + 1} one by one!</div>`;
    ansPanel.innerHTML = "<div class='title'>Select your guess from the options below!</div>";

    // Fill the questions array with pairs of Hiragana and Romaji
    for (let i=startIndex; i <= endIndex; i++){
        questions.push([charMap[0][i], charMap[1][i]]);
    }

    // Shuffle the questions array
    questions = questions.sort(() => Math.random() - 0.5);
    
    for (let i=0; i < nChar; i++){

        // Create the Question panel
        let quesChar = document.createElement("div");
        quesChar.className = "question";
        quesChar.id = "hira" + i;
        //quesChar.innerHTML = questions[i][0];
        quesChar.innerHTML = isHiraGame ? questions[i][0] : questions[i][1];
        quesPanel.appendChild(quesChar);

        // Create the Answer panel
        let ansChar = document.createElement("button");
        //ansChar.innerHTML = questions[i][1];
        ansChar.innerHTML = isHiraGame ? questions[i][1] : questions[i][0];
        ansPanel.appendChild(ansChar);

        ansChar.addEventListener("click", function() {
            selectChar(quesChar, questions[i][1]);
        });

    }

    // Shuffle Romaji positions
    let romaElements = Array.from(ansPanel.getElementsByTagName('button'));
    romaElements = romaElements.sort(() => Math.random() - 0.5);
    ansPanel.innerHTML = "<div class='title'>Select your guess from the options below!</div>";
    romaElements.forEach(element => ansPanel.appendChild(element));

    let hintButton = document.createElement("button");
    hintButton.innerHTML = "<i class='fa-solid fa-eye'></i>";
    ansPanel.appendChild(hintButton);

    hintButton.addEventListener("click", function() {
        showHint();
    });
}

function selectChar(hiraChar, keyAnswer) {

    navigator.vibrate(25);

    if (questions[currentQuest][1] == keyAnswer){
        hiraChar.style.opacity = "0.3";
        currentQuest += 1;
    }
    else {
        miss += 1;
        missText.innerHTML = "Miss : " + miss;
    }

    if (currentQuest == lastN){
        setTimeout(function() {
            startGame(lastStart, lastEnd, lastN);
        }, 1000);
    }
}

function showHint() {
    let hiraChar = document.getElementsByClassName("question");
    //hiraChar[currentQuest].innerHTML = questions[currentQuest][1];
    hiraChar[currentQuest].innerHTML = isHiraGame ? questions[currentQuest][1] : questions[currentQuest][0];

    setTimeout(function() {
        //hiraChar[currentQuest].innerHTML = questions[currentQuest][0];
        hiraChar[currentQuest].innerHTML = isHiraGame ? questions[currentQuest][0] : questions[currentQuest][1];
    }, 500);
}
        