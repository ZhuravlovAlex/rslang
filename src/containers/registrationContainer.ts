import * as api from '../api/api';
const registrationButton = () => {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    mainContainer.innerHTML = `
    <div class="main-autorization-wrapper">
        <div class="autorization-wrapper">
            <form id="auth-reg-form" action="">
                <p>Name<input id="auth-reg-input-name" type="text" name="drink" value="" required></p>
                <p>E-mail<input id="auth-reg-input-email" type="email" name="drink" value="" required></p>
                <p>Пароль<input  id="auth-reg-input-password" type="password" name="drink" value="" required></p>
                <p><input id="auth-reg-submit" type="button" value=" all for english classes "></p>
            </form>
        </div>
    </div>`;

    const btn = document.querySelector('#auth-reg-submit') as HTMLButtonElement;
    btn.onclick = () => {
        const nameInput = document.querySelector('#auth-reg-input-name') as HTMLInputElement;
        const emailInput = document.querySelector('#auth-reg-input-email') as HTMLInputElement;
        const passwordInput = document.querySelector('#auth-reg-input-password') as HTMLInputElement;

        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!name || !email || !password) return alert('Fill all fields');
        api.Users.createUser({ name, email, password }).then((res) => {
            if (typeof res === 'string') return alert('Error: ' + res);
            console.log(res);
        });
    };
};

export const RegistrationContainerRender = () => {
    // const registrationBtn = document.querySelector('.authorization') as HTMLElement;
    // registrationBtn.addEventListener('click', registrationButton);
    registrationButton();
};
