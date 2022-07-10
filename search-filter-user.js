const result = document.querySelector(".user-list")
const input = document.querySelector(".input-filter")
const userList = []

getData()

input.addEventListener("input",function (event){
    dataFilter(event.target.value)
})

// asynchronní JavaScript, pokud je nějaký kód pod touto funkcí, JS nečeká na její dokončení (může to být datově náročné) a normálně pokračuje dál v kódu, jedná se o tzv. asynchronní JS, synchronní naopak jede postupně a plní řádek po řádku.
async function getData(){
    // fetch nám stáhne vysledky z dané url, await znamená, že to počká nejdřív na stažení, než to vloží do user listu
    const allUsers = await fetch("https://randomuser.me/api?results=50")
    const data = await allUsers.json()
    console.log(data)
    // vyčistí seznam uživatelů
    result.innerHTML = ""

    data.results.forEach(user => {
        const li = document.createElement("li")
        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-information">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>${user.location.city},${user.location.country}</p>
            </div>
        `

        result.appendChild(li)

        // vyhledávání uživatelů
        userList.push(li)
    })
}

function dataFilter(inputText){
    userList.forEach(oneUser => {
        if(oneUser.textContent.toLowerCase().includes(inputText.toLowerCase())){
            oneUser.classList.remove("hide")
        } else {
            oneUser.classList.add("hide")
        }
    })
}