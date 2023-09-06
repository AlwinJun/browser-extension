import './style.css';

//Declare variables
let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');

//Save whatever is on input field
inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value); //pushig input value in myleads array
  inputEl.value = ''; //reseting/emptying input field
  localStorage.setItem('myLeads', JSON.stringify(myLeads)); //turning myleads value into object string and save it on local storage
  render(myLeads); //calling render fucmtion with myleads array as an arguement
});

//Save the current tab and current windows
//NOTE: only works as extension not in live
tabBtn.addEventListener('click', () => {
  //API
  //Querying chrome tabs
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    myLeads.push(tabs[0].url); //getting the first value of tabs url key
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

//Delete all save link on localstorage, array and DOM
deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// To render the data/array value in the DOM
function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    // assigning the listItem with element li and a then set the lead variable as its value
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems; //make listItems a UL inner HTMl element and value
}

// GET/FETCH string object myLeads key and its value from localstorage
// assign it to leadsFromLocalStorage variable
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
// If leadsFromLocalStorage  isn't empty = true
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage; // assign it to myLeads array
  render(myLeads);
}

