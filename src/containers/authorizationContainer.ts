import { RegistrationContainerRender } from "./registrationContainer";
import * as api from '../api/api';

const authorizationButton = async () => {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    mainContainer.innerHTML = `
        <div class="main-autorization-wrapper">
            <div class="autorization-wrapper">
                <form id="auth-login-form" action="">
                    <p>E-mail<input id="auth-reg-input-email" type="email" name="drink" value="" required></p>
                    <p>Пароль<input  id="auth-reg-input-password" type="password" name="drink" value="" required></p>
                    <p><input type="submit"</p>
                    <p>Если у вас нет аккаунта, <a id="auth-reg-btn" href="#">зарегистрируйте</a> его</p>
                </form>
            </div>
        </div>`;
    //
    const authRegBtn = document.querySelector("#auth-reg-btn") as HTMLAnchorElement;
    authRegBtn.addEventListener('click', RegistrationContainerRender);

    const form = document.querySelector('#auth-login-form') as HTMLFormElement;
    form.onsubmit = () => {
        const emailInput = document.querySelector("#auth-reg-input-email") as HTMLInputElement;
        const passwordInput = document.querySelector("#auth-reg-input-password") as HTMLInputElement;

        const email = emailInput.value;
        const password = passwordInput.value;

        api.Auth.signIn({email, password})
            .then(res => {
                if (typeof res === 'string') return alert('Error: ' + res);
                console.log(res);
            })
    }
};

export const authorizationContainerRender = () => {
    const authorizationBtn = document.querySelector('.authorization') as HTMLElement;
    authorizationBtn.addEventListener('click', authorizationButton);
    
};
