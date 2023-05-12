// import "./styles.css";

let selectedCharacters = []

let pokemonPlayers = (id) => {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let charName = data.name
      const div = document.createElement("div");
      const p = document.createElement("p");
      const img = document.createElement("img");
      img.setAttribute("class", charName)
      div.setAttribute("id", "character");
      div.setAttribute("data-name", charName)
      div.setAttribute("data.image", data.sprites.front_default)
      p.innerText = charName.toUpperCase();
      img.src = data.sprites.front_default;
      img.addEventListener("click", () => {
        let selectedPokemon = {
          name: data.name,
          image: data.sprites.front_default
        };
        if(selectedCharacters.length < 2){
          selectedCharacters.push(selectedPokemon)
          div.classList.add("selected");
        } else if(selectedCharacters.length >= 2){
          alert("You've already selected two")
        }
      });
      div.appendChild(img);
      div.appendChild(p);
      return div;
    });
};


let promises = [];

for (let i = 1; i <= 25; i++) {
  promises.push(pokemonPlayers(i));
}

Promise.all(promises).then((results) => {
  let pokeDataHere = document.getElementById("pokeDataHere");
  results.forEach((result) => {
    pokeDataHere.appendChild(result);
  });
});



// ------------------------------------------------------ Fight Section ----------------------------------------------//
