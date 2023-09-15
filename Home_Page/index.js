import { PUBLIC_KEY, PRIVATE_KEY } from "../Keys/Keys.js";
import fetchChar from "./Fetch.js";

let inputVal = document.getElementById("Character_input");

// Accuring the require element
const form = document.getElementsByTagName("form");
const UserInput = document.getElementById("Character_input");
const input_log = document.getElementById("input_log");
const canvas = document.getElementsByClassName("offcanvas-body");

const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();


// making search bar functional

UserInput.oninput = function (e) {
  const val = e.target.value;

  if (val != "") {
    const fetchData = async function (val) {
      input_log.style.width = 39 + "%";
      input_log.style.height = 150 + "px";
      input_log.style.padding = 10 + "px"

      const data = await fetch(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${val}&ts=${ts}&apikey=e0085219c299b4158dece56e3b458bea&hash=${hash}`
      );
      const response = await data.json();
      const result = response.data.results;

      for (let i of result) {
        let name = i.name;
        let h3 = document.createElement("h3");
        h3.setAttribute("class", i.name);
        h3.innerHTML = name;
        input_log.prepend(h3);
      }
    };

    fetchData(val);

  } else {
    input_log.style.width = "0";
    input_log.style.height = "0";
    input_log.style.padding = "0"
  }
};

document.addEventListener("click",function(e){
  input_log.style.width = "0";
  input_log.style.height = "0";
  input_log.style.padding = "0"
  
  if(e.target.tagName == 'H3'){
    UserInput.value = e.target.innerHTML
  }
})


// onsubmiting form 

form[0].onsubmit = function (e) {
  input_log.style.width = "0";
  input_log.style.height = "0";
  input_log.style.padding = "0"
  
  e.preventDefault();
  let InputValue = UserInput.value;
  if (InputValue != "") {
    fetchChar(InputValue);
    inputVal.value = "";
  }
};

fetchChar();

document.onclick = function(e){
  if(e.target.tagName == "I"){
     let name = e.target.getAttribute("data-name")
      e.target.setAttribute("style","color:green;")
     localStorage.setItem("name",name )
     let h3 = document.createElement("h3");
     h3.append(name) 
     canvas[0].append(h3)
    
  }
}

