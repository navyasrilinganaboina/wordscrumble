const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");
contentBox = document.querySelector(".container .content");
startArea = document.querySelector(".startArea");
scoreArea = document.querySelector(".score");
modalContent = document.querySelector(".modal-content");

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Get the text of modal
var modalText = document.getElementById("modalText");

let correctWord, timer;
let score = 0;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    modal.style.display = "block";
    modalContent.classList.add("modal-wrong");
    modalText.innerHTML = `<br>Time off! <b>${correctWord.toUpperCase()}</b> was the correct word`;
    endGame();
  }, 1000);
};

const start = () => {
  contentBox.style.display = "block";
  startArea.style.display = "none";
  initGame();
};

const endGame = () => {
  clearInterval(timer);
  contentBox.style.display = "none";
  startArea.style.display = "block";
  modal.style.display = "block";
  modalContent.classList.remove("modal-correct");
  modalContent.classList.add("modal-wrong");
  modalText.innerHTML = `
    <center><br>Time off! <b>${correctWord.toUpperCase()}</b> was the correct word.
    <br>You Lost The Game ! :(</center><br>
    </center>
    `;
};

const winGame = () => {
  clearInterval(timer);
  contentBox.style.display = "none";
  startArea.style.display = "block";
  modal.style.display = "block";
  modalContent.classList.add("modal-correct");
  modalText.innerHTML = `<br><center>Congrats You WIN THE GAME !!!!!!`;
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  scoreArea.innerHTML = score;

  if (score > 10) {
    winGame();
  }
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();

  if (!userWord) {
    modal.style.display = "block";
    modalContent.classList.remove("modal-wrong");
    modalContent.classList.remove("modal-correct");
    return (modalText.innerHTML = `<br>Please enter the word to check!`);
  }

  if (userWord !== correctWord) {
    if (score >= 1) {
      score = score - 1;
      scoreArea.innerHTML = score;
    }
    modal.style.display = "block";
    modalContent.classList.add("modal-wrong");
    return (modalText.innerHTML = `<br>Oops! <b>${userWord}</b> is not a correct word`);
  } else {
    modal.style.display = "block";
    modalContent.classList.remove("modal-wrong");
    modalContent.classList.add("modal-correct");
    modalText.innerHTML = `<br>Congrats! <b>${correctWord.toUpperCase()}</b> is the correct word`;
    score++;
  }

  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
let words = [
  {
    word: "addition",
    hint: "The process of adding numbers",
  },
  {
    word: "meeting",
    hint: "Event in which people come together",
  },
  {
    word: "number",
    hint: "Math symbol used for counting",
  },
  {
    word: "task",
    hint: "a piece of work to be done or undertaken.",
  },

  {
    word: "garden",
    hint: "Space for planting flower and plant",
  },

  {
    word: "comfort",
    hint: "A pleasant feeling of relaxation",
  },
  {
    word: "country",
    hint: "A politically identified region",
  },
  {
    word: "group",
    hint: "A number of objects or persons",
  },

  {
    word: "field",
    hint: "Area of land for farming activities",
  },
  {
    word: "friend",
    hint: "Person other than a family member",
  },
  {
    word: "pocket",
    hint: "A bag for carrying small items",
  },
  {
    word: "needle",
    hint: "A thin and sharp metal pin",
  },

  {
    word: "second",
    hint: "One-sixtieth of a minute",
  },
  {
    word: "library",
    hint: "Place containing collection of books",
  },
];
