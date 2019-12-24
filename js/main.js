const LEVEL = document.querySelector(".levelOfDifficulty");
const START = document.querySelector(".start-game");
const RESTART = document.querySelector(".restart-game");

const GAME_TIME = document.querySelector(".game-time");
const FOOD = document.querySelector(".food");
const CLEAN = document.querySelector(".clean");
const HAPPINESS = document.querySelector(".happiness");
const HEALTH = document.querySelector(".health");
const SOCIALIZATION = document.querySelector(".socialization");
const MONEY = document.querySelector(".money");

//Buttons
const EAT_BTN = document.querySelector(".eat-button");
const WASH_BTN = document.querySelector(".wash-button");
const RUN_BTN = document.querySelector(".run-button");
const VISIT_DOCTOR = document.querySelector(".visit-doctor");
const GO_TO_BAR = document.querySelector(".go-to-bar");
const GO_TO_WORK = document.querySelector(".go-to-work");
const BUY_FOOD = document.querySelector(".buy-food");
const START_BUSINESS = document.querySelector(".start-business");

let state = {
  arrStats: ["food", "clean", "happiness", "health", "money", "socialization"],
  finnish: false,
  minStartValueEasyLevel: 50,
  maxStartValueEasyLevel: 100,
  easyReductionEasyLevel: 3,
  levelDecreaseTime: 0,
  gameLifeTimer: 0,
  levelOfDifficultyValue: "",
  onceMinuteTimer: 60000 - (new Date() % 60000) + randValue(1000, 50000)
};

const selectDifficultyLevel = () => {
  if (state.levelOfDifficultyValue === "Fluffy kitty") {
    state.easyReductionEasyLevel = 3;
    state.levelDecreaseTime = 5000;
  } else if (state.levelOfDifficultyValue === "Lazy pug") {
    state.easyReductionEasyLevel = 5;
    state.levelDecreaseTime = 5000;
  } else if (state.levelOfDifficultyValue === "Ninja") {
    state.easyReductionEasyLevel = 7;
    state.levelDecreaseTime = 7000;
  }
};

const writeLevelInState = value => {
  state.levelOfDifficultyValue = value.target.value;
  selectDifficultyLevel();
};

const createObjStatVal = () => {
  return state.arrStats.reduce(
    (obj, el) => ({
      ...obj,
      [el]: randValue(
        state.minStartValueEasyLevel,
        state.maxStartValueEasyLevel
      )
    }),
    {}
  );
};

let startObjVal = createObjStatVal();

//Random start value
function randValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Random Stats Up
const randStatsUp = () => {
  let randNum = randValue(0, 5);
  let randObjVal = state.arrStats[randNum];
  startObjVal[randObjVal] = randValue(10, 50);
};

const randOnceInMinute = () => {
  setTimeout(() => {
    randStatsUp;
    console.log(state.onceMinuteTimer);
  }, state.onceMinuteTimer);
};

//Уменшатель статов
const reducesPerformance = () => {
  for (let key in startObjVal) {
    startObjVal[key] -= state.easyReductionEasyLevel;
  }
};

//Таймер для уменшателя
const timer = () => {
  setInterval(() => {
    if (state.finnish) {
      clearInterval(timer);
    } else {
      reducesPerformance();
    }
  }, state.levelDecreaseTime);
};

//game timer
const gameTimer = () => {
  let tick = setInterval(() => {
    if (
      startObjVal.food <= 0 ||
      startObjVal.clean <= 0 ||
      startObjVal.happiness <= 0 ||
      startObjVal.health <= 0 ||
      startObjVal.socialization <= 0 ||
      startObjVal.money <= 0
    ) {
      clearInterval(tick);
      document.querySelector(".game-over").innerHTML = "Game Over";
      for (const button of document.querySelectorAll(".button"))
        button.disabled = true;
      state.finnish = true;
    } else {
      state.gameLifeTimer += 1;
      drawer();
    }
  }, 1000);
};

const giveEat = () => {
  startObjVal.food += 20;
  startObjVal.clean -= 10;
};

const wash = () => {
  startObjVal.clean += 20;
  startObjVal.happiness -= 10;
};

const run = () => {
  startObjVal.happiness += 15;
  startObjVal.food -= 10;
};

const visitDoctor = () => {
  startObjVal.health += 30;
  startObjVal.money -= 20;
};

const goToBar = () => {
  startObjVal.socialization += 40;
  startObjVal.food += 10;
  startObjVal.money -= 20;
  startObjVal.health -= 10;
};

const goToWork = () => {
  startObjVal.money += 50;
  startObjVal.food -= 10;
  startObjVal.health -= 10;
  startObjVal.socialization -= 20;
};

const byFood = () => {
  startObjVal.food += 20;
  startObjVal.money -= 20;
};

const startBusiness = () => {
  startObjVal.money += 100;
  startObjVal.happiness += 100;
  startObjVal.health -= 100;
  startObjVal.socialization += 20;
};

//Restart game
const restart = () => document.location.reload();
//Start game
const start = () => {
  createObjStatVal();
  randOnceInMinute();
  drawer();
  timer();
  gameTimer();
  START.disabled = true;
  LEVEL.disabled = true;
};

//drawing output
const drawer = () => {
  GAME_TIME.innerHTML = state.gameLifeTimer;
  FOOD.innerText = startObjVal.food;
  CLEAN.innerText = startObjVal.clean;
  HAPPINESS.innerText = startObjVal.happiness;
  HEALTH.innerHTML = startObjVal.health;
  SOCIALIZATION.innerHTML = startObjVal.socialization;
  MONEY.innerHTML = startObjVal.money;
};

LEVEL.addEventListener("change", event => writeLevelInState(event));
START.addEventListener("click", start);
RESTART.addEventListener("click", restart);
EAT_BTN.addEventListener("click", giveEat);
WASH_BTN.addEventListener("click", wash);
RUN_BTN.addEventListener("click", run);
VISIT_DOCTOR.addEventListener("click", visitDoctor);
GO_TO_BAR.addEventListener("click", goToBar);
GO_TO_WORK.addEventListener("click", goToWork);
BUY_FOOD.addEventListener("click", byFood);
START_BUSINESS.addEventListener("click", startBusiness);
