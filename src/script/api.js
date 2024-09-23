const url = "https://wolnelektury.pl/api/books"

async function fetchData() {
        try {
            const response = await fetch(url)
            const data = await response.json()
            localStorage.setItem("arrayOfBooks", JSON.stringify(data))
        } catch (error) {
        console.error("Error fetching data:", error)
    }
}
  
fetchData()