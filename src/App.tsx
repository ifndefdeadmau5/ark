import React, { useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import LocationSettingsDialog from "./LocationSettingsDialog";

type Region = {
  city: string;
  country: string;
  code: string;
  polygon: string[];
};

function App() {
  const [open, setOpen] = useState(false);
  const [polygons, setPolygons] = useState<string[]>();

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Map polygons={polygons} />
      <SearchBar onLocationSettingClick={() => setOpen(true)} />
      <LocationSettingsDialog
        open={open}
        onClose={handleDialogClose}
        onSubmit={(polygons) => {
          setPolygons(polygons);
          handleDialogClose();
        }}
      />
    </>
  );
}

export default App;
