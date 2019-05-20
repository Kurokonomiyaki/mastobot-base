import Fs from 'fs';
import { makeFullyQualifiedAccount, asyncMap } from './misc';
import { rangeInclusive } from './validation';

export const createTootModel = (text, options = {}) => {
  return { ...options, status: text };
};

export const withMedias = (toot, mediaFiles) => {
  rangeInclusive('mediaFiles', mediaFiles.length, 0, 3);
  if (toot.poll != null) {
    throw new Error('poll + media is not supported');
  }
  return { ...toot, mediaFiles };
};

export const withCw = (toot, cw) => {
  return { ...toot, spoiler_text: cw };
};

export const withPoll = (toot, pollOptions, durationSeconds = 60 * 5) => {
  rangeInclusive('pollOptions', pollOptions.length, 0, 3);
  if (toot.mediaFiles != null) {
    throw new Error('poll + media is not supported');
  }
  return {
    ...toot,
    poll: { pollOptions, durationSeconds },
  };
};

export const asReply = (toot, replyTo) => {
  return { ...toot, in_reply_to_id: replyTo };
};

export const withVisibility = (toot, visibility = 'public') => {
  return { ...toot, visibility };
};

export const withRecipients = (toot, recipients, defaultHostname = null) => {
  const cleanRecipients = recipients.map((recipient) => {
    let account = makeFullyQualifiedAccount(recipient);
    // if no host is specified, use default host (if any)
    if (defaultHostname != null && account.split('@').length - 1 === 1) {
      account = `${account}@${defaultHostname}`;
    }
    return account;
  });

  return {
    ...toot,
    recipients: [
      ...toot.recipients,
      ...cleanRecipients,
    ],
  };
};

export const sendToot = async (api, toot) => {
  const { mediaFiles, recipients, poll } = toot;
  const data = { ...toot, mediaFiles: undefined, recipients: undefined, poll: undefined };

  // upload media
  if (mediaFiles != null && mediaFiles.length > 0) {
    const mediaIds = await asyncMap(mediaFiles, async (mediaFile) => {
      const response = await api.post('media', {
        file: Fs.createReadStream(mediaFile),
      });
      if (response.data == null || response.data.id == null) {
        throw new Error(`Error while uploading image: ${mediaFile}, ${response.data || response}`);
      }
      return response.data.id;
    });
    data.media_ids = mediaIds;
  }

  // poll
  if (poll != null) {
    data['poll[options]'] = poll.pollOptions;
    data['poll[expires_in]'] = poll.durationSeconds;
  }

  data.text = `${recipients.join(' ')} ${data.text}`;
  await api.post('statuses', data);
};
