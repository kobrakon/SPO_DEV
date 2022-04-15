const utils = require('./utils');
const RewardsGenerator = require('./RewardsGenerator');

const ALL_ZONES_BY_MAP = require('./allZonesByMap');
const ZONES = {};
Object.keys(ALL_ZONES_BY_MAP).forEach((mapName) => {
  ALL_ZONES_BY_MAP[mapName].forEach((zoneId) => {
    ZONES[zoneId] = mapName;
  });
});

const ALL_PLACES_BY_MAP = require('./allPlacesByMap');
const PLACES = {};
Object.keys(ALL_PLACES_BY_MAP).forEach((mapName) => {
  ALL_PLACES_BY_MAP[mapName].forEach((zoneId) => {
    PLACES[zoneId] = mapName;
  });
});

const FALLBACK_LOCALE = 'en';
const DEFAULT_IMAGE_ID = '5a27cafa86f77424e20615d6';
const DEFAULT_LOCATION = 'any';
const DEFAULT_TYPE = 'Completion';
const DEFAULT_SUCCESS_MESSAGE = 'Quest successfully completed';
const DEFAULT_PLANT_TIME = 30;

const QUEST_STATUS_SUCCESS = [QuestHelper.status.Success];
const QUEST_STATUS_STARTED = [
  QuestHelper.status.Started,
  QuestHelper.status.Success,
];

const SIGNAL_JAMMER_ID = '5ac78a9b86f7741cca0bbd8d';
const BEACON_ITEM_ID = '5991b51486f77447b112d44f';

const TRADER_ALIASES = {
  prapor: '54cb50c76803fa8b248b4571',
  therapist: '54cb57776803fa99248b456e',
  fence: '579dc571d53a0658a154fbec',
  skier: '58330581ace78e27b8b10cee',
  peacekeeper: '5935c25fb3acc3127c3d8cd9',
  mechanic: '5a7c2eca46aef81a7ca2145d',
  ragman: '5ac3b934156ae10c4430e83c',
  jaeger: '5c0647fdd443bc2504c2d371',
};

const DESCRIPTIVE_LOCATION_ALIASES = {
  bigmap: '56f40101d2720b2a4d8b45d6',
  customs: '56f40101d2720b2a4d8b45d6',
  factory: '55f2d3fd4bdc2d5f408b4567',
  interchange: '5714dbc024597771384a510d',
  laboratory: '5b0fc42d86f7744a585f9105',
  labs: '5b0fc42d86f7744a585f9105',
  lighthouse: '5704e4dad2720bb55b8b4567',
  rezervbase: '5704e5fad2720bc05b8b4567',
  reserve: '5704e5fad2720bc05b8b4567',
  shoreline: '5704e554d2720bac5b8b456e',
  woods: '5704e3c2d2720bac5b8b4567',
};

const LOCATION_ALIASES = {
  factory: ['factory4_day', 'factory4_night'],
  customs: ['bigmap'],
  reserve: ['RezervBase'],
  labs: ['laboratory'],
  woods: ['Woods'],
  shoreline: ['Shoreline'],
  interchange: ['Interchange'],
  lighthouse: ['Lighthouse']
};

const getTargetFromLocations = (locations) => {
  const result = [];

  locations.forEach((location) => {
    if (LOCATION_ALIASES[location]) {
      LOCATION_ALIASES[location].forEach((l) => {
        result.push(l);
      });
    } else {
      result.push(location);
    }
  });

  return result;
};

const getNeedSurviveTargetFromLocation = (location) => {
  return location === 'factory'
    ? ['factory4_day', 'factory4_night']
    : [location];
};

function generateKillConditionId(questId, mission) {
  return utils.getSHA256(
    JSON.stringify([
      questId,
      mission._id,
      mission.type,
      mission.count,
      mission.target,
      mission.locations,
    ])
  );
}

function generateGiveItemConditionId(questId, mission) {
  return utils.getSHA256(
    JSON.stringify([
      questId,
      mission._id,
      mission.type,
      mission.accepted_items,
      mission.count,
      mission.found_in_raid_only || false,
    ])
  );
}

function generatePlaceBeaconConditionId(questId, mission) {
  return utils.getSHA256(
    JSON.stringify([
      questId,
      mission._id,
      mission.type,
      mission.zone_id,
      mission.plant_time,
      mission.need_survive,
    ])
  );
}

function generateVisitPlaceConditionId(questId, mission) {
  return utils.getSHA256(
    JSON.stringify([
      questId,
      mission._id,
      mission.type,
      mission.place_id,
      mission.need_survive,
    ])
  );
}

class ConditionsGenerator {
  constructor(customQuest) {
    this.customQuest = customQuest;
  }

  static setPropsIndexes(conditions) {
    return conditions
      .filter((payload) => Boolean(payload))
      .map((payload, index) => {
        return {
          ...payload,
          _props: {
            ...payload._props,
            index,
          },
        };
      });
  }

  _generateLevelCondition() {
    const level_needed = this.customQuest.level_needed;
    const qid = this.customQuest.id;

    if (level_needed > 1) {
      return {
        _parent: 'Level',
        _props: {
          id: `${qid}_level_condition`,
          parentId: '',
          dynamicLocale: false,
          value: level_needed,
          compareMethod: '>=',
          visibilityConditions: [],
        },
        dynamicLocale: false,
      };
    }
  }

  _generateQuestCondition(questId, status = QUEST_STATUS_SUCCESS) {
    if (questId) {
      return {
        _parent: 'Quest',
        _props: {
          id: '',
          parentId: '',
          dynamicLocale: false,
          target: questId,
          status: status,
        },
        dynamicLocale: false,
      };
    }
  }

  _generateAvailableForStart() {
    const locked_by_quests = this.customQuest.locked_by_quests || [];
    const unlock_on_quest_start = this.customQuest.unlock_on_quest_start || [];

    const levelCondition = this._generateLevelCondition();

    const questSuccessConditions = locked_by_quests.map((questId) =>
      this._generateQuestCondition(questId, QUEST_STATUS_SUCCESS)
    );
    const questStartedConditions = unlock_on_quest_start.map((questId) =>
      this._generateQuestCondition(questId, QUEST_STATUS_STARTED)
    );

    return ConditionsGenerator.setPropsIndexes([
      levelCondition,
      ...questSuccessConditions,
      ...questStartedConditions,
    ]);
  }

  _generateKillCondition(mission) {
    const killConditionId = generateKillConditionId(
      this.customQuest.id,
      mission
    );
    const count = mission.count === undefined ? 1 : mission.count;

    if (count <= 0) {
      return null;
    }

    const conditions = [
      {
        _parent: 'Kills',
        _props: {
          // target = 'Savage' | 'AnyPmc' | 'Bear' | 'Usec
          target: mission.target || 'Savage',
          compareMethod: '>=',
          value: '1',
          id: `${killConditionId}_kill`,
        },
      },
      mission.locations &&
        mission.locations !== 'any' &&
        !mission.locations.includes('any')
        ? {
          _parent: 'Location',
          _props: {
            target: getTargetFromLocations(mission.locations),
            id: `${killConditionId}_location`,
          },
        }
        : null,
    ].filter((c) => Boolean(c));

    return {
      _parent: 'CounterCreator',
      _props: {
        counter: {
          id: `${killConditionId}_counter`,
          conditions: conditions,
        },
        id: killConditionId,
        parentId: '',
        oneSessionOnly: false,
        dynamicLocale: false,
        type: 'Elimination',
        doNotResetIfCounterCompleted: false,
        value: String(count),
        visibilityConditions: [],
      },
      dynamicLocale: false,
    };
  }

  _generateGiveItemCondition(mission) {
    const items = mission.accepted_items;
    const count = mission.count === undefined ? 1 : mission.count;
    const fir = mission.found_in_raid_only || false;

    if (!items || !items.length || count <= 0) {
      return null;
    }

    const id = generateGiveItemConditionId(this.customQuest.id, mission);

    return {
      _parent: 'HandoverItem',
      _props: {
        id,
        dogtagLevel: 0,
        maxDurability: 100,
        minDurability: 0,
        parentId: '',
        onlyFoundInRaid: fir,
        dynamicLocale: false,
        target: items,
        value: String(count),
        visibilityConditions: [],
      },
      dynamicLocale: false,
    };
  }

  _generatePlaceBeaconCondition(mission) {
    const qid = this.customQuest.id;

    if (!ZONES[mission.zone_id]) {
      Logger.error(
        `=> Custom Quests: no valid zone_id provided for mission of type '${mission.type}' (concerned quest: ${qid})`
      );
      return null;
    }

    const id = generatePlaceBeaconConditionId(qid, mission);

    let accepted_items = [];
    let _parent = 'PlaceBeacon';

    if (mission.type === 'PlaceBeacon') {
      accepted_items = [BEACON_ITEM_ID];
    } else if (mission.type === 'PlaceSignalJammer') {
      accepted_items = [SIGNAL_JAMMER_ID];
    } else if (mission.type === 'PlaceItem') {
      _parent = 'LeaveItemAtLocation';
      accepted_items = mission.accepted_items || [];

      if (!accepted_items.length) {
        Logger.error(
          `=> in custom quest '${qid}': no accepted_items provided for a PlaceItem mission `
        );
        return null;
      }
    }

    const placeBeaconCondition = {
      _parent,
      _props: {
        id,
        dogtagLevel: 0,
        maxDurability: 100,
        minDurability: 0,
        parentId: '',
        onlyFoundInRaid: false,
        dynamicLocale: false,
        plantTime: mission.plant_time || DEFAULT_PLANT_TIME,
        zoneId: mission.zone_id,
        target: accepted_items,
        value: '1',
        visibilityConditions: [],
      },
      dynamicLocale: false,
    };

    if (mission.need_survive) {
      const target = getNeedSurviveTargetFromLocation(ZONES[mission.zone_id]);

      return [
        placeBeaconCondition,
        {
          _parent: 'CounterCreator',
          _props: {
            counter: {
              id: `${id}_counter`,
              conditions: [
                {
                  _parent: 'Location',
                  _props: {
                    target: target,
                    id: `${id}_condition_location`,
                  },
                },
                {
                  _parent: 'ExitStatus',
                  _props: {
                    status: ['Survived', 'Runner'],
                    id: `${id}_condition_exitstatus`,
                  },
                },
              ],
            },
            id: `${id}_exit_location`,
            parentId: '',
            oneSessionOnly: false,
            dynamicLocale: false,
            type: 'Completion',
            doNotResetIfCounterCompleted: false,
            value: '1',
            visibilityConditions: [
              {
                _parent: 'CompleteCondition',
                _props: {
                  target: id,
                  id: `${id}_visibility_condition`,
                },
              },
            ],
          },
          dynamicLocale: false,
        },
      ];
    }

    return placeBeaconCondition;
  }

  _generateVisitPlaceCondition(mission) {
    const qid = this.customQuest.id;

    if (!PLACES[mission.place_id]) {
      Logger.error(
        `=> Custom Quests: no valid place_id provided for mission of type '${mission.type}' (concerned quest: ${qid})`
      );
      return null;
    }

    const id = generateVisitPlaceConditionId(qid, mission);

    const counterVisit = {
      _parent: 'CounterCreator',
      _props: {
        counter: {
          id: `${id}_counter`,
          conditions: [
            {
              _parent: 'VisitPlace',
              _props: {
                target: mission.place_id,
                value: '1',
                id: `${id}_visit_place`,
              },
            },
          ],
        },
        id: id,
        parentId: '',
        oneSessionOnly: false,
        dynamicLocale: false,
        type: 'Exploration',
        doNotResetIfCounterCompleted: false,
        value: '1',
        visibilityConditions: [],
      },
      dynamicLocale: false,
    };

    if (!mission.need_survive) {
      return counterVisit;
    }

    const target = getNeedSurviveTargetFromLocation(PLACES[mission.place_id]);

    const counterExit = {
      _parent: 'CounterCreator',
      _props: {
        counter: {
          id: `${id}_exit_counter`,
          conditions: [
            {
              _parent: 'Location',
              _props: {
                target: target,
                id: `${id}_condition_location`,
              },
            },
            {
              _parent: 'ExitStatus',
              _props: {
                status: ['Survived', 'Runner'],
                id: `${id}_condition_exitstatus`,
              },
            },
          ],
        },
        id: `${id}_exit_location`,
        parentId: '',
        oneSessionOnly: false,
        dynamicLocale: false,
        type: 'Completion',
        doNotResetIfCounterCompleted: false,
        value: '1',
        visibilityConditions: [
          {
            _parent: 'CompleteCondition',
            _props: {
              target: id,
              id: `${id}_visibility_condition`,
            },
          },
        ],
      },
      dynamicLocale: false,
    };

    return [counterVisit, counterExit];
  }

  _generateAvailableForFinish() {
    const missions = (this.customQuest.missions || [])
      .map((mission) => {
        if (mission.type === 'Kill') {
          return this._generateKillCondition(mission);
        } else if (mission.type === 'GiveItem') {
          return this._generateGiveItemCondition(mission);
        } else if (
          mission.type === 'PlaceBeacon' ||
          mission.type === 'PlaceSignalJammer' ||
          mission.type === 'PlaceItem'
        ) {
          return this._generatePlaceBeaconCondition(mission);
        } else if (mission.type === 'VisitPlace') {
          return this._generateVisitPlaceCondition(mission);
        }

        Logger.warning(
          `=> Custom Quests: ignored mission with type '${mission.type}'`
        );

        return null;
      })
      .filter((item) => Boolean(item));

    // flattens missions array
    const flattenedMissions = [];
    missions.forEach((mission) => {
      if (Array.isArray(mission)) {
        mission.forEach((m) => {
          if (m) flattenedMissions.push(m);
        });
      } else if (mission) {
        flattenedMissions.push(mission);
      }
    });

    return ConditionsGenerator.setPropsIndexes(flattenedMissions);
  }

  _generateFail() {
    // TODO
    return [];
  }

  generateConditions() {
    return {
      AvailableForStart: this._generateAvailableForStart(),
      AvailableForFinish: this._generateAvailableForFinish(),
      Fail: this._generateFail(),
    };
  }
}

class CustomQuestsTransformer {
  constructor(customQuest) {
    this.customQuest = customQuest;

    this.conditionsGenerator = new ConditionsGenerator(customQuest);
    this.rewardsGenerator = new RewardsGenerator(customQuest);
  }

  _getTraderId() {
    const traderId = this.customQuest.trader_id;

    const lowerCasedId = traderId.toLowerCase();
    if (TRADER_ALIASES[lowerCasedId]) {
      return TRADER_ALIASES[lowerCasedId];
    }

    return traderId;
  }

  _getDescriptiveLocation() {
    const location = this.customQuest.descriptive_location || DEFAULT_LOCATION;

    const lowerCasedLocation = location.toLowerCase();
    if (DESCRIPTIVE_LOCATION_ALIASES[lowerCasedLocation]) {
      return DESCRIPTIVE_LOCATION_ALIASES[lowerCasedLocation];
    }

    return location;
  }

  generateQuest() {
    const q = this.customQuest;
    const questId = q.id;
    const traderId = this._getTraderId();
    const image = `/files/quest/icon/${q.image || DEFAULT_IMAGE_ID}.jpg`;
    const location = this._getDescriptiveLocation();
    const type = q.type || DEFAULT_TYPE;
    const conditions = this.conditionsGenerator.generateConditions();
    const rewards = this.rewardsGenerator.generateRewards();

    return {
      QuestName: questId,
      _id: questId,
      image,
      type,
      traderId,
      location,
      conditions,
      rewards,
      canShowNotificationsInGame: true,
      description: `${questId} description`,
      failMessageText: `${questId} failMessageText`,
      name: `${questId} name`,
      note: `${questId} note`,
      isKey: false,
      restartable: false,
      instantComplete: false,
      secretQuest: false,
      startedMessageText: `${questId} startedMessageText`,
      successMessageText: q.success_message
        ? `${questId} successMessageText`
        : DEFAULT_SUCCESS_MESSAGE,
      templateId: questId,
    };
  }

  static getLocaleValue(givenPayload, localeName) {
    if (typeof givenPayload === 'string') {
      return givenPayload;
    }

    const payload = givenPayload || {};
    return payload[localeName] || payload[FALLBACK_LOCALE] || '';
  }

  getMissionId(mission) {
    const qid = this.customQuest.id;

    if (mission.type === 'Kill') {
      return generateKillConditionId(qid, mission);
    } else if (mission.type === 'GiveItem') {
      return generateGiveItemConditionId(qid, mission);
    } else if (
      mission.type === 'PlaceBeacon' ||
      mission.type === 'PlaceSignalJammer' ||
      mission.type === 'PlaceItem'
    ) {
      return generatePlaceBeaconConditionId(qid, mission);
    } else if (mission.type === 'VisitPlace') {
      return generateVisitPlaceConditionId(qid, mission);
    }
    return null;
  }

  generateLocales(generatedQuest) {
    const { name, description, success_message, missions } = this.customQuest;
    const { location, templateId } = generatedQuest;

    const result = {};

    utils.ALL_LOCALES.forEach((localeName) => {
      const payload = {
        note: '',
        failMessageText: '',
        startedMessageText: '',
        location,
      };

      payload.name = CustomQuestsTransformer.getLocaleValue(name, localeName);
      payload.description = `${templateId}_description`;
      if (success_message) {
        payload.successMessageText = `${templateId}_success_message_text`;
      }

      payload.conditions = {};

      (missions || []).forEach((mission) => {
        const missionId = this.getMissionId(mission);
        if (missionId) {
          payload.conditions[missionId] =
            CustomQuestsTransformer.getLocaleValue(mission.message, localeName);
        }

        if (mission.need_survive) {
          payload.conditions[`${missionId}_exit_location`] =
            CustomQuestsTransformer.getLocaleValue(
              mission.need_survive,
              localeName
            );
        }
      });

      if (!result[localeName]) {
        result[localeName] = { quest: {}, mail: {} };
      }

      result[localeName].quest = payload;
      result[localeName].mail[payload.description] =
        CustomQuestsTransformer.getLocaleValue(description, localeName);

      if (success_message) {
        result[localeName].mail[payload.successMessageText] =
          CustomQuestsTransformer.getLocaleValue(success_message, localeName);
      }
    });

    return result;
  }
}

module.exports = CustomQuestsTransformer;
