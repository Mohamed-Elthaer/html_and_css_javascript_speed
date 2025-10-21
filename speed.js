// Typing Speed Test Game

/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function 
  ---- [08] Start The Time And Count Score 
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/
// Array Of Words

const words = [

   { text: "Hello", level: "Easy" },
  { text: "Code", level: "Easy" },
  { text: "Town", level: "Easy" },
  { text: "Funny", level: "Easy" },
  { text: "Test", level: "Easy" },

  { text: "Programming", level: "Normal" },
  { text: "Javascript", level: "Normal" },
  { text: "Country", level: "Normal" },
  { text: "Youtube", level: "Normal" },
  { text: "Github", level: "Normal" },

  { text: "Destructuring", level: "Hard" },
  { text: "Paradigm", level: "Hard" },
  { text: "Dependencies", level: "Hard" },
  { text: "Documentation", level: "Hard" },
  { text: "Cascade", level: "Hard" },

];

let levelchoose = document.querySelectorAll(".levelchoos button");

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

//default level
const defaultlevelname = "Easy";
let defaultlevelscondes = lvls[defaultlevelname];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let data = document.querySelector(".date");
let result = document.querySelector(".result");

lvlNameSpan.innerHTML = defaultlevelname;
secondsSpan.innerHTML = defaultlevelscondes;
timeLeftSpan.innerHTML = defaultlevelscondes;

levelchoose.forEach(
  (btn) =>
    (btn.onclick = function () {
      levelchoose.forEach((b) => {
        b.classList.remove("active")})
        this.classList.add("active");
      // });
      const defaultlevelname = this.textContent.trim();

      let levelwords=words.filter((w)=>w.level===defaultlevelname)
      .map((w)=>w.text)

      let defaultlevelscondes = lvls[defaultlevelname];
      lvlNameSpan.innerHTML = defaultlevelname;
      secondsSpan.innerHTML = defaultlevelscondes;
      timeLeftSpan.innerHTML = defaultlevelscondes;
scoreGot.innerHTML=0;
 scoreTotal.innerHTML=levelwords.length;
      //disable paste
      input.onpaste = function () {
        return false;
      };

      //start game
      startButton.onclick = function () {
        this.remove();
        input.focus();
        // generate the words
        genWords();
      };

      function genWords() {
        // get word rondom of array words
        let random = levelwords[Math.floor(Math.random() * levelwords.length)];
        // get index word
        let indexword = levelwords.indexOf(random);
        // delete word of array
        levelwords.splice(indexword, 1);
        //words in place the words
        theWord.innerHTML = random;
        // empty upcoming
        upcomingWords.innerHTML = "";

        // add words in upcoming words
        for (let i = 0; i < levelwords.length; i++) {
          let div = document.createElement("div");
          let text = document.createTextNode(levelwords[i]);
          div.appendChild(text);
          upcomingWords.appendChild(div);
        }
        // call start play funtion
        startPlay();
      }

      function dataandlocal() {
        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();

        data.innerHTML = `🗓️ ${day}/${month}/${year} `;
        result.innerHTML = `Your Score: ${scoreGot.innerHTML}/${scoreTotal.innerHTML}`;

        let newResult = `🗓️ ${day}/${month}/${year} - Your Score: ${scoreGot.innerHTML}/${scoreTotal.innerHTML}`;

      //   // // استرجاع النتائج القديمة لو موجودة
        let history = JSON.parse(localStorage.getItem("history")) || [];

      //   // // إضافة النتيجة الجديدة للمصفوفة
        history.push(newResult);

      //   // // تخزين المصفوفة مرة تانية
        localStorage.setItem("history", JSON.stringify(history));
      }

// اضافه تلاث ثواني لي اول كلمه
let isfirstword=true;
      function startPlay() {

        let time=defaultlevelscondes;
        if(isfirstword){
          time+=3 // اضافه لي اول كلمه بس
          isfirstword=false
        }
        timeLeftSpan.innerHTML = time;
        let starttime = setInterval(function () {
          timeLeftSpan.innerHTML--;
          if (timeLeftSpan.innerHTML == 0) {
            clearInterval(starttime);
            //compare words
            if (
              theWord.innerHTML.toLocaleLowerCase() == input.value.toLowerCase()
            ) {
              input.value = "";
              scoreGot.innerHTML++;

              if (levelwords.length > 0) {
                genWords();
              } else {
                let span = document.createElement("span");
                span.className = "good";
                let textspan = document.createTextNode("Exellent");
                span.appendChild(textspan);
                finishMessage.appendChild(span);

                dataandlocal();
              }
            } else {
              let span = document.createElement("span");
              span.className = "bad";
              let textspan = document.createTextNode("Game Over");
              span.appendChild(textspan);
              finishMessage.appendChild(span);

              dataandlocal();
            }
          }
        }, 1000);
      }
    })
);