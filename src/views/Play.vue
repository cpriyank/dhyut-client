<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>ચાલોને રમવા રહીએ</h1>
        <hr />
        <br />
        <br />
        <alert :message="message" v-if="showMessage"></alert>
        <h1 v-if="playerId">You're playing as {{ name }}</h1>
        <h1 v-else>જલ્દી જોડાઈ જાઓ 😢</h1>
        <div>
          <p v-if="isConnected">We're connected to the server!</p>
          <p>Message from server: "{{socketMessage}}"</p>
          <button @click="pingServer()">Ping Server</button>
        </div>
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-if="!name"
          v-b-modal.player-modal
        >એ હાલો!</button>
        <button
          @click="quitGame(playerId)"
          type="button"
          class="btn btn-success btn-sm"
          v-if="name"
        >મારે નથી રમવું</button>
        <br />
        <br />
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
    cards length is {{cards.length}}
    <svg>
      <use xlink:href="../assets/svg-cards.svg#club_1" />
    </svg>
    <div v-if="cards.length">
      <b-card v-for="( card, index ) in cards" :key="index" style="max-width: 20rem;" class="mb-2">
        <b-card-text>{{card}}</b-card-text>

        <b-button @click="postACard(card, $event)">આ કાર્ડ ઉતરો</b-button>
      </b-card>
    </div>
    <b-modal ref="addPlayerModel" id="player-modal" title="Add a new player" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-title-group" label="Title:" label-for="form-title-input">
          <b-form-input
            id="form-title-input"
            type="text"
            v-model="JoinForm.name"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script language="JavaScript" src="../core/all.js"></script>
