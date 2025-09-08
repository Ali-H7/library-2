const myLibrary = [];

function Book(author, title, pagesCount, readStatus) {
    this.author = author
    this.author = title
    this.author = pagesCount
    this.author = readStatus
}

function addBookToLibrary(author, title, pagesCount, readStatus) {
    const book = new Book(author, title, pagesCount, readStatus);
    myLibrary.push(book);
}

function displayBook() { };