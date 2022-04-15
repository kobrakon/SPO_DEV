# TrapModLoader for spt-aki

a tool for modpack maker that allow to change the mod loading order and prevent duplicates mods.

## Description

Initially, the official [ModLoader](https://dev.sp-tarkov.com/SPT-AKI/Server/src/branch/development/project/src/loaders/ModLoader.js) from spt-aki offers a way to load mods in a certain orders using a `loadorder.json` inside the `mods` folder.

Unfortunately, the load order is applied only for the `onLoad` method, not at js package import.

This mod hijack the official ModLoader api and allow you to setup a proper `loadorder.json`

## Usage

1. Place `TrapModLoader` inside `user/mods` folder
2. Move all other mods in `user/mods/TrapModLoader/mods`
3. Run the server once to generate a default `loadorder.json` (in `user/mods/TrapModLoader/mods`)
4. edit the generated `loadorder.json` as you want

## Notes
- mods can be disabled, removing the name of concerned the mod from the `loadorder.json` file
- `loadorder.json` file can be re-generated, delete the file and run the spt-aki server again
