// TODO?: adjust foreground colors (opposite color wheel nuance ?)

const WHITE = '0 0% 100%' // hsl(0 0% 100%)
const LIGHT_FOREGROUND = '215 25% 27%' // hsl(215 25% 27%) slate-700
const SLATE50 = '210 40% 98%' // hsl(210 40% 98%)
const SLATE900 = '222.2 47.4% 11.2%' // hsl(222 48% 11%)

export const lightTheme = {
  '--radius': '0.8rem',

  '--background': WHITE,
  '--foreground': LIGHT_FOREGROUND,
  '--foreground-sharp': '220 40% 15%', // hsl(220 40% 15%)
  '--foreground-secondary': '215 19% 35%', // hsl(215 19% 35%) slate-600
  '--foreground-soft': '215 16% 47%', // hsl(215 16% 47%) slate-500
  '--foreground-dim': '215 20% 65%', // hsl(215 20% 65%) slate-400
  '--foreground-disabled': '213 27% 84%', // hsl(213 27% 84%) slate-300

  '--card': WHITE,
  '--card-foreground': LIGHT_FOREGROUND,
  '--popover': WHITE,
  '--popover-foreground': LIGHT_FOREGROUND,
  '--muted': '210 40% 96.1%',
  '--muted-foreground': '215.4 16.3% 46.9%',
  // TODO?: accent nuance
  '--accent': '210 40% 96.1%', // hsl(210 40% 96%) slate-100
  '--accent-foreground': SLATE900,
  '--menu': '210 40% 96.1%', // slate-100
  '--menu-foreground': LIGHT_FOREGROUND,
  '--details': '210 40% 96.1%', // slate-100
  '--details-foreground': LIGHT_FOREGROUND,

  '--border': '214.3 31.8% 91.4%', // hsl(214 31% 91%) slate-200
  '--input': '214.3 31.8% 91.4%', // hsl(214 31% 91%) slate-200
  '--ring': '235 90% 74%', // hsl(235 90% 74%) indigo-400

  // Colors
  '--default': '215.3 19.3% 34.5%', // hsl(215 19% 34%) slate-600
  '--default-foreground': SLATE50,
  '--default-sharp': '215 25% 27%', // hsl(215 25% 27%) slate-700
  '--default-sharp-foreground': '210 40% 96%', // hsl(210 40% 96%) slate-100
  '--default-soft': '215.4 16.3% 46.9%', // hsl(215 16% 47%) slate-500
  '--default-soft-foreground': SLATE50,
  '--default-dim': '210 40% 96.1%', // hsl(210 40% 96%) slate-100
  '--default-dim-foreground': SLATE900,

  '--primary': '243.4 75.4% 58.6%', // hsl(243 75% 59%) indigo-600
  '--primary-foreground': SLATE50,
  '--primary-sharp': '244.5 57.9% 50.6%', // hsl(245 58% 51%) indigo-700
  '--primary-sharp-foreground': SLATE50,
  '--primary-soft': '238.7 83.5% 66.7%', // hsl(239 84% 67%) indigo-500
  '--primary-soft-foreground': SLATE50,
  '--primary-dim': '226.5 100% 93.9%', // hsl(227 100% 94%) indigo-100
  '--primary-dim-foreground': '244.5 57.9% 50.6%', // hsl(245 58% 51%) indigo-700

  // TODO?: Same as default for now
  '--secondary': '215.3 19.3% 34.5%', // hsl(215 19% 34%) slate-600
  '--secondary-foreground': SLATE50,
  '--secondary-sharp': '215 25% 27%', // hsl(215 25% 27%) slate-700
  '--secondary-sharp-foreground': '210 40% 96%', // hsl(210 40% 96%) slate-100
  '--secondary-soft': '215.4 16.3% 46.9%', // hsl(215 16% 47%) slate-500
  '--secondary-soft-foreground': SLATE50,
  '--secondary-dim': '210 40% 96.1%', // hsl(210 40% 96%) slate-100
  '--secondary-dim-foreground': SLATE900,

  '--danger': '0 72.2% 50.6%', // hsl(0 72% 50%) red-600
  '--danger-foreground': SLATE50,
  '--danger-sharp': '0 73.7% 41.8%', // hsl(0 74% 42%) red-700
  '--danger-sharp-foreground': SLATE50,
  '--danger-soft': '0 84.2% 60.2%', // hsl(0 84% 60%) red-500
  '--danger-soft-foreground': SLATE50,
  '--danger-dim': '0 93.3% 94.1%', // hsl(0 93% 94%) red-100
  '--danger-dim-foreground': SLATE900,

  '--warning': '20.5 90.2% 48.2%', // hsl(20 90% 48%) orange-600
  '--warning-foreground': SLATE50,
  '--warning-sharp': '17.5 88.3% 40.4%', // hsl(17 88% 40%) orange-700
  '--warning-sharp-foreground': SLATE50,
  '--warning-soft': '24.6 95% 53.1%', // hsl(24 95% 53%) orange-500
  '--warning-soft-foreground': SLATE50,
  '--warning-dim': '34.3 100% 91.8%', // hsl(34 100% 92%) orange-100
  '--warning-dim-foreground': SLATE900,

  '--info': '221.2,83.2%,53.3%', // hsl(221 83% 53%) blue-600
  '--info-foreground': SLATE50,
  '--info-sharp': '224.3 76.3% 48%', // hsl(224 76% 48%) blue-700
  '--info-sharp-foreground': SLATE50,
  '--info-soft': '217.2 91.2% 59.8%', // hsl(217 91% 60%) blue-500
  '--info-soft-foreground': SLATE50,
  '--info-dim': '214.3 94.6% 92.7%', // hsl(214 95% 93%) blue-100
  '--info-dim-foreground': SLATE900,

  '--success': '142.1 76.2% 36.3%', // hsl(142 76% 36%) green-600
  '--success-foreground': SLATE50,
  '--success-sharp': '142.4 71.8% 29.2%', // hsl(142 72% 29%) green-700
  '--success-sharp-foreground': SLATE50,
  '--success-soft': '142.1 70.6% 45.3%', // hsl(142 71% 45%) green-500
  '--success-soft-foreground': SLATE50,
  '--success-dim': '140.6 84.2% 92.5%', // hsl(141 84% 93%) green-100
  '--success-dim-foreground': SLATE900,

  '--gem': '161.4 93.5% 30.4%', // hsl(161 94% 30%) emerald-600
  '--gem-foreground': SLATE50,
  '--gem-sharp': '162.9 93.5% 24.3%', // hsl(163 93% 24%) emerald-700
  '--gem-sharp-foreground': SLATE50,
  '--gem-soft': '160.1 84.1% 39.4%', // hsl(160 84% 39%) emerald-500
  '--gem-soft-foreground': SLATE50,
  '--gem-dim': '149.3 80.4% 90%', // hsl(149 80% 90%) emerald-100
  '--gem-dim-foreground': SLATE900,

  '--precious': '333.3 71.4% 50.6%', // hsl(333 71% 50%) pink-600
  '--precious-foreground': SLATE50,
  '--precious-sharp': '335.1 77.6% 42%', // hsl(335 77% 42%) pink-700
  '--precious-sharp-foreground': SLATE50,
  '--precious-soft': '330.4 81.2% 60.4%', // hsl(330 81% 60%) pink-500
  '--precious-soft-foreground': SLATE50,
  '--precious-dim': '325.7 77.8% 94.7%', // hsl(326 78% 95%) pink-100
  '--precious-dim-foreground': SLATE900,

  // Special
  '--day': '243.4 75.4% 58.6%', // hsl(243 75% 59%) indigo-600
  '--day-foreground': SLATE50,
  '--day-sharp': '244.5 57.9% 50.6%', // hsl(245 58% 51%) indigo-700
  '--day-sharp-foreground': SLATE50,
  '--day-soft': '238.7 83.5% 66.7%', // hsl(239 84% 67%) indigo-500
  '--day-soft-foreground': SLATE50,
  '--day-dim': '226.5 100% 93.9%', // hsl(227 100% 94%) indigo-100
  '--day-dim-foreground': SLATE900,

  '--week': '200.4 98% 39.4%', // hsl(200 98% 39%) sky-600
  '--week-foreground': SLATE50,
  '--week-sharp': '201.3 96.3% 32.2%', // hsl(201 96% 32%) sky-700
  '--week-sharp-foreground': SLATE50,
  '--week-soft': '198.6 88.7% 48.4%', // hsl(199 89% 48%) sky-500
  '--week-soft-foreground': SLATE50,
  '--week-dim': '204 93.8% 93.7%', // hsl(204 94% 94%) sky-100
  '--week-dim-foreground': SLATE900,

  '--month': '271.5 81.3% 55.9%', // hsl(271 81% 56%) purple-600
  '--month-foreground': SLATE50,
  '--month-sharp': '272.1 71.7% 47.1%', // hsl(272 72% 47%) purple-700
  '--month-sharp-foreground': SLATE50,
  '--month-soft': '270.7 91% 65.1%', // hsl(271 91% 65%) purple-500
  '--month-soft-foreground': SLATE50,
  '--month-dim': '268.7 100% 95.5%', // hsl(269 100% 95%) purple-100
  '--month-dim-foreground': SLATE900,
}
