import Mastodon from 'mastodon-api';

export const instantiate = ({ accessToken, instanceUrl }) => {
  return new Mastodon({
    access_token: accessToken,
    api_url: instanceUrl,
  });
};

export const instantiateWithStreaming = ({ accessToken, instanceUrl }, onMessage, onError = null, onHeartbeat = null) => {
  const instance = new Mastodon({
    access_token: accessToken,
    api_url: instanceUrl,
  });

  const listener = instance.stream('streaming/user');
  listener.on('message', (msg) => onMessage(instance, msg));
  if (onError != null) {
    listener.on('error', (err) => onError(instance, err));
  }
  if (onHeartbeat != null) {
    listener.on('heartbeat', () => onHeartbeat(instance));
  }

  return instance;
};
