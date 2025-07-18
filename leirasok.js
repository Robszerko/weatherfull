**`leirasok.js`**
```javascript
const WEATHER_DESCRIPTIONS = {
    heatIndex: {
        // Hőérzet leírások
        extremeHeat: { // 35°C felett
            day: [
                "A beton is ontja a forróságot, veszélyes hőség!", "Extrém forróság, maradj hűvös helyen, ha teheted!",
                "Kerüld a fizikai munkát a szabadban, a hőguta veszélye magas.", "Hőségriadó-gyanús ebédidő. Folyadékpótlás kötelező!",
                "Sivatagi körülmények uralkodnak a városban.", "A naptej és a kalap ma nem opció, hanem kötelező.",
                "Még az árnyék is csak 35 fokos.", "Padlógázon mennek a klímák a városban."
            ],
            evening: [
                "Fülledt, trópusi este. Nehéz lesz szellőztetni.", "Még napnyugta után is tikkasztó a meleg, nehéz éjszaka lesz.",
                "A lakás sem hűl le, csak a klíma segít.", "A forró nap után az este sem hoz enyhülést."
            ],
            night: [
                "Nehéz aludni ebben a trópusi melegben.", "Áll a levegő, a takaró most nem barát.",
                "Még éjjel sem frissül fel a levegő.", "Forgolódós, izzadós éjszaka várható."
            ]
        },
        hot: { // 30-35°C
            cloudy: ["A felhők sem enyhítenek a fülledt kánikulán.", "Nyomasztó, páradús hőség a felhők alatt.", "A vastag felhőréteg alatt megrekedt a forróság."],
            sunny: [
                "Igazi kánikula ebédidőben.", "Erősen meleg, izzasztó idő.", "A nap erősen tűz, igazi strand-idő van.",
                "Ne hagyd a vizet otthon, szomjas napunk lesz!", "Az aszfalt szinte vibrál a hőségtől.",
                "A legjobb program egy hűsítő ital a teraszon."
            ],
            evening: [
                "Forró nyári este, ideális egy hideg fröccshöz.", "Meleg, fülledt idő a vacsorához.",
                "A nap lement, de a meleg maradt.", "Jól esik mezítláb sétálni a hűvösebb kövön."
            ],
            night: [
                "Meleg, fülledt éjszaka.", "Nehéz lesz takaróval aludni.", "Áll a levegő, és még meleg is van.",
                "A nyitott ablakon is csak meleg levegő áramlik be."
            ]
        },
        warm: { // 25-30°C
            cloudy: ["A felhők ellenére is kellemesen meleg az idő.", "Pont jó kirándulóidő, nem kell a naptól tartani."],
            sunny: [
                "Kellemesen meleg, igazi nyár.", "Tökéletes idő egy könnyű ebédhez a szabadban.", "Ebédidőben kellemes a levegő a teraszon.",
                "Igazi nyár, élvezd ki a napsütést!", "Fagyiért kiáltó délután.", "Bátran lehet kint a szabadban, tökéletes az idő."
            ],
            morning: ["Kellemes reggeli meleg.", "Ideális idő a reggeli teendőkhöz.", "Pólóban indulhat a nap."],
            evening: [
                "Pompás nyáresti hangulat.", "Jólesik kint ülni vacsora után.", "Ideális egy esti sétához a központban.",
                "Egy vékony kardigán is elég lesz késő estére."
            ]
        },
        mild: { // 18-25°C
            cloudy: ["A felhős ég kellemes hőmérséklettel párosul.", "Nincs napégés-veszély, de a pulóver sem kell.", "A szürkeség ellenére kellemes a hőmérséklet."],
            sunny: [
                "Enyhe, kellemes tavaszias idő.", "Pont jó, se túl meleg, se túl hideg.", "Energiával tölt fel a kellemes napsütés.",
                "Szuper idő egy városi sétához vagy egy parki ebédhez."
            ],
            morning: ["Friss, de kellemes reggel.", "Jól indul a nap ilyen időben.", "Kabát nélkül is el lehet indulni."],
            evening: ["Kellemes hőmérsékletű este.", "Egy vékony kardigán jól jöhet.", "Frissítő esti levegő, jólesik kiszellőztetni."]
        },
        cool: { // 10-18°C
            sunrise: ["A napfelkelte még hűvös, de ígéretes.", "Csípős a hajnal, de a nap hamarosan melegít."],
            day: ["Kellemesen friss, tiszta levegő.", "Egy vékony pulóver pont jó.", "Aktív mozgáshoz, sportoláshoz ideális."],
            sunset: ["Napnyugtával gyorsan hűl a levegő.", "Kezd estére fordulni az idő, érdemes felvenni valamit."],
            evening: ["Kezd hűvösre fordulni az este.", "Jólesik behúzódni a meleg szobába.", "Érdemes bezárni az ablakot éjszakára."]
        },
        cold: { // 0-10°C
            windy: ["A metsző szél miatt a hideg a csontig hatol.", "A szél fütyül, és magával hozza a fagyos hideget.", "A szél még hidegebbnek érezteti az amúgy is zord időt."],
            day: ["Hűvös, kabátos idő.", "Beköszöntött az ősz.", "A nap fénye csak dísz, nem melegít.", "A fák színes leveleihez illő idő."],
            morning: ["Hűvös reggel, elkél a sál és sapka.", "Csípős a reggeli levegő, jól jön egy forró kávé."],
            night: ["Hideg éjszaka várható.", "Jobb a meleg szobában maradni.", "Bekapcsol a fűtés, ha eddig nem tette."]
        },
        veryCold: { // 0°C alatt
            morning: ["Fagyos reggel, indul a jégkaparás.", "Jól be kell öltözni a reggeli induláshoz.", "A forró tea most életet ment."],
            day: ["Nagyon hideg, csípős időjárás.", "Öltözz fel vastagon, rétegesen!", "Áll a levegő, harapni lehet a hideget."],
            night: ["Fagyos, metsző éjszaka.", "A forró tea most aranyat ér.", "Reggelre dér vagy zúzmara lehet."]
        },
        misc: {
            windChill: ["A szél miatt jóval hűvösebbnek érződik.", "A szél belefúj a kabát alá.", "Csontig hatoló, kellemetlen szél."],
            slightlyCooler: ["Csípősebbnek érződik a mértnél.", "Frissítően hűvösnek hat a levegő."],
            muggy: ["Fülledt, ragacsos idő.", "Mintha egy üvegházban lennénk.", "Szauna-hatás a szabadban."],
            warmer: ["Melegebbnek hat a levegő.", "Párás, fülledt érzet."],
            neutral: ["A hőmérő ma nem hazudik.", "Nincs nagy meglepetés.", "A valóságnak megfelelő érzet."]
        }
    },
    wind: {
        // Szél leírások
        storm: ["Viharos szél tépi a fákat.", "A viharral erős szél érkezett.", "Jobb fedél alatt maradni."],
        calm: [
            "Szélcsend", "Mozdulatlan levegő", "Rezdületlen falevelek", "Teljesen nyugodt a légkör.", "Áll a levegő.",
            "Tükörsima a Sóstó vize.", "Egy gyufaláng sem rezdülne meg.", "A füst egyenesen száll felfelé."
        ],
        calmWithGusts: ["Alapvetően szélcsendes, de lökéses.", "Szinte semmi, aztán hirtelen egy lökés.", "Változékony, gyenge szellő."],
        light: {
            day: ["Gyenge fuvallat", "Lágy szellő", "Finoman rezdülő lombok", "Alig érezhető a légmozgás.", "A forróságot kellemesen enyhíti."],
            night: ["Enyhe éjszakai szellő", "Halk susogás a fák között", "Alig érezhető hűs fuvallat.", "Épp csak megmozgatja a függönyt."]
        },
        moderate: {
            day: ["Könnyű szellő", "Frissítő légmozgás", "Kellemesen lengedező", "Ideális a szabadban lenni.", "Pont jó a sárkányeregetéshez."],
            night: ["Mérsékelt esti szellő", "Frissítő éjszakai légáramlat", "Pont jó egy esti szellőztetéshez."]
        },
        fresh: ["Mérsékelt szél", "Érezhetően fúj", "Lengenek az ágak", "Kócolja a hajat.", "A papírokat már viszi."],
        strong: ["Élénk szél", "Markáns, frissítő", "Folyamatosan mozognak a fák.", "Erősödő légmozgás.", "A kabátot már szorosan fogja."],
        veryStrong: ["Erős szél", "Nehezíti a gyaloglást", "Zúgnak a fák", "Barátságtalan, erős szél.", "Zörgeti a cserepeket."],
        gale: ["Nagyon erős szél", "Viharos közeli", "Ágakat törhet le", "Jobb óvatosnak lenni kint!", "A szemeteskukákat borogatja."],
        stormy: ["Viharos erejű", "Veszélyes szél!", "Károkat okozó légmozgás", "Maradj inkább bent!"]
    },
    windGust: {
        // Széllökés leírások
        storm: ["Viharos, pusztító lökések.", "A viharral veszélyes lökések járnak.", "Kapaszkodj, erős lökés jön!"],
        calm: ["Egyenletes", "Nincsenek kiugró lökések", "Lényegében lökésmentes", "Nyugodt a légmozgás.", "Nem pöffeszkedik a szél."],
        light: ["Jelentéktelen lökések", "Alig érezhető lökések", "Néha meg-meglibben valami."],
        moderate: {
            day: ["Mérsékelt lökések", "Hirtelen megélénkül", "Vigyázni kell a papírokkal!", "Néha hirtelen feltámad."],
            night: ["Éjszakai lökések", "Néha hirtelen feltámad", "Hallani, ahogy megcsapja a ház falát."]
        },
        fresh: {
            day: ["Élénk lökések", "Vigyázz a kalapodra!", "Hirtelen, erős széllökések.", "Meg-megingatja az embert."],
            night: ["Erős éjszakai lökések", "Zörgeti a redőnyt", "Fel lehet rá ébredni.", "Fütyül a szél a kéményben."]
        },
        strong: ["Erős, viharos lökések", "Megingatja az embert", "Zörögnek a cserepek.", "Csendesebb időszakokat hirtelen pöffek törnek meg."],
        veryStrong: ["Nagyon erős, viharos lökések", "Biztonságosabb fedél alatt", "Gallyakat törhet le."],
        gale: ["Orkán erejű lökések", "Veszélyes!", "Pusztító erejű lökések."]
    }
};
```

---

### 2. Lépés: Töltsd fel a `leirasok.js`-t a GitHub repozitóriumodba

Ezt a lépést már ismered. Töltsd fel a fájlt, majd a **Raw** gombra kattintva szerezd meg a közvetlen linket.

---

### 3. Lépés: Módosítsd a HTML fájlt

Cseréld le a **teljes HTML fájlod tartalmát** az alábbira. Ez már tartalmazza a külső script behívását és a frissített függvényeket.

**Fontos:** Ne felejtsd el a `src="https://..."` linket kicserélni a **saját GitHub-os linkedre!**

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Időjárás Monitor - Nyíregyháza</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- CSERÉLD LE A 'felhasznaloneved/repo-neved' RÉSZT A SAJÁTODRA! -->
    <script src="https://cdn.jsdelivr.net/gh/felhasznaloneved/repo-neved/leirasok.js"></script> 
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.8.0/suncalc.min.js"></script>
    <style>
        :root {
            /* Színpaletta Alapok */
            --accent-interactive-night: #00BFFF;
            --text-primary-night: #EAEAEA;
            --text-secondary-night: #A0B0C0;
            --bg-widget-night: rgba(15, 23, 42, 0.88);
            --border-widget-night: rgba(56, 189, 248, 0.2);
            
            --accent-interactive-day: #007AFF;
            --text-primary-day: #111827;
            --text-secondary-day: #4B5563;
            --bg-widget-day: linear-gradient(160deg, rgba(240, 248, 255, 0.92) 0%, rgba(225, 238, 252, 0.90) 100%);
            --border-widget-day: rgba(0, 122, 255, 0.18);
            
            /* Hőmérsékletfüggő színek */
            --hot: #EF4444;
            --warm: #F97316;
            --mild: #22C55E;
            --cool: #3B82F6;
            --cold: #6366F1;
            --current-temp-bg-color: var(--mild);
            
            /* Levegőminőség színek */
            --level-good: #22C55E;
            --level-moderate: #FBBF24;
            --level-unhealthy-sensitive: #F97316;
            --level-unhealthy: #EF4444;
            --level-very-unhealthy: #A21CAF;
            --level-hazardous: #7E22CE;
            
            /* Eső állapot színek */
            --raining-text-color-day: #0369a1;
            --raining-text-color-night: #93c5fd;

            /* 12 FÁZISÚ CIKLUS DEFINÍCIÓJA */
            --sky-color-top-night: #0B1120; --sky-color-bottom-night: #020617; --sky-color-top-early-dawn: #020617; --sky-color-bottom-early-dawn: #0f172a; --sky-color-top-blue-hour-dawn: #0f172a; --sky-color-bottom-blue-hour-dawn: #1e3a8a; --sky-color-top-dawn: #1e293b; --sky-color-bottom-dawn: #f97316; --sky-color-top-sunrise: #fef3c7; --sky-color-bottom-sunrise: #fb923c; --sky-color-top-golden-hour-rise: #fde68a; --sky-color-bottom-golden-hour-rise: #fca5a5; --sky-color-top-day: #7DD3FC; --sky-color-bottom-day: #C4EFFF; --sky-color-top-golden-hour-set: #fbbf24; --sky-color-bottom-golden-hour-set: #f87171; --sky-color-top-sunset: #f97316; --sky-color-bottom-sunset: #dc2626; --sky-color-top-dusk: #0369a1; --sky-color-bottom-dusk: #4c1d95; --sky-color-top-blue-hour-dusk: #1e3a8a; --sky-color-bottom-blue-hour-dusk: #312e81; --sky-color-top-late-dusk: #111827; --sky-color-bottom-late-dusk: #0c0a09;

            /* Aktuális Téma (kezdetben éjszakai) */
            --current-sky-color-top: var(--sky-color-top-night); --current-sky-color-bottom: var(--sky-color-bottom-night); --current-text-color: var(--text-primary-night); --current-text-muted-color: var(--text-secondary-night); --current-icon-color: var(--accent-interactive-night); --current-widget-bg: var(--bg-widget-night); --current-widget-border: var(--border-widget-night); --current-container-border-color: var(--border-widget-night); --current-raining-text-color: var(--raining-text-color-night);
            
            --moon-phase-offset: 100%;
        }

        body[data-theme="day"] { --current-sky-color-top: var(--sky-color-top-day); --current-sky-color-bottom: var(--sky-color-bottom-day); --current-text-color: var(--text-primary-day); --current-text-muted-color: var(--text-secondary-day); --current-icon-color: var(--accent-interactive-day); --current-widget-bg: var(--bg-widget-day); --current-widget-border: var(--border-widget-day); --current-container-border-color: rgba(203, 213, 225, 0.55); --current-raining-text-color: var(--raining-text-color-day); }
        body[data-theme="dawn"] { --current-sky-color-top: var(--sky-color-top-dawn); --current-sky-color-bottom: var(--sky-color-bottom-dawn); --current-text-color: var(--text-primary-night); --current-text-muted-color: var(--text-secondary-night); --current-icon-color: #f59e0b; --current-widget-bg: var(--bg-widget-night); --current-widget-border: rgba(245, 158, 11, 0.3); --current-container-border-color: rgba(71, 85, 105, 0.5); --current-raining-text-color: var(--raining-text-color-night); }
        body[data-theme="dusk"] { --current-sky-color-top: var(--sky-color-top-dusk); --current-sky-color-bottom: var(--sky-color-bottom-dusk); --current-text-color: var(--text-primary-night); --current-text-muted-color: var(--text-secondary-night); --current-icon-color: #f472b6; --current-widget-bg: var(--bg-widget-night); --current-widget-border: rgba(236, 72, 153, 0.3); --current-container-border-color: rgba(71, 85, 105, 0.5); --current-raining-text-color: var(--raining-text-color-night); }
        body[data-theme="early_dawn"] { --current-sky-color-top: var(--sky-color-top-early-dawn); --current-sky-color-bottom: var(--sky-color-bottom-early-dawn); --current-text-color: var(--text-primary-night); --current-text-muted-color: #94a3b8; --current-icon-color: #60a5fa; --current-widget-bg: var(--bg-widget-night); --current-widget-border: rgba(96, 165, 250, 0.2); --current-container-border-color: rgba(51, 65, 85, 0.5); --current-raining-text-color: var(--raining-text-color-night); }
        body[data-theme="blue_hour_dawn"] { --current-sky-color-top: var(--sky-color-top-blue-hour-dawn); --current-sky-color-bottom: var(--sky-color-bottom-blue-hour-dawn); --current-text-color: var(--text-primary-night); --current-text-muted-color: var(--text-secondary-night); --current-icon-color: #93c5fd; --current-widget-bg: var(--bg-widget-night); --current-widget-border: rgba(147, 197, 253, 0.2); --current-container-border-color: rgba(71, 85, 105, 0.5); --current-raining-text-color: var(--raining-text-color-night); }
        body[data-theme="sunrise"] { --current-sky-color-top: var(--sky-color-top-sunrise); --current-sky-color-bottom: var(--sky-color-bottom-sunrise); --current-text-color: #422006; --current-text-muted-color: #7c2d12; --current-icon-color: #f97316; --current-widget-bg: linear-gradient(160deg, rgba(254, 243, 199, 0.92) 0%, rgba(253, 186, 116, 0.90) 100%); --current-widget-border: rgba(249, 115, 22, 0.25); --current-container-border-color: rgba(124, 45, 18, 0.4); --current-raining-text-color: #422006; }
        body[data-theme="golden_hour_rise"] { --current-sky-color-top: var(--sky-color-top-golden-hour-rise); --current-sky-color-bottom: var(--sky-color-bottom-golden-hour-rise); --current-text-color: #44403c; --current-text-muted-color: #78716c; --current-icon-color: #f59e0b; --current-widget-bg: linear-gradient(160deg, rgba(254, 249, 231, 0.92) 0%, rgba(253, 224, 224, 0.90) 100%); --current-widget-border: rgba(245, 158, 11, 0.2); --current-container-border-color: rgba(168, 162, 158, 0.5); --current-raining-text-color: #44403c; }
        body[data-theme="golden_hour_set"] { --current-sky-color-top: var(--sky-color-top-golden-hour-set); --current-sky-color-bottom: var(--sky-color-bottom-golden-hour-set); --current-text-color: #44403c; --current-text-muted-color: #78716c; --current-icon-color: #ea580c; --current-widget-bg: linear-gradient(160deg, rgba(254, 235, 202, 0.92) 0%, rgba(254, 202, 202, 0.90) 100%); --current-widget-border: rgba(249, 115, 22, 0.2); --current-container-border-color: rgba(168, 162, 158, 0.5); --current-raining-text-color: #44403c; }
        body[data-theme="sunset"] { --current-sky-color-top: var(--sky-color-top-sunset); --current-sky-color-bottom: var(--sky-color-bottom-sunset); --current-text-color: #fef2f2; --current-text-muted-color: #fecaca; --current-icon-color: #ef4444; --current-widget-bg: linear-gradient(160deg, rgba(127, 29, 29, 0.9) 0%, rgba(76, 29, 29, 0.92) 100%); --current-widget-border: rgba(239, 68, 68, 0.25); --current-container-border-color: rgba(159, 18, 57, 0.4); --current-raining-text-color: #fef2f2; }
        body[data-theme="blue_hour_dusk"] { --current-sky-color-top: var(--sky-color-top-blue-hour-dusk); --current-sky-color-bottom: var(--sky-color-bottom-blue-hour-dusk); --current-text-color: var(--text-primary-night); --current-text-muted-color: var(--text-secondary-night); --current-icon-color: #a78bfa; --current-widget-bg: var(--bg-widget-night); --current-widget-border: rgba(167, 139, 250, 0.2); --current-container-border-color: rgba(71, 85, 105, 0.5); --current-raining-text-color: var(--raining-text-color-night); }
        body[data-theme="late_dusk"] { --current-sky-color-top: var(--sky-color-top-late-dusk); --current-sky-color-bottom: var(--sky-color-bottom-late-dusk); --current-text-color: #d1d5db; --current-text-muted-color: #9ca3af; --current-icon-color: #818cf8; --current-widget-bg: var(--bg-widget-night); --current-widget-border: rgba(99, 102, 241, 0.2); --current-container-border-color: rgba(55, 65, 81, 0.5); --current-raining-text-color: var(--raining-text-color-night); }
        
        .is-hidden { display: none !important; }
        body { font-family: 'Inter', sans-serif; font-weight: 500; background-color: #020617; min-height: 100vh; margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 20px; box-sizing: border-box; position: relative; overflow-x: hidden; transition: background-color 1.5s ease-in-out; }
        .sky-gradient-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, var(--current-sky-color-top), var(--current-sky-color-bottom)); transition: background 2s ease-in-out; z-index: -1; }
        .weather-widget { border-radius: 18px; padding: 22px 24px; width: 100%; max-width: 800px; box-sizing: border-box; margin: 0 auto; position: relative; z-index: 10; background: var(--current-widget-bg); border: 1px solid var(--current-widget-border); box-shadow: 0 5px 18px rgba(0,0,0,0.12), 0 2px 7px rgba(0,0,0,0.18); backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%); transition: all 0.6s ease-in-out; }
        #weather-display { position: relative; z-index: 1; display: flex; flex-direction: column; }
        .widget-header { text-align: center; margin-bottom: 10px; padding-bottom: 8px; }
        .copyright-notice { font-size: 10px; font-weight: 500; color: var(--current-text-muted-color); text-align: center; opacity: 0.85; letter-spacing: 0.2px; margin-top: 10px; transition: color 0.6s; }
        .header-container { display: inline-block; background-color: rgba(0, 0, 0, 0.1); padding: 8px 24px; border-radius: 12px; margin-bottom: 4px; box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2); transition: all 0.6s; }
        .location-title { font-size: 22px; font-weight: 800; color: var(--current-text-color); line-height: 1.1; letter-spacing: -0.5px; }
        .station-subtitle { font-size: 13px; font-weight: 500; color: var(--current-text-muted-color); line-height: 1.2; margin-top: 2px; }
        .timestamp-container { display: flex; justify-content: center; align-items: center; gap: 8px; }
        .timestamp { font-size: 12.5px; font-weight: 500; color: var(--current-text-muted-color); transition: color 0.6s; }
        .info-tooltip-container { position: relative; cursor: help; color: var(--current-text-muted-color); line-height: 1; }
        .info-tooltip-container .fa-info-circle { transition: color 0.3s; }
        .info-tooltip-container:hover .fa-info-circle { color: var(--current-icon-color); }
        .info-tooltip-content { visibility: hidden; opacity: 0; position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%); width: max-content; max-width: 450px; background-color: #f9fafb; color: #1f2937; text-align: left; border-radius: 8px; padding: 12px 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: opacity 0.3s, visibility 0.3s; font-size: 12px; line-height: 1.6; z-index: 1000; }
        .info-tooltip-content::after { content: ""; position: absolute; bottom: 100%; left: 50%; margin-left: -6px; border-width: 6px; border-style: solid; border-color: transparent transparent #f9fafb transparent; }
        .info-tooltip-container:hover .info-tooltip-content { visibility: visible; opacity: 1; }
        .info-tooltip-content strong { display: block; margin-bottom: 4px; color: #000; font-weight: 700; }
        .info-tooltip-content p, .info-tooltip-content ul { margin: 0 0 10px 0; padding-left: 0; }
        .info-tooltip-content ul { list-style-position: inside; padding-left: 4px; }
        .info-tooltip-content li { margin-bottom: 2px; }
        .info-tooltip-content p:last-child { margin-bottom: 0; }
        .station-status-container { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; text-align: center; padding: 10px 0; border-top: 1px solid var(--current-container-border-color); border-bottom: 1px solid var(--current-container-border-color); transition: border-color 0.6s; margin-top: 10px; }
        .station-selector { flex: 1; }
        .station-selector label { cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--current-text-color); font-weight: 500; transition: color 0.6s; }
        .station-selector input[type="radio"] { margin: 0 0 4px 0; accent-color: var(--current-icon-color); }
        .station-selector.disabled label { opacity: 0.55; cursor: not-allowed; }
        .station-name { font-size: 12px; font-weight: 600; line-height: 1; }
        .station-status-text { color: var(--current-text-muted-color); font-weight: 400; font-size: 10px; line-height: 1; transition: color 0.6s; margin-top: 2px; }
        
        .top-info-cards-container { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px; margin-bottom: 16px; align-items: stretch; }
        .info-card { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; color: var(--current-text-color); font-family: 'Inter', sans-serif; text-align: center; background: var(--current-widget-bg); border: 1px solid var(--current-widget-border); transition: all 0.6s ease; border-radius: 12px; }
        .temp-card { flex: 1 1 140px; background: linear-gradient(145deg, var(--current-temp-bg-color), color-mix(in srgb, var(--current-temp-bg-color) 70%, black)) !important; color: white; text-shadow: 0 2px 5px rgba(0,0,0,0.5); }
        
        .temp-card .card-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; transition: background-color 0.5s; }
        .status-dot.fresh { background-color: #4ade80; box-shadow: 0 0 5px #4ade80; }
        .status-dot.stale { background-color: #facc15; }
        .status-dot.offline { background-color: #f87171; }
        .live-tag { font-size: 9px; background-color: rgba(255, 255, 255, 0.15); color: #e5e7eb; padding: 2px 6px; border-radius: 6px; font-weight: 700; letter-spacing: 0.5px; }
        .temp-card .card-main-value { font-size: 40px; font-weight: 800; line-height: 1; }
        .temp-trend-arrow { font-size: 0.5em; vertical-align: middle; margin-left: 2px; font-weight: 600; width: 12px; display: inline-block; }
        .precip-icon { font-size: 0.4em; vertical-align: middle; margin-left: 4px; opacity: 0.8; }

        .sensation-card { flex: 3 1 300px; padding: 12px; align-items: stretch; }
        .sensation-list { display: flex; flex-direction: column; justify-content: space-around; gap: 12px; width: 100%; height: 100%; }
        .sensation-item { display: flex; align-items: center; gap: 12px; text-align: left; }
        .sensation-item .icon { font-size: 1.2em; color: var(--current-icon-color); width: 20px; text-align: center; }
        .sensation-item .text-content { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; flex-grow: 1; }
        .sensation-item .label { font-size: 13px; font-weight: 600; color: var(--current-text-color); margin-right: 4px; }
        .sensation-item .value { font-size: 14px; font-weight: 500; color: var(--current-text-muted-color); }
        .sensation-item .description { font-size: 13px; font-weight: 700; color: var(--current-text-muted-color); }

        .precipitation-forecast-info { margin: 12px auto 0 auto; padding: 10px 16px; background-color: rgba(0, 0, 0, 0.15); border-radius: 10px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.2); transition: all 0.6s; text-align: center; max-width: 450px; }
        #next-precipitation-info-text { color: var(--current-text-color); transition: color 0.6s; font-size: 13.5px; font-weight: 500; }
        #next-precipitation-info-text strong { font-weight: 700; color: var(--current-text-color); }
        #next-precipitation-details-text { color: var(--current-text-muted-color); font-size: 11.5px; font-weight: 500; margin-top: 4px; transition: color 0.6s; font-style: italic; line-height: 1.5; }
        #next-precipitation-details-text strong { font-weight: 600; color: var(--current-text-color); }

        .sun-info-section, .moon-info-section, .night-sky-info-section, .air-quality-info-section { display: flex; align-items: flex-start; justify-content: center; gap: 20px; min-height: 180px; width: 100%; flex-wrap: wrap; margin-top: 12px; }
        .sun-text-details, .moon-text-details, .rain-text-details, .night-sky-text-details { text-align: left; display: flex; flex-direction: column; gap: 6px; font-size: 12px; flex-grow: 1; min-width: 0; flex-basis: 130px; transition: opacity 0.5s ease-in-out; }
        #iss-info .night-sky-text-details { min-width: 250px; flex-basis: 250px; }
        .sun-detail-item, .moon-detail-item, .rain-detail-item, .night-sky-detail-item { display: flex; justify-content: space-between; align-items: baseline; padding: 6px 8px; border-radius: 8px; border-bottom: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); background-color: rgba(0, 0, 0, 0.08); }
        
        .rain-detail-item:hover, .night-sky-detail-item:hover { background-color: rgba(255, 255, 255, 0.07); transform: translateY(-2px) scale(1.02); }
        .sun-detail-item, .moon-detail-item { transition: background-color 0.25s; }
        .sun-detail-item:hover, .moon-detail-item:hover { background-color: rgba(255, 255, 255, 0.07); transform: none; }

        .sun-detail-label, .moon-detail-label, .rain-detail-label, .night-sky-detail-label { display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 11px; color: var(--current-text-muted-color); text-transform: uppercase; letter-spacing: 0.3px; transition: color 0.6s; flex-shrink: 0; }
        .sun-detail-label i, .moon-detail-label i, .rain-detail-label i, .night-sky-detail-label i { width: 13px; text-align: center; font-size: 1em; color: var(--current-icon-color); opacity: 0.7; transition: color 0.6s, opacity 0.6s; }
        .sun-detail-value, .moon-detail-value, .rain-detail-value, .night-sky-detail-value { font-weight: 700; font-size: 14px; color: var(--current-text-color); transition: color 0.6s; display: flex; align-items: center; text-align: right; flex-grow: 1; justify-content: flex-end; white-space: normal; word-break: break-word; line-height: 1.25; }
        .night-sky-detail-value.long-text { font-size: 10.5px; white-space: normal; line-height: 1.3; text-align: left; justify-content: flex-start; }
        .sun-trend-text, .moon-trend-text { font-size: 0.75em; font-weight: 500; opacity: 0.7; margin-left: 4px; }
        .path-refresh-btn { font-size: 0.75em; margin-left: 6px; cursor: pointer; opacity: 0.6; transition: opacity 0.3s, color 0.3s, transform 0.3s; }
        .path-refresh-btn:hover { opacity: 1; color: var(--current-icon-color); }
        .path-refresh-btn.is-refreshing { transform: rotate(360deg); transition: transform 0.8s; }
        
        .regional-precip-section { margin: 20px auto 0; padding: 16px; background: var(--current-widget-bg); border: 1px solid var(--current-widget-border); border-radius: 12px; width: 100%; max-width: 600px; box-sizing: border-box; }
        .regional-precip-section h3 { font-size: 15px; color: var(--current-text-color); margin-top: 0; margin-bottom: 12px; text-align: center; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .regional-precip-grid { display: flex; flex-direction: column; gap: 8px; }
        .precip-station-item { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; padding: 8px 12px; background-color: rgba(0,0,0,0.12); border-radius: 8px; transition: all 0.3s; border-left: 3px solid transparent; }
        .precip-station-item .station-name { font-size: 14px; font-weight: 700; color: var(--current-text-color); margin-right: 15px; }
        .precip-station-item.is-raining-highlight { background-color: rgba(from var(--current-icon-color) r g b / 0.15); border-left-color: var(--current-icon-color); box-shadow: inset 3px 0 8px -4px rgba(from var(--current-icon-color) r g b / 0.5); }
        .precip-station-item .station-data-wrapper { display: flex; align-items: baseline; gap: 12px; flex-shrink: 0; }
        .precip-station-item .station-data.intensity { font-size: 14px; font-weight: 600; color: var(--current-text-muted-color); transition: color 0.3s, text-shadow 0.3s; }
        .precip-station-item .station-data.intensity.is-raining { color: var(--current-raining-text-color); text-shadow: 0 0 5px rgba(from var(--current-raining-text-color) r g b / 0.5); }
        .precip-station-item .station-data.total { font-size: 12px; font-weight: 500; color: var(--current-text-muted-color); opacity: 0.9; }
        .precip-station-item .station-data.total strong { font-weight: 600; color: var(--current-text-color); }

        .celestial-path-visual-v2 { width: 280px; height: 165px; position: relative; display: flex; justify-content: center; align-items: center; flex-shrink: 0; transition: all 0.5s ease-in-out; }
        .celestial-path-svg-v2 { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; transition: opacity 0.5s; }
        .path-arc-bg-v2, .path-arc-main-v2 { fill: none; stroke-linecap: round; }
        .path-arc-bg-v2 { stroke-width: 2px; stroke: var(--current-text-muted-color); stroke-dasharray: 2 4; opacity: 0.35; }
        .path-arc-main-v2 { stroke-width: 3px; }
        .path-ground-v2 { position: absolute; bottom: 0; left: 0; width: 100%; height: 40px; background: linear-gradient(to top, rgba(0,0,0,0.1), transparent); border-top: 1.5px solid var(--current-container-border-color); z-index: 5; transition: all 0.6s ease; }
        .path-label-v2 { position: absolute; bottom: 5px; font-size: 10px; font-weight: 500; color: var(--current-text-muted-color); display: flex; flex-direction: column; align-items: center; }
        .path-label-v2.sunrise-label { left: 10px; }
        .path-label-v2.sunset-label { right: 10px; }
        .path-label-v2 .path-time-v2 { font-weight: 700; font-size: 12px; color: var(--current-text-color); }
        .celestial-body-icon-v2 { position: absolute; top: 0; left: 0; z-index: 15; pointer-events: auto; cursor: help; font-size: 0; color: transparent; will-change: transform, background-color, box-shadow, color, text-shadow; transition: background-color 0.5s, box-shadow 0.5s, color 0.5s, text-shadow 0.5s, opacity 0.5s; }
        #sun-path-icon-v2 { width: 22px; height: 22px; background-color: #FFD700; border-radius: 50%; box-shadow: 0 0 10px 3px gold, 0 0 18px 6px rgba(255, 215, 0, 0.45), inset 0 0 4px rgba(255, 255, 220, 0.6); }
        
        #moon-path-icon-v2 {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            background-color: #E0E5E9;
            box-shadow: 0 0 7px rgba(200, 200, 255, 0.6), 0 0 13px rgba(150, 150, 220, 0.4);
            transition: all 0.5s ease-in-out;
        }
        #moon-path-icon-v2::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://i.ibb.co/T1d1kH6/moon-texture.png');
            background-size: cover;
            background-blend-mode: luminosity;
            opacity: 0.8;
        }
        #moon-path-icon-v2::after {
            content: '';
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #111827;
        }
        #moon-path-icon-v2.is-waning::after { 
            left: auto;
            right: 0;
            transform: translateX(var(--moon-phase-offset, 100%)); 
        }
        #moon-path-icon-v2:not(.is-waning)::after { 
            left: 0;
            right: auto;
            transform: translateX(calc(var(--moon-phase-offset, 100%) * -1)); 
        }


        .celestial-path-visual-v2.is-event-active .celestial-path-svg-v2, .celestial-path-visual-v2.is-event-active .path-label-v2 { opacity: 0.3; pointer-events: none; }
        .celestial-path-visual-v2.is-event-active .path-ground-v2 { border-top-width: 2px; opacity: 0.8; }
        .celestial-event-container-v2 { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; opacity: 0; transition: opacity 0.5s ease; pointer-events: none; z-index: 20; }
        .celestial-path-visual-v2.is-event-active .celestial-event-container-v2 { opacity: 1; pointer-events: auto; }
        .celestial-event-message-v2 { font-size: 13px; font-weight: 500; color: var(--current-text-muted-color); line-height: 1.3; }
        .celestial-event-countdown-v2 { font-size: 18px; font-weight: 700; color: var(--current-text-color); margin-top: 4px; }
        .night-sky-info-section { transition: opacity 0.4s ease-in-out; }
        .night-sky-info-section.is-fading { opacity: 0; }
        .night-sky-visual { text-align: center; }
        .night-sky-visual i { font-size: 48px; margin-bottom: 8px; color: var(--current-text-muted-color); transition: color 0.6s; }
        #planet-info .night-sky-visual i.fa-ring { color: #E3D4A8; text-shadow: 0 0 10px #E3D4A8; }
        #planet-info .night-sky-visual i.fa-circle { text-shadow: 0 0 10px #E27B58; color: #E27B58; }
        #planet-info .night-sky-visual i.fa-globe-europe { color: #d8b89d; text-shadow: 0 0 10px #d8b89d; }
        #planet-info .night-sky-visual i.fa-dot-circle { color: #a7b3c2; text-shadow: 0 0 12px #cdd8e6; }
        #planet-info .night-sky-visual i.fa-meteor { color: #facc15; text-shadow: 0 0 12px #fef08a; }
        #planet-info .night-sky-visual i.fa-star { color: #fefce8; text-shadow: 0 0 12px #fef9c3; }
        #iss-info .night-sky-visual i.fa-satellite { color: #B0B0B0; text-shadow: 0 0 8px #FFFFFF;}
        #constellation-svg-container { width: 100px; height: 80px; margin: 0 auto; }
        #constellation-svg-container svg { width: 100%; height: 100%; }
        #constellation-svg-container .star { fill: var(--text-secondary-night); }
        #constellation-svg-container .star.bright { fill: #ffffff; }
        #constellation-svg-container .const-line { stroke: var(--text-secondary-night); stroke-width: 1px; opacity: 0.5; }
        .air-quality-info-section { flex-direction: column; width: 100%; gap: 12px; }
        .air-quality-title { font-size: 15px; font-weight: 700; color: var(--current-text-color); padding-bottom: 6px; border-bottom: 1px solid var(--current-container-border-color); width: 100%; max-width: 400px; }
        .air-quality-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; width: 100%; max-width: 500px; }
        .air-quality-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px; background-color: rgba(0,0,0,0.12); border-radius: 10px; text-align: center; }
        .air-quality-label { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: var(--current-text-muted-color); text-transform: uppercase; }
        .air-quality-label i { font-size: 0.9em; opacity: 0.8; }
        .air-quality-value-container { display: flex; align-items: baseline; gap: 4px; }
        .air-quality-value { font-size: 16px; font-weight: 700; color: var(--current-text-color); }
        .air-quality-value-unit { font-size: 10px; font-weight: 500; color: var(--current-text-muted-color); }
        .air-quality-description { font-size: 11px; font-weight: 500; font-style: italic; }
        .air-quality-description.level-good { color: var(--level-good); }
        .air-quality-description.level-moderate { color: var(--level-moderate); }
        .air-quality-description.level-high, .air-quality-description.level-unhealthy-sensitive { color: var(--level-unhealthy-sensitive); }
        .air-quality-description.level-very-high, .air-quality-description.level-unhealthy { color: var(--level-unhealthy); }

        .weather-details-grid { margin-top: 20px; background-color: rgba(0,0,0,0.08); border: 1px solid var(--current-container-border-color); border-radius: 12px; padding: 12px 14px; display: grid; grid-template-columns: 1fr 1fr; column-gap: 14px; row-gap: 8px; transition: all 0.6s; }
        .detail-item { display: flex; justify-content: space-between; align-items: center; font-size: 13.5px; padding: 4px 0; }
        .detail-item .label { font-weight: 600; color: var(--current-text-color); margin-right: 4px; display: flex; align-items: center; transition: color 0.6s; white-space: nowrap; }
        .detail-item .label i { margin-right: 6px; width: 14px; font-size: 0.9em; text-align: center; opacity: 0.8; color: var(--current-icon-color); transition: color 0.6s; }
        .detail-item .value { color: var(--current-text-muted-color); font-weight: 500; transition: color 0.6s; display: flex; align-items: center; text-align: right; flex-shrink: 0; margin-left: 3px; }
        .pressure-trend-icon { margin-left: 4px; font-weight: 700; }
        .uv-description-text { margin-left: 4px; font-size: 0.88em; font-style: italic; }

        .forecast-title { width: 100%; max-width: 800px; font-size: 16px; font-weight: 700; color: var(--current-text-color); margin-top: 24px; margin-bottom: 12px; text-align: center; transition: color 0.6s; }
        .hourly-forecast-container { width: 100%; max-width: 800px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 4px; box-sizing: border-box; margin: 0 auto; }
        .hourly-forecast-card { display: flex; flex-direction: column; align-items: stretch; gap: 10px; padding: 10px; border-radius: 12px; background: var(--current-widget-bg); border: 1px solid var(--current-widget-border); box-shadow: 0 2px 8px rgba(0,0,0,0.1); color: var(--current-text-color); transition: all 0.6s; }
        .hourly-primary-info { display: flex; flex-direction: row; align-items: center; justify-content: space-around; gap: 8px; }
        .hourly-time { font-size: 13px; font-weight: 700; flex-shrink: 0; }
        .hourly-icon-and-condition { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .hourly-icon { font-size: 24px; color: var(--current-icon-color); transition: color 0.6s; }
        .hourly-condition-text { font-size: 10px; font-weight: 500; color: var(--current-text-muted-color); white-space: nowrap; text-align: center; }
        .hourly-temp { font-size: 18px; font-weight: 700; flex-shrink: 0; }
        .hourly-secondary-details { display: flex; flex-direction: column; align-items: stretch; gap: 5px; font-size: 11px; border-top: 1px solid var(--current-container-border-color); padding-top: 8px; margin-top: 4px; }
        .hourly-detail-row { display: flex; justify-content: space-between; align-items: center; }
        .hourly-detail-row span { display: flex; align-items: center; gap: 5px; }
        .hourly-detail-row i { width: 12px; text-align: center; opacity: 0.7; }
        
        .flippable-value { display: inline-block; transition: transform 0.6s cubic-bezier(0.45, 0, 0.55, 1); transform-style: preserve-3d; will-change: transform; }
        .flippable-value.is-flipping { transform: rotateX(90deg); }

        /* Reszponzív Módosítások */
        @media (min-width: 640px) { .hourly-forecast-container { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1000px) { .hourly-forecast-container { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1000px) { .weather-widget { max-width: 960px; } }
        
        @media (max-width: 768px) {
            body { padding: 15px; }
            .weather-widget { padding: 18px; }
            .sun-info-section, .moon-info-section, .night-sky-info-section, .air-quality-info-section { flex-direction: column; align-items: center; gap: 15px; }
            .sun-text-details, .moon-text-details, .rain-text-details, .night-sky-text-details { width: 100%; max-width: 320px; text-align: center; }
            .sun-detail-item, .moon-detail-item, .rain-detail-item, .night-sky-detail-item { justify-content: space-between; }
            #iss-info .night-sky-text-details { min-width: unset; flex-basis: auto; }
            .night-sky-detail-value.long-text { text-align: right; justify-content: flex-end; }
            .weather-details-grid { grid-template-columns: 1fr; row-gap: 8px; }
        }

        @media (max-width: 480px) {
            body { padding: 10px; }
            .weather-widget { padding: 15px; }
            .location-title { font-size: 20px; }
            .station-subtitle { font-size: 12px; }
            .header-container { padding: 6px 18px; }
            .air-quality-grid { grid-template-columns: 1fr 1fr; }
            .celestial-path-visual-v2 { width: 100%; max-width: 280px; }
            .precip-station-item { flex-direction: column; align-items: flex-start; gap: 4px; }
            .precip-station-item .station-data-wrapper { justify-content: flex-start; width: 100%; }
        }
    </style>
</head>
<body data-theme="night">

    <div class="sky-gradient-overlay"></div>

    <div class="weather-widget">
        <div id="weather-display"></div>
    </div>

    <h3 class="forecast-title is-hidden" id="hourly-forecast-title">A következő órákban várható időjárás</h3>

    <div class="hourly-forecast-container" id="hourly-forecast-container"></div>

    <script>
        // <<< TELJES, FRISSÍTETT SCRIPT BLOKK >>>
        
        const weatherComApiKey = 'e1f10a1e78da46f5b10a1e78da96f525';
        const REFRESH_INTERVAL_PWS = 30 * 1000;
        const REFRESH_INTERVAL_GENERAL_CONDITIONS = 20 * 60 * 1000;
        const REFRESH_INTERVAL_AIR_QUALITY = 30 * 60 * 1000;
        const REFRESH_INTERVAL_FORECAST = 5 * 60 * 1000;
        const SKY_COLOR_UPDATE_INTERVAL = 1 * 60 * 1000;
        const NYIREGYHAZA_COORDS = { lat: 47.9550, lon: 21.7160 };

        const ENABLE_ISS_TRACKING = true;
        const N2YO_API_KEY = '589P8Q-SDRYX8-L842ZD-5Z9L';
        const OBSERVER_ALTITUDE = 120;
        const ISS_NORAD_ID = 25544;
        const REFRESH_INTERVAL_ISS = 2 * 60 * 60 * 1000;
        const STALE_DATA_THRESHOLD_MS = 30 * 60 * 1000;

        const STATIONS = {
            NYIREGYHAZI_UT: { id: 'INYREG26', name: 'Nyíregyháza Nyíregyházi úti állomás', displayName: 'Nyíregyházi út', provides: ['precip', 'temp'], isOnline: false, data: null },
            KOSSUTH: { id: 'INYREG42', name: 'Nyíregyháza Kossuth út 50 állomás', displayName: 'Kossuth út 50', provides: ['temp', 'wind', 'humidity', 'solar', 'uv', 'pressure', 'precip'], isOnline: false, data: null },
            HONVED: { id: 'INYREG37', name: 'Nyíregyháza Honvéd utcai állomás', displayName: 'Honvéd u.', provides: ['temp', 'wind', 'humidity', 'solar', 'uv', 'pressure'], isOnline: false, data: null },
            SOSTOHEGY: { id: 'INYREG11', name: 'Nyíregyháza-Sóstóhegy PWS', displayName: 'Sóstóhegy', provides: ['precip', 'temp'], isOnline: false, data: null },
            ALLATPARK: { id: 'INYREG20', name: 'Nyíregyházi Állatpark PWS', displayName: 'Nyíregyházi Állatpark', provides: ['precip', 'temp'], isOnline: false, data: null },
            NAPKOR: { id: 'INAPKO1', name: 'Napkor PWS', displayName: 'Napkor', provides: ['precip', 'temp'], isOnline: false, data: null },
            KALLOSEMJEN: { id: 'IKLLSE3', name: 'Kállósemjén PWS', displayName: 'Kállósemjén', provides: ['precip', 'temp'], isOnline: false, data: null },
            KEMECSE: { id: 'IKEMEC1', name: 'Kemecse PWS', displayName: 'Kemecse', provides: ['precip', 'temp'], isOnline: false, data: null },
            BERKESZ: { id: 'IBERKE55', name: 'Berkesz PWS', displayName: 'Berkesz', provides: ['precip', 'temp'], isOnline: false, data: null },
            NAGYHALASZ: { id: 'INAGYH4', name: 'Nagyhalász PWS', displayName: 'Nagyhalász', provides: ['precip', 'temp'], isOnline: false, data: null },
            KISVARDA: { id: 'IKISVR2', name: 'Kisvárda PWS', displayName: 'Kisvárda', provides: ['precip', 'temp'], isOnline: false, data: null },
            CIGAND: { id: 'ICIGND1', name: 'Cigánd PWS', displayName: 'Cigánd', provides: ['precip', 'temp'], isOnline: false, data: null },
            SZAKOLY: { id: 'ISZAKO1', name: 'Szakoly PWS', displayName: 'Szakoly', provides: ['precip', 'temp'], isOnline: false, data: null },
            TEGLAS: { id: 'ITGLS2', name: 'Téglás PWS', displayName: 'Téglás', provides: ['precip', 'temp'], isOnline: false, data: null },
            BUJ: { id: 'IBUJ5', name: 'Buj PWS', displayName: 'Buj', provides: ['precip', 'temp'], isOnline: false, data: null },
        };
        let activeDisplayStationKey = 'NYIREGYHAZI_UT';

        let lastApiCallTimes = { generalConditions: 0, forecast: 0, issPasses: 0, airQuality: 0 };
        let cachedData = {
            displayPws: null,
            generalConditions: { skyCoverPhrase: null, pressureAltimeter: null, visibility: null, sunriseTimeLocal: null, sunsetTimeLocal: null, dayOrNight: null, pressureTendencyCode: null, uvDescription: null },
            hourlyForecast: [],
            dailyForecasts: [],
            sunCalc: null,
            issPasses: [],
            airQuality: null,
            previousTemperatures: {},
        };
        let isWeatherDisplayInitialized = false;
        let currentDay = new Date().getDate();

        let weatherDisplayEl, hourlyForecastContainerEl, hourlyForecastTitleEl;
        const NO_DATA_STRING = 'N/A';
        const NO_FRESH_DATA_STRING = 'Nincs friss adat';
        const PRECIP_THRESHOLD = 30;
        
        let animationFrameId = null;
        
        const CELESTIAL_EVENT_DURATION_MS = 10 * 60 * 1000;
        const CELESTIAL_RISE_TRANSITION_ALTITUDE = 0.6; 
        const CELESTIAL_SET_TRANSITION_ALTITUDE = -0.6;
        
        let celestialBodyStates = {
            sun: { currentState: 'UNKNOWN', previousState: 'UNKNOWN' },
            moon: { currentState: 'UNKNOWN', previousState: 'UNKNOWN' }
        };

        let masterTickCounter = 0;

        let nightSkyRotationInterval = null;
        let recentlyShownSkyObjects = new Map();
        const NIGHT_SKY_ROTATION_INTERVAL_MS = 60 * 1000;
        const NIGHT_SKY_OBJECT_COOLDOWN_MS = 10 * 60 * 1000;
        const NIGHT_SKY_OBJECTS = [
            {id:'venus_evening',type:'planet',name:'Vénusz (Esthajnalcsillag)',icon:'far fa-circle',status:'Napnyugta után a nyugati égen ragyog',details:'Rendkívül fényes, vakító jelenség. Fázisai távcsővel megfigyelhetők.',visibilityCheck:(m,h)=>(m>=3&&m<=7)&&(h>=18&&h<=21)},
            {id:'venus_morning',type:'planet',name:'Vénusz (Hajnalcsillag)',icon:'far fa-circle',status:'Napkelte előtt keleten tündököl',details:'Az égbolt legfényesebb bolygója a Hold után. Nem lehet eltéveszteni.',visibilityCheck:(m,h)=>(m>=9&&m<=12||m<=2)&&(h>=4&&h<=7)},
            {id:'mars',type:'planet',name:'Mars',icon:'fas fa-circle',status:'Vöröses fénypont, éjfél körül magasan',details:'A "vörös bolygó" jellegzetes színéről könnyen azonosítható. Fényessége nagyban változik.',visibilityCheck:(m,h)=>(m>=1&&m<=4||m>=10)&&(h>=20||h<=4)},
            {id:'jupiter',type:'planet',name:'Jupiter',icon:'fas fa-globe-europe',status:'Fényes, uralkodó jelenség az égen',details:'A Naprendszer legnagyobb bolygója. Négy nagy holdja (Galilei-holdak) kézitávcsővel is látható.',visibilityCheck:(m,h)=>(m>=5&&m<=12)&&(h>=20||h<=5)},
            {id:'saturn',type:'planet',name:'Szaturnusz',icon:'fas fa-ring',status:'Nyári-őszi estéken, a déli égbolton',details:'Gyűrűi már egy kisebb távcsővel is gyönyörűen látszanak. Sárgás, nyugodt fényű.',visibilityCheck:(m,h)=>(m>=6&&m<=11)&&(h>=21||h<=3)},
            {id:'sirius',type:'star',name:'Szíriusz',icon:'fas fa-star',status:'A téli égbolt legfényesebb csillaga',details:'A Nagy Kutya csillagkép főcsillaga. Feltűnően sziporkázik, gyakran változtatja színét a légköri turbulencia miatt.',visibilityCheck:(m,h)=>(m>=11||m<=4)&&(h>=20||h<=5)},
            {id:'arcturus',type:'star',name:'Arcturus',icon:'fas fa-star',status:'Tavaszi-nyári esték narancsos csillaga',details:'Az északi égbolt legfényesebb csillaga. A Göncölszekér rúdjának ívét követve könnyen megtalálható.',visibilityCheck:(m,h)=>(m>=3&&m<=8)&&(h>=20||h<=2)},
            {id:'vega',type:'star',name:'Vega',icon:'fas fa-star',status:'A nyári égbolt egyik csúcsa',details:'A Lant (Lyra) csillagkép legfényesebb, kékesfehér csillaga. A Nyári Háromszög egyik tagja.',visibilityCheck:(m,h)=>(m>=5&&m<=10)&&(h>=21||h<=4)},
            {id:'capella',type:'star',name:'Capella',icon:'fas fa-star',status:'A téli égbolt fényes, sárgás csillaga',details:'Az Auriga (Szekeres) csillagkép főcsillaga. Valójában két, egymáshoz közeli csillagból álló rendszer.',visibilityCheck:(m,h)=>(m>=10||m<=4)&&(h>=19||h<=6)},
            {id:'rigel',type:'star',name:'Rigel',icon:'fas fa-star',status:'Az Orion jobb alsó, kékesfehér csillaga',details:'Egy rendkívül forró és fényes szuperóriás, az égbolt egyik legfényesebb csillaga.',visibilityCheck:(m,h)=>(m>=11||m<=3)&&(h>=19||h<=5)},
            {id:'polaris',type:'star',name:'Sarkcsillag (Polaris)',icon:'fas fa-star',status:'Az északi égi pólushoz közeli csillag',details:'A Kis Medve (Ursa Minor) rúdjának végén található. Látszólagos mozdulatlansága miatt segít az északi irány meghatározásában.',visibilityCheck:(m,h)=>true},
            {id:'ursa_major',type:'constellation',name:'Nagy Medve (Göncölszekér)',svg:`<svg viewBox="0 0 100 80"><path class="const-line" d="M10,60 L30,45 L50,50 L70,40 L90,20" /><path class="const-line" d="M70,40 L68,58" /><circle cx="10" cy="60" r="2.2" class="star"></circle><circle cx="30" cy="45" r="2.2" class="star"></circle><circle cx="50" cy="50" r="2.2" class="star"></circle><circle cx="70" cy="40" r="2.5" class="star bright"></circle><circle cx="90" cy="20" r="2" class="star"></circle><circle cx="68" cy="58" r="2" class="star"></circle><circle cx="48" cy="25" r="1.8" class="star"></circle></svg>`,details:'A legismertebb csillagkép, segít megtalálni a Sarkcsillagot. Rúdja az égi pólus felé mutat.',visibilityCheck:(m,h)=>true},
            {id:'cassiopeia',type:'constellation',name:'Kassziopeia',svg:`<svg viewBox="0 0 100 80"><path d="M15,50 L35,25 L55,45 L75,20 L95,40" class="const-line" fill="none"/><circle class="star" cx="15" cy="50" r="2.5"></circle><circle cx="35" cy="25" r="2.5"></circle><circle class="star bright" cx="55" cy="45" r="3"></circle><circle cx="75" cy="20" r="2.5"></circle><circle cx="95" cy="40" r="2"></circle></svg>`,details:'Jellegzetes "W" vagy "M" alakú csillagkép a Tejúton, a Nagy Göncöllel szemben helyezkedik el.',visibilityCheck:(m,h)=>true},
            {id:'orion',type:'constellation',name:'Orion',svg:`<svg viewBox="0 0 100 80"><line class="const-line" x1="25" y1="15" x2="45" y2="40"/><line class="const-line" x1="75" y1="15" x2="55" y2="40"/><line class="const-line" x1="25" y1="65" x2="45" y2="40"/><line class="const-line" x1="75" y1="65" x2="55" y2="40"/><line class="const-line" x1="45" y1="40" x2="55" y2="40"/><circle class="star bright" cx="25" cy="15" r="3"></circle><circle class="star bright" cx="75" cy="15" r="2.5"></circle><circle class="star bright" cx="25" cy="65" r="2.8"></circle><circle class="star bright" cx="75" y1="65" r="3"></circle><circle class="star" cx="45" cy="40" r="2"></circle><circle class="star" cx="50" cy="40" r="2"></circle><circle class="star" cx="55" y2="40" r="2"></circle></svg>`,details:'A téli égbolt leglátványosabb csillagképe, övével és fényes csillagaival (Betelgeuse, Rigel).',visibilityCheck:(m,h)=>(m>=10||m<=3)&&(h>=19||h<=5)},
            {id:'cygnus',type:'constellation',name:'Hattyú (Cygnus)',svg:`<svg viewBox="0 0 100 80"><path d="M50,10 L50,70" class="const-line" /><path d="M20,40 L80,40" class="const-line" /><circle cx="50" cy="10" r="3" class="star bright"></circle><circle cx="50" cy="70" r="2.5" class="star"></circle><circle cx="20" cy="40" r="2"></circle><circle cx="80" cy="40" r="2"></circle><circle cx="50" cy="40" r="2.2"></circle></svg>`,details:'Más néven az Északi Kereszt. A Tejút síkjában fekszik, tele van csillaghalmazokkal. Főcsillaga a Deneb.',visibilityCheck:(m,h)=>(m>=6&&m<=11)&&(h>=20||h<=5)},
            {id:'pleiades',type:'deep_sky_object',name:'Fiastyúk (Pleiades)',icon:'fas fa-braille',status:'Télen magasan az égen, a Bika mellett',details:'Gyönyörű nyílthalmaz (M45), "Hetes" néven is ismert. Szabad szemmel is látványos, apró "üst".',visibilityCheck:(m,h)=>(m>=10||m<=4)&&(h>=19||h<=5)},
            {id:'andromeda_galaxy',type:'deep_sky_object',name:'Androméda-galaxis',icon:'far fa-dot-circle',status:'Ősszel este keresd a Pegazus mellett',details:'A hozzánk legközelebbi nagy galaxis (M31). Sötét égen halvány, elmosódott foltként látszik szabad szemmel is.',visibilityCheck:(m,h)=>(m>=8&&m<=2)&&(h>=20||h<=4)},
            {id:'orion_nebula',type:'deep_sky_object',name:'Orion-köd',icon:'fas fa-atom',status:'Az Orion "kardjában" található',details:'Csillagbölcső, ahol új csillagok születnek (M42). Távcsővel és sötét égen már látványos, halvány folt.',visibilityCheck:(m,h)=>(m>=11||m<=3)&&(h>=21||h<=5)},
            {id:'hercules_cluster',type:'deep_sky_object',name:'Herkules-gömbhalmaz',icon:'fas fa-compact-disc',status:'Nyári éjszakákon, a Herkulesben',details:'Az északi égbolt legfényesebb gömbhalmaza (M13). Távcsőben több százezer csillag alkot egy apró, gömb alakú halmazt.',visibilityCheck:(m,h)=>(m>=5&&m<=9)&&(h>=22||h<=3)},
            {id:'perseids',type:'meteor_shower',name:'Perseidák meteorraj',icon:'fas fa-meteor',status:'Maximuma augusztus 12-13 körül várható',details:'"Szent Lőrinc könnyeiként" is ismert. Az év egyik leglátványosabb, legnépszerűbb meteorraja.',visibilityCheck:(m,h)=>m===8&&(h>=22||h<=4)},
            {id:'geminids',type:'meteor_shower',name:'Geminidák meteorraj',icon:'fas fa-meteor',status:'Maximuma december 13-14 körül esedékes',details:'Az év egyik legaktívabb és legmegbízhatóbb meteorraja. Az Ikrek (Gemini) csillagkép a radiánsa.',visibilityCheck:(m,h)=>m===12&&(h>=20||h<=5)},
            {id:'milky_way_summer',type:'info',name:'A Tejút nyáron',icon:'fas fa-water',status:'Nyári estéken déli irányban a leglátványosabb',details:'A saját galaxisunk síkja. Nyáron a galaktikus centrum felé látunk, ezért a Tejút itt a legfényesebb és legsűrűbb.',visibilityCheck:(m,h)=>(m>=6&&m<=9)&&(h>=22||h<=3)},
        ];

        let el_stationSubtitleText, el_timestampText,
            el_sunInfoSection, el_moonInfoSection, el_nightSkyInfoSection, el_airQualityInfoSection,
            el_gridSunriseItem, el_gridSunsetItem, el_gridMoonriseItem, el_gridMoonsetItem,
            el_sunPathVisual, el_sunPathIcon, el_sunPathArcMain,
            el_sunInfoAltitude, el_sunInfoAzimuth, el_sunInfoTrend, el_sunInfoNoon, el_sunInfoRemaining, el_sunPathSunriseTime, el_sunPathSunsetTime, el_sunPathRefreshBtn,
            el_moonPathVisual, el_moonPathIcon, el_moonPathArcMain,
            el_moonriseTimeLabel, el_moonsetTimeLabel,
            el_moonInfoAltitude, el_moonInfoTrend, el_moonInfoPhasename, el_moonInfoIllumination, el_moonPathRefreshBtn,
            el_sunEventContainer, el_sunEventMessage, el_sunEventCountdown,
            el_moonEventContainer, el_moonEventMessage, el_moonEventCountdown,
            el_issInfo, el_planetInfo, el_constellationInfo,
            el_issVisualIcon, el_issNextPassTime, el_issMaxElevation, el_issDuration, el_issBrightness, el_issPathDetails,
            el_nightSkyVisualIcon, el_nightSkyObjectName, el_nightSkyObjectStatus, el_nightSkyObjectDetails, el_nightSkyAstroDarknessItemPlanet, el_nightSkyAstroDarknessPlanet,
            el_constellationSvgContainer, el_constellationName, el_constellationDetails, el_constellationAstroDarknessItemConst, el_constellationAstroDarknessConst,
            el_topTempCardValue,
            el_currentTempStatusDot, el_currentTempLiveTag, el_topTempTrendArrow, el_topTempPrecipIcon,
            el_cardHeatIndexValue, el_cardHeatIndexDesc, el_cardWindValue, el_cardWindDesc, el_cardGustValue, el_cardGustDesc,
            el_dewpointValue, el_humidityValue, el_pressureValue, el_pressureTrendIcon, el_visibilityValue, el_solarRadiationValue, el_uvIndexValue, el_uvDescription,
            el_detailsSunriseValue, el_detailsSunsetValue, el_moonriseValue, el_moonsetValue,
            el_precipitationForecastBar, el_nextPrecipitationInfoText, el_nextPrecipitationDetailsText,
            el_aqiValue, el_aqiDescription, el_pm10Value, el_pm25Value, el_ozoneValue, el_ragweedPollenValue, el_grassPollenValue,
            el_ragweedPollenDescription, el_grassPollenDescription,
            el_regionalPrecipGrid;

        function formatValue(value, unit = '', precision = 1, notAvailableString = NO_DATA_STRING) { if (value === null || typeof value === 'undefined' || (typeof value === 'number' && isNaN(value)) ) return notAvailableString; if (typeof value === 'number') { return `${value.toFixed(precision)}${unit}`; } return `${value}${unit}`; }
        function formatTime(dateOrIsoString, includeSeconds = false) { if (!dateOrIsoString) return NO_DATA_STRING; try { const date = dateOrIsoString instanceof Date ? dateOrIsoString : new Date(dateOrIsoString); if (isNaN(date.getTime())) return NO_DATA_STRING; const options = { hour: '2-digit', minute: '2-digit' }; if(includeSeconds) options.second = '2-digit'; return date.toLocaleTimeString('hu-HU', options); } catch (e) { return NO_DATA_STRING; } }
        
        function updateMoonPhaseVisual(phase) {
            const moonIconContainer = document.getElementById('moon-path-icon-v2');
            if (!moonIconContainer) return;
            let offset;

            if (phase < 0.5) { // Növekvő
                offset = 100 - (phase / 0.5) * 100;
            } else { // Fogyó
                offset = ((phase - 0.5) / 0.5) * 100;
            }
            moonIconContainer.style.setProperty('--moon-phase-offset', `${offset}%`);
            moonIconContainer.classList.toggle('is-waning', phase >= 0.5);
        }

        function getRandomItem(arr) {
            if (!arr || arr.length === 0) return '';
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function getHeatIndexDescription(heatIndex, temp, context) {
            if (heatIndex == null || temp == null || typeof WEATHER_DESCRIPTIONS === 'undefined') return '';
            const { isMorning, isEvening, isNight, isNearSunrise, isNearSunset, skyCover } = context;
            const isCloudyCondition = skyCover.includes('borult') || skyCover.includes('felhős');
            const diff = heatIndex - temp;
            
            if (heatIndex > 35) {
                if (isEvening) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.extremeHeat.evening);
                if (isNight) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.extremeHeat.night);
                return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.extremeHeat.day);
            }
            if (heatIndex > 30) {
                if (isCloudyCondition) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.hot.cloudy);
                if (isEvening) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.hot.evening);
                if (isNight) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.hot.night);
                return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.hot.sunny);
            }
            if (heatIndex > 25) {
                if (isCloudyCondition) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.warm.cloudy);
                if (isMorning) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.warm.morning);
                if (isEvening) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.warm.evening);
                return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.warm.sunny);
            }
            if (heatIndex > 20) {
                if (isCloudyCondition) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.mild.cloudy);
                if (isMorning) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.mild.morning);
                return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.mild.day);
            }
            if (heatIndex > 15) {
                if (isNearSunrise) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cool.sunrise);
                if (isNearSunset) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cool.sunset);
                if (isEvening) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cool.evening);
                return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cool.day);
            }
            if (heatIndex < 5) {
                if (diff < -4) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cold.windy);
                if (isMorning) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.veryCold.morning);
                if (isNight) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.veryCold.night);
                return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.veryCold.day);
            }
            if (heatIndex < 10) {
                if (isMorning) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cold.morning);
                if (isNight) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cold.night);
                return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.cold.day);
            }
            if (diff < -3) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.misc.windChill);
            if (diff > 3) return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.misc.muggy);
            
            return getRandomItem(WEATHER_DESCRIPTIONS.heatIndex.misc.neutral);
        }

        function getWindDescription(windSpeed, gustSpeed, context) {
            if (windSpeed == null || typeof WEATHER_DESCRIPTIONS === 'undefined') return 'n/a';
            const { isDay, skyCover } = context;
            const isStormy = (skyCover || '').includes('vihar');
            
            if (isStormy && windSpeed > 30) return getRandomItem(WEATHER_DESCRIPTIONS.wind.storm);
            if (windSpeed <= 2) return gustSpeed > 7 ? getRandomItem(WEATHER_DESCRIPTIONS.wind.calmWithGusts) : getRandomItem(WEATHER_DESCRIPTIONS.wind.calm);
            if (windSpeed <= 6) return isDay ? getRandomItem(WEATHER_DESCRIPTIONS.wind.light.day) : getRandomItem(WEATHER_DESCRIPTIONS.wind.light.night);
            if (windSpeed <= 12) return isDay ? getRandomItem(WEATHER_DESCRIPTIONS.wind.moderate.day) : getRandomItem(WEATHER_DESCRIPTIONS.wind.moderate.night);
            if (windSpeed <= 20) return getRandomItem(WEATHER_DESCRIPTIONS.wind.fresh);
            if (windSpeed <= 30) return getRandomItem(WEATHER_DESCRIPTIONS.wind.strong);
            if (windSpeed <= 40) return getRandomItem(WEATHER_DESCRIPTIONS.wind.veryStrong);
            if (windSpeed <= 50) return getRandomItem(WEATHER_DESCRIPTIONS.wind.gale);
            return getRandomItem(WEATHER_DESCRIPTIONS.wind.stormy);
        }

        function getWindGustDescription(gustSpeed, windSpeed, context) {
            if (gustSpeed == null || windSpeed == null || typeof WEATHER_DESCRIPTIONS === 'undefined') return '';
            const { isDay, skyCover } = context;
            const isStormy = (skyCover || '').includes('vihar');

            if (gustSpeed < windSpeed + 5) return getRandomItem(WEATHER_DESCRIPTIONS.windGust.calm);
            if (isStormy && gustSpeed > 50) return getRandomItem(WEATHER_DESCRIPTIONS.windGust.storm);
            if (gustSpeed < 15) return getRandomItem(WEATHER_DESCRIPTIONS.windGust.light);
            if (gustSpeed < 30) return isDay ? getRandomItem(WEATHER_DESCRIPTIONS.windGust.moderate.day) : getRandomItem(WEATHER_DESCRIPTIONS.windGust.moderate.night);
            if (gustSpeed < 45) return isDay ? getRandomItem(WEATHER_DESCRIPTIONS.windGust.fresh.day) : getRandomItem(WEATHER_DESCRIPTIONS.windGust.fresh.night);
            if (gustSpeed < 60) return getRandomItem(WEATHER_DESCRIPTIONS.windGust.strong);
            if (gustSpeed < 80) return getRandomItem(WEATHER_DESCRIPTIONS.windGust.veryStrong);
            return getRandomItem(WEATHER_DESCRIPTIONS.windGust.gale);
        }
        
        function getUVDescription(uvIndex) {
            if (uvIndex == null) return '';
            if (uvIndex <= 2) return '(Alacsony)';
            if (uvIndex <= 5) return '(Mérsékelt)';
            if (uvIndex <= 7) return '(Magas)';
            if (uvIndex <= 10) return '(Nagyon magas)';
            return '(Extrém)';
        }

        function formatPrecipitationDate(isoDateString) {
            if (!isoDateString) return '';
            try {
                const eventDate = new Date(isoDateString);
                if (isNaN(eventDate.getTime())) return '';
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
                const eventDateDay = new Date(eventDate); eventDateDay.setHours(0, 0, 0, 0);
                if (eventDateDay.getTime() === today.getTime()) { return 'ma'; }
                if (eventDateDay.getTime() === tomorrow.getTime()) { return 'holnap'; }
                return eventDate.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' });
            } catch (e) { return ''; }
        }

        function degreesToCompass(degrees) { if (degrees === null || typeof degrees === 'undefined') return '-'; degrees = (parseFloat(degrees) % 360 + 360) % 360; const directions = ["északi", "észak-északkeleti", "északkeleti", "kelet-északkeleti", "keleti", "kelet-délkeleti", "délkeleti", "dél-délkeleti", "déli", "dél-délnyugati", "délnyugati", "nyugat-délnyugati", "nyugati", "nyugat-északnyugati", "északnyugati", "észak-északnyugati"]; return directions[Math.round(degrees / 22.5) % 16]; }
        function degreesToCompassAbbreviated(degrees) { if (degrees === null || typeof degrees === 'undefined') return '-'; degrees = (parseFloat(degrees) % 360 + 360) % 360; const directions = ["É", "ÉÉK", "ÉK", "KÉK", "K", "KDK", "DK", "DDK", "D", "DDNY", "DNY", "NYDNY", "NY", "NYÉNY", "ÉNY", "ÉÉNY"]; return directions[Math.round(degrees / 22.5) % 16]; }
        function formatCountdown(ms) { if (ms < 0) ms = 0; const totalSeconds = Math.floor(ms / 1000); const minutes = Math.floor(totalSeconds / 60); const seconds = totalSeconds % 60; return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; }
        
        function updateThemeAndSky(currentTime, sunriseTimeIso, sunsetTimeIso) {
            const fallbackTheme = (new Date().getHours() >= 7 && new Date().getHours() < 18) ? 'day' : 'night';
            let theme = fallbackTheme;
            if (sunriseTimeIso && sunsetTimeIso) {
                try {
                    const nowMs = currentTime.getTime();
                    const sunriseDate = new Date(sunriseTimeIso); const sunsetDate = new Date(sunsetTimeIso);
                    if (isNaN(sunriseDate.getTime()) || isNaN(sunsetDate.getTime())) throw new Error("Invalid sunrise/sunset date");
                    const EARLY_DAWN_DURATION = 30 * 60 * 1000, BLUE_HOUR_DAWN_DURATION = 30 * 60 * 1000, DAWN_DURATION = 25 * 60 * 1000, SUNRISE_EVENT_DURATION = 15 * 60 * 1000, GOLDEN_HOUR_RISE_DURATION = 45 * 60 * 1000;
                    const GOLDEN_HOUR_SET_DURATION = 45 * 60 * 1000, SUNSET_EVENT_DURATION = 15 * 60 * 1000, DUSK_DURATION = 25 * 60 * 1000, BLUE_HOUR_DUSK_DURATION = 30 * 60 * 1000, LATE_DUSK_DURATION = 30 * 60 * 1000;
                    const sunriseMs = sunriseDate.getTime(), sunsetMs = sunsetDate.getTime();
                    const earlyDawnStart = sunriseMs - DAWN_DURATION - BLUE_HOUR_DAWN_DURATION - EARLY_DAWN_DURATION, blueHourDawnStart = sunriseMs - DAWN_DURATION - BLUE_HOUR_DAWN_DURATION, dawnStart = sunriseMs - DAWN_DURATION;
                    const sunriseEnd = sunriseMs + SUNRISE_EVENT_DURATION, goldenHourRiseEnd = sunriseEnd + GOLDEN_HOUR_RISE_DURATION;
                    const goldenHourSetStart = sunsetMs - GOLDEN_HOUR_SET_DURATION, sunsetEnd = sunsetMs + SUNSET_EVENT_DURATION, duskEnd = sunsetEnd + DUSK_DURATION;
                    const blueHourDuskEnd = duskEnd + BLUE_HOUR_DUSK_DURATION, lateDuskEnd = blueHourDuskEnd + LATE_DUSK_DURATION;
                    if (nowMs >= earlyDawnStart && nowMs < blueHourDawnStart) { theme = 'early_dawn'; }
                    else if (nowMs >= blueHourDawnStart && nowMs < dawnStart) { theme = 'blue_hour_dawn'; }
                    else if (nowMs >= dawnStart && nowMs < sunriseMs) { theme = 'dawn'; }
                    else if (nowMs >= sunriseMs && nowMs < sunriseEnd) { theme = 'sunrise'; }
                    else if (nowMs >= sunriseEnd && nowMs < goldenHourRiseEnd) { theme = 'golden_hour_rise'; }
                    else if (nowMs >= goldenHourRiseEnd && nowMs < goldenHourSetStart) { theme = 'day'; }
                    else if (nowMs >= goldenHourSetStart && nowMs < sunsetMs) { theme = 'golden_hour_set'; }
                    else if (nowMs >= sunsetMs && nowMs < sunsetEnd) { theme = 'sunset'; }
                    else if (nowMs >= sunsetEnd && nowMs < duskEnd) { theme = 'dusk'; }
                    else if (nowMs >= duskEnd && nowMs < blueHourDuskEnd) { theme = 'blue_hour_dusk'; }
                    else if (nowMs >= blueHourDuskEnd && nowMs < lateDuskEnd) { theme = 'late_dusk'; }
                    else { theme = 'night'; }
                } catch (e) { theme = fallbackTheme; }
            }
            if (document.body.dataset.theme !== theme) document.body.dataset.theme = theme;
        }

        function getComprehensiveMoonData(lat, lon) {
            const now = new Date(); const moonPos = SunCalc.getMoonPosition(now, lat, lon); const isActuallyUp = moonPos.altitude > 0;
            const days = [ new Date(new Date().setDate(now.getDate() - 1)), now, new Date(new Date().setDate(now.getDate() + 1)) ];
            let events = [];
            days.forEach(day => {
                const moonTimes = SunCalc.getMoonTimes(day, lat, lon, true);
                if (moonTimes.rise && !isNaN(moonTimes.rise.getTime())) events.push({ time: moonTimes.rise, type: 'rise' });
                if (moonTimes.set && !isNaN(moonTimes.set.getTime())) events.push({ time: moonTimes.set, type: 'set' });
            });
            if (events.length === 0) return { isUp: isActuallyUp, pathRise: null, pathSet: null, nextRise: null, nextSet: null, moonAltitude: moonPos.altitude * 180 / Math.PI };
            events.sort((a, b) => a.time - b.time);
            let pathRise = null, pathSet = null;
            if (isActuallyUp) {
                const lastRiseEvent = events.filter(e => e.type === 'rise' && e.time < now).pop();
                if (lastRiseEvent) { pathRise = lastRiseEvent.time; pathSet = events.find(e => e.type === 'set' && e.time > pathRise)?.time || null; }
            }
            const nextRise = events.find(e => e.type === 'rise' && e.time > now)?.time || null;
            const nextSet = events.find(e => e.type === 'set' && e.time > now)?.time || null;
            return { isUp: isActuallyUp, pathRise: pathRise, pathSet: pathSet, nextRise: nextRise, nextSet: nextSet, moonAltitude: moonPos.altitude * 180 / Math.PI };
        }

        async function fetchAdvancedSunCalcData(lat, lon) {
            const now = new Date(); const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const sunTimesToday = SunCalc.getTimes(now, lat, lon); const sunTimesYesterday = SunCalc.getTimes(yesterday, lat, lon);
            const sunriseDate = sunTimesToday.sunrise, sunsetDate = sunTimesToday.sunset, solarNoonDate = sunTimesToday.solarNoon;
            const sunPos = SunCalc.getPosition(now, lat, lon);
            const sunAltitude = sunPos.altitude * 180 / Math.PI; const sunAzimuthDegrees = (sunPos.azimuth * 180 / Math.PI + 180) % 360; const sunAzimuthCompass = degreesToCompass(sunAzimuthDegrees);
            const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); const pastSunPos = SunCalc.getPosition(tenMinutesAgo, lat, lon);
            let sunTrend = sunPos.altitude > 0 ? (sunPos.altitude > pastSunPos.altitude ? 'Emelkedik' : 'Süllyed') : null;
            let sunStatus = '';
            if (sunriseDate && sunsetDate && !isNaN(sunriseDate.getTime()) && !isNaN(sunsetDate.getTime())) { if (now < sunriseDate) { sunStatus = 'Napkelte előtt'; } else if (now >= sunriseDate && now < solarNoonDate) { sunStatus = 'Dél felé tart'; } else if (now >= solarNoonDate && now < sunsetDate) { sunStatus = 'Dél után'; } else { sunStatus = 'Lenyugodott'; } }
            let remainingDaylightText = 'N/A';
            if (sunriseDate && sunsetDate && !isNaN(sunriseDate.getTime()) && !isNaN(sunsetDate.getTime())) {
                if (now > sunriseDate && now < sunsetDate) {
                    const diffMs = sunsetDate.getTime() - now.getTime();
                    const hours = Math.floor(diffMs / 3600000); const minutes = Math.floor((diffMs % 3600000) / 60000);
                    remainingDaylightText = `Még ${hours} óra ${minutes} perc`;
                } else if (now <= sunriseDate) { remainingDaylightText = `Napkelte ${formatTime(sunriseDate)}-kor`; } else { remainingDaylightText = 'A nap már lenyugodott'; }
            }
            const moonPos = SunCalc.getMoonPosition(now, lat, lon); const pastMoonPos = SunCalc.getMoonPosition(tenMinutesAgo, lat, lon);
            const moonIllumination = SunCalc.getMoonIllumination(now);
            const comprehensiveMoonData = getComprehensiveMoonData(lat, lon);
            let moonTrend = moonPos.altitude > 0 ? (moonPos.altitude > pastMoonPos.altitude ? 'Emelkedik' : 'Süllyed') : null; let moonStatus = comprehensiveMoonData.isUp ? 'Égen van' : 'Horizont alatt';
            let phaseName = 'N/A'; const phase = moonIllumination.phase;
            if (phase >= 0 && phase < 0.03) phaseName = 'Újhold'; else if (phase >= 0.03 && phase < 0.22) phaseName = 'Növekvő sarló'; else if (phase >= 0.22 && phase < 0.28) phaseName = 'Első negyed'; else if (phase >= 0.28 && phase < 0.47) phaseName = 'Növekvő hold'; else if (phase >= 0.47 && phase < 0.53) phaseName = 'Telihold'; else if (phase >= 0.53 && phase < 0.72) phaseName = 'Fogyó hold'; else if (phase >= 0.72 && phase < 0.78) phaseName = 'Utolsó negyed'; else if (phase >= 0.78 && phase < 0.97) phaseName = 'Fogyó sarló'; else if (phase >= 0.97 && phase <= 1) phaseName = 'Újholdhoz közeli';
            
            return {
                sunrise: formatTime(sunriseDate), sunset: formatTime(sunsetDate), solarNoon: formatTime(solarNoonDate), sunriseDateForPath: sunriseDate, sunsetDateForPath: sunsetDate, solarNoonDate: solarNoonDate,
                sunAltitude: sunAltitude, sunAzimuthDegrees: sunAzimuthDegrees, sunAzimuthCompass: sunAzimuthCompass, sunTrend: sunTrend, sunStatus: sunStatus, remainingDaylight: remainingDaylightText,
                isUp: comprehensiveMoonData.isUp, moonrise: formatTime(comprehensiveMoonData.nextRise), moonset: formatTime(comprehensiveMoonData.nextSet), moonRiseDateForPath: comprehensiveMoonData.pathRise, moonSetDateForPath: comprehensiveMoonData.pathSet,
                moonAltitude: comprehensiveMoonData.moonAltitude, moonTrend: moonTrend, moonStatus: moonStatus, phaseValue: (moonIllumination.fraction * 100), phaseName: phaseName, moonPhaseRaw: moonIllumination.phase, moonDistance: moonPos.distance,
                astronomicalTwilightStart: sunTimesToday.nightEnd, astronomicalTwilightEnd: sunTimesYesterday.night,
            };
        }
        
        function updateNightSkyDisplay() {
            if (!el_nightSkyInfoSection) return;
            const now = Date.now();
            for (const [id, timestamp] of recentlyShownSkyObjects.entries()) { if (now - timestamp > NIGHT_SKY_OBJECT_COOLDOWN_MS) { recentlyShownSkyObjects.delete(id); } }
            el_nightSkyInfoSection.classList.add('is-fading');
            setTimeout(() => {
                const currentMonth = new Date().getMonth() + 1, currentHour = new Date().getHours();
                let visibleObjects = NIGHT_SKY_OBJECTS.filter(obj => obj.visibilityCheck(currentMonth, currentHour));
                let eligibleObjects = visibleObjects.filter(obj => !recentlyShownSkyObjects.has(obj.id));
                if (eligibleObjects.length === 0) { recentlyShownSkyObjects.clear(); eligibleObjects = visibleObjects; }
                if (ENABLE_ISS_TRACKING && cachedData.issPasses && cachedData.issPasses.length > 0) {
                    const nextPass = cachedData.issPasses[0];
                    if (!recentlyShownSkyObjects.has('iss') && (nextPass.startUTC.getTime() - now < 6 * 60 * 60 * 1000)) { eligibleObjects.unshift({ id: 'iss', type: 'iss', passData: nextPass }); }
                }
                if (eligibleObjects.length === 0) eligibleObjects.push(NIGHT_SKY_OBJECTS.find(o => o.id === 'ursa_major'));
                const objectToDisplay = eligibleObjects[Math.floor(Math.random() * eligibleObjects.length)];
                recentlyShownSkyObjects.set(objectToDisplay.id, now);
                if(el_issInfo) el_issInfo.classList.add('is-hidden'); if(el_planetInfo) el_planetInfo.classList.add('is-hidden'); if(el_constellationInfo) el_constellationInfo.classList.add('is-hidden');
                const sunCalcData = cachedData.sunCalc; let astroDarknessText = null;
                if (sunCalcData && sunCalcData.astronomicalTwilightStart && sunCalcData.astronomicalTwilightEnd) {
                     const nowMs = now; const astroNightStartObj = new Date(sunCalcData.astronomicalTwilightEnd); const astroNightEndObj = new Date(sunCalcData.astronomicalTwilightStart);
                     if (!isNaN(astroNightStartObj.getTime()) && !isNaN(astroNightEndObj.getTime())) { if (nowMs > astroNightStartObj.getTime() || nowMs < astroNightEndObj.getTime()) { astroDarknessText = `${formatTime(astroNightStartObj)} - ${formatTime(astroNightEndObj)}`; } }
                }
                const displaySection = (sectionEl, astroItemEl, astroTextEl) => {
                    const labelEl = astroItemEl ? astroItemEl.querySelector('.night-sky-detail-label') : null;
                    if (astroDarknessText && astroItemEl && astroTextEl && labelEl) { labelEl.innerHTML = '<i class="far fa-moon"></i>Csillagászati sötétség:'; astroTextEl.textContent = astroDarknessText; astroItemEl.classList.remove('is-hidden'); } 
                    else if (astroItemEl) { astroItemEl.classList.add('is-hidden'); }
                    sectionEl.classList.remove('is-hidden');
                };
                switch(objectToDisplay.type) {
                    case 'iss':
                        if(el_issInfo) {
                            const nextPass = objectToDisplay.passData;
                            if(el_issVisualIcon) el_issVisualIcon.className = 'fas fa-satellite';
                            if(el_issNextPassTime) el_issNextPassTime.textContent = `${formatTime(nextPass.startUTC)} - ${formatTime(nextPass.endUTC)}`;
                            if(el_issMaxElevation) el_issMaxElevation.textContent = `${formatValue(nextPass.maxEl, '°', 0)}`;
                            if(el_issDuration) el_issDuration.textContent = `${Math.round(nextPass.duration / 60)} perc`;
                            if(el_issBrightness) el_issBrightness.textContent = `${formatValue(nextPass.mag, ' mag')}`;
                            if(el_issPathDetails) el_issPathDetails.textContent = `Indul: ${nextPass.startAzCompass}, Max: ${nextPass.maxAzCompass}, Vége: ${nextPass.endAzCompass}`;
                            el_issInfo.classList.remove('is-hidden');
                        }
                        break;
                    case 'meteor_shower': case 'deep_sky_object': case 'planet': case 'star': case 'info':
                        if(el_planetInfo) {
                            if(el_nightSkyVisualIcon) el_nightSkyVisualIcon.className = objectToDisplay.icon;
                            if(el_nightSkyObjectName) el_nightSkyObjectName.textContent = objectToDisplay.name;
                            if(el_nightSkyObjectStatus) el_nightSkyObjectStatus.textContent = objectToDisplay.status;
                            if(el_nightSkyObjectDetails) el_nightSkyObjectDetails.textContent = objectToDisplay.details || '';
                            displaySection(el_planetInfo, el_nightSkyAstroDarknessItemPlanet, el_nightSkyAstroDarknessPlanet);
                        }
                        break;
                    case 'constellation':
                         if(el_constellationInfo) {
                            if(el_constellationSvgContainer) el_constellationSvgContainer.innerHTML = objectToDisplay.svg || '';
                            if(el_constellationName) el_constellationName.textContent = objectToDisplay.name;
                            if(el_constellationDetails) el_constellationDetails.textContent = objectToDisplay.details || '';
                            displaySection(el_constellationInfo, el_constellationAstroDarknessItemConst, el_constellationAstroDarknessConst);
                        }
                        break;
                }
                el_nightSkyInfoSection.classList.remove('is-fading');
            }, 400);
        }

        function startNightSkyRotation() { if (nightSkyRotationInterval) return; updateNightSkyDisplay(); nightSkyRotationInterval = setInterval(updateNightSkyDisplay, NIGHT_SKY_ROTATION_INTERVAL_MS); }
        function stopNightSkyRotation() { if (nightSkyRotationInterval) { clearInterval(nightSkyRotationInterval); nightSkyRotationInterval = null; recentlyShownSkyObjects.clear(); } }

        async function fetchIssPasses(apiKey, lat, lon, alt, noradId, days = 3, minElevation = 15) {
            if (!ENABLE_ISS_TRACKING || apiKey === 'YOUR_N2YO_API_KEY' || !apiKey) { cachedData.issPasses = []; return []; }
            const url = `https://api.n2yo.com/rest/v1/satellite/visualpasses/${noradId}/${lat}/${lon}/${alt}/${days}/${minElevation}/&apiKey=${apiKey}`;
            try {
                const response = await fetch(url);
                if (!response.ok) { if (response.status === 401) { console.error(`ISS API Hiba: Helytelen API kulcs...`); } else { console.error(`ISS API Hiba: ${response.status}`); } throw new Error(`ISS API Hiba: ${response.status}`); }
                const data = await response.json();
                if (data && data.info && data.info.passescount > 0 && data.passes) {
                    const now = new Date().getTime() / 1000;
                    const validPasses = data.passes.filter(pass => pass.startUTC > now && pass.maxEl >= minElevation).map(pass => ({ startAz: pass.startAz, startAzCompass: pass.startAzCompass, startEl: pass.startEl, startUTC: new Date(pass.startUTC * 1000), maxAz: pass.maxAz, maxAzCompass: pass.maxAzCompass, maxEl: pass.maxEl, maxUTC: new Date(pass.maxUTC * 1000), endAz: pass.endAz, endAzCompass: pass.endAzCompass, endEl: pass.endEl, endUTC: new Date(pass.endUTC * 1000), mag: pass.mag, duration: pass.duration })).sort((a, b) => a.startUTC - b.startUTC);
                    return validPasses;
                }
                return [];
            } catch (error) { cachedData.issPasses = []; return []; }
        }

        async function fetchAirQualityData(lat, lon) {
            const params = `latitude=${lat}&longitude=${lon}&current=european_aqi,pm10,pm2_5,ozone,ragweed_pollen,grass_pollen,birch_pollen&domains=cams_europe`; const url = `https://air-quality-api.open-meteo.com/v1/air-quality?${params}`;
            try { const response = await fetch(url); if (!response.ok) throw new Error(`Levegőminőség API Hiba: ${response.status}`); const data = await response.json(); lastApiCallTimes.airQuality = Date.now(); if (data && data.current) return data.current; else throw new Error('Hiányos levegőminőség adat.'); } catch (error) { console.warn(`Hiba a levegőminőség adatok lekérésekor: ${error.message}`); return null; }
        }
        
        async function fetchPwsStationData(stationKey) {
            const stationConfig = STATIONS[stationKey]; const url = `https://api.weather.com/v2/pws/observations/current?apiKey=${weatherComApiKey}&stationId=${stationConfig.id}&numericPrecision=decimal&format=json&units=m`;
            try { 
                const currentData = stationConfig.data;
                if (currentData && typeof currentData.metric?.temp === 'number') {
                    cachedData.previousTemperatures[stationKey] = currentData.metric.temp;
                }

                const response = await fetch(url); if (!response.ok) throw new Error(`PWS API Hiba: ${response.status}`); 
                const data = await response.json(); if (!data.observations || data.observations.length === 0) throw new Error(`Nincs PWS adat.`); 
                stationConfig.isOnline = true; stationConfig.data = data.observations[0]; 
                updateStationStatusUI(stationKey, 'online'); 
            } catch (error) { 
                stationConfig.isOnline = false; stationConfig.data = null; updateStationStatusUI(stationKey, 'offline'); throw error; 
            }
        }

        async function fetchGeneralConditionsData(lat, lon) { const lang = 'hu-HU'; const url = `https://api.weather.com/v3/wx/observations/current?geocode=${lat},${lon}&language=${lang}&format=json&apiKey=${weatherComApiKey}&units=m`; const response = await fetch(url); if (!response.ok) { throw new Error(`API hiba (Ált. időjárás): ${response.status}`); } const data = await response.json(); lastApiCallTimes.generalConditions = Date.now(); return { skyCoverPhrase: data.cloudCoverPhrase || data.wxPhraseLong || null, pressureAltimeter: data.pressureAltimeter ?? data.pressureMeanSeaLevel, visibility: data.visibility, dayOrNight: data.dayOrNight, pressureTendencyCode: data.pressureTendencyCode ?? (data.pressureChange !== null && typeof data.pressureChange !== 'undefined' ? (data.pressureChange > 0 ? 0 : (data.pressureChange < 0 ? 1 : 2)) : null), uvDescription: data.uvDescription || null, sunriseTimeLocal: data.sunriseTimeLocal, sunsetTimeLocal: data.sunsetTimeLocal }; }
        
        async function fetchHourlyForecastData(lat, lon) {
            const url = `https://api.weather.com/v3/wx/forecast/hourly/3day?geocode=${lat},${lon}&format=json&units=m&language=hu-HU&apiKey=${weatherComApiKey}`;
            try { const response = await fetch(url); if (!response.ok) throw new Error(`Órás előrejelzés API hiba: ${response.status}`); const data = await response.json(); if (!data || !data.validTimeLocal) { throw new Error('Hiányos órás előrejelzési adatok.'); }
                const hourlyForecasts = []; const now = new Date();
                let startIndex = data.validTimeLocal.findIndex(timeStr => new Date(timeStr) > now);
                if (startIndex === -1) { startIndex = data.validTimeLocal.length > 0 ? data.validTimeLocal.length -1 : 0; } else if (startIndex > 0) { const prevTime = new Date(data.validTimeLocal[startIndex-1]); if (now.getTime() - prevTime.getTime() < 30 * 60 * 1000) { startIndex--; } }
                for (let i = startIndex; i < startIndex + 12 && i < data.validTimeLocal.length; i++) { hourlyForecasts.push({ time: data.validTimeLocal[i], temp: data.temperature[i], iconCode: data.iconCode[i], precipChance: data.precipChance[i], dayOrNight: data.dayOrNight[i], windSpeed: data.windSpeed[i], windDirection: data.windDirection[i], humidity: data.relativeHumidity[i], uvIndex: data.uvIndex[i], wxPhraseShort: data.wxPhraseShort[i] }); }
                return hourlyForecasts;
            } catch (error) { throw error; }
        }

        async function fetchDailyForecastData(lat, lon) {
            const url = `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${lat},${lon}&format=json&units=m&language=hu-HU&apiKey=${weatherComApiKey}`;
            try {
                const response = await fetch(url); if (!response.ok) throw new Error(`Napi előrejelzés API hiba: ${response.status}`); const data = await response.json();
                if (data && data.daypart && data.daypart.length >= 2) {
                    const forecasts = [];
                    for(let i=0; i < data.daypart[0].temperature.length; i++) {
                       forecasts.push({ tempMax: data.daypart[0].temperature[i], tempMin: data.daypart[1].temperature[i], precipTotal: (data.daypart[0].qpf[i] || 0) + (data.daypart[1].qpf[i] || 0) });
                    } return forecasts;
                } return null;
            } catch (error) { console.warn(`Napi előrejelzés hiba: ${error.message}`); return null; }
        }

        function findNextPrecipitationEvent(hourlyData) {
            if (!hourlyData || hourlyData.length === 0) return null;
            const stormKeywords = ['vihar', 'zivatar'], rainKeywords = ['eső', 'zápor'], snowKeywords = ['hó', 'havazás', 'hózápor'];
            for (const hour of hourlyData) {
                if (new Date(hour.time) < new Date()) continue;
                if (hour.precipChance >= PRECIP_THRESHOLD) {
                    const phrase = (hour.wxPhraseShort || '').toLowerCase(); let type = 'Csapadék';
                    if (stormKeywords.some(keyword => phrase.includes(keyword))) { type = 'Vihar'; } else if (rainKeywords.some(keyword => phrase.includes(keyword))) { type = 'Eső'; } else if (snowKeywords.some(keyword => phrase.includes(keyword))) { type = 'Hó'; }
                    return { time: hour.time, chance: hour.precipChance, type: type, phrase: hour.wxPhraseShort };
                }
            } return null;
        }

        function initializeWeatherDisplayDOM() {
            const tooltipContent = `<strong>Panel Információ</strong>
            <p>Ez a felület egy személyes projekt, melyet Robi készített AI segítségével azzal a céllal, hogy egy modern és részletes időjárás-megjelenítőt hozzon létre Nyíregyháza számára.</p>
            <strong>Hogyan Működik?</strong>
            <p>Az oldal egy dinamikus, egyoldalas alkalmazás (SPA), ami azt jelenti, hogy a tartalom frissül anélkül, hogy az egész oldalt újra kellene tölteni. Különböző internetes szolgáltatásoktól (API-któl) kér le adatokat, és ezek alapján építi fel a megjelenített paneleket.</p>
            <strong>Adatforrások Részletesen:</strong>
            <ul>
                <li><b>Helyi adatok:</b> A Weather.com személyes időjárás-állomás (PWS) hálózatából származnak. Ezek a Nyíregyházán és környékén található amatőr meteorológiai állomások (pl. a Nyíregyházi úton vagy a Honvéd utcán) által mért, szinte élő adatok (hőmérséklet, csapadék, szél stb.).</li>
                <li><b>Előrejelzés:</b> Szintén a Weather.com szolgáltatja az órás és napi előrejelzési adatokat.</li>
                <li><b>Levegő & Pollen:</b> Az Open-Meteo API-ból érkeznek a levegőminőségi (PM10, PM2.5), ózon- és pollenterhelési (parlagfű, fűfélék) adatok.</li>
                <li><b>Csillagászat:</b> A Nap és a Hold pontos helyzetét, a kelési és nyugvási időket, valamint a holdfázist a böngésző helyben, a <i>SunCalc.js</i> könyvtár segítségével számolja ki a földrajzi koordináták és a pontos idő alapján.</li>
                <li><b>Űrállomás (ISS):</b> Ha engedélyezve van, a N2YO.com API-n keresztül kérdezi le a Nemzetközi Űrállomás következő, Nyíregyháza felett látható áthaladásainak idejét és pályáját.</li>
            </ul>
            <strong>Dinamikus Felület:</strong>
            <ul>
                <li><b>Napszak-követés:</b> A háttér és a színek egy 12 fázisú ciklus szerint változnak, követve a nap útját a hajnali kék órától az aranyórán és a déli ragyogáson át az alkonyatig és a csillagos éjszakáig.</li>
                <li><b>Intelligens Panelek:</b> A fő információs panel (a hőmérséklet alatt) a napszaknak megfelelően változik: nappal a Nap, éjjel a Hold adatait mutatja. Ha mindkettő a horizont alatt van, felváltva jelenít meg érdekességeket az aktuális éjszakai égboltról (bolygók, csillagképek, ISS) és a levegőminőségi adatokat.</li>
            </ul>
            <strong>Frissítési Idők:</strong>
            <ul>
                <li>Mérőállomások: ${REFRESH_INTERVAL_PWS / 1000} másodpercenként</li>
                <li>Előrejelzés: ${REFRESH_INTERVAL_FORECAST / 60000} percenként</li>
                <li>Levegő & Pollen: ${REFRESH_INTERVAL_AIR_QUALITY / 60000} percenként</li>
            </ul>
            <p>A projekt célja egy informatív, mégis esztétikus és szórakoztató felület létrehozása volt. © 2025 Copyright by: Robi</p>`;
            const celestialArcPathV2 = "M 30 125 A 110 110 0 0 1 250 125";
            
            weatherDisplayEl.innerHTML = `<div class="widget-header">
                <div class="header-container"><div class="location-title" id="location-title-text">Nyíregyháza</div><div class="station-subtitle" id="station-subtitle-text">Állomás kiválasztása...</div></div>
                <div class="timestamp-container"><span class="timestamp" id="timestamp-text">Megfigyelés: --:--:--</span><div class="info-tooltip-container"><i class="fas fa-info-circle"></i><div class="info-tooltip-content">${tooltipContent}</div></div></div>
                <div class="copyright-notice">Az időjárás monitort készítette: Robi  © 2025 Copyright by: Robi</div>
            </div>
            <div class="station-status-container">
                 <div class="station-selector" id="nyiregyhazi-ut-selector-container"><label for="station-select-nyiregyhazi-ut"><input type="radio" name="station-select" id="station-select-nyiregyhazi-ut" value="NYIREGYHAZI_UT"><span class="station-name">${STATIONS.NYIREGYHAZI_UT.displayName}</span><div id="nyiregyhazi-ut-status-text" class="station-status-text">állapot ?</div></label></div>
                 <div class="station-selector" id="kossuth-selector-container"><label for="station-select-kossuth"><input type="radio" name="station-select" id="station-select-kossuth" value="KOSSUTH"><span class="station-name">${STATIONS.KOSSUTH.displayName}</span><div id="kossuth-status-text" class="station-status-text">állapot ?</div></label></div>
                 <div class="station-selector" id="honved-selector-container"><label for="station-select-honved"><input type="radio" name="station-select" id="station-select-honved" value="HONVED"><span class="station-name">${STATIONS.HONVED.displayName}</span><div id="honved-status-text" class="station-status-text">állapot ?</div></label></div>
            </div>
            
            <div class="top-info-cards-container">
                <div class="info-card temp-card">
                    <div class="card-label">
                        <span>Jelenleg</span>
                        <span id="current-temp-status-dot" class="status-dot"></span>
                        <span id="current-temp-live-tag" class="live-tag is-hidden">ÉLŐ</span>
                    </div>
                    <div class="card-main-value">
                        <span id="top-temp-card-value" class="flippable-value">--</span><span id="top-temp-trend-arrow" class="temp-trend-arrow"></span>°C<span id="top-temp-precip-icon" class="precip-icon"></span>
                    </div>
                </div>
                <div class="info-card sensation-card">
                    <div class="sensation-list">
                        <div class="sensation-item">
                            <i class="icon fas fa-temperature-half"></i>
                            <div class="text-content">
                                <span class="label">Hőérzet:</span>
                                <span id="card-heat-index-value" class="value">--°C</span>
                                <span id="card-heat-index-desc" class="description">--</span>
                            </div>
                        </div>
                        <div class="sensation-item">
                            <i class="icon fas fa-wind"></i>
                            <div class="text-content">
                                <span class="label">Szél:</span>
                                <span id="card-wind-value" class="value">-- km/h</span>
                                <span id="card-wind-desc" class="description">--</span>
                            </div>
                        </div>
                        <div class="sensation-item">
                            <i class="icon fas fa-burst"></i>
                            <div class="text-content">
                                <span class="label">Széllökés:</span>
                                <span id="card-gust-value" class="value">-- km/h</span>
                                <span id="card-gust-desc" class="description">--</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="main-info-wrapper">
                <div class="sun-info-section is-hidden" id="sun-info-section">
                    <div class="celestial-path-visual-v2" id="sun-path-visual">
                        <svg class="celestial-path-svg-v2" viewBox="0 0 280 165">
                            <defs><linearGradient id="sun-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#F97316;stop-opacity:1" /><stop offset="50%" style="stop-color:#FBBF24;stop-opacity:1" /><stop offset="100%" style="stop-color:#F97316;stop-opacity:1" /></linearGradient></defs>
                            <path class="path-arc-bg-v2" d="${celestialArcPathV2}"></path><path id="sun-path-arc-main" class="path-arc-main-v2" d="${celestialArcPathV2}" stroke="url(#sun-arc-gradient)"></path>
                        </svg>
                        <div class="path-ground-v2"><div class="path-label-v2 sunrise-label"><span>Napkelte</span><div id="sun-path-sunrise-time" class="path-time-v2">--:--</div></div><div class="path-label-v2 sunset-label"><span>Napnyugta</span><div id="sun-path-sunset-time" class="path-time-v2">--:--</div></div></div>
                        <div id="sun-path-icon-v2" class="celestial-body-icon-v2"></div>
                        <div class="celestial-event-container-v2 is-hidden" id="sun-event-container"><div class="celestial-event-message-v2" id="sun-event-message"></div><div class="celestial-event-countdown-v2" id="sun-event-countdown"></div></div>
                    </div>
                    <div class="sun-text-details">
                        <div class="sun-detail-item"><span class="sun-detail-label"><i class="fas fa-ruler-vertical"></i>Magasság</span><span id="sun-info-altitude" class="sun-detail-value">--°<span id="sun-info-trend" class="sun-trend-text"></span><i id="sun-path-refresh-btn" class="fas fa-sync-alt path-refresh-btn" title="Pozíció frissítése"></i></span></div>
                        <div class="sun-detail-item"><span class="sun-detail-label"><i class="far fa-compass"></i>Irány</span><span id="sun-info-azimuth" class="sun-detail-value">--</span></div>
                        <div class="sun-detail-item"><span class="sun-detail-label"><i class="fas fa-clock"></i>Delelés</span><span id="sun-info-noon" class="sun-detail-value">--:--</span></div>
                        <div class="sun-detail-item"><span class="sun-detail-label"><i class="fas fa-hourglass-half"></i>Napfény</span><span id="sun-info-remaining" class="sun-detail-value">--</span></div>
                    </div>
                </div>
                <div class="moon-info-section is-hidden" id="moon-info-section">
                    <div class="celestial-path-visual-v2" id="moon-path-visual">
                         <svg class="celestial-path-svg-v2" viewBox="0 0 280 165"><path class="path-arc-bg-v2" d="${celestialArcPathV2}"></path><path id="moon-path-arc-main" class="path-arc-main-v2" d="${celestialArcPathV2}" stroke="var(--text-secondary-night)"></path></svg>
                        <div class="path-ground-v2"><div class="path-label-v2 sunrise-label"><span>Holdkelte</span><div id="moonrise-time-label" class="path-time-v2">--:--</div></div><div class="path-label-v2 sunset-label"><span>Holdnyugta</span><div id="moonset-time-label" class="path-time-v2">--:--</div></div></div>
                        <div id="moon-path-icon-v2" class="celestial-body-icon-v2"></div>
                        <div class="celestial-event-container-v2 is-hidden" id="moon-event-container"><div class="celestial-event-message-v2" id="moon-event-message"></div><div class="celestial-event-countdown-v2" id="moon-event-countdown"></div></div>
                    </div>
                    <div class="moon-text-details"><div class="moon-detail-item"><span class="moon-detail-label"><i class="fas fa-ruler-vertical"></i>Magasság</span><span id="moon-info-altitude" class="sun-detail-value">--°<span id="moon-info-trend" class="sun-trend-text"></span><i id="moon-path-refresh-btn" class="fas fa-sync-alt path-refresh-btn" title="Pozíció frissítése"></i></span></div><div class="moon-detail-item"><span class="moon-detail-label"><i class="fas fa-circle-half-stroke"></i>Fázis</span><span id="moon-info-phasename" class="moon-detail-value">--</span></div><div class="moon-detail-item"><span class="moon-detail-label"><i class="fas fa-lightbulb"></i>Megvilágítás</span><span id="moon-info-illumination" class="moon-detail-value">--%</span></div></div>
                </div>
                <div class="night-sky-info-section is-hidden" id="night-sky-info-section">
                    <div id="iss-info" class="is-hidden" style="display: flex; align-items: center; gap: 20px;"><div class="night-sky-visual"><i id="iss-visual-icon" class="fas fa-satellite"></i></div><div class="night-sky-text-details"><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-rocket"></i>Objektum</span><span class="night-sky-detail-value">Nemzetközi Űrállomás</span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-stopwatch"></i>Következő</span><span class="night-sky-detail-value" id="iss-next-pass-time">--:--</span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-sort-amount-up-alt"></i>Max. magasság</span><span class="night-sky-detail-value" id="iss-max-elevation">--°</span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="far fa-lightbulb"></i>Fényesség</span><span class="night-sky-detail-value" id="iss-brightness">-- mag</span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-hourglass-half"></i>Láthatóság</span><span class="night-sky-detail-value" id="iss-duration">-- perc</span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-route"></i>Útvonal</span><span class="night-sky-detail-value long-text" id="iss-path-details">--</span></div></div></div>
                    <div id="planet-info" class="is-hidden" style="display: flex; align-items: center; gap: 20px;"><div class="night-sky-visual"><i id="night-sky-visual-icon" class=""></i></div><div class="night-sky-text-details"><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-satellite-dish"></i>Objektum</span><span class="night-sky-detail-value" id="night-sky-object-name"></span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-eye"></i></span><span class="night-sky-detail-value long-text" id="night-sky-object-status"></span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-info-circle"></i></span><span class="night-sky-detail-value long-text" id="night-sky-object-details"></span></div><div class="night-sky-detail-item is-hidden" id="night-sky-astro-darkness-item-planet"><span class="night-sky-detail-label"></span><span class="night-sky-detail-value long-text" id="night-sky-astro-darkness-planet"></span></div></div></div>
                    <div id="constellation-info" class="is-hidden" style="display: flex; align-items: center; gap: 20px;"><div id="constellation-svg-container" style="flex-shrink: 0;"></div><div class="night-sky-text-details"><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-star"></i>Csillagkép</span><span class="night-sky-detail-value" id="constellation-name"></span></div><div class="night-sky-detail-item"><span class="night-sky-detail-label"><i class="fas fa-info-circle"></i></span><span class="night-sky-detail-value long-text" id="constellation-details"></span></div><div class="night-sky-detail-item is-hidden" id="constellation-astro-darkness-item-const"><span class="night-sky-detail-label"></span><span class="night-sky-detail-value long-text" id="constellation-astro-darkness-const"></span></div></div></div>
                </div>
                <div class="air-quality-info-section is-hidden" id="air-quality-info-section">
                    <div class="air-quality-title">Pollen és Levegőminőség</div><div class="air-quality-grid"><div class="air-quality-item"><span class="air-quality-label"><i class="fas fa-wind"></i>Levegőmin. Index</span><div class="air-quality-value-container"><span id="aqi-value" class="air-quality-value">--</span></div><span id="aqi-description" class="air-quality-description">--</span></div><div class="air-quality-item"><span class="air-quality-label"><i class="fas fa-smog"></i>Szálló por (PM10)</span><div class="air-quality-value-container"><span id="pm10-value" class="air-quality-value">--</span><span class="air-quality-value-unit">µg/m³</span></div></div><div class="air-quality-item"><span class="air-quality-label"><i class="fas fa-smog"></i>Szálló por (PM2.5)</span><div class="air-quality-value-container"><span id="pm25-value" class="air-quality-value">--</span><span class="air-quality-value-unit">µg/m³</span></div></div><div class="air-quality-item"><span class="air-quality-label"><i class="fas fa-sun-haze"></i>Ózon (O₃)</span><div class="air-quality-value-container"><span id="ozone-value" class="air-quality-value">--</span><span class="air-quality-value-unit">µg/m³</span></div></div><div class="air-quality-item"><span class="air-quality-label"><i class="fas fa-leaf"></i>Parlagfű Pollen</span><div class="air-quality-value-container"><span id="ragweed-pollen-value" class="air-quality-value">--</span></div><span id="ragweed-pollen-description" class="air-quality-description">--</span></div><div class="air-quality-item"><span class="air-quality-label"><i class="fas fa-leaf"></i>Fű Pollen</span><div class="air-quality-value-container"><span id="grass-pollen-value" class="air-quality-value">--</span></div><span id="grass-pollen-description" class="air-quality-description">--</span></div></div>
                </div>
            </div>
            
            <div class="regional-precip-section" id="regional-precip-section">
                <h3><i class="fas fa-map-marked-alt"></i>Regionális Csapadék Adatok</h3>
                <div class="regional-precip-grid" id="regional-precip-grid"></div>
            </div>

            <div class="precipitation-forecast-info is-hidden" id="precipitation-forecast-bar"><div id="next-precipitation-info-text"></div><div id="next-precipitation-details-text" class="is-hidden"></div></div>

            <div class="weather-details-grid"><div class="detail-item"><span class="label"><i class="fas fa-tint"></i>Harmatpont:</span><span class="value"><span id="dewpoint-value" class="flippable-value">--</span>°C</span></div><div class="detail-item"><span class="label"><i class="fas fa-percentage"></i>Páratartalom:</span><span class="value"><span id="humidity-value" class="flippable-value">--</span>%</span></div><div class="detail-item"><span class="label"><i class="fas fa-ruler-combined"></i>Légnyomás:</span><span class="value"><span id="pressure-value" class="flippable-value">--</span> hPa<span class="pressure-trend-icon" id="pressure-trend-icon"></span></span></div><div class="detail-item"><span class="label"><i class="fas fa-eye"></i>Látótávolság:</span><span class="value"><span id="visibility-value" class="flippable-value">--</span> km</span></div><div class="detail-item"><span class="label"><i class="fas fa-sun"></i>Napsugárzás:</span><span class="value"><span id="solar-radiation-value" class="flippable-value">--</span> W/m²</span></div><div class="detail-item"><span class="label"><i class="fas fa-umbrella-beach"></i>UV Index:</span><span class="value"><span id="uv-index-value" class="flippable-value">--</span><span class="uv-description-text" id="uv-description"></span></span></div><div class="detail-item" id="grid-sunrise-item"><span class="label"><i class="fas fa-sun"></i>Napkelte:</span><span class="value" id="details-sunrise-value"></span></div><div class="detail-item" id="grid-sunset-item"><span class="label"><i class="fas fa-sun"></i>Napnyugta:</span><span class="value" id="details-sunset-value"></span></div><div class="detail-item" id="grid-moonrise-item"><span class="label"><i class="fas fa-moon"></i>Holdkelte:</span><span class="value" id="moonrise-value"></span></div><div class="detail-item" id="grid-moonset-item"><span class="label"><i class="fas fa-moon"></i>Holdnyugta:</span><span class="value" id="moonset-value"></span></div></div>`;
            
            el_stationSubtitleText = document.getElementById('station-subtitle-text');
            el_timestampText = document.getElementById('timestamp-text');
            el_sunInfoSection = document.getElementById('sun-info-section');
            el_moonInfoSection = document.getElementById('moon-info-section');
            el_nightSkyInfoSection = document.getElementById('night-sky-info-section');
            el_airQualityInfoSection = document.getElementById('air-quality-info-section');
            el_gridSunriseItem = document.getElementById('grid-sunrise-item');
            el_gridSunsetItem = document.getElementById('grid-sunset-item');
            el_gridMoonriseItem = document.getElementById('grid-moonrise-item');
            el_gridMoonsetItem = document.getElementById('grid-moonset-item');
            
            el_regionalPrecipGrid = document.getElementById('regional-precip-grid');

            el_sunPathVisual = document.getElementById('sun-path-visual');
            el_sunPathIcon = document.getElementById('sun-path-icon-v2');
            el_sunPathArcMain = document.getElementById('sun-path-arc-main');
            el_sunInfoAltitude = document.getElementById('sun-info-altitude');
            el_sunInfoAzimuth = document.getElementById('sun-info-azimuth');
            el_sunInfoTrend = document.getElementById('sun-info-trend');
            el_sunInfoNoon = document.getElementById('sun-info-noon');
            el_sunInfoRemaining = document.getElementById('sun-info-remaining');
            el_sunPathSunriseTime = document.getElementById('sun-path-sunrise-time');
            el_sunPathSunsetTime = document.getElementById('sun-path-sunset-time');
            el_sunPathRefreshBtn = document.getElementById('sun-path-refresh-btn');
            
            el_moonPathVisual = document.getElementById('moon-path-visual');
            el_moonPathIcon = document.getElementById('moon-path-icon-v2');
            el_moonPathArcMain = document.getElementById('moon-path-arc-main');
            el_moonriseTimeLabel = document.getElementById('moonrise-time-label');
            el_moonsetTimeLabel = document.getElementById('moonset-time-label');
            el_moonInfoAltitude = document.getElementById('moon-info-altitude');
            el_moonInfoTrend = document.getElementById('moon-info-trend');
            el_moonInfoPhasename = document.getElementById('moon-info-phasename');
            el_moonInfoIllumination = document.getElementById('moon-info-illumination');
            el_moonPathRefreshBtn = document.getElementById('moon-path-refresh-btn');
            
            el_sunEventContainer = document.getElementById('sun-event-container');
            el_sunEventMessage = document.getElementById('sun-event-message');
            el_sunEventCountdown = document.getElementById('sun-event-countdown');

            el_moonEventContainer = document.getElementById('moon-event-container');
            el_moonEventMessage = document.getElementById('moon-event-message');
            el_moonEventCountdown = document.getElementById('moon-event-countdown');

            el_issInfo = document.getElementById('iss-info'); el_planetInfo = document.getElementById('planet-info'); el_constellationInfo = document.getElementById('constellation-info');
            el_issVisualIcon = document.getElementById('iss-visual-icon'); el_issNextPassTime = document.getElementById('iss-next-pass-time'); el_issMaxElevation = document.getElementById('iss-max-elevation'); el_issDuration = document.getElementById('iss-duration'); el_issBrightness = document.getElementById('iss-brightness'); el_issPathDetails = document.getElementById('iss-path-details');
            el_nightSkyVisualIcon = document.getElementById('night-sky-visual-icon'); el_nightSkyObjectName = document.getElementById('night-sky-object-name'); el_nightSkyObjectStatus = document.getElementById('night-sky-object-status'); el_nightSkyObjectDetails = document.getElementById('night-sky-object-details'); el_nightSkyAstroDarknessItemPlanet = document.getElementById('night-sky-astro-darkness-item-planet'); el_nightSkyAstroDarknessPlanet = document.getElementById('night-sky-astro-darkness-planet');
            el_constellationSvgContainer = document.getElementById('constellation-svg-container'); el_constellationName = document.getElementById('constellation-name'); el_constellationDetails = document.getElementById('constellation-details'); el_constellationAstroDarknessItemConst = document.getElementById('constellation-astro-darkness-item-const'); el_constellationAstroDarknessConst = document.getElementById('constellation-astro-darkness-const');
            
            el_topTempCardValue = document.getElementById('top-temp-card-value');
            
            el_currentTempStatusDot = document.getElementById('current-temp-status-dot');
            el_currentTempLiveTag = document.getElementById('current-temp-live-tag');
            el_topTempTrendArrow = document.getElementById('top-temp-trend-arrow');
            el_topTempPrecipIcon = document.getElementById('top-temp-precip-icon');

            el_cardHeatIndexValue = document.getElementById('card-heat-index-value');
            el_cardHeatIndexDesc = document.getElementById('card-heat-index-desc');
            el_cardWindValue = document.getElementById('card-wind-value');
            el_cardWindDesc = document.getElementById('card-wind-desc');
            el_cardGustValue = document.getElementById('card-gust-value');
            el_cardGustDesc = document.getElementById('card-gust-desc');
            
            el_dewpointValue = document.getElementById('dewpoint-value'); el_humidityValue = document.getElementById('humidity-value'); el_pressureValue = document.getElementById('pressure-value'); el_pressureTrendIcon = document.getElementById('pressure-trend-icon');
            el_visibilityValue = document.getElementById('visibility-value'); el_solarRadiationValue = document.getElementById('solar-radiation-value'); el_uvIndexValue = document.getElementById('uv-index-value'); el_uvDescription = document.getElementById('uv-description');
            el_detailsSunriseValue = document.getElementById('details-sunrise-value'); el_detailsSunsetValue = document.getElementById('details-sunset-value'); el_moonriseValue = document.getElementById('moonrise-value'); el_moonsetValue = document.getElementById('moonset-value');
            el_precipitationForecastBar = document.getElementById('precipitation-forecast-bar'); el_nextPrecipitationInfoText = document.getElementById('next-precipitation-info-text'); el_nextPrecipitationDetailsText = document.getElementById('next-precipitation-details-text');
            
            el_aqiValue = document.getElementById('aqi-value'); el_aqiDescription = document.getElementById('aqi-description'); el_pm10Value = document.getElementById('pm10-value'); el_pm25Value = document.getElementById('pm25-value'); el_ozoneValue = document.getElementById('ozone-value');
            el_ragweedPollenValue = document.getElementById('ragweed-pollen-value'); el_grassPollenValue = document.getElementById('grass-pollen-value');
            el_ragweedPollenDescription = document.getElementById('ragweed-pollen-description'); el_grassPollenDescription = document.getElementById('grass-pollen-description');
            
            addStationChangeListeners();
            isWeatherDisplayInitialized = true;
        }

        function updateStationStatusUI(stationKey, status = 'unknown') {
            const stationConfig = STATIONS[stationKey]; if (!stationConfig) return;
            const lowerCaseKey = stationKey.toLowerCase().replace(/_/g, '-');
            const textEl = document.getElementById(`${lowerCaseKey}-status-text`);
            const radioEl = document.getElementById(`station-select-${lowerCaseKey}`);
            const selectorContainerEl = document.getElementById(`${lowerCaseKey}-selector-container`);
            
            if (!textEl || !radioEl || !selectorContainerEl) return;
            
            if (status === 'online') textEl.textContent = 'üzemel'; else if (status === 'offline') textEl.textContent = 'nem üzemel'; else textEl.textContent = 'állapot ?';
            radioEl.checked = (stationKey === activeDisplayStationKey); radioEl.disabled = !stationConfig.isOnline; selectorContainerEl.classList.toggle('disabled', !stationConfig.isOnline);
        }

        function addStationChangeListeners() { document.querySelectorAll('input[name="station-select"]').forEach(radio => radio.addEventListener('change', handleStationChange)); }
        function handleStationChange(event) {
            const selectedStationKey = event.target.value; if (STATIONS[selectedStationKey].isOnline && selectedStationKey !== activeDisplayStationKey) { activeDisplayStationKey = selectedStationKey; compileAndRenderDisplayData(); } else if (!STATIONS[selectedStationKey].isOnline) { event.target.checked = false; document.querySelector(`input[value="${activeDisplayStationKey}"]`).checked = true; }
        }

        function getPreferredStationData(dataType) {
            const priorityOrder = { precip: ['KOSSUTH', 'NYIREGYHAZI_UT'], wind: ['KOSSUTH', 'HONVED'] };
            const order = priorityOrder[dataType];
            if (!order) return null;
            for (const stationKey of order) {
                const station = STATIONS[stationKey];
                if (station && station.isOnline && station.provides.includes(dataType) && station.data) return station.data;
            } return null;
        }

        function compileAndRenderDisplayData() {
            const activeStationConfig = STATIONS[activeDisplayStationKey];
            if (!activeStationConfig.data) { if (weatherDisplayEl) weatherDisplayEl.innerHTML = `<div class="loading" style="padding: 20px; text-align: center; color: var(--current-text-color);">⚠️ Az aktív állomás (${activeStationConfig.displayName}) adatai nem érhetők el.</div>`; return; }
            cachedData.displayPws = { ...activeStationConfig.data.metric, ...activeStationConfig.data };
            const precipDataSource = getPreferredStationData('precip'); const windDataSource = getPreferredStationData('wind');
            if (precipDataSource && precipDataSource.metric) { cachedData.displayPws.precipTotal = precipDataSource.metric.precipTotal; cachedData.displayPws.precipRate = precipDataSource.metric.precipRate; }
            if (windDataSource && windDataSource.metric) { cachedData.displayPws.windSpeed = windDataSource.metric.windSpeed; cachedData.displayPws.windGust = windDataSource.metric.windGust; cachedData.displayPws.winddir = windDataSource.winddir; }
            renderWeatherData();
            renderHourlyForecastData();
            renderAirQualityData();
            renderRegionalPrecipitation();
        }

        function updateAnimatedValue(element, newValue) {
            if (!element) return;
            if (element.textContent.trim() !== newValue.trim()) { 
                if (!element.classList.contains('is-flipping')) { 
                    element.classList.add('is-flipping'); 
                    setTimeout(() => { element.textContent = newValue; element.classList.remove('is-flipping'); }, 300); 
                } 
            }
        }
        
        function renderPrecipitationForecastInfo() {
            if (!el_precipitationForecastBar || !el_nextPrecipitationInfoText || !el_nextPrecipitationDetailsText) return;
            const nextEvent = findNextPrecipitationEvent(cachedData.hourlyForecast);
            if (nextEvent) {
                const dateText = formatPrecipitationDate(nextEvent.time), timeText = formatTime(nextEvent.time);
                el_nextPrecipitationInfoText.innerHTML = `Várható csapadék leghamarabb <strong>${dateText} ${timeText}</strong> (${formatValue(nextEvent.chance, '%', 0)} eséllyel)`;
                let detailsHTML = ''; if (nextEvent.phrase) detailsHTML += `Jelleg: <strong>${nextEvent.phrase}</strong>`;
                if (cachedData.dailyForecasts && cachedData.dailyForecasts[0] && cachedData.dailyForecasts[0].precipTotal > 0) { if (detailsHTML !== '') detailsHTML += '<br>'; detailsHTML += `Ma összesen <strong>${formatValue(cachedData.dailyForecasts[0].precipTotal, ' mm', 1)}</strong>-t várunk.`; }
                if (detailsHTML) { el_nextPrecipitationDetailsText.innerHTML = detailsHTML; el_nextPrecipitationDetailsText.classList.remove('is-hidden'); } 
                else { el_nextPrecipitationDetailsText.classList.add('is-hidden'); }
                el_precipitationForecastBar.classList.remove('is-hidden');
            } else if (cachedData.hourlyForecast && cachedData.hourlyForecast.length > 0) { el_nextPrecipitationInfoText.textContent = "A következő órákban nem várható jelentős csapadék."; el_nextPrecipitationDetailsText.classList.add('is-hidden'); el_precipitationForecastBar.classList.remove('is-hidden'); } 
            else { el_precipitationForecastBar.classList.add('is-hidden'); el_nextPrecipitationInfoText.textContent = "Csapadék előrejelzés jelenleg nem elérhető."; el_nextPrecipitationDetailsText.classList.add('is-hidden'); }
        }
        
        function getAqiDescription(aqi) { if (aqi == null) return { text: '--', className: '' }; if (aqi <= 20) return { text: 'Kiváló', className: 'level-good' }; if (aqi <= 40) return { text: 'Jó', className: 'level-good' }; if (aqi <= 60) return { text: 'Mérsékelt', className: 'level-moderate' }; if (aqi <= 80) return { text: 'Gyenge', className: 'level-unhealthy-sensitive' }; if (aqi <= 100) return { text: 'Egészségtelen', className: 'level-unhealthy' }; return { text: 'Nagyon rossz', className: 'level-very-unhealthy' }; }
        function getPollenLevel(pollenValue) { if (pollenValue == null) return { text: '--', className: '' }; if (pollenValue < 1) return { text: 'Nincs', className: 'level-good' }; if (pollenValue < 5) return { text: 'Alacsony', className: 'level-good' }; if (pollenValue < 20) return { text: 'Mérsékelt', className: 'level-moderate' }; if (pollenValue < 50) return { text: 'Magas', className: 'level-high' }; return { text: 'Nagyon magas', className: 'level-very-high' }; }

        function renderAirQualityData() {
            const aqData = cachedData.airQuality; if (!aqData || !el_airQualityInfoSection) return;
            const aqiInfo = getAqiDescription(aqData.european_aqi); el_aqiValue.textContent = formatValue(aqData.european_aqi, '', 0, '--'); el_aqiDescription.textContent = aqiInfo.text; el_aqiDescription.className = `air-quality-description ${aqiInfo.className}`;
            const ragweedInfo = getPollenLevel(aqData.ragweed_pollen); el_ragweedPollenValue.textContent = formatValue(aqData.ragweed_pollen, '', 1, '--'); el_ragweedPollenDescription.textContent = ragweedInfo.text; el_ragweedPollenDescription.className = `air-quality-description ${ragweedInfo.className}`;
            const grassInfo = getPollenLevel(aqData.grass_pollen); el_grassPollenValue.textContent = formatValue(aqData.grass_pollen, '', 1, '--'); el_grassPollenDescription.textContent = grassInfo.text; el_grassPollenDescription.className = `air-quality-description ${grassInfo.className}`;
            el_pm10Value.textContent = formatValue(aqData.pm10, '', 1, '--'); el_pm25Value.textContent = formatValue(aqData.pm2_5, '', 1, '--'); el_ozoneValue.textContent = formatValue(aqData.ozone, '', 1, '--');
        }

        function getPrecipIntensityDescription(rate) {
            if (rate == null || rate <= 0) return 'Nem esik';
            if (rate > 0 && rate <= 0.2) return 'Szitálás';
            if (rate > 0.2 && rate <= 1.0) return 'Gyenge eső';
            if (rate > 1.0 && rate <= 4.0) return 'Mérsékelt eső';
            if (rate > 4.0 && rate <= 8.0) return 'Intenzív eső';
            if (rate > 8.0 && rate <= 16.0) return 'Zápor';
            if (rate > 16.0 && rate <= 50.0) return 'Heves zápor';
            return 'Felhőszakadás';
        }

        function renderRegionalPrecipitation() {
            if (!el_regionalPrecipGrid) return;
            
            const PREFERRED_ORDER = ['KOSSUTH', 'NYIREGYHAZI_UT', 'ALLATPARK', 'SOSTOHEGY', 'SZAKOLY'];
            const now = Date.now();

            const visibleStations = Object.entries(STATIONS)
                .map(([key, station]) => ({ key, ...station }))
                .filter(station => station.provides.includes('precip') && station.isOnline && station.data && (now - new Date(station.data.obsTimeLocal).getTime() < STALE_DATA_THRESHOLD_MS));
            
            const orderedPart = [];
            const otherPart = [];

            visibleStations.forEach(station => {
                const orderIndex = PREFERRED_ORDER.indexOf(station.key);
                if (orderIndex !== -1) {
                    orderedPart[orderIndex] = station;
                } else {
                    otherPart.push(station);
                }
            });

            const sortedStations = [
                ...orderedPart.filter(Boolean), 
                ...otherPart.sort((a, b) => a.displayName.localeCompare(b.displayName, 'hu'))
            ];

            let gridHTML = '';
            if (sortedStations.length > 0) {
                sortedStations.forEach(station => {
                    let itemClass = "precip-station-item";
                    let intensityClass = "station-data intensity";
                    let intensityHTML, totalHTML;

                    const precipRate = station.data.metric?.precipRate;
                    const precipTotal = station.data.metric?.precipTotal;
                    const isRaining = precipRate > 0;
                    
                    if (isRaining) {
                        itemClass += " is-raining-highlight";
                        intensityClass += " is-raining";
                        const intensityDescription = getPrecipIntensityDescription(precipRate);
                        intensityHTML = `<span class="${intensityClass}">${intensityDescription}</span>`;
                    } else {
                        intensityHTML = `<span class="${intensityClass}">Nem esik</span>`;
                    }

                    totalHTML = `<span class="station-data total">Ma eddig: <strong>${formatValue(precipTotal, ' mm', 1)}</strong></span>`;
                    const displayName = station.key === 'KOSSUTH' ? 'Nyíregyháza Kossuth út 50' : station.displayName;

                    gridHTML += `<div class="${itemClass}">
                                    <span class="station-name">${displayName}</span>
                                    <div class="station-data-wrapper">${intensityHTML}${totalHTML}</div>
                                 </div>`;
                });
            } else {
                gridHTML = '<div style="color: var(--current-text-muted-color);">Nincs elérhető, friss adattal rendelkező csapadékmérő állomás a környéken.</div>';
            }
            el_regionalPrecipGrid.innerHTML = gridHTML;
        }

        function renderWeatherData() {
            const obs = cachedData.displayPws; const general = cachedData.generalConditions; const sunCalcData = cachedData.sunCalc; if (!obs || !general || !sunCalcData) return;
            
            const now = new Date(obs.obsTimeLocal);
            const hour = now.getHours();
            const context = {
                isDay: general.dayOrNight === 'D',
                hour: hour,
                isMorning: hour >= 6 && hour < 11,
                isLunchTime: hour >= 11 && hour < 14,
                isAfternoon: hour >= 14 && hour < 18,
                isEvening: hour >= 18 && hour < 22,
                isNight: hour >= 22 || hour < 6,
                isNearSunrise: sunCalcData.sunriseDateForPath ? Math.abs(now.getTime() - sunCalcData.sunriseDateForPath.getTime()) < 60 * 60 * 1000 : false,
                isNearSunset: sunCalcData.sunsetDateForPath ? Math.abs(now.getTime() - sunCalcData.sunsetDateForPath.getTime()) < 60 * 60 * 1000 : false,
                skyCover: (general.skyCoverPhrase || '').toLowerCase()
            };
            
            if (el_stationSubtitleText) el_stationSubtitleText.textContent = `állomás: ${STATIONS[activeDisplayStationKey].displayName}`; if (el_timestampText) el_timestampText.textContent = `Megfigyelés: ${formatTime(obs.obsTimeLocal, true)}`;
            
            if(el_topTempCardValue) {
                updateAnimatedValue(el_topTempCardValue, formatValue(obs.temp, '', 1));
                el_topTempCardValue.closest('.temp-card').style.setProperty('--current-temp-bg-color', getTemperatureColorVar(obs.temp));

                const obsTime = new Date(obs.obsTimeLocal).getTime();
                const ageInSeconds = (Date.now() - obsTime) / 1000;
                const FRESH_THRESHOLD_S = 90;
                const STALE_THRESHOLD_S = 180;
                el_currentTempStatusDot.classList.remove('fresh', 'stale', 'offline');
                if (ageInSeconds < FRESH_THRESHOLD_S) {
                    el_currentTempStatusDot.classList.add('fresh');
                    el_currentTempLiveTag.classList.remove('is-hidden');
                } else if (ageInSeconds < STALE_THRESHOLD_S) {
                    el_currentTempStatusDot.classList.add('stale');
                    el_currentTempLiveTag.classList.add('is-hidden');
                } else {
                    el_currentTempStatusDot.classList.add('offline');
                    el_currentTempLiveTag.classList.add('is-hidden');
                }

                const previousTemp = cachedData.previousTemperatures[activeDisplayStationKey];
                let trendArrow = '';
                if (typeof previousTemp === 'number' && typeof obs.temp === 'number') {
                    const diff = obs.temp - previousTemp;
                    if (diff > 0.05) trendArrow = '↑';
                    else if (diff < -0.05) trendArrow = '↓';
                    else trendArrow = '→';
                }
                el_topTempTrendArrow.textContent = trendArrow;

                const isRaining = obs.precipRate > 0;
                const isSnowing = isRaining && obs.temp < 1;
                el_topTempPrecipIcon.textContent = isRaining ? (isSnowing ? '❄️' : '💧') : '';
            }
            
            if(el_cardHeatIndexValue) el_cardHeatIndexValue.textContent = formatValue(obs.heatIndex, '°C', 1);
            if(el_cardHeatIndexDesc) el_cardHeatIndexDesc.textContent = getHeatIndexDescription(obs.heatIndex, obs.temp, context);
            
            if(el_cardWindValue) el_cardWindValue.textContent = formatValue(obs.windSpeed, ' km/h', 1);
            if(el_cardWindDesc) {
                const windDesc = getWindDescription(obs.windSpeed, obs.windGust, context);
                const windDir = degreesToCompass(obs.winddir);
                if (windDir !== '-') {
                    el_cardWindDesc.textContent = `${windDir.charAt(0).toUpperCase() + windDir.slice(1)}, ${windDesc.toLowerCase()}`;
                } else {
                    el_cardWindDesc.textContent = windDesc;
                }
            }

            if(el_cardGustValue) el_cardGustValue.textContent = formatValue(obs.windGust, ' km/h', 1);
            if(el_cardGustDesc) el_cardGustDesc.textContent = getWindGustDescription(obs.windGust, obs.windSpeed, context);
            
            el_sunInfoSection.classList.add('is-hidden');
            el_moonInfoSection.classList.add('is-hidden');
            el_nightSkyInfoSection.classList.add('is-hidden');
            el_airQualityInfoSection.classList.add('is-hidden');
            stopNightSkyRotation(); 
            
            const sunState = celestialBodyStates.sun.currentState;
            const moonState = celestialBodyStates.moon.currentState;

            if (sunState !== 'BELOW_HORIZON') { el_sunInfoSection.classList.remove('is-hidden'); } 
            else if (moonState !== 'BELOW_HORIZON') { el_moonInfoSection.classList.remove('is-hidden'); } 
            else {
                const currentHour = new Date().getHours();
                if (currentHour >= 18 && currentHour < 22) { el_airQualityInfoSection.classList.remove('is-hidden'); } 
                else { el_nightSkyInfoSection.classList.remove('is-hidden'); startNightSkyRotation(); }
            }
            
            if (el_sunInfoAltitude) el_sunInfoAltitude.innerHTML = `${formatValue(sunCalcData.sunAltitude, '°', 1)}<span id="sun-info-trend" class="sun-trend-text">(${sunCalcData.sunTrend || sunCalcData.sunStatus})</span><i id="sun-path-refresh-btn" class="fas fa-sync-alt path-refresh-btn" title="Pozíció frissítése"></i>`;
            if (el_sunInfoAzimuth) el_sunInfoAzimuth.textContent = `${sunCalcData.sunAzimuthCompass} (${formatValue(sunCalcData.sunAzimuthDegrees, '°', 0)})`; 
            if (el_sunInfoNoon) el_sunInfoNoon.textContent = sunCalcData.solarNoon; 
            if (el_sunInfoRemaining) el_sunInfoRemaining.textContent = sunCalcData.remainingDaylight; 
            if (el_sunPathSunriseTime) el_sunPathSunriseTime.textContent = sunCalcData.sunrise; 
            if (el_sunPathSunsetTime) el_sunPathSunsetTime.textContent = sunCalcData.sunset; 
            if (document.getElementById('sun-path-refresh-btn')) document.getElementById('sun-path-refresh-btn').onclick = () => { document.getElementById('sun-path-refresh-btn').classList.add('is-refreshing'); setTimeout(() => document.getElementById('sun-path-refresh-btn').classList.remove('is-refreshing'), 800); };
            
            if (el_moonriseTimeLabel) el_moonriseTimeLabel.textContent = formatTime(sunCalcData.moonRiseDateForPath); 
            if (el_moonsetTimeLabel) el_moonsetTimeLabel.textContent = formatTime(sunCalcData.moonSetDateForPath); 
            if (el_moonInfoAltitude) el_moonInfoAltitude.innerHTML = `${formatValue(sunCalcData.moonAltitude, '°', 1)}<span id="moon-info-trend" class="sun-trend-text">(${sunCalcData.moonTrend || sunCalcData.moonStatus})</span><i id="moon-path-refresh-btn" class="fas fa-sync-alt path-refresh-btn" title="Pozíció frissítése"></i>`;
            if (el_moonInfoPhasename) el_moonInfoPhasename.textContent = sunCalcData.phaseName || NO_DATA_STRING; 
            if (el_moonInfoIllumination) el_moonInfoIllumination.textContent = formatValue(sunCalcData.phaseValue, '%', 1); 
            
            if (sunCalcData && typeof sunCalcData.moonPhaseRaw === 'number') {
                updateMoonPhaseVisual(sunCalcData.moonPhaseRaw);
            }
            
            if (document.getElementById('moon-path-refresh-btn')) document.getElementById('moon-path-refresh-btn').onclick = () => { document.getElementById('moon-path-refresh-btn').classList.add('is-refreshing'); setTimeout(() => document.getElementById('moon-path-refresh-btn').classList.remove('is-refreshing'), 800); };

            if(el_gridSunriseItem) el_gridSunriseItem.classList.toggle('is-hidden', !el_sunInfoSection.classList.contains('is-hidden')); 
            if(el_gridSunsetItem) el_gridSunsetItem.classList.toggle('is-hidden', !el_sunInfoSection.classList.contains('is-hidden'));
            if(el_gridMoonriseItem) el_gridMoonriseItem.classList.toggle('is-hidden', !el_moonInfoSection.classList.contains('is-hidden')); 
            if(el_gridMoonsetItem) el_gridMoonsetItem.classList.toggle('is-hidden', !el_moonInfoSection.classList.contains('is-hidden'));
            
            updateAnimatedValue(el_dewpointValue, formatValue(obs.dewpt, '', 1)); 
            updateAnimatedValue(el_humidityValue, formatValue(obs.humidity, '', 0)); 
            updateAnimatedValue(el_pressureValue, formatValue(general.pressureAltimeter || obs.pressure, '', 0));
            const trendCode = general.pressureTendencyCode; let trendSymbol = ''; if (trendCode === 0) trendSymbol = '↑'; else if (trendCode === 1) trendSymbol = '↓'; else if (trendCode === 2) trendSymbol = '→'; if(el_pressureTrendIcon) el_pressureTrendIcon.textContent = trendSymbol;
            updateAnimatedValue(el_visibilityValue, formatValue(general.visibility, '', 1)); 
            updateAnimatedValue(el_solarRadiationValue, formatValue(obs.solarRadiation, '', 0)); 
            updateAnimatedValue(el_uvIndexValue, formatValue(obs.uv, '', 1));
            
            if(el_uvDescription) el_uvDescription.textContent = getUVDescription(obs.uv);
            if(el_detailsSunriseValue) el_detailsSunriseValue.textContent = sunCalcData.sunrise; if(el_detailsSunsetValue) el_detailsSunsetValue.textContent = sunCalcData.sunset;
            if(el_moonriseValue) el_moonriseValue.textContent = sunCalcData.moonrise || '--'; if(el_moonsetValue) el_moonsetValue.textContent = sunCalcData.moonset || '--';
            renderPrecipitationForecastInfo();
        }
        
        function getTemperatureColorVar(temp) { if (temp === null || isNaN(temp)) return 'var(--mild)'; if (temp >= 35) return 'var(--hot)'; if (temp >= 25) return 'var(--warm)'; if (temp >= 10) return 'var(--mild)'; if (temp >= 0) return 'var(--cool)'; return 'var(--cold)'; }
        
        function mapTwcIconToFontAwesome(iconCode, dayOrNight) { const isDay = dayOrNight === 'D'; const iconMap = { 32: 'fas fa-sun', 36: 'fas fa-sun', 31: 'fas fa-moon', 33: 'fas fa-moon', 34: isDay ? 'fas fa-sun' : 'fas fa-cloud-moon', 29: isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon', 30: isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon', 27: 'fas fa-cloud', 28: 'fas fa-cloud', 26: 'fas fa-cloud', 11: 'fas fa-cloud-showers-heavy', 12: 'fas fa-cloud-showers-heavy', 40: 'fas fa-cloud-showers-heavy', 39: isDay ? 'fas fa-cloud-sun-rain' : 'fas fa-cloud-moon-rain', 45: isDay ? 'fas fa-cloud-sun-rain' : 'fas fa-cloud-moon-rain', 3: 'fas fa-cloud-bolt', 4: 'fas fa-cloud-bolt', 37: 'fas fa-cloud-bolt', 38: 'fas fa-cloud-bolt', 47: 'fas fa-cloud-bolt', 5: 'fas fa-snowflake', 6: 'fas fa-snowflake', 7: 'fas fa-snowflake', 8: 'fas fa-snowflake', 10: 'fas fa-cloud-sleet', 18: 'fas fa-smog', 13: 'fas fa-snowflake', 14: 'fas fa-snowflake', 15: 'fas fa-snowflake', 16: 'fas fa-snowflake', 41: 'fas fa-snowflake', 42: 'fas fa-snowflake', 43: 'fas fa-snowflake', 46: 'fas fa-snowflake', 9: 'fas fa-cloud-rain', 19: 'fas fa-smog', 20: 'fas fa-smog', 21: 'fas fa-smog', 22: 'fas fa-smog', 23: 'fas fa-wind', 24: 'fas fa-wind' }; return iconMap[iconCode] || 'fas fa-question-circle'; }
        function mapIconCodeToHungarianText(iconCode, dayOrNight) { const isDay = dayOrNight === 'D'; const textMap = { 32: 'Napos', 36: 'Napos', 31: 'Tiszta ég', 33: 'Tiszta ég', 34: isDay ? 'Részben napos' : 'Részben felhős', 29: isDay ? 'Részben napos' : 'Részben felhős', 30: isDay ? 'Részben napos' : 'Részben felhős', 27: 'Felhős', 28: 'Felhős', 26: 'Borult', 11: 'Zápor', 12: 'Zápor', 40: 'Zápor', 39: isDay ? 'Zápor' : 'Éjjeli zápor', 45: isDay ? 'Zápor' : 'Éjjeli zápor', 3: 'Zivatar', 4: 'Zivatar', 37: 'Zivatar', 38: 'Zivatar', 47: 'Zivatar', 5: 'Havas eső', 6: 'Ónos eső', 7: 'Havas eső', 8: 'Ónos eső', 10: 'Ónos eső', 18: 'Havas eső', 13: 'Hózápor', 14: 'Hózápor', 15: 'Hófúvás', 16: 'Havazás', 41: 'Havazás', 42: 'Havazás', 43: 'Hófúvás', 46: 'Hózápor', 9: 'Eső', 19: 'Párás', 20: 'Ködös', 21: 'Párás', 22: 'Füstös', 23: 'Szeles', 24: 'Szeles' }; return textMap[iconCode] || 'Ismeretlen'; }

        function renderHourlyForecastData() {
            const hourlyDataFull = cachedData.hourlyForecast; if (!hourlyDataFull || hourlyDataFull.length === 0) { if(hourlyForecastContainerEl) hourlyForecastContainerEl.classList.add('is-hidden'); if(hourlyForecastTitleEl) hourlyForecastTitleEl.classList.add('is-hidden'); return; }
            let forecastHTML = '';
            hourlyDataFull.forEach(hour => {
                let conditionText = hour.wxPhraseShort || mapIconCodeToHungarianText(hour.iconCode, hour.dayOrNight);
                forecastHTML += `<div class="hourly-forecast-card"><div class="hourly-primary-info"><div class="hourly-time">${formatTime(hour.time)}</div><div class="hourly-icon-and-condition"><i class="hourly-icon ${mapTwcIconToFontAwesome(hour.iconCode, hour.dayOrNight)}"></i><div class="hourly-condition-text">${conditionText}</div></div><div class="hourly-temp">${formatValue(hour.temp, '°', 0, '--')}</div></div><div class="hourly-secondary-details"><div class="hourly-detail-row"><span><i class="fas fa-tint"></i> Csapadék</span><strong>${formatValue(hour.precipChance, '%', 0, '--')}</strong></div><div class="hourly-detail-row"><span><i class="fas fa-wind"></i> Szél</span><strong title="Szél">${degreesToCompassAbbreviated(hour.windDirection)} ${formatValue(hour.windSpeed, 'km/h', 0)}</strong></div><div class="hourly-detail-row"><span><i class="fas fa-hand-holding-water"></i> Pára</span><strong>${formatValue(hour.humidity, '%', 0)}</strong></div></div></div>`;
            });
            if(hourlyForecastContainerEl) hourlyForecastContainerEl.innerHTML = forecastHTML; if(hourlyForecastContainerEl) hourlyForecastContainerEl.classList.remove('is-hidden'); if(hourlyForecastTitleEl) hourlyForecastTitleEl.classList.remove('is-hidden');
        }

        async function fetchAndRefreshForecasts() {
            try {
                await Promise.all([
                    fetchHourlyForecastData(NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon).then(data => { if (data) cachedData.hourlyForecast = data; }),
                    fetchDailyForecastData(NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon).then(data => { if (data) cachedData.dailyForecasts = data; })
                ]);
                lastApiCallTimes.forecast = Date.now();
                renderHourlyForecastData();
                renderPrecipitationForecastInfo();
            } catch (e) {
                console.warn("Hiba az előrejelzések frissítésekor:", e);
            }
        }

        async function fetchAllDataAndUpdateDisplay(isInitialLoad = false) {
            const now = Date.now();
            await Promise.allSettled(Object.keys(STATIONS).map(key => fetchPwsStationData(key)));
            if (!STATIONS[activeDisplayStationKey].isOnline) { const onlineStations = Object.keys(STATIONS).filter(k => STATIONS[k].isOnline && ['NYIREGYHAZI_UT', 'KOSSUTH', 'HONVED'].includes(k)); if(onlineStations.length > 0) activeDisplayStationKey = onlineStations[0]; }
            const independentPromises = [];
            if (isInitialLoad || now - lastApiCallTimes.generalConditions > REFRESH_INTERVAL_GENERAL_CONDITIONS) independentPromises.push(fetchGeneralConditionsData(NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon).then(data => { if (data) Object.assign(cachedData.generalConditions, data); }).catch(e => {console.warn("Ált. adatok lekérése sikertelen", e)}));
            if (isInitialLoad || now - lastApiCallTimes.airQuality > REFRESH_INTERVAL_AIR_QUALITY) independentPromises.push(fetchAirQualityData(NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon).then(data => { cachedData.airQuality = data; }).catch(e => {console.warn("Levegőminőség adatok lekérése sikertelen", e)}));
            if (isInitialLoad || now - lastApiCallTimes.forecast > REFRESH_INTERVAL_FORECAST) independentPromises.push(fetchAndRefreshForecasts());
            if (ENABLE_ISS_TRACKING && (isInitialLoad || now - (lastApiCallTimes.issPasses || 0) > REFRESH_INTERVAL_ISS)) { independentPromises.push( fetchIssPasses(N2YO_API_KEY, NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon, OBSERVER_ALTITUDE, ISS_NORAD_ID, 3, 15).then(passes => { cachedData.issPasses = passes; lastApiCallTimes.issPasses = Date.now(); }).catch(e => {}) ); }
            
            await Promise.allSettled(independentPromises);
            try { const sunCalcResult = await fetchAdvancedSunCalcData(NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon); cachedData.sunCalc = sunCalcResult; if (sunCalcResult.sunriseDateForPath) cachedData.generalConditions.sunriseTimeLocal = sunCalcResult.sunriseDateForPath.toISOString(); if (sunCalcResult.sunsetDateForPath) cachedData.generalConditions.sunsetTimeLocal = sunCalcResult.sunsetDateForPath.toISOString(); } catch (e) { cachedData.sunCalc = null; console.warn("SunCalc adatok lekérése sikertelen", e); }
            updateThemeAndSky(new Date(), cachedData.generalConditions.sunriseTimeLocal, cachedData.generalConditions.sunsetTimeLocal);
            
            const isDataReady = STATIONS[activeDisplayStationKey]?.isOnline && STATIONS[activeDisplayStationKey]?.data && cachedData.generalConditions?.skyCoverPhrase !== null && cachedData.sunCalc;

            if (isDataReady) { 
                compileAndRenderDisplayData(); 
            } else { 
                let errorMessage = "⚠️ "; 
                const anyStationOnline = Object.values(STATIONS).some(s => s.isOnline);
                if (!anyStationOnline) { errorMessage += "Egyik mérőállomás sem elérhető. "; } 
                else if (!STATIONS[activeDisplayStationKey]?.isOnline) { errorMessage += `Az aktív állomás (${STATIONS[activeDisplayStationKey].displayName}) nem elérhető. `; } 
                else { errorMessage += "Az adatok betöltése folyamatban... "; }
                errorMessage += "Kérjük, próbálja később, vagy válasszon másik állomást."; 
                if (weatherDisplayEl) weatherDisplayEl.innerHTML = `<div class="loading" style="padding: 20px; text-align: center; color: var(--current-text-color);">${errorMessage}</div>`; 
                if (hourlyForecastContainerEl) hourlyForecastContainerEl.classList.add('is-hidden'); 
                if (hourlyForecastTitleEl) hourlyForecastTitleEl.classList.add('is-hidden'); 
            }
        }
        
        function checkMidnight() {
             const newDay = new Date().getDate(); 
             if (newDay !== currentDay) { 
                currentDay = newDay; 
                const updatePromises = []; 
                if (ENABLE_ISS_TRACKING) updatePromises.push( fetchIssPasses(N2YO_API_KEY, NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon, OBSERVER_ALTITUDE, ISS_NORAD_ID, 3, 15).then(passes => { cachedData.issPasses = passes; lastApiCallTimes.issPasses = Date.now(); }) ); 
                Promise.all(updatePromises).finally(() => { if (cachedData.displayPws) renderWeatherData(); }); 
            }
        }

        function determineCelestialState(nowMs, riseTime, setTime, altitude, noonTime = null) {
            if (altitude > CELESTIAL_RISE_TRANSITION_ALTITUDE) return 'ON_PATH';
            if (altitude < CELESTIAL_SET_TRANSITION_ALTITUDE) return 'BELOW_HORIZON';
            const riseMs = riseTime ? riseTime.getTime() : NaN;
            const setMs = setTime ? setTime.getTime() : NaN;
            if (!isNaN(riseMs) || !isNaN(setMs)) {
                const timeToRise = !isNaN(riseMs) ? Math.abs(nowMs - riseMs) : Infinity;
                const timeToSet = !isNaN(setMs) ? Math.abs(nowMs - setMs) : Infinity;
                if (timeToRise < timeToSet && timeToRise < CELESTIAL_EVENT_DURATION_MS) return 'RISING';
                if (timeToSet < timeToRise && timeToSet < CELESTIAL_EVENT_DURATION_MS) return 'SETTING';
            }
            if (noonTime && !isNaN(noonTime.getTime())) { return nowMs < noonTime.getTime() ? 'RISING' : 'SETTING'; } 
            else { 
                const pathMidpointMs = (!isNaN(riseMs) && !isNaN(setMs) && setMs > riseMs) ? riseMs + (setMs - riseMs) / 2 : NaN;
                if (!isNaN(pathMidpointMs)) return nowMs < pathMidpointMs ? 'RISING' : 'SETTING';
            }
            return 'ON_PATH';
        }

        function animateIconOnHorizon(iconEl, altitude) {
            if (!iconEl) return; const visualContainer = iconEl.parentElement; if (!visualContainer) return;
            const HORIZON_Y_POS_FROM_BOTTOM = 40; const VISUAL_HEIGHT = visualContainer.offsetHeight; const ICON_HEIGHT = iconEl.offsetHeight || (iconEl.id.includes('sun') ? 22 : 20);
            const progress = (altitude - CELESTIAL_SET_TRANSITION_ALTITUDE) / (CELESTIAL_RISE_TRANSITION_ALTITUDE - CELESTIAL_SET_TRANSITION_ALTITUDE);
            const clampedProgress = Math.max(0, Math.min(1, progress)); const yPos = (VISUAL_HEIGHT - HORIZON_Y_POS_FROM_BOTTOM) - (clampedProgress * ICON_HEIGHT);
            iconEl.style.transform = `translate(-50%, ${yPos}px)`; iconEl.style.left = `${(visualContainer.offsetWidth / 2)}px`; iconEl.style.transition = 'none';
        }
        
        function renderCelestialState(bodyName, previousState, currentState, elements) {
            const { visualEl, textDetailsEl, iconEl, arcEl, eventContainerEl, eventMessageEl, eventCountdownEl, altitude, otherBodyState } = elements;
            const isEventActive = ['RISING', 'SETTING'].includes(currentState);
            visualEl.classList.toggle('is-event-active', isEventActive); textDetailsEl.style.opacity = isEventActive ? '0.3' : '1'; eventContainerEl.classList.toggle('is-hidden', !isEventActive);
            iconEl.style.opacity = 1;
            switch (currentState) {
                case 'RISING': eventMessageEl.textContent = (bodyName === 'sun') ? 'Felkelés folyamatban...' : 'Holdkelte folyamatban...'; animateIconOnHorizon(iconEl, altitude); break;
                case 'SETTING': eventMessageEl.textContent = (bodyName === 'sun') ? 'Lenyugvás folyamatban...' : 'Holdnyugta folyamatban...'; animateIconOnHorizon(iconEl, altitude); break;
                case 'ON_PATH': visualEl.classList.remove('is-event-active'); iconEl.style.transition = 'transform 0.2s linear, opacity 0.5s ease-in-out'; updatePathVisuals(elements.pathStartTime, elements.pathEndTime, { iconEl, mainArcEl: arcEl }, true); break;
                case 'BELOW_HORIZON':
                    visualEl.classList.remove('is-event-active'); iconEl.style.opacity = 0;
                    if(previousState === 'SETTING') {
                        let settingMessage = (bodyName === 'sun') ? (otherBodyState && ['ON_PATH', 'RISING'].includes(otherBodyState) ? 'Lenyugodtam. Most jön a Hold!' : 'Lenyugodtam, most jönnek a csillagok!') : 'Lenyugodtam.';
                        eventMessageEl.textContent = settingMessage; eventContainerEl.classList.remove('is-hidden'); setTimeout(() => eventContainerEl.classList.add('is-hidden'), 3000);
                    }
                    updatePathVisuals(elements.pathStartTime, elements.pathEndTime, { iconEl, mainArcEl: arcEl }, false);
                    break;
            }
        }

        function updatePathVisuals(startTime, endTime, elements, isVisible = true) {
            const { iconEl, mainArcEl } = elements;
             if (!isVisible || !startTime || !endTime || isNaN(startTime.getTime()) || isNaN(endTime.getTime()) || !iconEl || !mainArcEl) {
                if(mainArcEl && mainArcEl.style) mainArcEl.style.strokeDashoffset = mainArcEl.getTotalLength ? mainArcEl.getTotalLength() : '999';
                if(iconEl && iconEl.style) iconEl.style.transform = 'translate(-50%, -150px)';
                return;
            }
            
            const now = new Date();
            const totalTimeInSky = endTime.getTime() - startTime.getTime();
            let percentageOfPath = 0;
            if (totalTimeInSky > 0) { const elapsedTime = now.getTime() - startTime.getTime(); percentageOfPath = Math.max(0, Math.min(1, elapsedTime / totalTimeInSky)); }
            
            const arcLength = mainArcEl.getTotalLength();
            if (arcLength === 0 || !isFinite(arcLength)) { requestAnimationFrame(() => updatePathVisuals(startTime, endTime, elements, isVisible)); return; };
            if (mainArcEl.style) { mainArcEl.style.strokeDasharray = arcLength; mainArcEl.style.strokeDashoffset = arcLength * (1 - percentageOfPath); }
            
            const point = mainArcEl.getPointAtLength(arcLength * percentageOfPath);
            iconEl.style.transform = `translate(-50%, -50%) translate(${point.x}px, ${point.y}px)`;
        }
        
        function masterAnimationLoop() {
            if (!cachedData.sunCalc || !isWeatherDisplayInitialized) { animationFrameId = requestAnimationFrame(masterAnimationLoop); return; }
            const now = new Date(), nowMs = now.getTime();
            const sunPos = SunCalc.getPosition(now, NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon);
            const moonPos = SunCalc.getMoonPosition(now, NYIREGYHAZA_COORDS.lat, NYIREGYHAZA_COORDS.lon);
            const sunAltitude = sunPos.altitude * 180 / Math.PI, moonAltitude = moonPos.altitude * 180 / Math.PI;

            const sunIcon = document.getElementById('sun-path-icon-v2');
            if(sunIcon) {
                if (sunAltitude < 1.0) {
                    sunIcon.style.backgroundColor = '#E4572E';
                    sunIcon.style.boxShadow = '0 0 12px 4px #E4572E, 0 0 20px 8px rgba(228, 87, 46, 0.5)';
                } else if (sunAltitude < 5.0) {
                    sunIcon.style.backgroundColor = '#F97316';
                    sunIcon.style.boxShadow = '0 0 10px 3px #F97316, 0 0 18px 6px rgba(249, 115, 22, 0.45)';
                } else {
                    sunIcon.style.backgroundColor = '#FFD700';
                    sunIcon.style.boxShadow = '0 0 10px 3px gold, 0 0 18px 6px rgba(255, 215, 0, 0.45)';
                }
            }
            const moonIcon = document.getElementById('moon-path-icon-v2');
            if (moonIcon && cachedData.sunCalc) {
                updateMoonPhaseVisual(cachedData.sunCalc.moonPhaseRaw);
                let bgColor = (moonAltitude < 4.0) ? '#D97706' : '#E0E5E9';
                moonIcon.style.backgroundColor = bgColor;

                const illumination = cachedData.sunCalc.phaseValue / 100;
                const glowIntensity = Math.pow(illumination, 1.5);
                const shadowColor = (moonAltitude < 4.0) ? 'rgba(245, 158, 11, 0.6)' : 'rgba(200, 200, 255, 0.7)';
                const brightBlur = Math.round(5 + 15 * glowIntensity);
                const brightSpread = Math.round(2 + 8 * glowIntensity);
                moonIcon.style.boxShadow = `0 0 ${brightBlur}px ${brightSpread}px ${shadowColor}`;
            }
            
            const sunState = determineCelestialState(nowMs, cachedData.sunCalc.sunriseDateForPath, cachedData.sunCalc.sunsetDateForPath, sunAltitude, cachedData.sunCalc.solarNoonDate);
            const moonState = determineCelestialState(nowMs, cachedData.sunCalc.moonRiseDateForPath, cachedData.sunCalc.moonSetDateForPath, moonAltitude);
            if (celestialBodyStates.sun.currentState !== sunState) { celestialBodyStates.sun.previousState = celestialBodyStates.sun.currentState; celestialBodyStates.sun.currentState = sunState; if(cachedData.displayPws) renderWeatherData(); }
            if (celestialBodyStates.moon.currentState !== moonState) { celestialBodyStates.moon.previousState = celestialBodyStates.moon.currentState; celestialBodyStates.moon.currentState = moonState; if(cachedData.displayPws) renderWeatherData(); }

            const sunElements = { bodyName: 'sun', visualEl: el_sunPathVisual, textDetailsEl: el_sunInfoSection.querySelector('.sun-text-details'), iconEl: el_sunPathIcon, arcEl: el_sunPathArcMain, eventContainerEl: el_sunEventContainer, eventMessageEl: el_sunEventMessage, eventCountdownEl: el_sunEventCountdown, altitude: sunAltitude, pathStartTime: cachedData.sunCalc.sunriseDateForPath, pathEndTime: cachedData.sunCalc.sunsetDateForPath, otherBodyState: moonState };
            const moonElements = { bodyName: 'moon', visualEl: el_moonPathVisual, textDetailsEl: el_moonInfoSection.querySelector('.moon-text-details'), iconEl: el_moonPathIcon, arcEl: el_moonPathArcMain, eventContainerEl: el_moonEventContainer, eventMessageEl: el_moonEventMessage, eventCountdownEl: el_moonEventCountdown, altitude: moonAltitude, pathStartTime: cachedData.sunCalc.moonRiseDateForPath, pathEndTime: cachedData.sunCalc.moonSetDateForPath, otherBodyState: sunState };
            
            if(el_sunInfoSection && !el_sunInfoSection.classList.contains('is-hidden')) renderCelestialState('sun', celestialBodyStates.sun.previousState, sunState, sunElements);
            if(el_moonInfoSection && !el_moonInfoSection.classList.contains('is-hidden')) renderCelestialState('moon', celestialBodyStates.moon.previousState, moonState, moonElements);
            animationFrameId = requestAnimationFrame(masterAnimationLoop);
        }
        
        function startMasterLoop() {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            masterAnimationLoop();
            
            const PWS_INTERVAL_S = REFRESH_INTERVAL_PWS / 1000;
            const FORECAST_INTERVAL_S = REFRESH_INTERVAL_FORECAST / 1000;
            const SKY_UPDATE_S = SKY_COLOR_UPDATE_INTERVAL / 1000;
            const MIDNIGHT_CHECK_S = 30;
            
            setInterval(() => {
                masterTickCounter++;
                if (masterTickCounter % PWS_INTERVAL_S === 0) {
                    fetchAllDataAndUpdateDisplay(false);
                }
                if (masterTickCounter % FORECAST_INTERVAL_S === 0) {
                    fetchAndRefreshForecasts();
                }
                if (masterTickCounter % SKY_UPDATE_S === 0) {
                    if (cachedData.generalConditions?.sunriseTimeLocal && cachedData.generalConditions?.sunsetTimeLocal) {
                        updateThemeAndSky(new Date(), cachedData.generalConditions.sunriseTimeLocal, cachedData.generalConditions.sunsetTimeLocal);
                    }
                }
                if (masterTickCounter % MIDNIGHT_CHECK_S === 0) {
                    checkMidnight();
                }
            }, 1000);
        }
        
        function initApp() {
            weatherDisplayEl = document.getElementById('weather-display');
            hourlyForecastContainerEl = document.getElementById('hourly-forecast-container');
            hourlyForecastTitleEl = document.getElementById('hourly-forecast-title');
            
            initializeWeatherDisplayDOM();
            
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    fetchAllDataAndUpdateDisplay(true);
                }
            });
            
            window.addEventListener('resize', () => { if (cachedData.displayPws) renderWeatherData(); });
            
            fetchAllDataAndUpdateDisplay(true).finally(() => { 
                startMasterLoop(); 
            });
        }

        document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>