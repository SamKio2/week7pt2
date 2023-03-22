import http, { request } from "http";
import axios from "axios";
const PORT = 9090;
//Declare your variable here to be globally accessible
let tableData = `
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Birth Year</th>
                <th>Gender</th>
                <th>URL</th>
            </tr>
        `;
// Place your function here
const createData = (data) => {
  //The api brings in nested objects. Results object holds the array the data. So, you need to destructure like this:
  data.map((element) => {
    tableData += `
            <tr>
                <td>${element.name}</td>
                <td>${element.height}</td>
                <td>${element.birth_year}</td>
                <td>${element.gender}</td>
                <td>${element.url}</td>
            </tr>`;
  });
// console.log(data.results)
};
const server = http.createServer(async(req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("Home Page");
    return res.end();
  } else if (url === "/list") {
   const response = await axios("https://swapi.dev/api/people")
    createData(response.data.results)
    res.write(tableData);
    res.end()
  } else {
    res.write("Page Not Found" );
    return res.end();
  }
});
server.listen(PORT, console.log("Server listening to port " + PORT));