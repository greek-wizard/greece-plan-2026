(() => {
  'use strict';
  const key = 'grecja-wycieczki-tolo';
  const defaults = ['epidaurus', 'nafplio', 'nemea', 'tiryns'];
  const hh = slug => `https://www.hh.gr/en/destinations/${slug}/`;
  const entry = (name, price, note, source) => ({name, price, note, source});
  const fixed = [
    {...entry('Muzeum Akropolu', 20, 'Osobny bilet muzealny — kupiony bilet na wzgórze go nie obejmuje.', 'https://www.theacropolismuseum.gr/en/plan-your-visit'), date:'10 IX'},
    {...entry('Narodowe Muzeum Archeologiczne', 20, 'Pełny bilet do muzeum w Atenach.', 'https://www.namuseum.gr/en/episkepsi/'), date:'11 IX'},
    {...entry('Meteory · trzy klasztory', 15, '3 × 5 € za osobę. Dla całej grupy przygotować 45 € w gotówce; wejścia są poza ceną wycieczki.', 'https://visitmeteora.travel/faq/'), date:'12 IX'},
    {...entry('Starożytny Korynt', 15, 'Stanowisko archeologiczne i muzeum na jednym bilecie.', hh('ancient-corinth')), date:'13 IX'},
    {...entry('Mykeny', 20, 'Stanowisko, muzeum i Skarbiec Atreusza — jeden bilet, liczony raz.', hh('mycenae')), date:'13 IX'}
  ];
  const trips = {
    epidaurus:{name:'Epidauros + Palea Epidavros', entries:[entry('Epidauros',20,'Teatr, sanktuarium i muzeum na jednym bilecie.',hh('epidaurus-asclepius-sanctuary'))], free:'Spacer po porcie Palea Epidavros i kąpiel.'},
    nafplio:{name:'Nauplion + Palamidi', entries:[entry('Twierdza Palamidi',20,'Bilet do twierdzy; spacer po mieście nie wymaga biletu.',hh('palamidi-castle'))], free:'Stare miasto Nauplionu, port i promenada Arvanitia.'},
    nemea:{name:'Nemea + winnica', entries:[entry('Nemea · sanktuarium, stadion i muzeum',10,'Bilet łączony — nie doliczać stadionu ani muzeum drugi raz.',hh('zeus-sanctuary-nemea'))], unknown:'Wizyta i degustacja w winnicy: cena do ustalenia po wyborze producenta i oferty; poza sumą wejść.'},
    tiryns:{name:'Tiryns + Asini + plaża', entries:[entry('Tiryns',10,'Wejście na teren mykeńskiej cytadeli.',hh('tiryns')),entry('Starożytne Asini',5,'Wejście na stanowisko archeologiczne.',hh('asine'))], free:'Kąpiel na Karathonie lub Kondyli; leżaki i usługi plażowe poza sumą.'},
    arcadia:{name:'Dimitsana + Stemnitsa + Lousios', entries:[], free:'Spacery po miasteczkach i krótki odcinek wąwozu — bez zaplanowanego biletu.', unknown:'Ewentualne datki w klasztorach: dobrowolne, poza sumą. Plan nie zawiera Muzeum Hydrotechniki.'},
    mystras:{name:'Mistra + Sparta', entries:[entry('Mistra',20,'Stanowisko i muzeum na jednym bilecie.',hh('mystras'))], free:'Postój przy pomniku Leonidasa w Sparcie.'},
    hydra:{name:'Hydra przez Metochi', entries:[], free:'Spacer po porcie i uliczkach Hydry — bez zaplanowanego płatnego muzeum.', unknown:'Prom Metochi–Hydra w obie strony i parking są dodatkowo płatne. To transport, poza podsumowaniem biletów wstępu; cenę potwierdzić u przewoźnika.'},
    monemvasia:{name:'Monemvasia', entries:[], free:'Spacer po Dolnym i Górnym Mieście — bez zaplanowanego biletu do muzeum.', unknown:'Wejście do wnętrza Agia Sofia: ewentualną opłatę potwierdzić na miejscu; brak potwierdzonej bieżącej ceny w tym zestawieniu.'}
  };
  const optional = [
    {...entry('Przewodnik po Akropolu',30,'Dodatkowa usługa 10 IX. Stawka podana przez Was; sam bilet wstępu jest już opłacony.'), id:'guide'},
    {...entry('Akrokorynt',5,'Opcjonalny przystanek 13 IX, jeśli wystarczy czasu.',hh('acrocorinth')), id:'acrocorinth'},
    {...entry('Muzeum Oliwy w Sparcie',6,'Alternatywa dla postoju przy pomniku Leonidasa. Zamknięte we wtorki.', 'https://www.piop.gr/en/diktuo-mouseion/museum-of-the-olive-and-greek-olive-oil/'), id:'olive', trip:'mystras'}
  ];
  function selection(raw) {
    try {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length === 4 && new Set(saved).size === 4 && saved.every(id => Object.hasOwn(trips,id))) return {ids:saved, fallback:false};
    } catch {}
    return {ids:[...defaults], fallback:true};
  }
  function calculate(ids, extras = []) {
    const rows = fixed.concat(ids.flatMap((id,i) => trips[id].entries.map(item => ({...item,date:`${14+i} IX`}))));
    const available = optional.filter(item => !item.trip || ids.includes(item.trip));
    const base = rows.reduce((sum,item) => sum + item.price,0);
    const extra = available.filter(item => extras.includes(item.id)).reduce((sum,item) => sum + item.price,0);
    return {rows, available, base, extra, total:base+extra, group:(base+extra)*3};
  }
  globalThis.TripCosts = {selection, calculate, trips, fixed, optional};
  if (typeof document === 'undefined') return;
  const money = value => `${value.toLocaleString('pl-PL')} €`;
  const source = item => item.source ? ` <a href="${item.source}" target="_blank" rel="noopener">Źródło ↗</a>` : '';
  const checked = new Set();
  function render() {
    let raw = null;
    try { raw = localStorage.getItem(key); } catch {}
    const {ids,fallback} = selection(raw);
    const totals = calculate(ids,[...checked]);
    document.querySelector('#selection-note').textContent = fallback ? 'Zestaw domyślny, jak w planie: Epidauros, Nauplion, Nemea oraz Tiryns + Asini. Zapis pełnych czterech wycieczek zmieni podsumowanie.' : 'Uwzględnione wycieczki: ' + ids.map(id => trips[id].name).join(' · ') + '.';
    document.querySelector('#base-person').textContent = money(totals.base);
    document.querySelector('#base-group').textContent = money(totals.base*3);
    document.querySelector('#total-person').textContent = money(totals.total);
    document.querySelector('#total-group').textContent = money(totals.group);
    document.querySelector('#extra-note').textContent = totals.extra ? `W tym wybrane dodatki: ${money(totals.extra)} / os. · ${money(totals.extra*3)} / 3 osoby.` : 'Bez opcjonalnych dodatków. Przewodnik po Akropolu: +30 € / os. · +90 € / 3 osoby.';
    document.querySelector('#admission-rows').innerHTML = totals.rows.map(item => `<tr><td>${item.date}</td><th scope="row">${item.name}<small>${item.note}${source(item)}</small></th><td class="amount">${money(item.price)}</td><td class="amount">${money(item.price*3)}</td></tr>`).join('');
    document.querySelector('#optional-items').innerHTML = totals.available.map(item => `<div class="option"><label><input type="checkbox" data-extra="${item.id}" ${checked.has(item.id)?'checked':''}><span><b>${item.name}</b><span>${money(item.price)} / os. · ${money(item.price*3)} / 3 osoby</span></span></label><p>${item.note}${source(item)}</p></div>`).join('');
    document.querySelector('#trip-notes').innerHTML = ids.map((id,i) => `<li><b>${14+i} IX · ${trips[id].name}</b>${trips[id].free?`<span>${trips[id].free}</span>`:''}${trips[id].unknown?`<span class="pending">${trips[id].unknown}</span>`:''}</li>`).join('');
    document.querySelector('#pending-note').textContent = ids.includes('nemea') || ids.includes('hydra') || ids.includes('monemvasia') ? 'Suma obejmuje potwierdzone bilety wstępu. Koszty do ustalenia dla wybranych wycieczek podano poniżej.' : 'Suma obejmuje potwierdzone bilety wstępu; ewentualne datki i pozostałe wydatki są poza zestawieniem.';
  }
  document.querySelector('#optional-items').addEventListener('change',event => {
    const id = event.target.dataset.extra;
    if (!id) return;
    if(event.target.checked) checked.add(id); else checked.delete(id);
    render();
    document.querySelector(`[data-extra="${id}"]`)?.focus();
  });
  window.addEventListener('storage',event => {if(event.key === key || event.key === null) render();});
  window.addEventListener('pageshow',render);
  render();
})();
