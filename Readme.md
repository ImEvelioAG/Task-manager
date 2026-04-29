 #  Task Manager Laravel + React

Aplicación web fullstack para gestión de tareas con autenticación de usuarios.

Este proyecto está dividido en dos partes:

*  Backend: API REST con Laravel
*  Frontend: Aplicación en React 

---

##  Tecnologías

### Backend

* Laravel 13
* PostgreSQL
* Laravel Sanctum (autenticación)

### Frontend

* React (JavaScript)
* Vite
* Axios
* React Router

---

## Estructura del proyecto

```
task-manager-project/
│
├── task-manager-api/     # Backend Laravel
└── task-manager-front/   # Frontend React
```

---

##  Instalación

#  Configuración Backend (Laravel)
Asegurate de tener instalado *php* antes de empezar!!!!

```bash
cd task-manager-api
```

### Instalar dependencias

```bash
composer install
```

### Configurar entorno

```bash
cp .env.example .env
php artisan key:generate
```

### Base de datos

Crea una base de datos en Postgres "task_manager" y configura tu usuario en el .env

### Ejecutar migraciones

```bash
php artisan migrate
```

### Levantar servidor

```bash
php artisan serve
```

---

#  Configuración Frontend (React)

```bash
cd task-manager-front
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar app

```bash
npm run dev
```

Frontend en:

```
http://localhost:5173
```

---

##  Autenticación

El sistema incluye:

* Registro de usuario
* Login
* Protección de rutas
* Uso de tokens (Sanctum)

---

##  Funcionalidades

* Crear tareas
* Editar tareas
* Eliminar tareas
* Marcar tareas como completadas
* Autocompletado automático (comando en backend)

---

### Auto completar tareas (Backend)

```bash
php artisan tasks:autocomplete
```

---

##  Comunicación Frontend y Backend

Asegúrate de que el frontend apunte al puerto correcto

Ejemplo:
```js
baseURL: "http://127.0.0.1:8000/api"
```

---
##  Autor
Evelio AG usando Laravel + React.
