let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.title +
         " by " + this.author + ", " +
          pages +
           " pages, " +
           (read === false ? "not read yet." : "read.");
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function createCards() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i] === null) continue;
        createBookCard(myLibrary[i]);
    }
}

function createBookCard(book) {
    const cardContainer = document.querySelector('.book-cards');
    const newBookHtml = getBookHtml(book);
    cardContainer.innerHTML = newBookHtml + cardContainer.innerHTML;
}

function getBookHtml(book) {
    const index = myLibrary.findIndex((value) => value.title === book.title && value.pages === book.pages);
    const htmlCard = 
    `<div class="card ${book.read ? 'read' : ''}" index="${index}">
        <button class="material-symbols-outlined close" index="${index}" onclick="removeBook(${index})">close</button>
        <div class="top">
            <div class="book-title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages} <span>pages</span></div>
        </div>
        <div class="bottom">
            <button class="readButton" onclick="changeReadStatus(${index})"></button> 
        </div>
    </div>`
    return htmlCard;
}

function openBookForm() {
    if (document.querySelector('.card form') !== null) return;

    const htmlForm = 
    `<div class="card form">
        <button class="material-symbols-outlined close" onclick="removeForm()">close</button>
        <form>
            <div class="top">
                <input class="book-title" type="text" name="bookname" id="bookname" placeholder="Book name" required>
                <input class="author" type="text" name="author" id="author" placeholder="Author" required>
                <input class="pages" type="number" name="pages" id="pages" placeholder="Page count" required>
            </div>
            <div class="bottom">
                <button class="confirm" type="submit">Confirm</button>
                <div class="check">
                    <label for="read">Read</label>
                    <input type="checkbox" name="read" id="read">
                </div>
            </div>
        </form>
    </div>`;
    const cardContainer = document.querySelector('.book-cards');
    let currentHtml = cardContainer.innerHTML;
    cardContainer.innerHTML = htmlForm + currentHtml;
    document.querySelector("input.book-title").focus();
    let form = document.querySelector('form');
    form.onsubmit = confirmButtonClick;
}

function confirmButtonClick(event) {
    event.preventDefault();
    const title = document.querySelector('input.book-title').value;
    const author = document.querySelector('input.author').value;
    const pages = document.querySelector('input.pages').value;
    const checked = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, checked);
    createBookCard(myLibrary[myLibrary.length-1]);
    document.querySelector('.card.form').remove();
}

function getBookFromForm() {
    const title = document.querySelector('input.book-title').value;
    const author = document.querySelector('input.author').value;
    const pages = document.querySelector('input.pages').value;
    const checked = document.getElementById('read').checked;
    return new Book(title, author, pages, checked);
}

function removeBook(index) {
    document.querySelector(`.card[index="${index}"]`).remove();
}

function removeForm() {
    document.querySelector('.card.form').remove();
}

function changeReadStatus(index) {
    const isRead = myLibrary[index].read;
    myLibrary[index].read = isRead ? false : true;
    const bookCard = document.querySelector(`.card[index='${index}']`);
    bookCard.classList.toggle('read');
}

addBookToLibrary('La Peste', 'Albert Camus', 336, true);
addBookToLibrary('Les Misérables', 'Victor Hugo', 1662, false);
addBookToLibrary('1984', 'George Orwell', 400, true);

createCards();