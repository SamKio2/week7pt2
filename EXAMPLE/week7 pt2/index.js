// import your http 
const http = import("http")
import fetch from "node-fetch"
const { create } = import("domain")
const { table } = import("console")

// create server with HTTP
const server = http.createServer((req, res) => {
    const url = req.url
    let tableData = "<table border ='1'><tr><th>ID</th><th>Name</th><th>height</th><th>gender</th><th>Birthyear</th><th>url</th></tr>"
    if (url === '/') {
        res.write("<h1>Welcome to my home page</h1>")
        res.end('<img src=https://dummyimage.com/600x400/c700c7/fff>');

    }
    if (url === '/list') {
        fetch('https://swapi.dev/api/people')
            .then(data => {
                createData(data)
                res.write(tableData);
                res.end();
            
            })
    }
    function createData(data) { 
        data.array.forEach((element) => {
            tableData += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.height}</td><td>${element.gender}</td><td>${element.Birthyear}</td><td>${element.url}</td></tr>`

        });
        tableData += `</table>`
    }
    // if(url ==='*') {
    //     res.send("Page Not Found")
    // }

}).listen(8090, console.log(`Server is running on port 8090`))