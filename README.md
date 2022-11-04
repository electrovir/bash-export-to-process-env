# bash-export-to-process-env

Retrieves all the new env variables and their values from sourcing a bash script.

# Install

```bash
npm i -D bash-export-to-process-env
```

# Usage

<!-- example-link: src/readme-examples/usage.example.ts -->

```TypeScript
import {getNewEnvFromScript} from 'bash-export-to-process-env';

async function getBashScriptEnv() {
    const newEnv = await getNewEnvFromScript('path-to-bash-script.sh');
}
```

Other scripts besides just bash should work too, as long as they also work in bash.
