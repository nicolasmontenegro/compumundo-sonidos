# compumundo-sonidos

## Comandos

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# generate static project
$ yarn generate
```

Para más detalles, vea la [documentación de NuxtJS](https://nuxtjs.org).

## Otros

El archivo `loadfiles.js` revisa el directorio de sonidos y actualiza la DB. Para ejecutar el script, simplemente aplique en consola...

```bash
$ node loadfiles.js
```

Si se encuentra FFMPEG instalado en el sistema, automáticamente se aplicará la nivelación de sonido.
