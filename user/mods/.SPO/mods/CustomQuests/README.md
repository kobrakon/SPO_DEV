# Custom Quests
Easy quests creation tool for [SPT-AKI](https://www.sp-tarkov.com/)

Using [Custom Quests Editor](https://hub.sp-tarkov.com/files/file/525-custom-quests-editor/) will help you A LOT to create and edit json quests files.

[API Documentation - How to create quests](https://github.com/guillaumearm/aki_CustomQuests/blob/master/docs/USAGE_MANUAL.md) (manually)

## Description
This mod allow to add your own quests easily with a single json file (per quest).

## Features
- [Online App: Custom Quests Editor](https://hub.sp-tarkov.com/files/file/525-custom-quests-editor/)
- Create a custom quest with a single json file
- Quest chaining
- Several mission types available: `Kill`, `GiveItem`, `PlaceItem`, `PlaceBeacon`, `PlaceSignalJammer`, `VisitPlace`
- Rewards: xp and items on quest success
- Compatible with modded traders
- Multilingual
- Options to wipe custom quests progression from profile (useful during the development)

## Usage
Place your json files in the `quests` directory.

Sub-directories can be used to organize your quest files.

So these are valid:
- quests/my_first_quest.json
- quests/my_quests/my_first_quest.json

Please read [the usage manual](https://github.com/guillaumearm/aki_CustomQuests/blob/master/docs/USAGE_MANUAL.md) to get more infos on how to create your own quests.

Check [the examples](https://github.com/guillaumearm/aki_CustomQuests/blob/master/docs/EXAMPLES.md) can help too.

You can rename the folder `examples.disabled` in `examples` to try out the examples ;-)

## Global configuration
- `enabled`: allow to enable or not CustomQuests mod
- `quest_directory`: The directory with custom quests
- `at_start.disable_all_vanilla_quests`: Disable all vanilla quests (this will unlock Jaeger but without editing your profile)
- `at_start.wipe_enabled_custom_quests_state_from_all_profiles`: wipe all enabled custom quests from all profiles
- `at_start.wipe_enabled_custom_quests_state_from_all_profiles`: wipe all disabled custom quests from all profiles

## Resources
- [All zones](https://github.com/guillaumearm/aki_CustomQuests/blob/master/docs/ALL_ZONES.md)
- [All places](https://github.com/guillaumearm/aki_CustomQuests/blob/master/docs/ALL_PLACES.md)
- [All quest items](https://github.com/guillaumearm/aki_CustomQuests/blob/master/docs/ALL_QUEST_ITEMS.md)

## Planned features
- New mission type: `FindItem` (allow to spawn quests items, keys included)
- New mission type: `SurviveRaid`
- Rewards on start: give items/xp when start a quest
- More rewards: trader reputation, unlock traders, unlock barters
- More kill targets: bosses, raiders, rogues.
- Failure quests: this allow to create several path in your story
- Rewards on fail
- Repeatable quests (not daily quests)
- Custom quest image
- Mission type `Kill` improvements: weapon restrictions, equipment restrictions
- Mission restriction: only on night
- New mission type: `WeaponAssembly` (allow to create gunsmith missions)
- New mission type: `TraderLoyalty`
- New mission type: `Skill`

If you have some ideas to improve the mod, you can create an issue on github (or comment on the hub) ;-)

## The original README

[the original readme file](https://github.com/guillaumearm/aki_CustomQuests/blob/master/README.md) is available on github.