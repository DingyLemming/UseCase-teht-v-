
let loggedIn = false;

let votingSectionAdded = false;
let voteThemes = [];


function createButtons() {
  if (!loggedIn) return;

  const addVoteBtn = document.createElement("button");
  addVoteBtn.textContent = "Add Vote";
  addVoteBtn.id = "addVoteBtn";
  addVoteBtn.addEventListener("click", () => {
    addVote();
    saveData();
  });
  votingSection.appendChild(addVoteBtn);

  const deleteVoteBtn = document.createElement("button");
  deleteVoteBtn.textContent = "Delete Vote";
  deleteVoteBtn.id = "deleteVoteBtn";
  deleteVoteBtn.addEventListener("click", () => {
    deleteVote();
    saveData();
  });
  votingSection.appendChild(deleteVoteBtn);
}

function createPlusButton(index) {
  const plusButton = document.createElement("button");
  plusButton.textContent = '+';
  plusButton.addEventListener("click", () => {
    incrementCount(index, 'plusCount');
    saveData();
  });
  return plusButton;
}

function createMinusButton(index) {
  const minusButton = document.createElement("button");
  minusButton.textContent = '-';
  minusButton.addEventListener("click", () => {
    decrementCount(index, 'minusCount');
    saveData();
  });
  return minusButton;
}


function addVote() {
  if (!loggedIn) {
    alert("Please login to add a vote.");
    return;
  }

  const voteTheme = prompt("Enter the theme for the voting:");
  if (voteTheme) {
    voteThemes.push({ theme: voteTheme, plusCount: 0, minusCount: 0 });
    displayVoteThemes();
  }
}


function deleteVote() {
  if (!loggedIn) {
    alert("Please login to delete a vote.");
    return;
  }

  const themeName = prompt("Enter the name of the theme to delete:");
  const themeIndex = voteThemes.findIndex(theme => theme.theme === themeName);
  if (themeIndex !== -1) {
    voteThemes.splice(themeIndex, 1);
    displayVoteThemes();
  } else {
    alert("Theme not found. Please enter a valid theme name.");
  }
}

function displayVoteThemes() {
  const voteThemesDiv = document.getElementById("voteThemes");
  voteThemesDiv.innerHTML = "";
  voteThemes.forEach((themeObj, index) => {
    const themeContainer = document.createElement("div");
    themeContainer.classList.add("theme-container");

    const themeName = document.createElement("div");
    themeName.textContent = themeObj.theme;

    const themeScore = document.createElement("div");
    themeScore.textContent = `+${themeObj.plusCount} -${themeObj.minusCount}`;

    const plusButton = createPlusButton(index);
    const minusButton = createMinusButton(index);

    themeContainer.appendChild(themeName);
    themeContainer.appendChild(themeScore);
    themeContainer.appendChild(plusButton);
    themeContainer.appendChild(minusButton);

    voteThemesDiv.appendChild(themeContainer);
  });
}



function incrementCount(index, countType) {
  voteThemes[index][countType]++;
  displayVoteThemes();
}


function decrementCount(index, countType) {
  voteThemes[index][countType]++;
  displayVoteThemes();
}


function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const votingSection = document.getElementById("votingSection");
  const loginForm = document.getElementById("loginForm");
  const loggedInSection = document.getElementById("loggedInSection");
  const usernameDisplay = document.getElementById("usernameDisplay");

  if (!usernameInput || !passwordInput || !votingSection || !loginForm || !loggedInSection || !usernameDisplay) {
    console.error("One or more required elements are missing.");
    return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === "admin" && password === "123") {
    loggedIn = true;
    if (!votingSectionAdded) {
      votingSection.style.display = "block";
      votingSectionAdded = true;
    }
    createButtons(); 
    loginForm.style.display = "none";
    loggedInSection.style.display = "block";
    usernameDisplay.innerText = username;
  } else {
    alert("Incorrect username or password! Please try again.");
  }
}


function logout() {
  loggedIn = false;
  const addVoteBtn = document.getElementById("addVoteBtn");
  const deleteVoteBtn = document.getElementById("deleteVoteBtn");
  if (addVoteBtn) addVoteBtn.remove();
  if (deleteVoteBtn) deleteVoteBtn.remove();
  loggedInSection.style.display = "none";
  loginForm.style.display = "block";
  document.getElementById("username").value = ""; 
  document.getElementById("password").value = ""; 
}

function saveData() {
  localStorage.setItem("voteThemes", JSON.stringify(voteThemes));
}

function loadData() {
  const savedVoteThemes = localStorage.getItem("voteThemes");
  if (savedVoteThemes) {
    voteThemes = JSON.parse(savedVoteThemes);
    displayVoteThemes();
  }
}


window.addEventListener("load", loadData);

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("logoutBtn").addEventListener("click", logout);


displayVoteThemes();
