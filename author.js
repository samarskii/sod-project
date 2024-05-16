document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authorName = urlParams.get("name");

  document.getElementById("author-name").textContent = authorName;

  // Example data - replace with actual data source
  const booksByAuthor = {
    "Isaak Samarskyi": [
      {
        title: "Sentences Porphyry",
        description: "A brief description of Book Title 1.",
        fileBaseName: "Sentences_Porphyry_SOD_Project",
      },
    ],
    "Author Name 2": [
      {
        title: "Book Title 2",
        description: "A brief description of Book Title 2.",
        fileBaseName: "book2",
      },
    ],
  };

  const books = booksByAuthor[authorName] || [];

  const bookList = document.getElementById("author-books");
  books.forEach((book) => {
    const article = document.createElement("article");
    article.className = "book";
    article.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.description}</p>
            <div class="download-dropdown">
                <button class="download-btn">Download</button>
                <div class="download-content">
                    <a href="books/${book.fileBaseName}.pdf" download>PDF</a>
                    <a href="books/${book.fileBaseName}.epub" download>EPUB</a>
                    <a href="books/${book.fileBaseName}.fb2" download>FB2</a>
                </div>
            </div>
        `;
    bookList.appendChild(article);
  });

  // Handle download button click in author page
  document.querySelectorAll(".download-btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.nextElementSibling.classList.toggle("show");
    });
  });
});
