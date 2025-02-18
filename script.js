const myLibrary = [];

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function() {
        let str = this.title + " by " + this.author + ", " + this.numPages + " pages";
        if (haveRead) {
            return str + ", has been read"
        } 

        return str + ", not read yet"
    }
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
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("project");


    const bookButtonContainer = document.createElement("div");
    bookButtonContainer.classList.add("buttonContainer");

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = book.title;

    const subtextDiv = document.createElement("div");
    subtextDiv.classList.add("subtext");
    subtextDiv.textContent = book.info();

    const removeButton = document.createElement("BUTTON");
    removeButton.classList.add("removeButton");
    removeButton.textContent = "remove";
    removeButton.onclick = () => removeBook(book)


    const readButton = document.createElement("BUTTON");
    readButton.classList.add("readButton");
    readButton.textContent = "read";
    readButton.onclick = () => readBook(book, readButton);

    if (book.haveRead) {
        readButton.style.display = "none"
    }

    textDiv.appendChild(titleDiv);
    textDiv.appendChild(subtextDiv);
    bookContainer.appendChild(textDiv);
    bookContainer.appendChild(bookButtonContainer);
    bookButtonContainer.appendChild(readButton);
    bookButtonContainer.appendChild(removeButton);
    container.appendChild(bookContainer);
};

const removeBook = (book) => {
    let index = myLibrary.indexOf(book);
    
    myLibrary.splice(index, 1);

    displayLibrary()
}

const readBook = (book, element) => {
    book.hasRead()
    element.style.display = "none"

    displayLibrary()
}

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

addBookToLibrary()