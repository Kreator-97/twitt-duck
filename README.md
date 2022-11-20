# Twitt Duck 🦆
Twitt Duck es una Clon de twitter realizado para propósitos educativos.

Puedes iniciar un sesión o crear una cuenta de usuario para comenzar a realizar publicaciones y ver que dicen las personas a las que sigues.

[https://twitt-duck.herokuapp.com/](https://twitt-duck.herokuapp.com/)
## Tecnologías
Este proyecto esta realizado utilizando las siguientes tecnologías:

- React
- Chakra UI
- Express
- TypeScript
- MySQL
- Prisma ORM
- Redux Toolkit

Las pruebas de la aplicación fueron hechas utilizando las siguientes librerías:
- Vitest con supertest en el backend
- Cypress en el frontend

Este repositorio es un monorepo que tiene como dependencia clave **turborepo**.

## Levantar el proyecto por primera vez
Para levantar el proyecto sigue estos pasos

1- Instala las dependencias
```
yarn install
```

2- Configura las variables de entorno que se encuentras en el archivo `env.example`

3- Levanta el servidor de docker
```
docker compose up -d
```

4- Carga el esquema en la base de datos
```
# desarrollo
yarn migrate:dev

# testing
yarn migrate:test
```

5- Carga la semilla con datos de prueba
```
yarn seed:dev
```

5- Corre el servidor de prueba
```
yarn dev
```

### Crear build de producción
Para poder crear la build de producción necesitas seguir los siguientes pasos:

Primero debes de generar la aplicación de React:

```bash
yarn build:web
```

Después ejecuta el comando para generar el servidor de Express:

```bash
yarn build:api
```

### Pruebas
Antes de comenzar a ejecutar las pruebas asegurar de levantar docker con el suguiente comando:
```
docker compose up -d
```

Asegurate de tener sincronizado el esquema de la base de datos de desarrollo con la de testing.
```
# desarrollo
yarn migrate:dev

# testing
yarn migrate:test
```

También debes de insertar los datos de prueba
```
yarn seed:test
```

Para ejecutar las pruebas del backend ejecuta: 

```bash
yarn test:api
```

Para ejecutar las pruebas del cliente web ejecuta:
```bash
yarn test:web
```

Si quieres ejecutar las pruebas abriendo cypress en el navegador, hazlo con el comando:
```bash
yarn test:cypress
```
