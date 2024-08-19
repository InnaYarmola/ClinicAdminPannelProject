import Modal from "./Modal.js";
import getPost from "../api/getSelectedPost.js";
import editPost from "../api/editPost.js";
import { Visit } from "../nimets_card.js";

class EditVisitModal extends Modal {
  constructor(cardTarget) {
    super();
    this.cardTarget = cardTarget;
    this.modalOverlay = document.querySelector('.modal-overlay');
  }

  async render() {
    super.render();

    const cardID = this.cardTarget.closest('.card').id;
    const card = await getPost(cardID);

    this.editModal.innerHTML = `

            <form class="js-editForm">

                <h1>Редагувати візит</h1>

                <div class="modal-body">

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Title</span>
                      <input name="title" value="${card.title}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">ID</span>
                      <input name="id" value="${card.id}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    
                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
                      <input name="name" value="${card.name}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Status</span>
                      <input name="status"  value="${card.status}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Urgency</span>
                      <input name="urgency" value="${card.urgency}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Description</span>
                      <input name="description"  value="${card.description}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Purpose</span>
                      <input name="purpose" value="${card.purpose}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                </div>

                <div>

                    <button type="button" class="btn btn-secondary js-closeModalBtn">Закрити</button>
                    <button type="submit" class="btn btn-primary js-editBtn">Редагувати</button>

                </div>

            </form>`;

    const modalBody = this.editModal.querySelector('.modal-body');

    if (card.title === 'Візит до терапевта') {

      modalBody.insertAdjacentHTML('beforeend', `
               <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Age</span>
                    <input name="age" value="${card.age}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
               </div>`);

    } else if (card.title === 'Візит до кардіолога') {

      modalBody.insertAdjacentHTML('beforeend', `

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Pressure</span>
                      <input name="pressure" value="${card.pressure}" type="text" class="form-control js-editForm-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">MassIndex</span>
                      <input name="massIndex" value="${card.massIndex}" type="text" class="form-control js-editForm-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Diseases</span>
                      <input name="diseases" value="${card.diseases}" type="text" class="form-control js-editForm-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>

                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Age</span>
                      <input name="age" value="${card.age}" type="text" class="form-control js-editForm-input" aria-describedby="inputGroup-sizing-sm">
                    </div>`);

    } else if (card.title === 'Візит до дантиста') {

      modalBody.insertAdjacentHTML('beforeend', `
                <div class="input-group input-group-sm mb-3">
                     <span class="input-group-text" id="inputGroup-sizing-sm">Last visit</span>
                     <input name="lastVisit" value="${card.lastVisit}" type="text" class="form-control js-editForm-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                </div>`);
    }

    this.modalOverlay.style.display = 'block';
    this.editcard(card);
  }

  editcard(card) {

    const form = this.editModal.querySelector('.js-editForm');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const editedValues = this.getEditModalValues('.js-editForm-input');
      editPost(card.id, editedValues);

      setTimeout(() => {
        this.repaintCard(card)
      }, 100);

      event.target.remove();
      this.modalOverlay.style.display = 'none';
    })

    const closeModalBtn = document.querySelector('.js-closeModalBtn');

    closeModalBtn.addEventListener('click', (event) => {
      event.target.closest('.js-editForm').remove();
      this.modalOverlay.style.display = 'none';
    })

    this.modalOverlay.addEventListener('click', () => {
      form.remove();
      this.modalOverlay.style.display = 'none';
    })
  }

  async repaintCard(card) {

    const editedData = await getPost(card.id);
    const selectedCard = document.getElementById(`${card.id}`);
    selectedCard.remove();
    const { name, title, id } = editedData;
    new Visit(name, title, id).renderCard();
  }

};

export default EditVisitModal;