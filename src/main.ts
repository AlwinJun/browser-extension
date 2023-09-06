import './style.css';

const inputEl = document.getElementById('input-el') as HTMLInputElement;
const inputBtn = document.getElementById('input-btn') as HTMLButtonElement;
const tabBtn = document.getElementById('tab-btn') as HTMLButtonElement;
const deleteBtn = document.getElementById('delete-btn') as HTMLButtonElement;
const ulEl = document.getElementById('ul-el') as HTMLUListElement;

let myLeads: string[] = [];

inputBtn.addEventListener('click', (): void => {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

//Save the current tab and current windows
//NOTE: only works as extension not in live
tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const [tab] = tabs;
    myLeads.push(tab.url); //getting the first value of tabs url key
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

const render = (leads: string[]) => {
  const listItems: string = leads
    .map(
      (lead) => `
    <li>
      <a target='_blank' href='${lead}'>
        ${lead}
      </a>
    </li>
  `
    )
    .join('');

  ulEl.innerHTML = listItems; //make listItems a UL inner HTMl element and value
};

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads')!);
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

