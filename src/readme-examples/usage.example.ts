import {getNewEnvFromScript} from '../';

async function getBashScriptEnv() {
    const newEnv = await getNewEnvFromScript('path-to-bash-script.sh');
}
