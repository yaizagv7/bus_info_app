<template>
  <div class="login-container">
    <div class="login_form">
      <v-btn @click="logout" color="primary" v-if="authenticated" flat
        >LOGOUT</v-btn
      >
      <form @submit.prevent="addUser()">
        <div v-if="!authenticated">
          <input
            class="login_input"
            type="text"
            placeholder="Nombre de usuario"
            v-model="userName"
          />
          <input
            class="login_input"
            type="text"
            placeholder="Email"
            v-model="newUser.email"
          />
          <input
            class="login_input"
            type="password"
            placeholder="Contraseña"
            v-model="newUser.password"
          />
        </div>
        <v-btn type="submit" color="primary" v-if="!authenticated"
          >REGISTRAR</v-btn
        >
      </form>
      <v-btn :to="{ path: '/map' }" dark>
        <span>Volver al mapa</span>
        <v-icon>arrow_left</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCPdvUivHRuvuyShLVAqxHgpYgL0w1zPQ4",
  authDomain: "businfomapp.firebaseapp.com",
  databaseURL:
    "https://businfomapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "businfomapp",
  storageBucket: "businfomapp.appspot.com",
  messagingSenderId: "436533237430",
  appId: "1:436533237430:web:dfa99c899205ffdf63f817",
  measurementId: "G-SWMK851T2N",
};
const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);
let raiz = ref(db, "users/");
console.log(raiz);
export default {
  data: function () {
    return {
      db: db,
      raiz: raiz,
      authenticated: false,
      userName: "",
      newUser: {
        email: "",
        password: "",
      },
      logged: false,
    };
  },
  methods: {
    toMap: function () {
      this.$router.push({ path: "/map" });
    },
    changeLang: function () {
      localStorage.setItem("lang", this.$i18n.locale);
    },
    addUser: function () {
      console.log(this.newUser);
      set(ref(this.db, "users/" + this.userName), this.newUser);
    },
  },
  created() {},
};
</script>

<style>
</style>