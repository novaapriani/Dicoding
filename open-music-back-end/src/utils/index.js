const mapAlbumToModel = ({ id, name, year, createdAt, updatedAt }) => ({
  id,
  name,
  year,
});

const mapSongToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  performer,
});

module.exports = {
  mapAlbumToModel,
  mapSongToModel,
};
