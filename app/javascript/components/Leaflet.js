import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import React, { useState } from 'react'

// Componente usado para mostrar el mapa de Leaflet y el form de los waypoints. 
// Se incluyen comentarios para explicar lo que hace cada funcion.
const Leaflet= () => { 
    const COORD_STGO = [-33.44285, -70.65386]

    // Centra el mapa en la Region Metropolitana
    const centering = (waypoints) => {
      if (waypoints.length === 0){
        return COORD_STGO
      }
      return waypoints[waypoints.length - 1].coord
    }

    // State. Guarda un array con los objetos de los vehiculos registrados, y ademas guarda los valores temporales de los inputs
    const [vehicles, setVehicle] = useState(
        {
            items: [],
            tempLat: "", tempLong: "", tempName: ""
        }
        );

    // Logica principal de actualizacion de estado. Realiza validaciones y procede a actualizar o crear waypoints si estas se cumplen.
    const updateVehicle = (name, itemAttributes) => {
        if (vehicles.tempName.length === 0 || vehicles.tempLat.toString().length === 0 || vehicles.tempLong.toString().length === 0){
          alert("Por favor complete todos los campos")
          return
        }
        if (vehicles.tempLat > 90 || vehicles.tempLat < -90 || vehicles.tempLong > 180 || vehicles.tempLong < -180) {
          alert("Por favor respete los rangos de latitud [-90, 90] y longitud [-180, 180]")
          return
        }
        let index = vehicles.items.findIndex(x=> x.name === name);
        if (index === -1){
          setVehicle({
            items: [
               ...vehicles.items, itemAttributes
            ],
            tempLat: "", tempLong: "", tempName: ""
             });
        }
        else {
            setVehicle({
            items: [
               ...vehicles.items.slice(0,index),
               Object.assign({}, vehicles.items[index], itemAttributes),
               ...vehicles.items.slice(index+1)
            ],
            tempLat: "", tempLong: "", tempName: ""
             });
        }
    }

    // Llama a la funcion que actualiza el estado si el usuario envia el form
    const handleSubmit = (event) => {
        event.preventDefault()
        // En el segundo parametro se puede observar la estructura de un objeto de tipo vehiculo
        updateVehicle(vehicles.tempName, {name: vehicles.tempName, coord: [vehicles.tempLat, vehicles.tempLong]})
    }

    // Procesa cambios en cualquiera de los inputs del form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (value !== null) {       
          if (name === 'tempName')
          {
            setVehicle({
              items: [...vehicles.items],
              tempLat: vehicles.tempLat,
              tempLong: vehicles.tempLong,
              [name]: value,
              });
          } else if (name === 'tempLat'){
            setVehicle({
              items: [...vehicles.items],
              [name]: value,
              tempLong: vehicles.tempLong,
              tempName: vehicles.tempName,
              });

          } else if (name === 'tempLong'){
            setVehicle({
              items: [...vehicles.items],
              tempLat: vehicles.tempLat,
              [name]: value,
              tempName: vehicles.tempName,
              });
          }
        }
      };
    return (
    <React.Fragment>
    <div class="grid-container">
    <MapContainer center={centering(vehicles.items)} zoom={11} >
        <TileLayer 
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicles.items.map((vehicle) => 
          <Marker key={`marker-${vehicle.name}`} position={vehicle.coord}>
            <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>{vehicle.name}</Tooltip>
          <Popup>
            <span>Latitud {vehicle.coord[0]}<br/>Longitud {vehicle.coord[1]}</span>
          </Popup>
        </Marker>
        )}
    </MapContainer>
    <div class="container">
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='vehiculo'>Vehículo</label>
          <input
            name='tempName' 
            placeholder='Vehículo'
            value={vehicles.tempName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='latitud'>Latitud</label>
          <input 
            type="number" 
            step="0.00001"
            min="-90.00000"
            max="90.00000"
            name='tempLat'
            placeholder='Latitud' 
            value = {vehicles.tempLat}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='longitud'>Longitud</label>
          <input
            type="number" 
            step="0.00001"
            min="-180.00000"
            max="180.00000"
            name='tempLong' 
            placeholder='Longitud'
            value={vehicles.tempLong}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button>Enviar</button>
        </div>
    </form>
    </div>
    </div>
    </React.Fragment>
    )   

}
export default Leaflet;