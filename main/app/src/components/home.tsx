import { createComponent } from "./helper";
import { createModal, helpModalContent, openCloseModal } from "./modals";

export const homePage = () => {
    let root = document.getElementById("page-root");
  
    let headerdiv = createComponent("div", {class: "header"}, '', root);
      createComponent("h1", {}, "Earbud Controller", headerdiv);
  
    let contentdiv = createComponent("div", {class: "content"}, '', root);
      let buttonsdiv = createComponent("div", {class: "buttons center-buttons"}, '', contentdiv);
        let audioVisualLink = createComponent("a", {href: "audioVisual.html"}, '', buttonsdiv);
          createComponent("button", {}, "AudioVisual", audioVisualLink);
        let captionslink = createComponent("a", {href: "captions.html"}, '', buttonsdiv);
          createComponent("button", {}, "Captions", captionslink);
        createComponent("button", {id: "helpBtn"}, "Help", buttonsdiv);
      
      let helpModal = createModal(contentdiv, "helpModal", "small");
        helpModalContent(helpModal, "controller");
  
    openCloseModal();
  };