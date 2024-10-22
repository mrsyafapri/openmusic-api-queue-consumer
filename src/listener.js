class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this._playlistsService.getPlaylists(userId);

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlists),
      );
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Failed to process message:', error);
    }
  }
}

module.exports = Listener;
