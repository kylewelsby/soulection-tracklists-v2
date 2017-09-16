<template lang="html">
  <div>
    <div class="search">
      <input type="search" v-model="searchTerm" placeholder="Playlist Search"/>
    </div>
    <div class="playlists">
      <h4>Playlists</h4>
      <table class="table">
        <tr v-for="playlist in filteredPlaylists">
          <td width="64">
            <router-link :to="{name: 'Playlist', params: {id: playlist.playlistId}}">
              <img :src="episodeThumbnail(playlist.episodeId)" :alt="'Show #' + episode(playlist.episodeId).number" width="64" style="display: inline-block;">
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'Playlist', params: {id: playlist.playlistId}}" class="text-dark">
              <h6>
                {{playlist.name}}
                <br/>
                <small class="text-primary">from Show #{{episode(playlist.episodeId).number}}</small>
              </h6>
              <span>
                ({{ tracksForPlaylist(playlist.playlistId).length }} tracks)
                <small class="text-secondary" v-if="Object.keys(playlistsForEpisode(playlist.episodeId)).length === 1">
                  full episode
                </small>
              </span>
            </router-link>
          </td>
        </tr>
        <!-- <tr v-for="(track, index) in tracksForPlaylist(playlist.playlistId)">
          <td>
            {{index + 1}}
            <small><a :href="audioAtTime(episode(playlist.episodeId), track.startAt)" target="_blank">~{{ duration(track.startAt) }}</a></small>
          </td>
          <td>
            <track-row :track-id="track.trackId"/>
          </td>
        </tr> -->
      </table>
    </div>
  </div>
</template>

<script>
import TrackRow from './TrackRow'
import moment from 'moment'

export default {
  components: {
    TrackRow
  },
  name: 'playlists',
  data () {
    let playlistsIds = Object.keys(this.$store.state.playlists).sort((a, b) => {
      let playlistA = this.$store.state.playlists[a]
      let playlistB = this.$store.state.playlists[b]
      let episodeA = this.$store.state.episodes[playlistA.episodeId]
      let episodeB = this.$store.state.episodes[playlistB.episodeId]
      return episodeB.number - episodeA.number
    })

    let playlists = playlistsIds.map((playlistId) => {
      return Object.assign({
        playlistId: playlistId
      }, this.$store.state.playlists[playlistId])
    })

    return {
      playlists: playlists,
      searchTerm: ''
    }
  },
  computed: {
    filteredPlaylists () {
      return this.playlists.filter((playlist) => {
        return playlist.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0
      })
    }
  },
  methods: {
    episode (episodeId) {
      return this.$store.state.episodes[episodeId]
    },
    episodeThumbnail (episodeId) {
      let episode = this.episode(episodeId)
      return episode.artworkUrl.replace('t500x500', 't80x80')
    },
    tracksForPlaylist (playlistId) {
      return this.$store.getters.tracksForPlaylist(playlistId)
    },
    playlistsForEpisode (episodeId) {
      return this.$store.getters.playlistsForEpisode(episodeId)
    },
    duration (v) {
      let dur = moment.duration(v)
      if (dur.asHours() >= 1) {
        return moment(dur._data).format('H[h] m[m]')
      } else {
        return moment(dur._data).format('m[m]')
      }
    },
    audioAtTime (episode, v) {
      let dur = moment.duration(v)
      let time = moment(dur._data).format('HH:mm:ss')
      return episode.soundcloudUrl + `#t=${time}`
    }
  }
}
</script>

<style lang="css" scoped>
.playlists{
  background-color: #fff;
  padding: 15px;
}
/*.playlist {
  border-bottom: 10px dashed #f5f5f5;
  margin-bottom: 20px;
}*/
.playlist .table {
  margin-top: 20px;
}
.search input[type=search] {
  border: none;
  width: 100%;
  padding: 15px;
}
@media (min-width: 840px) {
  .playlists, .search {
    margin: 48px auto;
  }
}
</style>
