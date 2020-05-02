import axios from 'axios';
import Alert from '../components/Alert.vue';

export default {
  data() {
    return {
      players: {},
      cards: [],
      cards_won: [],
      card_added: '',
      name: '',
      playerId: '',
      JoinForm: {
        name: '',
      },
      message: '',
      showMessage: false,
      isConnected: false,
      socketMessage: '',
    };
  },
  components: {
    alert: Alert,
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "notifications" channel.
    notifications(data) {
      // eslint-disable-next-line
      console.log(data);
      this.socketMessage = data;
    },
    // when the game starts, server broadcasts the cards everyone has got.
    gameStarted(data) {
      this.socketMessage = data.message;
      this.cards = JSON.parse(data.cards);
      this.players = JSON.parse(data.players);
    },
    // when someone puts a card in the round, server will broadcast command on
    // 'updateCardView' channel with new card attached to that person.
    // this is intended to render current heap (not the data structure) of cards
    // that everyone has put.
    // `data` contains serialized key-value pairs of player and card added by
    // player (can be empty if that player awaits turn).
    updateCardView(data) {
      this.players = JSON.parse(data);
      const id = this.playerId;
      this.cards = this.players[id].cards;
      this.cards = this.cards.sort();
      localStorage.cards = this.cards;
    },
    // server can broadcast to undo last action
    // TODO P2: Make this efficient by only updating one card?
    undo(data) {
      this.players = JSON.parse(data);
    },

  },
  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!');
    },
    // TODO P2: this is no longer needed
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
    upsideDownCards() {
      // eslint-disable-next-line
      console.log("upsideDownCards was called");
      // TODO: Update this
      this.cards = [];
    },
    getCards(playerId) {
      const path = `http://localhost:5000/cards/${playerId}`;
      axios.get(path)
        .then((res) => {
          this.cards = res.data.cards;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    postACard(card, event) {
      const path = `http://localhost:5000/players/${this.playerId}`;
      const indexOfRemovedCard = this.cards.indexOf(card);
      if (indexOfRemovedCard > -1) {
        this.cards.splice(indexOfRemovedCard, 1);
        localStorage.cards = this.cards;
        this.card_added = card;
        localStorage.card_added = card;
      }
      event.preventDefault();
      const payload = {
        card,
      };
      axios.post(path, payload)
        .then(() => {
          // this.getCards(playerId);
          this.message = `Card added! Payload was ${payload}`;
          // this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
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
  // created() {
  // this.getPlayers();
  // },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.playerId) {
      this.playerId = localStorage.playerId;
    }
    if (localStorage.card_added) {
      this.playerId = localStorage.playerId;
    }
    if (localStorage.getItem('cards')) {
      try {
        this.cards = localStorage.getItem('cards');
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
        // localStorage.removeItem('cards');
      }
    }
  },
};
