document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#search-bar");
  const themeSwitcher = document.querySelector("#theme-switcher");
  const body = document.body;
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const articles = document.querySelectorAll("article.book");

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const books = document.querySelectorAll("article.book");

    books.forEach((book) => {
      const title = book.querySelector("h2").textContent.toLowerCase();
      const author = book.querySelector("p").textContent.toLowerCase();
      const description = book
        .querySelector("p")
        .nextElementSibling.textContent.toLowerCase();

      if (
        title.includes(query) ||
        author.includes(query) ||
        description.includes(query)
      ) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });

  // Handle author link click
  document.querySelectorAll('a[href^="author.html"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const authorName = new URL(this.href).searchParams.get("name");
      // Navigate to author page with query parameter
      window.location.href = `author.html?name=${encodeURIComponent(
        authorName
      )}`;
    });
  });

  // Theme switcher logic
  themeSwitcher.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add("light");
      header.classList.remove("dark");
      header.classList.add("light");
      footer.classList.remove("dark");
      footer.classList.add("light");
      articles.forEach((article) => {
        article.classList.remove("dark");
        article.classList.add("light");
      });
      themeSwitcher.classList.remove("dark");
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      header.classList.remove("light");
      header.classList.add("dark");
      footer.classList.remove("light");
      footer.classList.add("dark");
      articles.forEach((article) => {
        article.classList.remove("light");
        article.classList.add("dark");
      });
      themeSwitcher.classList.add("dark");
    }
  });

  // Handle download dropdown show/hide
  document.querySelectorAll(".download-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", function () {
      this.querySelector(".download-content").classList.add("show");
    });
    dropdown.addEventListener("mouseleave", function () {
      this.querySelector(".download-content").classList.remove("show");
    });
  });
});
