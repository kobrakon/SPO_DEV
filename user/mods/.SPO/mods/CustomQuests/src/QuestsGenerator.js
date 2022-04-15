const CustomQuestsTransformer = require('./CustomQuestsTransformer');

class QuestsGenerator {
  constructor(story) {
    this.story = story;
  }

  assertValidCustomQuest(customQuest) {
    if (typeof customQuest.id !== 'string') {
      throw new Error(`=> Custom Quests: invalid quest, no id found`);
    }
    if (customQuest.id == '') {
      throw new Error(`=> Custom Quests: invalid quest, empty id found`);
    }
    if (typeof customQuest.trader_id !== 'string') {
      throw new Error(
        `=> Custom Quests: invalid quest '${customQuest.id}', no trader_id found`
      );
    }
    if (customQuest.trader_id === 'ragfair') {
      throw new Error(
        `=> Custom Quests: invalid quest '${customQuest.id}', ragfair cannot be used for quests!`
      );
    }
  }

  generateWithLocales() {
    const result = [];

    this.story.forEach((customQuest) => {
      if (customQuest.disabled) {
        Logger.warning(
          `=> Custom Quests: quest '${customQuest.id}' is disabled`
        );
      } else {
        this.assertValidCustomQuest(customQuest);
        const transformer = new CustomQuestsTransformer(customQuest);

        const generatedQuest = transformer.generateQuest();
        const payload = [
          generatedQuest,
          transformer.generateLocales(generatedQuest),
        ];
        result.push(payload);
      }
    });

    return result;
  }
}

module.exports = QuestsGenerator;
