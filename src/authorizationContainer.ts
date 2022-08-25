const authorizationButton = async () => {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    mainContainer.innerHTML = `
        <div class="main-autorization-wrapper">
        <div class="autorization-wrapper">
        <form action="">
   <p>E-mail<input type="email" name="drink" value=""></p>
   <p>Пароль<input type="password" name="drink" value=""></p>
   <p><input type="submit"</p>
  </form>
        </div>
        </div>
        `;
    //
};

export const authorizationContainerRender = () => {
    const authorizationBtn = document.querySelector('.authorization') as HTMLElement;
    authorizationBtn.addEventListener('click', authorizationButton);
};
