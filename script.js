class PageAnimations {
    constructor(id) {
        this.elem = document.getElementById(id);
    }

    darkMode() {
        const documentStyleList = window.getComputedStyle(document.documentElement);
        const currentColor = documentStyleList.getPropertyValue("--light-mode-main");
        const brandImg = document.getElementById("brand-img");
        const icon = document.getElementById("toggle");
        
        // i added trim() because first click always returned "  #5f6f52"
        if(currentColor.trim() == "#5f6f52") { 
            document.documentElement.style.setProperty("--light-mode-main", "#fff");
            document.documentElement.style.setProperty("--light-mode-asisted", "#5f6f52");
            brandImg.setAttribute("src", "/assets/darkmode.png");
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            document.documentElement.style.setProperty("--light-mode-main", "#5f6f52");
            document.documentElement.style.setProperty("--light-mode-asisted", "#fff");
            brandImg.setAttribute("src", "/assets/lightmode.png");
            icon.classList.replace("fa-sun", "fa-moon");
        }
    }

    startAnimation() {
        const howtoArea = document.getElementById("howto-area");
        const countItem = document.getElementById("count-item");
        const questionArea = document.getElementById("question-area");
        const footerArea = document.getElementById("result-area");

        howtoArea.classList.add("d-none");
        countItem.classList.add("counting");

        let i = 1;
        const countdown = setInterval(() => {
            countItem.innerHTML = i;
            i--;
            if (i < 0) {
                clearInterval(countdown);
                countItem.style.display = "none";
                questionArea.classList.remove("d-none");
                footerArea.classList.remove("d-none");
              }
        }, 1000);
        questionData.newQuestion(randomNumb());
    }

    resultDropdowns(event){
        const correctAns = document.getElementById("correct-list");
        const wrongAns = document.getElementById("wrong-list");
        let btnId = event.target.id;

        if(btnId === "correct-btn") {
            correctAns.classList.toggle("d-none");
        }else if(btnId === "wrong-btn") {
            wrongAns.classList.toggle("d-none")
        }
    }
}

// ==== Dark Mode Toggle ====
const modeIcon = new PageAnimations("toggle");
modeIcon.elem.addEventListener("click", modeIcon.darkMode);

// ==== Start Button Animation ====
const startButton = new PageAnimations("start-button");
startButton.elem.addEventListener("click", startButton.startAnimation);

// ==== Correct or Wrong List Dropdowns ====
const correctButton = new PageAnimations("correct-btn");
const wrongButton = new PageAnimations("wrong-btn");
correctButton.elem.addEventListener("click", correctButton.resultDropdowns);
wrongButton.elem.addEventListener("click", wrongButton.resultDropdowns);

window.addEventListener("click", (event) => {
    const correctAns = document.getElementById("correct-list");
    const wrongAns = document.getElementById("wrong-list");

    if(event.target.id === "correct-btn") {
        return;
    }else if(event.target.id === "wrong-btn") {
        return;
    }else {
        if(correctAns.clientHeight > 0) {
            correctAns.classList.toggle("d-none");
        }else if(wrongAns.clientHeight > 0) {
            wrongAns.classList.toggle("d-none");
        }else {
            return;
        }
    }
});

class QuestionsAndAnswers {
    constructor(data) {
        this.questions = data;
    }

    newQuestion(randomNumb) {
        questionArea.innerHTML = questions[randomNumb].question;
    
        // Option shuffler
        let mixedOptions = questions[randomNumb].options;
        for (let i = 3; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mixedOptions[i], mixedOptions[j]] = [mixedOptions[j], mixedOptions[i]];
          }

        optionA.innerHTML = questions[randomNumb].options[0];
        optionB.innerHTML = questions[randomNumb].options[1];
        optionC.innerHTML = questions[randomNumb].options[2];
        optionD.innerHTML = questions[randomNumb].options[3];
    }

    selectAnswer(event) {
        const resultOutput = document.getElementById("result");
        const number = sessionStorage.getItem("number");
        const selectedQuestion = questions[number];
        const correctAnswer = selectedQuestion.correctAns;
        const selectedOption = event.target.innerHTML;

        if(selectedOption === correctAnswer) {
            resultOutput.innerHTML = "Correct :)";
            resultOutput.classList.add("correct-anime");

            setTimeout(() => {
                resultOutput.classList.replace("correct-anime", "d-none")
            },2000);

        }else {
            resultOutput.innerHTML = "Wrong :(";
            resultOutput.classList.add("wrong-anime");

            setTimeout(() => {
                resultOutput.classList.replace("wrong-anime", "d-none")
            },2000);
        }

        setTimeout(() => {
            questionData.newQuestion(randomNumb());
        }, 2400)
    }
}

// I wrote questions in a array.
const questions = [
    {question: "Who is champion?", options: ["FB", "GS", "TS", "BJK"], correctAns: "GS"},
    {question: "Who is second?", options: ["FB", "GS", "TS", "BJK"], correctAns: "FB"},
    {question: "Who is third?", options: ["FB", "GS", "TS", "BJK"], correctAns: "BJK"},
    {question: "Who is fourth?", options: ["FB", "GS", "TS", "BJK"], correctAns: "TS"}
];

const questionData = new QuestionsAndAnswers(questions);

const questionArea = document.getElementById("question");
const optionA = document.getElementById("A");
const optionB = document.getElementById("B");
const optionC = document.getElementById("C");
const optionD = document.getElementById("D");

optionA.addEventListener("click", questionData.selectAnswer)
optionB.addEventListener("click", questionData.selectAnswer)
optionC.addEventListener("click", questionData.selectAnswer)
optionD.addEventListener("click", questionData.selectAnswer)

// Random number for random index of question.
function randomNumb() {
    let randomNumb = Math.floor(Math.random() * questions.length);
    sessionStorage.setItem("number", randomNumb);
    return randomNumb;
}
