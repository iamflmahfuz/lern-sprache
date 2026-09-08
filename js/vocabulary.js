let vocabulary = [];

const searchInput = document.getElementById("searchInput");
const levelFilter = document.getElementById("levelFilter");
const typeFilter = document.getElementById("typeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const vocabularyContainer = document.getElementById("vocabularyContainer");


// ================================
// LOAD VOCABULARY
// ================================

async function loadVocabulary() {
    try {
        const response = await fetch("../data/vocabulary.json");

        if (!response.ok) {
            throw new Error("Vocabulary file could not be loaded.");
        }

        vocabulary = await response.json();

        createCategoryFilter();
        renderVocabulary(vocabulary);

    } catch (error) {
        console.error(error);

        vocabularyContainer.innerHTML = `
            <div class="no-results">
                <h3>Unable to load vocabulary</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}


// ================================
// CREATE CATEGORY FILTER
// ================================

function createCategoryFilter() {

    if (!categoryFilter) return;

    const categories = [
        ...new Set(
            vocabulary
                .map(item => item.category)
                .filter(category => category)
        )
    ];

    categories.sort((a, b) => a.localeCompare(b, "de"));

    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.map(category => `
            <option value="${category}">${category}</option>
        `).join("")}
    `;
}


// ================================
// FILTER VOCABULARY
// ================================

function filterVocabulary() {

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedLevel = levelFilter
        ? levelFilter.value
        : "all";

    const selectedType = typeFilter
        ? typeFilter.value
        : "all";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";


    const filtered = vocabulary.filter(item => {

        const matchesSearch =
            item.word.toLowerCase().includes(searchTerm) ||
            item.english.toLowerCase().includes(searchTerm) ||
            item.bangla.toLowerCase().includes(searchTerm);

        const matchesLevel =
            selectedLevel === "all" ||
            item.level === selectedLevel;

        const matchesType =
            selectedType === "all" ||
            item.type === selectedType;

        const matchesCategory =
            selectedCategory === "all" ||
            item.category === selectedCategory;

        return (
            matchesSearch &&
            matchesLevel &&
            matchesType &&
            matchesCategory
        );
    });


    renderVocabulary(filtered);
}


// ================================
// RENDER VOCABULARY
// ================================

function renderVocabulary(words) {

    if (!vocabularyContainer) return;

    if (words.length === 0) {

        vocabularyContainer.innerHTML = `
            <div class="no-results">
                <h3>No vocabulary found</h3>
                <p>Try another search or filter.</p>
            </div>
        `;

        return;
    }


    vocabularyContainer.innerHTML = words.map(item => `

        <div class="vocabulary-card">

            <div class="vocabulary-top">

                <span class="vocabulary-level">
                    ${item.level}
                </span>

                <span class="vocabulary-type">
                    ${item.type}
                </span>

            </div>


            <div class="vocabulary-category">
                ${item.category || ""}
            </div>


            <!-- CLICKABLE GERMAN WORD -->

            <button
                class="vocabulary-word"
                type="button"
                onclick="speakGerman(${JSON.stringify(item.word)})"
                title="Click to hear pronunciation"
            >
                ${item.article ? item.article + " " : ""}
                ${item.word}
                <span class="speaker-icon">🔊</span>
            </button>


            ${
                item.plural
                ? `<p class="vocabulary-plural">
                        Plural: <strong>${item.plural}</strong>
                   </p>`
                : ""
            }


            ${
                item.pronunciation
                ? `<p class="vocabulary-pronunciation">
                        🔊 ${item.pronunciation}
                   </p>`
                : ""
            }


            <div class="vocabulary-meaning">

                <p>
                    <strong>English:</strong>
                    ${item.english}
                </p>

                <p>
                    <strong>বাংলা:</strong>
                    ${item.bangla}
                </p>

            </div>


            <div class="vocabulary-example">

                <p>
                    <strong>🇩🇪</strong>
                    ${item.example}
                </p>

                <p>
                    <strong>🇬🇧</strong>
                    ${item.exampleEnglish}
                </p>

                <p>
                    <strong>🇧🇩</strong>
                    ${item.exampleBangla}
                </p>

            </div>

        </div>

    `).join("");
}


// ================================
// GERMAN PRONUNCIATION
// ================================

function speakGerman(text) {

    // Stop any previous pronunciation
    window.speechSynthesis.cancel();

    // Create German speech
    const speech = new SpeechSynthesisUtterance(text);

    // German language
    speech.lang = "de-DE";

    // Natural beginner-friendly speed
    speech.rate = 0.85;

    // Normal pitch
    speech.pitch = 1;

    // Speak
    window.speechSynthesis.speak(speech);
}


// ================================
// EVENT LISTENERS
// ================================

if (searchInput) {
    searchInput.addEventListener("input", filterVocabulary);
}

if (levelFilter) {
    levelFilter.addEventListener("change", filterVocabulary);
}

if (typeFilter) {
    typeFilter.addEventListener("change", filterVocabulary);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterVocabulary);
}


// ================================
// START
// ================================

loadVocabulary();
