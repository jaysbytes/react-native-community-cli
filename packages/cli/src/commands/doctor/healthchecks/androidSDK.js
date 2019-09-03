// @flow
import chalk from 'chalk';
import Ora from 'ora';
import {logManualInstallation} from './common';
import versionRanges from '../versionRanges';
import {doesSoftwareNeedToBeFixed} from '../checkInstallation';
import type {EnvironmentInfo} from '../types';

export default {
  label: 'Android SDK',
  getDiagnosticsAsync: async ({SDKs}: EnvironmentInfo) => ({
    needsToBeFixed: doesSoftwareNeedToBeFixed({
      version: SDKs['Android SDK']['Build Tools'][0],
      versionRange: versionRanges.ANDROID_NDK,
    }),
  }),
  runAutomaticFix: async ({
    loader,
    environmentInfo,
  }: {
    loader: typeof Ora,
    environmentInfo: EnvironmentInfo,
  }) => {
    const version = environmentInfo.SDKs['Android SDK'][0];
    const isNDKInstalled = version !== 'Not Found';

    loader.fail();

    if (isNDKInstalled) {
      return logManualInstallation({
        message: `Read more about how to update Android SDK at ${chalk.dim(
          'https://developer.android.com/studio',
        )}`,
      });
    }

    return logManualInstallation({
      healthcheck: 'Android SDK',
      url: 'https://developer.android.com/studio',
    });
  },
};
