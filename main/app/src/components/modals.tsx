import { createComponent } from "./helper";

export const createModal = (root:any, modalId:any, size="large") => {
  let modal = createComponent("div", {id: modalId, class: "modal"}, '', root);
    let modalcontent = createComponent("div", {class: `modal-content ${size}`}, '', modal);
      let modalheader = createComponent("div", {class: "modal-header"}, '', modalcontent);
        createComponent("span", {class: "close"}, "X", modalheader);
        createComponent("h2", {}, "How to Use", modalheader);
      let modalbody = createComponent("div", {class: "modal-body"}, '', modalcontent);
      createComponent("div", {class: "modal-footer"}, "Thanks for reading", modalcontent);
  root.appendChild(modal);
  return modalbody;
};

export const addModals = (root:any, helpLink:any) => {
  let helpModal = createModal(root, "helpModal", "small");
    helpModalContent(helpModal, helpLink);
  let settingsModal = createModal(root, "settingsModal");
    settingsModalContent(settingsModal);
};


export function helpModalContent(root:any, link:any) {
  createComponent("p", {}, `For detailed instructions, please read the user manual`, root);
  let userManualLink = createComponent("a", {target: '_blank', href:`https://https://github.com/deden3791/L4Project/blob/dev/main/app/src/UserGuide.md#${link}`}, '', root);
  createComponent("button", {}, "User manual", userManualLink);
}

function settingsModalContent(root:any) {
  let buttonsdiv = createComponent("div", {class: "buttons center-buttons"}, '', root);
    sendCodeSlider(buttonsdiv);
    createComponent("button", {id: "mappingsBtn", class: "remove-margin"}, "Select angle to motor mapping", buttonsdiv);
    createComponent("button", {id: "testAnglesBtn", class: "remove-margin"}, "Perform Diagnostic", buttonsdiv);
    createComponent("button", {id: "robotCodeBtn", class: "remove-margin"}, "Robot Code", buttonsdiv);
};

function sendCodeSlider(root:any) {
  let slidercontainer = createComponent("div", {class: "slider-container"}, '', root);
    let valuecontainer = createComponent("div", {class: "value-container"}, '', slidercontainer);
      createComponent("span", {id: "output"}, "100", valuecontainer);
    createComponent("input", {type: "range", min:"0", max:"600", value:"100", class:"slider", id:"sendCodeSlider"}, '', slidercontainer);
};

export function openCloseModal() {
  const modals = {
    help: {modal: "helpModal", button: "helpBtn"},
    settings: {modal: "settingsModal", button: "settingsBtn"},
  };
  const modalElements: HTMLElement[] = [];
  var span = document.getElementsByClassName("close") as HTMLCollectionOf<HTMLElement>;
  const settingsModal = document.getElementById("settingsModal");

  for (const [key, value] of Object.entries(modals)) {
    const modal = document.getElementById(value.modal);
    const button = document.getElementById(value.button);
    if (!(modal && button)) {
      break
    }
    modalElements.push(modal);

    button.onclick = () => {
      if (settingsModal) {
        settingsModal.style.display = "none";
      }
      modal.style.display = "block";
    };
  };

  // When the user clicks on <span> (x), close the modal
  for (var i = 0; i < span.length; i++) {
    span[i].onclick = function() {
      for (var j = 0; j < modalElements.length; j++) {
        modalElements[j].style.display = "none";
      };
    };
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    for (var j = 0; j < modalElements.length; j++) {
      if (event.target === modalElements[j]) {
        modalElements[j].style.display = "none";
      };
    };
  };
};