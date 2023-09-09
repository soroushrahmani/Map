<template>
    <GoogleMap
      api-key="AIzaSyCsuHKQe4gZH_MMHr23uqukStCxJxQ-NoA"
      style="width: 100%; height: 100vh"
      :center="center"
      :zoom="15"
    >
      <!-- Add map subcomponents here -->
      <DeckMap />
    </GoogleMap>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import { GoogleMap } from "vue3-google-map";
  import DeckMap from "./DeckMap.vue";
  
  export default defineComponent({
    components: { GoogleMap, DeckMap },
    setup() {
      const center = { lat: 40.689247, lng: -74.044502 };
      return { center };
    },
  });
  </script>