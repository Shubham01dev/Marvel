import { PUBLIC_KEY, PRIVATE_KEY } from "../Keys/Keys.js";
let ComicContainer = document.getElementsByClassName("Comic_container");

const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

let Chatacter_id;

// Fetching Character Comic

async function Comic(result) {
  for (let i of result) {
    Chatacter_id = i.id;
  }

  const comicData = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${Chatacter_id}/comics?limit=31&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
  );

  let data = await comicData.json();
  let comic_Data = data.data.results;

  for (let i of comic_Data) {

  // Appending Comics To ComicContainer
  
    if(i.images[0]){
      
      let card = document.createElement('div');
      card.setAttribute('class', 'card p-0 ')

      let marvel = document.createElement('a');
      marvel.setAttribute('href',"https://www.marvel.com/comics?&options%5Boffset%5D=0&totalcount=12")
      marvel.setAttribute('target',"_blank")

      let img = document.createElement('img');
      img.setAttribute('class',"card-img-top")
      img.setAttribute('src',`${i.images[0].path}/portrait_uncanny.${i.images[0].extension}`);
      
      marvel.append(img)
      card.append(marvel);
      ComicContainer[0].append(card)
    }
  }
}

export default Comic;
