const myLibrary = [];

function Book(author, title, pagesCount, readStatus) {
    this.author = author;
    this.title = title;
    this.pagesCount = pagesCount;
    this.readStatus = readStatus;
    this.uid = crypto.randomUUID();
}

function addBookToLibrary(author, title, pagesCount, readStatus) {
    const book = new Book(author, title, pagesCount, readStatus);
    myLibrary.push(book);
}

function displayBook() { };


// Dialog functions
function bookDialogEvents() {
    const addBook = document.querySelector(".add-book");
    const close = document.querySelector(".close-button");
    const confirm = document.querySelector(".confirm-button");

    addBook.addEventListener('click', () => {
        openBookDialog();
    });
    close.addEventListener('click', () => {
        closeBookDialog();
        clearText()
    });
    confirm.addEventListener('click', () => {
        getUserInput();
        closeBookDialog();
        rendering();
        clearText()
    });

};

function openBookDialog() {
    const dialog = document.querySelector("dialog");
    dialog.showModal();

}

function closeBookDialog() {
    const dialog = document.querySelector("dialog");
    dialog.close();

};

function getUserInput() {
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#author").value;
    const pagesCount = document.querySelector("#page-count").value;
    const readStatus = document.querySelector("#read-status").checked;
    addBookToLibrary(author, title, pagesCount, readStatus);
}

function clearText() {
    const bookTitle = document.querySelector("#book-title");
    const author = document.querySelector("#author");
    const pagesCount = document.querySelector("#page-count");
    const checkbox = document.querySelector("#read-status");
    bookTitle.value = "";
    author.value = "";
    pagesCount.value = "";
    checkbox.checked = false;
};

// rendering

function rendering() {
    const booksContainer = document.querySelector(".books-container")
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }

    for (const arr of myLibrary) {
        const book = document.createElement("div");
        const deleteContainer = document.createElement("div");
        const deleteBtn = document.createElement("div");
        const bookTitle = document.createElement("p");
        const author = document.createElement("p");
        const pagesCount = document.createElement("p");
        const readStatus = document.createElement("p");

        // Set Text Content 
        bookTitle.textContent = `Book Title: ${arr.title}`;
        deleteBtn.textContent = `X`;
        author.textContent = `Author: ${arr.author}`;
        pagesCount.textContent = `Book Title: ${arr.pagesCount}`;
        const readStatusText = (arr.readStatus) ? "Yes" : "No";
        readStatus.textContent = `Read Status: ${readStatusText}`;

        // set Classes  
        book.classList.add('book');
        deleteContainer.classList.add('delete');
        // Set Attributes 
        deleteBtn.setAttribute('data-uid', arr.uid);
        readStatus.setAttribute('data-uid', arr.uid);

        // set Events 
        deleteBtn.addEventListener('click', (e) => {
            const getUID = e.target.dataset.uid;
            const index = myLibrary.findIndex((currentElement) => {
                return currentElement.uid === getUID
            });
            myLibrary.splice(index, 1);
            rendering()
        });

        readStatus.addEventListener('click', (e) => {
            const getUID = e.target.dataset.uid;
            const index = myLibrary.findIndex((currentElement) => {
                return currentElement.uid === getUID
            });
            myLibrary[index].readStatus = !myLibrary[index].readStatus;
            rendering()
        })
        // Append children
        booksContainer.appendChild(book);
        book.appendChild(deleteContainer);
        deleteContainer.appendChild(bookTitle);
        deleteContainer.appendChild(deleteBtn);
        book.appendChild(author);
        book.appendChild(pagesCount);
        book.appendChild(readStatus);
    }
}
bookDialogEvents();