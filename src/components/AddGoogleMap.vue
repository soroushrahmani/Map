<template>
  <GoogleMap
    ref="map"
    api-key="AIzaSyCsuHKQe4gZH_MMHr23uqukStCxJxQ-NoA"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
  </GoogleMap>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { GoogleMap } from "vue3-google-map";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import kml from "@tmcw/togeojson";
import xmldom from "xmldom";
export default defineComponent({
  components: { GoogleMap },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };
    const map = ref(null);

    onMounted(async () => {
      const response = await fetch("http://localhost:8888/2_exodus.kml");
    const kmlText = await response.text();
    const parser = new xmldom.DOMParser();
    const kmlDom = parser.parseFromString(kmlText.toString(), "text/xml");
    const geojsonData = kml(kmlDom);

      const overlay = new GoogleMapsOverlay({
        layers: [
          new GeoJsonLayer({
            id: "geojson-layer",
            data: geojsonData,
            filled: true,
            pointRadiusMinPixels: 2,
            pointRadiusScale: 2000,
            getLineColor: [255, 255, 255],
            getFillColor: [200, 0, 0],
            pickable: true,
          }),
        ],
      });
      overlay.setMap(map.value.map);
    });

    return { center, map };
  },
});
</script>
