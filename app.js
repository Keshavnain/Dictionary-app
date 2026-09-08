// https://api.dictionaryapi.dev/api/v2/entries/en/digital 
const input = document.getElementById("WordInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");
const nounButton = document.getElementById("noun");
const verbButton = document.getElementById("verb");
const synonymButton = document.getElementById("synonym");
const antonymButton = document.getElementById("antonym");

button.addEventListener("click", async function (){
    const word = input.value.trim().toLowerCase();
    
    if(word === ""){
        result.textContent = "Please enter a word.";
        return;
    }
     const url = `https://freedictionaryapi.com/api/v1/entries/en/${word} `;

     try {
        result.textContent = "Searching....";

        const response = await fetch(url);
        const data = await response.json();
        
        if(data.error){
            result.textContent = data.error.message;
            return;
        }

        result.innerHTML = `
    <div class="result-card">

        <h2>${data.word}</h2>

        <p class="part">
            ${data.entries[0].partOfSpeech}
        </p>

        <p>
            ${data.entries[0].senses[0].definition}
        </p>

    </div>`;

        //`${data.location.name}: ${data.current.temp_c}°C
     } catch(error) {
        console.log(error);
        result.textContent = "Something went wrong.";
     }
});

nounButton.addEventListener("click", async function () {

    const word = input.value.trim().toLowerCase();

    if (word === "") {
        result.textContent = "Please enter a word.";
        return;
    }

    const url = `https://freedictionaryapi.com/api/v1/entries/en/${word}`;

    const response = await fetch(url);
    const data = await response.json();

    const noun = data.entries.find(
        entry => entry.partOfSpeech === "noun"
    );

    if (noun) {
        result.textContent = noun.senses[0].definition;
    } else {
        result.textContent = "No noun meaning found.";
    }

});
verbButton.addEventListener("click", async function () {

    const word = input.value.trim().toLowerCase();

    if (word === "") {
        result.textContent = "Please enter a word.";
        return;
    }

    const url = `https://freedictionaryapi.com/api/v1/entries/en/${word}`;

    const response = await fetch(url);
    const data = await response.json();

    const verb = data.entries.find(
        entry => entry.partOfSpeech === "verb"
    );

    if (verb) {
        result.textContent = verb.senses[0].definition;
    } else {
        result.textContent = "No verb meaning found.";
    }

});
antonymButton.addEventListener("click", async function () {

    const word = input.value.trim().toLowerCase();

    if (word === "") {
        result.textContent = "Please enter a word.";
        return;
    }

    const url = `https://freedictionaryapi.com/api/v1/entries/en/${word}`;

    const response = await fetch(url);
    const data = await response.json();

    const antonyms =  data.entries[0].senses[3].antonyms;

     result.innerHTML = `
        <h3>antonyms</h3>
        <p>${antonyms.slice(0, 2)}</p>
    `;

});
synonymButton.addEventListener("click", async function () {

    const word = input.value.trim().toLowerCase();

    if (word === "") {
        result.textContent = "Please enter a word.";
        return;
    }

    const url = `https://freedictionaryapi.com/api/v1/entries/en/${word}`;

    const response = await fetch(url);
    const data = await response.json();

    const synonyms =  data.entries[0].senses[2].synonyms;

     result.innerHTML = `
        <h3>Synonyms</h3>
        <p>${synonyms.slice(0, 2)}</p>
    `;

});

// Press Enter to search
input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        button.click();
    }

});