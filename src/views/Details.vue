<template>
    <GameDetails
            :game=game
            :isLoaded="isLoaded"
            v-on:goToDetail="goToDetail"

    />
</template>

<script>
  // @ is an alias to /src
  import GameDetails from '@/components/GameDetails.vue';
  import GamesService from '@/services/GamesService';

  export default {
    name: 'Detail',
    props: {
      id: String,
    },
    data() {
      return {
        game: {},
        isLoaded: false,
        };
    },
    components: {
        GameDetails,
    },
    created() {
      this.getGameDetails(this.id);
    },
    methods: {
      getGameDetails(id) {
        GamesService.getGame(id).then(res => {
            this.game = res.data[0]
            if ("aggregated_rating" in this.game) {
                this.game.aggregated_rating = Math.round((this.game.aggregated_rating + Number.EPSILON))
            }
            this.isLoaded = true

        })
      },
      goToDetail(id) {
        this.isLoaded = false;
        this.game = {};
        this.getGameDetails(id);
      },

    },

};
</script>
