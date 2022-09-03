
// export async function statisticButton() {
//     const statisticBtn = document.querySelector('.statistic');
//     const mainContainer = document.querySelector('.main') as HTMLElement;
//     async function statistic() {
//         return (mainContainer.innerHTML = `
// 					<div class="main-autorization-wrapper">
// 							<div class="autorization-wrapper">
// 									<form id="auth-login-form" action="">
// 											<p>E-mail<input id="auth-reg-input-email" type="email" name="drink" value="" required></p>
// 											<p>Пароль<input  id="auth-reg-input-password" type="password" name="drink" value="" required></p>
// 											<p><input type="button" id="auth-login-btn" value=" all for english classes "></p>
// 											<p>Если у вас нет аккаунта, <a id="auth-reg-btn" href="#">зарегистрируйте</a> его</p>
// 									</form>
// 							</div>
// 					</div>`);
//     }
// }
import { elementaryContainer } from '../wordsLevels/elementaryContainer';
import * as api from '../api/api';
import { getUserFromLocalStorage } from '../utils/utils';

const statisticButton = async () => {
    //zapros k api
    //otrisovka
    // tol'ko cherez promices!!!
    const userString = localStorage.getItem('userSaved');
    if (!userString) {
        // ERROR
    }

    const user = JSON.parse(userString || '{}');
    const userId = user.id;

    if (!userId) {
        //ERROR
    }

    api.Users.getUserStatistic(userId).then((res) => {
        const mainContainer = document.querySelector('.main') as HTMLElement;
        mainContainer.innerHTML = `
							<div class="statistic">
								<h1 class="stat-title">Статистическая информация</h1>
								<div class="stat-tables">
										<div class="stat-table-games">
											<h3 class="stat-table-games-title">Статистика по играм</h3>
											<table cellspacing="0" class="stat-table-games-body">
												<tr>
													<th>Статистика по играм</th><th>Аудиовызов</th><th>Спринт</th>
												</tr>
												<tr>
													<td>Количество новых слов за день</td><td>${10}</td><td>${20}</td>
												</tr>
												<tr>
													<td>Процент правильных ответов</td><td>${30}</td><td>${40}</td>
												</tr>
												<tr>
													<td>Самая длинная серия правильных ответов</td><td>${50}</td><td>${60}</td>
												</tr>
											</table>
										</div>
										<div class="stat-table-words">
											<h3 class="stat-table-words-title">Статистика по словам</h3>
											<table cellspacing="0" class="stat-table-words-body">
												<tr>
													<th>Статистика по словам</th><th>Значение</th>
												</tr>
												<tr>
													<td>Количество новых слов за день</td><td>${70}</td>
												</tr>
												<tr>
													<td>Количество изученных слов за день</td><td>${80}</td>>
												</tr>
												<tr>
													<td>Процент правильных ответов за день</td><td>${90}</td>
												</tr>
											</table>
										</div>
								</div>
						</div>
								`;
    });
};

export const statisticContainerRender = () => {
    const statisticBtn = document.querySelector('.statistic');

    statisticBtn?.addEventListener('click', statisticButton);
};

