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

const flip = document.createElement("button");
const rotate = document.createElement("button");
const nextBtn = document.createElement("button");
const prevBtn = document.createElement("button");

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
// const Maintable = document.createElement("table");

// for (let i = 1; i <= 11; i++) {
//   const tr = document.createElement("tr");
//   tr.classList.add("row");

//   for (let j = 1; j <= 11; j++) {
//     const td = document.createElement("td");
//     td.classList.add("cell");
//     tr.appendChild(td);

//     if (mountains[n][0] === i && mountains[n][1] === j) {
//       td.setAttribute("type", "mountain");
//       if (mountains.length - 1 !== n) n++;
//       td.classList.add("mountain");
//       td.style.backgroundImage = "url('./tiles/mountain_tile.png')";
//       td.backgroundPosition = "cover";
//       td.backgroundRepeat = "no-Repeat";
//     } else {
//       td.setAttribute("type", "empty");
//     }
//     td.setAttribute("value", (`${i},${j}`));
//   }

//   Maintable.appendChild(tr);
// }

// mapGrid.appendChild(Maintable);

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
    cell.setAttribute("value", (`${i},${j}`));
  }
}

const currentSeason = missions["basic"];

divInScore.classList.add("scoreBoxs");

// console.log(currentSeason);
const scoreArr = ["Spring", "Summer", "Autumn", "Water"];

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

for (let i = 0; i < 4; i++) {
  const missionCardElement = document.createElement("div");
  missionCardElement.classList.add("mission-card");
  missionCardElement.innerHTML = `<img src="./missions_eng/Group ${
    68 + i
  }.png" alt="Mission Image">`;
  if (Math.floor(i / 2) + 1 == 1) div1.appendChild(missionCardElement);
  else div2.appendChild(missionCardElement);
}

mission.appendChild(div1);
mission.appendChild(div2);

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
    const gridRow = document.createElement("div");
    gridRow.style.display = "flex"
    
    // let flag = false;
    row.map((ele) => {
      const cell = document.createElement("div");
      gridRow.appendChild(cell);
      cell.classList.add("cell");
     
      cell.setAttribute("value", `${i}`);
      if (ele === 1) {
        // flag = true;
        const col = obj.type;
        cell.style.backgroundColor = color[col];
        // cell.style.border = "1px solid black";
        cell.style.backgroundImage = `url('./tiles/${col}_tile.png')`
        
        cell.setAttribute("flag", `1`);
        // console.log(cell.getAttribute("value"));
        cell.setAttribute("type", `${obj.type}`);
      } else {
        cell.setAttribute("flag", "0");
        cell.style.boxShadow = "none"
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

  trackOriginalshape = flipedShape;

  console.log(trackOriginalshape, flipedShape, curEle);
}

// function nextShape(e) {
//   if (index === elements.length - 1) index = -1;

//   curEle = currentElement(elements[++index].shape);
//   getShape(curEle);

//   trackOriginalshape = elements[index].shape;
//   count = 0;
//   countElements();
// }

// function prevShape(e) {
//   if (index === 0) index = elements.length;

//   curEle = currentElement(elements[--index].shape);
//   getShape(curEle);

//   trackOriginalshape = elements[index].shape;
//   count = 0;
//   countElements();
// }

flip.addEventListener("click", flipShape);

// nextBtn.addEventListener("click", nextShape);

// prevBtn.addEventListener("click", prevShape);

rotate.addEventListener("click", rotateShape);

function checkShape(tb1, tb2) {
  //   console.log(tb1);
  for (let i = 0; i < tb1.length; i++) {
    for (let j = 0; j < tb1[i].length; j++) {
      //   console.log(tb1[i][j], tb2[i][j]);
      if (tb1[i][j] !== tb2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

count = 0;
countElements();
// console.log(count);

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
    // console.log();
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

function edgeOfTheForest(type, i, j) {
  if (type === "forest" && (i === 1 || i === 11 || j === 1 || j === 11)) {
    points++;

    // if (
    //   (i === 1 && j == 1) ||
    //   (i === 1 && j == 11) ||
    //   (i === 11 && j == 1) ||
    //   (i === 11 && j == 11)
    // )
    //   points++;
  }
}

function wateringPotatoes(type, i, j) {
  if (type === "water") {
    // console.log("water");
    const farmCells = document.querySelectorAll('[type="farm"]');
    farmCells.forEach((ele) => {
      let inputString = ele.getAttribute("value");
      let numericValues = inputString.match(/\d+/g);

      const intValue_i = parseInt(numericValues[0], 10);
      const intValue_j = parseInt(numericValues[1], 10);

      if (
        (Math.abs(i - intValue_i) === 1 && Math.abs(j - intValue_j) === 0) ||
        (Math.abs(j - intValue_j) === 1 && Math.abs(i - intValue_i) === 0)
      ) {
        points += 2;
      }

      //   console.log(points);
    });
    // points++;
  }

  if (type === "farm") {
    // console.log("farm");
    const waterCells = document.querySelectorAll('[type="water"]');
    waterCells.forEach((ele) => {
      let inputString = ele.getAttribute("value");
      let numericValues = inputString.match(/\d+/g);

      const intValue_i = parseInt(numericValues[0], 10);
      const intValue_j = parseInt(numericValues[1], 10);

      if (
        (Math.abs(i - intValue_i) === 1 && Math.abs(j - intValue_j) === 0) ||
        (Math.abs(j - intValue_j) === 1 && Math.abs(i - intValue_i) === 0)
      ) {
        points += 2;
      }
      //   console.log(points);
    });
    // points++;
  }
}



function sleepyValley() {
  let point = 0;
  const rows = document.querySelectorAll(".row");

  rows.forEach((row) => {
    let count = 0;
    row.childNodes.forEach((cell) => {
      if (cell.getAttribute("type") === "forest") count++;
    });

    if (count === 3) {
      point += 4;
    }
  });

  return point;
}

function borderlandsMission() {
  let point = 0;
  const rows = document.querySelectorAll(".row");
  let flag;
  rows.forEach((row) => {
    flag = true;
    row.childNodes.forEach((cell) => {
      if (cell.getAttribute("type") === "empty") flag = false;
    });

    if (flag) {
      point += 6;
    }
  });

  const table = document.querySelector("#map table");
  const row = table.rows.length;
  const col = table.rows[0].cells.length;
  flag = true;

  let cnt = 0;
  for (let j = 0; j < col; j++) {
    for (let i = 0; i < row; i++) {
      const cell = table.rows[i].cells[j];
      let type = cell.getAttribute("type");

      if (type === "empty") {
        flag = false;
        break;
      }
    }
    if (flag) {
      point += 6;
    }
    flag = true;
  }

  return point;
}

let forSleepyValley = 0;
let forBorderlandsMission = 0;

const seasonText = document.querySelector(".seasonText");
const elementNumber = document.querySelector(".ELementNumber");



// mapGrid.addEventListener("click", function (e) {
//   e.preventDefault();

//   const ele = e.target.closest(".cell");

//   if (!ele) return;

//   // console.log(e.target.getAttribute("value"));

//   let inputString = e.target.getAttribute("value");
//   let numericValues = inputString.match(/\d+/g); 

//   e.target.classList.add("highlightedCell");
//   if (numericValues && numericValues.length >= 2) {
//     const intValue_i = parseInt(numericValues[0], 10);  
//     const intValue_j = parseInt(numericValues[1], 10); 


//     if (e.target.getAttribute("type") !== "empty") {
//       arrI = [];
//       arrJ = [];
//       minI = 12;
//       minJ = 12;
//       maxI = 0;
//       maxJ = 0;
//       selectedCells = 0;
//       points = 0;

//       changeCSSRule(".highlightedCell", "border", "3px solid red");

//       setTimeout(function () {
//         if (true) {
//           const hlr = document.querySelectorAll(".highlightedCell");
//           hlr.forEach((element) => {
//             element.classList.remove("highlightedCell");
//             changeCSSRule(".highlightedCell", "border", "none");
//           });
//         }
//       }, 500);

//       const bkc = document.querySelectorAll(`.backgroundColor${forBkColor}`);

//       bkc.forEach((element) => {
//         element.classList.remove(`backgroundColor${forBkColor}`);
//       });

//       return;
//     }
//   // console.log(intValue_i, intValue_j);

//     let i = intValue_i;
//     let j = intValue_j;
//     let type = elements[index].type;

//     // edgeOfTheForest(type, i, j);
//     // wateringPotatoes(type, i, j);
//     // magiciansValley(type, i, j);

//     arrI.push(intValue_i);
//     arrJ.push(intValue_j);

//     if (minI > intValue_i) minI = intValue_i;
//     if (minJ > intValue_j) minJ = intValue_j;

//     if (maxI < intValue_i) maxI = intValue_i;
//     if (maxJ < intValue_j) maxJ = intValue_j;
//   }

//   e.target.classList.add(`backgroundColor${forBkColor}`);

//   selectedCells++;
//   // console.log(count, selectedCells);

//   changeCSSRule(".highlightedCell", "border", "3px solid green");
//   if (count === selectedCells) {
//     // console.log(minI, maxI, minJ, maxJ);

//     let tb = [
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//     ];

   
//     set_Attribute(tb, arrI, arrJ, minI, minJ);

//     trackOriginalshape = currentElement(trackOriginalshape);
   
//     if (!checkShape(trackOriginalshape, tb)) {
//       arrI = [];
//       arrJ = [];
//       minI = 12;
//       minJ = 12;
//       maxI = 0;
//       maxJ = 0;
//       selectedCells = 0;
//       points = 0;

//       changeCSSRule(".highlightedCell", "border", "3px solid red");

//       setTimeout(function () {
//         if (true) {
//           const hlr = document.querySelectorAll(".highlightedCell");
//           hlr.forEach((element) => {
//             element.classList.remove("highlightedCell");
//           });
//           changeCSSRule(".highlightedCell", "border", "none");
//         }
//       }, 500);

//       const bkc = document.querySelectorAll(`.backgroundColor${forBkColor}`);


//       bkc.forEach((element) => {
//         element.classList.remove(`backgroundColor${forBkColor}`);
//       });
//     } else {
//       let type = elements[index].type;
//       //   e.target.setAttribute("type", elements[index].type);
//       const hlr = document.querySelectorAll(".highlightedCell");

//       // hlr.classList.remove("highlightedCell");
//       hlr.forEach((element) => {
//         // element.setAttribute("value", "0, 0");
//         element.classList.remove("highlightedCell");
//       });

//       const uniqueColor = document.querySelectorAll(
//         `.backgroundColor${forBkColor}`
//       );

//       uniqueColor.forEach((ele) => {
//         ele.setAttribute("type", elements[index].type);
//       });

//       arrI = [];
//       arrJ = [];
//       minI = 12;
//       minJ = 12;
//       maxI = 0;
//       maxJ = 0;
//       selectedCells = 0;

//       const col = elements[index].type;
//       changeCSSRule(
//         `.backgroundColor${forBkColor}`,
//         "background-color",
//         color[col]
//       );

      
//       // console.log(wateringPotatoes());

//       if (unitTime <= 7) {
//         richcountryside();
//         oddNumberedSilos();
//         seasonText.innerHTML = "Spring (AB)";
//         elementNumber.innerHTML = `${unitTime}/7`;
//         if (unitTime + elements[index].time >= 7) {
//           terracedHouse();
//           emptySite();
//           treeLine();
//           wateringCanal();
//           let wt = wealthyTown();
//           let spv = sleepyValley();
//           forSleepyValley = spv - forSleepyValley;
//           let bdl = borderlandsMission();
//           forBorderlandsMission = bdl - forBorderlandsMission;
//           points += forSleepyValley + forBorderlandsMission;
//           forSleepyValley = spv;
//           forBorderlandsMission = bdl;
//         }
//         score1.innerHTML = +score1.innerHTML + points;
//       } else if (unitTime > 7 && unitTime <= 14) {
//         seasonText.innerHTML = "Summer (BC)";
//         elementNumber.innerHTML = `${unitTime}/14`;
//         console.log(elementNumber.innerHTML);
//         if (unitTime + elements[index].time >= 14) {
//           let spv = sleepyValley();
//           forSleepyValley = spv - forSleepyValley;
//           let bdl = borderlandsMission();
//           forBorderlandsMission = bdl - forBorderlandsMission;
//           points += forSleepyValley + forBorderlandsMission;
//           forSleepyValley = spv;
//           forBorderlandsMission = bdl;
//         }
//         score2.innerHTML = +score2.innerHTML + points;
//       } else if (unitTime > 14 && unitTime <= 21) {
//         seasonText.innerHTML = "Autumn (CD)";
//         elementNumber.innerHTML = `${unitTime}/21`;
//         if (unitTime + elements[index].time >= 14) {
//           let spv = sleepyValley();
//           forSleepyValley = spv - forSleepyValley;
//           let bdl = borderlandsMission();
//           forBorderlandsMission = bdl - forBorderlandsMission;
//           points += forSleepyValley + forBorderlandsMission;
//           forSleepyValley = spv;
//           forBorderlandsMission = bdl;
//         }
//         score3.innerHTML = +score3.innerHTML + points;
//       } else {
//         seasonText.innerHTML = "Winter (DA)";
//         elementNumber.innerHTML = `${unitTime}/28`;
//         if (unitTime + elements[index].time >= 14) {
//           let spv = sleepyValley();
//           forSleepyValley = spv - forSleepyValley;
//           let bdl = borderlandsMission();
//           forBorderlandsMission = bdl - forBorderlandsMission;
//           points += forSleepyValley + forBorderlandsMission;
//           forSleepyValley = spv;
//           forBorderlandsMission = bdl;
//         }
//         score4.innerHTML = +score4.innerHTML + points;
//       }
//       // }

//       total.innerHTML = +total.innerHTML + points;
//       points = 0;
//       unitTime += elements[index].time;
//       forBkColor++;
//       nextShape(index);
//     }
//   }
// });




elementBox.appendChild(shapes);

//???????????????????????????????????????????
// /const grid = document.getElementById("grid");
let smallGrid = document.querySelector(".shapedTable");

// function changeDrag(){
//   smallGrid = document.querySelector(".shapedTable");
// }

// Function to handle the drag start event for the small grid
function handleDragStart(e) {
  // smallGrid = document.querySelector(".shapedTable");
  e.dataTransfer.setData("text/plain", "smallGrid");
  console.log("sub teek 1");
  console.log(e.dataTransfer.getData("text/plain"));
}

// Function to handle the drag over event for the large grid
function handleDragOver(e) {
  e.preventDefault();
}

// Function to handle the drop event for the large grid
function handleDrop(e) {
  let flag = true;
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  console.log("sub tek", data);
  if (data === "smallGrid") {

    console.log("Kia hoa");
    const targetCell = e.target.closest(".cell");
    let len = 0;
    if (targetCell) {
      const smallGridCells = smallGrid.querySelectorAll(".cell");
      const targetIndex = Array.from(targetCell.parentElement.children).indexOf(targetCell);
      const largeGridCells = grid.querySelectorAll(".cell");
      smallGridCells.forEach(ele => {
        console.log(ele.getAttribute("flag"))
        if(ele.getAttribute("flag") === "1"){
          len++;
        }
      });

      // console.log(len);
      // for (let i = 0; i < smallGridCells.length; i++) {
      for (let i = 0; i < len; i++) {
        const target = largeGridCells[targetIndex + i];
        target.classList.add("hlCell")
        if(target.getAttribute("type") !== "empty"){
          flag = false
        }
       
      }
      let k = 0;
      let j = 0;
      if(flag){
        for (let i = 0; i < smallGridCells.length; i++) {
        // for (let i = 0; i < len; i++) {
          
          if(k === +smallGridCells[i].getAttribute("value")){
            k++;
            j = 0;
          }
          
          const target = largeGridCells[targetIndex + j  + (11 * +smallGridCells[i].getAttribute("value"))];
            j++;
 
            if(smallGridCells[i].getAttribute("flag") === "1"){
              // k++
              target.innerHTML = smallGridCells[i].innerHTML;
              target.style.backgroundImage = `url('./tiles/${elements[index].type}_tile.png')`;
              target.style.backgroundColor = smallGridCells[i].style.backgroundColor;
              target.setAttribute("type", smallGridCells[i].getAttribute("type"));
            }
         
          // }
         
        }

        index++;
        curEle = currentElement(elements[index].shape);
        getShape(curEle)
        smallGrid.classList.remove("shapedTable")
        // changeDrag();
      }
      else{
        changeCSSRule('.hlCell', "border", "2px solid red");
      
      }

      setTimeout(function(){
        if(true){
          const HLedCells = document.querySelectorAll('.hlCell');
          HLedCells.forEach(cell => {
            cell.classList.remove('hlCell');
            changeCSSRule('.hlCell', "border", "none");
          })
        }
      }, 1000)

    }
  }
}



// Attach dragstart event listener to the small grid
smallGrid.addEventListener("dragstart", handleDragStart);

// Attach dragover event listener to the large grid
grid.addEventListener("dragover", handleDragOver);

// Attach drop event listener to the large grid
grid.addEventListener("drop", handleDrop);
