# WordBook App

In this project, I designed a vocabulary quiz application using JavaScript. When the user clicks the "Start!" button, the counter counts down from 3 and the first question is loaded. If the question is answered correctly, it is added to the "True" list and if it is answered incorrectly, it is added to the "False" list. After the question is answered, a 3-second animation is activated and then a random word is drawn from the word pool and printed on the screen.

![WordBook App](/assets/howto-second.png)

## Live

[WordBook App](https://wordbook-app-v1.netlify.app/)


## Features
- Responsive Design (Mobile First)
- Classes for OOP paradigm
- User-friendly interface
- Dark-Light Mode Toggle
- Without external dependencies (Except Font Awesome)


## Error Handling
- `NewQuestion()` method is always called with a callback function (`randomNumb()`) that generates a random number. This ensures that questions are displayed randomly each time and not in a specific order.
- Options shuffled and displayed in each question to avoid monotony.
- After the question is answered, the option buttons are "disabled" for 3 seconds. (Because animation activated.)


**Author :** [Samet Polat](https://www.linkedin.com/in/sametpolat17/)