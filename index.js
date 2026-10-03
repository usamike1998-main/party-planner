const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2608";
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
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + `/events/${id}`);
    const result = await response.json();
    state.selectedEvent === result;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <SelectedParty></SelectedParty>
      </section>
    </main>
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
