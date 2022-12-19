<template>
  <div class="contact_container">
    <h4>
      Si necesitas alguna otra opción en el menú, hazmelo saber a través de este
      formulario de contacto
    </h4>

    <!-- Contact Form -->

    <form action="#" @submit.prevent="sendMessage()">
      <fieldset class="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          v-model="newMessage.name"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          v-model="email"
          value=""
          required
        />
        <input type="text" name="subject" placeholder="Asunto" v-model="newMessage.subject" required />
        <textarea
          name="message"
          placeholder="Añade tu mensaje aquí"
          v-model="newMessage.message"
          required
        ></textarea>
        <input type="submit" id="submit" value="Enviar" />
      </fieldset>
    </form>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import { getDatabase, ref, set } from "firebase/database";
import config from "../config-firebase";

const firebaseConfig = config;
const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

export default {
  data: function () {
    return {
      db: db,
      email: this.$cookies.get("currentEmail"),
      newMessage: {
        name: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    sendMessage: function () {
      console.log(this.newMessage);
      set(ref(this.db, "messages/" + this.newMessage.name), this.newMessage);
    },
  },
};
</script>
<style>
.contact_container {
  color: #bfbfbf;
  padding: 5px;
  min-width: 100%;
  border-radius: 10px;
  font-family: "Lato", "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  background: rgba(245, 245, 245, 1);
}

h1 {
  font-family: "Pacifico", "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.7),
    5px 7px 0px rgba(0, 0, 0, 0.1);
}

form {
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

.contact-form input,
.contact-form textarea {
  border: 0;
  outline: 0;
  display: block;
  width: 100%;
  margin-top: 1em;
  padding: 0.8em;
  font-family: "Lato", "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-weight: 300;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(34, 34, 34, 0.1);
  resize: none;
}

.contact-form textarea {
  margin-bottom: 1em;
  height: 125px;
}

.contact-form input:focus {
  box-shadow: 0 0px 2px rgba(3, 201, 169, 1) !important;
}

.contact-form textarea:focus {
  box-shadow: 0 0px 2px rgba(3, 201, 169, 1) !important;
}

#submit {
  color: white;
  background-color: #bfbfbf;
  cursor: pointer;
  font-weight: 400;
}

#submit:hover {
  background-color: rgba(3, 201, 169, 0.6);
}
</style>