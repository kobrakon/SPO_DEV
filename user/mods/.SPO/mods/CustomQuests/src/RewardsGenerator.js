class RewardsGenerator {
  constructor(customQuest) {
    this.customQuest = customQuest;
  }

  static setRewardsIndexes(rewards) {
    return rewards
      .filter(reward => Boolean(reward))
      .map((reward, index) => {
        return {
          ...reward,
          index,
        };
      });
  }

  _generateXpReward(xp) {
    return {
      id: `${this.customQuest.id}_xp_reward`,
      value: String(xp),
      type: 'Experience',
    }
  }

  _generateItemReward(itemId, nb) {
    const idReward = `${this.customQuest.id}_item_reward_${itemId}`;
    const targetId = `TARGET_${idReward}`;

    return {
      value: String(nb),
      id: idReward,
      type: "Item",
      target: targetId,
      items: [
        {
          "_id": targetId,
          "_tpl": itemId,
          "upd": {
            "StackObjectsCount": nb
          }
        }
      ]
    }
  }

  _generateStarted() {
    // TODO
    return [];
  }

  _generateSuccess() {
    const result = [];
    const rewards = this.customQuest.rewards;

    if (!rewards) {
      return result;
    }

    const { xp, items } = rewards;

    const rewardItems = Object.keys(items || {});

    if (xp > 0) {
      result.push(this._generateXpReward(xp));
    }

    if (rewardItems.length > 0) {
      rewardItems.forEach(itemId => {
        const nb = items[itemId];
        if (typeof nb === 'number' && nb > 0) {
          result.push(this._generateItemReward(itemId, nb))
        }
      })
    }


    return result;
  }

  _generateFail() {
    // TODO
    return [];
  }

  generateRewards() {
    return {
      Started: this._generateStarted(),
      Success: this._generateSuccess(),
      Fail: this._generateFail(),
    }
  }
}

module.exports = RewardsGenerator;