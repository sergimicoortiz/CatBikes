# React_DRF_MySQL_CatBikes

Por [`Sergi Micó Ortiz`](https://github.com/sergimicoortiz)

## Table of Contents

1. CatBikes
2. Instalar
3. Tecnologias


# CatBikes! 😺 🚲
_Bienvenidas y bienvenidos a CatBikes_

1. **Home:**
   Carousel, mapa indicando las estaciones e infiniteScroll

2. **Station:**
    Obtención de todas las estaciones con su información y redirección a sus slots

3. **Station Details:**
    Ver cada slot de una stación, se puede alquilar o devolver una bici además de poder crear una incidencia

4. **Profile:**
    Listado de todas las incidencias creadas por un usuario

5. **Login:**
   Register y Login de usuario.

6. **Dashboard:**
   Solo tienen acceso los administradores, contiene todos los cruds: Stations, Bikes, Slots, Rens y Incidents

7. **Bell Admin**
    Una campana con un contador que solo puede ver el administrador que te redirecciona al listado de las incidencias

8. **Bell Client**
    Una campana con un contador de las notificaciones que tiene el cliente por ver

## Instalar 💿

---

### `Requisitos`
Es necesario crear el fichero .env en la carpeta backend y el secrets.js del frontend. El contenido puede ser el mismo que el de los ficheros de ejemplo.

Tener instalado las siguientes herramientas:

- [React](https://es.reactjs.org/) v18.2.0
- [DRF](https://www.django-rest-framework.org/) v3.14.0
- [MySQL](https://www.mysql.com/)

### `Puesta en marcha`

#### Backend
  ```
  cd backend
  cp ./src/settings.example.py ./src/settings.py
  pipenv install
  pipenv run python ./manage.py migrate
  pipenv run python ./filler.py  (Opcional, creación de dummys )
  pipenv run python ./manage.py runserver 0.0.0.0:8000
  ```
  
  Antes de realizar el runserver deberemos de acceder a la base de datos de mysql y crear el trigger de las notificaciónes, simplemente deberemos de copiar y pegar el contenido de backend/sql/ClientNotificationTrigger.sql 

  #### Frontend
  ```
  cd frontend
  cp ./src/secrets.example.js ./src/secrets.js  
  npm install -D
  npm run start
  ```

## Tecnologías 👨‍💻

---

Lista de tecnologías utilizadas en este proyecto:

`Backend` 🏗️

- [DRF](https://www.django-rest-framework.org/) v3.14.0
  - Routes
  - Models
  - Controllers
  - DB validation
  - MySQL
    - Relationships
    - Schema
  - Middleware_auth
    - Header
    - Token JWT
    - Token Blacklist

`Frontend` 🏛️

- [React](https://es.reactjs.org/) v18.2.0
  - Estructurado en componentes
  - Routes
  - Models
  - Components
  - Reactive Forms
    - Validation
  - Lazy load
  - Guards
  - Service with axios 
  - Authentication JWT enviado por Headers
  - Refresh Token
  - Hooks y context
  - Librerias:
    - react-toastify
    - react-modal
    - react-map-gl
    - react-infinite-scroll-component
    - react-data-table-component
  
  

`BBDD`💾

- [MySQL](https://www.mysql.com/)