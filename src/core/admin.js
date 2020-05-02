// import axios from 'axios';
import axios from 'axios';
import Alert from '../components/Alert.vue';

export default {
  data() {
    return {
      players: [],
      StartGameForm: {
        numberOfDecks: '',
      },
      decks: 0,
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
    // when the game starts, server broadcasts the cards everyone has got.
    gameStarted(data) {
      this.socketMessage = data.message;
      this.cards = JSON.parse(data.cards);
      this.players = JSON.parse(data.players);
    },
    // server can broadcast to undo last action
    // TODO P2: Make this efficient by only updating one card?
    undo(data) {
      this.players = JSON.parse(data);
    },
    // when someone puts a card in the round, server will broadcast command on
    // 'updateCardView' channel with new card attached to that person.
    // this is intended to render current heap (not the data structure) of cards
    // that everyone has put.
    // `data` contains serialized key-value pairs of player and card added by
    // player (can be empty if that player awaits turn).
    updateCardView(data) {
      this.players = JSON.parse(data);
    },

  },
  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!');
    },
    startGame() {
      // Send the "startGame" event to the server.
      this.$socket.emit('startGame');
    },
    onSubmittingNumberOfDecks(event) {
      event.preventDefault();
      this.$refs.addDecksModel.hide();
      const payload = {
        number_of_decks: this.StartGameForm.numberOfDecks,
      };
      this.decks = payload.number_of_decks;
      const path = 'http://localhost:5000/game/start';
      axios.put(path, payload)
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
};
