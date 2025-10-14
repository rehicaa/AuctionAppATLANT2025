# 🏷️ Auction App ATLANT 2025

Full-stack web aplikacija za **online aukcije**, razvijena korištenjem **Spring Boot (backend)** i **React/Angular (frontend)** tehnologija.
Aplikacija omogućava registraciju korisnika, pregled i kreiranje aukcija, kao i prijavu putem Google naloga.

---

## 🚀 Pokretanje lokalno

### 🔧 1. Prerequisites

Prije pokretanja aplikacije, instaliraj sljedeće alate:

- Java 17+ (https://adoptium.net/)
- Maven 3.9+ (https://maven.apache.org/)
- Node.js 18+ (https://nodejs.org/)
- PostgreSQL 14+ (https://www.postgresql.org/download/)
- pgAdmin 4 (https://www.pgadmin.org/download/)

---

### 🗄️ 2. Kreiranje PostgreSQL baze

1. Otvori **pgAdmin 4**
2. Kreiraj novu bazu podataka:
   Name: auction_db
   Username: postgres
   Password: rehaprojekat

3. (Po potrebi) ažuriraj kredencijale u fajlu
`backend/src/main/resources/application.properties`:

spring.datasource.url=jdbc:postgresql://localhost:5432/auction_db
spring.datasource.username=postgres
spring.datasource.password=rehaprojekat

⚙️ Prilikom prvog pokretanja aplikacije, baza će se automatski popuniti test podacima putem klase DataSeeder.java.

### 🖥️ 4. Pokretanje backend-a

Otvori terminal i izvrši:
cd backend
.\mvnw spring-boot:run

Ako koristiš IntelliJ IDEA, možeš direktno pokrenuti klasu
BackendApplication.java → Run ▶

➡️ Backend će biti dostupan na adresi:
http://localhost:8080

### 5. Pokretanje frontend-a

U novom terminalu pokreni:

cd frontend
npm install
npm start

➡️ Frontend će biti dostupan na adresi:
http://localhost:5173

### ✅ 6. Testni korisnik

Aplikacija dolazi s inicijalnim korisnikom koji se automatski kreira prilikom pokretanja:
Email: seller@auction.com
Password: superTajniPasswordZaTest123

### 🧰 7. Maven komande:

mvnw clean install    -> Build i testiranje
mvnw spring-boot:run  -> Pokretanje aplikacije
mvnw test             -> Pokretanje testova

---

### STRUKTURA PROJEKTA

AuctionAppATLANT2025/
│
├── backend/                 # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── frontend/                # React frontend
│   ├── src/
│   ├── package.json
│   └── public/
│
└── README.md

---

### 👤 Autor

Projekt razvijen u sklopu ATLANT 2025 projekta.
Autor: Haris Mešić
Godina: 2025