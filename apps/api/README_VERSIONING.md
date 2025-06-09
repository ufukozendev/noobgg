# API Versionlama ve Kullanım Dokümantasyonu

Bu doküman, projenin API versiyonlama yapısını, örnek endpoint kullanımını ve ileride yeni bir versiyon (ör. v2) eklemek için izlenecek adımları açıklar.

---

## 1. Versiyonlama Yaklaşımı

Proje, REST API versiyonlamasını URL tabanlı olarak uygular. Tüm endpointler `/api/v{major}[.{minor}]` formatında sunulur. Örneğin:
- `/api/v1/platforms`
- `/api/v1/games`

Versiyon bilgisi, bir middleware ile otomatik olarak algılanır ve ilgili controller/router'a yönlendirilir.

---

## 2. Örnek Endpoint Kullanımı

### Tüm Platformları Listeleme

**Endpoint:**
```
GET /api/v1/platforms
```

**Örnek cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/platforms
```

**Yanıt:**
```json
[
  {
    "id": 1,
    "name": "PC"
  },
  {
    "id": 2,
    "name": "PlayStation"
  }
]
```

---

### Belirli Bir Platformu Getirme

**Endpoint:**
```
GET /api/v1/platforms/1
```

**Örnek cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/platforms/1
```

---

### Platform Oluşturma

**Endpoint:**
```
POST /api/v1/platforms
```

**Body:**
```json
{
  "name": "Nintendo Switch"
}
```

**Örnek cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/platforms \
  -H "Content-Type: application/json" \
  -d '{"name":"Nintendo Switch"}'
```

---

## 3. Yeni Bir Versiyon (v2) Nasıl Eklenir?

### 1. Klasör Yapısı Oluştur

`controllers` ve `routes` klasörlerinde `v2` adında yeni klasörler oluşturun:

```
src/
  controllers/
    v1/
    v2/
  routes/
    v1/
    v2/
```

### 2. v2 Controller ve Route Dosyalarını Oluşturun

- `controllers/v2/` altında yeni veya güncellenmiş controller dosyalarını oluşturun.
- `routes/v2/` altında yeni route dosyalarını oluşturun.

### 3. Kod Tekrarını Azaltmak (DRY Yaklaşımı)

Bir fonksiyon veya endpointin iş mantığı v1 ve v2'de aynıysa, kod tekrarını önlemek için v2 controller dosyasında doğrudan v1'den import edebilirsiniz. Böylece, ortak fonksiyonlar tek bir yerde tutulur ve bakım kolaylaşır.

**Örnek:**

`src/controllers/v2/platforms.controller.ts`:
```typescript
// Eğer v2'de iş mantığı değişmediyse, v1 fonksiyonunu import edin
export { getAllPlatformsController } from '../v1/platforms.controller';

// Eğer bazı fonksiyonlar değişecekse, sadece onları yeniden tanımlayın
```

Aynı şekilde, route dosyalarında da v1'den import yapabilirsiniz:

`src/routes/v2/platforms.ts`:
```typescript
import { getAllPlatformsController } from '../../controllers/v2/platforms.controller';
// veya doğrudan v1'den:
// import { getAllPlatformsController } from '../../controllers/v1/platforms.controller';

// Route tanımınız burada
```

Bu yöntemle, sadece değişiklik gerektiren fonksiyonları v2'de yeniden yazar, diğerlerini v1'den import ederek kod tekrarını önlersiniz.

### 4. v2 Router'ı Tanımlayın

`src/routes/v2/index.ts` dosyası oluşturup, v2 route'larını burada toplayın:

```typescript
import { Hono } from 'hono'
import gamesRoutes from './games'
// diğer v2 route'larını ekleyin

const v2Router = new Hono()

v2Router.route('/games', gamesRoutes)
// diğer route'lar

export default v2Router
```

### 5. Ana Router'a v2'yi Ekleyin

`src/routes/index.ts` dosyasında:

```typescript
import v2Router from './v2'

router.route('/api/v2', v2Router)
```

### 6. Middleware ve Versiyon Algılaması

Var olan version middleware, `/api/v2` gibi yolları otomatik algılar. Ekstra bir işlem yapmanıza gerek yoktur.

---

## 4. Sıkça Sorulan Sorular

**Soru:** Eski versiyonlar silinecek mi?  
**Cevap:** Hayır, eski versiyonlar (örn. v1) ayrı klasörlerde tutulur ve geriye dönük uyumluluk sağlanır.

**Soru:** Versiyonlar arasında kod tekrarını nasıl azaltabilirim?  
**Cevap:** Fonksiyonlar aynıysa, v2 controller veya route dosyasında doğrudan v1'den import ederek kod tekrarını önleyebilirsiniz. Sadece değişen fonksiyonları v2'de yeniden tanımlayın.

**Soru:** Ortak yardımcı fonksiyonlar nerede tutulmalı?  
**Cevap:** Ortak kullanılacak yardımcı fonksiyonları `lib/`, `utils/` veya `services/` gibi klasörlerde tutabilirsiniz.

---

## 5. Katkı Sağlamak

- Yeni bir versiyon eklerken, mevcut fonksiyonları bozmadığınızdan emin olun.
- Her yeni versiyon için ayrı controller ve route dosyaları oluşturun.
- Kod tekrarını önlemek için ortak fonksiyonları import edin.
- Gerekirse test dosyalarını da güncelleyin.

**Not:**  
API endpointlerinin güncel listesini ve örneklerini OpenAPI/Swagger dokümantasyonunda bulabilirsiniz.
