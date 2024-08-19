import { filterForm } from "../index.js";


const container = document.querySelector('.cards-container');


const filterCards = (data) => {

        const textInputValue = filterForm.querySelector('.js-search-by-text').value;
        const statusInputValue = filterForm.querySelector('.js-search-by-status').value;
        const priorityInputValue = filterForm.querySelector('.js-search-by-priority').value;

        if (data && Array.isArray(data)) {

            const filteredByText = data.filter(el => {
                return el.title.toLowerCase().includes(textInputValue.toLowerCase()) ||
                    el.description.toLowerCase().includes(textInputValue.toLowerCase()) ||
                    el.name.toLowerCase().includes(textInputValue.toLowerCase()) ||
                    el.purpose.toLowerCase().includes(textInputValue.toLowerCase());

            });

            filterForm.querySelector('.js-search-by-text').value = '';
            
            const filteredByStatus = filteredByText.filter(el => {

                if (statusInputValue === 'open') {
                    return el.status === 'Запланований візит';

                } else if (statusInputValue === 'done') {
                    return el.status === 'Виконаний візит';

                } else {
                    return el.status;
                }
            })

            const filteredByUrgency = filteredByStatus.filter(el => {

                if (priorityInputValue === 'norm') {
                    return el.urgency === 'звичайна';

                } else if (priorityInputValue === 'priority') {
                    return el.urgency === 'пріоритетна';

                } else if (priorityInputValue === 'urgent') {
                    return el.urgency === 'невідкладна';
                    
                } else {
                    return el.urgency;
                }
            })

            return filteredByUrgency;
        }


}

export default filterCards;
