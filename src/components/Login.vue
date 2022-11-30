<template>
  <div class="login-container">
    <div class="login_form">
      <v-btn :to="{ path: '/map' }" class="toMapBtn" dark>
        <span>Volver al mapa</span>
        <v-icon>arrow_left</v-icon>
      </v-btn>
      <v-btn @click="logout" color="primary" v-if="authenticated" flat
        >LOGOUT</v-btn
      >
      <form @submit.prevent="findUser()" class="loginForm">
        <div v-if="!authenticated">
          <input
            class="login_input"
            type="text"
            placeholder="Nombre de usuario"
            v-model="loginUser.name"
          />
          <input
            class="login_input"
            type="password"
            placeholder="Contraseña"
            v-model="loginUser.password"
          />
        </div>
        <v-btn
          type="submit"
          class="loginBtn"
          color="primary"
          v-if="!authenticated"
          >LOGIN</v-btn
        >
        <router-link :to="{ path: '/register' }" dark>
          <span>Registrarme</span>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { getDatabase, ref, onValue } from "firebase/database";
import config from "../config-firebase";

const firebaseConfig = config;
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
      loginUser: {
        name: "",
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
    findUser: function () {
      console.log(this.loginUser);
      onValue(raiz, (snapshot) => {
        const data = snapshot.val();
        //console.log(data);
        for (let dato in data){
          console.log(dato);
          if(dato == this.loginUser.name){
            this.authenticated = true;
            console.log('Login correcto');
          }
        }
        if(this.authenticated == false){
            console.log("El email no está registrado en nuestra BD");
          }
      });
    },
  },
  created() {},
};
</script>

<style>
.login-container {
  position: fixed;
  background-image: url("../.././public/OpenStreetMap.png");
  background-size: cover;
  height: 100%;
  width: 100%;
}
.login_form {
  margin: 15em auto;
  padding: 25px;
  width: 300px;
  background-color: rgb(202, 202, 202);
  max-width: 600px;
  min-width: 100px;
  border-radius: 20px;
  border: 8px solid rgb(99, 0, 0);
}
.login_input {
  width: 100%;
  max-width: 95%;
  height: 30px;
  margin: 10px 0;
  border-radius: 5px;
  border: 2px solid #fff;
  outline: none;
  font-size: 14px;
  padding-left: 10px;
  background-color: white;
}
.language-select {
  max-width: 400px;
}
.toMapBtn {
  position: fixed;
}
.loginForm {
}
</style>