import {filterObject, typedHasProperty} from 'augment-vir';

export function filterOutCurrentEnv(
    envVars: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> {
    return filterObject(envVars, (key, value) => {
        return !typedHasProperty(process.env, key) || process.env[key] !== value;
    }) as Readonly<Record<string, string>>;
}
