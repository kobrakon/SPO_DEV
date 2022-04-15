const ALL_VANILLA_QUESTS = require('./allVanillaQuestIds');

const JAEGER_ID = '5c0647fdd443bc2504c2d371';

class OnStartHandler {
  constructor(config) {
    this.config = config
    this.onStartConfig = config.at_start || {};
  }

  _disableVanillaQuests() {
    const nbQuests = ALL_VANILLA_QUESTS.length;

    const templates = DatabaseServer.tables.templates

    ALL_VANILLA_QUESTS.forEach(questId => {
      delete templates.quests[questId];
    });

    Logger.info(`=> Custom Quests: ${nbQuests} vanilla quests removed`);
  }

  _unlockJaegger() {
    DatabaseServer.tables.traders[JAEGER_ID].base.unlockedByDefault = true;
    Logger.info(`=> Custom Quests: Jaeger trader unlocked by default`);
  }

  _wipeProfilesForQuest(questId) {
    let nbWiped = 0;
    const profileIds = Object.keys(SaveServer.profiles);

    profileIds.forEach(profileId => {
      const profile = SaveServer.profiles[profileId];
      const pmcData = profile && profile.characters && profile.characters.pmc
      const dialogues = profile.dialogues || {};

      if (pmcData && pmcData.Quests) {
        // 1. wipe quests
        const Quests = pmcData.Quests.filter(q => q.qid !== questId);
        const questRemoved = Quests.length !== pmcData.Quests.length;

        pmcData.Quests = Quests;

        // 2. wipe backend counters
        if (!pmcData.BackendCounters) {
          pmcData.BackendCounters = {};
        }

        let backendCounterRemoved = false;
        const backendCounters = pmcData.BackendCounters;
        Object.keys(backendCounters).forEach(counterId => {
          const counter = backendCounters[counterId];

          if (counter && counter.qid === questId) {
            backendCounterRemoved = true;
            delete pmcData.BackendCounters[counterId];
          }
        });

        // 3. wipe condition counters
        const Counters = pmcData.ConditionCounters.Counters.filter(payload => payload.qid !== questId);
        const counterRemoved = Counters.length !== pmcData.ConditionCounters.Counters.length;

        pmcData.ConditionCounters.Counters = Counters;

        // 4. wipe DroppedItems
        let droppedItem = false;
        if (pmcData.Stats && pmcData.Stats.DroppedItems && pmcData.Stats.DroppedItems.length > 0) {
          const DroppedItems = pmcData.Stats.DroppedItems.filter(payload => payload.QuestId !== questId);

          if (DroppedItems.length !== pmcData.Stats.DroppedItems.length) {
            droppedItem = true;
          }

          pmcData.Stats.DroppedItems = DroppedItems;
        }

        if (questRemoved || backendCounterRemoved || counterRemoved || droppedItem) {
          nbWiped += 1;
        }
      }

      // 5. wipe dialogues
      Object.keys(dialogues).forEach(dialogId => {
        const dialogue = dialogues[dialogId] || {};
        const messages = dialogue.messages || [];
        dialogue.messages = messages.filter(msg => msg.templateId !== `${questId}_description` && msg.templateId !== `${questId}_success_message_text`)
      });


    });

    if (nbWiped > 0) {
      Logger.info(`=> Custom Quests: wiped ${nbWiped} profile${nbWiped > 1 ? 's' : ''} for quest '${questId}'`);
    }
  }

  beforeCustomQuestsLoaded() {
    if (this.onStartConfig.disable_all_vanilla_quests) {
      this._disableVanillaQuests();
      this._unlockJaegger();
    }
  }

  afterCustomQuestsLoaded(loadedQuests) {
    SaveServer.load();

    loadedQuests.forEach(quest => {
      if (this.onStartConfig.wipe_enabled_custom_quests_state_from_all_profiles && !quest.disabled) {
        this._wipeProfilesForQuest(quest._id);
      } else if (this.onStartConfig.wipe_disabled_custom_quests_state_from_all_profiles && quest.disabled) {
        this._wipeProfilesForQuest(quest._id);
      }
    });

    SaveServer.save();
  }
}

module.exports = OnStartHandler