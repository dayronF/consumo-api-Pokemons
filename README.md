# Pokémon App - Consumo de API REST con HttpClient y RxJS

Aplicación Angular v19 (arquitectura con NgModule) que consume la [PokéAPI](https://pokeapi.co/docs/v2)
y muestra un listado de Pokémon con su detalle, usando un encadenamiento de operadores RxJS
en el servicio (sin suscripciones anidadas y sin `any`).

## Requisitos

- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

Luego abrir `http://localhost:4200/`.

## Build de producción

```bash
npm run build
```

## Estructura del proyecto

```
src/app/
  models/
    pokemon-list.model.ts   # Tipos de la respuesta del endpoint de lista
    pokemon.model.ts        # Tipos del detalle crudo + modelo Pokemon usado en la UI
  services/
    pokemon.ts              # Servicio HttpClient con el pipe de RxJS
  components/
    pokemon-list/           # Componente que muestra las tarjetas
  app-module.ts             # Módulo raíz, registra HttpClientModule
  app.ts / app.html
```

## Cómo se resolvió el reto técnico

El endpoint `GET /pokemon?limit=20&offset=0` solo devuelve `name` y `url` por cada Pokémon.
Para obtener el detalle completo de cada uno, el servicio `PokemonService` encadena:

1. **`http.get` a la lista** → trae los 20 `name`/`url`.
2. **`switchMap`** → cambia el observable hacia un arreglo de peticiones de detalle
   (una por cada `url` de la lista).
3. **`forkJoin`** → ejecuta esas peticiones de detalle en paralelo y espera a que todas
   respondan, devolviendo un solo arreglo. Esto evita subscribe anidados.
4. **`map`** (dentro de cada petición de detalle) → transforma la respuesta cruda de la API
   (`PokemonDetailResponse`) al modelo simplificado `Pokemon` que usa la plantilla.
5. **`catchError`** → si cualquier petición de la cadena falla, se reemplaza por un error
   controlado que el componente muestra en pantalla.

El componente `PokemonList` se suscribe una sola vez en `ngOnInit`, controlando 3 estados:
`isLoading`, `errorMessage` y los datos (`pokemons`).

## Funcionalidad opcional implementada

- **Paginación**: botones "Anterior" / "Siguiente" que modifican `offset` y vuelven a
  llamar al servicio.

## Pendiente / posibles mejoras

- Búsqueda con `debounceTime` + `switchMap`.
- Caché con `shareReplay(1)`.
- Comparador de dos Pokémon.
