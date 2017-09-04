<template lang="html">
  <div class="playlist">
    <h4>
      {{playlist.name}}
      <router-link :to="{ name: 'Episode', params: {number: episode.number} }">
        <small class="text-primary">from Show #{{episode.number}}</small>
      </router-link>
    </h4>
    <section class="section-center row">
      <div class="col">
        <h4>Tracks</h4>
      </div>
      <div class="w-100"></div>
      <div class="col">
        <table class="table table-responsive" cellspacing="0">
          <tbody>
            <tr v-for="track in tracks">
              <td scope="row">
                {{ track.number }}
                <small>
                  <a :href="audioAtTime(track.startAt)" target="_blank">
                    <svg class="icon">
                      <use xlink:href="#play"/>
                    </svg>
                    ~{{ duration(track.startAt) }}
                  </a>
                </small>
              </td>
              <td>
                <track-row :track-id="track.trackId"/>
              </td>
            </tr>
          </tbody>
        </table>
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
  name: 'playlist',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    let playlist = this.$store.state.playlists[this.id]
    return {
      playlist
    }
  },
  computed: {
    episode () {
      return this.$store.state.episodes[this.playlist.episodeId]
    },
    tracks () {
      return this.$store.getters.tracksForPlaylist(this.id)
    }
  },
  methods: {
    duration (v) {
      let dur = moment.duration(v)
      if (dur.asHours() >= 1) {
        return moment(dur._data).format('H[h] m[m]')
      } else {
        return moment(dur._data).format('m[m]')
      }
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
.playlist{
  background-color: #fff;
  padding: 15px;
}
.icon {
  width: 12px;
  height: 12px;
}
@media (min-width: 840px) {
  .playlist {
    margin: 48px auto;
  }
}
</style>
