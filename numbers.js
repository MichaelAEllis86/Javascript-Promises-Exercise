// PART 1 NUMBERS 


// #1 Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
// (Make sure you get back JSON by including the json query key, specific to this API.
alert("hello I am JS");
const apiURL="http://numbersapi.com";
const favNumber=22;


// this logic will just console.log the number fact based on the defined variable fav number! Using axios to make the requests
let favNumResponse=axios.get(`${apiURL}/${favNumber}?json`);
//  if promise accepted .then runs
favNumResponse.then(res => {
    console.log(res);
    console.log(`your favorite number fact is.... ${res.data.text}`);
})
favNumResponse.catch(err => {
    console.log("rejected promise!!!!",err)
})

// #1's solution in a declared function form! Just add the number you're looking for as an argument/param.
function getFavNumFact(num){
    axios.get(`${apiURL}/${num}?json`)
    .then(res => {
        console.log(res)
        console.log(`your favorite number fact is.... ${res.data.text}`)
    })
    .catch(err => {
        console.log(err)
    })
}

//2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Batch api requests for more than one number look like this: axios.get("http://numbersapi.com/2,3?json") with nums separated by commas or they can be in ranges separated by periods like this axios.get("http://numbersapi.com/2..5?json")

// API method #1 for question 2 using a range of nums! Gets number facts from the API, makes space for them in the DOM, and puts them into the DOM as Li's
function getNumFactsRange(lowNum,highNum){
    // DOM setup, clearing out previous li's in our ul holding the num facts used jQuery for dom!
    $('#factsul').empty()
    $('#factsul').append(`<p>Here are the number facts generated using getNumFactsRange()</p>`)
    //make request/promise and push number facts into data array
    axios.get(`${apiURL}/${lowNum}..${highNum}?json`)
    .then(res => {
        const data=[]
        console.log(res)
        console.log(res.data)
        for (let num of Object.keys(res.data)){
            console.log(num, res.data[num])
            data.push(res.data[num])
        }
        // loop over data array and put each idx into the dom as an li
        for (let idx of data){
            console.log(idx)
            $('#factsul').append(`<li>${idx}</li>`)
        }
    })

    .catch(err => {
        console.log("rejected promise!!!!",err)
    })
}

// invoke the function to put some number facts on the page
getNumFactsRange(1,3)

const favNums=[7,10,18,22]
// API method #2 for question 2 using a range of nums. The only major difference is where stories go within the DOM and taking an array as a parameter.
function getNumFactsArray(numArray){
    $('#factsul2').empty()
    $('#factsul2').append(`<p>Here are the number facts generated using getNumFactsArray()</p>`)
    axios.get(`${apiURL}/${numArray}?json`)
    .then(res => {
        const data=[]
        console.log(res)
        console.log(res.data)
        for (let num of Object.keys(res.data)){
            console.log(num, res.data[num])
            data.push(res.data[num])
        }
        // loop over data array and put each idx into the dom as an li
        for (let idx of data){
            console.log(idx)
            $('#factsul2').append(`<li>${idx}</li>`)
        }
        
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })
}

// put the num facts onto the page!
getNumFactsArray(favNums)

// #3 Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// (Note: You’ll need to make multiple requests for this.)

// using promise.all()! push 4 promises AKA axios requests to same favNum endpoint into the array favNumX4. Then use promise.all 

const favNumX4=[]

for (let i=1; i<5; i++){
    favNumX4.push(axios.get(`${apiURL}/${favNumber}?json`))
}

Promise.all(favNumX4)
    .then(promiseArrRes => {
        console.log(promiseArrRes)
        for (let idx of promiseArrRes){
            $('#factsul3').append(`<li>${idx.data.text}</li>`)

        } 
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })
    
