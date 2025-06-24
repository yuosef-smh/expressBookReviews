const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let matchingUsers = users.filter(user => user.username == username);

    return matchingUsers.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let matchingUsers = users.filter(user => user.username == username && user.password == password)

    return matchingUsers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!isValid(username)) {
        return res.status(404).json({message: "User does not exists"});
    }
    else if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: {username, password}
        }, 'access', {expiresIn: 60 * 60});

        req.session.authorization = {
            accessToken
        }

        return res.status(200).send("User successfully logged in");
    }
    else {
        return res.status(404).json({message: "Wrong username of password"});
    }
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let review = req.query.review;
    let username = req.user.data.username;
    let isbn = req.params.isbn;

    if (!(isbn in books)) {
        return req.status(404).json({message: "Book not found"});
    }

    if (review) {
        books[isbn].reviews[username] = review;

        return res.status(200).json({message: "Your review has been added successfully"});
    }

    return res.status(404).json({message: "Review not found"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let username = req.user.data.username;
    let isbn = req.params.isbn;

    if (!(isbn in books)) {
        return req.status(404).json({message: "Book not found"});
    }

    if (username in books[isbn].reviews) {
        delete books[isbn].reviews[username];
        return res.status(200).json({message: "Your review has been deleted successfully"});
    }

    return res.status(404).json({message: "The user does not have a review"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
