# GAME LOG

Tu diario de videojuegos: registra los juegos que has jugado, ponles nota del 0 al 10 y escribe tu reseña. Interfaz con estética retro pixel-art.

**Demo:** [pixel-gamelog.vercel.app](https://pixel-gamelog.vercel.app/)

<!-- Añade una captura en docs/screenshot.png y descomenta:
![Game Log](docs/screenshot.png)
-->

## Funcionalidades

- Registro e inicio de sesión con JWT (access + refresh token con renovación automática).
- CRUD de partidas: nombre, fecha en que se jugó, nota (0-10) y reseña.
- Cada usuario solo puede ver y modificar sus propias partidas.
- Rutas privadas en el frontend, página 404 y notificaciones.
- Fondo animado en canvas con sprites que reaccionan al ratón (respeta `prefers-reduced-motion`).

## Stack

| Parte    | Tecnologías |
| -------- | ----------- |
| Backend  | Python, Django, Django REST Framework, Simple JWT, PostgreSQL / SQLite, WhiteNoise, Gunicorn |
| Frontend | React, Vite, React Router, Tailwind CSS, Motion, Axios, React Hot Toast |
| Deploy   | Vercel (frontend) |

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

## Licencia

[MIT](LICENSE)
