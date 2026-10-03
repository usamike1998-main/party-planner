const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2608-FTB-ET-WEB-FT";
const API = BASE + COHORT;

const state = {
  events: null,
  selectedEvent: null,
};

async function getEvents(API) {
  try {
    const response = await fetch(API + "/events");
    const result = await response.json();
    state.events = result;
  } catch (e) {
    console.log(e);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + `/events/${id}`);
    const result = await response.json();
  } catch (e) {
    console.log(e);
  }
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
        <h1> Party Planner </h1>

    
    `;
}

function EventItem(item) {
  const $li = document.createElement("li");
  if (state.selectedEvent.id === item.id) {
    $li.classList.add("selectedParty");
  }

  $li.innerHtml = `
    <a> ${item.name} </a>
    `;
}
