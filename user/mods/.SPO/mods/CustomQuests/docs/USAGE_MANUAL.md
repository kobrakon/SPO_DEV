# Custom Quests API - How to create quests

## A minimal example
```json
{
  "id": "trap_quest_example_1",
  "trader_id": "mechanic"
}
```

- `id`: is mandatory and should be unique, it allows you to identity your quest.
- `trader_id`: could be a regular id (like `579dc571d53a0658a154fbec`) or an alias (please see the list just below).

#### Available trader aliases
- `prapor`
- `therapist`
- `fence`
- `skier`
- `peacekeeper`
- `mechanic`
- `ragman`
- `jaeger`

Modded traders are supported too.

## A minimal example (recommended)
```json
{
  "id": "trap_quest_example_1_bis",
  "disabled": false,
  "trader_id": "mechanic",
  "name": "My first quest",
  "description": "My first quest description",
  "success_message": "My success message"
}
```

It's recommended to always use `name`, `description` and `success_message` to prevent empty messages in the game.

The `disabled` field is not mandatory but can be useful when quests are under development, it just doesn't load the concerned quest.

## Multilingual support
```json
{
  "id": "trap_quest_example_2",
  "trader_id": "mechanic",
  "name": {
    "en": "My second quest",
    "fr": "Ma seconde quete"
  },
  "description": {
    "en": "My quest description",
    "fr": "Ma description de quete"
  },
  "success_message": {
    "en": "My success message",
    "fr": "Mon message de succes"
  }
}
```

Some fields are translatable, these are all available locales:

- `ch`
- `cz`
- `en` (Default when not found)
- `es`
- `es-mx`
- `fr`
- `ge`
- `hu`
- `it`
- `jp`
- `kr`
- `pl`
- `po`
- `ru`
- `sk`
- `tu`

## Decoration only
```json
{
  "id": "trap_quest_example_3",
  "trader_id": "mechanic",
  "name": "My third quest",
  "description": "My third quest description",
  "success_message": "My success message",
  "descriptive_location": "interchange",
  "type": "Completion",
  "image": "5a29222486f77456f50d09e7"
}
```

These fiels are not mandatory and are for quest decoration only:

- `name` (empty by default)
- `description` (empty by default)
- `success_message` (empty by default)
- `descriptive_location` (`any` by default)
- `type` (`Completion` by default)
- `image` (`5a27cafa86f77424e20615d6` by default)

#### all descriptive_location
- `any` (by default)
- `customs` (or `bigmap`)
- `factory`
- `interchange`
- `labs` (or `laboratory`)
- `lighthouse`
- `reserve` (or `rezervbase`)
- `shoreline`
- `woods`

#### all type
- `Completion`
- `PickUp`
- `Elimination`
- `Loyalty`
- `Discover`

These are just for decoration purpose, please read above for more infos about Missions.

#### all images
You can found all quests images in `Aki_Data/Server/images/quests/` directory.

## Quest visibility conditions

```json
{
    "id": "trap_quest_example_4",
    "trader_id": "mechanic",
    "name": "My fourth quest",
    "description": "My fourth quest description",
    "success_message": "My success message",
    "level_needed": 10,
    "locked_by_quests": [
      "trap_quest_example_1",
      "trap_quest_example_1_bis"
    ],
    "unlock_on_quest_start": []
}
```

To be able to see this quest, your pmc should be at least level 10, the `trap_quest_example_1` and `trap_quest_example_1_bis` quests should have been completed.

Also, you can use the `unlock_on_quest_start` array to specify which quests has to been started to unlock this quest.

## Automatic chained quests
No need to use the `locked_by_quests` option if you want to create a simple chain of quests, you can specify an array of quests in your json files and these quests will be automatically chained.

```json
[
  {
    "id": "my_quest_1",
    "disabled": false,
    "trader_id": "mechanic",
    "name": "My quest name",
    "description": "My quest description",
    "success_message": "My success message"
  },
  {
    "id": "my_quest_2",
    "disabled": false,
    "trader_id": "therapist",
    "name": "My quest name",
    "description": "My quest description",
    "success_message": "My success message"
  }
]
```


## Rewards
This quest will give you +5000 xp, 2 ai-2 kits and 1 car first aid kit.
```json
{
  "id": "trap_quest_example_5",
  "trader_id": "mechanic",
  "name": "My rewards quest",
  "description": "Complete this quest and I will give you something",
  "success_message": "Bravo!",
  "rewards": {
    "xp": 5000,
    "items": {
      "5755356824597772cb798962": 2,
      "590c661e86f7741e566b646a": 1
    }
  }
}
```

- `xp`: The amount of gained xp
- `items`: The obtained items and their amount

pro-tip: You can use [this tool](https://db.sp-tarkov.com/search) to find item ids.

## Missions
A quest can have several missions.

This is an example mission where you have to kill 5 scavs on customs or factory.

Completing this quest will give you 1 000 000 roubles ;-)

```json
{
  "id": "trap_quest_example_6",
  "trader_id": "mechanic",
  "name": "First mission",
  "description": "Kill 5 scavs on customs or factory and I will make you rich",
  "success_message": "Bravo!",
  "missions": [
    {
      "type": "Kill",
      "target": "Savage",
      "locations": [
        "customs",
        "factory"
      ],
      "count": 5,
      "message": "Kill 5 scavs on customs or factory"
    }
  ],
  "rewards": {
    "items": {
      "5449016a4bdc2d6f028b456f": 1000000
    }
  }
}
```

## Type of missions
#### Kill
The player has to kill bots

A `Kill` mission payload example: 
```json
{
  "type": "Kill",
  "target": "Savage",
  "locations": [
    "customs",
    "factory"
  ],
  "count": 5,
  "message": "Kill 5 scavs on customs or factory"
}
```

The `target` field:
- `Savage` (for scav kills)
- `AnyPmc` (bear or usec kills)
- `Usec` (usec kills)
- `Bear` (bear kills)

The `locations` array possible values are:
- `customs` (or `bigmap`)
- `factory` (for night AND day)
- `factory4_day` (day only)
- `factory4_night` (night only)
- `interchange`
- `labs` (or `laboratory`)
- `lighthouse`
- `reserve` (or `rezervbase`)
- `shoreline`
- `woods`

The `count` is the number of kills needed to complete the mission.

The `message` is the message quest, it's available on all type of missions and support multilingual format.

#### GiveItem
The player has to give specific item to a trader (not necessary a quest item)

A `GiveItem` mission payload example:
```json
{
  "type": "GiveItem",
  "accepted_items": [
    "590c661e86f7741e566b646a"
  ],
  "count": 2,
  "found_in_raid_only": true,
  "message": {
    "en": "Give me 2 car first aid kits"
  }
}
```

`accepted_items` is an array of item ids accepted for the quest.

pro-tip: You can use [this tool](https://db.sp-tarkov.com/search) to find item ids.

`count` is the number of item you have to provide to complete the mission.

`found_in_raid_only` is false by default and means the item you give should be marked as FIR (found in raid).

`message` is the usual mission message.

#### PlaceItem
The player has to place an item at a specific place during the raid.
```json
{
  "type": "PlaceItem",
  "zone_id": "case_extraction",
  "accepted_items": [
    "5755356824597772cb798962"
  ],
  "plant_time": 2,
  "need_survive": {
    "en": "Need to survive the raid"
  },
  "message": {
    "en": "Place the ai-2 where you know"
  },
}
```

`zone_id`: all zones can be found [here](./ALL_ZONES.md)

`accepted_items` is an array of item ids accepted for the quest.

pro-tip: You can use [this tool](https://db.sp-tarkov.com/search) to find item ids.

`plant_time` is the time in second the player has to press the `f` key to place the item.

`need_survive`: if set, the player has to survive the raid to complete the mission, the message is displayed in the interface conditionally (when the item has been placed)

`message` is the usual mission message.

#### PlaceBeacon / PlaceSignalJammer
The player has to place a beacon (or a signal jammer) at a specific place during the raid.
```json
{
  "type": "PlaceBeacon",
  "zone_id": "case_extraction",
  "plant_time": 10,
  "need_survive": {
    "en": "Need to survive the raid"
  },
  "message": {
    "en": "Place the ai-2 where you know"
  },
}
```

Same properties as `PlaceItem` except there is no `accepted_items` field here.

Please note you can change the `type` to be `PlaceSignalJammer` instead.

#### VisitPlace
The player has to visit a place during the raid.


```json
{
  "type": "VisitPlace",
  "place_id": "gazel",
  "need_survive": {
    "en": "Need to survive the raid on the concerned map"
  },
  "message": "visit the place you know ;-)"
}
```

`place_id`: all places can be found [here](./ALL_PLACES.md)

Warning: [Places](./ALL_PLACES.md) are not [Zones](./ALL_ZONES.md).

`need_survive`: if set, the player has to survive the raid to complete the mission, the message is displayed in the interface conditionally (when the place has been discovered)

`message` is the usual mission message.
