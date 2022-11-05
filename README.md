# Twitt Duck 🦆
Twitt Duck es una Clon de twitter realizado para propósitos educativos.

Puedes iniciar un sesión o crear una cuenta de usuario para comenzar a realizar publicaciones o enviar mensajes privados a personas a las que sigues.

También puedes ver los últimos temas en tendencias dentro de la red.

## Más información ( en progreso 🚧 )

## Tecnologías
Este proyecto esta realizado utilizando las siguientes tecnologías:

- React
- Chakra UI
- Express
- TypeScript
- MongoDB
- Prisma ORM
- Redux Toolkit

Las pruebas de la aplicación fueron hechas utilizando las siguientes librerías:
- Jest
- Cypress

Este repositorio es un monorepo que tiene como dependencia clave **turborepo**.

### Crear build de producción
Para poder crear la build de producción necesitas seguir los siguientes pasos:

Primero debes de generar la aplicación de React:

```
yarn build:web
```

Después ejecuta el comando para generar el servidor de Express:

```
yarn build:api
```

### Pruebas ( en progreso 🚧 )