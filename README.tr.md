# Proje Adı

Bu proje, bir Hono.js backend API ve bir Next.js 15 frontend uygulamasından oluşmaktadır. Geliştirme ortamını başlatmak ve proje üzerinde çalışmak için aşağıdaki talimatları izleyin.

## Başlarken

Bu proje bir monorepo yapısındadır ve [Turborepo](https://turbo.build/repo) kullanılarak yönetilmektedir. Paket yöneticisi olarak [Bun](https://bun.sh/) kullanılmaktadır.

**Gereksinimler:**

*   Node.js (önerilen sürüm için ana `package.json` dosyasındaki `engines` bölümüne bakın)
*   Bun ([Kurulum Talimatları](https://bun.sh/docs/installation))

**Kurulum:**

1.  Proje dosyalarını klonlayın:
    ```bash
    git clone https://github.com/kullanici/proje-adiniz.git
    cd proje-adiniz
    ```
2.  Gerekli bağımlılıkları yükleyin:
    ```bash
    bun install
    ```

**Geliştirme Sunucularını Başlatma:**

Geliştirme sunucularını (backend ve frontend) aynı anda başlatmak için aşağıdaki komutu çalıştırın:

```bash
turbo dev
```

Bu komut:
*   Backend API'sini `http://localhost:3000` adresinde başlatır.
*   Frontend Next.js uygulamasını `http://localhost:3001` adresinde başlatır.

## Proje Yapısı

Proje aşağıdaki gibi bir klasör yapısına sahiptir:

*   `apps/`: Uygulama kodlarını içerir.
    *   `api/`: Hono.js tabanlı backend API.
    *   `web/`: Next.js tabanlı frontend uygulaması.
*   `packages/`: Paylaşılan paketleri ve kütüphaneleri içerir (örneğin, UI bileşenleri, paylaşılan TypeScript yapılandırmaları, ESLint kuralları vb.).
*   `package.json`: Ana proje bağımlılıklarını ve `turbo` komutlarını tanımlar.
*   `turbo.json`: Turborepo yapılandırma dosyası.

## Kullanılan Teknolojiler

### Backend (API)

*   **Framework**: [Hono.js](https://hono.dev/) - Hızlı ve hafif bir web framework'ü.
*   **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript tabanlı modern bir SQL query builder.
*   **Veritabanı**: PostgreSQL 16 (Drizzle ORM ile entegre).
*   **Diğer Kütüphaneler**:
    *   `@aws-sdk/client-s3`: AWS S3 ile etkileşim için (eğer kullanılıyorsa).
    *   `dotenv`: Ortam değişkenlerini yönetmek için.

### Frontend (Web)

*   **Framework**: [Next.js 15](https://nextjs.org/) - React tabanlı, sunucu tarafı renderlama (SSR) ve statik site oluşturma (SSG) yeteneklerine sahip bir framework.
*   **UI Kütüphanesi**: [React](https://react.dev/)
*   **Stil**: [Tailwind CSS](https://tailwindcss.com/) (muhtemelen `apps/web/tailwind.config.js` veya benzeri bir dosyada yapılandırılmıştır).

### Geliştirme Araçları

*   **Monorepo Yönetimi**: [Turborepo](https://turbo.build/repo)
*   **Paket Yöneticisi**: [Bun](https://bun.sh/)
*   **TypeScript**: Statik tipleme için.
*   **ESLint**: Kod kalitesini ve tutarlılığını sağlamak için.

## Katkıda Bulunma

Katkılarınız için teşekkür ederiz! Lütfen katkıda bulunma rehberini (eğer varsa) inceleyin veya bir issue açarak ya da pull request göndererek projeye destek olun.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
