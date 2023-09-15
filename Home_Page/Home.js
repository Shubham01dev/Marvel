let Main_container = document.getElementsByClassName("main_container")

function Home(result, Character_container) {
  // appending the image on div element

  for (let i of result) {
    let img_path = i.thumbnail.path;
    let img_extention = i.thumbnail.extension;
    let img_name = i.name;
    // seting border for containers

    let Card = document.createElement("div");
    Card.setAttribute("class", "card ");
    Card.setAttribute("style", "width: 18rem");

    let img = document.createElement("img");
    img.setAttribute("src", `${img_path}/portrait_uncanny.${img_extention}`);
    img.setAttribute("class", "card-img-top");
    
    let Card_body = document.createElement("div");
    Card_body.setAttribute("class", "card-body");
    
    let h4 = document.createElement("h4");
    h4.innerHTML = img_name
    h4.setAttribute("class", "card-text")
    Card_body.append(h4)

    // favourite element
    let fav = document.createElement("i")
    fav.setAttribute("class", "fa-regular fa-star fav")
    fav.setAttribute("data-name", `${img_name}`)
    
    // link warper for directing to comics
    let path = document.createElement("a");
    path.setAttribute("href", `./Comics.html?name=${img_name}`);
    
    path.append(img);
    Card.append(path);
    Card.append(fav);
    Card.append(Card_body)
    Character_container.append(Card);
    Main_container[0].append(Character_container);
  }
}



export default Home;
