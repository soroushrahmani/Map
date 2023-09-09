<!-- <template>
  <div>
    <GMapMap :center="center" :zoom="zoom" @load="onMapLoad">
      <GMapMarker :position="center" />
    </GMapMap>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { GMapMap, GMapMarker } from 'vue3-google-map';
import { kml } from '@tmcw/togeojson';
// import xmldom from 'xmldom';
export default defineComponent({
  components: {
    GMapMap,
    GMapMarker,
  },
  data() {
    return {
      center: { lat: 10, lng: 10 },
      zoom: 4,
    };
  },
  methods: {
    async onMapLoad() {

    },
  },
  async beforeCreate() {
    // const response = await fetch('http://localhost:8888/2_exodus.kml');
    // const kmlText = await response.text();
    // const parser = new xmldom.DOMParser();
    // const kmlDom = parser.parseFromString(kmlText.toString(), 'text/xml');
    // const geojsonData = tj.kml(kmlDom);
    // console.log(geojsonData);
    // // Use geojsonData in your application
    fetch('http://localhost:8888/2_exodus.km')
      .then(response => response.text())
      .then(data => {
        let parser = new DOMParser();
        let kmlData = parser.parseFromString(data, "text/xml");
        this.geoJsonData = kml(kmlData);
      });
  }
});
</script> -->



<template>
  <div ref="mapContainer" style="width: 100%; height: 100%"></div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent, onMounted } from 'vue';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { GeoJsonLayer } from '@deck.gl/layers';

export default defineComponent({
  setup() {
    const mapContainer = ref(null);

    onMounted(async () => {
      // Create the Google Maps map
      const map = new google.maps.Map(mapContainer.value, {
        center: { lat: 40, lng: -110 },
        zoom: 4,
      });

      // Load your static GeoJSON data
      const response = await fetch('http://localhost:8888/your-geojson-file.json');
      const geojsonData = await response.json();

      // Create the deck.gl GeoJsonLayer
      const geojsonLayer = new GeoJsonLayer({
        id: 'geojson-layer',
        data: geojsonData,
        // Set other layer properties here
      });

      // Add the layer to the map using the GoogleMapsOverlay
      const deckOverlay = new GoogleMapsOverlay({ layers: [geojsonLayer] });
      deckOverlay.setMap(map);
    });

    return { mapContainer };
  },
});
</script>
