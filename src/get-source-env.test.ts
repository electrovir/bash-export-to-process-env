import {itCases} from '@augment-vir/chai';
import {describe} from 'mocha';
import {testFilePaths} from './dev-file-paths';
import {getNewEnvFromScript} from './get-source-env';

describe(getNewEnvFromScript.name, () => {
    itCases(getNewEnvFromScript, [
        {
            it: 'should work on simple bash file with some edge cases',
            input: testFilePaths.exampleBash,
            expect: {
                EXAMPLE_VAR: 'hello-there',
                WITH_SPACE: 'herp',
                WITH_INTERPOLATION: 'herp',
                WITH_SPACE_IN_QUOTES: 'herp derp',
            },
        },
    ]);
});
