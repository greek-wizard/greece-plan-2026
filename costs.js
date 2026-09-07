(() => {
  'use strict';
  const hh = slug => `https://www.hh.gr/en/destinations/${slug}/`;
  const prices = {
    confirmed: [
      {name:'Akropol', price:'30 €', status:'bilet opłacony · cena oficjalna', hours:'10 IX: 08:00–19:30; wejście z rezerwacji 17:00–18:00.', source:hh('acropolis-of-athens')},
      {name:'Wycieczka do Meteorów', price:'65 €', status:'wycieczka opłacona', source:'https://visitmeteora.travel/tour/meteora-day-trip-from-athens/'},
      {name:'Klasztor w Meteorach', price:'5 €', source:'https://visitmeteora.travel/faq/'}
    ],
    museums: [
      {name:'Muzeum Akropolu', price:'20 €', source:'https://www.theacropolismuseum.gr/en/plan-your-visit'},
      {name:'Narodowe Muzeum Archeologiczne', price:'20 €', hours:'W sezonie letnim 08:00–20:00; we wtorki 13:00–20:00.', source:'https://www.namuseum.gr/en/episkepsi/'}
    ],
    candidates: [
      {name:'Starożytny Korynt', price:'15 €', hours:'13 IX: 08:00–19:30.', source:hh('ancient-corinth')},
      {name:'Mykeny', price:'20 €', hours:'13 IX: 08:00–19:30; ostatnie wejście 20 min przed zamknięciem.', source:hh('mycenae')},
      {name:'Akrokorynt', price:'5 €', hours:'Codziennie 08:30–15:30.', source:hh('acrocorinth')},
      {name:'Epidauros', price:'20 €', hours:'1–15 IX 08:00–19:30; 16–30 IX 08:00–19:00.', source:hh('epidaurus-asclepius-sanctuary')},
      {name:'Palamidi', price:'20 €', hours:'1–15 IX 08:00–19:30; 16–30 IX 08:00–19:00.', source:hh('palamidi-castle')},
      {name:'Nemea', price:'10 €', hours:'1–15 IX 08:00–20:00; 16–30 IX 08:00–19:30.', source:hh('zeus-sanctuary-nemea')},
      {name:'Tiryns', price:'10 €', source:hh('tiryns')},
      {name:'Starożytne Asini', price:'5 €', hours:'Codziennie 08:30–15:30.', source:hh('asine')},
      {name:'Mistra', price:'20 €', hours:'Codziennie 08:00–20:00; we wtorki pałac od 11:00.', source:hh('mystras')}
    ]
  };
  globalThis.TripPrices = prices;
  if (typeof document === 'undefined') return;
  const render = item => `<article class="price-item"><div><h3>${item.name}</h3><p>${item.hours?`<span class="hours">${item.hours}</span>`:''}<a href="${item.source}" target="_blank" rel="noopener">Oficjalne informacje ↗</a></p></div><div class="price">${item.price}<span class="paid">${item.status||'za osobę'}</span></div></article>`;
  document.querySelector('#confirmed-prices').innerHTML=prices.confirmed.map(render).join('');
  document.querySelector('#museum-prices').innerHTML=prices.museums.map(render).join('');
  document.querySelector('#candidate-prices').innerHTML=prices.candidates.map(render).join('');
})();
