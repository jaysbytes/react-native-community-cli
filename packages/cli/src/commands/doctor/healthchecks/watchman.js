// @flow
import versionRanges from '../versionRanges';
import {doesSoftwareNeedToBeFixed} from '../checkInstallation';
import type {EnvironmentInfo} from '../types';

export default {
  label: 'Watchman',
  getDiagnostics: ({Binaries}: EnvironmentInfo) => ({
    needsToBeFixed: doesSoftwareNeedToBeFixed({
      version: Binaries.Watchman.version,
      versionRange: versionRanges.WATCHMAN,
    }),
  }),
  runAutomaticFix: () => console.log('should fix watchman'),
};
