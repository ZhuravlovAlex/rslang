import { aboutButton } from './containers/aboutContainer';
import { audioButton } from './containers/audioContainer';
import { authorizationContainerRender } from './containers/authorizationContainer';
import { baseContainer } from './containers/baseContainer';
import { bookContainerRender } from './containers/bookContainer';
import { moreButton } from './containers/moreContainer';
import { sprintButton } from './containers/sprintContainer';
import { statisticContainerRender } from './containers/statisticsContainer';
import { videoButton } from './containers/videoContainer';
import './global.css'
import './games/sprint/sprint.css'

function start() {
    baseContainer();
    bookContainerRender();
    statisticContainerRender();
    sprintButton();
    audioButton();
    moreButton();
    videoButton();
    aboutButton();
    authorizationContainerRender();
}

start();