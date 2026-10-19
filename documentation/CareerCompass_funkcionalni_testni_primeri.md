# CareerCompass – pet funkcionalnih testnih primerov

**Naloga:** 2. naloga – Oblikovanje testnih primerov  
**Avtor osnutka:** agent OpenAI Codex  
**Stanje:** pripravljeno za pregled; spodnjih pet testnih primerov ni bilo izvedenih.

Dokument vsebuje pet samostojnih funkcionalnih testnih primerov, povezanih z uporabniškimi zgodbami in funkcionalnostmi projekta. Obstoječi scenariji so bili uporabljeni kot podlaga za pregled. Vključuje ukaze za agenta, testne primere, predlog matrike sledljivosti in komentar o dopolnitvah.

## 1. Podlage in ugotovitve pregleda

Pregledane lokalne podlage v projektu `CareerCompass`:

- `documentation/CareerCompass_Test_Cases.docx`: 11 scenarijev s predpogoji, koraki in pričakovanimi rezultati.
- `documentation/CareerCompass_User_stories.docx`: uporabniške zgodbe US1–US9.
- `documentation/CareerCompassDPU.png`: diagram primerov uporabe; med drugim registracija uporabnika, filtriranje podjetij, iskanje prostih zaposlitev in objava zaposlitvenih oglasov.
- `documentation/ArchitectureDiagram.jpg`: frontend, spletni API, Firebase, podatkovna baza, OpenAI ter pajka. Uporabljen je za določitev odvisnosti testnega okolja, ne kot dokaz pravilnosti funkcionalnosti ali implementirane zaščite API-ja.
- Dopolnilno `../DOCS_CareerCompass/FUNKCIONALNOSTI.md` in `VZPOSTAVITEV.md`: identifikatorji funkcionalnosti in lokalna vzpostavitev.
- Za preverjanje konkretnih podrobnosti: registracijska API-pot in obrazec, filter zaposlitvenih oglasov ter obrazec za objavo oglasa v izvorni kodi.

## 2. Ukazi za agenta

Spodaj so podani kazi, ki so pripeljali do končnega ukaza:

> Kaj so dobre prakse oblikovanja testnih primerov za funkcionalno testiranje?

> Imam naslednjo nalogo, ki zadeva ta projekt, in sicer: 2. naloga - Oblikovanje testnih primerov
Navodilo naloge:
Za svoj izbrani projekt ustvarite pet testnih primerov za funkcionalno testiranje. Pri ustvarjanju testnih primerov ne pozabite na vse atribute, za katere je priporočljivo, da jih testni primer vsebuje. 
Glede predloge zapisa tesnega primera imate proste roke. 
Ampak... Testnih primerov ne pišite sami, ustvari naj jih agent UI. Vaša naloga je pripraviti ukaz, s katerim agentu naročite, kako naj testne primere oblikuje. Dobljene testne primere preglejte. Če rezultat ni ustrezen, ukaz dopolnite in postopek ponovite. Oddajte končni ukaz, testne primere, ki jih je ustvaril agent, ter kratek komentar: kaj ste morali v ukazu popraviti in kaj bi v testnih primerih spremenili sami.
Pripravite tudi dokument/matriko, v kateri povežite funkcionalnosti, ki jih testirate s tesnimi primeri. Če obstaja dokumentacija (npr. SZPO, uporabniški priročnik...) si lahko pomagate s tem. V kolikor dokumentacije ni, funkcionalnosti definirate zgolj s kratkim opisom (prav tako ni potrebno v matriki navesti vseh funkcionalnosti, zgolj tiste, ki jih (po vašem mnenju) preverjajo oblikovani testni primeri. 
Oddaja naloge:
Oddajte dokumentirane testne primere (Word, PDF, povezava...) in matriko povezav s funkcionalnostmi. Navedite katera generativna orodija umetne inteligence, vključno z agenti, ste uporabili pri izdelavi naloge.
Preglej navodila naloge nato preglej že obstoječo dokumentacijo, ki jo najdeš v mapi documentation. Midve že imava obstoječe test cases in user stories vključno z arhitekturnim diagramom ter use case diagramom. Preoblikuj test cases kjer in kot je to potrebno skladno z navodili naloge ter dobrimi praksami pisanja in oblikovanja testnih primerov za fuknkcionalno tetsiranje, ki si jih prej predstavil. Dodaj predlog matrike funkcionalnost–testni primer. Končni dokument za test cases naj bo v obliki markdown datoteke.

> Pet novih testnih primerov oblikuj kot samostojne primere. Ne sklicuj se na prejšnjih enajst testnih scenarijev. Pri vsakem navedi le povezavo z ustrezno uporabniško zgodbo in funkcionalnostjo, enako popravi matriko.

> Korake zapiši podrobno po vzoru obstoječe dokumentacije: navedi mesto klika, uporabljena polja, preklop zavihka ter pričakovani rezultat za posamezno akcijo. Ohrani pet samostojnih primerov. 

### Končni ukaz – združena različica

Spodnji ukaz združuje začetno naročilo in dopolnitve iz pogovora. Ni prepis enega prvotno poslanega sporočila, temveč končna različica navodil za ponovitev izdelave.

> Za projekt CareerCompass, različico 4838f3d, pripravi v slovenščini Markdown dokument z natanko petimi samostojnimi testnimi primeri za ročno funkcionalno testiranje. Preglej dokumenta CareerCompass_Test_Cases.docx in CareerCompass_User_stories.docx ter arhitekturni diagram in diagram primerov uporabe v mapi documentation. Dopolnilno uporabi dokumenta FUNKCIONALNOSTI.md in VZPOSTAVITEV.md v mapi DOCS_CareerCompass ob repozitoriju. Podrobnosti o obstoječih poljih, gumbih in pravilih po potrebi preveri v kodi.
>
> Oblikuj naslednjih pet primerov: uspešna registracija s potrditvijo e-pošte in šestmestnim geslom, zavrnitev registracije s petmestnim geslom, filtriranje podjetij po dejavnosti in minimalni povprečni oceni, iskanje zaposlitve brez zadetkov ter uspešna objava zaposlitvenega oglasa s strani podjetja. Vsak primer poveži z ustrezno uporabniško zgodbo in funkcionalnostjo, brez sklicev na oznake prejšnjih enajstih testnih scenarijev.
>
> Za vsak primer navedi ID, naziv, cilj, povezavo na zahtevo, vlogo, vrsto in tehniko testiranja, prioriteto, okolje, predpogoje, testne podatke, odvisnosti, oštevilčene korake, pričakovani rezultat vsakega koraka, merilo uspeha, pričakovano stanje po izvedbi in čiščenje. Dodaj prazna polja za izvajalca, datum, uporabljeno različico in okolje, dejanski rezultat, status, dokaze ter ID napake.
>
> Ohrani podrobni slog »Akcija – Pričakovani rezultat« iz obstoječe dokumentacije. Navedi, kje uporabnik klikne, kaj vnese in kateri zavihek oziroma sporočilo odpre. Rezultati naj bodo preverljivi. Skupno okolje opiši kratko. Namesto posebnih oznak za e-pošto napiši »veljaven, še neregistriran e-poštni naslov«, ki ga izvajalec izbere pred izvedbo. Predlagana imena, gesla, podjetja in oglase jasno loči od obstoječih podatkov projekta. Naslov pošiljatelja iz dokumentacije označi kot dokumentiran, ne kot na novo preverjen. Ne izmišljaj zahtev ali rezultatov izvedbe; predpostavke in dodatna merila jasno označi.
>
> Pripravi matriko, ki poveže izbrane funkcionalnosti in uporabniške zgodbe z vsemi petimi testi, ter kratko pojasni njeno obliko in omejitve pokritosti. Dodaj kratke alineje o izboljšavah glede na prvotno dokumentacijo, komentar o dejanskih dopolnitvah ukaza in jasno označen predlog osebnega komentarja za avtorici. Navedi uporabljeno generativno orodje. Testov ne izvajaj; status vseh primerov naj bo »Ni izveden«.

### Kaj sva morali v ukazu popraviti
V prvih različicah se je agent preveč osredotočil na tehnične podrobnosti in združil oziroma izpustil nekatere uporabniške korake. Zato sva zahtevali preprostejše izraze, odstranitev nepotrebnih oznak testnih podatkov ter podrobnejši zapis akcij in pričakovanih rezultatov po vzoru obstoječe dokumentacije. Zahtevali sva tudi, da so novi testni primeri samostojni in povezani z uporabniškimi zgodbami, brez sklicev na stare testne scenarije.

## 3. Skupna pravila izvedbe

### Testno okolje in podatki

- Lokalna aplikacija CareerCompass, različica `4838f3d`, frontend `http://localhost:3000`, backend `http://localhost:4000`, testna baza MongoDB in brskalnik Chrome. Ob izvedbi zabeleži uporabljene različice in lokalne spremembe.
- Za registracijo in prijavo mora delovati Firebase Auth. Za potrditev registracije potrebuje izvajalec dostop do uporabljenega e-poštnega predala.
- Pri registracijskih testih uporabi veljaven e-poštni naslov, s katerim v aplikaciji še ni ustvarjen račun. Konkretni naslov izberi pred izvedbo in ga zabeleži med uporabljenimi testnimi podatki.
- Navedena imena, gesla, podjetja in oglasi so **predlagani testni podatki**, ne obstoječi računi ali zapisi iz projekta. Podatke, zahtevane v predpogojih, je treba pred izvedbo pripraviti v testnem okolju.
- Vsak test se izvaja samostojno. Za testa s prijavljenim uporabnikom oziroma podjetjem pripravi račun vnaprej; uspeh testa registracije ni predpogoj.

Pričakovani rezultati opisujejo načrtovano pravilno delovanje, ne rezultatov že izvedenih testov. Dodatna merila, kot sta ohranitev oglasa po osvežitvi in odsotnost dvojnika, so predlagane kontrole pravilnosti; niso dobesedni navedki iz uporabniških zgodb.

### Status in zapis izvedbe

- **Ni izveden:** test še ni začet. 
- **Uspešen:** izpolnjeni so vsi pričakovani rezultati. 
- **Neuspešen:** ob ustreznih predpogojih je rezultat drugačen od pričakovanega. 
- **Blokiran:** manjkajo predpogoji ali odvisnost onemogoča izvedbo. Če aplikacija med izvedbo napačno obravnava izpad, to dodatno zabeleži kot napako; blokiran status ni izgovor za prezrtje opaženih napak.

Vsak spodnji primer ima svojo evidenco. Posnetki naj ne razkrivajo gesel, API-ključev ali potrditvenih žetonov. Prioriteta označuje pomembnost izvedbe, ne resnosti morebitne napake.

## 4. Testni primeri

### TP-01 – Registracija s potrditvijo e-pošte na spodnji dovoljeni meji gesla

| Atribut | Vsebina |
| --- | --- |
| Cilj | Preveriti ustvarjanje novega računa, potrditev e-pošte in uporabnost potrjenega računa pri šestih znakih gesla. |
| Povezava z uporabniško zgodbo in funkcionalnostjo | US1 – registracija uporabnika; F1 – registracija s potrditvijo e-pošte. Prijava na koncu preverja uporabnost ustvarjenega računa. |
| Vloga | Neprijavljen obiskovalec. |
| Vrsta in tehnika | Pozitivni funkcionalni sistemski test; analiza mejne vrednosti 6 znakov. |
| Prioriteta | Visoka: registracija omogoča dostop do funkcij za uporabnike. |
| Okolje | Skupno testno okolje; delujoč Firebase Auth in testni poštni predal. |
| Predpogoji | Uporabnik je odjavljen in na domači strani CareerCompass. Izbrani e-poštni naslov še ni registriran, njegov poštni predal pa je odprt v drugem zavihku. Testni Firebase uporablja enako pravilo dolžine gesla kot aplikacija. |
| Podatki | Ime in priimek: `Testna Oseba`; e-pošta: veljaven, še neregistriran naslov z dostopnim predalom; izključno testno geslo: `Tst42!` (6 znakov). |
| Odvisnosti | Dostava potrditvene pošte in uspešno shranjevanje v Firebase ter MongoDB. Neodvisen od drugih testov. |

**Scenarij testiranja:**

| Korak | Akcija | Pričakovani rezultat |
| --- | --- | --- |
| 1. | Na domači strani se pomaknemo v nogo strani in pod rubriko »Moj račun« kliknemo »Registracija«. | Prikaže se podstran »Registracija« z obrazcem za registracijo. |
| 2. | V polje »Ime in priimek« vnesemo `Testna Oseba`, v »Email« izbrani še neregistrirani naslov in v »Geslo« `Tst42!`. | Polja vsebujejo vnesene podatke; geslo je zaradi zasebnosti prikazano prikrito. |
| 3. | Kliknemo gumb »Registracija«. | Prikaže se obvestilo o uspešni registraciji in poslani potrditveni povezavi. Preusmerjeni smo na podstran »Prijava«. |
| 4. | Preklopimo na zavihek s poštnim predalom naslova, ki smo ga vnesli pri registraciji. | Prikaže se poštni predal uporabljenega e-poštnega naslova. |
| 5. | Poiščemo in odpremo novo potrditveno sporočilo, povezano s pravkar opravljeno registracijo. V izvirni dokumentaciji je naveden pošiljatelj `noreply@career-compass-ed243.firebaseapp.com`. | Prikaže se vsebina potrditvenega sporočila s povezavo za potrditev e-poštnega naslova. |
| 6. | V sporočilu kliknemo potrditveno povezavo. | Odpre se stran za potrditev in prikaže uspešno preverjanje e-poštnega naslova. |
| 7. | Vrnemo se na zavihek CareerCompass s podstranjo »Prijava«. Vnesemo isti e-poštni naslov in geslo `Tst42!` ter kliknemo »Prijava«. | Prijava uspe. Prikaže se domača stran in stanje prijavljenega uporabnika, npr. njegov račun oziroma možnost odjave. |
| 8. | V brskalniku osvežimo domačo stran. | Uporabnik ostane prijavljen tudi po ponovnem nalaganju strani. |

**Merilo uspeha:** vsi pričakovani rezultati so izpolnjeni; šestmestno geslo je sprejeto, potrditev deluje in račun omogoči prijavo. Sama preusmeritev po oddaji ne zadostuje.

**Stanje po izvedbi:** ustvarjen in potrjen testni račun z aktivno sejo. 

**Čiščenje:** odjavi se in odstrani ustvarjeni testni račun iz testnega Firebase in MongoDB, tudi če je registracija uspela le delno.

| Evidenca | Vrednost |
| --- | --- |
| Status | Ni izveden |
| Izvajalec / datum | — / — |
| Različica aplikacije, OS, brskalnik in uporabljeni podatki | — |
| Dejanski rezultat | — |
| Dokazi / ID napake | — / — |

### TP-02 – Zavrnitev registracije s prekratkim geslom

| Atribut | Vsebina |
| --- | --- |
| Cilj | Preveriti, da petmestno geslo ne ustvari uporabniškega računa. |
| Povezava z uporabniško zgodbo in funkcionalnostjo | US1 – registracija uporabnika; F1 – preverjanje veljavnosti podatkov pri registraciji. Minimum šestih znakov izhaja iz pregledane kode. |
| Vloga | Neprijavljen obiskovalec. |
| Vrsta in tehnika | Negativni funkcionalni test; analiza mejne vrednosti 5 znakov, tik pod minimumom 6. |
| Prioriteta | Visoka: preprečuje sprejem podatkov, ki kršijo pravilo registracije. |
| Okolje | Skupno testno okolje; možnost bralnega preverjanja namenskih testnih računov v Firebase in MongoDB. |
| Predpogoji | Uporabnik je odjavljen in na domači strani CareerCompass; izbrani veljaven e-poštni naslov še ni registriran. Izvajalec lahko preveri, ali je v testnem Firebase in MongoDB nastal račun. |
| Podatki | Ime in priimek: `Testna Oseba`; e-pošta: veljaven, še neregistriran naslov; testno geslo: `Tst4!` (5 znakov). |
| Odvisnosti | Dosegljiva aplikacija; za preverjanje odsotnosti računa dostop do testnih shramb. Ne potrebuje predhodnega TP-01. |

**Scenarij testiranja:**

| Korak | Akcija | Pričakovani rezultat |
| --- | --- | --- |
| 1. | Na domači strani se pomaknemo v nogo strani in pod rubriko »Moj račun« kliknemo »Registracija«. | Prikaže se podstran »Registracija«. |
| 2. | V polje »Ime in priimek« vnesemo `Testna Oseba`, v »Email« veljaven še neregistrirani naslov in v »Geslo« `Tst4!`. | Ime in e-poštni naslov sta prikazana v ustreznih poljih; vneseno geslo je prikrito. |
| 3. | Kliknemo gumb »Registracija«. | Prikaže se sporočilo »Geslo mora vsebovati vsaj 6 znakov!«. Ostajamo na registracijskem obrazcu; ni obvestila o uspešni registraciji. |
| 4. | Preverimo prikaz uporabniškega računa v glavi strani. | Uporabnik ostane neprijavljen; ni prikazan njegov prijavljeni račun. |
| 5. | Kot podporno preverjanje v testnem Firebase Auth in zbirki uporabnikov MongoDB poiščemo uporabljeni e-poštni naslov. | V nobeni shrambi ni računa s tem naslovom. To preverjanje opravi izvajalec z dostopom do testnega okolja. |

**Merilo uspeha:** razumljiva zavrnitev in noben ustvarjen račun. Samo prikaz napake ne zadošča, če je račun kljub temu nastal.

**Stanje po izvedbi:** račun z uporabljenim e-poštnim naslovom ne obstaja. 

**Čiščenje:** zapri oziroma počisti obrazec; če je zaradi napake račun nastal, najprej shrani dokaz in nato odstrani samo ta testni račun iz obeh shramb.

| Evidenca | Vrednost |
| --- | --- |
| Status | Ni izveden |
| Izvajalec / datum | — / — |
| Različica aplikacije, OS, brskalnik in uporabljeni podatki | — |
| Dejanski rezultat | — |
| Dokazi / ID napake | — / — |

### TP-03 – Filtriranje podjetij po dejavnosti in povprečni oceni

| Atribut | Vsebina |
| --- | --- |
| Cilj | Preveriti sočasno uporabo obeh filtrov in vključitev podjetja z oceno točno 4 pri izbiri 4+. |
| Povezava z uporabniško zgodbo in funkcionalnostjo | US2 – iskanje, filtriranje in ogled podjetij; F4 – filtriranje podjetij. Ta primer preverja dejavnost in minimalno oceno, ne ogleda profila. |
| Vloga | Neprijavljen obiskovalec, kot dopušča diagram primerov uporabe. |
| Vrsta in tehnika | Pozitivni funkcionalni test; kombinacija pogojev (logični IN), mejne vrednosti in kontrolni neustrezni primeri. |
| Prioriteta | Visoka: napačen filter uporabniku predstavi neustrezna podjetja. |
| Okolje | Skupno testno okolje; izoliran začetni nabor spodnjih štirih podjetij. |
| Predpogoji | Pripravljena podjetja A–D z veljavnimi obveznimi podatki; njihove dejanske povprečne ocene in povezani agregati so medsebojno skladni. V testnem naboru ni drugih podjetij. Vsi filtri so ponastavljeni; uporabnik je na domači strani CareerCompass. |
| Podatki | A: `TP03-A`, Dom in vrt, ocena 4,0; B: `TP03-B`, Dom in vrt, 3,9; C: `TP03-C`, Avtomobilizem, 4,5; D: `TP03-D`, Dom in vrt, 4,1. |
| Odvisnosti | Frontend, backend, pravilno pripravljeni podatki v MongoDB. Ne zadostuje sprememba samo številke v kartici ali samo polja na podjetju. |

**Scenarij testiranja:**

| Korak | Akcija | Pričakovani rezultat |
| --- | --- | --- |
| 1. | Na domači strani v meniju v glavi kliknemo »Podjetja«. | Prikaže se podstran »Vsa podjetja« z vsemi štirimi pripravljenimi podjetji A–D. |
| 2. | V filtru dejavnosti izberemo »Dom in vrt«. | V polju za dejavnost je izbrana vrednost »Dom in vrt«. |
| 3. | V filtru ocene izberemo »4+«. Polji za naziv in lokacijo pustimo prazni, možnost »Zaposlitveni oglasi« pa neoznačeno. | Izbrana sta dejavnost »Dom in vrt« in ocena »4+«, brez drugih omejitev. |
| 4. | Kliknemo gumb »Išči« in počakamo, da se rezultati naložijo. | Prikazani sta natanko podjetji A (`TP03-A`) in D (`TP03-D`). B je izločen zaradi prenizke ocene, C zaradi druge dejavnosti. |
| 5. | Na karticah obeh prikazanih podjetij preverimo dejavnost in oceno. | Obe podjetji imata dejavnost »Dom in vrt«. Ocena A je 4,0, ocena D pa 4,1; enakovreden prikaz števil je dopusten. Podjetje z oceno točno 4 je vključeno. |

**Merilo uspeha:** množica zadetkov je natanko {A, D}, ne zgolj neprazen seznam. Preverjena je kombinacija obeh pogojev in vključujoča spodnja meja, ne vse kombinacije filtrov ali straničenje.

**Stanje po izvedbi:** prikazan filtriran seznam; podatki ostanejo nespremenjeni. 

**Čiščenje:** ponastavi filtre in obnovi predtestni posnetek izolirane baze oziroma odstrani samo pripravljene zapise z njihovimi povezanimi ocenami in agregati.

| Evidenca | Vrednost |
| --- | --- |
| Status | Ni izveden |
| Izvajalec / datum | — / — |
| Različica aplikacije, OS, brskalnik in uporabljeni podatki | — |
| Dejanski rezultat | — |
| Dokazi / ID napake | — / — |

### TP-04 – Iskanje zaposlitve brez zadetkov

| Atribut | Vsebina |
| --- | --- |
| Cilj | Preveriti pravilno prazno stanje pri veljavni poizvedbi brez ujemajočih oglasov. |
| Povezava z uporabniško zgodbo in funkcionalnostjo | US4 – iskanje prostih zaposlitev; F8 – iskanje zaposlitvenih oglasov brez zadetkov. |
| Vloga | Registriran in prijavljen uporabnik, skladno z US4. |
| Vrsta in tehnika | Funkcionalni alternativni scenarij; ekvivalenčni razred veljavnih poizvedb brez zadetkov. Ne gre za neveljaven vnos. |
| Prioriteta | Srednja: uporabnik mora ločiti odsotnost zadetkov od napake iskalnika. |
| Okolje | Skupno testno okolje; namenski uporabniški račun pripravljen zunaj TP-01. |
| Predpogoji | Uporabnik je prijavljen in na domači strani CareerCompass. Obstaja veljaven oglas `TP04 Razvijalec`, povezan s testnim podjetjem. Noben naziv oglasa ne vsebuje niza `TP04BREZZADETKOV`. Ostali filtri so prazni. |
| Podatki | Iskalni niz za naziv delovnega mesta: `TP04BREZZADETKOV`; lokacija prazna; dejavnost Vse dejavnosti. |
| Odvisnosti | Delujoča seja ter lokalna aplikacija in baza. Obstoj vsaj enega kontrolnega oglasa prepreči lažen uspeh zaradi prazne baze. |

**Scenarij testiranja:**

| Korak | Akcija | Pričakovani rezultat |
| --- | --- | --- |
| 1. | Na domači strani v meniju v glavi kliknemo »Zaposlitve«. | Prikaže se podstran »Vsi zaposlitveni oglasi«. |
| 2. | Na seznamu poiščemo pripravljeni oglas »TP04 Razvijalec«; po potrebi uporabimo straničenje. | Kontrolni oglas je prisoten, zato seznam ni prazen že pred iskanjem. |
| 3. | V polje »Vnesi delovno mesto« vpišemo `TP04BREZZADETKOV`. Polje »Vnesi lokacijo« pustimo prazno, pri dejavnosti ohranimo »Vse dejavnosti«. | Filter vsebuje določeni iskalni niz brez dodatnih omejitev. |
| 4. | Kliknemo gumb »Išči« in počakamo, da se iskanje zaključi. | Ni prikazanih kartic oglasov. Prikaže se obvestilo ‘Ni rezultatov.’; ni neskončnega nalaganja ali strežniške napake. |
| 5. | Iz polja za delovno mesto izbrišemo iskalni niz in ponovno kliknemo »Išči«. | Ponovno se prikaže seznam oglasov, ki vključuje »TP04 Razvijalec«; po potrebi ga poiščemo s straničenjem. |

**Merilo uspeha:** veljavna poizvedba brez ujemanja prikaže prazno stanje, nato pa ponastavitev ponovno omogoči prikaz obstoječega oglasa.

**Stanje po izvedbi:** uporabnik je prijavljen, filter je prazen, oglasi niso spremenjeni. 

**Čiščenje:** odjava; odstranitev namenskega kontrolnega oglasa in drugih samo za ta test pripravljenih podatkov oziroma obnova posnetka.

| Evidenca | Vrednost |
| --- | --- |
| Status | Ni izveden |
| Izvajalec / datum | — / — |
| Različica aplikacije, OS, brskalnik in uporabljeni podatki | — |
| Dejanski rezultat | — |
| Dokazi / ID napake | — / — |

### TP-05 – Objava zaposlitvenega oglasa s strani podjetja

| Atribut | Vsebina |
| --- | --- |
| Cilj | Preveriti, da se veljaven oglas objavi pri pravem podjetju in ostane dostopen po ponovnem nalaganju. |
| Povezava z uporabniško zgodbo in funkcionalnostjo | US8 – objavljanje zaposlitvenih oglasov; F15 – objava oglasa s strani podjetja. |
| Vloga | Prijavljeno podjetje. |
| Vrsta in tehnika | Pozitivni funkcionalni sistemski test; veljavni ekvivalenčni razred in preverjanje trajnosti podatkov. |
| Prioriteta | Visoka: objavljanje oglasov je glavna funkcija delodajalcev. |
| Okolje | Skupno testno okolje; namenski račun podjetja pripravljen neodvisno od registracijskih testov. |
| Predpogoji | Račun je povezan s podjetjem `TP05 Podjetje`; izvajalec je prijavljen s tem računom in je na domači strani CareerCompass. Naslov oglasa iz podatkov še ne obstaja. Pred objavo zabeleži število oglasov tega podjetja N. |
| Podatki | Naziv: `TP05 Razvijalec`; opis: `Razvoj in vzdrževanje testne spletne aplikacije.`; način prijave: `Pošljite življenjepis prek kontaktnega obrazca testnega podjetja.`; lokacija: `Maribor`. |
| Odvisnosti | Veljavna seja podjetja in dosegljiva baza. Oglas ne zahteva pošiljanja dejanske prijave na delovno mesto. |

**Scenarij testiranja:**

| Korak | Akcija | Pričakovani rezultat |
| --- | --- | --- |
| 1. | V meniju v glavi strani kliknemo ime prijavljenega podjetja »TP05 Podjetje«. | Prikaže se profil tega podjetja. |
| 2. | Na profilu podjetja kliknemo »Dodaj zaposlitev«. | Prikaže se podstran »Dodaj zaposlitveni oglas« z obrazcem. |
| 3. | V obrazec vnesemo naziv `TP05 Razvijalec`, opis `Razvoj in vzdrževanje testne spletne aplikacije.`, način prijave `Pošljite življenjepis prek kontaktnega obrazca testnega podjetja.` in lokacijo `Maribor`. | Vsa zahtevana polja vsebujejo navedene podatke. |
| 4. | Enkrat kliknemo gumb »Dodaj oglas« in počakamo na zaključek oddaje. | Preusmerjeni smo na profil »TP05 Podjetje«, kjer je novi oglas prikazan natanko enkrat. |
| 5. | Na profilu kliknemo novi oglas »TP05 Razvijalec«. | Prikažejo se podrobnosti oglasa. Naziv, opis, način prijave in lokacija ustrezajo vnosu, povezano podjetje pa je »TP05 Podjetje«. |
| 6. | Prek imena podjetja v glavi strani ponovno odpremo njegov profil in ga osvežimo. Preverimo seznam oglasov. | Novi oglas ostane prikazan natanko enkrat. Število oglasov podjetja je za en večje od začetnega števila N. |

**Merilo uspeha:** veljaven oglas je trajno shranjen s pravilnimi podatki in povezan s prijavljenim podjetjem; pri enkratni oddaji ni dvojnika. Test ne dokazuje zaščite API-ja pred objavo brez prijave.

**Stanje po izvedbi:** en nov testni oglas pri namenskem podjetju. 

**Čiščenje:** skrbnik testnega okolja odstrani ustvarjeni oglas po zabeleženem ID-ju prek testnega API-ja ali baze, preveri povrnitev števila na N in odjavi račun.

| Evidenca | Vrednost |
| --- | --- |
| Status | Ni izveden |
| Izvajalec / datum | — / — |
| Različica aplikacije, OS, brskalnik in uporabljeni podatki | — |
| Dejanski rezultat | — |
| Dokazi / ID napake | — / — |

## 5. Predlog matrike povezav s funkcionalnostmi

Identifikatorji F1, F4, F8 in F15 so ohranjeni iz dopolnilnega seznama funkcionalnosti; US1, US2, US4 in US8 so iz izvirnega dokumenta uporabniških zgodb. TP označuje samostojen testni primer v tem dokumentu.

**Legenda:** P = pozitiven primer; N = negativen primer; M = mejna vrednost; A = alternativni potek brez zadetkov; — = ni neposredno predmet testa. Oznake pomenijo načrtovano pokritost, ne uspešne izvedbe.

| Funkcionalnost in kratka zahteva | Uporabniška zgodba | TP-01 | TP-02 | TP-03 | TP-04 | TP-05 |
| --- | --- | --- | --- | --- | --- | --- |
| F1: Nov uporabnik se registrira in potrdi e-pošto; registracija upošteva minimum dolžine gesla. | US1; minimum dodatno iz kode | P, M | N, M | — | — | — |
| F4: Uporabnik filtrira podjetja po dejavnosti in minimalni oceni. | US2 | — | — | P, M | — | — |
| F8: Registriran uporabnik išče zaposlitve; ob odsotnosti zadetkov dobi razumljiv rezultat. | US4 | — | — | — | A | — |
| F15: Prijavljeno podjetje objavi zaposlitveni oglas, povezan s svojim profilom. | US8 | — | — | — | — | P |

### Zakaj takšna matrika

- Vsaka vrstica pove, kaj naj produkt omogoča, in od kod izhaja zahteva. Stolpci neposredno vodijo do testov z enoličnimi ID-ji.
- Vidna je povezava ena funkcionalnost–več testov: registracijo preverjata tako uspešen kot neuspešen primer. Ni treba umetno izbrati petih različnih funkcionalnosti za pet testov.
- Razlika med P, N, M in A pokaže način preverjanja in razkrije vrzeli. Sama kljukica tega ne bi pokazala.
- Matrika vsebuje samo štiri izbrane funkcionalnosti, kot dopušča naloga. Ne ustvarja vtisa, da pet testov pokriva celoten projekt.
- Pri večjem številu testov se lahko enake povezave vodijo v preglednici; pri petih primerih je Markdown tabela pregledna in zadostna.

### Omejitve pokritosti

US1 ni v celoti preverjena za vse načine registracije; Google registracija ni vključena. Mejna para 5/6 znakov ne predstavljata vseh možnih dolžin ali neveljavnih e-poštnih naslovov. TP-03 ne preverja vseh filtrov, straničenja ali podrobnosti profila iz US2. TP-04 ne preverja vseh pozitivnih iskalnih kombinacij ali prijave na delovno mesto. TP-05 ne preverja negativnih vnosov in pravic dostopa. Podporna prijava v TP-01 ter pripravljena seja v TP-04/TP-05 ne pomenijo celovite pokritosti prijave.

## 6. Pregled rezultata in komentar za nalogo

### Kaj je agent dopolnil pri oblikovanju

Oblikovanih je pet samostojnih testnih primerov: dva za registracijo in po eden za filtriranje podjetij, iskanje zaposlitev brez zadetkov ter objavo oglasa. Vsak vsebuje lastni cilj, predpogoje, podatke, korake in pričakovane rezultate. Povezave so navedene samo do uporabniških zgodb in funkcionalnosti. Dodani so merljivi rezultati, mejne vrednosti, neodvisna priprava, čiščenje ter evidenca izvedbe. Upoštevane so odvisnosti Firebase iz arhitekturnega diagrama.

### Spremembe glede na izvirne testne scenarije in razlogi

- **Ohranjena oblika »Akcija – Pričakovani rezultat«:** podrobni uporabniški koraki so bili prisotni že v vajini dokumentaciji. Prilagojeni so izbranim petim primerom in po potrebi razčlenjeni.
- **Dodani samostojni ID-ji in povezave na uporabniške zgodbe ter funkcionalnosti:** jasno določajo, kaj preverja posamezen primer, brez sklicev na stare testne scenarije.
- **Natančneje opredeljeni testni podatki:** predlagana gesla, podjetja, ocene in oglasi omogočajo ponovljivo izvedbo. Niso obstoječi zapisi iz projekta; minimum šestih znakov za geslo pa izhaja iz pregledane kode.
- **Dopolnjeni predpogoji, vloge in okolje:** določajo potrebno začetno stanje, račune, podatke in storitve.
- **Dopolnjeni pričakovani rezultati in merila uspeha:** natančneje določajo, kateri zadetki morajo biti prikazani, kaj mora biti zavrnjeno in kaj shranjeno.
- **Dodana preverjanja shranjenih podatkov:** preverjajo uporabnost registriranega računa, odsotnost računa po zavrnitvi in ohranitev oglasa po osvežitvi.
- **Dodani negativni in mejni primeri ter iskanje brez zadetkov:** dopolnjujejo uspešne postopke s prekratkim geslom, oceno na meji 4 in praznim rezultatom iskanja.
- **Dodana navodila za neodvisno pripravo in čiščenje:** zmanjšajo vpliv ene izvedbe na drugo; priprava in čiščenje s tem dokumentom še nista izvedena.
- **Dodane prioritete in evidenca izvedbe:** omogočajo načrtovanje in zapis rezultatov. Vsi testi ostajajo označeni kot »Ni izveden«.

### Kaj bi v testnih primerih spremenili sami
Sami bi že od začetka ohranili podroben opis uporabniških korakov iz obstoječe dokumentacije in uporabili manj tehničnih izrazov. Izbrali bi tudi pet različnih funkcionalnosti. Agent je namreč dva primera namenil registraciji, uspešni registraciji in zavrnitvi zaradi prekratkega gesla. Ta izbira je sicer vredu, ampak bi vseeno zaradi širše pokritosti enega zamenjali z drugo funkcionalnostjo npr. s testom ocenjevanja podjetja

## 7. Uporaba generativne umetne inteligence

Za pregled podlag, oblikovanje petih testnih primerov, konsolidiranega ukaza in matrike ter pripravo tega Markdown dokumenta je bil uporabljen **OpenAI Codex, agent v namizni aplikaciji**. Agent je prebral lokalno dokumentacijo, vizualno pregledal oba diagrama in preveril izbrane podrobnosti v kodi. Za to nalogo ni izvajal novih funkcionalnih testov in ni uporabil drugih agentov.
