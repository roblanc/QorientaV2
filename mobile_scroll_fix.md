# 📱 Fix Mobile Horizontal Scroll Issue

## Problema
Pe iPhone (și alte dispozitive mobile), site-ul permitea scroll orizontal (swipe stânga-dreapta), ieșind din cadru.

## Cauze Principale

### 1. **Lipsa `overflow-x: hidden` pe `html`**
- Aveai `overflow-x: hidden` doar pe `body`
- Este necesar pe AMBELE elemente (`html` și `body`)

### 2. **Aurora Blobs cu dimensiuni fixe prea mari**
- Aurora blobs aveau dimensiuni fixe: 900px, 800px, 600px
- Pe ecrane mobile mici (360-390px), acestea se extindeau mult dincolo de viewport
- Poziționarea cu valori negative (ex: `left: -100px`) agrava problema

## Soluții Implementate

### ✅ Fix 1: Overflow Control
```css
html {
    overflow-x: hidden;
    max-width: 100vw;
}

body {
    overflow-x: hidden;
    max-width: 100vw;
}
```

### ✅ Fix 2: Aurora Blobs Responsive
```css
.aurora-blob {
    width: min(900px, 150vw);  /* Înainte: width: 900px; */
    height: min(900px, 150vw); /* Înainte: height: 900px; */
    max-width: 900px;          /* NOU */
}

.aurora-blob-2 {
    width: min(800px, 140vw);
    height: min(800px, 140vw);
    max-width: 800px;
}

.aurora-blob-3 {
    width: min(600px, 120vw);
    height: min(600px, 120vw);
    max-width: 600px;
}
```

## Fișiere Actualizate
- ✅ `index.html` (manual)
- ✅ `quiz.html` (auto via script)
- ✅ `pricing.html` (auto via script)
- ✅ `about.html` (auto via script)
- ✅ `team.html` (auto via script)

## Testare
1. Deschide site-ul pe iPhone
2. Încearcă să dai swipe stânga/dreapta
3. ✨ Site-ul nu ar mai trebui să permită scroll orizontal

## Note Tehnice
- `min(900px, 150vw)` înseamnă: "ia valoarea mai mică dintre 900px și 150% din lățimea viewport-ului"
- Pe iPhone 17 (~393px width), `150vw = ~590px`, deci aurora-blob va fi 590px în loc de 900px
- Efectul visual rămâne plăcut, dar fără overflow orizontal

---
**Data Fix**: 2026-02-07  
**Status**: ✅ Rezolvat
