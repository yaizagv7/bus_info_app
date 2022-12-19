<template>
  <div class="login-container">
    <div class="login_form">
      <v-btn :to="{ name: 'map' }" class="toMapBtn" dark>
        <span>Volver al mapa</span>
        <v-icon>arrow_left</v-icon>
      </v-btn>
      <div v-if="logged == 'no'" class="loginForm">
        <form @submit.prevent="findUser()">
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
          <v-btn
            type="submit"
            class="loginBtn"
            color="primary"
            >LOGIN</v-btn
          >
          <router-link :to="{ path: '/register' }" dark>
            <span>Registrarme</span>
          </router-link>
        </form>
      </div>
      <div v-else-if="logged == 'si'" class="contact_form">
        <v-btn @click="logout" color="primary" flat>Cerrar Sesión</v-btn>
        <contact></contact>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { getDatabase, ref, onValue } from "firebase/database";
import config from "../config-firebase";
import Contact from './Contact.vue';

const firebaseConfig = config;
const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);
let raiz = ref(db, "users/");

export default {
  components: { Contact },
  data: function () {
    return {
      db: db,
      raiz: raiz,
      logged: "no",
      loginUser: {
        name: "",
        password: "",
      },
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
      let ruta = "users/" + this.loginUser.name;
      let raizUser = ref(db, ruta);
      console.log(ruta);
      onValue(raizUser, (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val() == null) {
          return console.log("El usaurio no existe");
        }
        const pw = snapshot.val().password;
        if (pw == this.loginUser.password) {
          this.$cookies.remove('logged');
          this.$cookies.set('logged', 'si');
          this.logged = this.$cookies.get('logged');
          console.log('login' + this.logged);
        }
        if (this.logged == false) {
          console.log("La contraseña no es correcta");
        }
      });
    },
    logout: function () {'logged'
      this.$cookies.remove('logged');
      this.$cookies.set('logged', 'no');
      console.log('logout funcion' + this.$cookies.get('logged'));
      this.logged = this.$cookies.get('logged');
    },
  },
  mounted(){  
    if(!this.$cookies.get('logged')){
      this.$cookies.set('logged', 'no');
    }   
    this.logged = this.$cookies.get('logged');
    console.log('entrando a login: ' + this.logged);
  }
};
</script>

<style>
.contact_form {
  min-width: 450px;
}
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
  min-width: 300px;
  background-color: rgb(202, 202, 202);
  max-width: 600px;
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
</style>