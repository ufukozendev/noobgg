# noob.gg 🎮

<div align="center">
  <img src="../docs/noobgg-logo.png" alt="noob.gg logo" height="150" />
  
  [![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/repo)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Hono.js](https://img.shields.io/badge/Hono.js-00A3FF?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
</div>

This project consists of a Hono.js backend API and a Next.js 15 frontend application. Follow the instructions below to set up the development environment and start working on the project.

**Note:** The primary documentation for this project is in Turkish and can be found in [README.tr.md](./README.tr.md). This document provides an English overview.

## 🚀 Getting Started

This project is a monorepo managed using [Turborepo](https://turbo.build/repo). The package manager is [Bun](https://bun.sh/).

### 📋 Prerequisites

- Node.js (see the `engines` section in the main `package.json` for the recommended version)
- Bun ([Installation Guide](https://bun.sh/docs/installation))
- Docker (required for PostgreSQL database)

### 🐳 PostgreSQL Docker Container Setup Steps

#### 1️⃣ Download PostgreSQL Docker Image

```bash
docker pull postgres:16.9-alpine3.22
```

#### 2️⃣ Create and Run PostgreSQL Container

```bash
docker run -p 1453:5432 --name noobgg-postgres -e POSTGRES_PASSWORD=123noobgg123++ -d postgres:16.9-alpine3.22
```

##### 🔧 Command Parameters Explanation:

| Parameter                             | Description                                                                                         |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `-p 1453:5432`                        | Port mapping. Maps host machine's port 1453 to PostgreSQL's default port 5432 inside the container. |
| `--name noobgg-postgres`              | Container name. This name can be used to manage the container later.                                |
| `-e POSTGRES_PASSWORD=123noobgg123++` | Sets the password for PostgreSQL root user (postgres).                                              |
| `-d`                                  | Runs the container in detached mode (background).                                                   |
| `postgres:16.9-alpine3.22`            | Docker image name and version to use.                                                               |

#### 🔌 Connection Information

| Parameter        | Value          |
| ---------------- | -------------- |
| Host             | localhost      |
| Port             | 1453           |
| Username         | postgres       |
| Password         | 123noobgg123++ |
| Default Database | postgres       |

#### 📝 Important Docker Commands

```bash
docker ps                # List running containers
docker stop noobgg-postgres   # Stop the container
docker start noobgg-postgres  # Start the container
docker logs noobgg-postgres   # Show container logs
```

### 💻 Installation

1.  Clone the project repository:
    ```bash
    git clone https://github.com/altudev/noobgg.git
    cd noobgg
    ```
2.  Install the dependencies:
    ```bash
    bun install
    ```

### 🚀 Starting the Development Servers

```bash
turbo dev
```

This command will:

- Start the backend API on `http://localhost:3000`.
- Start the frontend Next.js application on `http://localhost:3001`.

## 📁 Project Structure

```
noob.gg/
├── apps/
│   ├── api/     # Hono.js based backend API
│   └── web/     # Next.js based frontend application
├── packages/    # Shared packages and libraries
├── package.json # Main project dependencies
└── turbo.json   # Turborepo configuration
```

## 🛠️ Technologies Used

### Backend (API)

- **Framework**: [Hono.js](https://hono.dev/) - A fast and lightweight web framework
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - A modern TypeScript-based SQL query builder
- **Database**: PostgreSQL 16 (integrated with Drizzle ORM)
- **Other Libraries**:
  - `@aws-sdk/client-s3`: For interacting with AWS S3
  - `dotenv`: For managing environment variables

### Frontend (Web)

- **Framework**: [Next.js 15](https://nextjs.org/) - A React-based framework with SSR and SSG capabilities
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

### 🛠️ Development Tools

- **Monorepo Management**: [Turborepo](https://turbo.build/repo)
- **Package Manager**: [Bun](https://bun.sh/)
- **TypeScript**: For static typing
- **ESLint**: For maintaining code quality and consistency

## 🤝 Contributing

Contributions are welcome! Please review the contributing guidelines (if available) or support the project by opening an issue or submitting a pull request.

## 📄 License

This project is licensed under the Apache License. See the [`LICENSE`](../LICENSE) file for more details.

## 👥 Contributors

A big thank you to all our friends who participated in our streams and supported us during the development process! 🙏

<div align="center">
  <a href="https://github.com/altudev">
    <img width="60px" alt="altudev" src="https://github.com/altudev.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/furkanczay">
    <img width="60px" alt="Furkan Özay" src="https://github.com/furkanczay.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/HikmetMelikk">
    <img width="60px" alt="Hikmet Melik" src="https://github.com/HikmetMelikk.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/gurgenufuk12">
    <img width="60px" alt="Ufuk Gürgen" src="https://github.com/gurgenufuk12.png" style="border-radius: 50%;"/>
  </a>
   <a href="https://github.com/ravidulundu">
    <img width="60px" alt="Ravi DULUNDU" src="https://github.com/ravidulundu.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/ufukozendev">
    <img width="60px" alt="Ufuk Özen" src="https://github.com/ufukozendev.png" style="border-radius: 50%;"/>
  </a>
   <a href="https://github.com/Taiizor">
    <img width="60px" alt="Taiizor" src="https://github.com/Taiizor.png" style="border-radius: 50%;"/>
  </a>
    <a href="https://github.com/Alsond5">
    <img width="60px" alt="Ahmet" src="https://github.com/Alsond5.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/Abhishek85805">
   <img width="60px" alt="Abhishek85805" src="https://github.com/Abhishek85805.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/ahmtcn34">
    <img width="60px" alt="Ahmet Can ÜZÜMCÜ" src="https://github.com/ahmtcn34.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/apps/google-labs-jules">
    <img width="60px" alt="Jules (Google Labs AI)" src="https://avatars.githubusercontent.com/in/842251?s=41&u=e6ce41f2678ba45349e003a9b1d8719b7f414a6f&v=4" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/apps/devin-ai-integration">
    <img width="60px" alt="DevinAI Integration" src="https://avatars.githubusercontent.com/in/811515?s=41&u=22ae8177548c8cd6cccb497ac571937d080c80bc&v=4" style="border-radius: 50%;"/>
  </a>
</div>

<div align="center">
  <sub>Built with ❤️ by the noob.gg team</sub>
</div>
