# Sleepy Time

*Sleepy Time* allows players to change the distances that the bots will activate and deactivate. There's also an option (enabled by default) that allows all bots to take a nap; by default bosses and PMCs never sleep. *Sleepy Time* isn't a magic bullet, but it will help claw back some FPS.

## Configuration

The configuration file has information on how to configure *Sleepy Time*. Because other mods may override the settings, it's important to have *Sleepy Time* be the last mod in the load order, as determined alphabetically by folder name. If you are unsure if another mod is conflicting, look for the output in the the console at raid start: *[INFO] Customs: activate: 265 -> 120, sleep: 300 -> 144*, where *120* would be your configuration value for *bigmap* (Customs).


## Activate/sleep internals

There are two distances (in meters) that determine the bots' wakefulness: distance-to-activate and distance-to-sleep. The distance isn't only to the player; it's to all *enemy* players. Scavs will tend to have only a handful of enemies (PMCs and the player), whereas the PMCs will have most every bot (and the player) as an enemy. This results in fighting across the map, even if it's far away from your PMC.

For the simple case of activation or sleeping, the respective distances are only checked once every ten seconds. If your distance-to-activate is too small, you can easily approach a sleeping bot. When a bot takes damage, it will become ineligible for sleep for thirty seconds, and if it was sleeping, it will be activated.

This is why there's the option--and by default it's enabled--to allow PMCs to sleep. Otherwise, they roam around a bit and activate the scavs, even if they never notice each other. It's also why there's a flurry of activity (and frame drops) whenever new bots are spawned--the new bots are active for at least ten seconds and sleeping bots may wake due to new enemy proximity.

An astute reader will observe that distance-to-sleep isn't configured; it's done automagically as an additional 20% of distance-to-activate, which is a ballpark estimate of BSG's configuration. When starting a raid, the distances will be displayed in the server console for your viewing pleasure.

## What Sleepy Time is not

*Sleepy Time* doesn't hard-stop the AI; it works within BSG's AI design. If you want a mod that hard-stops the AI, look at [AI Disabler](https://hub.sp-tarkov.com/files/file/445-ai-disabler/). Be warned though, this has some significant drawbacks to counter its significant benefit. First and foremost, if the bots spawn in the same location and are outside of the active range, they will be stuck within each other and never move again. This frequently happens with boss spawns and their followers. Also, there's no persistent configuration nor per-map configuration.

As noted in the intro, *Sleepy Time* is not a magic bullet. There are spawn patterns that can keep some bots active indefinitely. One such case is on Customs, where the wall between new gas station and the warehouse district can separate PMCs and Scavs waves. With enough bots of opposing factions, *Sleepy Time*'s power of naptime won't help near as much.

