import { aboutButton } from './containers/aboutContainer';
import { audioButton } from './containers/audioContainer';
import { authorizationContainerRender } from './containers/authorizationContainer';
import { baseContainer } from './containers/baseContainer';
import { bookContainerRender } from './containers/bookContainer';
import { moreButton } from './containers/moreContainer';
import { savannahButton } from './containers/savannahContainer';
import { sprintButton } from './containers/sprintContainer';
import { startButton } from './containers/startContainer';
import { statisticContainerRender } from './containers/statisticsContainer';
import { videoButton } from './containers/videoContainer';
import { writingButton } from './containers/writingContainer';
import './global.css';

function start() {
    baseContainer();
    bookContainerRender();
    statisticContainerRender();
    savannahButton();
    sprintButton();
    audioButton();
    writingButton();
    moreButton();
    startButton();
    videoButton();
    aboutButton();
    authorizationContainerRender();
}

start();
