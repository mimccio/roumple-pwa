// TODO?: adjust foreground colors (opposite color wheel nuance ?)

const WHITE = '0 0% 100%' // hsl(0 0% 100%)
const DARK_FOREGROUND = '0 0% 95%' // hsl(0 0% 95%)
const ZINC950 = '240 10% 4%' // hsl(240 10% 4%)

export const darkTheme = {
  '--radius': '1rem',

  '--background': '20 14% 4%', // hsl(20, 14%, 4%) stone-950
  '--foreground': DARK_FOREGROUND,
  '--foreground-sharp': WHITE,
  '--foreground-secondary': '0 0% 89.8%', // hsl(0 0% 90%) neutral-200
  '--foreground-soft': '0 0% 83.1%', // hsl(0 0% 83%) neutral-300
  '--foreground-dim': '0 0% 63.9%', // hsl(0 0% 64%) neutral-400
  '--foreground-disabled': '0 0% 32.2%', // hsl(0 0% 32%) neutral-600

  '--card': '24 9.8% 10%', // hsl(24 10% 10%) stone-900
  '--card-foreground': DARK_FOREGROUND,
  '--popover': '0 0% 9%', // hsl(0 0% 9%) neutral-900
  '--popover-foreground': DARK_FOREGROUND,
  '--muted': '0 0% 15%', // hsl(0 0% 15%) neutral-800
  '--muted-foreground': '240 5% 64.9%', // hsl(240 5% 65%) zinc-400
  // TODO?: accent nuance
  '--accent': '240 3.7% 15.9%', // hsl(240 4% 16%) zinc-800
  '--accent-foreground': ' 0 0% 98%', // hsl( 0 0% 98%) neutral-50
  '--menu': '24 9.8% 10%', // hsl(24 10% 10%) stone-900
  '--menu-foreground': DARK_FOREGROUND,
  '--details': '24 9.8% 10%', // hsl(24 10% 10%) stone-900
  '--details-foreground': DARK_FOREGROUND,

  '--border': '12,6.5%,15.1%', // hsl(12,6%,15%) stone-800
  '--input': '12,6.5%,15.1%', // hsl(12,6%,15%) stone-800
  '--ring': '244.5 57.9% 50.6%', // hsl(245 58% 51%) indigo-700

  // Colors
  '--default': '240 3.8% 46.1%', // hsl(240 4% 46%) zinc-500
  '--default-foreground': ZINC950,
  '--default-sharp': '240,5%,64.9%', // hsl(240 5% 65%) zinc-400
  '--default-sharp-foreground': ZINC950,
  '--default-soft': '215 13.8% 34.1%', // hsl(240 5% 34%) zinc-600
  '--default-soft-foreground': ZINC950,
  '--default-dim': '240 3.7% 15.9%', // hsl(240 4% 16%) zinc-800
  '--default-dim-foreground': '240 4.9% 83.9%', // hsl(240 5% 84%) zinc-300

  '--primary': '238.7 83.5% 66.7%', // hsl(239 84% 67%) indigo-500
  '--primary-foreground': ZINC950,
  '--primary-sharp': '255.1 91.7% 76.3%', // hsl(255 92% 76%) indigo-400
  '--primary-sharp-foreground': ZINC950,
  '--primary-soft': '243.4 75.4% 58.6%', // hsl(243 75% 59%) indigo-600
  '--primary-soft-foreground': ZINC950,
  '--primary-dim': '243.7 54.5% 41.4%', // hsl(244 55% 41%) indigo-800
  '--primary-dim-foreground': '228 96.5% 88.8%', // hsl(228 96% 89%) indigo-200

  // TODO?: Same as default for now
  '--secondary': '240 3.8% 46.1%', // hsl(240 4% 46%) zinc-500
  '--secondary-foreground': ZINC950,
  '--secondary-sharp': '240 5% 64.9%', // hsl(240 5% 65%) zinc-400
  '--secondary-sharp-foreground': ZINC950,
  '--secondary-soft': '215 13.8% 34.1%', // hsl(240 5% 34%) zinc-600
  '--secondary-soft-foreground': ZINC950,
  '--secondary-dim': '240 3.7% 15.9%', // hsl(240 4% 16%) zinc-800
  '--secondary-dim-foreground': '240 4.9% 83.9%', // hsl(240 5% 84%) zinc-300

  '--danger': '0 84.2% 60.2%', // hsl(0 84% 60%) red-500
  '--danger-foreground': ZINC950,
  '--danger-sharp': '0 90.6% 70.8%', // hsl(0 91% 71%) red-400
  '--danger-sharp-foreground': ZINC950,
  '--danger-soft': '0 72.2% 50.6%', // hsl(0 72% 50%) red-600
  '--danger-soft-foreground': ZINC950,
  '--danger-dim': '0 70% 35.3%', // hsl(0 70% 35%) red-800
  '--danger-dim-foreground': '0 93.3% 94.1%', // hsl(0 93% 94%) red-100

  '--warning': '24.6 95% 53.1%', // hsl(24 95% 53%) orange-500
  '--warning-foreground': ZINC950,
  '--warning-sharp': '27 96% 61%', // hsl(27,96%,61%) orange-400
  '--warning-sharp-foreground': ZINC950,
  '--warning-soft': '20.5 90.2% 48.2%', // hsl(20 90% 48%) orange-600
  '--warning-soft-foreground': ZINC950,
  '--warning-dim': '15 79.1% 33.7%', // hsl(15 79% 34%) orange-800
  '--warning-dim-foreground': '34.3 100% 91.8%', // hsl(34,100%,92%) orange-100

  '--info': '217.2 91.2% 59.8%', // hsl(217 91% 60%) blue-500
  '--info-foreground': ZINC950,
  '--info-sharp': '213.1 93.9% 67.8%', // hsl(213,94%,68%) blue-400
  '--info-sharp-foreground': ZINC950,
  '--info-soft': '221.2 83.2% 53.3%', // hsl(221 83% 53%) blue-600
  '--info-soft-foreground': ZINC950,
  '--info-dim': '225.9 70.7% 40.2%', // hsl(226,71%,40%) blue-800
  '--info-dim-foreground': '214.3 94.6% 92.7%', // hsl(214 95% 93%) blue-100

  '--success': '142.1 70.6% 45.3%', // hsl(142 71% 45%) green-500
  '--success-foreground': ZINC950,
  '--success-sharp': '141.9 69.2% 58%', // hsl(142,69%,58%) green-400
  '--success-sharp-foreground': ZINC950,
  '--success-soft': '142.1 76.2% 36.3%', // hsl(142 76% 36%) green-600
  '--success-soft-foreground': ZINC950,
  '--success-dim': '142.8 64.2% 24.1%', // hsl(143,64%,24%) green-800
  '--success-dim-foreground': '140.6 84.2% 92.5%', // hsl(141 84% 93%) green-100

  '--gem': '160.1 84.1% 39.4%', // hsl(160 84% 39%) emerald-500
  '--gem-foreground': ZINC950,
  '--gem-sharp': '158.1 64.4% 51.6%', // hsl(158,64%,52%) emerald-400
  '--gem-sharp-foreground': ZINC950,
  '--gem-soft': '161.4 93.5% 30.4%', // hsl(161 94% 30%) emerald-600
  '--gem-soft-foreground': ZINC950,
  '--gem-dim': '163.1 88.1% 19.8%', // hsl(163,88%,20%) emerald-800
  '--gem-dim-foreground': '149.3 80.4% 90%', // hsl(149 80% 90%) emerald-100

  '--precious': '330.4 81.2% 60.4%', // hsl(330 81% 60%) pink-500
  '--precious-foreground': ZINC950,
  '--precious-sharp': '328.6 85.5% 70.2%', // hsl(329,85%,70%) pink-400
  '--precious-sharp-foreground': ZINC950,
  '--precious-soft': '333.3 71.4% 50.6%', // hsl(333 71% 50%) pink-600
  '--precious-soft-foreground': ZINC950,
  '--precious-dim': '335.8 74.4% 35.3%', // hsl(336,74%,35%) pink-800
  '--precious-dim-foreground': '325.7 77.8% 94.7%', // hsl(326 78% 95%) pink-100

  // Special
  '--day': '238.7 83.5% 66.7%', // hsl(239 84% 67%) indigo-500
  '--day-foreground': ZINC950,
  '--day-sharp': '255.1 91.7% 76.3%', // hsl(255 92% 76%) indigo-400
  '--day-sharp-foreground': ZINC950,
  '--day-soft': '243.4 75.4% 58.6%', // hsl(243 75% 59%) indigo-600
  '--day-soft-foreground': ZINC950,
  '--day-dim': '243.7 54.5% 41.4%', // hsl(244 55% 41%) indigo-800
  '--day-dim-foreground': '228 96.5% 88.8%', // hsl(228 96% 89%) indigo-200

  '--week': '198.6 88.7% 48.4%', // hsl(199 89% 48%) sky-500
  '--week-foreground': ZINC950,
  '--week-sharp': '198.4 93.2% 59.6%', // hsl(198,93%,60%) sky-400
  '--week-sharp-foreground': ZINC950,
  '--week-soft': '200.4 98% 39.4%', // hsl(200 98% 39%) sky-600
  '--week-soft-foreground': ZINC950,
  '--week-dim': '201 90% 27.5%', // hsl(201,90%,27%) sky-800
  '--week-dim-foreground': '204 93.8% 93.7%', // hsl(204 94% 94%) sky-100

  '--month': '270.7 91% 65.1%', // hsl(271 91% 65%) purple-500
  '--month-foreground': ZINC950,
  '--month-sharp': '270 95.2% 75.3%', // hsl(270,95%,75%) purple-400
  '--month-sharp-foreground': ZINC950,
  '--month-soft': '271.5 81.3% 55.9%', // hsl(271 81% 56%) purple-600
  '--month-soft-foreground': ZINC950,
  '--month-dim': '272.9 67.2% 39.4%', // hsl(273,67%,39%) purple-800
  '--month-dim-foreground': '268.7 100% 95.5%', // hsl(269 100% 95%) purple-100
}
