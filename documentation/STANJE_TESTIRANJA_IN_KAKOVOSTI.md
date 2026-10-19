# CareerCompass – stanje testiranja in zagotavljanja kakovosti

Dokument opisuje različico projekta ob koncu razvoja: zadnji commit do konca junija 2024, **`4838f3d` (9. 6. 2024)**.
Poznejše spremembe v repozitoriju niso upoštevane. Za vsako aktivnost so navedeni vrsta, stanje, pokriti del rešitve,
orodja in ogrodja ter uporaba umetne inteligence. Stanje je bilo ugotovljeno s pregledom repozitorija in git zgodovine do
konca junija 2024, GitHub Issues, GitBook dokumentacije ter z dejanskim zagonom testov te različice 5. in 8. 10. 2026.

## Povzetek

| # | Aktivnost | Vrsta | Stanje (različica `4838f3d`) |
| --- | --- | --- | --- |
| A1 | Testi enot zaledja | avtomatizirano, dinamično | ✅ 12/12 uspešnih, pokritost vrstic 4,46 % |
| A2 | E2E test zaledja | avtomatizirano, dinamično | ⚠️ 1 test (iz predloge NestJS), uspešen; ni v CI |
| A3 | Ročni testni scenariji | ročno, sistemsko/sprejemno | ⚠️ 11 scenarijev, ni zapisov izvedbe |
| A4 | Neprekinjena integracija (GitHub Actions) | avtomatizacija procesa | ✅ junija 2024 delujoča; danes pade korak SonarCloud |
| A5 | Statična analiza kode (SonarCloud) | statično | ✅ uporabljena med razvojem; projekt danes ne obstaja več |
| A6 | Linting, formatiranje, preverjanje tipov | statično | ✅ backend 0 težav, frontend 2 opozorili |
| A7 | Testiranje zmogljivosti (PageSpeed Insights) | ročno, nefunkcionalno | ⚠️ enkratna meritev |
| A8 | Varnost odvisnosti | statično, varnost | ❌ ni izvajano |
| A9 | AI moderacija uporabniške vsebine | zagotavljanje kakovosti vsebine (v času izvajanja) | ⚠️ implementirano; danes OpenAI račun brez kreditov |
| A10 | Upravljanje zahtev in nalog | proces | ✅ uporabniške zgodbe, persone, 75 GitHub issues |

## Podrobnosti po aktivnostih

### A1 – Testi enot zaledja

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Testiranje enot (white-box), avtomatizirano. Odvisnosti (repozitoriji, OpenAI) so nadomeščene z `jest.fn()` mocki. |
| Stanje | 2 testni zbirki, 12 testov, vsi uspešni (`npm run test`). Tečejo v CI (A4). Dodani maja–junija 2024 (commita "AI check comments unit test", "Add User Service Unit Test"). |
| Pokriti del | `UserService` (10 testov: CRUD po ID in e-pošti, izjeme `NotFoundException`) in `AiService.checkComment` (2 testa: primeren/neprimeren komentar). Ni testov za `CompanyService`, `JobAdvertisementService`, `RatingService`, `AverageRatingService` (izračuni povprečij), `ChatHistoryService`, kontrolerje ali obličje. |
| Pokritost (`npm run test:cov`) | stavki 4,89 %, veje 1,66 %, funkcije 5,71 %, vrstice 4,46 %. Po servisih: `user.service` 64,7 %, `ai.service` 54,8 %, vsi ostali servisi 0 %. |
| Orodja in ogrodja | Jest 29, ts-jest, `@nestjs/testing` (`Test.createTestingModule`). |
| Datoteke | `backend/src/modules/user/user.service.spec.ts`, `backend/src/modules/ai/ai.service.spec.ts` |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

### A2 – E2E test zaledja

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Integracijski/e2e test HTTP vmesnika, avtomatizirano. |
| Stanje | 1 test (`GET /` vrne 200 in `Hello, World!`), ostanek predloge NestJS. Lokalno uspešen (`npm run test:e2e -- --forceExit`), potrebuje delujočo MongoDB. Brez `--forceExit` se Jest ne konča, ker test ne zapre aplikacije in povezave na bazo (manjka `afterAll(() => app.close())`). Ni vključen v CI. |
| Pokriti del | Zagon celotnega `AppModule` in povezava na bazo; poslovne logike ne pokriva. |
| Orodja in ogrodja | Jest, Supertest, `@nestjs/testing`. |
| Datoteke | `backend/test/app.e2e-spec.ts`, `backend/test/jest-e2e.json` |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

### A3 – Ročni testni scenariji

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Ročno sistemsko/sprejemno testiranje na podlagi uporabniških zgodb. |
| Stanje | 11 testnih scenarijev za 9 uporabniških zgodb, vsak z namenom, predpogoji, vhodnimi podatki, koraki (akcija – pričakovan rezultat) in pogoji uspešnega zaključka. Zapisov o izvedbi (datum, rezultat, najdene napake) ni. |
| Pokriti del | Registracija in prijava uporabnika (TS1, TS2), filtriranje podjetij (TS3), ocenjevanje (TS4), filtriranje zaposlitev (TS5), AI svetovalec (TS6), registracija in prijava podjetja (TS7, TS8), prevzem profila (TS9), objava oglasa (TS10), shranjevanje oglasov (TS11). Pokrivajo F1–F2, F4, F6, F8, F9, F11–F13, F15 iz [FUNKCIONALNOSTI.md](FUNKCIONALNOSTI.md). |
| Orodja | Microsoft Word, GitBook. |
| Datoteke | `documentation/CareerCompass_Test_Cases.docx`, `documentation/CareerCompass_User_stories.docx`, [GitBook – Testni scenariji](https://career-compass.gitbook.io/career-compass/testiranje/testni-scenariji) |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

### A4 – Neprekinjena integracija (GitHub Actions)

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Avtomatizirana gradnja in testiranje ob vsakem `push`/`pull request` na `main`. |
| Stanje | Cevovod `CI/CD` (`.github/workflows/workflow.yml`, uveden aprila 2024) s 4 opravili: *Build backend* (`npm ci`, `npm run build`), *Build frontend*, *Backend unit testing* (`npm run test`), *SonarCloud*. GitBook ([GitHub Actions](https://career-compass.gitbook.io/career-compass/tehnologije/github-actions)) prikazuje uspešen zagon vseh opravil. Zgodovina zagonov iz leta 2024 na GitHubu ni več na voljo. Ob ponovnem zagonu danes bi korak *SonarCloud* padel, ker projekt na SonarCloud ne obstaja več (A5); akcija `sonarsource/sonarcloud-github-action@master` je medtem postala opuščena. Deploy na Vercel poteka ločeno prek Vercel integracije. |
| Pokriti del | Prevedljivost zaledja in obličja (vključno s TypeScript in ESLint preverjanjem pri `next build`), testi enot zaledja. Ne pokriva e2e testa in obličja s testi. |
| Orodja in ogrodja | GitHub Actions, `actions/checkout@v4`, `actions/cache@v4`, Vercel. |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

### A5 – Statična analiza kode (SonarCloud)

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Statična analiza kakovosti, zanesljivosti in varnosti kode. |
| Stanje | Vključena v CI od aprila 2024; ugotovitve so bile sproti odpravljane (commiti "Remove sonar code smells part 1/2", "🧹 code smells"). Končni rezultati (GitBook, [SonarCloud](https://career-compass.gitbook.io/career-compass/testiranje/sonarcloud)): 10 odprtih "code smells" (17 označenih kot sprejetih), 5 hroščev, 0 varnostnih ranljivosti, 4,6 % podvojene kode, tehnični dolg < 5 %. Projekt `mtoplak_CareerCompass` na SonarCloud danes ne obstaja več (API: "Component key not found"). |
| Pokriti del | Celotna koda repozitorija (zaledje in obličje). |
| Orodja | SonarCloud. |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

### A6 – Linting, formatiranje, preverjanje tipov

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Statična analiza in standardizacija sloga kode. |
| Stanje | Zaledje: ESLint s `plugin:@typescript-eslint/recommended` – 0 težav (`npx eslint "{src,test}/**/*.ts"`). Obličje: ESLint `next/core-web-vitals` – 2 opozorili `react-hooks/exhaustive-deps` (`JobPage.tsx`, `chat.tsx`). TypeScript preverjanje tipov ob gradnji obeh delov – brez napak. Prettier je konfiguriran (`backend/.prettierrc`, `frontend/.prettierrc.json`), ni pa preverjanja formatiranja v CI ali pre-commit kavljev. |
| Pokriti del | Vsa TypeScript koda zaledja in obličja. |
| Orodja in ogrodja | ESLint 8, typescript-eslint 6, eslint-config-next 14, Prettier 3 (+ `prettier-plugin-tailwindcss`), TypeScript 5. |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

### A7 – Testiranje zmogljivosti (PageSpeed Insights)

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Nefunkcionalno testiranje zmogljivosti spletne strani, ročno. |
| Stanje | Enkratna meritev domače strani v produkciji, rezultati in predlogi izboljšav (WebP/AVIF slike, odstranitev virov, ki blokirajo prikaz, preload LCP slike, ustrezne velikosti slik) so zapisani v GitBook ([PageSpeed Insights](https://career-compass.gitbook.io/career-compass/testiranje/pagespeed-insights)). Ni ponovljivih meritev ali obremenitvenih testov. |
| Pokriti del | Domača stran obličja. |
| Orodja | Google PageSpeed Insights (Lighthouse). |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

### A8 – Varnost odvisnosti

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Statično preverjanje znanih ranljivosti v odvisnostih. |
| Stanje | Med razvojem ni bilo izvajano (ni Dependabot konfiguracije, ni `npm audit` v CI). `npm audit` nad lockfile datotekami različice `4838f3d` (zagnan 8. 10. 2026, torej z današnjo bazo ranljivosti) poroča: zaledje 71 ranljivosti (7 kritičnih, 33 visokih), obličje 68 (7 kritičnih, 32 visokih). |
| Pokriti del | npm odvisnosti zaledja in obličja. |
| Orodja | npm audit. |
| Uporaba UI | Ne. |

### A9 – AI moderacija uporabniške vsebine

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Zagotavljanje kakovosti in varnosti vsebine v času izvajanja (ni testna aktivnost, je pa mehanizem kakovosti). |
| Stanje | Vsak komentar ocene preveri model `gpt-3.5-turbo-0125`; neprimerni komentarji (osebni podatki, kletvice, žaljivke) so zavrnjeni. Odločitev temelji na iskanju besed "yes", "contains", "present" v prostem odgovoru modela, kar je krhko (npr. odgovor "No, the comment contains no personal information." bi bil razumljen kot zavrnitev). Pokrito z dvema testoma enot (A1) z mockom OpenAI. Danes OpenAI vrača 429 (ni kreditov), zato `POST /rating` s komentarjem vrne 500. |
| Pokriti del | F6/F7 – komentarji pri ocenah podjetij. |
| Orodja | OpenAI API (`openai` SDK 4). |
| Uporaba UI | Da – UI je del same funkcionalnosti (klasifikacija komentarjev z LLM). Natančnost modela ni bila sistematično ovrednotena; v repozitoriju ni testnega nabora komentarjev. |

### A10 – Upravljanje zahtev in nalog

| Lastnost | Vrednost |
| --- | --- |
| Vrsta | Procesna aktivnost zagotavljanja kakovosti. |
| Stanje | 9 uporabniških zgodb, 3 persone (`documentation/personas`), diagram primerov uporabe in arhitekturni diagram (`documentation/`), 75 GitHub issues za naloge (vsi odprti aprila–junija 2024). Razvoj je potekal z neposrednimi commiti na `main` brez pull requestov, zato formalnih pregledov kode ni bilo. |
| Orodja | GitHub Issues, GitBook, Microsoft Word. |
| Uporaba UI | V repozitoriju in dokumentaciji ni navedbe. |

## Preverjanje ob vzpostavitvi (ta naloga, 5. in 8. 10. 2026)

Različica `4838f3d` je bila preverjena v ločenem git worktree-ju lokalnega repozitorija z obstoječimi `.env` datotekami.

| Aktivnost | Rezultat |
| --- | --- |
| Namestitev odvisnosti (`npm ci`) | Zaledje in obličje uspešno. |
| Gradnja | `nest build` in `next build` (Next.js 14.2.3, 29 strani, 2 ESLint opozorili) uspešna. |
| Testi enot in e2e | 12/12 in 1/1 uspešnih. |
| Dimni testi REST API-ja (curl) | `GET /`, `/company/best`, `/company/pagination`, `/company/searchPaginated`, `/company/:slug`, `/job`, `/job/search`, `POST /company`, `POST /job`, `POST /user`, `POST /rating` (brez komentarja), shranjevanje/odstranjevanje oglasa, `/job/popular`, `/company/claim` – pričakovani odzivi. `POST /ai` in `POST /rating` s komentarjem – 500 (OpenAI 429). |
| Dimni testi obličja | 18 glavnih strani vrne HTTP 200; posnetki zaslona domače strani, seznama podjetij, profila podjetja in oglasov potrjujejo prikaz podatkov iz lokalne baze. Odkrita in popravljena napaka `destroy is not a function` na domači strani (`ScrollUp.tsx`, vzrok je novejši Chrome). |
| Orodja | npm, curl, Playwright (Python, brskalnik Chrome), MongoDB 6.0. |
| Uporaba UI | Da – vse korake te preverbe je izvedel agent Claude Code (model Claude Opus 5.5). Rezultati so bili preverjeni z izpisi ukazov (izhodne kode, poročila Jest), HTTP odzivi in posnetki zaslona, ki jih je agent sam pregledal. |

## Glavne vrzeli

1. Zelo nizka pokritost s testi enot (4,46 % vrstic); testirana sta le `UserService` in AI preverjanje komentarjev, brez
   testov za podjetja, oglase, ocene, izračun povprečij in obličje.
2. Ni avtomatiziranih funkcionalnih (end-to-end) testov uporabniškega vmesnika; testni scenariji so le ročni in brez
   zapisov izvedbe.
3. E2E test zaledja je le predloga, ni v CI in se brez `--forceExit` ne konča.
4. REST API nima avtentikacije (`FirebaseAuthMiddleware` ni priklopljen) in ni pokrit z varnostnimi testi.
5. Ranljivosti v odvisnostih se ne spremljajo.
6. Delovanje je odvisno od zunanjih storitev (OpenAI, Firebase), za katere ni nadomestkov na sistemski ravni.

---

*Izjava o uporabi generativne umetne inteligence:* dokument je pripravil agent Claude Code (model Claude Opus 5.5) na
podlagi pregleda repozitorija in git zgodovine do konca junija 2024, GitBook dokumentacije in lastnega zagona testov
različice `4838f3d`. Številke (število testov, pokritost, `npm audit`, število strani) so prepisane iz dejanskih izpisov
orodij. Navedbe "V repozitoriju in dokumentaciji ni navedbe" pomenijo, da agent ni našel zapisa o uporabi UI pri
prvotnem razvoju – avtorice projekta naj jih po potrebi popravijo.
