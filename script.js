document.addEventListener('DOMContentLoaded', () => {

    // Element References
    const dictionarySection = document.getElementById('dictionary-section');
    const constellationsSection = document.getElementById('constellations-section');
    const historySection = document.getElementById('history-section');
    const dictionaryGrid = document.getElementById('dictionary-grid');
    const constellationsGrid = document.getElementById('constellations-grid');

    const btnDictionary = document.getElementById('btn-dictionary');
    const btnConstellations = document.getElementById('btn-constellations');
    const btnHistory = document.getElementById('btn-history');

    // Load Data from global variable
    try {
        renderDictionary(appData.words);
        renderConstellations(appData.constellations);
    } catch (error) {
        console.error('There was a problem loading the data:', error);
        dictionaryGrid.innerHTML = '<p>Error loading data. Please check the console.</p>';
    }

    // Event Listeners for Tab Switching
    btnDictionary.addEventListener('click', () => {
        showSection('dictionary');
    });

    btnConstellations.addEventListener('click', () => {
        showSection('constellations');
    });

    btnHistory.addEventListener('click', () => {
        showSection('history');
    });

    // Function to Switch Sections
    function showSection(sectionName) {
        // Reset all
        dictionarySection.style.display = 'none';
        constellationsSection.style.display = 'none';
        historySection.style.display = 'none';

        btnDictionary.classList.remove('active');
        btnConstellations.classList.remove('active');
        btnHistory.classList.remove('active');

        // Show selected
        if (sectionName === 'dictionary') {
            dictionarySection.style.display = 'block';
            btnDictionary.classList.add('active');
        } else if (sectionName === 'constellations') {
            constellationsSection.style.display = 'block';
            btnConstellations.classList.add('active');
        } else if (sectionName === 'history') {
            historySection.style.display = 'block';
            btnHistory.classList.add('active');
        }
    }

    // Function to Render Dictionary Words
    function renderDictionary(words) {
        dictionaryGrid.innerHTML = ''; // Clear existing content

        words.forEach(word => {
            const card = document.createElement('div');
            card.className = 'card';

            // Handle optional image
            let imageHtml = '';
            if (word.image && word.image !== '') {
                imageHtml = `<div class="card-image"><img src="${word.image}" alt="${word.cree}"></div>`;
            }

            // Extract the example if it exists
            let mainDef = word.definition || '';
            let exampleText = '';

            if (mainDef.includes('\nExample: ')) {
                const parts = mainDef.split('\nExample: ');
                mainDef = parts[0];
                exampleText = parts[1];
            } else if (mainDef.includes('Example: ')) {
                const parts = mainDef.split('Example: ');
                mainDef = parts[0];
                exampleText = parts[1];
            }

            // Clean quotes if any
            exampleText = exampleText.replace(/^"|"$/g, '').trim();
            let backContent = exampleText ? `"${exampleText}"` : 'No example provided.';

            // Format Pronunciation
            let pronunciationHtml = word.pronunciation ? `<div class="pronunciation">[${word.pronunciation}]</div>` : '';

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        ${imageHtml}
                        <div class="card-content">
                            <div class="cree-word">${word.cree}</div>
                            <div class="english-word">${word.english}</div>
                            <div class="definition">${mainDef}</div>
                        </div>
                    </div>
                    <div class="card-back">
                        <div class="card-content">
                            <div class="cree-word">${word.cree}</div>
                            ${pronunciationHtml}
                            <hr style="width: 50%; border-color: var(--accent-color); margin: 1.5rem auto;">
                            <div class="english-word">Example usage</div>
                            <div class="definition example-text">${backContent}</div>
                        </div>
                    </div>
                </div>
            `;

            dictionaryGrid.appendChild(card);

            // Add click listener for flipping
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
            });
        });
    }

    // Function to Render Constellations
    function renderConstellations(constellations) {
        constellationsGrid.innerHTML = ''; // Clear existing content

        constellations.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            // Handle optional image
            let imageHtml = '';
            if (item.image && item.image !== '') {
                imageHtml = `<div class="card-image"><img src="${item.image}" alt="${item.creeName}"></div>`;
            }

            // Format Pronunciation
            let pronunciationHtml = item.pronunciation ? `<div class="pronunciation">[${item.pronunciation}]</div>` : '';

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        ${imageHtml}
                        <div class="card-content">
                            <div class="cree-word">${item.creeName}</div>
                            <div class="english-word">${item.englishName}</div>
                            <div class="definition">${item.description}</div>
                        </div>
                    </div>
                    <div class="card-back">
                        <div class="card-content">
                            <div class="cree-word">${item.creeName}</div>
                            ${pronunciationHtml}
                            <hr style="width: 50%; border-color: var(--accent-color); margin: 1.5rem auto;">
                            <div class="english-word">About</div>
                            <div class="definition example-text">${item.description || 'Not available'}</div>
                        </div>
                    </div>
                </div>
            `;

            constellationsGrid.appendChild(card);

            // Add click listener for flipping
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
            });
        });
    }
});
