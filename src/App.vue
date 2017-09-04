<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a href="/" class="navbar-brand">
        <svg class="d-inline-block align-top" width="30" height="30">
          <use xlink:href="#soulection" />
        </svg>
        Soulection Tracklists
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'Episodes' }" class="nav-link">Episodes</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Playlists' }" class="nav-link">Playlists</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link :to="{ name: 'Tracks' }" class="nav-link">Tracks</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Artists' }" class="nav-link">Artists</router-link>
          </li> -->
          <li class="nav-item">
            <a href="https://kylewelsby.typeform.com/to/qZCg4b" target="_blank" class="btn btn-primary">Suggest Edit</a>
          </li>
        </ul>

      </div>
    </nav>
    <router-view class="container"></router-view>
    <div class="card">
      <div class="card-body">
        <div class="text-center">
          <svg width="50" height="50" fill="#d9d9d9">
            <use xlink:href="#soulection" />
          </svg>
        </div>
        <p>Soulection Tracklists is a product of ❤️ for the community and discovery of sounds.</p>
        <p>Developed and maintained by <a href="https://mekyle.com">Kyle Welsby</a> and is not affiliated with <a href="https://soulection.com">Soulection LLC</a>. </p>
        <p><a href='https://ko-fi.com/A3403WZD'>☕️ Buy Me a Coffee</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*color: #2c3e50;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
