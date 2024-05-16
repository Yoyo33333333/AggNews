// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Function to fetch news articles from NewsAPI based on category
function fetchNewsFromAPI(category) {
    const apiKey = '3991968999b844bab36533bc65292531'; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.articles);
        })
        .catch(error => {
            console.error('Error fetching news articles from NewsAPI:', error);
        });
}

// Function to handle category selection
function handleCategorySelection(category) {
    // Call the fetchNewsFromAPI function to fetch news articles from NewsAPI based on category
    fetchNewsFromAPI(category);
}

// Function to display articles on the webpage
function displayArticles(articles) {
    const newsContainer = document.getElementById('articles-container');
    // Clear any existing content in the news container
    newsContainer.innerHTML = '';

    // Create HTML elements for each article
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// Example: Fetch news articles for the default category (e.g., latest) when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category-select');
    const articlesContainer = document.getElementById('articles-container');
    
    // Function to extract articles from JSON file
    function fetchArticles() {
        fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            articlesContainer.innerHTML = ''; // Clear previous articles
            const selectedCategory = categorySelect.value;
            data.forEach(article => {
                if ((selectedCategory === 'all' || article.category === selectedCategory) && article.content !== null && article.title !== "[Removed]") 
                {
                    articlesContainer.innerHTML += `
                        <div class="article">
                            <h2>${article.title}</h2>
                            <p><strong>Category:</strong> ${article.category}</p>
                            <p>${article.content}</p>
                            <p>Access the full article by following this link : <a href="${article.url}" target="_blank">${article.url}</a></p>
                        </div>
                    `;
                }
            });
        })
        .catch(error => console.error('Error fetching articles:', error));
    }

    // Event listener for category select change
    categorySelect.addEventListener('change', function() {
        fetchArticles();
    });

    // Initial fetch for all articles
    fetchArticles();
});
