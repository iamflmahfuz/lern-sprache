let vocabulary = [];


const vocabularyContainer =
    document.getElementById("vocabularyContainer");

const searchInput =
    document.getElementById("searchInput");

const levelFilter =
    document.getElementById("levelFilter");

const typeFilter =
    document.getElementById("typeFilter");



async function loadVocabulary() {

    try {

        const response =
            await fetch("../data/vocabulary.json");

        const data =
            await response.json();

        vocabulary =
            data.vocabulary;

        displayVocabulary();

    }

    catch (error) {

        console.error(error);

        vocabularyContainer.innerHTML = `

            <p class="error">
                Unable to load vocabulary.
            </p>

        `;

    }

}



function displayVocabulary() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedLevel =
        levelFilter.value;


    const selectedType =
        typeFilter.value;


    const filteredWords =
        vocabulary.filter(word => {


            const matchesSearch =

                word.word
                    .toLowerCase()
                    .includes(search)

                ||

                word.english
                    .toLowerCase()
                    .includes(search)

                ||

                word.bangla
                    .toLowerCase()
                    .includes(search);


            const matchesLevel =

                selectedLevel === "ALL"

                ||

                word.level === selectedLevel;


            const matchesType =

                selectedType === "ALL"

                ||

                word.type === selectedType;


            return (

                matchesSearch

                &&

                matchesLevel

                &&

                matchesType

            );

        });


    vocabularyContainer.innerHTML = "";


    if (filteredWords.length === 0) {

        vocabularyContainer.innerHTML = `

            <div class="no-results">

                <h3>
                    No words found
                </h3>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;

    }


    filteredWords.forEach(word => {

        const card =
            document.createElement("div");


        card.className =
            "vocab-card";


        card.innerHTML = `

            <div class="vocab-card-top">

                <span class="vocab-level">
                    ${word.level}
                </span>

                <span class="vocab-type">
                    ${word.type}
                </span>

            </div>


            <h2 class="vocab-word">

                ${word.word}

            </h2>


            ${
                word.article

                ?

                `<p class="vocab-grammar">

                    ${word.article}
                    •
                    Plural:
                    ${word.plural}

                </p>`

                :

                ""
            }


            <div class="vocab-meaning">

                <p>

                    <strong>
                        English:
                    </strong>

                    ${word.english}

                </p>


                <p>

                    <strong>
                        বাংলা:
                    </strong>

                    ${word.bangla}

                </p>

            </div>


            <div class="vocab-example">

                <strong>
                    Beispiel:
                </strong>

                <p>
                    ${word.example}
                </p>

            </div>

        `;


        vocabularyContainer.appendChild(card);

    });

}



searchInput.addEventListener(
    "input",
    displayVocabulary
);


levelFilter.addEventListener(
    "change",
    displayVocabulary
);


typeFilter.addEventListener(
    "change",
    displayVocabulary
);


loadVocabulary();
