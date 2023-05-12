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
  console.log(pokeDataHere)
  results.forEach((result) => {
    pokeDataHere.appendChild(result);
  });
});



// ------------------------------------------------------ Fight Section ----------------------------------------------//

function theWinner(selectedCharacters) {

  let player1 = selectedCharacters[0].name;
  let player2 = selectedCharacters[1].name;
  const p = document.createElement(`p`)

  


  let randomNumber = Math.floor(Math.random() * 2) + 1;

  let winner = document.getElementById(`winner`);


  if(randomNumber === 1) {
    p.innerText = player1 + `Is The Winner`
    winner.appendChild(p)
  } else if(randomNumber === 2) {
    p.innerText = player2 + `Is The Winner`
    winner.appendChild(p)
  }













}



  // const selectedPokemonContainer = document.getElementById("selectedPokemonContainer");

  // selectedPokemonContainer.innerHTML = "";

  // selectedCharacters.forEach((selectedPokemon) => {
  //   const div = document.createElement("div");
  //   const p = document.createElement("p");
  //   const img = document.createElement("img");

  //   img.src = selectedPokemon.image;
  //   p.innerText = selectedPokemon.name.toUpperCase();

  //   div.appendChild(img);
  //   div.appendChild(p);

  //   selectedPokemonContainer.appendChild(div);
  // });


