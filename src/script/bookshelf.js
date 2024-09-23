import {createHTMLTag, DATA, addToLocalStorage} from "./script.js"

const availableBooksElem = document.querySelector(".available-books")
const searchInput = document.querySelector(".search-input")
const bookshelfDOMElem = document.querySelector(".bookshelf")

searchInput.addEventListener("input", () => {
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

function updateBookshelfContent(content) {
    const div = createHTMLTag("div",["className"],["mt-8 mb-32"])
    const arrayOfBookObjects = JSON.parse(content)

    if (bookshelfDOMElem.hasChildNodes()) {
        bookshelfDOMElem.textContent = ""
    }

    function removeBook(e) {
        let bookToRemove = e.target.parentElement.uniqueId
        for(let book of arrayOfBookObjects) {
            if (book.uniqueId == bookToRemove) {
                arrayOfBookObjects.pop(book)
                localStorage.setItem("bookshelf", JSON.stringify(arrayOfBookObjects))
            }
        }
    }
    if (arrayOfBookObjects && arrayOfBookObjects.length > 0) {
        for (let book of arrayOfBookObjects) {
            const img = createHTMLTag("img", ["src", "className", "alt"], [book.src, "w-48 mb-4", book.title])
            const p = createHTMLTag("p", ["innerText", "className"], [book.text, "mb-2 w-60"])
            const a = createHTMLTag("a", ["href", "innerText", "className", "target"], [book.url, "Link to website", "mb-2 p-2 bg-[#1F958F] rounded-xl", "_blank"])
            const button = createHTMLTag("button", ["innerText", "className", "onclick"], ["Remove from bookshelf", "button p-2 bg-[#1F958F] rounded-xl", removeBook])
            const innerDiv = createHTMLTag("div", ["className", "uniqueId"], ["flex flex-col items-center w-full text-center mb-12", book.uniqueId])
            

            innerDiv.append(...[img, p, a, button])
            div.appendChild(innerDiv)
        }

        bookshelfDOMElem.appendChild(div);
    } else bookshelfDOMElem.innerText = "No books here yet."
}

function checkLocalStorage() {
    let lastContent = localStorage.getItem("bookshefl")
    
    setInterval(() => {
        const currentContent = localStorage.getItem("bookshelf")
        if (currentContent !== lastContent) {
            lastContent = currentContent
            updateBookshelfContent(currentContent)
        }
    }, 1000)
}

checkLocalStorage()