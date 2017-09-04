<template lang="html">
  <div class="artist">
    <h4>{{q}}</h4>
    <hr>
    <div class="trackitem" v-for="track in tracks">
      <small class="text-secondary">
        Episodes:
        <span class="btn btn-sm" v-for="episode in trackEpisodes(track.id)">
          <router-link :to="{ name: 'Episode', params: {number: episode.number} }">{{ episode.number }}</router-link>
          <a :href="audioAtTime(episode, track.id)" target="_blank" class="play-icon">
            <svg class="icon">
              <use xlink:href="#play"/>
            </svg>
          </a>
        </span>
      </small>
      <track-row :track-id="track.id"/>
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
  name: 'artist',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    const tracks = this.$store.getters.artistTracks(this.q)
    return {
      tracks: tracks
    }
  },
  methods: {
    trackEpisodes (trackId) {
      return this.$store.getters.trackEpisodes(trackId)
    },
    audioAtTime (episode, trackId) {
      let track = episode.tracks.find((t) => {
        return t.trackId === trackId
      })
      let dur = moment.duration(track.startAt)
      let time = moment(dur._data).format('HH:mm:ss')
      return episode.soundcloudUrl + `#t=${time}`
    }
  }
}
</script>

<style lang="css" scoped>
.artist {
  background-color: #fff;
  padding: 15px;
}
.trackitem {
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 2px dashed #f5f5f5;
}
.play-icon svg {
  fill: #000;
  height: 12px;
  width: 12px;
}
@media (min-width: 840px) {
  .artist {
    margin: 48px auto;
  }
}
</style>
