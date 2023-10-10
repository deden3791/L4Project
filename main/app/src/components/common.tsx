import { createComponent } from "./helper";

export const header = (root: any, pageTitle: string) => {
  let headerdiv = createComponent("div", {class: "header"}, '');;
    let backlink = createComponent("a", {href: "index.html"}, '', headerdiv);
      createComponent("img", {id: "back", src: "./images/backButton.png", alt: "back button"}, '', backlink);
    createComponent("h1", {}, pageTitle, headerdiv);
    let headerbuttonsdiv = createComponent("div", {class: "header-buttons"}, '', headerdiv);
    let diagnosticLink = createComponent("button", {id: "settingsBtn"}, '', headerbuttonsdiv);
      createComponent("img", {src: "./images/settings.png", alt: "settings"}, '', diagnosticLink);;
  root.appendChild(headerdiv);
};