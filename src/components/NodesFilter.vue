<template>
  <div>
    <button v-if="!sideBar" class="toOpen" @click="openCloseSideBar">></button>
    <div class="map_filters" v-if="sideBar">
      <div>
        <span class="brand">Bus +Info Map</span>
      </div>
      <button class="toClose" @click="openCloseSideBar">X</button>
      <input
        type="search"
        class="search"
        v-model="search"
        placeholder=" Buscar"
      />
      <div class="menu-list">
        <ul>
          <li
            v-for="item in menu"
            :key="item.name"
            @click="item.isOpen = !item.isOpen"
          >
          <hr
              style="
                opacity: 0.1;
                background-color: black;
                width: 90%;
                margin-top: 30;
                margin-bottom: 0px;
              "
            />
            <div v-show="menu_filter(item)" class="menu1">
              {{ item.name }}
            </div>
            <!----------------------MENU 2--------------------------->
            <ul class="menu2">
              <li
                v-for="child in item.children"
                :key="child.name"
                @click.stop.prevent="child.isOpen = !child.isOpen"
              >
                <div
                  v-if="child.children"
                  v-show="child_filter(child, item) && item.isOpen"
                  :class="['map_filter']"
                >
                  {{ child.name  + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ↓ " }}
                </div>
                <div
                  v-else-if="!child.children"
                  v-show="child_filter(child, item) && item.isOpen"
                  :class="['map_filter']"
                  @click.stop.prevent="$emit('launch-query', child.tags)"
                >
                  {{ child.name }}
                </div>
                <ul class="menu3" v-show="item.isOpen && child.isOpen">
                  <li v-for="child2 in child.children" :key="child2.name">
                    <div
                      v-show="child.isOpen"
                      :class="['map_filter']"
                      @click.stop.prevent="$emit('launch-query', child2.tags)"
                    >
                      {{ child2.name }} 
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-if="logged == 'si'" class="login_btn">
        <v-btn :to="{ path: '/map/add' }" dark>
          <span>Bienvenido/a</span>
        </v-btn>
      </div>
      <div v-else-if="(logged = 'no' || logged == '')" class="login_btn">
        <v-btn :to="{ path: '/map/add' }" dark>
          <span>Iniciar Sesión</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { getDatabase, ref, onValue } from "firebase/database";
import config from "../config-firebase";
import vClickOutside from "v-click-outside";

const firebaseConfig = config;
const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);
let raiz = ref(db, "menu/");

export default {
  name: "nodes-filter",
  props: ["filter"],
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data: function () {
    return {
      ocultar: true,
      sideBar: true,
      loginUser: {},
      resultado: [],
      logged: "",
      search: "",
    };
  },
  computed: {
    menu: function () {
      return this.resultado;
    },
  },
  methods: {
    openCloseSideBar: function () {
      this.sideBar = !this.sideBar;
    },
    menu_filter: function (item) {
      var valThis = this.search.toLowerCase();
      if (!valThis || valThis == "") {
        return true;
      } else if (item.name.toLowerCase().includes(valThis)) {
        //item.isOpen = true;
        return true;
      }
      return false;
    },
    child_filter(child, item) {
      var valThis = this.search.toLowerCase();
      if (valThis != "") {
        if (item.name.toLowerCase().includes(valThis)) {
          //item.isOpen = true;
          return true;
        } else if (child.name.toLowerCase().includes(valThis)) {
          item.isOpen = true;
          return true;
        }
      } else if (valThis == "") {
        return true;
      }
      return false;
    },
  },
  watch: {
    filter: {
      handler(val) {
        this.$emit("filter-nodes", val);
      },
      deep: true,
    },
  },
  mounted() {
    onValue(raiz, (snapshot) => {
      this.resultado = snapshot.val().options;
    });
    this.logged = this.$cookies.get("logged");
    console.log("nodesfilter valor logged: " + this.logged);
  },
};
</script>

<style>
.toOpen {
  background-color: darkred;
  padding: 5px;
  color: white;
  position: absolute;
  top: 10px;
}
.toClose {
  position: absolute;
  top: 5px;
  left: 10px;
}

.search {
  outline: none;
  border: 1;
  margin-left: 35px;
  padding-top: 7px;
  padding-bottom: 9px;
  font-size: 10px;
  font: small-caption !important;
}

.map_filters::-webkit-scrollbar {
  -webkit-appearance: none;
}

.map_filters::-webkit-scrollbar:vertical {
  width: 10px;
}

.map_filters::-webkit-scrollbar-button:increment,
.contenedor::-webkit-scrollbar-button {
  display: none;
}

.map_filters::-webkit-scrollbar:horizontal {
  height: 10px;
}

.map_filters::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.map_filters::-webkit-scrollbar-track {
  border-radius: 10px;
}
.map_filters {
  background-color: rgb(250, 250, 250);
  overflow: auto;
  font-size: 16px;
  position: fixed;
  top: 5px;
  margin-left: 5px;
  width: 240px;
  height: 98%;
  border-radius: 10px;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
}
.brand {
  display: inline-block;
  color: rgb(255, 255, 255);
  background-color: rgb(99, 0, 0);
  border: 2px rgb(99, 0, 0) solid;
  border-radius: 30px;
  line-height: 20px;
  margin-bottom: 20px;
  margin-left: 40px;
  margin-top: 20px;
  padding-left: 22px;
  padding-right: 22px;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  /*text-shadow: black 0.1em 0.1em 0.2em;*/
  /*background: linear-gradient(to bottom, rgb(99, 0, 0) 75%, rgb(250, 250, 250) 100%);*/
}
.menu1 {
  padding-top: 5px;
  background-position: left 0px;
  height: 35px;
  font-size: large;
  font-weight: bolder;
  text-align: left;
  cursor: pointer;
}
ul .menu2 {
  padding-left: 0px;
}

.map_filter {
  border: 1px rgba(99, 0, 0, 0) solid;
  background-color: rgb(99, 0, 0);
  color: white;
  margin: 2px;
  padding: 5px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: 95% 50%;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 20px;
  position: relative;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  line-height: 1em;
  overflow-wrap: break-word;
  width: 95%;
  font-size: 14px;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
.login_btn {
  position: absolute;
  bottom: 10px;
  left: 30px;
}

.map_filter:hover {
  background-color: rgb(0, 0, 0);
}
.filter_active:before {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  content: "";
  display: block;
  background: #2e7d32 !important;
  position: absolute;
  top: 10px;
  left: 5px;
  /*box-shadow: #d5afff 0 -4px 0 0 inset;*/
}

.map_filter.ico_dots:before {
  display: none !important;
}

.ico_dots {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='20' r='2.5' fill='%23000'/%3E%3Ccircle cx='20' cy='20' r='2.5' fill='%23000'/%3E%3Ccircle cx='30' cy='20' r='2.5' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_notags:before,
.ico_notags {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='41' height='41' viewBox='0 0 41 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29.0483 20.1504C29.0483 22.5544 28.1122 24.8145 26.4123 26.5144C24.7124 28.2142 22.4523 29.1504 20.0483 29.1504C18.3654 29.1504 16.7534 28.691 15.3543 27.8327L16.3862 26.8008C17.4729 27.4016 18.7213 27.7441 20.0483 27.7441C24.2356 27.7441 27.6421 24.3376 27.6421 20.1504C27.6421 18.8233 27.2995 17.5749 26.6987 16.4883L27.7306 15.4564C28.589 16.8554 29.0483 18.4675 29.0483 20.1504ZM12.0729 29.1202L11.0785 28.1259L13.2064 25.9979C11.8101 24.3693 11.0483 22.3184 11.0483 20.1504C11.0483 17.7464 11.9845 15.4863 13.6844 13.7864C15.3843 12.0866 17.6444 11.1504 20.0483 11.1504C22.2164 11.1504 24.2673 11.9121 25.8959 13.3085L28.0238 11.1806L29.0182 12.1749L12.0729 29.1202ZM14.2072 24.9971L24.8951 14.3093C23.5791 13.2154 21.8893 12.5566 20.0483 12.5566C15.8611 12.5566 12.4546 15.9632 12.4546 20.1504C12.4546 21.9913 13.1133 23.6812 14.2072 24.9971V24.9971Z' fill='black'/%3E%3C/svg%3E");
}
.p_fraction.ico_paper:before,
.ico_paper {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M34.8 15.9l-5.25-2.22c-1.98-.94-4.54-3.5-4.56-3.52a.54.54 0 0 0-.87.15c-.88 1.86-3.44 2.42-3.5 2.43L4.4 17.2a.54.54 0 0 0-.13.98l8.67 5.1a.54.54 0 0 0 .43.05l21.37-6.41a.54.54 0 0 0 .06-1.01zm-21.51 6.33L5.9 17.9l14.96-4.11c.12-.03 2.56-.55 3.85-2.39.88.83 2.76 2.49 4.39 3.26l3.9 1.65-19.72 5.92z' fill='%23000'/%3E%3Cpath d='M34.43 19.04L13.3 25.38 4.8 20.41a.54.54 0 0 0-.54.92l8.88 5.21 21.59-6.47a.54.54 0 1 0-.3-1.03z' fill='%23000'/%3E%3Cpath d='M34.43 22.19L13.3 28.53 4.8 23.56a.54.54 0 1 0-.54.93l8.88 5.2 21.59-6.47a.54.54 0 1 0-.3-1.03z' fill='%23000'/%3E%3Cpath d='M34.43 25.34L13.3 31.68 4.8 26.71a.54.54 0 0 0-.54.93l8.88 5.2 21.59-6.47a.54.54 0 1 0-.3-1.03z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_glass_bottles:before,
.ico_glass_bottles {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28.22 18.38c.52-1.32 1.3-2.51 2.3-3.52l1.85-1.84c.2.22.55.22.76 0l1.53-1.52a.54.54 0 0 0 0-.77L31.6 7.67a.54.54 0 0 0-.76 0L29.3 9.2a.54.54 0 0 0 0 .77l-1.84 1.84c-1 1-2.2 1.78-3.52 2.3l-3.53 1.38c-2.15.84-4.1 2.12-5.74 3.75l-8.3 8.3a.54.54 0 0 0 0 .77l7.64 7.64c.22.21.56.21.77 0l8.3-8.3a16.64 16.64 0 0 0 3.75-5.74l1.38-3.53zm3-9.56l2.3 2.3-.77.76-2.3-2.3.77-.76zM14.41 34.81l-6.88-6.88L15.45 20a15.58 15.58 0 0 1 5.37-3.51l3.52-1.38a11.3 11.3 0 0 0 3.9-2.55l1.83-1.84 1.53 1.53-1.84 1.84A11.29 11.29 0 0 0 27.22 18l-1.38 3.53a15.58 15.58 0 0 1-3.51 5.37L14.4 34.8z' fill='%23000'/%3E%3Cpath d='M17.46 20.29a.54.54 0 0 0-.76 0l-6.5 6.5a.54.54 0 0 0 0 .76l4.59 4.58c.21.21.55.21.76 0l6.5-6.5a.54.54 0 0 0 0-.76l-4.59-4.59zm-2.29 10.7l-3.82-3.83 5.73-5.73 3.82 3.82-5.73 5.73z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_clothes:before,
.ico_clothes {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.13 8.25H22.3a2.82 2.82 0 01-5.62 0h-2.81L6 12.75l2.25 6.19 3.38-1.13v12.94h15.75V17.81l3.37 1.13L33 12.75l-7.87-4.5zm4.94 9.27l-2.34-.77-1.48-.5V29.62h-13.5V16.25l-1.48.5-2.34.77-1.55-4.26 6.8-3.89h1.55a3.94 3.94 0 007.54 0h1.56l6.79 3.89-1.55 4.26z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_glass:before,
.ico_glass {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 9h22v22H9V9z' fill='%23000'/%3E%3Cpath d='M9.8 9.7l2.4 2.3h.2l1.7.8 2.1-3H9.8zm7.4 0l-2.3 3.4 1.6.7.1.1 2.7 3 1.1 1.1.4-1 1.3-4.4-.9-2.9h-4zm4.9 0l.7 2.5 4.5-.9-.3-1.6h-5zm5.7 0l.4 1.9v.3l-.3.1-5.2 1-.7 2.4 2 2.4 6.2-4v-4h-2.4zm-18 1.1v7.3l3-1.2-.9-4.1-2-2zm3 2.3l.8 3.8 2.2.9 1.5-1.9-1.2-1.4-3.3-1.4zm17.4 1.6l-6.7 4.5-.6.4 7.3 4.6v-9.5zm-17 3l-3.4 1.2v7.2l7.8-4.5 2-1.4-1.6-.7-2.5-1h-.2l-2.1-.9zM23.6 21l-.2.3-2 2-.1 2.5 3 4 6-2.6v-2L23.5 21zm-6.5 1.8l-2.8 1.6 4.3 5.8h5l-3-4-.2-.2V26l.2-2-3.5-1zm-3.5 2L9.8 27v3.2h7.8l-4-5.4zm16.6 3.3l-4.9 2h5v-2z' fill='%23fff'/%3E%3C/svg%3E");
}
.p_fraction.ico_plastic:before,
.ico_plastic {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30.69 5.42a1.51 1.51 0 0 0-2.09 0l-1.7 1.71c-.2.2-.2.5 0 .7l.33.34-.33.33a1 1 0 0 0-1.39.01l-.67.68a.98.98 0 0 0-.27.91c-.36.09-.74.12-1.1.08a9.8 9.8 0 0 0-7.57 2.46L5.86 22.7a2.93 2.93 0 0 0 2.63 4.94 2.93 2.93 0 0 0 3.44 3.44 2.95 2.95 0 0 0 .73 2.57 2.83 2.83 0 0 0 2.1.89c.81 0 1.6-.33 2.18-.9l1.72-1.72 8.24-8.26a9.82 9.82 0 0 0 2.45-7.58c-.03-.37 0-.75.08-1.11.33.07.67-.03.91-.26l.68-.68c.38-.39.38-1 0-1.39l.34-.34.34.34c.2.2.5.2.7 0l1.7-1.7a1.48 1.48 0 0 0 0-2.1L30.7 5.42zM18.3 30.87l-5.48-5.49a.99.99 0 0 1 0-1.4l6.16-6.16a.98.98 0 0 1 1.39 0l5.48 5.49-7.55 7.56zm8.21-8.29l-5.45-5.46a1.97 1.97 0 0 0-2.78 0l-6.16 6.17a1.97 1.97 0 0 0 0 2.79l5.48 5.49-1.37 1.37c-.4.4-.95.63-1.52.61-.51 0-1-.2-1.35-.58-.71-.76-.69-1.96.05-2.7a.5.5 0 1 0-.7-.69A1.94 1.94 0 1 1 10 26.84a.5.5 0 0 0-.7-.7 1.94 1.94 0 1 1-2.74-2.75L16.6 13.33a8.94 8.94 0 0 1 6.77-2.17c.62.06 1.25-.01 1.83-.22l3.4 3.4a4.4 4.4 0 0 0-.22 1.84 9.05 9.05 0 0 1-1.85 6.4zm3.12-8.57l-.13-.14-3.84-3.85-.14-.13.68-.68 4.11 4.12-.68.68zm.7-2.07L27.58 9.2l.34-.34 2.74 2.75-.34.33zm3.07-1.7l-1.36 1.36-4.11-4.12 1.36-1.36a.5.5 0 0 1 .7 0l3.41 3.42a.5.5 0 0 1 0 .7z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_plastic_bottles:before,
.ico_plastic_bottles {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30.69 5.42a1.51 1.51 0 0 0-2.09 0l-1.7 1.71c-.2.2-.2.5 0 .7l.33.34-.33.33a1 1 0 0 0-1.39.01l-.67.68a.98.98 0 0 0-.27.91c-.36.09-.74.12-1.1.08a9.8 9.8 0 0 0-7.57 2.46L5.86 22.7a2.93 2.93 0 0 0 2.63 4.94 2.93 2.93 0 0 0 3.44 3.44 2.95 2.95 0 0 0 .73 2.57 2.83 2.83 0 0 0 2.1.89c.81 0 1.6-.33 2.18-.9l1.72-1.72 8.24-8.26a9.82 9.82 0 0 0 2.45-7.58c-.03-.37 0-.75.08-1.11.33.07.67-.03.91-.26l.68-.68c.38-.39.38-1 0-1.39l.34-.34.34.34c.2.2.5.2.7 0l1.7-1.7a1.48 1.48 0 0 0 0-2.1L30.7 5.42zM18.3 30.87l-5.48-5.49a.99.99 0 0 1 0-1.4l6.16-6.16a.98.98 0 0 1 1.39 0l5.48 5.49-7.55 7.56zm8.21-8.29l-5.45-5.46a1.97 1.97 0 0 0-2.78 0l-6.16 6.17a1.97 1.97 0 0 0 0 2.79l5.48 5.49-1.37 1.37c-.4.4-.95.63-1.52.61-.51 0-1-.2-1.35-.58-.71-.76-.69-1.96.05-2.7a.5.5 0 1 0-.7-.69A1.94 1.94 0 1 1 10 26.84a.5.5 0 0 0-.7-.7 1.94 1.94 0 1 1-2.74-2.75L16.6 13.33a8.94 8.94 0 0 1 6.77-2.17c.62.06 1.25-.01 1.83-.22l3.4 3.4a4.4 4.4 0 0 0-.22 1.84 9.05 9.05 0 0 1-1.85 6.4zm3.12-8.57l-.13-.14-3.84-3.85-.14-.13.68-.68 4.11 4.12-.68.68zm.7-2.07L27.58 9.2l.34-.34 2.74 2.75-.34.33zm3.07-1.7l-1.36 1.36-4.11-4.12 1.36-1.36a.5.5 0 0 1 .7 0l3.41 3.42a.5.5 0 0 1 0 .7z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_hazardous_waste:before,
.ico_hazardous_waste {
  background-image: url("/img/fr_hazardous_waste.svg");
}

.p_fraction.ico_scrap_metal:before,
.ico_scrap_metal {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32.34 22.47h-.5c-.47 0-1.16-.29-1.5-.61l-1.99-1.9a2.61 2.61 0 00-1.8-.62l-5.62.54a9 9 0 01-1.85-.04l-3.17-.45a2.66 2.66 0 00-1.84.53l-2.42 2.05a4.5 4.5 0 01-1.57.8l-2.49.57c-.6.14-1.09.76-1.09 1.38v3.2c0 .65.52 1.17 1.16 1.17h1.86a3.25 3.25 0 006.23 0h7.01a3.25 3.25 0 006.24 0h3.34c.64 0 1.16-.52 1.16-1.16v-4.3c0-.63-.52-1.16-1.16-1.16zm-19.7 7.32a1.61 1.61 0 110-3.22 1.61 1.61 0 010 3.22zm7.82-7.02H13.7c-.42 0-.49-.2-.14-.44l1.6-1.1a2.9 2.9 0 011.4-.44h3.9v1.98zm5.42 7.02a1.61 1.61 0 110-3.22 1.61 1.61 0 010 3.22zm2.35-7.02h-5.92v-1.98h3.4c.42 0 1.04.22 1.38.48l1.3 1.02c.34.26.27.48-.16.48zM10.12 18.46h21.7c.4 0 .74-.33.74-.74v-1.64c0-.41-.33-.74-.74-.74h-6.1c-.28 0-.68-.18-.87-.38l-.97-1.04a1.68 1.68 0 00-1.1-.48h-.04a.43.43 0 01-.43-.42V8.3c0-.4-.33-.74-.73-.74h-1c-.4 0-.74.33-.74.74v4.7c0 .24-.19.43-.42.43h-.27c-.37 0-.85.21-1.1.48l-.97 1.04c-.19.2-.58.38-.86.38h-6.1c-.41 0-.74.33-.74.74v1.64c0 .41.33.74.73.74z' fill='%23000'/%3E%3Cpath d='M27.12 14.19c.07.08.16.12.26.12s.2-.04.27-.12l1.09-1.3c.11-.13.08-.24.06-.28-.02-.04-.09-.14-.26-.14h-.4a.07.07 0 01-.06-.07v-2.18a.38.38 0 00-.39-.38h-.62a.38.38 0 00-.38.38v2.18c0 .03-.03.07-.07.07h-.4c-.17 0-.23.1-.25.14-.02.04-.05.15.06.29l1.09 1.29zM14.14 14.19c.07.08.16.12.26.12s.2-.04.27-.12l1.09-1.3c.11-.13.08-.24.06-.28-.02-.04-.09-.14-.26-.14h-.4a.07.07 0 01-.06-.07v-2.18a.38.38 0 00-.39-.38h-.62a.38.38 0 00-.38.38v2.18c0 .03-.03.07-.07.07h-.4c-.17 0-.23.1-.25.14-.02.04-.05.15.06.29l1.09 1.29z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_engine_oil:before,
.ico_engine_oil {
  background-image: url("/img/fr_engine_oil.svg");
}
.p_fraction.ico_cans:before,
.ico_cans {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29.23 12.58l-.73-2.19c-.03-1.21-.88-2.33-2.4-3.15A11.7 11.7 0 0 0 20.64 6c-2.07 0-4.01.44-5.48 1.24-1.52.82-2.37 1.94-2.4 3.15l-.73 2.19a.4.4 0 0 0-.02.12v17.51a.4.4 0 0 0 0 .05c.06 1.3.98 2.5 2.62 3.38 1.6.88 3.74 1.36 6 1.36 2.27 0 4.4-.48 6.01-1.36 1.64-.89 2.56-2.08 2.62-3.38a.4.4 0 0 0 0-.05v-17.5a.4.4 0 0 0-.02-.13zm-13.7-4.65a10.91 10.91 0 0 1 5.1-1.14c1.93 0 3.74.4 5.1 1.14 1.28.7 1.99 1.6 1.99 2.53a2 2 0 0 1-.23.91c.02-.12.03-.25.03-.38 0-1.09-.75-2.1-2.11-2.84a10.21 10.21 0 0 0-4.78-1.08c-1.8 0-3.5.38-4.79 1.08-1.36.74-2.1 1.75-2.1 2.84 0 .13 0 .26.03.38a2 2 0 0 1-.23-.91c0-.94.7-1.83 1.98-2.53zm4.8 6.2c-3.18-.09-5.8-1.49-5.8-3.14 0-1.7 2.79-3.13 6.1-3.13 3.3 0 6.1 1.43 6.1 3.13 0 1.65-2.63 3.05-5.81 3.14a13.44 13.44 0 0 1-.59 0zm5.93 18.82c-1.5.81-3.5 1.26-5.63 1.26-2.14 0-4.14-.45-5.64-1.26-1.12-.6-1.84-1.36-2.1-2.16.5.58 1.21 1.1 2.1 1.52 1.55.76 3.56 1.17 5.64 1.17 2.35 0 4.55-.52 6.18-1.45a.4.4 0 0 0-.4-.69 12 12 0 0 1-5.78 1.35c-1.97 0-3.85-.38-5.3-1.09-1.4-.67-2.27-1.56-2.5-2.52a.4.4 0 0 0-.04-.12V14.02c.5.62 1.25 1.18 2.2 1.64 1.55.75 3.56 1.17 5.64 1.17 2.35 0 4.55-.52 6.18-1.46a.4.4 0 0 0-.4-.68 12 12 0 0 1-5.78 1.35c-1.97 0-3.85-.39-5.3-1.09-1.34-.65-2.21-1.5-2.46-2.42l.24-.72c.38.7 1.08 1.35 2.04 1.87a11.7 11.7 0 0 0 5.48 1.24c2.06 0 4-.44 5.48-1.24a4.94 4.94 0 0 0 2.04-1.87l.24.72c-.1.36-.3.7-.58 1.05a.4.4 0 1 0 .6.5l.05-.06v14.94a.4.4 0 0 0-.05.12c-.09.4-.29.78-.6 1.15a.4.4 0 0 0 .55.55c-.25.8-.98 1.56-2.1 2.17zm-4.47-20.29l3.01-.43a1.26 1.26 0 0 0 1.08-1.24c0-.62-.46-1.16-1.08-1.25l-3.01-.43a1.7 1.7 0 1 0 0 3.35zM20.64 11a.9.9 0 0 1 1.03-.9l3.02.43c.23.03.4.23.4.47 0 .23-.17.43-.4.46l-3.02.43-.13.01a.9.9 0 0 1-.9-.9zm1.21.34v-.7a.4.4 0 1 1 .79 0v.7a.4.4 0 0 1-.79 0z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_low_energy_bulbs:before,
.ico_low_energy_bulbs {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 27.3v2.2l6.2-.7a135 135 0 0 1 0-1.5c1-2.5 4.3-9.6 4.3-11.8a7.5 7.5 0 0 0-15 0c0 2.5 3.4 9.3 4.5 11.8zm3-18.2c3.5 0 6.4 2.9 6.4 6.4 0 1.8-3 8.3-4.3 11.7h-4c-1.4-3.2-4.5-9.6-4.5-11.7 0-3.5 2.9-6.4 6.4-6.4zM16.5 30.7v.7l6.2-.7v-.1-.8l-6.2.6v.3zM19.7 33.2c2 0 2.6-.9 2.9-1.6l-5.6.6c.5.5 1.3 1 2.7 1z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_batteries:before,
.ico_batteries {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.4 7.88h-3.07V6h-5.64v1.88h-3.06c-.9 0-1.63.73-1.63 1.62v23.03c0 .9.73 1.63 1.63 1.63h11.76c.9 0 1.63-.73 1.63-1.63V9.5c0-.9-.73-1.62-1.63-1.62zm-7.77-.94h3.76v.94h-3.76v-.94zm8.45 25.6c0 .37-.3.68-.69.68H13.63a.69.69 0 0 1-.7-.69V9.5c0-.38.32-.68.7-.68h11.76c.38 0 .69.3.69.68v23.03z' fill='%23000'/%3E%3Cpath d='M21.39 14.03a.5.5 0 0 0-.29-.47l-.36-.15-.24.28-5.12 8.27h2.72V28c0 .2.1.39.27.47l.38.17.24-.3 4.58-8.73H21.4v-5.58zm.63 6.52l-2.98 5.68v-5.21h-1.97l3.38-5.46v4.99h1.57z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_plastic_bags:before,
.ico_plastic_bags {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.07 17.02c-.24 0-.43.2-.43.43v14.24a.43.43 0 1 0 .86 0V17.45c0-.24-.19-.43-.43-.43zM13.93 17.02c-.24 0-.43.2-.43.43v1.72a.43.43 0 1 0 .86 0v-1.72c0-.24-.2-.43-.43-.43zM13.93 20.47c-.24 0-.43.19-.43.43v10.79a.43.43 0 0 0 .86 0v-10.8c0-.23-.2-.42-.43-.42z' fill='%23000'/%3E%3Cpath d='M28.8 7h-3.73c-.24 0-.43.2-.43.43v7.8H14.36v-7.8c0-.24-.2-.43-.43-.43H10.2c-.23 0-.43.2-.43.43V32.7c0 .72.59 1.3 1.3 1.3h16.85c.72 0 1.3-.58 1.3-1.3V7.43c0-.24-.19-.43-.42-.43zm-.44 25.7c0 .24-.2.44-.44.44H11.08a.44.44 0 0 1-.44-.44V7.86h2.86v7.8c0 .25.19.44.43.44h11.14c.24 0 .43-.2.43-.43v-7.8h2.86V32.7z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_waste_disposal:before,
.ico_waste_disposal {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28.47 12.3h-.34v-.7c0-.6-.5-1.09-1.1-1.09h-4.02l-.49-1.72A1.1 1.1 0 0 0 21.47 8h-3.94c-.49 0-.92.33-1.05.8l-.5 1.71h-4.02c-.6 0-1.09.5-1.09 1.1v.7h-.34a.37.37 0 1 0 0 .74h.73l1.3 16.29c.08.93.87 1.66 1.8 1.66h10.28c.93 0 1.72-.73 1.8-1.66l1.3-16.29h.73a.37.37 0 0 0 0-.74zM17.2 9a.35.35 0 0 1 .33-.25h3.94c.15 0 .3.1.33.25l.44 1.51h-5.48L17.2 9zm-5.24 2.26h15.07c.2 0 .35.15.35.34v.7H11.62v-.7c0-.19.15-.34.34-.34zM25.7 29.28c-.05.55-.51.97-1.06.97H14.36c-.55 0-1.01-.42-1.06-.97L12 13.05h15l-1.3 16.23z' fill='%23000'/%3E%3Cpath d='M19.5 29.2c.2 0 .37-.16.37-.37v-14a.37.37 0 0 0-.74 0v14c0 .2.16.38.37.38zM15.9 28.85a.37.37 0 0 0 .74-.04l-.72-14a.37.37 0 1 0-.74.04l.72 14zM22.71 29.2h.02c.2 0 .36-.15.37-.35l.72-14a.37.37 0 0 0-.74-.04l-.72 14c-.01.2.15.38.35.4z' fill='%23000'/%3E%3C/svg%3E");
}
.p_fraction.ico_tyres:before,
.ico_tyres {
  background-size: 27px;
  background-position: center 12px;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 359 359'%3E%3Cpath d='M302.6 55.8C286 20.2 263.3.7 238.4.7L128 .5c-2.2-.3-4.5-.5-6.8-.5-25 0-48 19.7-64.4 55.5-15.4 33.3-23.8 77.3-23.8 124s8.5 90.7 23.8 124C73.2 339.3 96 359 121 359c2.3 0 4.5-.2 6.8-.5l109.8-.2c25 0 47.9-19.4 64.5-55 15.5-33.2 24-77.2 24-123.8 0-46.7-8.4-90.6-23.6-123.7zM124 338.8h-.4l-1.8.2h-1c-16.4 0-33.2-16-46-43.8-14.3-30.7-22-71.8-22-115.7 0-43.9 7.7-84.9 22-115.7C87.5 35.9 104.4 20 121 20s33.4 16 46.3 43.8c14.1 30.7 22 71.8 22 115.7 0 43.9-7.9 84.9-22 115.7-12 26.1-27.7 41.8-43.2 43.6zm88.3-50.4c-3.3 2.8-7 5.9-9.4 10.3-2.6 4.7-3.4 9.7-4.2 14.1-.4 2.3-1 5.8-1.6 6.6-1.1 1.5-4.6 2.5-8 3.5-3.6.9-7.1 2.3-10.4 4.1-4.2 2.5-7 6.6-9.6 10.3-.2.5-.6 1-1 1.4h-5.4a134 134 0 0022.7-35.1c15.5-33.3 23.9-77.3 23.9-124s-8.5-90.7-23.8-124a131.4 131.4 0 00-23-35.3l18.3.1 3.2 1.7a51 51 0 0113.2 8.9c.6.9 1.1 4.3 1.5 6.6.7 4.4 1.6 9.4 4.2 14.1 2.4 4.4 6.1 7.5 9.3 10.3 2.3 2 5 4.3 5.7 6 .5 1.2.1 4.6-.2 7.1-.5 4.6-1 9.9.5 15.3 1.5 5.1 4.6 9.2 7.3 12.7 1.9 2.4 4 5 4.3 6.7.2 1.3-.7 4.5-1.4 7.1-1.2 4.5-2.6 9.7-1.9 15.3.7 5.4 3.3 9.9 5.5 13.9a22 22 0 013.2 7.1c.1 1.4-1.2 4.5-2.2 7-1.8 4.3-3.9 9.3-3.9 15 0 5.7 2.1 10.6 4 15 1 2.5 2.2 5.6 2.1 7 0 1.6-1.8 4.5-3.2 7.1-2.3 4-4.9 8.5-5.5 13.9-.7 5.7.7 10.8 2 15.3.6 2.6 1.5 5.8 1.2 7.1-.3 1.7-2.4 4.3-4.2 6.7a35.9 35.9 0 00-7.2 12.7 40 40 0 00-.6 15.3c.3 2.5.6 5.9.2 7.1-.7 1.7-3.3 4-5.7 6zm21.2 24.4c-.4 2.3-1 5.8-1.6 6.6-1.2 1.5-4.7 2.5-8 3.5a68 68 0 00-7.6 2.6c1-3.1 1.8-6.2 2.2-9.4.5-3 1-6 2-7.8.6-1.2 2.8-3 4.8-4.7 3.9-3.4 8.8-7.5 11.3-13.9 2.2-5.7 1.6-11.4 1-16.5-.2-3-.5-6.1 0-7.8.4-1.4 2.2-3.7 3.9-5.8 3-3.9 6.8-8.8 8-15.1 1.3-6-.2-11.4-1.5-16.3-.8-2.9-1.6-5.8-1.4-7.6.2-1.5 1.7-4.1 3-6.5 2.5-4.2 5.5-9.5 5.9-15.8.4-6.1-1.8-11.3-3.8-15.9-1.1-2.7-2.3-5.6-2.3-7.2 0-1.6 1.2-4.5 2.3-7.2 1.9-4.6 4-9.9 3.8-15.9a36.7 36.7 0 00-5.8-15.8c-1.3-2.3-3-5-3.1-6.5-.2-1.7.6-4.7 1.4-7.6 1.3-4.8 2.8-10.3 1.6-16.3-1.3-6.3-5-11.2-8.1-15.1-1.6-2.1-3.5-4.5-4-5.8-.4-1.8-.1-4.8.2-7.8.5-5 1-10.8-1.1-16.4-2.5-6.4-7.4-10.5-11.3-13.9a26.8 26.8 0 01-4.8-4.7c-1-1.8-1.5-4.8-2-7.8-.8-4.5-1.6-9.5-4.4-13.9h1.6l3 1.7a51 51 0 0113.1 8.9c.7.9 1.2 4.3 1.6 6.6.7 4.4 1.6 9.4 4.2 14.1 2.4 4.4 6.1 7.5 9.3 10.3 2.3 2 5 4.3 5.7 5.9.5 1.2.1 4.6-.2 7.1-.4 4.5-1 9.8.5 15.3 1.5 5.1 4.6 9.2 7.3 12.7 1.8 2.4 4 5 4.2 6.7.3 1.3-.6 4.5-1.3 7.1-1.2 4.5-2.6 9.7-1.9 15.3.7 5.4 3.3 9.9 5.5 13.9a22 22 0 013.2 7.1c.1 1.4-1.2 4.5-2.2 7-1.8 4.3-3.9 9.3-3.9 15s2.2 10.6 4 15c1 2.5 2.2 5.6 2.1 7 0 1.6-1.8 4.5-3.2 7.1-2.3 4-4.9 8.5-5.5 13.9-.7 5.7.7 10.8 2 15.3.6 2.6 1.5 5.8 1.2 7.1-.3 1.7-2.4 4.3-4.2 6.7A35.9 35.9 0 00253 260a40 40 0 00-.5 15.3c.3 2.5.6 5.9.2 7.1-.7 1.7-3.3 4-5.7 6-3.2 2.8-6.9 5.9-9.3 10.3-2.5 4.7-3.3 9.7-4.1 14.1zm50.5-17.9c-12.6 26.7-28.8 42.5-44.8 43.5 3.2-1.5 5.9-3.6 8-6.2 4.2-4.9 5.2-10.9 6-16.1.6-3 1-6 2-7.8.7-1.2 2.9-3 4.9-4.7 3.9-3.4 8.8-7.5 11.3-13.9 2.2-5.7 1.6-11.4 1-16.5-.2-3-.5-6.1 0-7.8.4-1.4 2.2-3.7 3.9-5.8 3-3.9 6.8-8.8 8-15.1 1.3-6-.2-11.4-1.5-16.3-.8-2.9-1.6-5.8-1.4-7.6.2-1.5 1.7-4.1 3-6.5 2.5-4.2 5.5-9.5 5.9-15.8.4-6.1-1.8-11.3-3.8-15.9-1.1-2.7-2.3-5.6-2.3-7.2 0-1.6 1.2-4.5 2.3-7.2 1.9-4.6 4-9.9 3.8-15.9a36.7 36.7 0 00-5.8-15.8c-1.3-2.3-3-5-3.1-6.5-.2-1.7.6-4.7 1.4-7.6 1.3-4.8 2.8-10.3 1.6-16.3-1.3-6.3-5-11.2-8.1-15.1-1.6-2.1-3.5-4.5-4-5.8-.4-1.8-.1-4.8.2-7.8.5-5 1-10.8-1.1-16.5-2.5-6.4-7.4-10.5-11.3-13.9a26.8 26.8 0 01-4.8-4.7c-1-1.8-1.5-4.8-2-7.8-.5-3.8-1.4-7.5-2.8-11 12.4 5.7 24.3 19.9 33.9 40.8 14 30.5 21.6 71.5 21.6 115.4 0 43.8-7.8 84.7-22 115.4z'/%3E%3Cpath d='M121 88.8c-26 0-42.8 35.6-42.8 90.7s16.8 90.7 43 90.7c26 0 42.8-35.6 42.8-90.7s-16.8-90.7-43-90.7zm15 144.1c-2 5.2-7.6 17.2-14.9 17.2s-12.9-12-14.9-17.2c-5.2-13.4-8-32.4-8-53.4s3-40 8.1-53.4c2-5.2 7.5-17.2 14.8-17.2S134 121 136 126.1c5.2 13.4 8.1 32.4 8.1 53.4s-2.8 40-8 53.4z'/%3E%3C/svg%3E");
}
.p_fraction.ico_car_batteries:before,
.ico_car_batteries {
  background-image: url("/img/fr_car_battery.svg");
}
.p_fraction.ico_all:before,
.ico_all {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.0577 27.1694C16.1456 31.3818 22.7735 31.3818 26.8614 27.1694C27.0841 26.9399 27.4578 26.9539 27.6467 27.2136L28.9954 29.0669C29.0581 29.1529 29.0507 29.2733 28.9769 29.3493C23.7206 34.7657 15.1985 34.7657 9.94221 29.3493C4.68593 23.9329 4.68593 15.1512 9.94221 9.73479C15.1985 4.31838 23.7206 4.31839 28.9769 9.73479C31.9401 12.7883 33.2328 16.9112 32.855 20.8979L34.2076 20.9088C34.5087 20.8974 34.7875 21.0697 34.9101 21.357C35.055 21.6212 35.0216 21.9544 34.8321 22.1957L31.6876 26.539C31.2951 27.0681 30.559 26.7078 30.4276 26.5275C30.3304 26.394 27.0688 21.9167 27.272 22.1957C27.0825 21.9544 27.0602 21.6326 27.194 21.3569C27.3278 21.0811 27.5954 20.8973 27.9076 20.8973L29.6024 20.8973C29.6851 20.8961 29.7659 20.8949 29.8453 20.8939C30.2343 17.7021 29.2397 14.3655 26.8614 11.9147C22.7735 7.70226 16.1456 7.70226 12.0577 11.9147C7.96977 16.1272 7.96977 22.9569 12.0577 27.1694Z' fill='black'/%3E%3Cpath d='M18.976 23.8151L17.935 21.1554H14.5833L13.5537 23.8151H12.5699L15.8759 15.4185H16.6938L19.9827 23.8151H18.976ZM17.6319 20.2803L16.6595 17.6892C16.5337 17.3613 16.404 16.959 16.2706 16.4823C16.1867 16.8484 16.0666 17.2507 15.9102 17.6892L14.9264 20.2803H17.6319ZM21.9388 23.8151H20.9894V14.9151H21.9388V23.8151ZM24.9017 23.8151H23.9522V14.9151H24.9017V23.8151Z' fill='%23343434'/%3E%3C/svg%3E");
}
</style>
