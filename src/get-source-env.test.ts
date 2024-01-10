import {itCases} from '@augment-vir/chai';
import {awaitedForEach, filterObject, typedHasProperty} from '@augment-vir/common';
import {assert} from 'chai';
import {describe, it} from 'mocha';
import {testFilePaths} from './dev-file-paths';
import {getNewEnvFromScript} from './get-source-env';

describe(getNewEnvFromScript.name, () => {
    const testCases: ReadonlyArray<{
        it: string;
        filePath: string;
        narrowedExpectedOutput: Readonly<Record<string, string>>;
    }> = [
        {
            it: 'should work on simple bash file with some edge cases',
            filePath: testFilePaths.exampleBash,
            narrowedExpectedOutput: {
                EXAMPLE_VAR: 'hello-there',
                WITH_SPACE: 'herp',
                WITH_SPACE_IN_QUOTES: 'herp derp',
            },
        },
    ];

    async function testGetNewEnvFromScript(
        filePath: string,
        expected: Readonly<Record<string, string>>,
    ) {
        const output = filterObject(await getNewEnvFromScript(filePath), (key) => {
            return typedHasProperty(expected, key);
        });

        return output;
    }

    itCases(
        testGetNewEnvFromScript,
        testCases.map((testCase) => {
            return {
                it: testCase.it,
                expect: testCase.narrowedExpectedOutput,
                inputs: [
                    testCase.filePath,
                    testCase.narrowedExpectedOutput,
                ] as const,
            };
        }),
    );
    it('should create expected outputs', async () => {
        await awaitedForEach(testCases, async (testCase) => {
            const output = filterObject(await getNewEnvFromScript(testCase.filePath), (key) => {
                return typedHasProperty(testCase.narrowedExpectedOutput, key);
            });
            assert.deepStrictEqual(output, testCase.narrowedExpectedOutput);
        });
    });
});
