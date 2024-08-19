import { modalInstance, loginBtn, filterForm } from "../index.js";
import { buttonCreateVisit } from "../Classes/CreateVisitModal.js";

const loginRequestNote = document.querySelector('.js-login-request');

export const noCardsNote = document.querySelector('.js-no-cards-notification');

export const login = () => {

        if (sessionStorage.getItem('token')) {
            modalInstance.hide();
            loginRequestNote.style.display = 'none';
            loginBtn.style.display = 'none';
            buttonCreateVisit.style.display = 'block';
            filterForm.style.display = 'flex';
            noCardsNote.style.display = 'block';
        }
}

