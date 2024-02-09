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

    // startAnimation() {
    //     const howtoArea = document.getElementsById("howto-area");
    //     const countItem = document.getElementById("count-item");
    //     const questionArea = document.getElementById("question-area");
    //     howtoArea.classList.add("d-none");
    //     countItem.classList.add("counting");

    //     let i = 3;
    //     const countdown = setInterval(() => {
    //         countItem.innerHTML = i;
    //         i--;
    //         if (i < 0) {
    //             clearInterval(countdown);
    //             countItem.style.display = "none";
    //             questionArea.classList.remove("d-none");
    //           }
    //     }, 1000)
    // }

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
})

class Questions {
    constructor() {

    }
}



class AnswerControl {
    constructor() {

    }
}