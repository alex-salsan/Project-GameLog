# GAME LOG

Tu diario de videojuegos: registra los juegos que has jugado, ponles nota del 0 al 10 y escribe tu reseña. Aplicación Full-Stack con frontend en React y API REST en Django, con una interfaz de estética retro pixel-art.

**Demo:** [pixel-gamelog.vercel.app](https://pixel-gamelog.vercel.app/)

> La API está en el plan gratuito de Render, que la pone en reposo cuando no se usa: la primera petición puede tardar unos segundos en responder.

![Biblioteca de partidas](docs/screenshots/biblioteca.webp)

<table>
  <tr>
    <td><img src="docs/screenshots/inicio.webp" alt="Página de inicio" /></td>
    <td><img src="docs/screenshots/formulario.webp" alt="Formulario para editar una partida" /></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/login.webp" alt="Inicio de sesión" /></td>
    <td align="center"><img src="docs/screenshots/movil.webp" alt="Biblioteca en móvil" width="220" /></td>
  </tr>
</table>

## Funcionalidades

- Registro e inicio de sesión con JWT (access + refresh token con renovación automática).
- CRUD de partidas: nombre, fecha en que se jugó, nota (0-10) y reseña.
- Cada usuario solo puede ver y modificar sus propias partidas.
- Notas con color según la puntuación: verde, ámbar o rojo.
- Rutas privadas en el frontend, página 404 y notificaciones.
- Fondo animado en canvas con sprites que reaccionan al ratón (respeta `prefers-reduced-motion`).
- Diseño responsive para escritorio y móvil.

## Stack

| Parte    | Tecnologías |
| -------- | ----------- |
| Backend  | Python, Django, Django REST Framework, Simple JWT, PostgreSQL / SQLite, WhiteNoise, Gunicorn |
| Frontend | React, Vite, React Router, Tailwind CSS, Motion, Axios, React Hot Toast |
| Deploy   | Vercel (frontend) · Render (API) |

## Detalles técnicos

- **Renovación del token sin que el usuario lo note**: un interceptor de Axios detecta las respuestas `401`, pide un nuevo `access` token con el `refresh` y repite la petición original. Si varias peticiones caducan a la vez, todas esperan a la misma renovación en lugar de lanzar una cada una.
- **Aislamiento de datos por usuario en el backend**: el `ViewSet` filtra siempre las partidas por `request.user` y asigna el usuario al crear, así que es imposible leer o modificar las de otro aunque se conozca su `id`.
- **Tests de la API** que comprueban la autenticación y que un usuario no puede ver, editar ni borrar partidas ajenas.
- **Configuración por variables de entorno** (`dj-database-url`, `python-dotenv`): el mismo código funciona en local con SQLite y en producción con PostgreSQL.

## Estructura

```
.
├── backend/
│   ├── config/        # settings, urls raíz, wsgi/asgi
│   ├── accounts/      # registro y login (JWT)
│   └── games/         # modelo Game, API CRUD y tests
└── frontend/
    └── src/
        ├── components/  # Navbar, GameCard, Background
        ├── layouts/     # AppLayout (zona privada), AuthLayout (login/registro)
        ├── routes/      # PrivateRoute
        ├── pages/       # Home, Login, Register, Dashboard, GameForm, Community, NotFound
        ├── services/    # cliente de la API (axios) y gestión de tokens
        └── styles/      # clases de UI compartidas
```

## Puesta en marcha en local

Necesitas **Python 3.12+** y **Node.js 20+**.

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # y edita SECRET_KEY
python manage.py migrate
python manage.py runserver
```

La API queda en `http://127.0.0.1:8000/api/`. Sin `DATABASE_URL` se usa SQLite.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

La aplicación queda en `http://localhost:5173`.

### Variables de entorno

**backend/.env**

| Variable               | Descripción                                          | Ejemplo                  |
| ---------------------- | ---------------------------------------------------- | ------------------------ |
| `SECRET_KEY`           | Clave secreta de Django                              | una cadena larga aleatoria |
| `DEBUG`                | Modo debug                                           | `True`                   |
| `ALLOWED_HOSTS`        | Hosts permitidos, separados por comas                | `localhost,127.0.0.1`    |
| `DATABASE_URL`         | URL de PostgreSQL (vacía = SQLite)                   | `postgres://user:pass@host:5432/db` |
| `CORS_ALLOWED_ORIGINS` | Orígenes del frontend, separados por comas           | `http://localhost:5173`  |

**frontend/.env**

| Variable       | Descripción         | Ejemplo                     |
| -------------- | ------------------- | --------------------------- |
| `VITE_API_URL` | URL base de la API  | `http://127.0.0.1:8000/api` |

## API

Todas las rutas de `/api/games/` requieren la cabecera `Authorization: Bearer <access_token>`.

| Método   | Ruta                   | Descripción                        |
| -------- | ---------------------- | ---------------------------------- |
| `POST`   | `/api/register/`       | Crear cuenta (`username`, `password`) |
| `POST`   | `/api/login/`          | Obtener `access` y `refresh`       |
| `POST`   | `/api/login/refresh/`  | Renovar el `access` token          |
| `GET`    | `/api/games/`          | Listar mis partidas                |
| `POST`   | `/api/games/`          | Crear partida                      |
| `GET`    | `/api/games/{id}/`     | Ver una partida                    |
| `PUT`    | `/api/games/{id}/`     | Editar una partida                 |
| `DELETE` | `/api/games/{id}/`     | Borrar una partida                 |

Ejemplo de partida:

```json
{
  "name": "The Witcher 3",
  "played_at": "2026-10-01T20:00:00Z",
  "rating": 9.5,
  "review": "Una obra maestra."
}
```

## Tests

```bash
cd backend
python manage.py test
```

Cubren el registro, el login y que un usuario no pueda ver, editar ni borrar las partidas de otro.

## Próximos pasos

- Sección **Comunidad**: ver las reseñas públicas de otros jugadores.
- Búsqueda y filtros en la biblioteca (por nota, fecha o nombre).

## Autor

Proyecto individual: diseño, frontend, backend, tests y despliegue.

**Alejandro Salado Sánchez**, desarrollador Full-Stack

- Portfolio: [URL_DEL_PORTFOLIO](URL_DEL_PORTFOLIO)
- LinkedIn: [alejandro-salado](https://www.linkedin.com/in/alejandro-salado/)
- GitHub: [alex-salsan](https://github.com/alex-salsan)

## Licencia

[MIT](LICENSE)
