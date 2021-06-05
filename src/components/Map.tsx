import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import { LayerProps } from "react-map-gl";

function parsePolygon(polygons: string[] = []) {
  return polygons.map((v) =>
    v.split("_").map((set) => set.split(",").map(Number))
  );
}

const layerStyle = {
  type: "fill" as LayerProps["type"],
  layout: {},
  paint: {
    "fill-color": "#0080ff", // blue color fill
    "fill-opacity": 0.5,
  },
};

function Map({ polygons }: { polygons?: string[] }) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.5326,
    longitude: 127.024612,
    zoom: 10,
  });

  const coordinates = React.useMemo(() => {
    return parsePolygon(polygons);
  }, [polygons]);

  return (
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
  );
}

export default Map;
