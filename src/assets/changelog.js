export const changelog = [
  {
    version: 'v1.5.2',
    date: NaN,
    notes: ['fix: select component map', 'update: migrating to pnpm'],
  },
  {
    version: 'v1.5.1',
    date: 1613977652975,
    notes: ['fix: empty font-family fallback'],
  },
  {
    version: 'v1.5.0',
    date: 1613976451183,
    notes: ['new: custom font-family', 'fix: default font-family', 'new: common settings hook'],
  },
  {
    version: 'v1.4.1',
    date: 1613562336719,
    notes: ['fix: html iso language code', 'update: build target'],
  },
  {
    version: 'v1.4.0',
    date: 1613557282876,
    notes: [
      'new: combatant number limit',
      'new: switch show limit break',
      'new: short combatant name support',
    ],
  },
  {
    version: 'v1.3.0',
    date: 1613542026242,
    notes: ['new: multi-lingual support', 'new: custom select component'],
  },
  {
    version: 'v1.2.0',
    date: 1613373308393,
    notes: [
      'new: ui zoom support',
      'new: classification settings with tabs',
      'new: save settings to local storage',
      'fix: settings animation',
    ],
  },
  {
    version: 'v1.1.0',
    date: 1613293607036,
    notes: ['new: combatent sort settings', 'fix: max hit shadow overflow'],
  },
  {
    version: 'v1.0.0',
    date: 1613204843494,
    notes: ['update: initial release', 'refactor: migrate app to reactjs'],
  },
];

export const version = changelog[0].version;
