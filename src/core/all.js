import axios from 'axios';
import Alert from '../components/Alert.vue';

export default {
  data() {
    return {
      cards: [],
      players: [],
      cards_won: [],
      name: '',
      playerId: '',
      JoinForm: {
        name: '',
      },
      message: '',
      showMessage: false,
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getPlayers() {
      const path = 'http://localhost:5000/players';
      axios.get(path)
        .then((res) => {
          this.players = res.data.players;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    joinGame(playerName) {
      const path = `http://localhost:5000/players/${playerName}`;
      axios.put(path)
        .then((res) => {
          this.playerId = res.data.playerId;
          this.players = res.data.players;
          localStorage.name = playerName;
          localStorage.playerId = this.playerId;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    quitGame(playerId) {
      const path = `http://localhost:5000/players/${playerId}`;
      axios.delete(path)
        .then(() => {
          this.message = 'Sorry to see you go!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getCards(playerId) {
      const path = `http://localhost:5000/cards/${playerId}`;
      axios.get(path)
        .then((res) => {
          this.cards = res.data.cards;
          this.cards_won = res.data.cards_won;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    postACard(playerId, payload) {
      const path = `http://localhost:5000/cards/${playerId}`;
      axios.post(path, payload)
        .then(() => {
          this.getCards(playerId);
          this.message = 'Card added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getCards(playerId);
        });
    },
    onSubmit(event) {
      event.preventDefault();
      this.$refs.addPlayerModel.hide();
      const payload = {
        playerName: this.JoinForm.name,
      };
      this.joinGame(payload.playerName);
    },
    onReset() {
    },
  },
  created() {
    this.getPlayers();
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.playerId) {
      this.playerId = localStorage.playerId;
    }
    if (localStorage.getItem('cards')) {
      try {
        this.cards = JSON.parse(localStorage.getItem('cards'));
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
        // localStorage.removeItem('cards');
      }
    }
  },
};
