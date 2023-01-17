<template>
  <div class="node_info">
    <span class="p_close" @click="closePopup">×</span>
      <span class="node_name_span">{{node_name}}</span>
    <table>
      <tr v-for="(item, key) in allTagsRender" :key="key" class="node_info_tr">
        <td v-if="key!='name'">{{ key }}</td>
        <td v-if="key!='name'">{{ item }}</td>
      </tr>
    </table>
    <div v-if="description" class="f_description">{{ description }}</div>
    <span id="no_info"> Se añadirán más datos próximamente</span>
  </div>
</template>

<script>
export default {
  name: "node-info",
  props: ["selected"],
  data: function () {
    return {
      all_tags: null,
      all_tags_translated: {},
      node_type: null,
      node_id: null,
      fractions: null,
      description: null,
      amenity: null,
      centre: null,
      name: null,
      info: false,
    };
  },
  computed: {
    osmLink: function () {
      return "https://openstreetmap.org/" + this.node_type + "/" + this.node_id;
    },
    josmLink: function () {
      return (
        "http://127.0.0.1:8111/load_object?objects=" +
        this.node_type.substring(0, 1) +
        this.node_id
      );
    },
    node_name: function () {
      for (const key in this.all_tags) {
        //console.log(key);
        /*console.log(`${prop} = ${this.all_tags[prop]}`);*/
        switch (key) {
          case "name":
            return this.all_tags[key];
        }
        if(this.all_tags[key] == "drinking_water"){
          return "Fuente de agua potable";
        }
        if(this.all_tags[key] == "toilets"){
          return "WC Público";
        }
        if(key == "parking" && this.all_tags[key] == "underground"){
          return "Parking subterráneo";
        }
        if(key == "parking" && this.all_tags[key] == "surface"){
          return "Parking superficie";
        }
        if(this.all_tags[key] == "motorcycle_parking"){
          return "Aparcamiento para motos";
        }
      }
      return ""
    },
    allTagsRender: function () {
      return this.allTagsRenderMethod();
    }
  },
  methods: {
    closePopup: function () {
      this.$emit("close-info");
    },
    goEdit: function () {
      this.$emit("edit-click");
    },
    goDelete: function () {
      this.$emit("delete-click");
    },
    allTagsRenderMethod: function () {
      for (const key in this.all_tags) {
        //console.log(key);
        switch (key) {
          case "phone":
            this.all_tags_translated["Telefono"] = this.translateItem(this.all_tags[key]);
            break;
          case "phone_1":
            this.all_tags_translated["Telefono 2"] = this.translateItem(this.all_tags[key]);
            break;
          case "wheelchair":
            this.all_tags_translated["Silla de ruedas"] = this.translateItem(this.all_tags[key]);
            break;
          case "shelter":
            this.all_tags_translated["Resguardada"] = this.translateItem(this.all_tags[key]);
            break;
          case "lit":
            this.all_tags_translated["Iluminado"] = this.translateItem(this.all_tags[key]);
            break;
          case "bench":
            this.all_tags_translated["Banco"] = this.translateItem(this.all_tags[key]);
            break;
          case "tactile_paving":
            this.all_tags_translated["Pavimento táctil"] = this.translateItem(this.all_tags[key]);
            break;
          case "bin":
            this.all_tags_translated["Papelera"] = this.translateItem(this.all_tags[key]);
            break;
          case "information":
            this.all_tags_translated["Información"] = this.translateItem(this.all_tags[key]);
            break;
          case "website" || "brand:website":
            this.all_tags_translated["Página web"] = this.translateItem(this.all_tags[key]);
            break;
          case "fee":
            this.all_tags_translated["De pago"] = this.translateItem(this.all_tags[key]);
            break;
            case "addr:street":
            this.all_tags_translated["Calle"] = this.translateItem(this.all_tags[key]);
              break;
          default:
            //console.log(key);
            break;

        }
      }
        console.log("Etiquetas fixed ")
        console.log(this.all_tags_translated);
        return this.all_tags_translated;
    },
    translateItem: function (item) {
      switch (item) {
        case "yes":
          return "Si";
        default:
          return item;
      }
    }
  },
  created() {
    if (this.selected) {
      let geoJsonProps = this.selected.props;
      this.all_tags = Object.assign({}, geoJsonProps);
     console.log("Todas las etiquetas")
     console.log( this.all_tags);
      delete this.all_tags.id;
      this.node_type = this.selected.node_type;
      this.node_id = this.selected.node_id;
      this.fractions = this.selected.fractions;
      this.description = geoJsonProps.description;
      this.amenity = geoJsonProps.amenity;
      this.centre =
        geoJsonProps.hasOwnProperty("recycling_type") &&
        geoJsonProps.recycling_type === "centre";
      this.name = geoJsonProps.name;
    }
  },
};
</script>

<style>
.node_info_tr:hover {
  background: #f6f6f6;
}
#no_info {
  color: grey;
  font-size: smaller;
}
.node_info {
  max-height: 95vh;
  overflow: auto;
  background: white;
  border-radius: 15px;
  padding: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  padding-top: 40px;
  z-index: 1;
  max-width: 300px;
  border: 1px solid rgb(99, 00, 00);
  box-shadow: 2px 2px rgb(99, 00, 00);
}
.node_name_span {
  text-align: center;
  padding-bottom: 20px;
  font-weight: bolder;
}
.edit_box {
  margin-top: 15px;
}
</style>