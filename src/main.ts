import { aboutButton } from "./aboutContainer";
import { audioButton } from "./audioContainer";
import { authorizationContainerRender } from "./authorizationContainer";
import { baseContainer } from "./baseContainer";
import { bookContainerRender } from "./bookContainer";
import { moreButton } from "./moreContainer";
import { savannahButton } from "./savannahContainer";
import { sprintButton } from "./sprintContainer";
import { startButton } from "./startContainer";
import { statisticButton } from "./statisticsContainer";
import { videoButton } from "./videoContainer";
import { writingButton } from "./writingContainer";

export async function start() {
    await baseContainer();
    bookContainerRender();
    await statisticButton();
    await savannahButton();
    await sprintButton();
    await audioButton();
    await writingButton();
    await moreButton();
    await startButton();
    await videoButton();
    await aboutButton();
    authorizationContainerRender();
  }
