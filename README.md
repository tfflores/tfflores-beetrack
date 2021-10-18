# Prueba Trainbee

## Tomás Flores Mella

### Link a Heroku: https://tfflores-beetrack.herokuapp.com/

### Setup

Clonar el repositorio -> Correr el comando <code>bundle install</code> -> Correr <code>rails s</code> -> Enjoy!

El proyecto está hecho en: 
npm 6.14.15, yarn 1.22.17, rails 6.1.4.1, ruby 2.7.0p0


### Revisión

Los archivos principales de este trabajo son:

<code>app/assets/stylesheets/style.css</code>

<code>app/assets/javascript/components/Leaflet.js</code>

<code>app/views/pages/index.html.erb</code>

No es necesario revisar modelos o controladores porque la lógica es principalmente de frontend (React).


### Detalles

Proyecto realizado en Ruby on Rails. Se usó además la gema react-rails, y los paquetes leaflet y react-leaflet.
Se cuenta con un mapa, extraído de OpenStreetMap, al cual se le pueden añadir Waypoints. 
Cada Waypoint representa un vehículo. Un vehículo tiene nombre, que constituye su identificación, y coordenadas,
expresadas como latitud y longitud. El nombre del vehículo se muestra como la etiqueta al costado derecho de cada marcador.
Al hacerle click a un marcador, se muestran sus coordenadas de latitud y longitud.

Al mandar los datos del form, el programa verificará si existe un vehículo
con el nombre indicado. Si existe, actualiza sus coordenadas y se refleja eso en el mapa ya que cambia su marcador
asociado. Si el vehículo no existe, se crea uno nuevo con ese nombre añadiéndose un waypoint adicional al mapa.
Esto sucede sin que se tenga que refrescar la página. Se tomó como supuesto que no existía persistencia de datos a largo plazo, por
ende los endpoints se mantendrán guardados siempre y cuando no se refresque la página. Al refrescarla, vuelve todo
a su estado inicial.

Ejemplo: Al llenar el form para un vehículo "HA-49594", Latitud -33.45 y Longitud -70.66666, se ubicará el waypoint justo en el centro de
Santiago. 

<img src="https://drive.google.com/uc?export=view&id=1SOV6rogS_5LyyvLU7Fsre8QnI7eB0WJC"
     alt="Foto de ejemplo"
      />
