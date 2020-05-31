import StateMachine from 'javascript-state-machine'
import { FACTIONS, RACES, RARITIES, TYPES } from '../../../constants/game'
import { KITTY_ID, TRIVIA_CHANNEL } from '../../../constants/bot'
import cards from '../../../data/cards'
import arrayRandom from '../../../helpers/arrayRandom'
import getCardsForSearch from '../../../helpers/getCardsForSearch'
import handleSearchAlias from '../../../helpers/handleSearchAlias'

const trivia = new StateMachine({
  init: 'STOPPED',

  data: {
    timers: [],
    card: null,
    initiator: null,
    duration: 1000 * 60,
    channel: null,
  },

  transitions: [
    { name: 'start', from: 'STOPPED', to: 'RUNNING' },
    { name: 'stop', from: 'RUNNING', to: 'STOPPED' },
  ],

  methods: {
    inspect: function () {
      console.log({
        state: this.state,
        card: this.card,
        initiator: this.initiator,
        duration: this.duration,
        timers: this.timers,
        channel: this.channel.id,
      })
    },

    halfTime: function (time) {
      this.channel.send(`⏳ Half the time has run out, hurry up!`)
    },

    timeout: function () {
      this.channel.send(
        `⌛️ Time’s up! The answer was “**${this.card.name}**”!`
      )
      this.stop()
    },

    onStart: function () {
      this.card = arrayRandom(cards.filter(card => !card.token))
      this.timers.push(setTimeout(this.timeout.bind(this), this.duration))
      this.timers.push(setTimeout(this.halfTime.bind(this), this.duration / 2))
    },

    initialise: function (author) {
      this.initiator = author
      this.start()

      return `🔮 Trivia started! You have ${
        this.duration / 1000
      } seconds to guess the card. You can ask questions and issue guesses with \`!trivia is <term>\`, like \`!trivia is pirate\` or \`!trivia is rof\`.`
    },

    onStop: function () {
      this.card = null
      this.initiator = null
      this.timers.forEach(clearTimeout)
      this.timers = []
    },

    abort: function (author) {
      if (author.id !== this.initiator.id && author.id !== KITTY_ID) return

      const username = this.initiator.username
      const cardName = this.card.name
      this.stop()

      return `🔌 ${username} originally started the trivia, and now they’re ending it. The answer was “**${cardName}**”.`
    },

    success: function (author) {
      const cardName = this.card.name
      this.stop()

      return `🎉 Correct! The answer was “**${cardName}**”. Congratulations ${author}!`
    },

    parseGuess: function (message) {
      if (message === 'hero') return ['hero', true]
      if (message === 'elder') return ['elder', true]
      if (Object.keys(RARITIES).includes(message)) return ['rarity', message]
      if (Object.keys(FACTIONS).includes(message)) return ['faction', message]
      if (Object.keys(TYPES).includes(message)) return ['type', message]
      if (Object.keys(RACES).includes(message)) return ['race', message]
      const [key, value] = handleSearchAlias(message)
      if (Object.keys(this.card).includes(key)) return [key, value]
      return []
    },

    guess: function (message, author) {
      const [key, value] = this.parseGuess(message)

      if (key) {
        if (value === true) {
          const lead = key === 'elder' ? 'an' : 'a'
          return trivia.card[key] === value
            ? `👍 Yes, the card is ${lead} *${key}*.`
            : `👎 No, the card is not ${lead} *${key}*.`
        } else {
          return trivia.card[key] === value
            ? `👍 Yes, the card’s *${key}* is indeed “**${value}**”.`
            : `👎 No, the card’s *${key}* is not “${value}”.`
        }
      }

      const [card] = getCardsForSearch(message)

      if (card) {
        if (card.name === this.card.name) return this.success(author)
        else return `❌ The card is not “${card.name}”, try again!`
      }
    },

    help: function () {
      return [
        '- `!trivia start` to start a round (if not already started)',
        '- `!trivia stop` to stop the round (only for the initiator of the ongoing round)',
        '- `!trivia is <prop|guess>` to ask for a hint or guess the answer',
      ].join('\n')
    },

    setDuration: function (message) {
      const duration = +message.replace('duration', '').trim()
      this.duration = duration

      return `⏱ Trivia duration set to ${duration / 1000} seconds.`
    },
  },
})

export default {
  command: 'trivia',
  name: 'Card trivia',
  example: 'help',
  description: `KittyBot picks a card at random and you have to find which! (only in <#${TRIVIA_CHANNEL}>)`,
  icon: '🔮',
  ping: false,
  isAllowed: channel => channel.id === TRIVIA_CHANNEL,
  handler: function (message, client, { author }) {
    message = message.toLowerCase()

    // It is necessary to store the channel to be able to send messages that are
    // not answers to incoming users’ message, such as the result of a timeout.
    if (!trivia.channel) {
      trivia.channel = client.channels.cache.get(TRIVIA_CHANNEL)
    }

    if (message === 'help') {
      return trivia.help()
    }

    if (trivia.can('start') && message === 'start') {
      return trivia.initialise(author)
    }

    if (trivia.can('stop') && message === 'stop') {
      return trivia.abort(author)
    }

    if (trivia.is('RUNNING') && message.startsWith('is ')) {
      return trivia.guess(message.replace('is ', '').trim(), author)
    }

    // Custom commands for Kitty to monitor/control the bot at runtime.
    if (author.id === KITTY_ID) {
      if (message.startsWith('duration')) {
        return trivia.setDuration(message)
      }

      if (message === 'inspect') {
        return trivia.inspect()
      }
    }
  },
}