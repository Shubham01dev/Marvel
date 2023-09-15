import Home from "./Home.js";
import { PUBLIC_KEY, PRIVATE_KEY } from "../Keys/Keys.js";

const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

//  fetching data from marvel
let Character_container;

let arr = [
  "Iron Man",
  "Hulk",
  "Thor",
  "Spider-Man (Ultimate)",
  "Captain America",
];

const fetchData = async function (name) {
  arr.unshift(name);
  let newArr = arr.slice(0, 6);

  // remove previous element on adding new elements
  let check = document.getElementsByClassName("check");
  if (check[0] == undefined) {
    Character_container = document.createElement("div");
    Character_container.setAttribute("class", "Character_container check");
  } else {
    check[0].remove();
    Character_container = document.createElement("div");
    Character_container.setAttribute("class", "Character_container check");
  }

  for (let i of newArr) {
    const data = await fetch(
      `https://gateway.marvel.com/v1/public/characters?name=${i}&ts=${ts}&apikey=e0085219c299b4158dece56e3b458bea&hash=${hash}`
    );
    const response = await data.json();
    const result = response.data.results;
    Home(result, Character_container);
  }
};

export default fetchData;
