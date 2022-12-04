<template>
  <div class="login-container">
    <div class="login_form">
      <v-btn
        :to="{ name: 'map', params: { authenticated: authenticated } }"
        class="toMapBtn"
        dark
      >
        <span>Volver al mapa</span>
        <v-icon>arrow_left</v-icon>
      </v-btn>
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
        </div>
        <div v-else>
          <v-btn
            @click.prevent="logout"
            color="primary"
            v-if="authenticated"
            flat
            >Cerrar Sesión</v-btn
          >
        </div>
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
let raiz = ref(db, 'users/');

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
    };
  },
  props: {},
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
        if(snapshot.val() == null){
          return console.log("El usaurio no existe");
        }
        const pw = snapshot.val().password;
        if (pw == this.loginUser.password) {
          this.authenticated = true;
          console.log("Login correcto");
        }
        if (this.authenticated == false) {
          console.log("La contraseña no es correcta");
        }
      });
    },
    iniciarSesion: function () {
      var that = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.loginUser.name,
          that.loginUser.password
        )
        .then(
          function () {
            toastr.success("Iniciaste sesión correctamente.", "Aviso");
          },
          function () {
            toastr.error("El correo o la contrasena son incorrectos.", "Aviso");
          }
        )
        .catch(function (error) {
          toastr.error("Error al intentar iniciar sesión.", "Aviso");
        });
    },
    cerrarSesion: function () {
      firebase
        .auth()
        .signOut()
        .then(function () {
          // Sign-out successful.
        })
        .catch(function (error) {
          toastr.error("Error al intentar cerrar sesión.", "Aviso");
        });
    },
    logout: function () {
      this.authenticated = false;
    },
  },
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
</style>