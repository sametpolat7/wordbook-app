class PageAnimations {
    constructor(id) {
        this.elem = document.getElementById(id);
    }

    darkMode() {
        const documentStyleList = window.getComputedStyle(document.documentElement);
        const currentColor = documentStyleList.getPropertyValue("--light-mode-main");
        const brandImg = document.getElementById("brand-img");
        const icon = document.getElementById("toggle");
        
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

    dropdownAnimation(event) {
        let dropdownId = event;
        console.log(dropdownId)

    }
}

// ==== Dark Mode Toggle ====
const modeIcon = new PageAnimations("toggle");
modeIcon.elem.addEventListener("click", modeIcon.darkMode);

// ==== Start Button Animation ====
const startButton = new PageAnimations("start-button");
startButton.elem.addEventListener("click", startButton.startAnimation);

// ==== True or False Answers Dropdowns ====
const trueAnsList = new PageAnimations("true");
const falseAnsList = new PageAnimations("false");
trueAnsList.elem.addEventListener("click", trueAnsList.dropdownAnimation);
falseAnsList.elem.addEventListener("click", falseAnsList.dropdownAnimation);




class Questions {
    constructor() {

    }
}



class AnswerControl {
    constructor() {

    }
}