import {isTruthy, safeMatch} from '@augment-vir/common';
import {interpolationSafeWindowsPath, runShellCommand} from '@augment-vir/node-js';
import {filterOutCurrentEnvVars} from './filter-env';

/**
 * Random deliminator output from `randomString(128)` from `@augment-vir/common`.
 *
 * `randomString(128)` isn't used directly because a direct dependency of this package does not
 * support Node.js v20 yet, and @augment-vir/common's `randomString` export does not support Node
 * versions <20.
 */
const randomDeliminator =
    '761dbb1369a6c269ebb72e854526f4c72135be4920e445439bc504dc4643be322fa9e76f9449580495831a1e46e3f3497d477d6c5d24b8a6954aee266f2daaa2';

/**
 * Executes a bash script and reads the new env that it populates. Note that in some systems this
 * will result in a lot of ENV variables that you might not be expecting, or that you don't care
 * about, so you should expect to see extra keys in the object returned by this that you won't use.
 */
export async function getNewEnvFromScript(
    shellFilePath: string,
): Promise<Readonly<Record<string, string>>> {
    const output = await runShellCommand(
        `source "${interpolationSafeWindowsPath(
            shellFilePath,
        )}"; printf "${randomDeliminator}"; env -0;`,
        {
            rejectOnError: true,
        },
    );

    const [
        ,
        envOutput,
    ] = output.stdout.trim().split(randomDeliminator);

    /** There's no way to intentionally trigger the undefined case for the following optional chain */
    /* istanbul ignore next */
    const envLines = envOutput?.split('\x00').filter(isTruthy);

    /** There's no way to intentionally trigger the next if, it's just a type guard */
    /* istanbul ignore next */
    if (envLines == undefined) {
        throw new Error(`Failed to extract env lines when running shell script "${shellFilePath}"`);
    }

    const envVarNamesAndValues: ReadonlyArray<[string, string]> = envLines.map(
        (envLine): [string, string] => {
            return safeMatch(envLine, /^([^=]+)=(.*)$/).slice(1, 3) as [string, string];
        },
    );

    return filterOutCurrentEnvVars(Object.fromEntries(envVarNamesAndValues));
}
