# ⚙️ The News Explorer 2026 - Backend API

> La API REST robusta y segura que da soporte al ecosistema de News Explorer. Encargada del procesamiento de noticias, persistencia de datos en MongoDB y el ciclo completo de autenticación de usuarios.

[![JWT Shield](https://img.shields.io/badge/JWT%20Shield-8A2BE2)](https://jwt.io)
[![Repositorio Frontend](https://img.shields.io/badge/Repositorio%20Frontend-8A2BE2)](https://github.com/PacoZ2024/news-explorer-frontend)

---

### ✨ Características del Servidor

- **Autenticación y Seguridad:** Registro e inicio de sesión protegidos con `bcrypt` para el hash de contraseñas y generación de firmas `JWT`.
- **Middlewares de Autorización:** Endpoints privados protegidos que verifican la validez del token enviado en las cabeceras HTTP (`Authorization: Bearer <token>`).
- **Arquitectura Limpia:** Organización de código basada en Rutas, Controladores y Modelos de datos (`Mongoose`).
- **Integración de Datos:** Conexión con servicios externos de noticias y almacenamiento de preferencias por usuario en la base de datos.

---

### 🛠️ Tecnologías

<p align="left">
  <a href="https://mongodb.com" target="_blank" rel="noreferrer"> <img src="https://githubusercontent.com" alt="mongodb" width="45" height="45"/> </a>
  <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://githubusercontent.com" alt="express" width="45" height="45"/> </a>
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://githubusercontent.com" alt="nodejs" width="45" height="45"/> </a>
  <a href="https://jwt.io" target="_blank" rel="noreferrer"> <img src="https://svgshare.com" alt="jwt" width="45" height="45"/> </a>
</p>

---

### 🚀 Instalación y Configuración Local

#### 1. Clonar el repositorio

```bash
git clone https://github.com/PacoZ2024/news-explorer-backend.git
cd news-explorer-backend
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno (`.env`)

Crea un archivo `.env` en la raíz del directorio con los siguientes campos obligatorios:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/news_explorer_db
JWT_SECRET=tu_firma_secreta_para_tokens
NEWS_API_KEY=tu_token_de_proveedor_de_noticias
```

#### 4. Iniciar el servidor

```bash
npm start # o npm run dev
```

La API estará disponible en `http://localhost:5000`.
