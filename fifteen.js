/* Arabella Ji's JavaScript for Fifteen Puzzle */
"use strict";

window.addEventListener("load", function(){
  let board = new Fifteen();
});

class Fifteen {
  /* Create the fifteen puzzle board and set arrtibutes up for the divs */
  constructor() {
    this.idList;
    console.log("Starting to set things up");
    document.getElementById("puzzlearea").innerHTML = "";
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.num = j + 1 + i * 4;
        this.xPosition = - j * 100;
        this.yPosition = - i * 100;
        this.background = "background-position: " + this.xPosition + "px " + this.yPosition + "px"
        this.div = document.createElement("div");
        this.div.id = "id" + this.num;
        document.getElementById("puzzlearea").appendChild(this.div);
        document.getElementById("id" + this.num).innerHTML = this.num;
        document.getElementById("id" + this.num).setAttribute("style", this.background);
        document.getElementById("id" + this.num).addEventListener("click", this.click);
        document.getElementById("id" + this.num).setAttribute("name", this.num);
      }
    }
    document.getElementById("id16").setAttribute("class", "invisible");
    this.updateBoard();
    document.getElementById("shufflebutton").addEventListener("click", this.shuffle);
  }

  /* Check the position of the blank div, make the divs around it moveable, and count the number of the moveable div */
  updateBoard() {
    this.idList = new Array();
    let blank = document.getElementsByClassName("invisible").item(0);
    let blankName = parseInt(blank.getAttribute("name"));
    /* make all the divs immovable */
    for (let i = 1; i < 17; i++) {
      document.getElementById("id" + i).classList.add("noclick");
    }
    /* if the div's name is not 1, 5, 9, 13, then make the div on its left movable */
    if (blankName % 4 != 1) {
      let leftName = blankName - 1;
      document.getElementById("id" + leftName).classList.remove("noclick");
      this.idList.push(leftName);
    } 
    /* if the div's name is not 4, 8, 12, 16, then make the div on its right movable */
    if (blankName % 4 != 0) {
      let rightName = blankName + 1;
      document.getElementById("id" + rightName).classList.remove("noclick");
      this.idList.push(rightName);
    } 
    /* if the div's name is not 1, 2, 3, 4, then make the div above it movable */
    if (blankName - 4 > 0) {
      let upName = blankName - 4;
      document.getElementById("id" + upName).classList.remove("noclick");
      this.idList.push(upName);
    } 
    /* if the div's name is not 13, 14, 15, 16, then make the div below it movable */
    if (blankName + 4 < 17) {
      let downName = blankName + 4;
      document.getElementById("id" + downName).classList.remove("noclick");
      this.idList.push(downName);
    }
  }

  /* Flap the target div with the blank div
  original: the target div
  originalName: the name of the target div */
  flap(original, originalName) {
    let blank = document.getElementsByClassName("invisible").item(0);
    let blankId = blank.id;
    let blankName = blank.getAttribute("name");
    let originalId = original.id;
    let clone1 = original.cloneNode(true);
    let clone2 = blank.cloneNode(true);
    blank.replaceWith(clone1);
    original.replaceWith(clone2);
    clone1.id = blankId;
    clone2.id = originalId;
    clone1.setAttribute("name", blankName);
    clone2.setAttribute("name", originalName);
    clone1.addEventListener("click", this.click);
    this.updateBoard();
  }

  /* Find and flap the target div with the blank div when click the target div
  event: the click event */
  click = (event) => {
    let original = event.target;
    let originalName = original.getAttribute("name");
    this.flap(original, originalName);
  }

  /* Shuffle the board when click the shuffle button */
  shuffle = () => {
    let shuffleTimes = Math.floor(Math.random() * 500);
    for (let i = 0; i < shuffleTimes; i++) {
      let ramdom = Math.floor(Math.random() * this.idList.length);
      let originalName = this.idList[ramdom];
      let original = document.getElementById("id" + originalName);
      this.flap(original, originalName);
    }
  }
}