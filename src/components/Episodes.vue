<template lang="html">
  <div class="episodes">
    <h4>Episodes</h4>
    <table class="table">
      <tr v-for="episode in episodes" :key="episode.episodeId">
        <td width="64">
          <router-link :to="{name: 'Episode', params: {number: episode.number}}">
            <img :src="episodeThumbnail(episode.artworkUrl)" :alt="'Show #' + episode.number" width="64" style="display: inline-block;">
          </router-link>
        </td>
        <td>
          <h5>
            <router-link :to="{name: 'Episode', params: {number: episode.number}}">
              <div class="row">
                <div class="col">Show #{{episode.number}}</div>
                <div class="col text-right" v-if="episode.broadcastedAt">{{episodeDate(episode.broadcastedAt)}}</div>
              </div>
            </router-link>
          </h5>
          <ul class="list-unstyled">
            <li v-for="playlist in playlistsForEpisode(episode.episodeId)" :key="playlist.playlistId">
              <router-link :to="{ name: 'Playlist', params: {id: playlist.playlistId} }">
                {{ playlist.name }}
              </router-link>
              <small class="text-secondary">{{playlist.trackCount}} tracks</small>
            </li>
          </ul>
          <router-link :to="{name: 'Episode', params: {number: episode.number}}">
            <small>{{episode.tracks.length}} total tracks</small>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'episodes',
  data () {
    let episodeIds = Object.keys(this.$store.state.episodes).sort((a, b) => {
      return this.$store.state.episodes[b].number - this.$store.state.episodes[a].number
    })
    let episodes = episodeIds.map((episodeId) => {
      return Object.assign({
        episodeId: episodeId
      }, this.$store.state.episodes[episodeId])
    })
    return {
      episodes: episodes
    }
  },
  methods: {
    episodeThumbnail (artwork) {
      return artwork.replace('t500x500', 't80x80')
    },
    episodeDate (v) {
      return moment(v).format('Do MMMM Y')
    },
    playlistsForEpisode (v) {
      return this.$store.getters.playlistsForEpisode(v)
    }
  }
}
</script>

<style lang="css" scoped>
.episodes {
  background-color: #fff;
  padding: 15px;
}
@media (min-width: 840px) {
  .episodes {
    margin: 48px auto;
  }
}
</style>
