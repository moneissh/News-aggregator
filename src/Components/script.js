// Get the elements from the HTML document
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const newsContainer = document.getElementById("news-container");

// Define the API key and the base URL
const apiKey = "3ab53a4e5310424dbe67f46551b27c21"; // API key from https://newsapi.org/
const baseUrl = "https://newsapi.org/v2/";

// Define a function to fetch and display the news articles
const fetchNews = async (query, category) => {
    // Clear the previous news articles
    newsContainer.innerHTML = "";

    // Construct the URL for the API request
    let url = baseUrl + "top-headlines?country=us&apiKey=" + apiKey;

    // Add the query parameter if it is not empty
    if (query) {
        url += "&q=" + query;
    }

    // Add the category parameter if it is not "all"
    if (category !== "all") {
        url += "&category=" + category;
    }

    // Fetch the data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Check if the data has any articles
    if (data.articles.length > 0) {
        // Loop through the articles and create HTML elements for each one
        for (const article of data.articles) {
            // Create a div element for the article
            const articleDiv = document.createElement("div");
            articleDiv.className = "news-article";

            // Create an image element for the article image
            const articleImage = document.createElement("img");
            articleImage.src = article.urlToImage;
            articleImage.alt = article.title;

            // Create a h3 element for the article title
            const articleTitle = document.createElement("h3");
            articleTitle.textContent = article.title;

            // Create a p element for the article description
            const articleDescription = document.createElement("p");
            articleDescription.textContent = article.description;

            // Create a a element for the article link
            const articleLink = document.createElement("a");
            articleLink.href = article.url;
            articleLink.target = "_blank";
            articleLink.textContent = "Read more";

            // Append the image, title, description, and link to the article div
            articleDiv.appendChild(articleImage);
            articleDiv.appendChild(articleTitle);
            articleDiv.appendChild(articleDescription);
            articleDiv.appendChild(articleLink);

            // Append the article div to the news container
            newsContainer.appendChild(articleDiv);
        }
    } else {
        // If no articles are found, display a message
        newsContainer.innerHTML = "<p>No news articles found.</p>";
    }
};



// Add an event listener for the search button click
searchButton.addEventListener("click", () => {
    // Get the value of the search input
    const query = searchInput.value;

    // Get the value of the category select
    const category = categorySelect.value;

    // Fetch and display the news articles based on the query and category
    fetchNews(query, category);
});

// Add an event listener for the category select change
categorySelect.addEventListener("change", () => {
    // Get the value of the search input
    const query = searchInput.value;

    // Get the value of the category select
    const category = categorySelect.value;

    // Fetch and display the news articles based on the query and category
    fetchNews(query, category);
});

// Fetch and display the news articles when the page loads
fetchNews("", "all");
