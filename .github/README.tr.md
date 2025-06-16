# noob.gg 🎮

<div align="center">
  <img src="../docs/noobgg-logo.png" alt="noob.gg logo" height="150" />
  
  [![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/repo)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Hono.js](https://img.shields.io/badge/Hono.js-00A3FF?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
</div>

Bu proje, bir Hono.js backend API ve bir Next.js 15 frontend uygulamasından oluşmaktadır. Geliştirme ortamını başlatmak ve proje üzerinde çalışmak için aşağıdaki talimatları izleyin.

## 🚀 Başlarken

Bu proje bir monorepo yapısındadır ve [Turborepo](https://turbo.build/repo) kullanılarak yönetilmektedir. Paket yöneticisi olarak [Bun](https://bun.sh/) kullanılmaktadır.

### 📋 Gereksinimler

- Node.js (önerilen sürüm için ana `package.json` dosyasındaki `engines` bölümüne bakın)
- Bun ([Kurulum Talimatları](https://bun.sh/docs/installation))
- Docker (PostgreSQL veritabanı için gerekli)

### 🐳 PostgreSQL Docker Konteyner Kurulum Adımları

#### 1️⃣ PostgreSQL Docker İmajının İndirilmesi

```bash
docker pull postgres:16.9-alpine3.22
```

#### 2️⃣ PostgreSQL Konteynerinin Oluşturulması ve Çalıştırılması

```bash
docker run -p 1453:5432 --name noobgg-postgres -e POSTGRES_PASSWORD=123noobgg123++ -d postgres:16.9-alpine3.22
```

##### 🔧 Komut Parametrelerinin Açıklaması:

| Parametre                             | Açıklama                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `-p 1453:5432`                        | Port yönlendirmesi. Host makinedeki 1453 portunu, konteynerin içindeki PostgreSQL'in varsayılan portu olan 5432'ye yönlendirir. |
| `--name noobgg-postgres`              | Konteynere verilen isim. Bu isim ile konteyneri daha sonra kolayca yönetebiliriz.                                               |
| `-e POSTGRES_PASSWORD=123noobgg123++` | PostgreSQL root kullanıcısının (postgres) şifresini belirler.                                                                   |
| `-d`                                  | Konteyneri arka planda (detached mode) çalıştırır.                                                                              |
| `postgres:16.9-alpine3.22`            | Kullanılacak Docker imajının adı ve versiyonu.                                                                                  |

#### 🔌 Bağlantı Bilgileri

| Parametre             | Değer          |
| --------------------- | -------------- |
| Host                  | localhost      |
| Port                  | 1453           |
| Kullanıcı Adı         | postgres       |
| Şifre                 | 123noobgg123++ |
| Varsayılan Veritabanı | postgres       |

#### 📝 Önemli Docker Komutları

```bash
docker ps                # Çalışan konteynerleri listeler
docker stop noobgg-postgres   # Konteyneri durdurur
docker start noobgg-postgres  # Konteyneri başlatır
docker logs noobgg-postgres   # Konteyner loglarını gösterir
```

### 💻 Kurulum

1.  Proje dosyalarını klonlayın:
    ```bash
    git clone https://github.com/altudev/noobgg.git
    cd noobgg
    ```
2.  Gerekli bağımlılıkları yükleyin:
    ```bash
    bun install
    ```

### 🚀 Geliştirme Sunucularını Başlatma

```bash
turbo dev
```

Bu komut:

- Backend API'sini `http://localhost:3000` adresinde başlatır.
- Frontend Next.js uygulamasını `http://localhost:3001` adresinde başlatır.

**💡 Not:** Eğer "command not found: turbo" hatası alıyorsanız, bu Turborepo CLI'ın sisteminize global olarak kurulmamış olduğu anlamına gelir. İki seçeneğiniz bulunuyor:

- Global olarak kurun: `bun install -g turbo`
- Veya yukarıdaki komutu `bun` öneki ile kullanın: `bun turbo dev` (önerilen)

`bun turbo dev` komutu, projenizin bağımlılıklarından yerel olarak kurulmuş Turborepo'yu kullanır ve sürüm tutarlılığını sağlar.

## 📁 Proje Yapısı

```
noob.gg/
├── apps/
│   ├── api/     # Hono.js tabanlı backend API
│   ├── web/     # Next.js tabanlı frontend uygulaması
│   └── mobile/  # Expo tabanlı mobil uygulaması
├── packages/    # Paylaşılan paketler ve kütüphaneler
├── package.json # Ana proje bağımlılıkları
└── turbo.json   # Turborepo yapılandırması
```

## 🛠️ Kullanılan Teknolojiler

### Backend (API)

- **Framework**: [Hono.js](https://hono.dev/) - Hızlı ve hafif bir web framework'ü
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript tabanlı modern bir SQL query builder
- **Veritabanı**: PostgreSQL 16 (Drizzle ORM ile entegre)
- **Diğer Kütüphaneler**:
  - `@aws-sdk/client-s3`: AWS S3 ile etkileşim için
  - `dotenv`: Ortam değişkenlerini yönetmek için

### Frontend (Web)

- **Framework**: [Next.js 15](https://nextjs.org/) - React tabanlı, SSR ve SSG yeteneklerine sahip framework
- **UI Kütüphanesi**: [React](https://react.dev/)
- **Stil**: [Tailwind CSS](https://tailwindcss.com/)

### 🛠️ Geliştirme Araçları

- **Monorepo Yönetimi**: [Turborepo](https://turbo.build/repo)
- **Paket Yöneticisi**: [Bun](https://bun.sh/)
- **TypeScript**: Statik tipleme için
- **ESLint**: Kod kalitesini ve tutarlılığını sağlamak için

## 🤝 Katkıda Bulunma

Katkılarınız için teşekkür ederiz! Lütfen katkıda bulunma rehberini (eğer varsa) inceleyin veya bir issue açarak ya da pull request göndererek projeye destek olun.

## 📄 Lisans

Bu proje Apache Lisansı altında lisanslanmıştır. Daha fazla bilgi için [`LICENSE`](../LICENSE) dosyasına bakın.

## 👥 Katkıda Bulunanlar

Yayınlarımıza katılan ve geliştirme sürecimizde bize destek olan tüm arkadaşlarımıza çok teşekkür ederiz! 🙏

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
   <a href="https://github.com/cserhat">
    <img width="60px" alt="Serhat Celik" src="https://github.com/cserhat.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/ahmtcn34">
    <img width="60px" alt="Ahmet Can ÜZÜMCÜ" src="https://github.com/ahmtcn34.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/Alsond5">
    <img width="60px" alt="Ahmet" src="https://github.com/Alsond5.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/Abhishek85805">
   <img width="60px" alt="Abhishek85805" src="https://github.com/Abhishek85805.png" style="border-radius: 50%;"/>
  </a>
   <a href="https://github.com/soydali">
    <img width="60px" alt="Efe" src="https://github.com/soydali.png" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/apps/google-labs-jules">
    <img width="60px" alt="Jules (Google Labs AI)" src="https://avatars.githubusercontent.com/in/842251?s=41&u=e6ce41f2678ba45349e003a9b1d8719b7f414a6f&v=4" style="border-radius: 50%;"/>
  </a>
  <a href="https://github.com/apps/devin-ai-integration">
    <img width="60px" alt="DevinAI Integration" src="https://avatars.githubusercontent.com/in/811515?s=41&u=22ae8177548c8cd6cccb497ac571937d080c80bc&v=4" style="border-radius: 50%;"/>
  </a>
</div>

<div align="center">
  <sub>noob.gg ekibi tarafından ❤️ ile geliştirildi</sub>
</div>
