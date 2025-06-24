import axios from 'axios';

const baseUrl = "http://localhost:5000";

console.log("Fetching all books details in async");

// Task 10
let allBooksPromise = new Promise((resolve, reject) => {
    console.log("Calling all books api");
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => resolve(JSON.stringify(data, null, 4)))
    .catch(e => reject("Error occured: " + e));
}).then(data => {
    console.log(data);
    console.log("Calling all books api is completed");
});


// Task 11
async function fetchBookByISBN() {
    await axios.get(baseUrl + "/isbn/3")
    .then(response => console.log(response.data))
    .catch(err => console.log("Error occured: " + err));
}

async function callFetchBookByISBN() {
    console.log("Before calling fetchBookByISBN");
    await fetchBookByISBN();
    console.log("After calling fetchBookByISBN");
}

callFetchBookByISBN();

// Task 12
let fetchBookByAuthor = new Promise((resolve, reject) => {
    console.log("Calling fetchBookByAuthor api");
    axios.get(baseUrl + "/author/Unknown")
    .then(response => response.data)
    .then(data => resolve(JSON.stringify(data, null, 4)))
    .catch(e => reject("Error occured: " + e));
}).then(data => {
    console.log(data);
    console.log("Calling fetchBookByAuthor api is completed");
});


// Task 13
let fetchBookByTitle = new Promise((resolve, reject) => {
    console.log("Calling fetchBookByTitle api");
    fetch(baseUrl + "/title/The Book Of Job")
    .then(response => response.json())
    .then(data => resolve(JSON.stringify(data, null, 4)))
    .catch(e => reject("Error occured: " + e));
}).then(data => {
    console.log(data);
    console.log("Calling fetchBookByTitle api is completed");
});
