const myLibrary = [];

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

Book.prototype.toggleReadStatus = function() {
    this.haveRead = !this.haveRead
}

function addBookToLibrary(title, author, numPages, haveRead) {
    let book = new Book(title, author, numPages, haveRead);

    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary() {
    const container = document.querySelector(".project-container");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        displayBook(book, container);
    });
}

const displayBook = (book, container) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("bookContainer");

    let bookName = document.createElement('div');
    bookName.textContent = book.title;
    bookName.className = 'title';

    let bookAuthor = document.createElement('div');
    bookAuthor.textContent = book.author;
    bookAuthor.className = 'author';

    let actions = document.createElement("div");
    actions.classList.add("actions");

    let removeButton = document.createElement("BUTTON");
    removeButton.className = 'removeButton';
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeBook(book)

    let readButton = document.createElement("BUTTON");
    readButton.className = 'readButton';
    readButton.textContent = book.haveRead ? "Finished" : "Unread";
    readButton.onclick = () => readBook(book, readButton);
    readButton.style.backgroundColor = book.haveRead ? "#538b4b" : "#dc5f5a"

    actions.append(readButton, removeButton)

    removeButton.addEventListener('click', () => {
        let index = myLibrary.indexOf(book);
        if (index > -1) {
            myLibrary.splice(index, 1)
            displayLibrary();
        }
    })

    readButton.addEventListener('click', () => {
        book.toggleReadStatus();
        readButton.style.backgroundColor = book.haveRead ? "#538b4b" : "#dc5f5a"
        displayLibrary();
    })

    bookContainer.append(bookName, bookAuthor, actions)
    container.appendChild(bookContainer);
};

document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numPages = document.getElementById("numPages").value;
    const haveRead = document.getElementById("haveRead").checked;

    addBookToLibrary(title, author, numPages, haveRead);

    document.getElementById("bookForm").reset();
    closeForm(); 
});

function openForm() {
    document.getElementById("myForm").style.display = "flex";
    document.getElementById("new-book").style.display = "none";

    document.getElementById("form-container").style.height = "105px";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("new-book").style.display = "block";

    document.getElementById("form-container").style.height = "60px";

}

addBookToLibrary("Clean Code: A Handbook of Agile Software Craftsmanship", "Robert C. Martin", 2, false)
addBookToLibrary("Test-Driven Development by Example", "Kent Beck", 2, false)