import React from 'react'
import BattleSimApp from '../BattleSimApp'
import Card from '../Card'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import Guide from '../Guide'
import Notice from '../Notice'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import guides from '../../data/guides'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import getInitialCardData from '../../helpers/getInitialCardData'

const guide = guides.find(g => g.id === 'BROODMOTHER_QORDIA_GUIDE')

export default React.memo(function GuideBroodmotherQordia(props) {
  return (
    <Guide {...guide}>
      <p>
        Broodmother Qordia is a pretty under-appreciated card because she costs
        a lot of mana and is essentially random, which means hard to pull off.
        In this guide, I will show you ways to play this card with maximum
        value.
      </p>

      <div className='Article__fullwidth'>
        <CardBuilderCardDisplay {...getInitialCardData('F21')} />
      </div>

      <Title id='eggs'>It’s all in the eggs</Title>

      <Row desktopOnly wideGutter>
        <Column width='2/3'>
          <p>
            The main power and weakness of Qordia is her eggs. She lays 3 of
            them randomly around here (or fewer if there are not enough empty
            surrounding cells). Because of her high mana cost (7) and the random
            aspect of her ability, it is a “high risk, high reward” kind of
            card.
          </p>

          <p>
            Qordia’s eggs (or “nests” as they are called in the game) are
            considered structures before they hatch. That means they are granted
            immunity to poison, freezing, pushing and pulling, confusion, life
            drain and conversion. Eggs are also immune to some spells and cards’
            attack abilities such as <WikiLink id='I7' />’ or{' '}
            <WikiLink id='F18' />.
          </p>
          <p>
            At the same time, eggs only have 1 strength, so they can be
            destroyed pretty easily by cards like <WikiLink id='N29' /> or{' '}
            <WikiLink id='N47' />.
          </p>

          <p>
            This is all to say that there is some use to Broodmother Qordia.
          </p>
        </Column>
        <Column width='1/3' style={{ justifyContent: 'center' }}>
          <Card
            {...getResolvedCardData({ id: 'T12', level: 1 })}
            rarity='common'
          />
        </Column>
      </Row>

      <Title id='defensive-usage'>Defensive usage</Title>

      <p>
        Using Broodmother Qordia defensively is a really risky move, because the
        mana cost is so high that it is likely that playing several other cards
        might be better.
      </p>
      <p>
        If mana is not a concern, try to play her as a last card, so you get to
        play other cards effectively while there are no eggs lying around. This
        also enables you to leave some empty “pockets” for eggs to be laid
        there.
      </p>

      <p>
        Just like with <WikiLink id='F8' />, eggs are a good way to prevent
        runners to rush through your baseline and into your base.{' '}
      </p>

      <div className='Article__fullwidth'>
        <BattleSimApp
          environment='shadowfen'
          mode='DISPLAY'
          simId='LCwsLCwsLCwsMVQxMkIxLCwsLCw1RjIxQjEsMVQxMkIxLCwxVDEyQjEsLDtSMTBOLUIxMEY7M00wOzs='
        />
      </div>

      <Title id='offensive-usage'>Offensive usage</Title>

      <p>
        The best use of Broodmother Qordia has to be a super-offensive play on
        the enemy’s baseline. Her ability to lay eggs around her makes her one
        of the only 2 units in the game able to drop a structure on the enemy’s
        baseline (<WikiLink id='W13' /> being the other one). This gives
        incredible opportunities to “baselock” the opponent, by filling all the
        available cells on their line to prevent them from defending.
      </p>

      <p>
        And because her eggs are considered structures, they cannot be frozen,
        poisoned, confused, pushed or pull which makes them essentially
        impossible to clear without physical damage.
      </p>

      <p>
        Note that Qordia has 1 movement, which means she will attempt to move
        after having laid eggs, provided she is not blocked to do so. With a bit
        of luck, she lays eggs on the side, and moves forward.
      </p>

      <div className='Article__fullwidth'>
        <BattleSimApp
          environment='shadowfen'
          mode='DISPLAY'
          simId='MVQxMkIxLDFUMTJCMSwsLCw1RjIxQjEsLCwxVDEyQjEsLCwsLCwsLCwsLDtSMTBOLUIxMEY7M00wOzs='
        />
      </div>

      <Title id='alternative-usage'>Alternative usages</Title>

      <p>
        Qordia has some other interesting offensive uses, for instance alongside{' '}
        <WikiLink id='N20' />. Eggs layed in front of the Emerald Towers will
        hatch <span className='Highlight'>before</span> the latter resolves,
        which grants an immediately buffed and moving unit. Beware of{' '}
        <WikiLink id='N68' /> though as this card can be quite a threat to this
        combo.
      </p>

      <div className='Article__fullwidth'>
        <BattleSimApp
          environment='shadowfen'
          mode='DISPLAY'
          simId='LCwsLCwsLCwsLDFUMTJCMSwsLCw1RjIxQjEsMVQxMkIxLCwxVDEyQjEsLDNOMjBCMTtSMTBOLUIxMEY7M00wOzs='
        />
      </div>

      <p>
        Another interesting use of Broodmother Qordia is when paired with{' '}
        <WikiLink id='N39' />. Because eggs are considered structures,
        Hearthguards’ ability works on them, which can be a powerful (albeit
        expensive) finisher.
      </p>

      <Notice>
        And now, go practice and explore your own Qordia strategies and builds!
      </Notice>
    </Guide>
  )
})
