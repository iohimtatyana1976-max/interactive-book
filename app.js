import { startIntro } from "./intro.js";
import { buildTreeNavigation } from "./tree.js";

const scenes = [...document.querySelectorAll("[data-scene]")];

function showScene(name) {
  scenes.forEach((scene) => {
    scene.classList.toggle("is-active", scene.dataset.scene === name);
  });
}

async function init() {
  await buildTreeNavigation();

  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const action = actionTarget.dataset.action;

    if (action === "skip-intro") showScene("tree");
    if (action === "open-book") showScene("book");
    if (action === "back-tree") showScene("tree");

    if (action === "open-story") {
      const story = actionTarget.dataset.story;
      window.location.href = `./stories/${story}.html`;
    }
  });

  startIntro({
    onComplete: () => showScene("tree")
  });
}

init().catch((error) => {
  console.error("Ошибка инициализации книги:", error);
  showScene("tree");
});
