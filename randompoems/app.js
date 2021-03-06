const ulPoem = document.querySelector("#poemTitles"),
  poetUrl = document.querySelector("#poetUrl"),
  btnPoem = document.querySelector("button"),
  poemText = document.querySelector(".poemText"),
  poemAuthor = document.querySelector(".author"),
  poemTitle = document.querySelector(".title"),
  allInvisible = document.querySelectorAll(".invisible");
let poemData = {};
function poemGetter() {
  fetch("https://www.poemist.com/api/v1/randompoems", { method: "GET" })
    .then((e) => (console.log("waiting to parse...", e), e.json()))
    .then((e) => {
      console.log("Data Parsed...", e),
        displayPoem(e, 0),
        addTitles(e),
        addUrls(e),
        (poemData = Object.assign({}, e));
    });
}
function displayPoem(e, t) {
  (poemTitle.innerHTML = e[t].title),
    (poemAuthor.innerHTML = e[t].poet.name),
    (poemText.innerHTML = e[t].content);
}
function addTitles(e) {
  e.forEach((e) => {
    let t = document.createElement("LI");
    (t.innerHTML = e.title),
      t.classList.add("list-group-item"),
      ulPoem.append(t);
  });
}
function addUrls(e) {
  e.forEach((e) => {
    let t = document.createElement("LI");
    (t.innerHTML = "<a href=" + e.poet.url + ">" + e.poet.url + "</a>"),
      t.classList.add("list-group-item"),
      poetUrl.append(t);
  });
}
function checkLiPosn(e) {
  for (let t = 0; t <= 4; t++)
    e == poemData[t].title &&
      (console.log("i is :", t), displayPoem(poemData, t)),
      console.log(t);
}
btnPoem.addEventListener("click", () => {
  (ulPoem.innerHTML = ""),
    (poetUrl.innerHTML = ""),
    (btnPoem.innerHTML = "Click again to load a different set of poems"),
    allInvisible.forEach((e) => {
      e.classList.remove("invisible");
    }),
    poemGetter();
}),
  ulPoem.addEventListener("click", (e) => {
    console.log("ul clicked"),
      console.log(e.target.innerHTML),
      checkLiPosn(e.target.innerHTML);
  });
