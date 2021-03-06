import s from './selectors'

const DECK_ID = '5n25n35n235n45n65n625s35n125n145w95w165s21'
const FREEZE_DECK_ID = '5n14w15n25w25n35n44n54n62n622n633w114w6'
const HAND = ['W9', 'W16', 'N12', 'S3']

describe('Dry-runner — Set RNG', () => {
  ;[
    { name: 'Frozen Cores', id: 'W9', mana: 3 },
    { name: 'Dawnsparks', id: 'W16', mana: 4 },
  ].forEach(({ name, id, mana }) => {
    it(`should only be possible to get mana from ${name} that have not been destroyed yet`, () => {
      cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
        .drDrawHand(HAND)
        .drEndTurn(3)

        .drSetRNG('FRIENDLY')
        .drPlay(id)

        .drEndTurn()
        .get(s.MANA)
        .should('contain', 7 + mana)

        .drSetRNG('UNFRIENDLY')

        .drEndTurn()
        .get(s.MANA)
        .should('contain', 8)
    })
  })

  it('should only be possible to get Ahmi back in hand in FRIENDLY mode', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)
      .drEndTurn(3)

      .drSetRNG('FRIENDLY')
      .drPlay('S3')

      .drSetRNG('UNFRIENDLY')
      .drPlay('S3')

      .get('S3')
      .should('not.exist')
  })

  it('should not be possible to freeze many units with Frosthexers in UNFRIENDLY mode', () => {
    cy.visit(`/deck/${FREEZE_DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(['W1', 'W2', 'N1', 'N2'])
      .drEndTurn()

      .drSetRNG('UNFRIENDLY')
      .drPlay('W2')

      .drSelect('W1')
      .get(s.PLAY_BTN)
      .should('be.disabled')
  })
})
