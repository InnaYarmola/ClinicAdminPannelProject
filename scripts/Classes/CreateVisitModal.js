
import Modal from "./Modal.js";
import postData from "../api/postDataOnServer.js";
import { modalInstance } from "../index.js";
import { Visit } from "../nimets_card.js";


class CreateVisitModal extends Modal {
    constructor(confirmCallback) {
        super(confirmCallback)

    }

    closeButton = document.createElement("button")
    createButton = document.createElement("button")
    formContainer = document.createElement("form");

    render() {
        super.render();

        const form = document.createElement("form");
        form.classList.add("form-vizit")
        this.formContainer.classList.add("form-vizit")


        const doctorsTemplate = document.querySelector("#select-doctors-template").content.cloneNode(true);

        form.append(doctorsTemplate, this.formContainer);

        const select = form.querySelector(".form-select")

        select.addEventListener("change", ({ target }) => {

            this.formContainer.innerHTML = "";

            if (target.value === "Дантист") {
                const dantistTemplate = document.querySelector("#dantist-form-template").content.cloneNode(true);
                this.formContainer.append(dantistTemplate, this.createButton, this.closeButton)
                this.postCardData(".js-dantist-input")

            } else if (target.value === "Кардіолог") {
                const cardiologistTemplate = document.querySelector("#cardiologist-form-template").content.cloneNode(true);
                this.formContainer.append(cardiologistTemplate, this.createButton, this.closeButton)
                this.postCardData(".js-cardiologist-input")

            } else {
                const therapistTemplate = document.querySelector("#therapist-form-template").content.cloneNode(true);

                this.formContainer.append(therapistTemplate, this.createButton, this.closeButton)
                this.postCardData(".js-therapist-input");
            }

            const selectElement = this.formContainer.querySelector(".js-form-select2");
            selectElement.addEventListener("change", () => {
                const selectedOption = selectElement.options[selectElement.selectedIndex].value;
                const selectedUrgency = selectElement.options[selectElement.selectedIndex].textContent;
            })

        });

        this.body.append(form)

        this.closeButton.classList.add("btn", "btn-primary", "close-btn")
        this.closeButton.setAttribute("data-bs-dismiss", "modal")
        this.closeButton.setAttribute("type", "button")
        this.closeButton.innerText = "Закрити";

        this.createButton.classList.add("btn", "btn-primary", "create-btn")
        this.createButton.setAttribute("type", "submit")
        this.createButton.innerText = "Створити";

    }

    postCardData(selector) {

        this.formContainer.addEventListener("submit", async (event) => {
            event.preventDefault();

            const selectElement = this.formContainer.querySelector(".js-form-select2")
            const selectedUrgency = selectElement.options[selectElement.selectedIndex].textContent;

            const valuesFromInputs = this.getInputValues(selector);
            valuesFromInputs.urgency = selectedUrgency;
            
            const data = await postData(valuesFromInputs);
            this.formContainer.innerHTML = ""
            modalInstance.hide()

            new Visit(data.name, data.title, data.id).renderCard();
        })
    }
}

export default CreateVisitModal


export const buttonCreateVisit = document.querySelector(".js-create-element");

