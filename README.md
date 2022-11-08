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
- Vitest con supertest en el backend
- Cypress en el frontend

Este repositorio es un monorepo que tiene como dependencia clave **turborepo**.

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

### Pruebas ( en progreso 🚧 )
Para ejecutar las pruebas del servidor ejecuta: 

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
