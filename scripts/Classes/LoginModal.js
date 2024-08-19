import Modal from "./Modal.js";
import getToken from "../api/loginRequest.js";
import { loginBtn, filterForm, modalInstance } from "../index.js";
import { buttonCreateVisit } from "./CreateVisitModal.js";

class LoginModal extends Modal {
    constructor() {
        super();
    }

    loginSubmitBtn = this.modal.querySelector('.js-login-submit');
    modalFooter = this.modal.querySelector('.modal-footer');

    login() {

        const form = this.body.querySelector('form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const token = await getToken(this.getInputValues('.js-login-input'));

            if (token) {
                location.reload();
                modalInstance.hide()
                loginBtn.style.display = 'none';
                buttonCreateVisit.style.display = 'block';
                filterForm.style.display = 'flex';
                sessionStorage.setItem('token', token);
                noCardsNote.style.display = 'block';
                loginRequestNote.style.display = 'none';

            } else {

                this.modalFooter.innerHTML = `
                <div class="alert alert-danger" role="alert">
                     Невірний логін або пароль!
                </div>`;
                this.modal.querySelector('#inputEmail').value = '';
                this.modal.querySelector('#inputPassword').value = '';

            }
        })
    }

    render() {
        super.render();

        loginBtn.addEventListener('click', () => {

            this.title.innerText = 'Будь ласка, авторизуйтесь!';

            this.body.innerHTML = `
            <form>
    
                <div class="row mb-3">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input name="email" type="email" class="form-control js-login-input" id="inputEmail">
                        </div>
                </div>
    
                <div class="row mb-3">
                     <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                     <div class="col-sm-10">
                     <input name="password" type="password" class="form-control js-login-input" id="inputPassword">
                     </div>
                </div>
    
                <button  type="submit" class="btn btn-primary js-login-submit">Увійти</button>
            </form>`;

            this.login();

        });
    }
}

export default LoginModal;