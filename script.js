document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const searchInput = document.getElementById('search-input');
    let allData = [];

    // Fetch data
    fetch('data/words.json')
        .then(response => response.json())
        .then(data => {
            allData = data.categories;
            renderData(allData);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            contentDiv.innerHTML = '<p>Error loading dictionary data.</p>';
        });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterAndRender(searchTerm);
    });

    function renderData(categories) {
        contentDiv.innerHTML = '';

        if (categories.length === 0) {
            contentDiv.innerHTML = '<p class="text-center">No words found.</p>';
            return;
        }

        categories.forEach(category => {
            const section = document.createElement('div');
            section.className = 'category-section';

            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = category.name;
            section.appendChild(title);

            category.words.forEach(word => {
                const card = document.createElement('div');
                card.className = 'word-card';
                
                const lebanese = document.createElement('span');
                lebanese.className = 'lebanese-word';
                lebanese.textContent = word.lebanese;

                const english = document.createElement('span');
                english.className = 'english-word';
                english.textContent = word.english;

                card.appendChild(lebanese);
                card.appendChild(english);
                section.appendChild(card);
            });

            contentDiv.appendChild(section);
        });
    }

    function filterAndRender(term) {
        const filteredCategories = [];

        allData.forEach(category => {
            const filteredWords = category.words.filter(word => 
                word.lebanese.toLowerCase().includes(term) || 
                word.english.toLowerCase().includes(term)
            );

            if (filteredWords.length > 0) {
                filteredCategories.push({
                    name: category.name,
                    words: filteredWords
                });
            }
        });

        renderData(filteredCategories);
    }
});
