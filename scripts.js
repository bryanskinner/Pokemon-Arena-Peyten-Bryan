const audio = new Audio('08 - Battle! (Hop).mp3');
audio.autoplay = true;


// * smoothly scrolls to the "fight-section" when the selected button is pressed
document.getElementById('select').addEventListener('click', function() {
  document.getElementById('fight-section').scrollIntoView({
    behavior: 'smooth'
  });
});

let selectedCharacters = [];

let pokemonPlayers = (id) => {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let charName = data.name;
      const div = document.createElement("div");
      const p = document.createElement("p");
      const img = document.createElement("img");
      img.setAttribute("class", charName);
      img.setAttribute("id", "image")
      div.setAttribute("id", "character");
      div.setAttribute("data-name", charName);
      div.setAttribute("data-image", data.sprites.front_default);
      p.innerText = charName.toUpperCase();
      img.src = data.sprites.front_default;
      img.addEventListener("click", () => {
        let selectedPokemon = {
          name: data.name,
          image: data.sprites.front_default
        };
        if (selectedCharacters.length < 2) {
          selectedCharacters.push(selectedPokemon);
          div.classList.add("selected");
        } else if (selectedCharacters.length >= 2) {
          alert("You've already selected two");
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

// ------------------------------------------------------ Fight Section ---------------------------------------------- //
// * When the select button is clicked these events will happen
document.getElementById("select").addEventListener("click", function() {
  if (selectedCharacters.length < 2) {
    alert("Please select two Pokémon.");
    return;
  }

  // Clear the container
  const selectedContainer = document.getElementById("pokemon-container");
  selectedContainer.innerHTML = "";

  selectedCharacters.forEach((pokemon, index) => {
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.src = pokemon.image;

    div.appendChild(img);
    selectedContainer.appendChild(div);

    if (index === 0) {
      div.classList.add("slide-in-left");
    } else if (index === 1) {
      div.classList.add("slide-in-right");
    }
  });

  // * Gets the names of the two selected Pokemon
  const player1Element = document.getElementById("player1");
  const player2Element = document.getElementById("player2");

  const selectedPokemon1 = selectedCharacters[0].name.toUpperCase();
  const selectedPokemon2 = selectedCharacters[1].name.toUpperCase();

  player1Element.textContent = selectedPokemon1;
  player2Element.textContent = selectedPokemon2;
});

// * When the fight button is pressed these events will happen
document.getElementById("button").addEventListener("click", function() {
  if (selectedCharacters.length < 2) {
    alert("Please select two Pokémon.");
    return;
  }

  // * Decideds the winner by using Math.Random, if player1 is less than 0.5 than they win, else player2 wins
  const player1 = selectedCharacters[0].name.toUpperCase();
  const player2 = selectedCharacters[1].name.toUpperCase();
  const randomValue = Math.random();
  const winner = document.querySelector(".winner");
  const p = document.createElement("p");
  let winnerText;

  if (randomValue < 0.5) {
    winnerText = `${player1} is the winner!`;
  } else {
    winnerText = `${player2} is the winner!`;
  }

  p.innerText = winnerText;
  winner.appendChild(p);

  this.style.display = "none";

  const replayButton = document.getElementById("replay-button");
  replayButton.style.display = "block";
});



// * Replay button that resets the ui when clicked
document.getElementById("replay-button").addEventListener("click", function() {
  selectedCharacters = [];

  // * Deselects the pokemon
  const selectedPokemon = document.querySelectorAll(".selected");
  selectedPokemon.forEach(pokemon => pokemon.classList.remove("selected"));

  // * Resets the UI
  const selectedContainer = document.getElementById("pokemon-container");
  selectedContainer.innerHTML = "";

  const player1Element = document.getElementById("player1");
  const player2Element = document.getElementById("player2");

  player1Element.textContent = "Pokemon 1";
  player2Element.textContent = "Pokemon 2";

  const winner = document.querySelector(".winner");
  winner.textContent = "";


  const fightButton = document.getElementById("button");
  fightButton.style.display = "block";

  this.style.display = "none";

  // *scrolls back to the "selection-section" when clicked
  const selectionSection = document.getElementById("selection-section");
  selectionSection.scrollIntoView({
    behavior: 'smooth'
  });
});





//Plays music on load
// function onYouTubeIframeAPIReady() {
//   const player = new YT.Player('player', {
//     height: '0',
//     width: '0',
//     videoId: '2iDO0lgcp5Y',
//     playerVars: {
//       autoplay: 1,
//       loop: 1,
//       playlist: '2iDO0lgcp5Y'
//     }
//   })
// }











 
