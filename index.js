const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2608";
const API = BASE + COHORT;

const state = {
  events: [],
  selectedEvent: null,
};

async function getEvents(API) {
  try {
    const response = await fetch(API + "/events");
    const result = await response.json();
    state.events = result.data;
    render();
    console.log(state.events);
  } catch (e) {
    console.log(e);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + `/events/${id}`);
    const result = await response.json();
    state.selectedEvent = result.data;
    console.log(state.selectedEvent);
    render();
  } catch (e) {
    console.log(e);
  }
}

function eventChosen(event) {
  return function () {
    getEvent(event.id);
  };
}

function EventsList(events) {
  const $events = document.createElement("ul");
  $events.classList.add("events");

  const $eventItems = events.map(EventUI);
  $events.replaceChildren(...$eventItems);

  return $events;
}

function EventUI(event) {
  const $li = document.createElement("li");
  if (state.selectedEvent?.id === event.id) {
    $li.classList.add("event__selected");
  }

  $li.innerHTML = `
    <a> ${event.name} </a>
    `;

  $li.addEventListener("click", eventChosen(event));
  return $li;
}

function SelectedEvent(selectedEvent) {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }
  const { name, id, date, location, description } = selectedEvent;
  const $event = document.createElement("section");
  $event.innerHTML = `
    <h3>${name} #${id}</h3>
    <time datetime="${date}">
      ${date.slice(0, 10)}
    </time>
    <p>${location}</p>
    <p>${description}</p>
`;

  return $event;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventsList/>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <SelectedEvent/>
      </section>
    </main>
  `;

  $app.querySelector("EventsList").replaceWith(EventsList(state.events));
  $app
    .querySelector("SelectedEvent")
    .replaceWith(SelectedEvent(state.selectedEvent));
}

function init() {
  getEvents(API);
  render();
}

init();
