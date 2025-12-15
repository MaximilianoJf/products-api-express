# API Products – Backend

Backend REST API para gestión de productos, construido con **Node.js**, **TypeScript**, **Express** y **PostgreSQL** usando **Sequelize (sequelize-typescript)**.

Este proyecto está pensado para trabajar junto a un frontend (por ejemplo React) y manejar productos de forma estructurada y escalable.

---

## 🚀 Tecnologías usadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Sequelize + sequelize-typescript
- dotenv
- cors

---

## 📁 Estructura del proyecto

server/
├── src/
│   ├── config/        # Configuración (DB, CORS, etc.)
│   ├── models/        # Modelos Sequelize
│   ├── routes/        # Rutas de la API
│   ├── controllers/   # Lógica de negocio
│   ├── server.ts      # Configuración del servidor
│   └── index.ts       # Punto de entrada
├── .env
├── package.json
└── tsconfig.json

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

DATABASE_URL=postgresql://postgres:root@localhost:5432/api_products  
FRONTEND_URL=http://localhost:4000  
NODE_ENV=development  

### 🔎 Descripción

- DATABASE_URL: cadena de conexión a PostgreSQL
- FRONTEND_URL: URL permitida para CORS
- NODE_ENV: entorno de ejecución (development | production)

---

## 🗄️ Base de datos

Asegúrate de tener PostgreSQL corriendo localmente y crea la base de datos:

CREATE DATABASE api_products;

La conexión en **desarrollo** no usa SSL.  
En **producción**, SSL se habilita automáticamente según el entorno.

---

## 🔐 CORS

El backend permite:

- Requests desde el frontend configurado
- Requests desde localhost
- Requests sin origin (Postman, backend-to-backend)

CORS **solo aplica al navegador**, no bloquea llamadas desde backend o herramientas como Postman.

---

## ▶️ Instalación y uso

Instalar dependencias:

npm install

Ejecutar en desarrollo:

npm run dev

El servidor se levantará por defecto en:

http://localhost:4000

---

## 📦 Modelos (ejemplo)

```ts
@Table
export class Product extends Model {
  @Column
  name: string

  @Column
  description: string

  @Column(DataType.DECIMAL(10,2))
  price: number

  @Column
  stock: number
}
