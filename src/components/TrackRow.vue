<template lang="html">
  <div class="track">
    <div class="details">
      <div class="title">
        {{ title }}
      </div>
      <div class="artist" >
        <router-link :to="{ name: 'Artist', params: {q: artist} }">
          {{ artist }}
        </router-link>
      </div>
    </div>
    <div class="actions">
      <hr>
      <div class="btn-group btn-group-sm" role="group" aria-label="find via">
        <a class="btn btn-google" :href="googleUrl" target="_blank" title="Google Search">
          <svg class="icon">
            <use xlink:href="#google" />
          </svg>
        </a>
        <a class="btn btn-soundcloud" :href="soundcloudUrl" target="_blank">
          <svg class="icon">
            <use xlink:href="#soundcloud" />
          </svg>
          <span class="d-none d-sm-inline">
            SoundCloud
            <svg class="icon" v-if="this.sources.soundcloud">
              <use xlink:href="#verified" />
            </svg>
          </span>
        </a>
        <a class="btn btn-youtube" :href="youtubeUrl" target="_blank">
          <svg class="icon">
            <use xlink:href="#youtube" />
          </svg>
          <span class="d-none d-sm-inline">
            YouTube
            <svg class="icon" v-if="this.sources.youtube">
              <use xlink:href="#verified" />
            </svg>
          </span>
        </a>
        <a class="btn btn-lastfm" :href="lastfmUrl" target="_blank">
          <svg class="icon">
            <use xlink:href="#lastfm" />
          </svg>
          <span class="d-none d-sm-inline">
            Last.fm
            <svg class="icon" v-if="this.sources.lastfm">
              <use xlink:href="#verified" />
            </svg>
          </span>
        </a>
        <a class="btn btn-bandcamp" :href="bandcampUrl" target="_blank">
          <svg class="icon">
            <use xlink:href="#bandcamp" />
          </svg>
          <span class="d-none d-sm-inline">
            Bandcamp
            <svg class="icon" v-if="this.sources.bandcamp">
              <use xlink:href="#verified" />
            </svg>
          </span>
        </a>
      </div>
     <div class="btn-group btn-group-sm" role="group" aria-label="Extra options">
        <a class="btn btn-secondary" :href="alterationUrl" target="_blank">
          <svg class="icon">
            <use xlink:href="#edit" />
          </svg>
          <span class="d-none d-sm-inline">
            Suggest Edit
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trackRow',
  props: {
    trackId: {
      type: String,
      required: true
    }
  },
  data () {
    let track = this.$store.state.tracks[this.trackId]
    return Object.assign({
      id: this.trackId,
      sources: {},
      title: null,
      artist: null
    }, track)
  },
  computed: {
    alterationUrl () {
      return `https://kylewelsby.typeform.com/to/qZCg4b`
    },
    soundcloudUrl () {
      if (this.sources.soundcloud) {
        return this.sources.soundcloud
      } else {
        return `https://soundcloud.com/search?q=${this.artist}%20-%20${this.title}`
      }
    },
    youtubeUrl () {
      if (this.sources.youtube) {
        return this.sources.youtube
      } else {
        return `https://www.youtube.com/results?q=${this.artist}%20-%20${this.title}`
      }
    },
    lastfmUrl () {
      if (this.sources.lastfm) {
        return this.sources.lastfm
      } else {
        return `https://www.last.fm/search/tracks?q=${this.artist}%20-%20${this.title}`
      }
    },
    bandcampUrl () {
      if (this.sources.bandcamp) {
        return this.sources.bandcamp
      } else {
        return `https://bandcamp.com/search?q=${this.artist}%20-%20${this.title}`
      }
    },
    googleUrl () {
      return `https://google.com/search?q=${this.artist}%20-%20${this.title}`
    }
  }
}
</script>

<style lang="css" scoped>
.track {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.track .details {
  flex: 1;
  text-align: left;
}
.track .actions {
  align-content: center;
}

.btn-goggle {
}

.btn-youtube {
  background-color: #cd201f;
  border-color: #cd201f;
  color: #fff;
}
.btn-soundcloud {
  background-color: #ff8800;
  border-color: #ff8800;
  color: #fff;
}
.btn-lastfm {
  background-color: #d51007;
  border-color: #d51007;
  color: #fff;
}
.btn-bandcamp {
  background-color: #629aa9;
  border-color: #629aa9;
  color: #fff;
}
.btn-group .btn svg {
  fill: #fff;
  width: 16px;
  height: 16px;
  margin-bottom: -2px;
}
</style>
