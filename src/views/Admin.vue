<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>ચાલોને રમવા રહીએ</h1>
        <hr>
        <br><br>
        <alert :message=message v-if="showMessage"></alert>
        <h1>Hello, fair admin!</h1>
        <div>
          <p v-if="isConnected">We're connected to the server!</p>
          <p>Message from server: "{{socketMessage}}"</p>
          <button @click="pingServer()">Ping Server</button>
        </div>
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-if="!decks"
          v-b-modal.player-modal>
          એ હાલો!
        </button>
        <br><br>
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Player</th>
            <th scope="col">ઉતરેલું પત્તુ</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(player, index) in players" :key="index">
            <td>{{ player['name'] }}</td>
            <td>{{ player['card_added'] }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal ref="addDecksModel"
             id="player-modal"
             title="How many decks?"
             hide-footer>
      <b-form @submit="onSubmittingNumberOfDecks" class="w-100">
        <b-form-group id="form-title-group"
                      label="number of decks:"
                      label-for="form-title-input">
          <b-form-input id="form-title-input"
                        placeholder="3"
                        required
                        type="text"
                        v-model="StartGameForm.numberOfDecks">
          </b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script language="JavaScript" src="../core/admin.js"></script>
