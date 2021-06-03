import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import { LayerProps } from "react-map-gl";
import geoData from "../constants";
import SearchBar from "./SearchBar";

const coordinates = [
  geoData.polygon[0].split("_").map((set) => set.split(",").map(Number)),
];

const layerStyle = {
  type: "fill" as LayerProps["type"],
  layout: {},
  paint: {
    "fill-color": "#0080ff", // blue color fill
    "fill-opacity": 0.5,
  },
};

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.5326,
    longitude: 127.024612,
    zoom: 10,
  });

  return (
    <>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      >
        <Source
          type="geojson"
          data={{
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates,
            },
          }}
        >
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
      <SearchBar />
    </>
  );
}

export default Map;
