let $ = document
let addBookBtn = $.querySelector('.add-btn')
let titleInputElem = $.querySelector('#title')
let authorInputElem = $.querySelector('#author')
let yearInputElem = $.querySelector('#year')
let BooksContainer = $.querySelector('#book-list')
let Books = []

addBookBtn.addEventListener('click', function (event) {
    event.preventDefault()
    let TitleInputValue = titleInputElem.value
    let AuthorInputValue = authorInputElem.value
    let yearInputValue = yearInputElem.value

    if (TitleInputValue === '' || AuthorInputValue === '' || yearInputValue === '') {
        alert('لطفا همه قسمت ها را تکمیل کنید')
    } else {
        let NewBookObject = {
            id: Books.length + 1,
            title: TitleInputValue,
            author: AuthorInputValue,
            year: yearInputValue
        }

        Books.push(NewBookObject)
        
        setIntoLocalStorage(Books)
    }

    
})

function setIntoLocalStorage (allBooksArray) {
    localStorage.setItem('books', JSON.stringify(allBooksArray))
    makeEmptyInput()
    BooksGenerator(allBooksArray)
}

function makeEmptyInput () {
    titleInputElem.value = ''
    authorInputElem.value = ''
    yearInputElem.value = ''
    titleInputElem.focus()
}

function BooksGenerator (allBooksArray) {

    BooksContainer.innerHTML = ''

    allBooksArray.forEach(function (book) {
        NewBookTrElem = $.createElement('tr')

        let newBookTitleTh = $.createElement('th')
        newBookTitleTh.innerHTML = book.title

        let newBookAuthorTh = $.createElement('th')
        newBookAuthorTh.innerHTML = book.author

        let newBookYearTh = $.createElement('th')
        newBookYearTh.innerHTML = book.year

        NewBookTrElem.append(newBookTitleTh, newBookAuthorTh, newBookYearTh)

        
        BooksContainer.append(NewBookTrElem)
    })
}

function getBookFromLocalStorage() {
    let localStorageBooks = localStorage.getItem('books')

    if (localStorageBooks) {
        Books = JSON.parse(localStorageBooks)
        BooksGenerator(Books)
    }
    
}

window.addEventListener('load', getBookFromLocalStorage)