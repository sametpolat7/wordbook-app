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
            // document.getElementById("howto-firstImg").style.boxShadow = "none";
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
        const correctAns = document.getElementById("correct-box");
        const wrongAns = document.getElementById("wrong-box");
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

// ==== Dropdowns that close when clicked anywhere on the page ====
window.addEventListener("click", (event) => {
    const correctAns = document.getElementById("correct-box");
    const wrongAns = document.getElementById("wrong-box");

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
    
        // Mixing question options
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
        const stringQuestion = selectedQuestion.question;
        const correctAnswer = selectedQuestion.correctAns;
        const selectedOption = event.target.innerHTML;
        const correctCounter = document.getElementById("correct-counter");
        const wrongCounter = document.getElementById("wrong-counter");
        const correctList = document.getElementById("correct-list");
        const wrongList = document.getElementById("wrong-list");

        if(selectedOption === correctAnswer) {
            resultOutput.innerHTML = "Correct :)";
            resultOutput.classList.replace("d-none", "correct-anime");
            setTimeout(() => {
                resultOutput.classList.add("d-none");
                resultOutput.classList.remove("correct-anime");
                correctCounter.innerHTML++;
                let list = document.createElement("li");
                let word = document.createTextNode(stringQuestion);
                list.appendChild(word);
                correctList.appendChild(list);
                questionData.newQuestion(randomNumb());
            }, 2000); // Because .correct-anime has 2s animation.

        }else {
            resultOutput.innerHTML = "Wrong :(";
            resultOutput.classList.replace("d-none", "wrong-anime");
            setTimeout(() => {
                resultOutput.classList.add("d-none");
                resultOutput.classList.remove("wrong-anime");
                wrongCounter.innerHTML++;
                let list = document.createElement("li");
                let word = document.createTextNode(stringQuestion);
                list.appendChild(word);
                wrongList.appendChild(list);
                questionData.newQuestion(randomNumb());
            },2000); // Because .wrong-anime has 2s animation.
        }
    }
}

// Question instances written in the array.
const questions = [
    {question: "label", options: ["etiket", "değişim", "yolculuk", "yaprak"], correctAns: "etiket"},
    {question: "determine", options: ["belirlemek", "meraklı", "mücadele", "maden"], correctAns: "belirlemek"},
    {question: "visualization", options: ["değiştirme", "güçlendirme", "görselleştirme", "yapılandırma"], correctAns: "görselleştirme"},
    {question: "preference", options: ["tercih", "deneyim", "etkileşim", "açıklama"], correctAns: "tercih"},
    {question: "appear", options: ["farkında olmak", "kavramak", "belli olmak, görünmek", "ifade etmek"], correctAns: "belli olmak, görünmek"},
    {question: "least", options: ["canavar", "asgari, en küçük", "soğuk", "liste"], correctAns: "asgari, en küçük"},
    {question: "consist", options: ["içermek", "tasarlamak", "meydana gelmek", "direnmek"], correctAns: "meydana gelmek"},
    {question: "addition", options: ["yerel", "ek", "aidiyet", "anı"], correctAns: "ek"},
    {question: "provide", options: ["sağlamak", "hissetmek", "eğitmek", "tasarlamak"], correctAns: "sağlamak"},
    {question: "violation", options: ["ihlal", "korku", "sessizlik", "ıssız"], correctAns: "ihlal"},
    {question: "suddenly", options: ["sıradan", "tehlikeli", "yavaşca", "birden, aniden"], correctAns: "birden, aniden"},
    {question: "preserve", options: ["hazırlamak", "korumak", "sunmak", "servis etmek"], correctAns: "korumak"},
    {question: "abbreviation", options: ["kısaltma", "kesme", "çoğaltma", "toplamak"], correctAns: "kısaltma"},
    {question: "clarify", options: ["açıklık getirmek", "temizlemek", "kılıf bulmak", "akıl vermek"], correctAns: "açıklık getirmek"},
    {question: "convenient", options: ["uygun", "konforlu", "konvensiyonel", "kapsayıcı"], correctAns: "uygun"},
    {question: "recommended", options: ["yorumlamak", "düzenlemek", "tavsiye edilen", "yaygın olan"], correctAns: "tavsiye edilen"},
    {question: "avoid", options: ["kaçınmak", "hiçlik", "saklanmak", "ulaşmak"], correctAns: "kaçınmak"},
    {question: "indentation", options: ["maşa", "saçmalık", "davetiye", "girinti"], correctAns: "girinti"}
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
