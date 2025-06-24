const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(404).json({message: "Username or password not found"});
    }
    else if (!isValid(username)) {
        console.log("Username: " + username);
        console.log("Users: " + JSON.stringify(users));
        users.push({username, password});

        res.send("The user has been successfuly created");
    }
    else {
        res.send("The user already exists");
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;


    if (books.hasOwnProperty(isbn)) {
        res.send(JSON.stringify(books[isbn], null, 4));
    }
    else {
        return res.status(404).json({message: "This book is not available"});
    }
    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    const filtered = Object.fromEntries(
        Object.entries(books).filter(([key, value]) => value.author == author)
      );

    res.send(JSON.stringify(filtered, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    const filtered = Object.fromEntries(
        Object.entries(books).filter(([key, value]) => value.title == title)
      );

    res.send(JSON.stringify(filtered, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;


    if (books.hasOwnProperty(isbn)) {
        res.send(JSON.stringify(books[isbn].reviews, null, 4));
    }
    else {
        return res.status(404).json({message: "This book is not available"});
    }
});



module.exports.general = public_users;
