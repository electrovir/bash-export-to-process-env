import {filterObject, omitObjectKeys, typedHasProperty} from '@augment-vir/common';

/** Remove all keys that exist in the current environment. */
export function filterOutCurrentEnv(
    envVars: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> {
    return filterObject(envVars, (key, value) => {
        return !typedHasProperty(process.env, key) || process.env[key] !== value;
    }) as Readonly<Record<string, string>>;
}

const specialEnvVarKeysToRemove = [
    /**
     * Special shell variable that doesn't represent intentionally populated env variables. See
     * https://askubuntu.com/q/1198935 for details (or search for the "underscore" variable).
     */
    '_',
];

/** Remove special env variables that nobody wants to see. */
export function removeSpecialShellVariables(envVars: Readonly<Record<string, string>>) {
    return omitObjectKeys(envVars, specialEnvVarKeysToRemove);
}
