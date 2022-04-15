"use strict";
const KaijuApi = require("../../Kaiju-api/api");
module.exports.AmmoPouchScript = (H, V) => {
	const database = DatabaseServer.tables;
	const item = database.templates.items;
	const ItemID = "5aafbde786f774389d0cbc0f";
	const NewItemID = "KAIJU_ORBITAS_AMMO_POUCH";
	const NewItemPrefabPath = "AmmoPouch/item_food_mayo.bundle";
	const NewItemCategory = "Containers&cases";
	const NewItemTrader = "Skier";
	const NewItemTraderLoyalty = 1;
	const NewItemPrice = "1";
	const NewItemCurrency = "SHELL";
	const NewItemDesc = ["Lucky Scav Ammo Pouch","Pouch","A repurposed military pouch used by scavs to carry loose rounds scavenged in the field."];
	const containerArr = ["544a11ac4bdc2d470e8b456a", "5857a8b324597729ab0a0e7d", "59db794186f77448bc595262", "5857a8bc2459772bad15db29", "5c093ca986f7740a1867ab12"];

	KaijuApi.NewItemClone(ItemID, NewItemID, NewItemPrefabPath, NewItemCategory, NewItemTrader, NewItemTraderLoyalty, NewItemPrice, NewItemCurrency, NewItemDesc);

	item[NewItemID]._props.Width = 1;
	item[NewItemID]._props.Height = 1;
	item[NewItemID]._props.Weight = 0.9;
	item[NewItemID]._props.ItemSound = "container_pouch";
	item[NewItemID]._props.Grids[0]._props.cellsH = H;
	item[NewItemID]._props.Grids[0]._props.cellsV = V;

	for (const currentContainer of containerArr) {
		if (!item[currentContainer]._props.Grids[0]._props.filters[0].Filter.includes(NewItemID)) {
			item[currentContainer]._props.Grids[0]._props.filters[0].Filter.push(NewItemID);
			KaijuApi.DebugMessage(`${NewItemID} added to ${item[currentContainer]._props.Name}`);
		}
	}
}