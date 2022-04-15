/* mod.js
 * license: NCSA
 * copyright: yoshka
 * website: -
 * authors:
 * - yoshka
 */
const fs = require('fs'); 
const path = require('path');
const modPath = path.normalize(path.join(__dirname, '..'));
const modName = path.basename(modPath);
const avatarFolder = modPath+"/db/avatar/";


const DB = DatabaseServer.tables;
const TRADERS = DB.traders;

const THERAPIST = "54cb57776803fa99248b456e";
const MECHANIC = "5a7c2eca46aef81a7ca2145d";
const RAGMAN = "5ac3b934156ae10c4430e83c";
const JAEGER = "5c0647fdd443bc2504c2d371";
const PRAPOR = "54cb50c76803fa8b248b4571";
const PEACEKEEPER = "5935c25fb3acc3127c3d8cd9";
const SKIER = "58330581ace78e27b8b10cee";
const FENCE = "579dc571d53a0658a154fbec";
const RAGFAIR = "ragfair";
const DEFAULTTRADERS= [PRAPOR,THERAPIST,SKIER,FENCE,JAEGER,PEACEKEEPER,RAGMAN,MECHANIC,RAGFAIR];
const LOCALES = DatabaseServer.tables.locales.global;

const isSpecItem = "5447e0e74bdc2d3c308b4567";	


class Mod{

    constructor(){
        Logger.info(`Loading: ${modName}`);
		//this.removeOldAvatars();			
		this.funcptr = HttpServer.onRespond["IMAGE"];				
        ModLoader.onLoad[modName] = this.load.bind(this);
        HttpServer.onRespond["IMAGE"] = this.getImage.bind(this);	
    }
	
	getImage(sessionID, req, resp, body) {
		let avatarFileNames = fs.readdirSync(avatarFolder);
		Object.values(avatarFileNames).map((fileName)=>{	
			if (req.url.includes("/"+fileName)) {
				HttpServer.sendFile(resp, avatarFolder+fileName);					
				return;		
			}
		});	
        this.funcptr(sessionID, req, resp, body);	
    }
	
	removeOldAvatars(){
		let avatarFileNames = fs.readdirSync(avatarFolder);
		let appDataPath = process.env.LOCALAPPDATA+"/Temp/Battlestate Games/EscapeFromTarkov/files/trader/avatar/";
		Object.values(avatarFileNames).map((fileName)=>{		
			if(fs.existsSync(appDataPath+fileName)){
				try {
					fs.unlinkSync(appDataPath+fileName)
					//old Avatar removed
					//Logger.info("ATF: Debug: Old avatar removed from Appdata: "+fileName);
				}catch(err) {
					throw err;
				}					
			}
			else{
				//Logger.info("ATF: Debug: file doesnt exist:"+appDataPath+fileName);
			}			
		});	
	}

    load()
    {		
		//Initializing Traders
		let traders = Mod.loadTraders();
		
		
		//////////////////////////////////////////////////////////////////
		//Utility functions
		//////////////////////////////////////////////////////////////////
		
		//Create Trades for all presets containing "export" in the name
		Mod.exportPresets();
		//Merger
		Mod.mergeTrades();
		//Unpacker
		Mod.unpackTrades();
		

		//////////////////////////////////////////////////////////////////
		//ExampleTrade creation
		//////////////////////////////////////////////////////////////////
		let fileName = "ExampleTrade.json";

		let ExamplePrice= [[]];
		
		//Set Price to 5 Cat figurines
		ExamplePrice[0][0] = Trader.buildTradeRequirement("59e3658a86f7741776641ac4",5); 
		
		//Creating the new UniqueExampleTrade 1 Golden Lion for the ExamplePrice at Loyalty Level 1
		let ExampleTrade = Trader.buildNewTrade("UniqueExampleTrade","59e3639286f7741777737013",ExamplePrice,1); 
		
		//Write Trade to file in the /db/export/ folder
		//Mod.writeFile(modPath+"/utility/exampleTrades/"+fileName,JSON.stringify(ExampleTrade,null,"\t"));
		//////////////////////////////////////////////////////////////////
		
		

	
    }
	
	static mergeTrades(filePath = modPath+"/utility/mergeTrades/"){
		let tempAssort = {
				items: [],
				barter_scheme: {},
				loyal_level_items: {}
		};	
		tempAssort = Trader.loadAssort(filePath);
		
		Mod.writeFile(filePath+"/Result/result.json",JSON.stringify(tempAssort,null,"\t"));
	}
	
	static unpackTrades(filePath = modPath+"/utility/unpackTrades/"){
		let tempAssort = {
				items: [],
				barter_scheme: {},
				loyal_level_items: {}
		};	
		tempAssort = Trader.loadAssort(filePath);
				
		let tradeList = {};
		
		Object.values(tempAssort.items).map((item)=>{
			if(item.parentId == "hideout"){ //check if its not a Presetpart
				let tempTrade ={
				items: [],
				barter_scheme: {},
				loyal_level_items: {}
				};
				
				tempTrade.items.push(item);
				tempTrade.barter_scheme[item._id] = tempAssort.barter_scheme[item._id];
				tempTrade.loyal_level_items[item._id] = tempAssort.loyal_level_items[item._id];	
				
				tradeList[item._id] = tempTrade;
			}					
		});

		Object.values(tempAssort.items).map((item)=>{
			if(item.parentId != "hideout"){ //check if its a Presetpart
				Object.values(tradeList).map((trade)=>{
					Object.values(trade.items).map((tradeItem)=>{
						if(item.parentId == tradeItem._id){
							trade.items.push(item);
							
						}
					});
				});
			}			
		});		

		//write unpacked Trades to file
		Object.values(tradeList).map((trade)=>{
			let resultFilePath = "";
			
			if(trade.items.length > 1){ //check if trade is a preset
				//add "preset" to the filename
				resultFilePath = filePath+"/Result/"+trade.items[0]._id+"_preset.json";
				Logger.info("ATF: Unpacked Trade: "+trade.items[0]._id+"_preset.json");
			}
			else{
				resultFilePath = filePath+"/Result/"+trade.items[0]._id+".json";
				Logger.info("ATF: Unpacked Trade: "+trade.items[0]._id+".json");
			}			
			Mod.writeFile(resultFilePath,JSON.stringify(trade,null,"\t"));
		});
	}
		
	static loadTraders(){
		let traderDir = fs.readdirSync(modPath+"/db/traders/");
		let traderList = {};
		
		//Load all Traders availble in /db/traders/
		Object.values(traderDir).map((trader)=>{
			let traderPath = modPath+"/db/traders/"+trader;
			let traderConfig = require(traderPath+"/TraderConfig.json");
			if(traderConfig.enabled){ //check if Trader is enabled
				traderList[traderConfig.traderID] = new Trader(traderConfig,traderPath);					
			}	
		});
		
		return traderList;
	}
	
	static exportPresets(keyword="export"){ //exports all saved presets with the keyword
		
		let presetList = {};
		let profilesPath = path.normalize(path.join(modPath, '../../profiles/'));
		
		let profileIDs = fs.readdirSync(profilesPath);
		Logger.info("ATF: Profiles:  "+profileIDs + "  found");
				
		profileIDs.forEach(profileFileName => {
		  if (path.extname(profileFileName) == ".json"){
			let profile = require(profilesPath+profileFileName);
			if(profile.weaponbuilds != undefined){
				Object.values(profile.weaponbuilds).map((preset)=>{
					if(preset.name.includes(keyword)){
						presetList[preset.name] = Mod.convertPresetToTrade(preset);
					}
				});
			}
		  }
		});
		
		let allPresetNames= Object.keys(presetList);
		
		Object.values(allPresetNames).map((presetName)=>{
			Mod.writeFile(modPath+"/utility/exportedPresets/"+presetName+".json",JSON.stringify(presetList[presetName],null,"\t"));
			Logger.info("ATF: Exporting Preset: "+presetName);
		});
		
	}
	
	static convertPresetToTrade(preset){	
		let temp ={
			items: [],
			barter_scheme: {},
			loyal_level_items: {},
		};	
		
		let defaultPrice= [[]];
		defaultPrice[0].push(Trader.buildTradeRequirement("59faff1d86f7746c51718c9c",1)); //add 1 Bitcoin as Cost for the first Price
		defaultPrice[0].push(Trader.buildTradeRequirement("59faf7ca86f7740dbe19f6c2",1)); //add 1 Roler watch as Cost for for the first Price
		
		temp.barter_scheme[preset.root] = defaultPrice;
		temp.loyal_level_items[preset.root]= 1;
		
		Object.values(preset.items).map((item)=>{
			
			
			if(item.parentId == undefined){
				let tradeBase = {
					"_id": item._id,
					"_tpl": item._tpl,
					"parentId": "hideout",
					"slotId": "hideout",
					"upd": {
						"UnlimitedCount": true,
						"StackObjectsCount": 999999
					},	
				};				
				temp.items.push(tradeBase);
			}
			else{
				let presetPart={
				"_id": item._id,
				"_tpl": item._tpl,
				"parentId": item.parentId,
				"slotId": item.slotId			
				};
				temp.items.push(presetPart);
			}
			
		});
		return temp;
	}
	
	static writeFile(filePath,data){
		fs.writeFile(filePath, data, (err) => {
		if (err){
			Logger.error(err);
			throw err;  			
		}
		});
	}
	
	static getModNames(){
		let modNameList = []; 
		let modFolderPath = path.join(modPath, '..');
		let modFolderList = fs.readdirSync(modFolderPath);
		
		modFolderList.forEach(modFolder => {
			let packageFilePath = modFolderPath+"/"+modFolder+"/package.json";
			if(fs.existsSync(packageFilePath)){
				let temp = require(packageFilePath);
				if(temp.name != undefined){
					modNameList.push(temp.name);
					//Logger.info("Debug:   "+temp.name +" found");
				}
			}
		});
		return modNameList;
	}
	
	static getRepeatableQuestIDs(localeFile){
		let repeatableQuestIDs = [];
		Object.keys(localeFile.repeatableQuest).map((questLocal)=>{
			let temp = questLocal.split(" ");
			let questID = temp[0];
			if(!(repeatableQuestIDs.includes(questID))){
				repeatableQuestIDs.push(questID);
			}
		});
		return repeatableQuestIDs;	
	}
}

const allLoadedMods = Mod.getModNames();
const repeatableQuestIDs = Mod.getRepeatableQuestIDs(LOCALES.en);

class Trader
{
	constructor(traderConfig,filePath)
    {
		let _traderConfig = traderConfig;
		let _filePath = filePath;
		
		if(TRADERS[_traderConfig.traderID] == undefined) //check if trader exist
		{
			//Trader doesnt exit so create a new one
			TRADERS[_traderConfig.traderID] = {};
			TRADERS[_traderConfig.traderID].assort = {
				items: [],
				barter_scheme: {},
				loyal_level_items: {}
			};						
		}
		if(_traderConfig.Options.modifyBase){
			TRADERS[_traderConfig.traderID].base = Trader.loadTraderBase(_filePath);
			if(TRADERS[_traderConfig.traderID].base != undefined){
				if(TRADERS[_traderConfig.traderID].base.insurance.availability == true){

					if(fs.existsSync(filePath+"/dialogue.json")){
						TRADERS[_traderConfig.traderID].dialogue = require(filePath+"/dialogue.json");
					}	
									
					if(TRADERS[_traderConfig.traderID].dialogue == undefined){
						//set default to prapor dialogue
						TRADERS[_traderConfig.traderID].dialogue = {
						"insuranceStart": [
							"5a8fd75188a45036844e0aee",
							"5a8fd75188a45036844e0af1"
						],
						"insuranceFound": [
							"5a8fd75188a45036844e0ad9",
							"5a8fd75188a45036844e0adb",
							"5a8fd75188a45036844e0adc"
						],
						"insuranceFailed": [
							"5a8fd75188a45036844e0b0a"
						],
						"insuranceExpired": [
							"5a8fd75188a45036844e0aea"
						],
						"insuranceComplete": [
							"5a8fd75188a45036844e0af3"
						]
						};						
					}
				}

				//Updating the Trader Locale
				Object.values(LOCALES).map((locale)=> {
					locale.trading[_traderConfig.traderID]= Trader.createTraderLocale(TRADERS[_traderConfig.traderID]);
				});	

			}	
		}		
		
		
		if(_traderConfig.Options.modifyAssort){
								
			let tempAssort ={
			items: [],
			barter_scheme: {},
			loyal_level_items: {}
			};	
			
			Logger.info("ATF: Loading Trade Packages: "+path.basename(_filePath)+" ");
			tempAssort = Trader.loadTradePackages(_filePath+"/TradePackages/");

			Object.values(tempAssort.items).map((item)=>{
				//Check for TradeBase
				if(item.parentId == "hideout"){
					//Check if Trade has a barter scheme 
					if(tempAssort.barter_scheme[item._id] == undefined){
						Logger.error("ATF: Error: Trade: "+item._id+" missing barter_scheme with same ID");
					}
					//Check if Trade has a loyal_level
					if(tempAssort.loyal_level_items[item._id] == undefined){
						Logger.error("ATF: Error: Trade "+item._id+" missing loyal_level_items with same ID");
					}						
				}
			});
			//Logger.info("ATF: Debug: Loaded Assort:  "+JSON.stringify(tempAssort,null,"\t"));
			TRADERS[_traderConfig.traderID].assort = tempAssort;	

			RagfairConfig.traders[_traderConfig.traderID] = true;
			RagfairServer.toUpdate[_traderConfig.traderID] = true;
			RagfairServer.generateTraderOffers(_traderConfig.traderID);	
		}	
			
		if(_traderConfig.Options.modifyQuests){
			//to be implemented
		}
		
		if(!(DEFAULTTRADERS.includes(_traderConfig.traderID))){
			Object.values(LOCALES).map((locale)=> {
				Trader.updateRepeatableQuestLocale(locale,_traderConfig.traderID);
			});	
		}
		
    }
	
	static updateRepeatableQuestLocale(localeFile,traderID){
		let questPart = ["description","successMessageText","failMessageText","startedMessageText"];
		Object.values(repeatableQuestIDs).map((questID)=>{
			Object.values(questPart).map((qPart)=>{
				localeFile.repeatableQuest[questID+" "+qPart+" "+traderID+" 0"]	= localeFile.repeatableQuest[questID+" "+qPart+" "+PRAPOR+" 0"];
			});								
		});			
	}
	
	static createTraderLocale(trader){
		
		let traderNickname = "please set a Nickname";
		let traderFirstName ="";
		let traderSurName ="";
		let traderLocation ="";
		let traderDescription = "";
		
		if(TRADERS[trader.base._id].base.nickname != undefined){
			traderNickname = TRADERS[trader.base._id].base.nickname;
		}
		if(TRADERS[trader.base._id].base.name != undefined){
			traderFirstName = TRADERS[trader.base._id].base.firstname;
		}
		if(TRADERS[trader.base._id].base.surname != undefined){
			traderSurName = TRADERS[trader.base._id].base.surname;
		}			
		if(TRADERS[trader.base._id].base.location != undefined){
			traderLocation = TRADERS[trader.base._id].base.location;
		}			
		if(TRADERS[trader.base._id].base.description != undefined){
			traderDescription = TRADERS[trader.base._id].base.description;
		}						
		
		let traderLocale = {
			"Nickname": traderNickname,
			"FirstName": traderFirstName,
			"FullName": traderSurName,
			"Location": traderLocation,
			"Description":traderDescription
		};
				
		return traderLocale;
	}
			
	static loadTraderBase(filePath){
		return require(filePath+"/base.json");
	}
	
	static loadAssort(filePath){
		let files = fs.readdirSync(filePath);
		let assort ={
			items: [],
			barter_scheme: {},
			loyal_level_items: {}
		};
		
		files.forEach(file => {
		  if (path.extname(file) == ".json")
			assort = Trader.mergeAssort(assort,require(filePath+file));
		});
		return assort;
	}

	static loadTradePackages(filePath){
		let folders = fs.readdirSync(filePath);
			
		let temp ={
			items: [],
			barter_scheme: {},
			loyal_level_items: {}
		};
		
		folders.forEach(folder => {
			
			//Logger.info("ATF: Package Folder: "+folder+" found");			
			
			let folderFilepath = filePath+"/"+folder;	
			let packageConfig = require(folderFilepath+"/PackageConfig.json");
			if(packageConfig != undefined){
				if(packageConfig.enabled){
					if(Trader.checkIfAllRequiredModsLoaded(packageConfig.RequiredMods)){
						temp = Trader.mergeAssort(temp,Trader.loadAssort(folderFilepath+"/assort/"));
						Logger.info("ATF: "+folder+" Trades were successfully loaded!");
					}
					else{
						Logger.error("ATF Error:  Modded Trade Folder "+folder+" was ignored!!! Required mods missing!");
					}							
				}				
			}
			else{
				Logger.error("ATF Error:  PackageConfig.json from "+folder+" could not be loaded!");
			}
		});
		return temp;
	}
	
	static checkIfAllRequiredModsLoaded(modRequirements){
		Object.values(modRequirements).map((requiredMod)=>{
			if(!(allLoadedMods.includes(requiredMod))){
				return false;
			}		
		});
		return true;
	}
	
	static buildNewTrade(tradeID,itemID,price,loyaltyLvl,unlimitedCount = true,stackObjectsCount = 999999){
		
		let trade = {
			items: [],
			barter_scheme: {},
			loyal_level_items: {},
		};
		
		let tradeBase = {
			"_id": tradeID,
			"_tpl": itemID,
			"parentId": "hideout",
			"slotId": "hideout",
			"upd": {
				"UnlimitedCount": unlimitedCount,
				"StackObjectsCount": stackObjectsCount
			},	
		};	
		
		trade.items.push(tradeBase);
		trade.barter_scheme[tradeID]=price;
		trade.loyal_level_items[tradeID] = loyaltyLvl;
		return trade;
	}
	
	static buildTradeRequirement(itemID,itemCount,dogtagLvl = 1,side ="Any"){
		let temp = {};
		if(itemID =="59f32c3b86f77472a31742f0" || itemID =="59f32bb586f774757e1e8442" ) // Dogtag ID Check
		{
			temp = {
				"count": itemCount,
				"level": dogtagLvl,
				"side": side,
				"_tpl": itemID
			};
		}
		else
		{
			temp = {
				"count":itemCount,
				"_tpl":itemID
			};					
		}
		return temp;
	}
	
	static mergeAssort(assort1,assort2){
		
		Object.values(assort2.items).map((item)=>{	
			
			//Logger.info("Debug: Loaded Item:  "+JSON.stringify(item,null,"\t"));
			assort1.items.push(item);
			
			if(item.parentId =="hideout"){  //check if its not part of a preset
				assort1.barter_scheme[item._id] = assort2.barter_scheme[item._id];
				assort1.loyal_level_items[item._id] = assort2.loyal_level_items[item._id];
			}				
		});		
		return assort1;
	}
	
/*
	//OLD IGNORE
	static getQuestItems(assort){
		
		let tempAssort ={
			items: [],
			barter_scheme: {},
			loyal_level_items: {},
		};
		
		Object.values(assort.items).map((item) => {
			if(!(item._props.QuestItem || item._parent == isSpecItem))
			{
				tempAssort.barter_scheme[item._id] = JsonUtil.clone(assort.barter_scheme[item._id]);
				tempAssort.loyal_level_items[item._id] = JsonUtil.clone(assort.loyal_level_items[item._id]);
				tempAssort.items.push(JsonUtil.clone(item));
			}	
		});
		return tempAssort;
	}
*/		

}

module.exports.Mod = Mod;
