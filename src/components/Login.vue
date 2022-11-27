<template>
  <div class="login-container">
    <v-btn @click="logout" color="primary" v-if="authenticated" flat
      >LOGOUT</v-btn
    >
    <div v-if="!authenticated">
      <input
        class="login_input"
        type="text"
        placeholder="Email"
        v-model="userid"
      />
      <input
        class="login_input"
        type="password"
        placeholder="Contraseña"
        v-model="password"
      />
    </div>
    <v-btn @click="authenticate" color="primary" v-if="!authenticated"
      >LOGIN</v-btn
    >
  </div>
</template>

<script>
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    const firebaseConfig = {
    apiKey: "AIzaSyCPdvUivHRuvuyShLVAqxHgpYgL0w1zPQ4",
    authDomain: "businfomapp.firebaseapp.com",
    projectId: "businfomapp",
    storageBucket: "businfomapp.appspot.com",
    messagingSenderId: "436533237430",
    appId: "1:436533237430:web:d756f6af869e4eef63f817",
    measurementId: "G-NYZ650LFFS"
    }
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    //let db = app.database();
export default {
  data: function () {
    return {
      firebase: {
       // db: db
    }
    };
  },
  methods: {
    toMap: function () {
      this.$router.push({ path: "/map" });
    },
    changeLang: function () {
      localStorage.setItem("lang", this.$i18n.locale);
    },
  },
  created() {
    this.authInit();
  },
};
</script>

<style>
.login-container {
  padding: 25px;
  background-color: rgb(255, 204, 204);
  max-width: 500px;
}
.login_input {
  margin-top: 30px;
  margin-bottom: 30px;
  display: block;
  background-color: white;
}
.language-select {
  max-width: 400px;
}
</style>