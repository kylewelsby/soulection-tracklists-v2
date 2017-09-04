export const episodeIdFromNumber = (state, getters) => (episodeNumber) => {
  return Object.keys(state.episodes).filter((key) => {
    return state.episodes[key].number === episodeNumber
  })
}

export const episodeTracks = (state, getters) => (episodeId) => {
  const episode = getters.episode(episodeId)
  let trackDefault = {
    title: null,
    artist: null,
    startAt: null,
    endAt: null,
    number: null,
    playlistId: null,
    trackId: null
  }
  const tracks = episode.tracks.map((episodeTrack, index) => {
    let track = Object.assign(Object.assign({}, trackDefault), episodeTrack, state.tracks[episodeTrack.trackId])
    track.number = index + 1
    return track
  })
  return tracks
}

export const episode = (state) => (episodeId) => {
  return state.episodes[episodeId]
}

export const artistTracks = (state) => (artistName) => {
  if (!artistName) {
    return []
  }
  let trackIds = Object.keys(state.tracks).filter((trackId) => {
    let track = state.tracks[trackId]
    if (!track.artist) {
      return
    }
    return track.artist.trim().toLowerCase() === artistName.trim().toLowerCase()
  })
  return trackIds.map((trackId) => {
    let track = Object.assign({}, state.tracks[trackId])
    track.id = trackId
    return track
  })
}

export const trackEpisodes = (state) => (trackId) => {
  if (!trackId) {
    return []
  }
  let episodeIds = Object.keys(state.episodes).filter((episodeId) => {
    let episode = state.episodes[episodeId]
    return episode.tracks.find((track) => {
      return track.trackId === trackId
    })
  })
  return episodeIds.map((episodeId) => {
    return state.episodes[episodeId]
  })
}

export const playlistsForEpisode = (state) => (episodeId) => {
  let episode = state.episodes[episodeId]
  let playlists = {}
  episode.tracks.map((track) => {
    if (!playlists[track.playlistId]) {
      playlists[track.playlistId] = Object.assign({
        playlistId: track.playlistId,
        trackCount: 0
      }, state.playlists[track.playlistId])
    }
    playlists[track.playlistId].trackCount = playlists[track.playlistId].trackCount + 1
  })
  return playlists
}

export const tracksForPlaylist = (state) => (playlistId) => {
  let playlist = state.playlists[playlistId]
  return state.episodes[playlist.episodeId].tracks.filter((track) => {
    return track.playlistId === playlistId
  })
}
