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

      // Format hasil ke dalam bentuk yang sesuai
      const formattedPlaylists = {
        playlists: playlists.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          songs: playlist.songs,
        })),
      };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(formattedPlaylists),
      );
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Failed to process message:', error);
    }
  }
}

module.exports = Listener;
