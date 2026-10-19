# CareerCompass – ključne funkcionalnosti

CareerCompass je spletna platforma za iskalce zaposlitve v Sloveniji: uporabniki pregledujejo in ocenjujejo podjetja,
iščejo zaposlitvene oglase in se pogovarjajo z AI kariernim svetovalcem, podjetja pa upravljajo svoj profil in objavljajo
oglase. Projekt je nastal kot študentski projekt (april–junij 2024, 3 avtorice).

Dokument opisuje različico ob koncu razvoja – zadnji commit do konca junija 2024, **`4838f3d` (9. 6. 2024)**. Poznejše
spremembe v repozitoriju niso upoštevane. Seznam je sestavljen iz pregleda izvorne kode te različice (strani v `frontend/src/app/(site)`, API poti v `frontend/src/app/api`,
kontrolerji v `backend/src/modules`), uporabniških zgodb (`documentation/CareerCompass_User_stories.docx`) in GitBook
strani [Funkcionalnosti](https://career-compass.gitbook.io/career-compass/pregled/funkcionalnosti).

## Vloge

| Vloga | Opis |
| --- | --- |
| Obiskovalec | Neprijavljen uporabnik. Pregleduje podjetja, oglase in ocene. |
| Uporabnik (zaposleni / iskalec zaposlitve) | Registriran in prijavljen. Lahko še shranjuje oglase in uporablja AI svetovalca. |
| Podjetje | Registriran račun, povezan s profilom podjetja. Ureja profil in objavlja oglase. |

## Pregled funkcionalnosti

Stolpec **Stanje lokalno** opisuje, kaj je bilo 5. in 8. 10. 2026 preverjeno v lokalno vzpostavljenem okolju različice
`4838f3d` (glej [VZPOSTAVITEV.md](VZPOSTAVITEV.md)):
✅ deluje (preverjeno), ⚠️ deluje delno, ❌ ne deluje zaradi zunanje storitve, – ni bilo preverjeno od začetka do konca.

| ID | Funkcionalnost | Vloga | Obličje (stran) | Zaledje (API) | Stanje lokalno |
| --- | --- | --- | --- | --- | --- |
| F1 | Registracija uporabnika s potrditvijo e-pošte | obiskovalec | `/registracija` | `/api/register` → Firebase Auth, `POST /user` | – (Firebase Auth deluje) |
| F2 | Prijava in odjava (e-pošta + geslo, Google račun) | obiskovalec | `/prijava` | NextAuth, `/api/login` → Firebase Auth | – (Firebase Auth deluje) |
| F3 | Pozabljeno geslo | obiskovalec | `/novogeslo` | `/api/forgot-password/reset` → Firebase | – |
| F4 | Iskanje in filtriranje podjetij s straničenjem | vsi | `/podjetja`, `/iskanje`, iskalnik na domači strani | `GET /company/pagination`, `GET /company/searchPaginated` | ✅ |
| F5 | Profil podjetja s povprečnimi ocenami, grafi in komentarji | vsi | `/podjetje/[slug]`, `/vsi-komentarji/[slug]` | `GET /company/:slug`, `GET /job/company/:slug` | ⚠️ (brez logotipov) |
| F6 | Ocenjevanje podjetja | vsi | `/ocenjevanje/[slug]` | `POST /rating` | ⚠️ (brez komentarjev) |
| F7 | AI preverjanje komentarjev pred objavo | sistem | (del F6) | `AiService.checkComment` → OpenAI | ❌ |
| F8 | Iskanje, filtriranje in pregled zaposlitvenih oglasov | vsi | `/zaposlitve`, `/iskanje-zaposlitev`, `/zaposlitev/[id]` | `GET /job/search`, `GET /job/:id` | ✅ |
| F9 | Shranjevanje zaposlitvenih oglasov | uporabnik | `/shranjene-zaposlitve`, gumb na oglasu | `GET /job/save/…`, `/job/unsave/…`, `/job/saved/:email` | ✅ (API) |
| F10 | Predlogi zaposlitev | vsi | domača stran, profil podjetja | `POST /job/popular` | ✅ (API) |
| F11 | AI karierni svetovalec z zgodovino pogovorov | uporabnik | `/ai-svetovalec` | `POST /ai`, `POST /history/user`, `POST /history/remove` | ❌ |
| F12 | Registracija novega podjetja | obiskovalec | `/za-delodajalce/registracija` | `/api/registerCompany` → Firebase Storage, `POST /company` | ⚠️ (`POST /company` deluje, nalaganje logotipa ne) |
| F13 | Prevzem obstoječega profila podjetja | obiskovalec | `/za-delodajalce/prevzemi` | `/api/claim` → `POST /company/claim`, Firebase Auth | ✅ (API) |
| F14 | Urejanje in brisanje profila podjetja | podjetje | `/urejanje` | `/api/editCompany`, `/api/deleteCompany` → `PATCH`/`DELETE /company/:id` | – |
| F15 | Objava zaposlitvenega oglasa | podjetje | `/dodaj-zaposlitev` | `POST /job` | ✅ (API) |
| F16 | Zajem podjetij in oglasov s spletnim pajkom | sistem | – | `scraper/`, `scraper/cron-job` (Vercel), `POST /job/multiple`, `DELETE /job/source` | – (ni bil zagnan) |
| F17 | Najbolje ocenjena podjetja na domači strani | vsi | `/` | `GET /company/best` | ✅ |

## Opis funkcionalnosti

### F1 – Registracija uporabnika
Obrazec zahteva ime in priimek, e-pošto in geslo (vsaj 6 znakov). Pot `/api/register` preveri, ali uporabnik že obstaja
(`GET /user/get/:email`), ustvari račun v Firebase Auth, pošlje potrditveno e-pošto in uporabnika zapiše v MongoDB
(`POST /user`). Možna je tudi registracija z Google računom.

### F2 – Prijava in odjava
Prijava z e-pošto in geslom gre prek Firebase Auth (`/api/login`), ki zavrne nepotrjene e-poštne naslove; seja se nato
vodi z NextAuth (JWT). Podprta je prijava z Google računom (NextAuth `GoogleProvider`). Seja nosi tudi podatek, ali je
uporabnik povezan s podjetjem, kar odklene funkcije F14 in F15.

### F3 – Pozabljeno geslo
Uporabnik vpiše e-pošto; sistem preveri, da račun obstaja in ni prijavljen z Googlom, nato Firebase pošlje povezavo za
ponastavitev gesla.

### F4 – Iskanje in filtriranje podjetij
Seznam več kot 650 slovenskih podjetij (po 28 na stran). Filtri: ime, kraj, dejavnost (10 panog), minimalna povprečna
ocena (1+ do 4+) in "ima zaposlitvene oglase". Iskalno polje na domači strani preusmeri na `/iskanje`.

### F5 – Profil podjetja
Prikazuje podatke podjetja (panoga, poddejavnost, e-pošta, naslov, spletna stran), skupno oceno in število ocen,
povprečja po kategorijah (ekipa, osebna rast, fleksibilnost, ravnovesje dela in življenja, delovno vzdušje, vodstvo,
ugodnosti, bonusi), grafe deleža dela na daljavo, izkušnje z razgovorom in težavnosti razgovora, komentarje treh vrst
(`/vsi-komentarji/[slug]` prikaže vse) ter zaposlitvene oglase podjetja.

### F6 – Ocenjevanje podjetja
Anonimen obrazec s tremi sklopi: splošna ocena (6 kategorij z zvezdicami + komentar), plača in ugodnosti (2 kategoriji,
delo na daljavo da/ne + komentar) ter razgovori (izkušnja pozitivna/nevtralna/negativna, težavnost + komentar).
Zaledje preveri obvezna polja, shrani oceno in preračuna vse povprečne vrednosti in deleže podjetja
(`AverageRatingService`).

### F7 – AI preverjanje komentarjev
Vsak komentar pri oceni se pred objavo pošlje modelu `gpt-3.5-turbo-0125` z vprašanjem, ali vsebuje osebne podatke,
kletvice ali žaljivke. Če odgovor vsebuje "yes", "contains" ali "present", je ocena zavrnjena s sporočilom, kateri
komentar je neprimeren.

### F8 – Zaposlitveni oglasi
Seznam oglasov (zajetih s portalov in objavljenih s strani podjetij) s filtri po nazivu delovnega mesta, kraju in
dejavnosti podjetja ter straničenjem. Stran oglasa prikaže opis, podjetje, kraj in povezavo na izvirni oglas oziroma
način prijave.

### F9 – Shranjevanje oglasov
Prijavljen uporabnik shrani ali odstrani oglas; shranjeni oglasi so zbrani na `/shranjene-zaposlitve` z lastnim filtrom.

### F10 – Predlogi zaposlitev
Prijavljenemu uporabniku sistem predlaga do 4 oglase podjetij, katerih oglase je že shranil (brez že shranjenih
oglasov). Če takih ni ali uporabnik ni prijavljen, prikaže 4 najnovejše oglase.

### F11 – AI karierni svetovalec
Klepet z modelom, prilagojenim z 225 primeri pogovorov (`ai-chatbot/dataset.jsonl`, fine-tuning gpt-3.5-turbo).
Odgovarja na vprašanja o karieri, življenjepisu, razgovorih in uporabi platforme. Zgodovina pogovorov se hrani v MongoDB
za vsakega uporabnika (zadnjih 6 sporočil se pošlje kot kontekst) in jo uporabnik lahko izbriše. Dostopno le
prijavljenim.

### F12 – Registracija podjetja
Podjetje, ki ga še ni na platformi, vnese naziv, naslov, kraj, e-pošto, spletno stran, dejavnost, poddejavnosti in
logotip. Logotip se pomanjša in naloži v Firebase Storage, podjetje pa se ustvari skupaj s praznim zapisom povprečnih
ocen.

### F13 – Prevzem profila podjetja
Če podjetje že obstaja (npr. ga je dodal pajek), ga lastnik prevzame z e-poštnim naslovom, ki je zapisan v profilu
podjetja, in geslom. Ustvari se uporabniški račun, povezan s podjetjem.

### F14 – Urejanje in brisanje profila podjetja
Prijavljeno podjetje na `/urejanje` spremeni podatke in logotip ali izbriše profil (skupaj z oglasi in uporabniškim
računom).

### F15 – Objava zaposlitvenega oglasa
Prijavljeno podjetje objavi oglas (naziv, opis, kraj, način prijave); oglas se samodejno poveže s podjetjem po imenu.

### F16 – Spletni pajek
`scraper/companiesScraper.js` s Puppeteerjem zajame podjetja, `companyPostprocessing.js` uredi panoge, doda slug,
logotipe (v Firebase Storage) in počisti kraje. `scraper/cron-job` je serverless funkcija na Vercelu, ki periodično
zajame oglase z MojeDelo.com in jih prek `POST /job/multiple` (po predhodnem `DELETE /job/source`) zamenja v bazi.

### F17 – Najbolje ocenjena podjetja
Domača stran prikaže 4 najbolje ocenjena podjetja in predloge zaposlitev.

## Podporne funkcionalnosti

- Temni/svetli način prikaza (preklop v glavi strani).
- Odzivna zasnova (Tailwind CSS).

## Opažanja ob pregledu

- `FirebaseAuthMiddleware` (`backend/src/middlewares`) obstaja, vendar ni priklopljen (`AppModule.configure()` je
  prazen). Vsi REST klici zaledja so zato dostopni brez prijave, vključno z `DELETE /company/:id` in `DELETE /user/:id`;
  omejitve veljajo le v uporabniškem vmesniku.
- `POST /rating` najprej shrani oceno in šele nato preveri komentarje. Če je komentar zavrnjen (ali OpenAI ni dosegljiv),
  ostane ocena v kolekciji `ratings`, povprečja podjetja pa se ne posodobijo.
- `class-validator` dekoratorji so uporabljeni le v enem DTO-ju, globalni `ValidationPipe` ni nastavljen – vhodni
  podatki se preverjajo ročno v servisih.

---

*Izjava o uporabi generativne umetne inteligence:* seznam funkcionalnosti je pripravil agent Claude Code (model
Claude Opus 5.5) na podlagi pregleda izvorne kode, uporabniških zgodb in GitBook dokumentacije. Stolpec "Stanje lokalno"
temelji na dejanskih klicih API-ja in posnetkih zaslona v lokalnem okolju; funkcionalnosti, označene z "–", niso bile
preizkušene od začetka do konca.
