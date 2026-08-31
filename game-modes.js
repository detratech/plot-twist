'use strict';

const SUGAR_COATED_CARD_IDS = Object.freeze([
  1, 2, 5, 7, 10, 12, 14, 15, 16, 17,
  18, 19, 21, 24, 25, 26, 31, 33, 35, 37,
  38, 43, 44, 45, 46, 54, 55, 56, 58, 59,
  60, 63, 64, 73, 80, 85, 86, 92, 98, 99,
  101, 104, 105, 107, 108, 110, 111, 113, 114, 117,
  118, 119, 121, 125, 126, 127, 128, 129, 130, 131,
  137, 138, 139, 142, 143, 144, 145, 147, 148, 150,
  152, 156, 161, 162, 163, 164, 165, 167, 168, 169,
  170, 171, 173, 175, 176, 178, 179, 180, 182, 184,
  187, 188, 190, 191, 194, 196, 197, 198, 199, 200
]);

const GAME_CONTENT_MODES = Object.freeze({
  sugar: Object.freeze({
    id: 'sugar',
    label: 'SUGAR COATED FOR SNOWFLAKES',
    description: 'The 100 strongest general-mode cards.',
    available: true,
    cardIds: SUGAR_COATED_CARD_IDS
  }),
  cutthroat: Object.freeze({
    id: 'cutthroat',
    label: 'CUTTHROAT HONEST',
    description: 'Vault-backed mode. Coming next.',
    available: false,
    cardIds: Object.freeze([])
  })
});
