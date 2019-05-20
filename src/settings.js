import { notNull } from './validation';
import { loadFile } from './io';

/**
 * A simple function for loading settings json files, such as:
 * {
 *   instanceUrl: <instance api endpoint, e.g., https://botsin.space/api/v1>,
 *   accessToken: <access token>
 * }
 */
export const loadBaseSettings = (file, processSettingsFunc = () => {}) => {
  const settings = loadFile(file);
  if (settings == null) {
    throw new Error('Unable to load settings');
  }

  const { instanceUrl, accessToken } = settings;
  notNull('instanceUrl', instanceUrl);
  notNull('accessToken', accessToken);

  let finalInstanceUrl = instanceUrl;
  if (instanceUrl.endsWith('/') === false) {
    finalInstanceUrl = `${instanceUrl}/`;
  }

  const otherSettings = processSettingsFunc(settings) || {};
  return {
    ...settings,
    ...otherSettings,
    accessToken,
    instanceUrl: finalInstanceUrl,
  };
};
