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

    // Format hasil query ke struktur JSON yang diinginkan
    const playlistsMap = result.rows.reduce((acc, row) => {
      if (!acc[row.playlist_id]) {
        acc[row.playlist_id] = {
          id: row.playlist_id,
          name: row.playlist_name,
          songs: [],
        };
      }

      if (row.song_id) {
        acc[row.playlist_id].songs.push({
          id: row.song_id,
          title: row.song_title,
          performer: row.song_performer,
        });
      }

      return acc;
    }, {});

    return Object.values(playlistsMap);
  }
}

module.exports = PlaylistsService;
