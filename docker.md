# PostgreSQL Docker Konteyner Kurulum Adımları

Bu dokümanda, PostgreSQL veritabanını Docker konteyner olarak nasıl kuracağımızı adım adım açıklayacağız.

## 1. PostgreSQL Docker İmajının İndirilmesi

İlk adım olarak PostgreSQL''in Alpine Linux tabanlı hafif versiyonunu indiriyoruz:

```bash
docker pull postgres:16.9-alpine3.22
```

Bu komut, Docker Hub''dan PostgreSQL''in 16.9 versiyonunu Alpine Linux 3.22 tabanlı imajını indirir. Alpine Linux tabanlı imajlar, boyut olarak daha küçük ve daha güvenlidir.

## 2. PostgreSQL Konteynerinin Oluşturulması ve Çalıştırılması

İndirilen imajı kullanarak yeni bir konteyner oluşturup çalıştırmak için aşağıdaki komutu kullanıyoruz:

```bash
docker run -p 1453:5432 --name noobgg-postgres -e POSTGRES_PASSWORD=123noobgg123++ -d postgres:16.9-alpine3.22
```

### Komut Parametrelerinin Açıklaması:

- `-p 1453:5432`: Port yönlendirmesi. Host makinedeki 1453 portunu, konteynerin içindeki PostgreSQL''in varsayılan portu olan 5432''ye yönlendirir.
- `--name noobgg-postgres`: Konteynere verilen isim. Bu isim ile konteyneri daha sonra kolayca yönetebiliriz.
- `-e POSTGRES_PASSWORD=123noobgg123++`: PostgreSQL root kullanıcısının (postgres) şifresini belirler.
- `-d`: Konteyneri arka planda (detached mode) çalıştırır.
- `postgres:16.9-alpine3.22`: Kullanılacak Docker imajının adı ve versiyonu.

## Bağlantı Bilgileri

PostgreSQL veritabanına bağlanmak için aşağıdaki bilgileri kullanabilirsiniz:

- Host: localhost
- Port: 1453
- Kullanıcı Adı: postgres
- Şifre: 123noobgg123++
- Varsayılan Veritabanı: postgres

## Önemli Docker Komutları

Konteyner yönetimi için kullanabileceğiniz bazı faydalı komutlar:

```bash
docker ps                # Çalışan konteynerleri listeler
docker stop noobgg-postgres   # Konteyneri durdurur
docker start noobgg-postgres  # Konteyneri başlatır
docker logs noobgg-postgres   # Konteyner loglarını gösterir
```
