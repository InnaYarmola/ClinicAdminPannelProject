
import CreateVisitModal from './Classes/CreateVisitModal.js';
import LoginModal from './Classes/LoginModal.js';
import filterCards from './functions/filterCards.js';
import getAllPosts from './api/getAllPosts.js';
import {login} from './functions/login.js';
import deleteInspiration from './deleteInspiration.js';
import { cardsContainer, Visit } from './nimets_card.js';

export const loginBtn = document.querySelector('.js-loginBtn');
export const filterForm = document.querySelector('.js-filter-form');
export const modalInstance = new bootstrap.Modal('#modal', {
    keyboard: false
});


login()

new LoginModal().render();

new CreateVisitModal().render();


const posts = await getAllPosts();

posts.forEach(visitCard => {
    let { name, title, id } = visitCard;

    new Visit(name, title, id).renderCard();
});



filterForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const filteredCards = filterCards(posts);
 
    cardsContainer.innerHTML = '';

    filteredCards.forEach(visitCard => {

        let { name, title, id } = visitCard;

        new Visit(name, title, id).renderCard();
        
    });

});

deleteInspiration();

const editBtnCollection = cardsContainer.querySelectorAll('.js-editBtn');

editBtnCollection.forEach(btn => {

    btn.addEventListener('click', (event) => {
        
        new Visit().editCard(event.target);
    })
    
})



