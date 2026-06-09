const stops = [
  {
    id: "eingang",
    title: "Erinnerung vor Ort",
    text: "Der Rundgang beginnt mit der Frage, warum lokale Erinnerungskultur wichtig ist. Das Stalag 326 zeigt, dass historische Verantwortung nicht nur an bekannten Orten beginnt, sondern auch dort, wo Menschen heute leben.",
    perspective: "Lokale Erinnerungskultur",
    question: "Was bedeutet Erinnerung vor der eigenen Haustür?",
    view: { x: "53%", y: "72%", zoom: 1.72 }
  },
  {
    id: "lager",
    title: "Was war das Stalag 326?",
    text: "Das Stalag 326 wurde 1941 als Kriegsgefangenenlager errichtet. Besonders sowjetische Kriegsgefangene litten unter Hunger, Krankheiten und unmenschlichen Lebensbedingungen. Tausende Menschen starben hier.",
    perspective: "Historischer Ort",
    question: "Welche Geschichte wird hier sichtbar?",
    view: { x: "64%", y: "46%", zoom: 2.18 }
  },
  {
    id: "opfer",
    title: "Opfer und Würde",
    text: "Erinnerung fragt danach, wie die Opfer nicht nur als Zahl, sondern als Menschen wahrgenommen werden. Gerade bei den sowjetischen Kriegsgefangenen ist die Würde der Opfer ein zentraler Punkt.",
    perspective: "Würde der Opfer",
    question: "Wie verhindert Erinnerung, dass Opfer anonym bleiben?",
    view: { x: "16%", y: "72%", zoom: 2.08 }
  },
  {
    id: "bildung",
    title: "Warum erinnern?",
    text: "Theologisch lässt sich Erinnerung als Verantwortung verstehen: gegenüber den Opfern, gegenüber der Gegenwart und gegenüber zukünftigen Generationen. Erinnerung beginnt dort, wo wir leben.",
    perspective: "Theologische Perspektive",
    question: "Welche Verantwortung entsteht aus Erinnerung?",
    view: { x: "76%", y: "63%", zoom: 2.24 }
  }
];

const elements = {
  stage: document.querySelector("#stage"),
  count: document.querySelector("#panelCount"),
  title: document.querySelector("#stopTitle"),
  text: document.querySelector("#stopText"),
  perspective: document.querySelector("#stopPerspective"),
  question: document.querySelector("#stopQuestion"),
  prev: document.querySelector("#prevStop"),
  next: document.querySelector("#nextStop"),
  reset: document.querySelector("#resetView"),
  hotspots: Array.from(document.querySelectorAll(".hotspot"))
};

let activeIndex = 0;

function renderStop(index, showPanel = true) {
  activeIndex = (index + stops.length) % stops.length;
  const stop = stops[activeIndex];

  elements.count.textContent = `Station ${activeIndex + 1} von ${stops.length}`;
  elements.title.textContent = stop.title;
  elements.text.textContent = stop.text;
  elements.perspective.textContent = stop.perspective;
  elements.question.textContent = stop.question;
  elements.stage.style.setProperty("--focus-x", stop.view.x);
  elements.stage.style.setProperty("--focus-y", stop.view.y);
  elements.stage.style.setProperty("--zoom", stop.view.zoom);
  elements.stage.classList.toggle("is-zoomed", showPanel);
  elements.stage.classList.toggle("has-panel", showPanel);

  elements.hotspots.forEach((button) => {
    button.classList.toggle("is-active", showPanel && button.dataset.stop === stop.id);
  });
}

elements.hotspots.forEach((button) => {
  button.addEventListener("click", () => {
    const index = stops.findIndex((stop) => stop.id === button.dataset.stop);
    renderStop(index, true);
  });
});

elements.prev.addEventListener("click", () => renderStop(activeIndex - 1, true));
elements.next.addEventListener("click", () => renderStop(activeIndex + 1, true));
elements.reset.addEventListener("click", () => renderStop(0, false));

elements.stage.addEventListener("click", (event) => {
  if (event.target.closest(".hotspot, .panel, .reset-button")) return;
  renderStop(0, false);
});

document.addEventListener("keydown", (event) => {
  if (!elements.stage.classList.contains("has-panel")) return;
  if (event.key === "ArrowLeft") renderStop(activeIndex - 1, true);
  if (event.key === "ArrowRight") renderStop(activeIndex + 1, true);
});
