<template>
  <div class="node_info">
    <span class="p_close" @click="closePopup">×</span>
    <table>
        <th>{{node_name}}</th>
      <tr v-for="(item, key) in all_tags" :key="key" class="node_info_tr">
        <td v-if="key!='name'">{{ key }}</td>
        <td v-if="key!='name'">{{ item }}</td>
      </tr>
    </table>

    <div v-if="description" class="f_description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: "node-info",
  props: ["selected"],
  data: function () {
    return {
      all_tags: null,
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
      }
    },
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
  },
  created() {
    if (this.selected) {
      let geoJsonProps = this.selected.props;
      this.all_tags = Object.assign({}, geoJsonProps);
      console.log(this.all_tags);
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
}
.edit_box {
  margin-top: 15px;
}
</style>