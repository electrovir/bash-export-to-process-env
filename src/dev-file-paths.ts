import {dirname, join} from 'path';

const repoRootDirPath = dirname(dirname(__filename));

const testFilesDirPath = join(repoRootDirPath, 'test-files');

export const testFilePaths = {
    exampleBash: join(testFilesDirPath, 'example-bash.sh'),
};
