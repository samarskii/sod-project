document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.querySelector("#book-list");
  const authorBooks = document.querySelector("#author-books");
  const themeSwitcher = document.querySelector("#theme-switcher");
  const body = document.body;
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  // Function to determine the current theme
  function getCurrentTheme() {
    return body.classList.contains("dark") ? "dark" : "light";
  }

  // Function to generate book HTML
  function generateBookHTML(book) {
    const currentTheme = getCurrentTheme();
    return `
      <article class="book ${currentTheme}">
        <h2>${book.title}</h2>
        <p>Description: ${book.description}</p>
        <p>Authors: ${book.authors
          .map((author) => `<a href="${author.page}">${author.name}</a>`)
          .join(" ")}</p>
        <!--
        <p>Tags: ${book.tags
          .map((tag) => `<span class="hashtag">#${tag}</span>`)
          .join(" ")}</p>
        --!>
        <p>Download:
          <a href="${book.downloads.pdf}" download>PDF</a> |
          <a href="${book.downloads.epub}" download>EPUB</a> |
          <a href="${book.downloads.fb2}" download>FB2</a>
        </p>
      </article>
    `;
  }

  // Function to display books in the specified container
  function displayBooks(books, container) {
    container.innerHTML = books.map((book) => generateBookHTML(book)).join("");
  }

  // Display books on the main page
  if (bookList) {
    displayBooks(books, bookList);
  }

  // Display books on the author pages
  if (authorBooks) {
    const authorName = document.querySelector("h1").textContent.trim();
    const authorBooksList = books.filter((book) =>
      book.authors.some((author) => author.name === authorName)
    );
    displayBooks(authorBooksList, authorBooks);
  }

  // Theme switcher functionality
  if (themeSwitcher) {
    themeSwitcher.addEventListener("click", () => {
      const isDark = body.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";
      const oldTheme = isDark ? "dark" : "light";

      body.classList.remove(oldTheme);
      body.classList.add(newTheme);
      header.classList.remove(oldTheme);
      header.classList.add(newTheme);
      footer.classList.remove(oldTheme);
      footer.classList.add(newTheme);

      const books = document.querySelectorAll("article.book");
      books.forEach((article) => {
        article.classList.remove(oldTheme);
        article.classList.add(newTheme);
      });

      themeSwitcher.classList.remove(oldTheme);
      themeSwitcher.classList.add(newTheme);
    });
  }
});

// Sample books data
const books = [
  {
    title: "Sentences Porphyry",
    description: "A brief description of Sentences Porphyry.",
    tags: ["Philosophy", "Religion"],
    downloads: {
      pdf: "books/Sentences_Porphyry_SOD_Project.pdf",
      epub: "books/Sentences_Porphyry_SOD_Project.epub",
      fb2: "books/Sentences_Porphyry_SOD_Project.fb2",
    },
    authors: [
      { name: "Porphyry", page: "../Authors/Porphyry.html" }, // Correct relative path
      { name: "Isaak Samarskyi", page: "../Authors/Samarskyi.html" },
    ],
  },
  // Add more books here
];
