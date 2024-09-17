const myLibrary = [];

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    document.querySelector("#bookTable tbody").innerHTML = myLibrary.map(book => `<tr><td>${book.name}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.status}</td></tr>`).join('');
}

const book1 = new Book("Harry Potter", "J.K. Rowling", "300", "read");
const book2 = new Book("Card Captor Sakura", "CLAMP", "50", "reading");

addBookToLibrary(book1);
addBookToLibrary(book2);

// document.querySelector("#bookTable tbody").innerHTML = myLibrary.map(name => `<tr><td>${book2.name}</td><td>${book2.author}</td><td>${book2.pages}</td><td>${book2.status}</td></tr>`).join('');