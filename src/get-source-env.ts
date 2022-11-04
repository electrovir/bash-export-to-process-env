import {isTruthy, safeMatch} from 'augment-vir';
import {
    interpolationSafeWindowsPath,
    randomString,
    runShellCommand,
} from 'augment-vir/dist/cjs/node-only';
import {filterOutCurrentEnv} from './filter-env';

export async function getNewEnvFromScript(
    shellFilePath: string,
): Promise<Readonly<Record<string, string>>> {
    const deliminator = randomString(128);

    const output = await runShellCommand(
        `source "${interpolationSafeWindowsPath(shellFilePath)}"; printf "${deliminator}"; env -0;`,
        {
            rejectOnError: true,
        },
    );

    const [
        ,
        envOutput,
    ] = output.stdout.trim().split(deliminator);

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

    return filterOutCurrentEnv(Object.fromEntries(envVarNamesAndValues));
}
