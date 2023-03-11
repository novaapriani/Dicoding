const autoBind = require('auto-bind');

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(req, h) {
    this._validator.validatePlaylistPayload(req.payload);
    const { name } = req.payload;
    const { id: credentialId } = req.auth.credentials;
    const playlistId = await this._service.addPlaylist({
      name,
      owner: credentialId,
    });

    return h
      .response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      })
      .code(201);
  }

  async getPlaylistsHandler(req) {
    const { id: credentialId } = req.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(req) {
    const { id } = req.params;
    const { id: credentialId } = req.auth.credentials;
    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async postPlaylistSongHandler(req, h) {
    this._validator.validatePlaylistSongPayload(req.payload);
    const { songId } = req.payload;
    // playlist Id
    const { id } = req.params;
    const { id: credentialId } = req.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.verifyNewSong(songId);
    const playlistSongId = await this._service.addPlaylistSong({ id, songId });

    return h
      .response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
        data: {
          playlistSongId,
        },
      })
      .code(201);
  }

  async getPlaylistSongsHandler(req) {
    const { id } = req.params;
    const { id: credentialId } = req.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    const playlist = await this._service.getPlaylistById(id);
    playlist.songs = await this._service.getPlaylistSong(id);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongByIdHandler(req) {
    const { id } = req.params;
    const { songId } = req.payload;
    const { id: credentialId } = req.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistSong(id, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsHandler;
