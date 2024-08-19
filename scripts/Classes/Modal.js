
class Modal {
    constructor(confirmCallback) {
        this.confirmCallback = confirmCallback;
        this.modal = document.querySelector("#modal");
        this.editModal = document.querySelector("#editModal");
        this.title = this.modal.querySelector(".modal-title");
        this.body = this.modal.querySelector(".modal-body")

    }

    render() {
    }


    getInputValues(selector) {
        const inputs = this.modal.querySelectorAll(selector);
        const values = {};

        inputs.forEach(input => {

            values[input.name] = input.value;
        })
        
        return values;
    }

    getEditModalValues(selector) {

        const inputs = this.editModal.querySelectorAll(selector);
        const values = {};

        inputs.forEach(input => {

            values[input.name] = input.value;
        })
        
        return values;

    }
}

export default Modal




