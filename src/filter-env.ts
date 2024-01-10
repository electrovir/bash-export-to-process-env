import {filterObject, typedHasProperty} from '@augment-vir/common';

/** Remove all keys that exist in the current environment. */
export function filterOutCurrentEnvVars(
    envVars: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> {
    return filterObject(envVars, (key, value) => {
        return !typedHasProperty(process.env, key) || process.env[key] !== value;
    }) as Readonly<Record<string, string>>;
}
