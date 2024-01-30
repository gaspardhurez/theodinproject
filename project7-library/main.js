// BOOK FUNCTIONS 

const myLibrary = []

myLibrary.push(new Book('Bible', 'Jesus', 1000, 'I did read it'))

function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

function addBookToLibrary(title, author, pages, read) {

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

}

// BOOK DISPLAY

const library = document.querySelector('.books')

function displayLibrary() {

    library.textContent = '';

    myLibrary.forEach( (book) => {

        let newBook = document.createElement('div');
        newBook.className = 'book';

        let bookButtons = document.createElement('div');
        let bookButtonRead = document.createElement('span');
        let bookButtonDelete = document.createElement('span');

        bookButtonRead.className = 'material-symbols-outlined';
        bookButtonRead.textContent = 'visibility';
        bookButtonDelete.className = 'material-symbols-outlined';
        bookButtonDelete.textContent = 'close';
        bookButtons.appendChild(bookButtonRead);
        bookButtons.appendChild(bookButtonDelete);
        bookButtons.className = 'book-buttons';
        newBook.appendChild(bookButtons);
    
        for (let prop in book) {
            if (typeof book[prop] !== 'function') {
                let p = document.createElement('p');
                p.textContent = book[prop];
    
                if (typeof book[prop] == 'number') p.textContent = book[prop] + " pages";
                newBook.appendChild(p);
            }
        }
    
        let bookPages = document.createElement('div');
        bookPages.className = 'whitespace';
        
        library.appendChild(newBook);
        library.appendChild(bookPages);
        
    })

}

// INITIAL RENDERING

displayLibrary();


// NEW BOOK OVERLAY

let newBookButton = document.querySelector('.newBook button');
let newBookOverlay = document.querySelector('.newBookOverlay');
let newBookOverlayClose = document.querySelector('.newBookForm > button');

newBookButton.addEventListener('click', () => {

    newBookOverlay.style.display = 'block';

})

newBookOverlayClose.addEventListener('click', () => {

    newBookOverlay.style.display = 'none';

})

// ADDING A NEW BOOK

let newBookSubmitButton = document.querySelector('form > button');

newBookSubmitButton.addEventListener('click', (event) => {

    let bookTitle = document.querySelector('form #title');
    let bookAuthor = document.querySelector('form #author');
    let bookPages = document.querySelector('form #pages');
    let bookRead = document.querySelector('form #read');

    if (bookTitle.value && bookAuthor.value && bookPages.value) {

        event.preventDefault();

        let haveIReadIt = bookRead.checked ? "I have read it" : "I haven't read it yet"

        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, haveIReadIt);

        displayLibrary();

        newBookOverlay.style.display = 'none';
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        bookRead.checked = false;
        
    } else {
        alert('Please fill out all fields');
    }

})

