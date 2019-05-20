class MockListener {
  constructor(path) {
    this.listeners = [];
    this.path = path;
  }

  on(event, listener) {
    this.listeners[event] = listener;
  }

  async emit(event, ...params) {
    await this.listeners[event](...params);
  }
}

export const configureMastodonMock = (onGet = null, onPost = null, onPut = null, onDelete = null) => {
  return class MockMastodon {
    constructor(params) {
      this.params = params;
    }

    stream(path) {
      if (this.listner == null) {
        this.listener = new MockListener(path);
      }
      return this.listener;
    }

    async get(path) {
      return onGet(this, path);
    }

    async post(path, data) {
      return onPost(this, path, data);
    }

    async put(path, data) {
      return onPut(this, path, data);
    }

    async delete(path) {
      return onDelete(this, path);
    }

    async emitMessage(message) {
      if (this.listener != null) {
        await this.listener.emit('message', message);
      }
    }

    async emitError(error) {
      if (this.listener != null) {
        await this.listener.emit('error', error);
      }
    }

    async emitHeartbeat() {
      if (this.listener != null) {
        await this.listener.emit('heartbeat');
      }
    }
  };
};
