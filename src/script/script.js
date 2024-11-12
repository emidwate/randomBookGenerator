"use strict"

const DATA = JSON.parse(localStorage.getItem("arrayOfBooks"))
let rollButton = document.querySelector(".roll-btn")
const bookContainer = document.querySelector(".book-list")
const sortElement = document.querySelector(".select-item")
const searchInput = document.querySelector(".search-input")
const availableBooksElem = document.querySelector(".available-books")
let randomBooks

rollButton?.addEventListener("click", () => {
    const inputBooksField = document.querySelector(".number-of-books")
    const userBookQuantity = inputBooksField.value
                    
    if (userBookQuantity){
        randomBooks = randomBooksArr(DATA, userBookQuantity);
        
        if (bookContainer.hasChildNodes()) {                  
            clearCurrentBookList()
        }
        
        if (userBookQuantity != "") {
            inputBooksField.value = ''
        }
        
    createBook(randomBooks)
    }
})

sortElement?.addEventListener("change", ()=> {
    const choice = sortElement.options[sortElement.selectedIndex].value
    sortBy(choice)
})

searchInput?.addEventListener("input", () => {
    let userSearchInput = searchInput.value
    
    if (userSearchInput !== "") {    
        
        let foundedBooksArr = []
    
        for (let book of DATA) {
            if (book.author.includes(userSearchInput)) {
                const div = createHTMLTag("div", ["innerText", "className","onclick", "img", "url"], [`Author: ${book.author} Title: ${book.title} Epoch: ${book.epoch}`, `add-to-bookshelf cursor-pointer mb-4 hover:border-dotted`, addToLocalStorage, book.simple_thumb, book.url])
                foundedBooksArr.push(div)
            }
        }

        if (foundedBooksArr) {
            availableBooksElem.append(...foundedBooksArr)                                        
        }

    } else availableBooksElem.innerText = ''
})

function roll(min, max, floatFlag) {
    const r = Math.random() * (max - min) + min
    return floatFlag ? r : Math.floor(r)
}

function randomBooksArr(arrBooks, reqQuantity) {
    let arrOfRandomBooks = []
    
    for(let i = 0; i < reqQuantity; i++) {
        let randomNum = roll(0, arrBooks.length)
        arrOfRandomBooks.push(arrBooks[randomNum])
    }
    return arrOfRandomBooks
}

function clearCurrentBookList() {
    bookContainer.textContent = ''
}

function sortBy(choice) {
    switch(choice) {
        case "Sort by author A-Z":
            clearCurrentBookList()
            const byAuthorAZ = randomBooks.sort((a, b) => a.author > b.author);
            createBook(byAuthorAZ)
            break;
        case "Sort by author Z-A":
            clearCurrentBookList()
            const byAuthorReverse = randomBooks.sort((a, b) => a.author > b.author).reverse()
            createBook(byAuthorReverse)
            break;
        case "Sort by kind A-Z":
            clearCurrentBookList()
            const byKind = randomBooks.sort((a,b) => a.kind > b.kind)
            createBook(byKind)
            break;
        case "Sort by title A-Z":
            clearCurrentBookList()
            const byTitle = randomBooks.sort((a,b) => a.title > b.title)
            createBook(byTitle)
            break;
                        
    }
}

function createHTMLTag(tagName, options, values) {
    const element = document.createElement(tagName)
    options.forEach((option, index) => {
        element[option] = values[index]
    })
    return element
}

function createBook(arrBooks) {
    const div = createHTMLTag("div",["className"],["mt-8 mb-32"])
    
    for (let book of arrBooks) {

        function takeNecessaryData() {
            addToLocalStorage({
                    target: {
                        innerText: p.innerText,
                        img: img.src,
                        url: a.href
                    }
                }   
            )
            button.innerText = "Added to bookshelf!"
        }

        const img = createHTMLTag("img", ["src", "className", "alt"], [book.simple_thumb, "w-48 mb-4", book.title])
        const p = createHTMLTag('p', ['innerText','className'], [`Author: ${book.author} title: ${book.title} kind: ${book.kind}`, "mb-2 w-60"])
        const a = createHTMLTag("a", ["href", "innerText", "className", "target"], [book.url, "Link to website", "mb-2 p-2 bg-[#1F958F] rounded-xl", "_blank"])
        const button  = createHTMLTag("button", ["innerText", "className", "onclick"], ['Add to bookshelf',"p-2 bg-[#1F958F] rounded-xl", takeNecessaryData])
        const innerDiv = createHTMLTag("div", ["className"], ["flex flex-col items-center w-full text-center mb-12"])

        innerDiv.append(...[img, p, a, button])
        div.appendChild(innerDiv)
    }
    render(div)
}

function render(elem) {
    bookContainer.appendChild(elem)
}

function addToLocalStorage(e) {
    let booksArrayToStore = JSON.parse(localStorage.getItem("bookshelf")) || []
    booksArrayToStore.push({text: e.target.innerText, src: e.target.img, url: e.target.url, uniqueId: "id" + Math.random().toString(16).slice(2)})
    localStorage.setItem("bookshelf", JSON.stringify(booksArrayToStore))
}

export {createHTMLTag, DATA, addToLocalStorage, roll}