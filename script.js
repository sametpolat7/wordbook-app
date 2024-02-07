class PageAnimations {
    constructor(id) {
        this.elem = document.getElementById(id);
    }

    darkMode() {
        const documentStyleList = window.getComputedStyle(document.documentElement);
        const currentColor = documentStyleList.getPropertyValue("--light-mode-main");
        const brandImg = document.getElementById("brand-img");
        const icon = document.getElementById("dark-mode");
        
        // i added trim() because first click has returned always "  #5f6f52"
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
        const bodyElem = document.body;
        const howtoArea = document.getElementsByClassName("howto-container")[0];
        const countItem = document.getElementById("count-item");
        const questionArea = document.getElementById("question-section");
        bodyElem.style.opacity = ".5";
        howtoArea.classList.add("d-none");
        countItem.classList.add("counting");

        let i = 3;
        const countdown = setInterval(() => {
            countItem.innerHTML = i;
            i--;
            if (i < 0) {
                clearInterval(countdown);
                countItem.style.display = "none";
                questionArea.classList.remove("d-none");
                bodyElem.style.opacity = "1";
              }
        }, 1000)
    }
}

// ==== Dark Mode Toggle ====
const modeIcon = new PageAnimations("dark-mode");
modeIcon.elem.addEventListener("click", modeIcon.darkMode);

// ==== Start Button Animation ====
const startButton = new PageAnimations("start-button");
startButton.elem.addEventListener("click", startButton.startAnimation);


class Questions {
    constructor() {

    }
}



class AnswerControl {
    constructor() {

    }
}