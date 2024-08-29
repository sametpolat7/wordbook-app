class PageAnimations {
  constructor(id) {
    this.elem = document.getElementById(id);
  }

  darkMode() {
    const documentStyleList = window.getComputedStyle(document.documentElement);
    const currentColor =
      documentStyleList.getPropertyValue('--light-mode-main');
    const navItems = document.getElementsByTagName('nav')[0].children;
    const howtoImages = document.getElementsByClassName('howto-img');

    // i added trim() because first click always returned "  #5f6f52"
    if (currentColor.trim() == '#5f6f52') {
      document.documentElement.style.setProperty(
        '--light-mode-main',
        '#191d16'
      );
      document.documentElement.style.setProperty(
        '--light-mode-asisted',
        '#5f6f52'
      );
      navItems[0].firstElementChild.setAttribute('src', '/assets/darkmode.png');
      navItems[1].lastElementChild.classList.replace('fa-moon', 'fa-sun');
      howtoImages[0].src = 'assets/howto-img1-dark.png';
      howtoImages[1].src = 'assets/howto-img2-dark.png';
    } else {
      document.documentElement.style.setProperty(
        '--light-mode-main',
        '#5f6f52'
      );
      document.documentElement.style.setProperty(
        '--light-mode-asisted',
        '#fff'
      );
      navItems[0].firstElementChild.setAttribute(
        'src',
        '/assets/lightmode.png'
      );
      navItems[1].lastElementChild.classList.replace('fa-sun', 'fa-moon');
      howtoImages[0].src = 'assets/howto-img1.png';
      howtoImages[1].src = 'assets/howto-img2.png';
    }
  }

  startAnimation() {
    const howtoArea = document.getElementById('howto-area');
    const countItem = document.getElementById('count-item');
    const questionArea = document.getElementById('question-area');
    const footerArea = document.getElementById('result-area');

    howtoArea.classList.add('d-none');
    countItem.classList.add('counting');

    let i = 3;
    const countdown = setInterval(() => {
      countItem.innerHTML = i;
      i--;
      if (i < 0) {
        clearInterval(countdown);
        countItem.style.display = 'none';
        questionArea.classList.remove('d-none');
        footerArea.classList.remove('d-none');
      }
    }, 1000);
    questionData.newQuestion(randomNumb());
  }

  resultDropdowns(event) {
    const correctAns = document.getElementById('correct-box');
    const wrongAns = document.getElementById('wrong-box');
    let btnId = event.target.id;

    if (btnId === 'correct-btn') {
      correctAns.classList.toggle('d-none');
    } else if (btnId === 'wrong-btn') {
      wrongAns.classList.toggle('d-none');
    }
  }
}

// ==== Dark Mode Toggle ====
const modeIcon = new PageAnimations('toggle');
modeIcon.elem.addEventListener('click', modeIcon.darkMode);

// ==== Start Button Animation ====
const startButton = new PageAnimations('start-button');
startButton.elem.addEventListener('click', startButton.startAnimation);

// ==== Correct or Wrong List Dropdowns ====
const correctButton = new PageAnimations('correct-btn');
const wrongButton = new PageAnimations('wrong-btn');
correctButton.elem.addEventListener('click', correctButton.resultDropdowns);
wrongButton.elem.addEventListener('click', wrongButton.resultDropdowns);

// ==== Dropdowns that close when clicked anywhere on the page ====
window.addEventListener('click', (event) => {
  const correctAns = document.getElementById('correct-box');
  const wrongAns = document.getElementById('wrong-box');

  if (event.target.id === 'correct-btn') {
    return;
  } else if (event.target.id === 'wrong-btn') {
    return;
  } else {
    if (correctAns.clientHeight > 0) {
      correctAns.classList.toggle('d-none');
    } else if (wrongAns.clientHeight > 0) {
      wrongAns.classList.toggle('d-none');
    } else {
      return;
    }
  }
});

const questionArea = document.getElementById('question');
const optionA = document.getElementById('A');
const optionB = document.getElementById('B');
const optionC = document.getElementById('C');
const optionD = document.getElementById('D');

const optionArr = [optionA, optionB, optionC, optionD];

// Random number for random index of question.
function randomNumb() {
  let index = Math.floor(Math.random() * questions.length);
  sessionStorage.setItem('number', index);
  return index;
}

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
    const resultOutput = document.getElementById('result');
    const number = sessionStorage.getItem('number');
    const selectedQuestion = questions[number];
    const stringQuestion = selectedQuestion.question;
    const correctAnswer = selectedQuestion.correctAns;
    const selectedOption = event.target.innerHTML;
    const correctCounter = document.getElementById('correct-counter');
    const wrongCounter = document.getElementById('wrong-counter');
    const correctList = document.getElementById('correct-list');
    const wrongList = document.getElementById('wrong-list');

    if (selectedOption === correctAnswer) {
      resultOutput.innerHTML = 'Correct :)';
      resultOutput.classList.replace('d-none', 'correct-anime');

      optionArr.forEach((value) => {
        value.disabled = true;
      });

      setTimeout(() => {
        resultOutput.classList.add('d-none');
        resultOutput.classList.remove('correct-anime');
        correctCounter.innerHTML++;
        let list = document.createElement('li');
        let word = document.createTextNode(stringQuestion);
        list.appendChild(word);
        correctList.appendChild(list);

        optionArr.forEach((value) => {
          value.disabled = false;
        });

        questionData.newQuestion(randomNumb());
      }, 3000); // Because .correct-anime has 3s animation.
    } else {
      resultOutput.innerHTML = 'Wrong :(';
      resultOutput.classList.replace('d-none', 'wrong-anime');

      optionArr.forEach((value) => {
        value.disabled = true;
      });

      setTimeout(() => {
        resultOutput.classList.add('d-none');
        resultOutput.classList.remove('wrong-anime');
        wrongCounter.innerHTML++;
        let list = document.createElement('li');
        let word = document.createTextNode(stringQuestion);
        list.appendChild(word);
        wrongList.appendChild(list);

        optionArr.forEach((value) => {
          value.disabled = false;
        });

        questionData.newQuestion(randomNumb());
      }, 3000); // Because .wrong-anime has 3s animation.
    }
  }
}

// Question instances written in the array.
const questions = [
  {
    question: 'determine',
    options: ['belirlemek', 'meraklı', 'mücadele', 'maden'],
    correctAns: 'belirlemek'
  },
  {
    question: 'visualization',
    options: ['değiştirme', 'güçlendirme', 'görselleştirme', 'yapılandırma'],
    correctAns: 'görselleştirme'
  },
  {
    question: 'appear',
    options: [
      'farkında olmak',
      'kavramak',
      'belli olmak, görünmek',
      'ifade etmek'
    ],
    correctAns: 'belli olmak, görünmek'
  },
  {
    question: 'least',
    options: ['canavar', 'asgari, en küçük', 'soğuk', 'liste'],
    correctAns: 'asgari, en küçük'
  },
  {
    question: 'consist',
    options: ['içermek', 'tasarlamak', 'meydana gelmek', 'direnmek'],
    correctAns: 'meydana gelmek'
  },
  {
    question: 'provide',
    options: ['sağlamak', 'hissetmek', 'eğitmek', 'tasarlamak'],
    correctAns: 'sağlamak'
  },
  {
    question: 'violation',
    options: ['ihlal', 'korku', 'sessizlik', 'ıssız'],
    correctAns: 'ihlal'
  },
  {
    question: 'suddenly',
    options: ['sıradan', 'tehlikeli', 'yavaşca', 'birden, aniden'],
    correctAns: 'birden, aniden'
  },
  {
    question: 'abbreviation',
    options: ['kısaltma', 'kesme', 'çoğaltma', 'toplamak'],
    correctAns: 'kısaltma'
  },
  {
    question: 'clarify',
    options: ['açıklık getirmek', 'temizlemek', 'kılıf bulmak', 'akıl vermek'],
    correctAns: 'açıklık getirmek'
  },
  {
    question: 'convenient',
    options: ['uygun', 'konforlu', 'konvensiyonel', 'kapsayıcı'],
    correctAns: 'uygun'
  },
  {
    question: 'recommended',
    options: ['yorumlamak', 'düzenlemek', 'tavsiye edilen', 'yaygın olan'],
    correctAns: 'tavsiye edilen'
  },
  {
    question: 'avoid',
    options: ['kaçınmak', 'hiçlik', 'saklanmak', 'ulaşmak'],
    correctAns: 'kaçınmak'
  },
  {
    question: 'indentation',
    options: ['maşa', 'saçmalık', 'davetiye', 'girinti'],
    correctAns: 'girinti'
  },
  {
    question: 'refer',
    options: [
      'atfetmek, değinmek',
      'reddetmek',
      'denemek',
      'yakınmak, söylenmek'
    ],
    correctAns: 'atfetmek, değinmek'
  },
  {
    question: 'equivalent',
    options: ['klas', 'eş değer', 'ekipman', 'masum'],
    correctAns: 'eş değer'
  },
  {
    question: 'accomplish',
    options: ['sonuçlandırmak', 'fiyatlandırmak', 'ilişki kurmak', 'yakalamak'],
    correctAns: 'sonuçlandırmak'
  },
  {
    question: 'adjust',
    options: ['reklam', 'sadeleştirmek', 'ayarlamak', 'eklemek'],
    correctAns: 'ayarlamak'
  },
  {
    question: 'individual',
    options: ['tek, bireysel', 'yalın', 'bölmek', 'ilahi, yüce'],
    correctAns: 'tek, bireysel'
  },
  {
    question: 'whether',
    options: ['hava durumu', 'uyanık', 'ikisinden biri', 'kesinlik'],
    correctAns: 'ikisinden biri'
  },
  {
    question: 'demonstrate',
    options: [
      'göstermek, kanıtlamak',
      'şeytan işi',
      'rapor, bildirgeç',
      'çıkmaz sokak'
    ],
    correctAns: 'göstermek, kanıtlamak'
  },
  {
    question: 'misleading',
    options: ['zarif', 'özlem', 'yanıltıcı', 'tuzak'],
    correctAns: 'yanıltıcı'
  },
  {
    question: 'desctruction',
    options: ['brifing', 'kaynakça', 'açıklama, talimat', 'yıkım, imha'],
    correctAns: 'yıkım, imha'
  },
  {
    question: 'spread',
    options: ['depar atmak', 'dilimlemek', 'yaymak', 'hızlı okumak'],
    correctAns: 'yaymak'
  },
  {
    question: 'maintain',
    options: ['dağ', 'ana fikir', 'korumak, sürdürmek', 'kaldırmak'],
    correctAns: 'korumak, sürdürmek'
  },
  {
    question: 'consider',
    options: ['dikkate almak', 'kafası karışık', 'kapatmak', 'meydana gelmek'],
    correctAns: 'dikkate almak'
  },
  {
    question: 'require',
    options: ['dikkatli', 'kare', 'gerekli', 'yenilik'],
    correctAns: 'gerekli'
  },
  {
    question: 'divide',
    options: ['bölmek', 'aydınlık', 'derinlik', 'DVD'],
    correctAns: 'bölmek'
  },
  {
    question: 'several',
    options: ['genel', 'birçok', 'biraz', 'servis'],
    correctAns: 'birçok'
  },
  {
    question: 'abort',
    options: [
      'iptal etmek, durdurmak',
      'abartmak',
      'yan bakmak',
      'çığırmak, bağırmak'
    ],
    correctAns: 'iptal etmek, durdurmak'
  },
  {
    question: 'compatible',
    options: ['uyumlu', 'konforlu', 'kompozisyonel', 'rahat'],
    correctAns: 'uyumlu'
  },
  {
    question: 'gross',
    options: ['ekim', 'büyümek', 'brüt', 'bahçe'],
    correctAns: 'brüt'
  },
  {
    question: 'individual',
    options: ['girinti', 'bireysel', 'ikili', 'derinlik'],
    correctAns: 'bireysel'
  },
  {
    question: 'receive',
    options: ['almak', 'ayırmak', 'rezervasyon', 'rahat'],
    correctAns: 'almak'
  },
  {
    question: 'available',
    options: ['mevcut, geçerli', 'beklenebilir', 'egzotik', 'zamanlı'],
    correctAns: 'mevcut, geçerli'
  },
  {
    question: 'establish',
    options: ['kurmak', 'emlak', 'tahmin etmek', 'gerekli'],
    correctAns: 'kurmak'
  },
  {
    question: 'session',
    options: ['göndermek', 'susam', 'sapsız', 'oturum'],
    correctAns: 'oturum'
  },
  {
    question: 'although',
    options: ['tamamen', 'tamam', 'rağmen', 'değiştirmek'],
    correctAns: 'rağmen'
  },
  {
    question: 'ascent',
    options: ['tespit etmek', 'yükselme', 'değerlendirme', 'çarpık'],
    correctAns: 'yükselme'
  },
  {
    question: 'descent',
    options: ['betimlemek', 'tanım', 'alçalma', 'hak etmek'],
    correctAns: 'alçalma'
  },
  {
    question: 'aggregate',
    options: ['kabul etmek', 'aykırı', 'saldırgan', 'toplam'],
    correctAns: 'toplam'
  },
  {
    question: 'authentication',
    options: ['kimlik doğrulama', 'yetkilendirme', 'otantik', 'yazı işi'],
    correctAns: 'kimlik doğrulama'
  }
];

const questionData = new QuestionsAndAnswers(questions);
optionA.addEventListener('click', questionData.selectAnswer);
optionB.addEventListener('click', questionData.selectAnswer);
optionC.addEventListener('click', questionData.selectAnswer);
optionD.addEventListener('click', questionData.selectAnswer);
