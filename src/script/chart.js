import {createHTMLTag, DATA, addToLocalStorage} from "./script.js"

const availableBooksElem = document.querySelector(".available-books")
const searchInput = document.querySelector(".search-input")
const ctx = document.getElementById('myChart')
const labels = ["Dolnośląskie", "Kujawsko-pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie", "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie", "Warmińsko-mazurskie", "Wielkopolskie", "Zachodniopomorskie"]
const urbanData = [15, 19, 16.8, 17, 18, 12, 14, 17, 18, 16, 12, 16, 19, 18, 19, 15.2]
const ruralData = [14, 16, 15, 14.8, 15, 14.5, 15.3, 14.5, 17.3, 18, 15 ,16.4, 15.3, 17.5, 16, 14.8]

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


new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
            label: 'Urban area',
            data: urbanData,
            backgroundColor: 'rgb(255, 229, 180)',
            borderColor: 'rgb(255, 229, 180)'
        }, 
        {
            label: 'Rural area',
            data: ruralData,
            backgroundColor: 'rgb(226, 223, 210)',
            borderColor: 'rgb(226, 223, 210)'
        }
      ]
    },
    options: {
        indexAxis: 'y',
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
              display: true,
              text: 'Loans of collection in volumes per 1 reader in public libraries in 2020',
              color: '#ffffff'
            },
        },
        scales: {
            y: {
              ticks: { color: '#ffffff' }
            },
            x: {
              ticks: { color: '#ffffff' }
            }
          }
    }
})