const path = require('path');

const utils = require('./utils');
const QuestsGenerator = require('./QuestsGenerator');

class QuestsLoader {
    constructor(questDirectory) {
        this.questDirectory = questDirectory;
    }

    loadAll() {
        let loadedQuests = this.loadDir(this.questDirectory);

        VFS.getDirs(this.questDirectory).forEach(subdir => {
            if (subdir.endsWith('.disabled')) {
                if (subdir !== 'examples.disabled') {
                    Logger.warning(`=> Custom Quests: skipped '${subdir.split('.disabled')[0]}' quest directory`);
                }
            }
            else {
                const loadedSubQuests = this.loadDir(path.join(this.questDirectory, subdir));
                loadedQuests = [...loadedQuests, ...loadedSubQuests];
            }
        });

        return loadedQuests;
    }

    loadDir(dir) {
        let loadedQuests = [];

        VFS.getFiles(dir)
            .forEach(fileName => {
                if (fileName.endsWith('.json')) {
                    const quests = this._loadFile(fileName, dir);
                    loadedQuests = [...loadedQuests, ...quests];
                }
            });

        return loadedQuests;
    }

    _loadQuest(quest) {
        const quests = DatabaseServer.tables.templates.quests;

        if (quests[quest._id]) {
            Logger.error(`=> Custom Quests: already registered questId '${quest._id}'`);
        } else {
            quests[quest._id] = quest;
        }
    }

    _loadLocales(questId, localesPayloads) {
        utils.ALL_LOCALES.forEach(localeName => {
            const payload = localesPayloads[localeName];
            const globalLocales = DatabaseServer.tables.locales.global[localeName];

            if (globalLocales.quest[questId]) {
                Logger.error(`=> Custom Quests: already registered locales for questId '${quest._id}'`);
            } else {
                globalLocales.quest[questId] = payload.quest;
            }

            Object.keys(payload.mail).forEach(mailId => {
                if (globalLocales.mail[mailId]) {
                    Logger.error(`=> Custom Quests: already registered mail '${mailId}' for questId '${quest._id}'`);
                } else {
                    globalLocales.mail[mailId] = payload.mail[mailId];
                }
            })
        })
    }

    _loadFile(fileName, dir) {
        const fullPath = path.join(dir, fileName);

        const storyOrQuest = require(fullPath);
        const story = storyOrQuest.id ? [storyOrQuest] : storyOrQuest;

        const questGen = new QuestsGenerator(story);

        // array of tuple [quest, questLocales]
        const questsPayloads = questGen.generateWithLocales();

        return questsPayloads.map(([quest, questLocales]) => {
            this._loadQuest(quest);
            this._loadLocales(quest._id, questLocales);

            return quest;
        });
    }
}

module.exports = QuestsLoader;