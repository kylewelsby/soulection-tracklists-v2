<template lang="html">
  <div class="episode">
    <section class="section-center row">
      <header class="col">
        <img :src="episode.artworkUrl" :alt="'Show #' + number" width="100%" style="display: inline-block;">
      </header>
      <div class="col-10">
        <div class="row">
          <div class="col">
            <h4>Show #{{number}}
              <small v-if="episode.broadcastedAt"> - {{ episodeDate() }}</small>
            </h4>
          </div>
          <div class="col text-right">
            <a href="" class="mdl-button">Listen on SoundCloud</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section-center row" v-if="tracks.length">
      <div class="col">
        <h4>Tracks</h4>
      </div>
      <div class="w-100"></div>
      <div class="col">
        <table class="table table-responsive" cellspacing="0">
          <tbody>
            <template v-for="(track, index) in tracks">
              <tr v-if="track.playlistId !== (tracks[index-1] && tracks[index-1].playlistId)">
                <th colspan="2">
                  <router-link :to="{ name: 'Playlist', params: {id: track.playlistId} }">
                    {{ playlistForTrack(track).name }}
                  </router-link>
                </th>
              </tr>
              <tr>
                <td scope="row">
                  {{ track.number }}
                  <small><a :href="audioAtTime(track.startAt)" target="_blank">~{{ duration(track.startAt) }}</a></small>
                </td>
                <td>
                  <track-row :track-id="track.trackId"/>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section-center card bg-danger mb-3 text-white" v-else>
      <div class="card-body">
        <h3 class="card-title">Oh no</h3>
        <p class="card-text">The tracklist for this show has not been officially published by the Soulection team yet.</p>
        <p class="card-text">If you're a keen track identifier, please help out by <a href="https://kylewelsby.typeform.com/to/qZCg4b" class="btn btn-light">submitting edits</a> or email a whole list through to <a href="mailto:kyle@mekyle.com" class="btn btn-light">kyle@mekyle.com</a></p>
      </div>
    </section>
  </div>
</template>

<script>
import TrackRow from './TrackRow'
import moment from 'moment'
export default {
  components: {
    TrackRow
  },
  name: 'episode',
  props: {
    number: {
      type: Number,
      required: true
    }
  },
  data () {
    const episodeId = this.$store.getters.episodeIdFromNumber(this.number)
    const episode = this.$store.getters.episode(episodeId)
    const tracks = this.$store.getters.episodeTracks(episodeId)
    return {
      episode: episode,
      tracks: tracks
    }
  },
  methods: {
    moment () {
      return moment()
    },
    duration (v) {
      let dur = moment.duration(v)
      if (dur.asHours() >= 1) {
        return moment(dur._data).format('H[h] m[m]')
      } else {
        return moment(dur._data).format('m[m]')
      }
    },
    playlistForTrack (track) {
      return this.$store.state.playlists[track.playlistId]
    },
    episodeDate () {
      return moment(this.episode.broadcastedAt).format('Do MMMM Y')
    },
    audioAtTime (v) {
      let dur = moment.duration(v)
      let time = moment(dur._data).format('HH:mm:ss')
      return this.episode.soundcloudUrl + `#t=${time}`
    }
  }
}
</script>

<style lang="css" scoped>
  .episode section {
    padding: 15px 0;
    background-color: #fff;
  }
  .episode section:not(:last-of-type) {
    margin-bottom: 48px;
  }
  @media (min-width: 840px) {
    .episode {
      padding: 48px;
    }
    .section-center {
      min-width: 860px
    }
  }
  /*.table {
    border-collapse: separate;
    border-spacing: 2px;
    margin-bottom: 20px;
  }
  .table tr {
    border: rgba(254,235,52,.8) solid 2px;
  }
  .table tbody tr:nth-child(2n+1) {
    background-color: #fafafa;
  }*/
</style>
