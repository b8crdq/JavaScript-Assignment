"strict";
const missions = {
  basic: [
    {
      title: "Edge of the forest",
      description:
        "You get one point for each forest field adjacent to the edge of your map.",
    },
    {
      title: "Sleepy valley",
      description:
        "For every row with three forest fields, you get four points.",
    },
    {
      title: "Watering potatoes",
      description:
        "You get two points for each water field adjacent to your farm fields.",
    },
    {
      title: "Borderlands",
      description: "For each full row or column, you get six points.",
    },
  ],
  extra: [
    {
      title: "Tree line",
      description:
        "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
    },
    {
      title: "Watering canal",
      description:
        "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
    },
    {
      title: "Wealthy town",
      description:
        "You get three points for each of your village fields adjacent to at least three different terrain types.",
    },
    {
      title: "Magicians' valley",
      description:
        "You get three points for your water fields adjacent to your mountain fields.",
    },
    {
      title: "Empty site",
      description:
        "You get two points for empty fields adjacent to your village fields.",
    },
    {
      title: "Terraced house",
      description:
        "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.",
    },
    {
      title: "Odd numbered silos",
      description:
        "For each of your odd numbered full columns you get 10 points.",
    },
    {
      title: "Rich countryside",
      description:
        "For each row with at least five different terrain types, you will receive four points.",
    },
  ],
};

const elements = [
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
];

// #################################################################
let gameOver = true;
const currentElement = function (ele) {
  for (let i = 0; i < 4; i++) {
    ele = rotateAndTrim(ele);
  }

  console.log(...ele);
  return ele;
};
let index = Math.floor(Math.random() * elements.length - 1) + 1;
let curEle = currentElement(elements[index].shape);

const mapGrid = document.querySelector("#map");
const details = document.querySelector("#details");
const score = document.querySelector(".score");
const mission = document.querySelector(".missions");
const nextEle = document.querySelector(".nextElement");

const body = document.querySelector("body");

const reset = document.querySelector(".hdDiv");


const flip = document.createElement("button");
const rotate = document.createElement("button");

const forShape = document.createElement("div");
const shapes = document.createElement("div");
const divInScore = document.createElement("div");
const totalPoints = document.createElement("div");

let selectedCells = 0;
let unitTime = 0;

let mountains = [
  [2, 2],
  [4, 9],
  [6, 4],
  [9, 10],
  [10, 6],
];

let n = 0;

const grid = document.getElementById("grid");

for (let i = 0; i < 11; i++) {
  for (let j = 0; j < 11; j++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);

    if (mountains[n][0] === i && mountains[n][1] === j) {
      cell.setAttribute("type", "mountain");
      if (mountains.length - 1 !== n) n++;
      cell.classList.add("mountain");
      cell.style.backgroundImage = "url('./tiles/mountain_tile.png')";
      cell.backgroundPosition = "cover";
      cell.backgroundRepeat = "no-Repeat";
    } else {
      cell.setAttribute("type", "empty");
      cell.style.backgroundImage = "url('./tiles/base_tile.png')";
    }
    cell.setAttribute("value", `${i},${j}`);
    cell.setAttribute("column", `${j}`);
  }
}

const currentSeason = missions["basic"];

divInScore.classList.add("scoreBoxs");

// console.log(currentSeason);
const scoreArr = ["Spring", "Summer", "Autumn", "Winter"];

for (let i = 0; i < 4; i++) {
  const box = document.createElement("div");
  box.innerHTML = `<h3>${scoreArr[i]}</h3> <div><span>0</span> Points</div>`;
  box.classList.add("scoreBox");
  box.classList.add(`score${i + 1}`);
  divInScore.appendChild(box);
}

totalPoints.classList.add("totalPoints");
totalPoints.innerHTML = `<h3>Total: <span class='points'>0</span> Points</h3>`;

score.appendChild(divInScore);
score.appendChild(totalPoints);

let div1 = document.createElement("div");
div1.classList.add(`missionDivs`);

let div2 = document.createElement("div");
div2.classList.add(`missionDivs`);

// for (let i = 0; i < 4; i++) {
  const missionCardElement = document.createElement("div");
  const missionCardElement2 = document.createElement("div");
  
  missionCardElement.classList.add("mission-card");
  missionCardElement.innerHTML = `<div class="basicMassion1"><img src="./missions_eng/sleepyvalley.png" alt="Mission Image"></div>
                                  <div class="basicMassion3"><img src="./missions_eng/BorderLands.png" alt="Mission Image"></div>`;

  div1.appendChild(missionCardElement);
  missionCardElement2.classList.add("mission-card");
  missionCardElement2.innerHTML = `<div class="basicMassion2"><img src="./missions_eng/wateringpotatoes.png" alt="Mission Image"></div>
                                  <div class="basicMassion4"><img src="./missions_eng/Edgeoftheforest.png" alt="Mission Image"></div>`;
  div2.appendChild(missionCardElement2);
// // }

mission.appendChild(div1);
mission.appendChild(div2);

const missionCard = document.querySelector('.mission-card div')

const bm1 = document.querySelector('.basicMassion1')
const bm2 = document.querySelector('.basicMassion2')
const bm3 = document.querySelector('.basicMassion3')
const bm4 = document.querySelector('.basicMassion4')

console.log(mission.children.length);
const rotateFlip = `<div class='left col-6'>
                        <h3 class='currentEleText'>Current element:</h3>
                        <div class='btn'>
                            
                        </div>
                    </div>

                    <div class='right col-6'>
                     
                      <span> <span>
                    </div>`;

nextEle.innerHTML = rotateFlip;

const btn = document.querySelector(".btn");
const elementBox = document.querySelector(".right");

flip.innerHTML = "FLIP";
rotate.innerHTML = "ROTATE";


forShape.appendChild(flip);
forShape.appendChild(rotate);

btn.appendChild(forShape);

let eleMatrix;

function rotateAndTrim(mtx) {
  let arr = [];
  let trimAndRotatedshape = [];

  let flag;
  mtx.map((ele) => {
    flag = false;
    for (let i = 0; i < ele.length; i++) {
      if (ele[i] === 1) flag = true;
    }
    if (flag) arr.push(ele);
  });

  let row = arr.length;
  let col = arr[0].length;

  let arr2;
  for (let i = 0; i < col; i++) {
    arr2 = [];
    for (let j = 0; j < row; j++) {
      arr2.push(0);
    }
    trimAndRotatedshape.push(arr2);
  }

  let k = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      trimAndRotatedshape[k++][i] = arr[i][j];
    }
    k = 0;
  }

  return trimAndRotatedshape;
}

const color = {
  water: "blue",
  forest: "green",
  farm: "yellow",
  town: "grey",
};

let count = 0;

function countElements() {
  curEle.map((row) =>
    row.map((ele) => {
      if (ele === 1) count++;
    })
  );
}

function getShape(sh2D) {
  shapes.innerHTML = "";

  const obj = elements[index];
  let i = 0;
  const smallGrid = document.createElement("div");
  smallGrid.classList.add("shapedTable");
  smallGrid.setAttribute("draggable", "true");
  sh2D.map((row) => {
    let j = 0;
    const gridRow = document.createElement("div");
    gridRow.style.display = "flex";

    // let flag = false;
    row.map((ele) => {
      const cell = document.createElement("div");
      gridRow.appendChild(cell);
      cell.classList.add("cell");

      cell.setAttribute("value", `${i}, ${j++}`);
      if (ele === 1) {
        // flag = true;
        const col = obj.type;
        cell.style.backgroundColor = color[col];
        // cell.style.border = "1px solid black";
        cell.style.backgroundImage = `url('./tiles/${col}_tile.png')`;

        cell.setAttribute("flag", `1`);
        // console.log(cell.getAttribute("value"));
        cell.setAttribute("type", `${obj.type}`);
      } else {
        cell.setAttribute("flag", "0");
        cell.style.boxShadow = "none";
        cell.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
      }
      smallGrid.appendChild(gridRow);
    });
    // flag = false;
    i++;
  });
  // console.log(sh2D);
  shapes.appendChild(smallGrid);
}

getShape(curEle);

let trackOriginalshape = elements[index].shape;

function rotateShape() {
  trackOriginalshape = [];
  curEle = rotateAndTrim(curEle);
  getShape(curEle);
  changeDrag();

  curEle.map((row) => {
    console.log(row);
    for (let i = row.length - 1; i < 3; i++) {
      if (row.length < 3) {
        if (elements[index].rotation === 0) row.push(0);
        else row.unshift(0);
      }
    }
    trackOriginalshape.push(row);
  });
  elements[index].rotation++;
}

function flipShape(e) {
  curEle = currentElement(curEle.reverse());
  const flipedShape = curEle;
  getShape(flipedShape);
  changeDrag();
  trackOriginalshape = flipedShape;

  console.log(trackOriginalshape, flipedShape, curEle);
}


flip.addEventListener("click", flipShape);
rotate.addEventListener("click", rotateShape);

function checkShape(tb1, tb2) {
  for (let i = 0; i < tb1.length; i++) {
    for (let j = 0; j < tb1[i].length; j++) {
      if (tb1[i][j] !== tb2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

count = 0;
countElements();

const highlightedCell = document.querySelector(".highlightedCell");

function changeCSSRule(ruleName, property, value) {
  var stylesheets = document.styleSheets;
  var ruleExists = false;

  for (var i = 0; i < stylesheets.length; i++) {
    var stylesheet = stylesheets[i];
    for (var j = 0; j < stylesheet.cssRules.length; j++) {
      var rule = stylesheet.cssRules[j];
      if (rule.selectorText === ruleName) {
        rule.style[property] = value;
        ruleExists = true;
        break;
      }
    }
    if (ruleExists) break;
  }

  if (!ruleExists) {
    const stylesheet = document.styleSheets[0];
    if (stylesheet) {
      stylesheet.insertRule(
        ruleName + " { " + property + ": " + value + "; }",
        stylesheet.cssRules.length
      );
    }
  }
}

function set_Attribute(tb, arrI, arrJ, minI, minJ) {
  for (let i = 0; i < arrI.length; i++) {
    if (arrI[i] - minI < 3 && arrJ[i] - minJ < 3)
      tb[arrI[i] - minI][arrJ[i] - minJ] = 1;
  }
}

let maxI = 0;
let minI = 12;

let maxJ = 0;
let minJ = 12;

let arrI = [];
let arrJ = [];

let forBkColor = 0;
let points = 0;

const score1 = document.querySelector(".score1 div span");
const score2 = document.querySelector(".score2 div span");
const score3 = document.querySelector(".score3 div span");
const score4 = document.querySelector(".score4 div span");
const total = document.querySelector(".totalPoints h3 .points");

function edgeOfTheForest() {
  let point = 0;
  const forestCells = document.querySelectorAll('[type="forest"]');

  forestCells.forEach((ele) => {
    let inputString = ele.getAttribute("value");
    let numericValues = inputString.match(/\d+/g);

    const i = parseInt(numericValues[0], 10);
    const j = parseInt(numericValues[1], 10);

    if ( (i === 0) || (j === 0) || (i === 10) || (j === 10)) {
      point++;
    }
  });

  // console.log("edgeOfTheForest : ", point);

  return point;
}

function wateringPotatoes() {
  let point = 0
  // const cells = document.querySelectorAll("grid .cells");
    const waterCells = document.querySelectorAll('.grid [type="water"]');
    
    waterCells.forEach((wcell) => {
      console.log("wcell : ", wcell);
      let inputString = wcell.getAttribute("value");
      let numericValues = inputString.match(/\d+/g);

      const ii = parseInt(numericValues[0], 10);
      const jj = parseInt(numericValues[1], 10);
      
    const farmCells = document.querySelectorAll('.grid [type="farm"]');

    farmCells.forEach((fcell) => {
      
        let inputString = fcell.getAttribute("value");
        let numericValues = inputString.match(/\d+/g);
  
        const i = parseInt(numericValues[0], 10);
        const j = parseInt(numericValues[1], 10);
  
        if (!(wcell.getAttribute("flag") === "1") &&
          (Math.abs(i - ii) === 1 && Math.abs(j - jj) === 0) ||
          (Math.abs(j - jj) === 1 && Math.abs(i - ii) === 0)
        ) {
          point += 2;
          wcell.setAttribute("flag" , "1");
          console.log("fcell : ", fcell);
        }
       
      });

    });
  

    console.log("wateringPotatoes : ", point);
  return point;

}

let k = 0;

function sleepyValley() {
  k = 0;
  let point = 0;
  const cells = document.querySelectorAll(".grid .cell");
  let count = 0;
  // console.log(cells);
  cells.forEach((cell) => {
    

    let inputString = cell.getAttribute("value");
    let numericValues = inputString.match(/\d+/g);
  
    let i = parseInt(numericValues[0], 10);
    
    if(i === k){
      if (cell.getAttribute("type") === "forest") count++;
    }
    else{
      k++
      if (count === 3) {
        point += 4;
      }
      count = 0;
      if (cell.getAttribute("type") === "forest") count++;
    }
  });

  console.log("sleepyValley : ", point);
  return point;
}

function borderlandsMission() {

  console.log("borderingLands");
  k = 0;
  let point = 0;
  flag = true;
  const cells = document.querySelectorAll(".grid .cell");
  
  cells.forEach((cell) => {
  
    let inputString = cell.getAttribute("value");
    let numericValues = inputString.match(/\d+/g);
  
    let i = parseInt(numericValues[0], 10);
    
    if(i === k){
      if (cell.getAttribute("type") === "empty") flag = false;
    }
    else{
      k++
      if (flag) {
        point += 6;
      }
      flag = true;
      if (cell.getAttribute("type") === "empty") flag = false;
    }
  });


  k = 0;
  flag = true;
for(let i = 0; i < 11; i++){
  const cellsInColumn = document.querySelectorAll(`[column="${i}"]`);

  cellsInColumn.forEach((cell) => {
    // console.log(cell.getAttribute("value"));
  
    let inputString = cell.getAttribute("value");
    let numericValues = inputString.match(/\d+/g);
  
    // let i = parseInt(numericValues[0], 10);
    let j = parseInt(numericValues[1], 10);
    
    if(j === k){
      if (cell.getAttribute("type") === "empty") flag = false;
    }
    else{
      k++
      if (flag) {
        point += 6;
      }
      flag = true;
      if (cell.getAttribute("type") === "empty") flag = false;
    }
  });
}


  console.log("bl : ", point);

  return point;
}

let forSleepyValley = 0;
let forWateringPatatos = 0;
let forBorderlandsMission = 0;
let forEadgeOfForest = 0;

// let oldSleepyValley = 0;
// let oldWateringPatatos = 0;
// let oldBorderlandsMission = 0;
// let oldEadgeOfForest = 0;


const seasonText = document.querySelector(".seasonText");
const elementNumber = document.querySelector(".ELementNumber");

elementBox.appendChild(shapes);

//*************************************** */

let ind = 0;
let ind2 = 0;
let smallGrid = document.querySelector(".shapedTable");

function changeDrag() {
  smallGrid = document.querySelector(".shapedTable");
}

// Function to handle the drag start event for the small grid
function handleDragStart(e) {
  if (!e.target.closest(".shapedTable")) return;
  console.log(e.target.style);
  e.dataTransfer.setData(`text/plain`, `smallGrid`);
}

function whichCellClicked(e) {
  if (!e.target.closest(".cell")) return;

  let inputString = e.target.getAttribute("value");
  let numericValues = inputString.match(/\d+/g);

  ind = parseInt(numericValues[0], 10);
  ind2 = parseInt(numericValues[1], 10);
  // ind = e.target.getAttribute("value");
  console.log(ind, ind2);
}

// Function to handle the drag over event for the large grid
function handleDragOver(e) {
  // e.target.style.background = "none";
  // console.log(e);
  e.preventDefault();
}


// Function to handle the drop event for the large grid
function handleDrop(e) {

  if(gameOver){
    let oldJ = 0;
    let newJ = 0
    let flag = true;
    e.preventDefault();
    const data = e.dataTransfer.getData(`text/plain`);
    // console.log("sub tek", data);
    if (data === `smallGrid`) {
      // console.log("Kia hoa");
      const targetCell = e.target.closest(".cell");
      // const targetCell = e.target.closest(".shapedTable");
      // console.log(data);
      if (targetCell) {
        const smallGridCells = smallGrid.querySelectorAll(".cell");
        let targetIndex = Array.from(targetCell.parentElement.children).indexOf(
          targetCell
        );

        targetIndex += -11 * ind - ind2;
        const largeGridCells = grid.querySelectorAll(".cell");

        let k = 0;
        let j = 0;

        // ind = +smallGridCells[i].getAttribute("value");
        for (let i = 0; i < smallGridCells.length; i++) {
          let inputString = smallGridCells[i].getAttribute("value");
          let numericValues = inputString.match(/\d+/g);
          ind = parseInt(numericValues[0], 10);
          ind2 = parseInt(numericValues[1], 10);
          if (k === ind) {
            k++;
            j = 0;
          }

          let target ;

          if(targetIndex + j + 11 * ind < 121){
            target = largeGridCells[targetIndex + j + 11 * ind];
            inputString = target.getAttribute("value");
          numericValues = inputString.match(/\d+/g);
          ind = parseInt(numericValues[0], 10);
          ind2 = parseInt(numericValues[1], 10);
          }

          j++;
          if (smallGridCells[i].getAttribute("flag") === "1") {
            
            if(oldJ === 0)  oldJ = ind2;
            newJ = ind2
            
            if(target) target.classList.add("hlCell");
            if (!target || target.getAttribute("type") !== "empty" || Math.abs(oldJ - newJ) > 3) {
              flag = false;
              // console.log(target.getAttribute("value"), oldJ - newJ);
            }

            oldJ = newJ
          }
        }
        k = 0;
        j = 0;
        if (flag) {
          for (let i = 0; i < smallGridCells.length; i++) {
            let inputString = smallGridCells[i].getAttribute("value");
            let numericValues = inputString.match(/\d+/g);

            ind = parseInt(numericValues[0], 10);
            ind2 = parseInt(numericValues[1], 10);
            if (k === ind) {
              k++;
              j = 0;
            }

            const target = largeGridCells[targetIndex + j + 11 * ind];
            j++;

            if (smallGridCells[i].getAttribute("flag") === "1") {
              target.innerHTML = smallGridCells[i].innerHTML;
              target.style.backgroundImage = `url('./tiles/${elements[index].type}_tile.png')`;
              target.style.backgroundColor =
                smallGridCells[i].style.backgroundColor;
              target.setAttribute("type", smallGridCells[i].getAttribute("type"));
            }
          }

          

          unitTime += elements[index].time;

          if(unitTime <= 7){

            elementNumber.innerHTML = `${unitTime}/7`
            seasonText.innerHTML = scoreArr[0] + " (AB)";
            bm1.classList.add("highlightMissions");
            bm2.classList.add("highlightMissions");
            if(unitTime == 6 || unitTime == 7){
              forSleepyValley = sleepyValley();
              forWateringPatatos = wateringPotatoes();
              // oldWateringPatatos = forWateringPatatos;
              // oldSleepyValley = forSleepyValley;
            }
          }
          else if(unitTime <= 14){
            score1.innerHTML = forSleepyValley + forWateringPatatos;
            total.innerHTML = forSleepyValley + forWateringPatatos;
            elementNumber.innerHTML = `${unitTime}/14`
            seasonText.innerHTML = scoreArr[1] + " (BC)",

            bm1.classList.remove("highlightMissions");
            bm2.classList.add("highlightMissions");
            bm3.classList.add("highlightMissions");

            if(unitTime == 13 || unitTime == 14){
              forWateringPatatos = wateringPotatoes();
              forBorderlandsMission = borderlandsMission();
              // forWateringPatatos -= oldWateringPatatos;
              // oldBorderlandsMission = forBorderlandsMission;
            }


          }
          else if(unitTime <= 21){
            
            score2.innerHTML =  forWateringPatatos + forBorderlandsMission;
            total.innerHTML = +score1.innerHTML + +score2.innerHTML;
            // score2.innerHTML = forWateringPatatos;
            elementNumber.innerHTML = `${unitTime}/21`
            seasonText.innerHTML = scoreArr[2] + " (CD)"

            bm2.classList.remove("highlightMissions");
            bm4.classList.add("highlightMissions");
            bm3.classList.add("highlightMissions");

            if(unitTime == 20 || unitTime == 21){
              forBorderlandsMission = borderlandsMission();
              forEadgeOfForest = edgeOfTheForest();
              // forBorderlandsMission -= oldBorderlandsMission;
            }
          }
          else {
            score3.innerHTML =  forBorderlandsMission + forEadgeOfForest;
            total.innerHTML = +score1.innerHTML + +score2.innerHTML + +score3.innerHTML;
            elementNumber.innerHTML = `${unitTime}/28`
            seasonText.innerHTML = scoreArr[3] + " (DA)"

            bm3.classList.remove("highlightMissions");
            bm1.classList.add("highlightMissions");
            bm4.classList.add("highlightMissions");

            if(unitTime == 27 || unitTime == 28){
              forEadgeOfForest = edgeOfTheForest();
              forSleepyValley = sleepyValley();
              // forSleepyValley -= oldSleepyValley

            }
            
          }

          if(unitTime >= 28){
            score4.innerHTML = forEadgeOfForest + forSleepyValley;
            total.innerHTML = +score4.innerHTML + +score1.innerHTML + +score2.innerHTML + +score3.innerHTML;
            gameOver = false;
            bm1.classList.remove("highlightMissions");
            bm4.classList.remove("highlightMissions");
            reset.classList.remove('hidden');

          }



          index++;
          if(index === elements.length) index = 0;
          curEle = currentElement(elements[index].shape);
          smallGrid.classList.remove("shapedTable");
          getShape(curEle);
          changeDrag();
        } else {
          changeCSSRule(".hlCell", "border", "2px solid red");
        }

        setTimeout(function () {
          if (true) {
            const HLedCells = document.querySelectorAll(".hlCell");
            HLedCells.forEach((cell) => {
              cell.classList.remove("hlCell");
              changeCSSRule(".hlCell", "border", "none");
            });
          }
        }, 1000);
      }
    }
  }
}


reset.addEventListener('click', function(){
  reset.classList.add('hidden');
  location.reload();

})



// Attach dragstart event listener to the small grid
// smallGrid.addEventListener("dragstart", handleDragStart);
shapes.addEventListener("dragstart", handleDragStart);
shapes.addEventListener("mousedown", whichCellClicked);

// Attach dragover event listener to the large grid
grid.addEventListener("dragover", handleDragOver);

// Attach drop event listener to the large grid
grid.addEventListener("drop", handleDrop);


