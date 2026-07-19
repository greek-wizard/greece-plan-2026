(() => {
  const storageKey = 'greece-2026-help-seen-v1';
  const styles = document.createElement('style');
  styles.textContent = `
    html:has(dialog[open]),body:has(dialog[open]){overflow:hidden;overscroll-behavior:none}.site-help-button{flex:0 0 auto;width:32px;height:32px;display:grid;place-items:center;border:1px solid #ffffff38;border-radius:50%;background:#ffffff0e;color:#fff;font-weight:900;cursor:pointer}.site-help-button:hover,.site-help-button:focus-visible{background:#fff;color:var(--navy,#102d33);outline:0}.site-help-dialog{width:min(720px,calc(100vw - 28px));max-height:min(820px,88dvh);overflow:auto;overscroll-behavior:contain;border:0;border-radius:20px;padding:0;background:#fffefa;color:#17363a;box-shadow:0 30px 100px #071a1e70}.site-help-dialog::backdrop{background:#071a1e99;backdrop-filter:blur(3px)}.site-help-sheet{padding:24px}.site-help-head{display:flex;justify-content:space-between;align-items:start;gap:18px}.site-help-head h2{margin:0;font:2rem/1 Georgia,serif}.site-help-head p{margin:9px 0 0;max-width:570px;color:#687a7c;line-height:1.5}.site-help-close{flex:0 0 auto;width:40px;height:40px;border:0;border-radius:50%;background:#edf2ef;color:#17363a;font-size:1.25rem;cursor:pointer}.site-help-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:20px 0}.site-help-item{display:grid;grid-template-columns:42px 1fr;gap:11px;border:1px solid #d9e0dc;border-radius:13px;padding:13px;background:#fff}.site-help-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:11px;background:#dcebea;color:#176f7c;font-weight:950;line-height:1}.site-help-item b{display:block;margin:1px 0 3px}.site-help-item span{display:block;color:#687a7c;font-size:.78rem;line-height:1.4}.site-help-item .site-help-icon{color:#176f7c;font-size:1.05rem;line-height:1}.site-help-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;border-top:1px solid #d9e0dc;padding-top:16px}.site-help-foot small{max-width:430px;color:#687a7c;line-height:1.4}.site-help-primary{border:0;border-radius:10px;background:#176f7c;color:#fff;padding:11px 16px;font-weight:850;cursor:pointer;white-space:nowrap}
    @media(min-width:801px){.site-help-button{width:38px;height:38px;font-size:1rem}}
    @media(max-width:560px){.site-help-button{width:31px;height:31px}.site-help-dialog{width:100%;max-width:none;max-height:88dvh;margin:auto 0 0;border-radius:20px 20px 0 0}.site-help-sheet{padding:19px 14px max(18px,env(safe-area-inset-bottom))}.site-help-head h2{font-size:1.7rem}.site-help-grid{grid-template-columns:1fr;gap:7px;margin:16px 0}.site-help-item{padding:10px}.site-help-foot{align-items:stretch;flex-direction:column}.site-help-primary{min-height:46px}}
    @media print{.site-help-button,.site-help-dialog{display:none}}
  `;
  document.head.append(styles);

  const dialog = document.createElement('dialog');
  dialog.className = 'site-help-dialog';
  dialog.setAttribute('aria-labelledby', 'site-help-title');
  dialog.innerHTML = `
    <div class="site-help-sheet">
      <div class="site-help-head">
        <div><h2 id="site-help-title">Jak korzystać z planu?</h2><p>Najważniejsze narzędzia są połączone wspólnym wyborem wariantu i działają również na telefonie.</p></div>
        <button class="site-help-close" type="button" aria-label="Zamknij pomoc">×</button>
      </div>
      <div class="site-help-grid">
        <div class="site-help-item"><span class="site-help-icon">1</span><div><b>Wybierz wariant</b><span>Na stronie planu porównaj trasy, noclegi, kilometry i łączną ocenę atrakcji.</span></div></div>
        <div class="site-help-item"><span class="site-help-icon">2</span><div><b>Otwieraj kolejne dni</b><span>Plan działa jak akordeon: otwarcie jednego dnia automatycznie zamyka poprzedni.</span></div></div>
        <div class="site-help-item"><span class="site-help-icon">3</span><div><b>Otwieraj mapy i zdjęcia</b><span>Trasy oraz atrakcje mają skróty do Map Google, a miniatury można powiększać.</span></div></div>
        <div class="site-help-item"><span class="site-help-icon">4</span><div><b>Porównaj atrakcje</b><span>Ranking pokazuje ocenę, popularność i obecność miejsca w aktywnym wariancie.</span></div></div>
        <div class="site-help-item"><span class="site-help-icon">5</span><div><b>Korzystaj z checklisty</b><span>Zaznaczenia zapisują się lokalnie na używanym urządzeniu.</span></div></div>
        <div class="site-help-item"><span class="site-help-icon">i</span><div><b>Sprawdź założenia</b><span>Loty, zasady wynajmu auta i wspólne informacje znajdują się na stronie Info.</span></div></div>
      </div>
      <div class="site-help-foot"><small>To okno pojawia się automatycznie tylko raz. Później można wrócić do niego ikoną „?” w menu.</small><button class="site-help-primary" type="button">Rozumiem, zaczynam</button></div>
    </div>`;
  document.body.append(dialog);

  const helpButton = document.createElement('button');
  helpButton.className = 'site-help-button';
  helpButton.type = 'button';
  helpButton.textContent = '?';
  helpButton.setAttribute('aria-label', 'Jak korzystać ze strony');
  helpButton.title = 'Jak korzystać ze strony';
  document.querySelector('.global-nav .nav-row')?.append(helpButton);

  const markSeen = () => { try { localStorage.setItem(storageKey, '1'); } catch {} };
  const closeDialog = () => { markSeen(); dialog.close(); };
  const openDialog = () => { if (!dialog.open) dialog.showModal(); };
  helpButton.addEventListener('click', openDialog);
  dialog.querySelector('.site-help-close').addEventListener('click', closeDialog);
  dialog.querySelector('.site-help-primary').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', markSeen);

  let alreadySeen = false;
  try { alreadySeen = localStorage.getItem(storageKey) === '1'; } catch {}
  if (!alreadySeen) window.setTimeout(openDialog, 250);
})();
