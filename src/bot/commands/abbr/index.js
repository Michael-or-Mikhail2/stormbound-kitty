import getAbbreviations from '../../../helpers/getAbbreviations'
import toSentence from '../../../helpers/toSentence'
import getEmbed from '../../../helpers/getEmbed'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')

const quotify = value => `“${value}”`

export default {
  command: 'abbr',
  help: function () {
    return getEmbed()
      .setTitle(`❔  Abbreviation: help`)
      .setURL('https://stormbound-kitty.com/guides/lexicon')
      .setDescription(
        `Get the meaning of a card or popular abbreviation (regardless of casing). For instance, \`!${this.command} rof\` or \`!${this.command} AoE\`.`
      )
  },
  handler: function (message) {
    const matches = ABBREVIATIONS[message.toLowerCase()]

    if (!matches) return

    const embed = getEmbed()

    embed
      .setTitle(`❔  Abbreviation: “${message}”`)
      .setURL('https://stormbound-kitty.com/guides/lexicon')
      .setDescription(
        `“${message}” might mean ${toSentence(matches.map(quotify), 'or')}.`
      )

    return embed
  },
}
