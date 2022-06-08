const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const wordPlayed = document.getElementById('word-played');
const figureParts = document.querySelectorAll('.figure-part');

console.log(figureParts);
console.log(finalMessage);

const words = [
  'cavia',
  'krukje',
  'tijd',
  'fors',
  'sambal',
  'zuivel',
  'jasje',
  'dieren',
  'lepel',
  'picknick',
  'quasi',
  'winnaar',
  'quote',
  'botox',
  'cruciaal',
  'zitting',
  'cabaret',
  'carrière',
  'cake',
  'dyslexie',
  'uier',
  'nihil',
  'sausje',
  'kuuroord',
  'poppetje',
  'docent',
  'camping',
  'schijn',
  'kloppen',
  'boycot',
  'cyclus',
  'angstzweet',
  'yoghurt',
  'quiz',
  'censuur',
  'chagrijnig',
  'fictief',
  'chef',
  'gering',
  'nacht',
  'cacao',
  'tijdschrift',
  'triomf',
  'baby',
  'ijstijd',
  'quad',
  'open',
  'jazz',
  'turquoise',
  'herfststorm',
  'carnaval',
  'boxer',
  'straks',
  'fysiek',
  'accu',
  'twijg',
  'quote',
  'gammel',
  'flirt',
  'futloos',
  'vreugde',
  'ogen',
  'geloof',
  'periode',
  'volwaardig',
  'uitleg',
  'stuk',
  'volk',
  'even',
  'stijl',
  'val',
  'alliantie',
  'tocht',
  'mooi',
  'joggen',
  'broek',
  'kwik',
  'werksfeer',
  'vorm',
  'nieuw',
  'sopraan',
  'miljoen',
  'inrichting',
  'klacht',
  'dak',
  'echt',
  'schikking',
  'print',
  'oorlog',
  'zijraam',
  'hyacint',
  'kauwgomballenautomaat',
  'zoutwateraquariums',
  'ooggetuigenverslag',
  'huisvuilverbrandingsinstallatie',
  'kitsch',
  'radicalisering',
  'parfumeriezaak',
  'maquette',
  'historicus',
  'ruitensproeiervloeistof',
  'gehandicaptenplek',
  'migratieroute',
  'bouwkundige',
  'cohesie',
  'identificatienummer',
  'studentenuitwisselingsprogramma',
  'industrialisatie',
  'dromedarissen',
  'cadeau',
  'bergbeklimmer',
  'goedgemutst',
  'vastgoedbeleggingsmaatschappij',
  'cappuccino',
  'pyjamabroek',
  'zenuwinzinking',
  'pedagogisch',
  'beenmergpunctie',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//verborgen woord
function displayWord() {
  wordElement.innerHTML = `
${selectedWord
  .split('')
  .map(
    (letter) =>
      `<span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </span>`
  )
  .join('')}
`;
  const innerWord = wordElement.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Gefeliciteerd, je hebt het woord geraden! 👍';
    wordPlayed.innerText = '';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Verkeerde letters</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Je hebt het woord niet geraden! ☹️';
    wordPlayed.innerText = `Het woord was: ${selectedWord}`;
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//letter indrukken
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

//spel herstarten
playAgainButton.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  popup.style.display = 'none';
});

displayWord();
