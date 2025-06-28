const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('search-input');
const resultContainer = document.getElementById('result-container');
const themeSwitch = document.getElementById('theme-switch');
const fontSelect = document.getElementById('font-select');

// Handle theme switch
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Handle font change
fontSelect.addEventListener('change', () => {
  document.body.style.fontFamily = fontSelect.value;
});

// Fetch word definition
searchBtn.addEventListener('click', () => {
  const word = input.value.trim();
  if (word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(res => res.json())
      .then(data => displayResult(data[0]))
      .catch(() => {
        resultContainer.innerHTML = `<p>Word not found.</p>`;
      });
  }
});

// Display results
function displayResult(data) {
  const { word, phonetics, meanings, sourceUrls } = data;
  const phonetic = phonetics.find(p => p.text)?.text || '';
  const audio = phonetics.find(p => p.audio)?.audio || '';

  let html = `
    <h2>${word}</h2>
    <p class="phonetic">${phonetic}</p>
    ${audio ? `<audio controls src="${audio}"></audio>` : ''}`;

  meanings.forEach(meaning => {
    html += `
      <div class="part-of-speech">${meaning.partOfSpeech}</div>
      <ul>
        ${meaning.definitions.map(d => `<li>${d.definition}</li>`).join('')}
      </ul>
      ${meaning.synonyms?.length ? `<div class="synonyms">Synonyms: ${meaning.synonyms.join(', ')}</div>` : ''}
    `;
  });

  html += `<p><a href="${sourceUrls[0]}" target="_blank">Source</a></p>`;
  resultContainer.innerHTML = html;
}
