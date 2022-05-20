const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))

let bookList = [
    "You Don’t Know JS by Kyle Simpson",
    "Effective JavaScript",
    "A Smarter Way to Learn JavaScript by Mark Myers",
    "Eloquent JavaScript",
    "JavaScript and jQuery: Interactive Front-End Web Development"
];
app.get('/', (req, res) => {
    res.send(" <h1>Hello from root side </h1>")
})
app.get("/book", (req, res) => {
    return res.json({ allbook: bookList })
})


// POST 

app.post("/book", (req, res) => {

    const bookName = req.body.name

    if (bookList.includes(bookName)) {
        return res.json({ success: false })
    }

    bookList.push(bookName)

    return res.json({ success: true })
})

// delete

app.delete("/book", (req, res) => {

    const deleteBook = req.body.name

    bookList = bookList.filter(
        (book) => book !== deleteBook
    )

    return res.json({ allbook: bookList })
})

// update

app.put("/book", (req, res) => {


    const newBook = req.body.name
    const bookUpadate = req.body.newName

    const indexOfBook = bookList.findIndex(
        (book) => book === newBook
    )


    if (indexOfBook === -1) {
        return res.json({ success: false })

    }
    bookList[indexOfBook] = bookUpadate
    return res.json({ success: true })
})

app.listen(PORT, () => {
    console.log(`BOOK API START ON ${PORT}`);
})