  const mglOrthoControl = new MapboxGLButtonControl({
    containerClassName: "imagery-toggle",
    title: "Toggle Imagery",
    eventHandler: function() {
      const imageryLayers = {
        "ortho": "tilejons endpoint", //tilejson endpoint or raw tilejson
      };
      const imageryIds = [...Object.keys(imageryLayers)];
      const styleLayers = map.getStyle().layers;
      const ortho = styleLayers.filter(l => {
        return imageryIds.includes(l.id)
      });
      if (!ortho.length) {
        for (var i in imageryLayers) {
          if (typeof imageryLayers[i] != "object") {
            map.addSource(i, {
              type: "raster",
              url: imageryLayers[i]
            })
          }else{
            map.addSource(i, imageryLayers[i])
          }

          map.addLayer({
            id: i,
            type: "raster",
            source: i
          },"aerialway");
        }
        this.parentElement.classList.add("streets")
      }else{
        for (var i in imageryLayers) {
          map.removeLayer(i);
          map.removeSource(i);
        }
        this.parentElement.classList.remove("streets")
      }
    }
  });
  map.addControl(mglOrthoControl, "bottom-left");
  
/**
CSS for control
*/
/*
.imagery-toggle {
  width: 80px;
  height: 80px;
  background-image: url(imagery.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  opacity: 1!important;
}
.imagery-toggle.streets {
  background-image: url(streets.png);
}
.imagery-toggle>button.mapboxgl-ctrl-icon  {
  width: 100%;
  height: 100%;
}*/
