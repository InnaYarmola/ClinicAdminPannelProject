import { cardsContainer } from './nimets_card.js';
import { noCardsNote } from './functions/login.js';

export default function deleteInspiration() {
    if (cardsContainer.querySelector('.card')) {
        noCardsNote.style.display = 'none';
        console.log("true");
    } else {
        noCardsNote.style.display = 'Block';
        console.log("false");
    }
}