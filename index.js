// const { json } = require("express");

let searchButton = document.getElementById("job_search")
var job;
var location;
var searchbox = document.querySelector("#SOS-job");

var listings = document.getElementById("Job-Listings");
// searchButton.addEventListener("click", () =>
    
//     )
showApps()
function emptyResults() {
    while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
    }
}

function showApps() {
    fetch('http://localhost:3000/jobs')
        .then((response) => response.json())
        .then((data) => {
          emptyResults();
            console.log(data[0])
            for (i = 0; i < data.length; i++) {
                var jobdiv = document.createElement("li")
                jobdiv.innerHTML = `Job ID: ${data[i].id} Job: ${data[i].job} Location: ${data[i].location}`;
                // listings.appendChild(jobdiv)
                console.log(jobdiv);
                listings.appendChild(jobdiv);
            }


        })

}
    //A box you can fill in with ID number
    //Need routing, json parsing, adapt fetch to post
  
     

    
    searchButton.addEventListener("click", () => {
        var dataentry = {
            id: `${searchbox.value}`,
            // id:"hello"
        }// try wring something in the search box 
     

    // var newjob = {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(dataentry)
    // }
    fetch(`http://localhost:3000/jobs/delete/${searchbox.value}`)
        .then(data => {
            console.log('Eradicated!');
            showApps()
        })
        
})




  

    

 
 