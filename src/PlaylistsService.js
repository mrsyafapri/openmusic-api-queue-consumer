const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(userId) {
    // Query untuk mendapatkan playlist dan lagu-lagu terkait
    const query = {
      text: `SELECT 
                playlists.id AS playlist_id, 
                playlists.name AS playlist_name, 
                songs.id AS song_id, 
                songs.title AS song_title, 
                songs.performer AS song_performer
            FROM 
                playlists
            LEFT JOIN 
                playlist_songs ON playlist_songs.playlist_id = playlists.id
            LEFT JOIN 
                songs ON songs.id = playlist_songs.song_id
            LEFT JOIN 
                collaborations ON collaborations.playlist_id = playlists.id
            WHERE 
                collaborations.user_id IS NOT NULL OR playlists.owner = $1
            `,
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new Error('Playlist not found');
    }

    const playlist = {
      id: result.rows[0].playlist_id,
      name: result.rows[0].playlist_name,
      songs: result.rows.map((row) => ({
        id: row.song_id,
        title: row.song_title,
        performer: row.song_performer,
      })),
    };

    return { playlist };
  }
}

module.exports = PlaylistsService;
