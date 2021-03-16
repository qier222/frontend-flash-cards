import htmlCards from "./stacks/html.js";
import cssCards from "./stacks/css.js";
import javascriptCards from "./stacks/javascript.js";
import reactCards from "./stacks/react.js";
import vueCards from "./stacks/vue.js";

export default {
  stacks: [
    { name: "HTML", id: "html", cards: htmlCards },
    { name: "CSS", id: "css", cards: cssCards },
    { name: "JavaScript", id: "js", cards: javascriptCards },
    { name: "React", id: "react", cards: reactCards },
    { name: "Vue", id: "vue", cards: vueCards },
  ],
};
