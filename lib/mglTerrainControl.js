function mglTerrainControl() {
  this.onAdd = function (map) {
    this._map = map;
    this._btn = document.createElement('button');
    this._btn.type = 'button';
    this._btn['aria-label'] = 'Terrain Control'; 
    this._btn['title'] = 'Terrain Control';
    this._btn.innerHTML = "<img src='https://icongr.am/material/terrain.svg?size=24color=currentColor'>";
    
    //TODO make this into a config option
    this._btn.style.borderRadius = "3px";

    //TODO make this into a config option
    let hasTerrain = false;

    this._btn.onclick = function () {
      if (!hasTerrain) {
        if (!map.getSource('mapbox-dem')) {
          map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });
        }
       if (!map.getSource('sky')) {
          map.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
              'sky-type': 'atmosphere',
              'sky-atmosphere-sun': [0.0, 0.0],
              'sky-atmosphere-sun-intensity': 15
            }
          });
        }
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        map.setPitch(70)
        hasTerrain = true
        this.style.backgroundColor = "yellow"
      }else{
        map.setTerrain(null);
        hasTerrain = false;
        this.style.backgroundColor = "white"
        map.setPitch(0)
      }
    };

    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._container.appendChild(this._btn);
    return this._container;
  };

  this.onRemove = function () {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  };
}

export {
  mglTerrainControl
};
