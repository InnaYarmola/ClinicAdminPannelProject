export { cardsContainer, Visit, deleteCardButton, cardContainer, cardContainer1 };

import deletePost from './api/deletePost.js';
import EditVisitModal from './Classes/EditVisitModal.js';
import { noCardsNote } from './functions/login.js';

const cardsContainer = document.querySelector(".cards-container");


class Visit {
    constructor(doctor, name, id) {
        this.doctor = doctor;
        this.name = name;
        this.id = id;
    }

    renderCard() {

        cardsContainer.insertAdjacentHTML("beforeend", `<div id="${this.id}" class="card">
            <div class="header">
                       <h3 class="card-title">${this.name}</h3>
                </div>
                <div class="content">
                       <p class="card-text">${this.doctor}</p>
                       <div class="additional-content specialInfo"></div>
                </div>
                      <button type="button"  class="btn-close" aria-label="Close"></button> 
                <div class="footer">
                      <button href="#" class=" btn delete-btn btn-info">Show more info</button>
                      <button href="#" class="btn expand-btn btn-info1 js-editBtn">Edit</button>
                </div>
            </div>`)

        this.cardDeletion();
        this.showMoreInfo();
        this.deleteInspiration();
    };

    cardDeletion() {
        const cardBody = document.getElementById(`${this.id}`);
        const buttonDelete = cardBody.querySelector(".btn-close");

        buttonDelete.addEventListener('click', function (event) {

            event.target.closest(".card").remove();
            deletePost(cardBody.id);

        });
    }

    showMoreInfo() {

        const cardBody = document.getElementById(`${this.id}`);
        const buttonShowMore = cardBody.querySelector(".btn-info");

        buttonShowMore.addEventListener('click', (event) => {

            const visitId = this.id;

            getInfo(visitId).then(res => {

                if (res.title === "Візит до терапевта") {
                    new VisitTherapist(this.doctor, this.name, this.id, res[`age`]).showMoreInfo1();
                }

                else if (res.title === "Візит до дантиста") {
                    new VisitDentist(this.doctor, this.name, this.id, res[`lastVisit`]).showMoreInfo1();
                }

                else if (res.title === "Візит до кардіолога") {
                    new VisitCardiolog(this.doctor, this.name, this.id, res[`pressure`], res[`massIndex`], res[`diseases`], res[`age`]).showMoreInfo1();
                }
            });



            async function getInfo(id) {

                try {

                    const { data } = await axios.get(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });

                    return data;
                } catch (err) {
                    console.warn(err);
                }

            }
        });
    }

    editCard(cardTarget) {
        
        new EditVisitModal(cardTarget).render();
        
        
    };

    deleteInspiration() {
        if (cardsContainer.querySelector('.card')) {
            noCardsNote.style.display = 'none';

        } else {
            noCardsNote.style.display = 'Block';
        }
    }

}


const deleteCardButton = document.querySelector(".btn-close");
const cardContainer = document.querySelector(".card-body");
const cardContainer1 = document.querySelector(".card");

class VisitDentist extends Visit {
    constructor(doctor, name, id, lastVisit) {
        super(doctor, name, id);
        this.lastVisit = lastVisit;
    }

    showMoreInfo1() {
        const uniqueCard = document.getElementById(`${this.id}`);
        const addInfo = uniqueCard.querySelector(".specialInfo");

        addInfo.innerText = "";
        addInfo.style.display = "block";
        addInfo.insertAdjacentHTML("beforeend", `<p>Останній візит: ${this.lastVisit}</p>`)
    }
};

class VisitCardiolog extends Visit {
    constructor(doctor, name, id, pressure, massIndex, diseases, age) {
        super(doctor, name, id);
        this.pressure = pressure;
        this.massIndex = massIndex;
        this.diseases = diseases;
        this.age = age;
    }

    showMoreInfo1() {
        const uniqueCard = document.getElementById(`${this.id}`);
        const addInfo = uniqueCard.querySelector(".specialInfo");

        addInfo.innerText = "";
        addInfo.style.display = "block";
        addInfo.insertAdjacentHTML("beforeend", `<p>Тиск: ${this.pressure}</p>
        <p>Індекс маси тіла:${this.massIndex}</p>
        <p>Серцеві захворювання:${this.diseases}</p>
        <p>Вік:${this.age}</p>

        `)
    }
};

class VisitTherapist extends Visit {
    constructor(doctor, name, id, age) {
        super(doctor, name, id);
        this.age = age;

    }

    showMoreInfo1() {
        const uniqueCard = document.getElementById(`${this.id}`);
        const addInfo = uniqueCard.querySelector(".specialInfo");

        addInfo.innerText = "";
        addInfo.style.display = "block";
        addInfo.insertAdjacentHTML("beforeend", `
        <p>Вік:${this.age}</p>
        `);
    }
};


