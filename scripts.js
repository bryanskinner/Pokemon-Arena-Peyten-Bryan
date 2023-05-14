

// * smoothly scrolls to the "fight-section" when the selected button is pressed
document.getElementById('select').addEventListener('click', function() {
document.getElementById('fight-section').scrollIntoView({
  behavior: 'smooth'
});
});



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


function onYouTubeIframeAPIReady() {
  const player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: '2iDO0lgcp5Y',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: '2iDO0lgcp5Y',
      controls: 0,
      showinfo: 0,
      modestbranding: 1
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(100);
}



 

