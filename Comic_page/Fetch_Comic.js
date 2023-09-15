import Comic from "./Comics.js"
import { PUBLIC_KEY,PRIVATE_KEY } from "../Keys/Keys.js"

let urlVal = window.location.href
let url = new  URL(urlVal)
let params = new URLSearchParams(url.search)

let Char_name = params.get("name")

const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

const data = await fetch(
  `https://gateway.marvel.com/v1/public/characters?name=${Char_name}&ts=${ts}&apikey=e0085219c299b4158dece56e3b458bea&hash=${hash}`
  );
  const response = await data.json();
  const result = response.data.results;

  Comic(result)