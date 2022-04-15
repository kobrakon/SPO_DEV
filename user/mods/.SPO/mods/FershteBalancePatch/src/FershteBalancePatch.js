"use strict";

/*
Tarkov's balance is a gigantic mess.
Just terrible.
So I tried to make it better.
This specific mod only addresses optics and mounts.
Basically, I took offence that . The best parts were either untouched of very very slightly buffed.
But most importantly, a lot of things were brought much closer to meta.

My long term goal is simply to give players more choices for running competitive and cool weapons and builds.
*/
const Config = require("../config.json");

class Mod
{
    constructor()
    {
        this.mod = "FershteBalancePatch";
		Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.load.bind(this);
    }

    load()
    {			
	    const items = DatabaseServer.tables.templates.items;
		//OPTICS
		if(Config.optics){
			Logger.info(`Balancing: Optics`);

			//Assault Scopes 
			{
				let modErgo = "-3"; //this matches the HAMR, a 4x with a red dot. This should be where all other assault scopes line up :)
				
				//ELCAN SpecterDR 1x/4x Scope FDE
				items["57aca93d2459771f2c7e26db"]._props.Ergonomics = modErgo,
				
				//ELCAN SpecterDR 1x/4x Scope
				items["57ac965c24597706be5f975c"]._props.Ergonomics = modErgo,
				
				//Leupold Mark 4 HAMR 4x24mm DeltaPoint hybrid assault scope
				items["544a3a774bdc2d3a388b4567"]._props.Ergonomics = modErgo,
				
				//Monstrum Compact prism scope 2x32
				items["5d2dc3e548f035404a1a4798"]._props.Ergonomics = modErgo,
				
				//Primary Arms Compact prism scope 2.5x
				items["5c1cdd512e22161b267d91ae"]._props.Ergonomics = modErgo,
				
				//Sig BRAVO4 4X30 Scope
				items["57adff4f24597737f373b6e6"]._props.Ergonomics = modErgo,
				
				//Trijicon ACOG 3.5x35 scope
				items["59db7e1086f77448be30ddf3"]._props.Ergonomics = modErgo,
				
				//Trijicon ACOG TA01NSN 4x32 scope
				items["5c05293e0db83400232fff80"]._props.Ergonomics = modErgo,
				
				//Trijicon ACOG TA01NSN 4x32 scope TAN
				items["5c052a900db834001a66acbd"]._props.Ergonomics = modErgo,
				
				//Valday PS-320 1x/6x Scope //could maybe go in scopes instead? How is this diff than an LPVO?
				items["5c0517910db83400232ffee5"]._props.Ergonomics = modErgo,

				//Eotech HHS-1 sight //Technically Collimators, but they fit more in this category.
				items["5c07dd120db834001c39092d"]._props.Ergonomics = modErgo,
				
				//Eotech HHS-1 sight Tan
				items["5c0a2cec0db834001b7ce47d"]._props.Ergonomics = modErgo
			}
			
			//Collimators
			{
				let modErgo = "-2"; //this matches the Trijicon SRS-02 - sure, the Cobra can get +1, but that's a stupid exploit and I hate it.
				
				//BelOMO PK-AA reflex sight
				items["6113d6c3290d254f5e6b27db"]._props.Ergonomics = modErgo,
				
				//NPZ PK1 "Obzor" reflex sight		
				items["618a5d5852ecee1505530b2a"]._props.Ergonomics = modErgo,
				
				//Valday Krechet reflex sight
				items["609a63b6e2ff132951242d09"]._props.Ergonomics = modErgo,
				
				//SIG Sauer ROMEO8T reflex sight
				items["60a23797a37c940de7062d02"]._props.Ergonomics = modErgo,
				
				//Aimpoint PRO reflex sight
				items["61659f79d92c473c770213ee"]._props.Ergonomics = modErgo,
				
				//Aimpoint COMP M4 reflex sight
				items["5c7d55de2e221644f31bff68"]._props.Ergonomics = modErgo,
				
				//Cobra EKP-8-02 reflex sight_dovetail
				items["5947db3f86f77447880cf76f"]._props.Ergonomics = modErgo,
				
				//Cobra EKP-8-18 reflex sight
				items["591c4efa86f7741030027726"]._props.Ergonomics = modErgo,
				
				//Eotech 553 holographic sight
				items["570fd6c2d2720bc6458b457f"]._props.Ergonomics = modErgo,
				
				//Eotech XPS3-0 holographic sight
				items["58491f3324597764bc48fa02"]._props.Ergonomics = modErgo,
				
				//Eotech XPS3-2 holographic sight
				items["584924ec24597768f12ae244"]._props.Ergonomics = modErgo,
				
				//Eotech EXPS3 holographic sight
				items["558022b54bdc2dac148b458d"]._props.Ergonomics = modErgo,
				
				//Holosun HS401G5 reflex sight
				items["5b30b0dc5acfc400153b7124"]._props.Ergonomics = modErgo,
				
				//OKP-7 reflex sight
				items["570fd79bd2720bc7458b4583"]._props.Ergonomics = modErgo,
				
				//OKP-7 reflex sight_dovetail
				items["57486e672459770abd687134"]._props.Ergonomics = modErgo,
				
				//Trijicon SRS-02 reflex sight
				items["5d2da1e948f035477b1ce2ba"]._props.Ergonomics = modErgo,
				
				//VOMZ Pilad P1X42 "WEAVER" reflex sight
				items["584984812459776a704a82a6"]._props.Ergonomics = modErgo,
				
				//Valday 1P87 holographic sight
				items["5c0505e00db834001b735073"]._props.Ergonomics = modErgo,
				
				//Vortex Razor AMG UH-1 holographic sight
				items["59f9d81586f7744c7506ee62"]._props.Ergonomics = modErgo,
				
				//Walther MRS reflex sight
				items["570fd721d2720bc5458b4596"]._props.Ergonomics = modErgo
				
			}
			
			//Compact Collimators
			{
				let modErgo = "-1"; //already true, but, hey.
				
				//VOMZ Pilad TargetRing reflex sight
				items["609b9e31506cf869cf3eaf41"]._props.Ergonomics = modErgo,
				
				//Aimpoint Micro T-1 reflex sight
				items["58d399e486f77442e0016fe7"]._props.Ergonomics = modErgo,
				
				//Belomo PK-06 reflex sight
				items["57ae0171245977343c27bfcf"]._props.Ergonomics = modErgo,
				
				//Burris FastFire 3 Reflex Sight
				items["577d141e24597739c5255e01"]._props.Ergonomics = modErgo,
							
				//Leupold DeltaPoint Reflex Sight
				items["58d268fc86f774111273f8c2"]._props.Ergonomics = modErgo,
				
				//Sig Sauer Romeo 4 reflex sight
				items["5b3116595acfc40019476364"]._props.Ergonomics = modErgo,
				
				//Trijicon RMR
				items["5a32aa8bc4a2826c6e06d737"]._props.Ergonomics = modErgo			
			}
			
			//Optics
			{
				//30mm
				{
					let modErgo = "-5"; //gonna delete mount penalties, so this is higher than the 'bis'
					
					//Vortex Razor HD Gen.2 1-6x24 riflescope
					items["618ba27d9008e4636a67f61d"]._props.Ergonomics = modErgo,
					
					//Schmidt & Bender PM II 1-8x24 scope
					items["617151c1d92c473c770214ab"]._props.Ergonomics = modErgo,
					
					//Burris FullField TAC 30 1-4x24 riflescope
					items["5b2388675acfc4771e1be0be"]._props.Ergonomics = modErgo,
					
					//EOtech Vudu 1-6 riflescope
					items["5b3b99475acfc432ff4dcbee"]._props.Ergonomics = modErgo,
					
					//Leupold Mark 4 LR 6.5-20x50 riflescope
					items["5a37cb10c4a282329a73b4e7"]._props.Ergonomics = modErgo,
					
					//Optical scope March Tactical 3-24x42 FFP
					items["57c5ac0824597754771e88a9"]._props.Ergonomics = modErgo
				}
				
				//34mm
				{
					let modErgo = "-5"; //34mm optics suck, so much, so I might as well make them comparable to 30mm.
					
					//Schmidt & Bender PM II 3-12x50 scope
					items["61714eec290d254f5e6b2ffc"]._props.Ergonomics = modErgo,
				
					//Hensoldt FF 4-16x56 scope
					items["56ea70acd2720b844b8b4594"]._props.Ergonomics = modErgo,
				
					//Nightforce ATACR 7-35x56 riflescope
					items["5aa66be6e5b5b0214e506e97"]._props.Ergonomics = modErgo
				}
				
				//KMZ
				{
					let modErgo = "-5"; //the sum when u use teh mount and the eyecup
					
					//KMZ 1P59 3-10x riflescope
					items["5d0a3a58d7ad1a669c15ca14"]._props.Ergonomics = modErgo,
				
					//KMZ 1P69 3-10x riflescope
					items["5d0a3e8cd7ad1a6f6a3d35bd"]._props.Ergonomics = modErgo
				}
				
				//PSO
				{
					let modErgo = "-3"; //the sum when u use the eyecup
					
					//NPZ 1P78-1 2.8x scope
					items["618a75f0bd321d49084cd399"]._props.Ergonomics = modErgo,
					
					//NPZ USP-1 4x scope //shouldn't be here but I hate the scope and want it to be a little better lol
					items["5cf638cbd7f00c06595bc936"]._props.Ergonomics = modErgo,
					
					//Zenit-Belomo PSO 1M2-1 4x24 scope
					items["576fd4ec2459777f0b518431"]._props.Ergonomics = modErgo,
					
					//Zenit-Belomo PSO 1M2 4x24 scope
					items["5c82343a2e221644f31c0611"]._props.Ergonomics = modErgo,
				
					//Zenit-Belomo PSO 1 4x24 scope
					items["5c82342f2e221644f31c060e"]._props.Ergonomics = modErgo
				}
			}
			
			//Special Sights
			{
				let modErgo = "-5"; //the REAP-IR is -4 when u use the eyecup, so fuck it, the other ones are the same now
				
				//FLIR RS-32 2.25-9x 35mm 60Hz thermal riflescope
				items["5d1b5e94d7ad1a2b865a96b0"]._props.Ergonomics = modErgo,
				
				//Trijicon REAP-IR thermal riflescope
				items["5a1eaa87fcdbcb001865f75e"]._props.Ergonomics = modErgo,
				
				//Vulcan MG night scope 3.5x
				items["5b3b6e495acfc4330140bd88"]._props.Ergonomics = modErgo,
				
				//NSPU-M night Scope
				items["5a7c74b3e899ef0014332c29"]._props.Ergonomics = modErgo
				
			}
			
			//Mounts
			{
				let modErgo = "0";
				
				//Armasight universal base
				items["5b3b6dc75acfc47a8773fb1e"]._props.Ergonomics = modErgo,
				
				//UNV DLOC-IRD Mount for sights
				items["5a1ead28fcdbcb001912fa9f"]._props.Ergonomics = modErgo,
				
				//KMZ 1P59 Dovetail mount
				items["5d0a29ead7ad1a0026013f27"]._props.Ergonomics = modErgo,
				
				//KMZ 1P69 Weaver mount
				items["5d0a29fed7ad1a002769ad08"]._props.Ergonomics = modErgo,
				
				//La Rue Tactical picatinny riser QD LT-101 mount
				items["5c064c400db834001d23f468"]._props.Ergonomics = modErgo,
				
				//High profile mount for Trijicon RMR
				items["5a33b652c4a28232996e407c"]._props.Ergonomics = modErgo,
				
				//Low profile mount for Trijicon RMR
				items["5a33b2c9c4a282000c5a9511"]._props.Ergonomics = modErgo,
				
				//Trijicon RMR mount for ACOG scopes
				items["5a33bab6c4a28200741e22f8"]._props.Ergonomics = modErgo,
				
				//NPZ 1P78-1 dovetail mount
				items["618a75c9a3884f56c957ca1b"]._props.Ergonomics = modErgo,
				
				//TA51 Mount for sights
				items["59db7eed86f77461f8380365"]._props.Ergonomics = modErgo,
				
				//Compact mount for sights
				items["5c1cdd302e221602b3137250"]._props.Ergonomics = modErgo
				
				//30mm mounts
				{
					let modErgo = "0";
					
					//30mm Scope mount
					items["57c69dd424597774c03b7bbc"]._props.Ergonomics = modErgo,
				
					//30mm ring-mount AR- P.E.P.R. made by Burris
					items["5b2389515acfc4771e1be0c0"]._props.Ergonomics = modErgo,
				
					//30mm ring-mount made by JP
					items["5a37ca54c4a282000d72296a"]._props.Ergonomics = modErgo,
				
					//30mm ring-mount Remington integral for model 700 rifles
					items["5bfebc5e0db834001a6694e5"]._props.Ergonomics = modErgo,
				
					//30mm rings made by Nightforce
					items["5b3b99265acfc4704b4a1afb"]._props.Ergonomics = modErgo
				}
				//34mm mounts
				{
					let modErgo = "0";
					
					//34mm one piece magmount made by I-E-A Mil Optics
					items["5c86592b2e2216000e69e77c"]._props.Ergonomics = modErgo,
				
					//34mm one piece magmount made by Nightforce
					items["5aa66a9be5b5b0214e506e89"]._props.Ergonomics = modErgo,
							
					//34mm one piece magmount made by Nightforce with a Multimount rail
					items["5aa66c72e5b5b00016327c93"]._props.Ergonomics = modErgo
				}
			}
			
			//Misc
			{
				let modErgo = "0"; //fuck eyecups, they're fucking stupid. Fuck.
				
				//NPZ 1P78 scope eyecup
				items["618a760e526131765025aae3"]._props.Ergonomics = modErgo,
				
				//USP-1 scope eyecup
				items["5cf639aad7f00c065703d455"]._props.Ergonomics = modErgo,
				
				//Cobra family sights shade
				items["591c4e1186f77410354b316e"]._props.Ergonomics = modErgo,
				
				//Vulcan MG scope eyecup
				items["5b3cbc235acfc4001863ac44"]._props.Ergonomics = modErgo,
				
				//NSPU-M scope eyecup
				items["5ba36f85d4351e0085325c81"]._props.Ergonomics = modErgo,
				
				//PSO scope eyecup
				items["57f3a5ae2459772b0e0bf19e"]._props.Ergonomics = modErgo,
				
				//REAP-IR scope eyecup
				items["5a1eacb3fcdbcb09800872be"]._props.Ergonomics = modErgo,
				
				//1P59 scope eyecup
				items["5d0b5cd3d7ad1a3fe32ad263"]._props.Ergonomics = modErgo
			}
		}
		//Pistol Grips
		if(Config.pistolGrips){
			Logger.info(`Balancing: Pistol Grips`);

			//pistol grips 
		{
			//AR-15 grips 10 / 12 / 15. 
			{
				//Worst In Slot - 10
				{
					let modErgo = "8";
					//Colt A2 AR-15 pistol grip
					items["55d4b9964bdc2d1d4e8b456e"]._props.Ergonomics = modErgo,
		
					//DI ECS FDE pistol grip for AR-15 based systems
					items["571659bb2459771fb2755a12"]._props.Ergonomics = modErgo,
		
					//HK Battle Grip with Beavertail pistol grip for AR-15 based systems
					items["5bb20e0ed4351e3bac1212dc"]._props.Ergonomics = modErgo,
		
					//HK "Battle Grip" pistol grip for AR-15 based systems
					items["5bb20e18d4351e00320205d5"]._props.Ergonomics = modErgo,
		
					//SIG MCX pistol grip
					items["5fbcbd6c187fea44d52eda14"]._props.Ergonomics = modErgo,
					
					//AR-15 DLG-123 pistol grip
					items["602e71bd53a60014f9705bfa"]._props.Ergonomics = modErgo,
		
					//Skeletonized AR-15 pistol grip
					items["5b07db875acfc40dc528a5f6"]._props.Ergonomics = modErgo
				}
				//Intermediate - 12
				{
					let modErgo = "12";
					//HK Grip V.2 pistol grip for AR-15 based systems
					items["5c6d7b3d2e221600114c9b7d"]._props.Ergonomics = modErgo,					
		
					//Hera Arms HG-15 pistol grip for AR-15 based systems
					items["5cc9bcaed7f00c011c04e179"]._props.Ergonomics = modErgo,
		
					//Hogue OverMolded Rubber Grip Ghillie Earth
					items["57c55f092459772d291a8463"]._props.Ergonomics = modErgo,
		
					//Hogue OverMolded Rubber Grip OD Green
					items["57c55f172459772d27602381"]._props.Ergonomics = modErgo,
		
					//Hogue OverMolded Rubber Grip Black
					items["57c55efc2459772d2c6271e7"]._props.Ergonomics = modErgo,
		
					//Hogue OverMolded Rubber Grip FDE
					items["57af48872459771f0b2ebf11"]._props.Ergonomics = modErgo,
		
					//Hogue OverMolded Rubber Grip Ghillie Green
					items["57c55f112459772d28133310"]._props.Ergonomics = modErgo,
					
					//AR-15 F1 Firearms Skeletonized Style 1 pistol grip
					items["6113c3586c780c1e710c90bc"]._props.Ergonomics = modErgo,
		
					//AR-15 F1 Firearms Skeletonized Style 2 pistol grip
					items["6113cce3d92c473c770200c7"]._props.Ergonomics = modErgo,
		
					//AR-15 F1 Firearms Skeletonized Style 2 PC pistol grip
					items["6113cc78d3a39d50044c065a"]._props.Ergonomics = modErgo,		
		
					//Stark AR Rifle Grip (FDE) for AR-15-compatible weapons
					items["59db3b0886f77429d72fb895"]._props.Ergonomics = modErgo,
		
					//Stark AR Rifle Grip (black) for AR-15-compatible weapons
					items["59db3acc86f7742a2c4ab912"]._props.Ergonomics = modErgo
				}
				// Best In Slot - 15
				{					
					let modErgo = "16";
					
					//AR-15 Tactical Dynamics Hexgrip pistol grip
					items["615d8faecabb9b7ad90f4d5d"]._props.Ergonomics = modErgo,
					
					//MIAD Pistol grip for AR-15 based systems
					items["5a339805c4a2826c6e06d73d"]._props.Ergonomics = modErgo,
		
					//Magpul MOE AR-15 pistol grip
					items["55802f5d4bdc2dac148b458f"]._props.Ergonomics = modErgo,
		
					//Magpul MOE AR-15 pistol grip (FDE)
					items["5d15cf3bd7ad1a67e71518b2"]._props.Ergonomics = modErgo
				}
			}
		//Kalashnikov Grips	10 / 12 / 14
			{
				//Worst
				{
					let modErgo = "8";
					//Izhmash AK bakelite pistol grip (6P4 Sb.8V)
					items["5649ad3f4bdc2df8348b4585"]._props.Ergonomics = modErgo,	
		
					//Izhmash AK polymer pistol grip (6P1 Sb.8)
					items["5649ade84bdc2d1b2b8b4587"]._props.Ergonomics = modErgo,
		
					//Izhmash AK-74 Textolite pistol grip (6P4 Sb.9)
					items["57e3dba62459770f0c32322b"]._props.Ergonomics = modErgo,	
		
					//Izhmash AKM bakelite pistol grip
					items["59e62cc886f77440d40b52a1"]._props.Ergonomics = modErgo,	
		
					//PP-19-01 Izhmash pistol grip
					items["5998517986f7746017232f7e"]._props.Ergonomics = modErgo,	
		
					//Wooden Izhmash AKM pistol grip for AK
					items["5a0071d486f77404e23a12b2"]._props.Ergonomics = modErgo,	
		
					//Molot AK bakelite pistol grip
					items["59e6318286f77444dd62c4cc"]._props.Ergonomics = modErgo		
				}
				//Intermediate
				{
					let modErgo = "12";
					//Izhmash AK-12 regular pistol grip
					items["5beec8ea0db834001a6f9dbf"]._props.Ergonomics = modErgo,	
			
					//KGB MG-47 pistol grip for AK
					items["5cf54404d7f00c108840b2ef"]._props.Ergonomics = modErgo,	
			
					//KGB MG-47 pistol grip for AK (Anodized Red)
					items["5e2192a498a36665e8337386"]._props.Ergonomics = modErgo,
			
					//AK Aeroknox Scorpius pistol grip
					items["5f6341043ada5942720e2dc5"]._props.Ergonomics = modErgo,	
			
					//AK Strike Industries Enhanced Pistol Grip
					items["5cf50850d7f00c056e24104c"]._props.Ergonomics = modErgo,		
			
					//AK Strike Industries Enhanced Pistol Grip (Flat Dark Earth)
					items["5cf508bfd7f00c056e24104e"]._props.Ergonomics = modErgo
				}	
				//Best
				{
					let modErgo = "16";
					//Magpul MOE pistol grip for AK
					items["5b30ac585acfc433000eb79c"]._props.Ergonomics = modErgo,	
			
					//AK Zenit RK-3 pistol grip
					items["5649ae4a4bdc2d1b2b8b4588"]._props.Ergonomics = modErgo,			
			
					//AK US Palm pistol grip
					items["5c6bf4aa2e2216001219b0ae"]._props.Ergonomics = modErgo,		
			
					//TAPCO SAW-Style black pistol grip for AK
					items["5947f92f86f77427344a76b1"]._props.Ergonomics = modErgo,	
		
					//AK Custom Arms AGS-74 PRO + Sniper Kit pistol grip
					items["6087e663132d4d12c81fd96b"]._props.Ergonomics = modErgo,	
					
					//AK TAPCO SAW-Style pistol grip (Flat Dark Earth)
					items["5947fa2486f77425b47c1a9b"]._props.Ergonomics = modErgo	
				}
		
			}
		}
		}
		//Furniture
		if(Config.furniture){
			Logger.info(`Balancing: Furniture`);
			
			//SCAR Parts
			{
				
					//FN SCAR-L 5.56x45 upper receiver (FDE)	
					items["618426d96c780c1e710c9b9f"]._props.Recoil = "-9",
					items["618426d96c780c1e710c9b9f"]._props.Ergonomics = "7",					
					
					//FN SCAR-L 5.56x45 upper receiver
					items["618405198004cc50514c3594"]._props.Recoil = "-9",
					items["618405198004cc50514c3594"]._props.Ergonomics = "7",	
				
					//FN SCAR-H 7.62x51 upper receiver (FDE)
					items["6165aeedfaa1272e431521e3"]._props.Recoil = "-4",
					items["6165aeedfaa1272e431521e3"]._props.Ergonomics = "7",					
					
					//FN SCAR-H 7.62x51 upper receiver
					items["6165adcdd3a39d50044c120f"]._props.Recoil = "-4",
					items["6165adcdd3a39d50044c120f"]._props.Ergonomics = "7",						
					
					//FN SCAR Kinetic MREX 6.5 M-LOK rail
					items["619666f4af1f5202c57a952d"]._props.Recoil = "0",
					items["619666f4af1f5202c57a952d"]._props.Ergonomics = "0",	
					
					//FN SCAR PWS SRX rail extension
					items["61965d9058ef8c428c287e0d"]._props.Recoil = "0",
					items["61965d9058ef8c428c287e0d"]._props.Ergonomics = "0"	
				
				
				
			}

			//Handguards
		{
			//AR-15 Compatible
			{
				//Bad
				{
					let modRecoil = "-1";
					let modErgo = "6";
					//ADAR 2-15 wooden stock for AR-15 and compatibles	
					items["5c0e2f5cd174af02a012cfc9"]._props.Recoil = modRecoil,
					items["5c0e2f5cd174af02a012cfc9"]._props.Ergonomics = modErgo,
					
					//Colt M4 Length handguard for AR-15 and compatibles
					items["5ae30db85acfc408fb139a05"]._props.Recoil = modRecoil,
					items["5ae30db85acfc408fb139a05"]._props.Ergonomics = modErgo,
					
					//Magpul MOE SL mid length M-LOK foregrip for AR15
					items["5c78f26f2e221601da3581d1"]._props.Recoil = modRecoil,
					items["5c78f26f2e221601da3581d1"]._props.Ergonomics = modErgo,
					
					//Magpul MOE SL carbine length M-LOK foregrip for AR-15
					items["5c78f2792e221600106f4683"]._props.Recoil = modRecoil,
					items["5c78f2792e221600106f4683"]._props.Ergonomics = modErgo,
					
					//Knight's Armament KAC RIS handguard for AR-15 and compatibles
					items["55d459824bdc2d892f8b4573"]._props.Recoil = modRecoil,
					items["55d459824bdc2d892f8b4573"]._props.Ergonomics = modErgo
					
					
				}
				//Good Ergo - same ergo as bis in live, worse recoil.
				{
					let modRecoil = "-2"; //meta ergo recoil
					let modErgo = "12"; //meta ergo ergo
					
					//Daniel Defence RIS II 9.5 foregrip for AR-15-compatible systems
					items["55f84c3c4bdc2d5f408b4576"]._props.Recoil = modRecoil,
					items["55f84c3c4bdc2d5f408b4576"]._props.Ergonomics = modErgo,
					
					//AR-15 Aeroknox AX-15 10.5 inch M-LOK handguard
					items["619b5db699fb192e7430664f"]._props.Recoil = modRecoil,
					items["619b5db699fb192e7430664f"]._props.Ergonomics = modErgo,
					
					//Daniel Defence RIS II 9.5 foregrip for AR-15-compatible systems // different lol
					items["588b56d02459771481110ae2"]._props.Recoil = modRecoil,
					items["588b56d02459771481110ae2"]._props.Ergonomics = modErgo,
					
					//Daniel Defence FDE RIS II FSP 9.5 foregrip for AR-15-compatible systems
					items["5c9a26332e2216001219ea70"]._props.Recoil = modRecoil,
					items["5c9a26332e2216001219ea70"]._props.Ergonomics = modErgo,
					
					//Strike Industries Viper carbine length M-LOK foregrip (FDE) for AR-15
					items["5d00f63bd7ad1a59283b1c1e"]._props.Recoil = modRecoil,
					items["5d00f63bd7ad1a59283b1c1e"]._props.Ergonomics = modErgo,
					
					//Strike Industries Viper carbine length M-LOK foregrip for AR-15
					items["5d00e0cbd7ad1a6c6566a42d"]._props.Recoil = modRecoil,
					items["5d00e0cbd7ad1a6c6566a42d"]._props.Ergonomics = modErgo
				}
				//Meta Ergo - better ergo than bis in live, worse recoil.
				{
					let modRecoil = "-2"; //meta ergo recoil
					let modErgo = "18"; //meta ergo ergo
					
					//AR-10 Noveske SWS N6 10.5 inch handguard
					items["5d00ede1d7ad1a0940739a76"]._props.Recoil = modRecoil,
					items["5d00ede1d7ad1a0940739a76"]._props.Ergonomics = modErgo,
					
					//AR-10 CMMG MK3 RML9 9 inch M-LOK handguard
					items["6065880c132d4d12c81fd8da"]._props.Recoil = modRecoil,
					items["6065880c132d4d12c81fd8da"]._props.Ergonomics = modErgo,
					
					//Geissele SMR Mk.16 9.5 inch M-LOK handguard for AR-15
					items["5ea16acdfadf1d18c87b0784"]._props.Recoil = modRecoil,
					items["5ea16acdfadf1d18c87b0784"]._props.Ergonomics = modErgo,
					
					//AR-15 Unique-ARs Wing & Skull 12 inch handguard
					items["6087e0336d0bd7580617bb7a"]._props.Recoil = modRecoil,
					items["6087e0336d0bd7580617bb7a"]._props.Ergonomics = modErgo,
					
					//Handguard War Sport LVOA-S blk. for use with AR-15 and compatible
					items["595cf16b86f77427440c32e2"]._props.Recoil = modRecoil,
					items["595cf16b86f77427440c32e2"]._props.Ergonomics = modErgo
				}
				//Good Recoil - worse ergo than bis in live, same recoil.
				{
					let modRecoil = "-3"; //good recoil recoil
					let modErgo = "6"; //good recoil ergo
					
					//AR-10 Noveske SWS N6 Split handguard
					items["5d00ef6dd7ad1a0940739b16"]._props.Recoil = modRecoil,
					items["5d00ef6dd7ad1a0940739b16"]._props.Ergonomics = modErgo,
					
					//AR-10 CMMG MK3 RML15 15 inch M-LOK handguard
					items["6065881d1246154cad35d637"]._props.Recoil = modRecoil,
					items["6065881d1246154cad35d637"]._props.Ergonomics = modErgo,
					
					//Handguard MK 10 for use with AR-15 and compatible
					items["5b2cfa535acfc432ff4db7a0"]._props.Recoil = modRecoil,
					items["5b2cfa535acfc432ff4db7a0"]._props.Ergonomics = modErgo,
					
					//Daniel Defence RIS II 12.25 foregrip for AR-15-compatible systems
					items["5c9a25172e2216000f20314e"]._props.Recoil = modRecoil,
					items["5c9a25172e2216000f20314e"]._props.Ergonomics = modErgo,
					
					//Handguard War Sport LVOA-C blk. for use with AR-15 and compatible
					items["595cfa8b86f77427437e845b"]._props.Recoil = modRecoil,
					items["595cfa8b86f77427437e845b"]._props.Ergonomics = modErgo,
					
					//SAI 10" QD Rail foregrip for AR15
					items["5c78f2612e221600114c9f0d"]._props.Recoil = modRecoil,
					items["5c78f2612e221600114c9f0d"]._props.Ergonomics = modErgo,
					
					//Stngr Vypr 10" M-LOK foregrip for AR15
					items["5c6d5d8b2e221644fc630b39"]._props.Recoil = modRecoil,
					items["5c6d5d8b2e221644fc630b39"]._props.Ergonomics = modErgo
				}
				//Meta Recoil = to the best handguard in livekov
				{
					let modRecoil = "-3"; //meta recoil
					let modErgo = "12"; //meta ergo
					
					//Remington Arms handguard for a R11 RSASS 
					items["5a329052c4a28200741e22d3"]._props.Recoil = modRecoil,
					items["5a329052c4a28200741e22d3"]._props.Ergonomics = modErgo,

					//AR-10 Lancer LCH7 12.5 inch M-LOK handguard
					items["5f6336bbda967c74a42e9932"]._props.Recoil = modRecoil,
					items["5f6336bbda967c74a42e9932"]._props.Ergonomics = modErgo,

					//Geissele SmodRecoil Mk.16 13.5 inch M-LOK handguard for AR-15
					items["5ea16ada09aa976f2e7a51be"]._props.Recoil = modRecoil,
					items["5ea16ada09aa976f2e7a51be"]._props.Ergonomics = modErgo,
					
					//Lone Star Ion Lite handguard for AR-15 and compatible
					items["5d4405f0a4b9361e6a4e6bd9"]._props.Recoil = modRecoil,
					items["5d4405f0a4b9361e6a4e6bd9"]._props.Ergonomics = modErgo,
					
					//SAI 14.5" QD Rail foregrip for AR15
					items["5c78f2492e221600114c9f04"]._props.Recoil = modRecoil,
					items["5c78f2492e221600114c9f04"]._props.Ergonomics = modErgo,
					
					//outliers - 6 less ergo to make up for the stopper panels					
						
					//URX 3 8" handguard for AR15
					items["5d123102d7ad1a004e475fe5"]._props.Recoil = modRecoil,
					items["5d123102d7ad1a004e475fe5"]._props.Ergonomics = "6",
					
					//URX 3.1 10.75" handguard for AR15
					items["5d122e7bd7ad1a07102d6d7f"]._props.Recoil = modRecoil,
					items["5d122e7bd7ad1a07102d6d7f"]._props.Ergonomics = "6"
						
					
				}
			}
			//HK-416 Compatible
			{
				
				
				//kinda bad
				{	
					//HK quadrail handguard for 416-compatible systems
					items["5bb20de5d4351e0035629e59"]._props.Recoil = "-1",
					items["5bb20de5d4351e0035629e59"]._props.Ergonomics = "6"
				}
				//good ergo
				{
					//HK quadrail handguard with a flip-up sight for 416-compatible systems
					items["5bb20df1d4351e00347787d5"]._props.Recoil = "-2",
					items["5bb20df1d4351e00347787d5"]._props.Ergonomics = "10"
				}
				
				//crazy ergo
				{
					let modRecoil = "-2"; //meta recoil
					let modErgo = "15"; //good ergo
					
					//Midwest 13.5" M-LOK foregrip for 416A5
					items["5c6d11072e2216000e69d2e4"]._props.Recoil = modRecoil,
					items["5c6d11072e2216000e69d2e4"]._props.Ergonomics = modErgo,
					
					//Troy Industries 13" M-LOK foregrip for 416A5
					items["5c6c2c9c2e2216000f2002e4"]._props.Recoil = modRecoil,
					items["5c6c2c9c2e2216000f2002e4"]._props.Ergonomics = modErgo
				}
				
				//good recoil
				{
					let modRecoil = "-3"; //meta recoil
					let modErgo = "8"; //good ergo
					
					//Midwest 9" M-LOK foregrip for 416A5
					items["5c6d10fa2e221600106f3f23"]._props.Recoil = modRecoil,
					items["5c6d10fa2e221600106f3f23"]._props.Ergonomics = modErgo,
					
					//HK MRS 14" keymod foregrip for 416A5
					items["5c6d10e82e221601da357b07"]._props.Recoil = modRecoil,
					items["5c6d10e82e221601da357b07"]._props.Ergonomics = modErgo,
					
					//HK extended quadrail handguard for 416-compatible systems
					items["5bb20dfcd4351e00334c9e24"]._props.Recoil = modRecoil,
					items["5bb20dfcd4351e00334c9e24"]._props.Ergonomics = modErgo
				}
				
				//bis
				{
					//Strike Industries CRUX 15" M-LOK foregrip for 416A5
					items["5c6d11152e2216000f2003e7"]._props.Recoil = "-3",
					items["5c6d11152e2216000f2003e7"]._props.Ergonomics = "11"
				}
			}
			//HK-417 Compatible
			{
				//HK 417 Extended Handguard with flip-up front sight
				items["61703001d92c473c77021497"]._props.Recoil = "-6",
				items["61703001d92c473c77021497"]._props.Ergonomics = "10",
				
				//HK 417 Patrol Handguard
				items["61712eae6c780c1e710c9a1d"]._props.Recoil = "-4",
				items["61712eae6c780c1e710c9a1d"]._props.Ergonomics = "15"
			}
			//AK Compatible
			{
				//wis - still a buff to a lot of parts
				{
					let modRecoil = "-1"; //wis recoil
					let modErgo = "6"; //wis ergo
					
					//Wooden AK-74 handguard (6P1 Sb.6-1)
					items["59d64f2f86f77417193ef8b3"]._props.Recoil = modRecoil,
					items["59d64f2f86f77417193ef8b3"]._props.Ergonomics = modErgo,
					
					//Wooden AK-74 handguard (6P20 Sb.6)
					items["5648b0744bdc2d363b8b4578"]._props.Recoil = modRecoil,
					items["5648b0744bdc2d363b8b4578"]._props.Ergonomics = modErgo,
					
					//Wooden VPO-136 handguard
					items["59e6284f86f77440d569536f"]._props.Recoil = modRecoil,
					items["59e6284f86f77440d569536f"]._props.Ergonomics = modErgo,
					
					//Wooden AKM / VPO-209 handguard
					items["59e898ee86f77427614bd225"]._props.Recoil = modRecoil,
					items["59e898ee86f77427614bd225"]._props.Ergonomics = modErgo,
					
					//Polymer AK-74 foregrip (6P20 Sb.9) Plum
					items["5cbda9f4ae9215000e5b9bfc"]._props.Recoil = modRecoil,
					items["5cbda9f4ae9215000e5b9bfc"]._props.Ergonomics = modErgo,
					
					//Polymer AK-74 foregrip (6P20 Sb.9)
					items["5648b1504bdc2d9d488b4584"]._props.Recoil = modRecoil,
					items["5648b1504bdc2d9d488b4584"]._props.Ergonomics = modErgo,
					
					//Polymer AK-100 series foregrip
					items["5cbda392ae92155f3c17c39f"]._props.Recoil = modRecoil,
					items["5cbda392ae92155f3c17c39f"]._props.Ergonomics = modErgo,
					
					//TDI AKM-L handguard for AK
					items["5d1b198cd7ad1a604869ad72"]._props.Recoil = modRecoil,
					items["5d1b198cd7ad1a604869ad72"]._props.Ergonomics = modErgo,
					
					//TDI AKM-L handguard for AK Anodized Red
					items["5d4aaa54a4b9365392071170"]._props.Recoil = modRecoil,
					items["5d4aaa54a4b9365392071170"]._props.Ergonomics = modErgo,
					
					//TDI AKM-L handguard for AK Anodized Bronze
					items["5d4aaa73a4b9365392071175"]._props.Recoil = modRecoil,
					items["5d4aaa73a4b9365392071175"]._props.Ergonomics = modErgo,
					
					//Zenit B-10 AK Handguard
					items["5c617a5f2e2216000f1e81b3"]._props.Recoil = modRecoil,
					items["5c617a5f2e2216000f1e81b3"]._props.Ergonomics = modErgo,
					
					//Wooden AKS-74U Handguard (6P26 Sb.6)
					items["57dc32dc245977596d4ef3d3"]._props.Recoil = modRecoil,
					items["57dc32dc245977596d4ef3d3"]._props.Ergonomics = modErgo
				}
				//good ergo hexagon ergo but cmdr recoil
				{
					let modRecoil = "-2"; //meh recoil
					let modErgo = "12"; //good ergo
					
					//Magpul MOE AKM HAND GUARD (Stealth Gray) for AK
					items["57cffe20245977632f391a9d"]._props.Recoil = modRecoil,
					items["57cffe20245977632f391a9d"]._props.Ergonomics = modErgo,
					
					//Magpul MOE AKM HAND GUARD (Black) for AK
					items["57cff947245977638e6f2a19"]._props.Recoil = modRecoil,
					items["57cff947245977638e6f2a19"]._props.Ergonomics = modErgo,
					
					//Magpul MOE AKM HAND GUARD (Plum) for AK
					items["57cffe0024597763b03fc60b"]._props.Recoil = modRecoil,
					items["57cffe0024597763b03fc60b"]._props.Ergonomics = modErgo,
					
					//Magpul MOE AKM HAND GUARD (Flat Dark Earth) for AK
					items["57cffd8224597763b03fc609"]._props.Recoil = modRecoil,
					items["57cffd8224597763b03fc609"]._props.Ergonomics = modErgo,
					
					//Magpul MOE AKM HAND GUARD (Flat Dark Earth) for AK
					items["57cffddc24597763133760c6"]._props.Recoil = modRecoil,
					items["57cffddc24597763133760c6"]._props.Ergonomics = modErgo,
					
					//B-10ะ foregrip and rail mount B-19
					items["5648b4534bdc2d3d1c8b4580"]._props.Recoil = modRecoil,
					items["5648b4534bdc2d3d1c8b4580"]._props.Ergonomics = modErgo,
					
					//Strike industries TRAX 1 foregrip
					items["5a9d56c8a2750c0032157146"]._props.Recoil = modRecoil,
					items["5a9d56c8a2750c0032157146"]._props.Ergonomics = modErgo,
					
					//B-11 AKS-74U Handguard
					items["57ffa9f4245977728561e844"]._props.Recoil = modRecoil,
					items["57ffa9f4245977728561e844"]._props.Ergonomics = modErgo
				}
				//meta ergo - hexagon clones
				{
					let modRecoil = "-3"; //good recoil
					let modErgo = "18"; //bis ergo
								
					//Hexagon handguard for AK(anodized red)
					items["5b80242286f77429445e0b47"]._props.Recoil = modRecoil,
					items["5b80242286f77429445e0b47"]._props.Ergonomics = modErgo,
					
					//Hexagon handguard for AK
					items["5b800e9286f7747a8b04f3ff"]._props.Recoil = modRecoil,
					items["5b800e9286f7747a8b04f3ff"]._props.Ergonomics = modErgo,
					
					//Magpul Zhukov-U HAND GUARD (FDE) for AK
					items["5c9a1c3a2e2216000e69fb6a"]._props.Recoil = modRecoil,
					items["5c9a1c3a2e2216000e69fb6a"]._props.Ergonomics = modErgo,
					
					//Magpul Zhukov-U HAND GUARD (Black) for AK
					items["5c9a07572e221644f31c4b32"]._props.Recoil = modRecoil,
					items["5c9a07572e221644f31c4b32"]._props.Ergonomics = modErgo,
					
					//Magpul Zhukov-U HAND GUARD (Plum) for AK
					items["5c9a1c422e221600106f69f0"]._props.Recoil = modRecoil,
					items["5c9a1c422e221600106f69f0"]._props.Ergonomics = modErgo,
					
					//Alfa Arms Goliaf AKS-74U Handguard
					items["5d15ce51d7ad1a1eff619092"]._props.Recoil = modRecoil,
					items["5d15ce51d7ad1a1eff619092"]._props.Ergonomics = modErgo
				}
				//good recoil - CMDR recoil but worse ergo
				{
					let modRecoil = "-4"; //meta recoil
					let modErgo = "6"; //wis ergo
					
					//B-30 foregrip and rail mount B-31ะก
					items["5efaf417aeb21837e749c7f2"]._props.Recoil = modRecoil,
					items["5efaf417aeb21837e749c7f2"]._props.Ergonomics = modErgo,
					
					//5.45 Design "Aggressor" handguard for AK
					items["5cf4e3f3d7f00c06595bc7f0"]._props.Recoil = modRecoil,
					items["5cf4e3f3d7f00c06595bc7f0"]._props.Ergonomics = modErgo,
					
					//CAA RS47 foregrip for AK-compatible systems
					items["5648ae314bdc2d3d1c8b457f"]._props.Recoil = modRecoil,
					items["5648ae314bdc2d3d1c8b457f"]._props.Ergonomics = modErgo,
					
					//Alfa Arms Goliaf AKS-74U Handguard
					items["5d15ce51d7ad1a1eff619092"]._props.Recoil = modRecoil,
					items["5d15ce51d7ad1a1eff619092"]._props.Ergonomics = modErgo
				}
				//meta recoil - buffed CMDR clones
				{
					let modRecoil = "-4"; //meta recoil
					let modErgo = "12"; //good recoil
														
					//VLTOR CMRD Keymod handguard for AK
					items["5c17664f2e2216398b5a7e3c"]._props.Recoil = modRecoil,
					items["5c17664f2e2216398b5a7e3c"]._props.Ergonomics = modErgo,
					
					//Krebs Custom UFM Keymod System handguard for AKM
					items["59fb375986f7741b681b81a6"]._props.Recoil = modRecoil,
					items["59fb375986f7741b681b81a6"]._props.Ergonomics = modErgo,
					
					//XRSU47SU Tactical Handguard for AKS-74U
					items["5a957c3fa2750c00137fa5f7"]._props.Recoil = modRecoil,
					items["5a957c3fa2750c00137fa5f7"]._props.Ergonomics = modErgo
				}
				// outliers: these look better than they are. So. Be chill.
				{
					//Wooden CAF WASR 10-63 handguard
					items["5d2c829448f0353a5c7d6674"]._props.Recoil = "-4",
					items["5d2c829448f0353a5c7d6674"]._props.Ergonomics = "16",
										
					//X47 Tactical Handguard for AK and compatible
					items["5f6331e097199b7db2128dc2"]._props.Recoil = "-5",
					items["5f6331e097199b7db2128dc2"]._props.Ergonomics = "6"
				}
			}
		}
		}
		//Stonks
		if(Config.stocks){
			Logger.info(`Balancing: Stocks`);

			{	
		//AKs
		{
			
			//AKM/AK-74 ProMag Archangel OPFOR AA47 buttstock	
			items["6087e2a5232e5a31c233d552"]._props.Recoil = "-40",
			items["6087e2a5232e5a31c233d552"]._props.Ergonomics = "17",
			
			//AKM/AK-74 Hera Arms CQR pistol grip/buttstock			
			items["619b69037b9de8162902673e"]._props.Recoil = "-39",
			items["619b69037b9de8162902673e"]._props.Ergonomics = "29"
			
		}
			
		//AR-15 Compatible
		{
			//Buffer Tube Replacements:
			{
				//Double Star Ace Socom gen.4 stock for AR-15	
				items["5d120a10d7ad1a4e1026ba85"]._props.Recoil = "-35",
				items["5d120a10d7ad1a4e1026ba85"]._props.Ergonomics = "6",
				
				//Double Star recoil pad 0.5 for ACE stock series	
				items["5d120a28d7ad1a1c8962e295"]._props.Recoil = "-3",
				items["5d120a28d7ad1a1c8962e295"]._props.Ergonomics = "2",
				
				//F93 Pro Stock	
				items["5b0800175acfc400153aebd4"]._props.Recoil = "-36",
				items["5b0800175acfc400153aebd4"]._props.Ergonomics = "16",
				
				//UBR GEN2 FDE stock	
				items["5947eab886f77475961d96c5"]._props.Recoil = "-37",
				items["5947eab886f77475961d96c5"]._props.Ergonomics = "12",
				
				//UBR GEN2 black stock	//MOE Clone
				items["5947e98b86f774778f1448bc"]._props.Recoil = "-37",
				items["5947e98b86f774778f1448bc"]._props.Ergonomics = "12",
				
				//Troy M7A1 PDW FDE stock	
				items["591af10186f774139d495f0e"]._props.Recoil = "-34",
				items["591af10186f774139d495f0e"]._props.Ergonomics = "21",
				
				//Troy M7A1 PDW Blk stock	
				items["591aef7986f774139d495f03"]._props.Recoil = "-34",
				items["591aef7986f774139d495f03"]._props.Ergonomics = "21"
				
				
			}
			//for COLT "A2" buffer tube - (2 recoil 0 ergo)
			{
				// Magpul PRS GEN2 FDE stock	
				items["5a33cae9c4a28232980eb086"]._props.Recoil = "-36", //to match the PRS Gen3 on a SI buffer
				items["5a33cae9c4a28232980eb086"]._props.Accuracy = "5", // to match the Red SI buffer
				items["5a33cae9c4a28232980eb086"]._props.Ergonomics = "8"				
			}
			//compatible with SI Advanced receiver extension buffer tube (anodized red) - (4 recoil / 2 ergo)
			{
				
				//Kinda Bad:
				{
					//High Standard M4SS Stock
					items["55d4ae6c4bdc2d8b2f8b456e"]._props.Recoil = "-28",
					items["55d4ae6c4bdc2d8b2f8b456e"]._props.Ergonomics = "6",
					
					//HK Slim Line Stock
					items["5bb20e70d4351e0035629f8f"]._props.Recoil = "-32",
					items["5bb20e70d4351e0035629f8f"]._props.Ergonomics = "6",
					
					//Izhmash AK-12 regular stock
					items["5beec8c20db834001d2c465c"]._props.Recoil = "-29",
					items["5beec8c20db834001d2c465c"]._props.Ergonomics = "6",
					
					//LMT Sopmod stock
					items["5ae30c9a5acfc408fb139a03"]._props.Recoil = "-30",
					items["5ae30c9a5acfc408fb139a03"]._props.Ergonomics = "10"
				}
				
				// exceptions:
				{
					//Hera Arms CQR pistol grip-stock //looks better than it is
					items["5a33e75ac4a2826c6e06d759"]._props.Recoil = "-33",
					items["5a33e75ac4a2826c6e06d759"]._props.Ergonomics = "25"
				}
				
				//Super Ergo - like, silly ergo. 5 options, 1 fde
				{
					//SI Viper Mod.1 Stock
					items["5c793fde2e221601da358614"]._props.Recoil = "-30",
					items["5c793fde2e221601da358614"]._props.Ergonomics = "17",
					
					//Fab Defence GLR-16-S Stock
					items["5bfe86df0db834001b734685"]._props.Recoil = "-30",
					items["5bfe86df0db834001b734685"]._props.Ergonomics = "17",						
					
					//Fab Defence GL Shock Stock
					items["5a9eb32da2750c00171b3f9c"]._props.Recoil = "-30",
					items["5a9eb32da2750c00171b3f9c"]._props.Ergonomics = "17"
				}
				
				//"Balanced" parts - 1 pt less recoil than MOE, 4 more ergo. - 6 options, 2 fde
				{
					//EMOD Stock
					items["5b39f8db5acfc40016387a1b"]._props.Recoil = "-32",
					items["5b39f8db5acfc40016387a1b"]._props.Ergonomics = "14",
					
					//MFT BUS Stock
					items["5947c73886f7747701588af5"]._props.Recoil = "-32",
					items["5947c73886f7747701588af5"]._props.Ergonomics = "14",
					
					//KRISS Defiance DS150 FDE stock
					items["5fce16961f152d4312622bc9"]._props.Recoil = "-32",
					items["5fce16961f152d4312622bc9"]._props.Ergonomics = "14",
					
					//KRISS Defiance DS150 stock
					items["5fbbaa86f9986c4cff3fe5f6"]._props.Recoil = "-32",
					items["5fbbaa86f9986c4cff3fe5f6"]._props.Ergonomics = "14"
				}
				//MOE Clones - 2 fde, 8 options
				{
					//moe moe's moe stocks
					{
						//Magpul Rubber Butt-Pad for Carbine stock series
						items["58d2912286f7744e27117493"]._props.Recoil = "-3",
						items["58d2912286f7744e27117493"]._props.Ergonomics = "2",
						
						//MOE Carbine stock
						items["56eabf3bd2720b75698b4569"]._props.Recoil = "-30",
						items["56eabf3bd2720b75698b4569"]._props.Ergonomics = "8",
						
						//MOE Carbine stock FDE
						items["58d2946386f774496974c37e"]._props.Recoil = "-30",
						items["58d2946386f774496974c37e"]._props.Ergonomics = "8",
						
						//MOE Carbine stock SG
						items["58d2947e86f77447aa070d53"]._props.Recoil = "-30",
						items["58d2947e86f77447aa070d53"]._props.Ergonomics = "8",
						
						//MOE Carbine stock FG
						items["58d2946c86f7744e271174b5"]._props.Recoil = "-30",
						items["58d2946c86f7744e271174b5"]._props.Ergonomics = "8",
						
						//MOE Carbine stock OD
						items["58d2947686f774485c6a1ee5"]._props.Recoil = "-30",
						items["58d2947686f774485c6a1ee5"]._props.Ergonomics = "8"
					}
					
					//Magpul CTR Carbine stock
					items["5d135e83d7ad1a21b83f42d8"]._props.Recoil = "-33",
					items["5d135e83d7ad1a21b83f42d8"]._props.Ergonomics = "10",
						
					//Magpul CTR Carbine stock FDE
					items["5d135ecbd7ad1a21c176542e"]._props.Recoil = "-33",
					items["5d135ecbd7ad1a21c176542e"]._props.Ergonomics = "10",	

					//HK E1 Stock for AR-15 and compatible
					items["5c87a07c2e2216001219d4a2"]._props.Recoil = "-33",
					items["5c87a07c2e2216001219d4a2"]._props.Ergonomics = "10"
				}
				
				//Max Recoil Reduction: 5 options, 1 fde
				{
					//B5 Precision stock
					items["5fc2369685fd526b824a5713"]._props.Recoil = "-34",
					items["5fc2369685fd526b824a5713"]._props.Ergonomics = "6",
					items["5fc2369685fd526b824a5713"]._props.Accuracy = "5",
					
					//Magpul PRS GEN3 Grey stock
					items["5d4406a8a4b9361e4f6eb8b7"]._props.Recoil = "-34",
					items["5d4406a8a4b9361e4f6eb8b7"]._props.Ergonomics = "6",
					
					//Magpul PRS GEN3 stock	
					items["5d44069ca4b9361ebd26fc37"]._props.Recoil = "-34",
					items["5d44069ca4b9361ebd26fc37"]._props.Ergonomics = "6"
				}
				
				//to remove color bias:
					
				//SI Advanced receiver extension buffer tube
				items["5c793fb92e221644f31bfb64"]._props.Accuracy = "5"
			}
		}
    }
		}
		if(Config.foregrips){
			Logger.info(`Balancing: Foregrips`);

			{
			//variable definition:
			
			let highErgoR = "-2";
			let highErgoE = "16";
			let midErgoR = "-3";
			let midErgoE = "9";
			let lowErgoR = "-4";
			let lowErgoE = "5";
			let badErgoR = "-5";
			let badErgoE = "1";
			//highErgo -1/+14
			{				
				let modRecoil = highErgoR;
				let modErgo = highErgoE;
				//BCM MOD.3 Tactical grip
				items["5c7fc87d2e221644f31c0298"]._props.Recoil = modRecoil,
				items["5c7fc87d2e221644f31c0298"]._props.Ergonomics = modErgo,
				
				//KAC Vertical pistol grip
				items["5c87ca002e221600114cb150"]._props.Recoil = modRecoil,
				items["5c87ca002e221600114cb150"]._props.Ergonomics = modErgo,
				
				//RTM Pillau Tactical grip
				items["5cf4fb76d7f00c065703d3ac"]._props.Recoil = modRecoil,
				items["5cf4fb76d7f00c065703d3ac"]._props.Ergonomics = modErgo,
				
				//Zenit RK-6 Foregrip
				items["5c1bc7752e221602b1779b34"]._props.Recoil = modRecoil,
				items["5c1bc7752e221602b1779b34"]._props.Ergonomics = modErgo,
				
				//MVF001 A3 Vertical Grip KeyMod black
				items["5fc0f9b5d724d907e2077d82"]._props.Recoil = modRecoil,
				items["5fc0f9b5d724d907e2077d82"]._props.Ergonomics = modErgo
				//Note to the reader: the last part in a given { } must not have a , at the end of the line.
				
			}
			
			//midErgo -2/+10
			{
				let modRecoil = midErgoR;
				let modErgo = midErgoE;
				
				//ASh-12 Vertical pistol grip
				items["5cda9bcfd7f00c0c0b53e900"]._props.Recoil = modRecoil,
				items["5cda9bcfd7f00c0c0b53e900"]._props.Ergonomics = modErgo,				
				
				//HK Sturmgriff foregrip
				items["619386379fb0c665d5490dbe"]._props.Recoil = modRecoil,
				items["619386379fb0c665d5490dbe"]._props.Ergonomics = modErgo,			
		
				//Fortis Shift tactical grip
				items["59f8a37386f7747af3328f06"]._props.Recoil = modRecoil,
				items["59f8a37386f7747af3328f06"]._props.Ergonomics = modErgo,
				
				//Magpul AFG grip black
				items["588226d124597767ad33f787"]._props.Recoil = modRecoil,
				items["588226d124597767ad33f787"]._props.Ergonomics = modErgo,        
		
				//Magpul AFG grip FDE
				items["588226dd24597767ad33f789"]._props.Recoil = modRecoil,
				items["588226dd24597767ad33f789"]._props.Ergonomics = modErgo,				
				
				//Magpul AFG grip FG
				items["588226e62459776e3e094af7"]._props.Recoil = modRecoil,
				items["588226e62459776e3e094af7"]._props.Ergonomics = modErgo,				
				
				//Magpul AFG grip OD
				items["588226ef24597767af46e39c"]._props.Recoil = modRecoil,
				items["588226ef24597767af46e39c"]._props.Ergonomics = modErgo,
				
				//SE-5 Express Grip
				items["5b057b4f5acfc4771e1bd3e9"]._props.Recoil = modRecoil,
				items["5b057b4f5acfc4771e1bd3e9"]._props.Ergonomics = modErgo,
				
				//SI "Cobra tactical" tactical grip
				items["5c791e872e2216001219c40a"]._props.Recoil = modRecoil,
				items["5c791e872e2216001219c40a"]._props.Ergonomics = modErgo,
				
				//Zenit RK-4 Foregrip
				items["5c1bc5fb2e221602b1779b32"]._props.Recoil = modRecoil,
				items["5c1bc5fb2e221602b1779b32"]._props.Ergonomics = modErgo,
				
				//Zenit RK-5 Foregrip
				items["5c1bc7432e221602b412949d"]._props.Recoil = modRecoil,
				items["5c1bc7432e221602b412949d"]._props.Ergonomics = modErgo,
								
				//Magpul M-LOK AFG (Olive Drab) Tactical grip
				items["57cffcdd24597763f5110006"]._props.Recoil = modRecoil,
				items["57cffcdd24597763f5110006"]._props.Ergonomics = modErgo,
				
				//Magpul M-LOK AFG (Stealth Gray) Tactical grip
				items["57cffce524597763b31685d8"]._props.Recoil = modRecoil,
				items["57cffce524597763b31685d8"]._props.Ergonomics = modErgo,
				
				//Magpul M-LOK AFG (Flat Dark Earth) Tactical grip
				items["57cffcd624597763133760c5"]._props.Recoil = modRecoil,
				items["57cffcd624597763133760c5"]._props.Ergonomics = modErgo,
				
				//Magpul M-LOK AFG Tactical grip
				items["57cffb66245977632f391a99"]._props.Recoil = modRecoil,
				items["57cffb66245977632f391a99"]._props.Ergonomics = modErgo
				
			}	
			//LowErgo -3/+6
			{
				let modRecoil = lowErgoR;
				let modErgo = lowErgoE;
				
				//Tango Down Stubby BGV-MK46K tactical grip Black
				items["558032614bdc2de7118b4585"]._props.Recoil = modRecoil,
				items["558032614bdc2de7118b4585"]._props.Ergonomics = modErgo,
				
				//Tango Down Stubby BGV-MK46K tactical grip FDE
				items["58c157be86f77403c74b2bb6"]._props.Recoil = modRecoil,
				items["58c157be86f77403c74b2bb6"]._props.Ergonomics = modErgo,
				
				//Tango Down Stubby BGV-MK46K tactical grip FG
				items["58c157c886f774032749fb06"]._props.Recoil = modRecoil,
				items["58c157c886f774032749fb06"]._props.Ergonomics = modErgo,
				
				//TD Aluminium skeletonized vertical grip
				items["5f6340d3ca442212f4047eb2"]._props.Recoil = modRecoil,
				items["5f6340d3ca442212f4047eb2"]._props.Ergonomics = modErgo,
				
				//Viking Tactical UVG Tactical grip
				items["591af28e86f77414a27a9e1d"]._props.Recoil = modRecoil,
				items["591af28e86f77414a27a9e1d"]._props.Ergonomics = modErgo,
				
				//Zenit RK-0 Foregrip
				items["5c1bc4812e22164bef5cfde7"]._props.Recoil = modRecoil,
				items["5c1bc4812e22164bef5cfde7"]._props.Ergonomics = modErgo,
								
				//KAC stopper panel for URX 3/3.1
				items["5d123b7dd7ad1a004f01b262"]._props.Recoil = modRecoil,
				items["5d123b7dd7ad1a004f01b262"]._props.Ergonomics = modErgo,
				
				//KAC stopper panel for URX 3/3.1 FDE
				items["5d124c1ad7ad1a12227c53a7"]._props.Recoil = modRecoil,
				items["5d124c1ad7ad1a12227c53a7"]._props.Ergonomics = modErgo,
											
				//Sig Sauer Vertical Foregrip Keymod Black
				items["5fc0f9cbd6fa9c00c571bb90"]._props.Recoil = modRecoil,
				items["5fc0f9cbd6fa9c00c571bb90"]._props.Ergonomics = modErgo,
				
				//Zenit RK-1 Foregrip
				items["5c1bc5612e221602b5429350"]._props.Recoil = modRecoil,
				items["5c1bc5612e221602b5429350"]._props.Ergonomics = modErgo	
				
			}
			//badErgo -4/+2
			{
				let modRecoil = badErgoR;
				let modErgo = badErgoE;
				
				//Monstrum Tactical Vertical Fore Grip KeyMod
				items["615d8fd3290d254f5e6b2edc"]._props.Recoil = modRecoil,
				items["615d8fd3290d254f5e6b2edc"]._props.Ergonomics = modErgo,
				
				//Magpul RVG grip black
				items["59fc48e086f77463b1118392"]._props.Recoil = modRecoil,
				items["59fc48e086f77463b1118392"]._props.Ergonomics = modErgo,
				
				//Magpul RVG grip FDE
				items["5fce0cf655375d18a253eff0"]._props.Recoil = modRecoil,
				items["5fce0cf655375d18a253eff0"]._props.Ergonomics = modErgo,
				
				//Zenit RK-1 Foregrip on B-25U mount
				items["5c1cd46f2e22164bef5cfedb"]._props.Recoil = modRecoil,
				items["5c1cd46f2e22164bef5cfedb"]._props.Ergonomics = modErgo,
				
				//Zenit RK-2 Foregrip
				items["5c1bc5af2e221602b412949b"]._props.Recoil = modRecoil,
				items["5c1bc5af2e221602b412949b"]._props.Ergonomics = modErgo,
				
				//Hera Arms CQR tactical grip
				items["5a7dbfc1159bd40016548fde"]._props.Recoil = modRecoil,
				items["5a7dbfc1159bd40016548fde"]._props.Ergonomics = modErgo
			}
		}
		}
		if(Config.muzzleDevices){
			Logger.info(`Balancing: Muzzle Devices`);

			
		//5.56 compatable
		{
			
			//Muzzle Brakes
			{								
				//FN SCAR-L 5.56x45 flash hider
				items["618407a850224f204c1da549"]._props.Recoil = "-18",
				items["618407a850224f204c1da549"]._props.Ergonomics = "0",
				
				//Izhmash 5.56x45 АК-101 muzzlebrake & compensator
				items["5ac72e615acfc43f67248aa0"]._props.Recoil = "-13",
				items["5ac72e615acfc43f67248aa0"]._props.Ergonomics = "0",
				
				//Izhmash 5.56x45 АК-102 muzzlebrake & compensator (6P44 0-20)
				items["5ac72e725acfc400180ae701"]._props.Recoil = "-13",
				items["5ac72e725acfc400180ae701"]._props.Ergonomics = "0",
				
				//ADAR 2-15.56x45 Flashhider
				items["5c0fafb6d174af02a96260ba"]._props.Recoil = "-9",
				items["5c0fafb6d174af02a96260ba"]._props.Ergonomics = "-1",
				
				//Annihilator 7.62x39, 5.56x45 and 9mm flash hider for AR-15
				items["5b3a16655acfc40016387a2a"]._props.Recoil = "-20",
				items["5b3a16655acfc40016387a2a"]._props.Ergonomics = "-1",
				
				//Bulletec ST-6012 5.56x45 Flash hider for AR-15
				items["5cf6937cd7f00c056c53fb39"]._props.Recoil = "-22",
				items["5cf6937cd7f00c056c53fb39"]._props.Ergonomics = "-1",
				
				//Colt USGI A2 5.56x45 Flash hider for AR-15
				items["544a38634bdc2d58388b4568"]._props.Recoil = "-10",
				items["544a38634bdc2d58388b4568"]._props.Ergonomics = "0",
				
				//Desert Tech 5.56x45 Flash hider
				items["5c48a2a42e221602b66d1e07"]._props.Recoil = "-17",
				items["5c48a2a42e221602b66d1e07"]._props.Ergonomics = "-1",
				
				//Muzzle brake Vendetta precision VP-09 5.56x45
				items["5a7c147ce899ef00150bd8b8"]._props.Recoil = "-23",
				items["5a7c147ce899ef00150bd8b8"]._props.Ergonomics = "-1",
				
				//Nordic Corvette 5.56x45 compensator for AR-15
				items["5d02676dd7ad1a049e54f6dc"]._props.Recoil = "-21",
				items["5d02676dd7ad1a049e54f6dc"]._props.Ergonomics = "-1",
				
				//Noveske KX3 5.56x45 flash hider
				items["56ea6fafd2720b844b8b4593"]._props.Recoil = "-18",
				items["56ea6fafd2720b844b8b4593"]._props.Ergonomics = "-3",
				
				//PWS CQB 5.56 x 45 Muzzle brake
				items["5943ee5a86f77413872d25ec"]._props.Recoil = "-19",
				items["5943ee5a86f77413872d25ec"]._props.Ergonomics = "-2",
				
				//TAA ZK-23 5.56x45 muzzle brake
				items["612e0e55a112697a4b3a66e7"]._props.Recoil = "-21",
				items["612e0e55a112697a4b3a66e7"]._props.Ergonomics = "-3",
				
				//BLITZ 5.56x45 flash hider
				items["615d8e2f1cb55961fa0fd9a4"]._props.Recoil = "-19",
				items["615d8e2f1cb55961fa0fd9a4"]._props.Ergonomics = "-1",				
				
				//TROY Claymore 5.56x45 muzzle brake for AR-15
				items["5cc9b815d7f00c000e2579d6"]._props.Recoil = "-22",
				items["5cc9b815d7f00c000e2579d6"]._props.Ergonomics = "-2",
				
				//SAI Jail Break 5.56x45 for AR-15
				items["5c78f2882e22165df16b832e"]._props.Recoil = "-6",
				items["5c78f2882e22165df16b832e"]._props.Ergonomics = "-2",
				
				//----mounting kits----
				
				//KAC QD Compensator 5.56x45
				items["56ea8180d2720bf2698b456a"]._props.Recoil = "-14",
				items["56ea8180d2720bf2698b456a"]._props.Ergonomics = "-1",				
				
				//SilencerCo ASR 51T 5.56x45 flash hider
				items["609269c3b0e443224b421cc1"]._props.Recoil = "-20",
				items["609269c3b0e443224b421cc1"]._props.Ergonomics = "-1",
				
				//AWC PSR 5.56x45 muzzle brake
				items["612e0cfc8004cc50514c2d9e"]._props.Recoil = "-19",
				items["612e0cfc8004cc50514c2d9e"]._props.Ergonomics = "-1",
				
				//Surefire WarComp 5.56x45 Flash hider for AR-15
				items["5c6d710d2e22165df16b81e7"]._props.Recoil = "-19",
				items["5c6d710d2e22165df16b81e7"]._props.Ergonomics = "-1",
				
				//Surefire SF3P 5.56x45 Flash hider for AR-15
				items["5c7fb51d2e2216001219ce11"]._props.Recoil = "-19",
				items["5c7fb51d2e2216001219ce11"]._props.Ergonomics = "-1",
				
				// Surefire FH556RC 5.56x45 Flash hider for AR-15
				items["5ea172e498dacb342978818e"]._props.Recoil = "-19",
				items["5ea172e498dacb342978818e"]._props.Ergonomics = "-1", 
				
				//Ferfrans Muzzle Brake 5.56x45
				items["5f6372e2865db925d54f3869"]._props.Recoil = "-19",
				items["5f6372e2865db925d54f3869"]._props.Ergonomics = "-1",
				
				//Ferfrans "CRD" 5.56x45
				items["5f6339d53ada5942720e2dc3"]._props.Recoil = "-4",
				items["5f6339d53ada5942720e2dc3"]._props.Ergonomics = "-3",				
				
				//Daniel Defense Wave Muzzle Brake 5.56x45
				items["5cff9e5ed7ad1a09407397d4"]._props.Recoil = "-20",
				items["5cff9e5ed7ad1a09407397d4"]._props.Ergonomics = "-1",
				
				//Thunder Beast 223CB Muzzle brake 5.56x45
				items["5d440625a4b9361eec4ae6c5"]._props.Recoil = "-22",
				items["5d440625a4b9361eec4ae6c5"]._props.Ergonomics = "-2",
				
				//AAC Blackout 51T 5.56x45 flash-hider
				items["5c7e5f112e221600106f4ede"]._props.Recoil = "-18",
				items["5c7e5f112e221600106f4ede"]._props.Ergonomics = "-1"
			}		
		
			//Silencers
			{
				//SilencerCo Saker ASR 556 5.56x45 sound suppressor
				items["60926df0132d4d12c81fd9df"]._props.Recoil = "-4",
				items["60926df0132d4d12c81fd9df"]._props.Ergonomics = "-13",
				
				//Surefire SOCOM556-RC2 5.56x45 silencer
				items["5ea17bbc09aa976f2e7a51cd"]._props.Recoil = "-2",
				items["5ea17bbc09aa976f2e7a51cd"]._props.Ergonomics = "-10",
				
				//Surefire SOCOM556-MONSTER 5.56x45 silencer
				items["55d614004bdc2d86028b4568"]._props.Recoil = "-3",
				items["55d614004bdc2d86028b4568"]._props.Ergonomics = "-15",
				
				//Surefire SOCOM556-MINI MONSTER 5.56x45 Silencer
				items["55d6190f4bdc2d87028b4567"]._props.Recoil = "1",
				items["55d6190f4bdc2d87028b4567"]._props.Ergonomics = "-6",
				
				//KAC QDSS NT-4 FDE 5.56x45 silencer
				items["57dbb57e2459774673234890"]._props.Recoil = "-10",
				items["57dbb57e2459774673234890"]._props.Ergonomics = "-15",
				
				//KAC QDSS NT-4 Black 5.56x45 silencer
				items["57da93632459771cb65bf83f"]._props.Recoil = "-10",
				items["57da93632459771cb65bf83f"]._props.Ergonomics = "-15",
				
				//standalone
				
				//Rotor 43 5.56x45 muzzle brake
				items["5a9fbb84a2750c00137fa685"]._props.Recoil = "-17",
				items["5a9fbb84a2750c00137fa685"]._props.Ergonomics = "-12"
			}
		}
		
		//5.45
		{		
			//okay so this is the part that some people will object to
			//I'm gonna buff the shit out of ak parts. Like a lot.
			//The Best 545 Recoil Mit in base is 24%
			//Muzzle Brakes
			{
				// Izhmash 5.45x39 АК-74 muzzle brake & compensator (6P20 0-20)
				items["5649aa744bdc2ded0b8b457e"]._props.Recoil = "-13",
				items["5649aa744bdc2ded0b8b457e"]._props.Ergonomics = "0",
				
				//AK Hexagon "Reactor" 5.45x39 muzzle brake
				items["615d8f5dd92c473c770212ef"]._props.Recoil = "-22",
				items["615d8f5dd92c473c770212ef"]._props.Ergonomics = "0",
				
				//IzhMash 5.45x39 muzzle brake for AKS-74U (6P26 0-20)
				items["57dc324a24597759501edc20"]._props.Recoil = "-13",
				items["57dc324a24597759501edc20"]._props.Ergonomics = "0",
				
				//Izhmash 5.45x39 АК-105 muzzlebrake & compensator (6P44 0-20)
				items["5ac72e945acfc43f3b691116"]._props.Recoil = "-13",
				items["5ac72e945acfc43f3b691116"]._props.Ergonomics = "0",
				
				//Izhmash 5.45x39 RPK-16 muzzle brake & compensator
				items["5beec3420db834001b095429"]._props.Recoil = "-13",
				items["5beec3420db834001b095429"]._props.Ergonomics = "0",
				
				//Izhmash 5.45x39 АК-74M muzzle brake & compensator (6P20 0-20)
				items["5ac7655e5acfc40016339a19"]._props.Recoil = "-13",
				items["5ac7655e5acfc40016339a19"]._props.Ergonomics = "0",
				
				//Zenit DTK-1 7.62x39 & 5.45x39 muzzle brake & compensator for AK
				items["5649ab884bdc2ded0b8b457f"]._props.Recoil = "-19",
				items["5649ab884bdc2ded0b8b457f"]._props.Ergonomics = "1",
				
				//SRVV 5.45x39 АК-74 muzzle brake
				items["5cc9a96cd7f00c011c04e04a"]._props.Recoil = "-21",
				items["5cc9a96cd7f00c011c04e04a"]._props.Ergonomics = "1",
				
				//PWS CQB 74 5.45x39 Muzzle brake
				items["5943eeeb86f77412d6384f6b"]._props.Recoil = "-22",
				items["5943eeeb86f77412d6384f6b"]._props.Ergonomics = "3",
				
				//JMAC RRD-4C muzzle brake for AK-74 type thread
				items["5f633f791b231926f2329f13"]._props.Recoil = "-24",
				items["5f633f791b231926f2329f13"]._props.Ergonomics = "-3"
			}
			
			//Silencers
			{
				
				//AK Hexagon "Wafflemaker" 5.45x39 sound suppressor
				items["615d8f8567085e45ef1409ca"]._props.Recoil = "-2",
				items["615d8f8567085e45ef1409ca"]._props.Ergonomics = "-15",
				
				//Hexagon AK-74 5.45x39 sound suppressor
				items["593d493f86f7745e6b2ceb22"]._props.Recoil = "-19",
				items["593d493f86f7745e6b2ceb22"]._props.Ergonomics = "-11",
		
				//PBS-4 5.45x39 Silencer
				items["57ffb0e42459777d047111c5"]._props.Recoil = "-22",
				items["57ffb0e42459777d047111c5"]._props.Ergonomics = "-15",

				//TGP-A 5.45x39 muzzle device/suppressor
				items["564caa3d4bdc2d17108b458e"]._props.Recoil = "-21", //11% buff from stock - this is to put it in line with AR platform weapons.
				items["564caa3d4bdc2d17108b458e"]._props.Ergonomics = "-14"
			}
		}
		
		//7.62
		{
			
			//Muzzle Brakes
			{
				//Izhmash 7.62x39 flash hider for AKML system
				items["5a0d716f1526d8000d26b1e2"]._props.Recoil = "-13",
				items["5a0d716f1526d8000d26b1e2"]._props.Ergonomics = "0",
				
				//Izhmash 7.62x39 АКM muzzle brake & compensator (6P1 0-14)
				items["59d64fc686f774171b243fe2"]._props.Recoil = "-13",
				items["59d64fc686f774171b243fe2"]._props.Ergonomics = "0",
				
				// Izhmash 7.62x39 АК-104 muzzlebrake & compensator (6P46 0-20) 
				items["5ac72e895acfc43b321d4bd5"]._props.Recoil = "-13",
				items["5ac72e895acfc43b321d4bd5"]._props.Ergonomics = "0",
				
				// Izhmash 7.62x39 АК-103 muzzlebrake & compensator 
				items["5ac72e7d5acfc40016339a02"]._props.Recoil = "-13",
				items["5ac72e7d5acfc40016339a02"]._props.Ergonomics = "0",
				
				//Lantac Dragon 7.62x39 muzzle brake & compensator for AK
				items["5c878ebb2e2216001219d48a"]._props.Recoil = "-22",
				items["5c878ebb2e2216001219d48a"]._props.Ergonomics = "-2",
				
				//Venom Antidote muzzle brake & compensator for АК
				items["5c7951452e221644f31bfd5c"]._props.Recoil = "-21",
				items["5c7951452e221644f31bfd5c"]._props.Ergonomics = "-2",
								
				//SRVV 7.62x39 АК muzzle brake & compensator
				items["5cc9ad73d7f00c000e2579d4"]._props.Recoil = "-22",
				items["5cc9ad73d7f00c000e2579d4"]._props.Ergonomics = "-1",
				
				//Spike tactical dynacomp 7.62x39 muzzle brake & compensator for AK
				items["5a9ea27ca2750c00137fa672"]._props.Recoil = "-20",
				items["5a9ea27ca2750c00137fa672"]._props.Ergonomics = "-1",
				
				//JMAC RRD-4C 7.62x39 muzzle brake for AKM type thread
				items["5f633f68f5750b524b45f112"]._props.Recoil = "-24",
				items["5f633f68f5750b524b45f112"]._props.Ergonomics = "-3"
			}
			//Silencers
			{
				//Hexagon AKM 7.62x39 sound suppressor
				items["593d489686f7745c6255d58a"]._props.Recoil = "-22",
				items["593d489686f7745c6255d58a"]._props.Ergonomics = "-16",
				
				//Hexagon "DTKP MK.2" 7.62x39 sound suppressor
				items["5e208b9842457a4a7a33d074"]._props.Recoil = "-24",
				items["5e208b9842457a4a7a33d074"]._props.Ergonomics = "-20",
				
				//PBS-1 7.62x39 silencer
				items["5a0d63621526d8dba31fe3bf"]._props.Recoil = "-23",
				items["5a0d63621526d8dba31fe3bf"]._props.Ergonomics = "-18",
		
				//Rotor 43 7.62x39 muzzle brake
				items["5a9fbacda2750c00141e080f"]._props.Recoil = "-18",
				items["5a9fbacda2750c00141e080f"]._props.Ergonomics = "-6",

				//Zenit DTK-4М muzzle brake
				items["59fb257e86f7742981561852"]._props.Recoil = "-24", //11% buff from stock - this is to put it in line with AR platform weapons.
				items["59fb257e86f7742981561852"]._props.Ergonomics = "-20"
			}
		}
		
		//.308
		{
			
			//Muzzle Brakes
			{
				//pure muzzle brakes
				{
					//Compensator 2A "X3" 7.62x51 for AR-10
					items["5b7d693d5acfc43bca706a3d"]._props.Recoil = "-22",
					items["5b7d693d5acfc43bca706a3d"]._props.Ergonomics = "-2",
				
					//Desert Tech .308 Flash hider
					items["5dcbe965e4ed22586443a79d"]._props.Recoil = "-15",
					items["5dcbe965e4ed22586443a79d"]._props.Ergonomics = "0",
										
					//AR-10 CMMG SV Brake 7.62x51 muzzle brake
					items["6065c6e7132d4d12c81fd8e1"]._props.Recoil = "-20",
					items["6065c6e7132d4d12c81fd8e1"]._props.Ergonomics = "0",
					
					//Muzzle brake Keeno Arms SHREWD 7.62x51 for AR-10
					items["5cdd7685d7f00c000f260ed2"]._props.Recoil = "-20",
					items["5cdd7685d7f00c000f260ed2"]._props.Ergonomics = "-1",
					
					//Muzzle brake Odin Works Atlas-7 7.62x51 for AR-10
					items["5bbdb8bdd4351e4502011460"]._props.Recoil = "-22",
					items["5bbdb8bdd4351e4502011460"]._props.Ergonomics = "-1",
					
					//Muzzle brake Precision Armament M-11 7.62x51 for AR-10
					items["5cdd7693d7f00c0010373aa5"]._props.Recoil = "-21",
					items["5cdd7693d7f00c0010373aa5"]._props.Ergonomics = "-2",
					
					//Nordic Corvette 7.62x51 muzzle brake for AR-10
					items["5d02677ad7ad1a04a15c0f95"]._props.Recoil = "-19",
					items["5d02677ad7ad1a04a15c0f95"]._props.Ergonomics = "-1",
					
					//Fortis Red Brake 7.62x51 muzzle brake for AR-10
					items["5d026791d7ad1a04a067ea63"]._props.Recoil = "-21",
					items["5d026791d7ad1a04a067ea63"]._props.Ergonomics = "-2"
				}
				//mounting kits
				{							
					//AAC SCAR-SD 51T 7.62x51 flash hider
					items["618178aa1cb55961fa0fdc80"]._props.Recoil = "-18",
					items["618178aa1cb55961fa0fdc80"]._props.Ergonomics = "0",
				
					//KAC QDC 7.62x51 muzzle brake kit
					items["6130c43c67085e45ef1405a1"]._props.Recoil = "-19",
					items["6130c43c67085e45ef1405a1"]._props.Ergonomics = "-5",		

					//AWC PSR 7.62x51 muzzle brake
					items["612e0d3767085e45ef14057f"]._props.Recoil = "-19",
					items["612e0d3767085e45ef14057f"]._props.Ergonomics = "-5",						
					
					//HK Prolonged 7.62x51 flash hider
					items["61713308d92c473c770214a0"]._props.Recoil = "-16",
					items["61713308d92c473c770214a0"]._props.Ergonomics = "0",
					
					//SIG micro brake muzzle brake 7.62x51
					items["5fbcbd02900b1d5091531dd3"]._props.Recoil = "-18",
					items["5fbcbd02900b1d5091531dd3"]._props.Ergonomics = "0",
					
					//SIG Two Port brake muzzle brake 7.62x51				
					items["5fbcbd10ab884124df0cd563"]._props.Recoil = "-19",
					items["5fbcbd10ab884124df0cd563"]._props.Ergonomics = "-2",
					
					//3-prong SIG Flash hider 7.62x51
					items["5fbcbcf593164a5b6278efb2"]._props.Recoil = "-19",
					items["5fbcbcf593164a5b6278efb2"]._props.Ergonomics = "-2",
					
					//Direct Thread adapter for the Lantac Blast mitigation device.
					items["5cf78496d7f00c065703d6ca"]._props.Recoil = "0",
					items["5cf78496d7f00c065703d6ca"]._props.Ergonomics = "-1",
					
					//Lantac Dragon 7.62x51 muzzle brake
					items["5c878e9d2e2216000f201903"]._props.Recoil = "-18",
					items["5c878e9d2e2216000f201903"]._props.Ergonomics = "-2",
					
					//Lantac "Blast mitigation device" 7.62x51
					items["5cf78720d7f00c06595bc93e"]._props.Recoil = "-6",
					items["5cf78720d7f00c06595bc93e"]._props.Ergonomics = "-3",
					
					//KAC QDC Flash	suppressor kit 7.62x51 flash hider
					items["5dfa3cd1b33c0951220c079b"]._props.Recoil = "-17",
					items["5dfa3cd1b33c0951220c079b"]._props.Ergonomics = "3",
				
					//Daniel Defense Wave Muzzle Brake 7.62x51
					items["5d1f819086f7744b355c219b"]._props.Recoil = "-19",
					items["5d1f819086f7744b355c219b"]._props.Ergonomics = "-1",
					
					//Thunder Beast 30CB Muzzle Brake 7.62x51
					items["5d443f8fa4b93678dd4a01aa"]._props.Recoil = "-21",
					items["5d443f8fa4b93678dd4a01aa"]._props.Ergonomics = "-2",
					
					//AAC Blackout 51T flash hider (7.62x51)
					items["5a34fd2bc4a282329a73b4c5"]._props.Recoil = "-18",
					items["5a34fd2bc4a282329a73b4c5"]._props.Ergonomics = "-1"
				}
			}
			
			//Silencers
			{
				
				//HK G28 B&T QD 7.62x51 sound suppressor 
				items["6171367e1cb55961fa0fdb36"]._props.Recoil = "-11",
				
				//Sig-Sauer SRD QD 7.62x51 Sound Suppressor
				items["5fbe760793164a5b6278efc8"]._props.Recoil = "-6",
				items["5fbe760793164a5b6278efc8"]._props.Ergonomics = "-10",
				
				//Thunder Beast Ultra 5 Sound Suppressor
				items["5d44064fa4b9361e4f6eb8b5"]._props.Recoil = "-2", //same sum of 23
				items["5d44064fa4b9361e4f6eb8b5"]._props.Ergonomics = "-12", //same great ergo sum of -14
				
				//AAC 762 SDN-6 7.62x51 Sound Suppressor
				items["5a34fe59c4a282000b1521a2"]._props.Recoil = "-5", //same sum of 23
				items["5a34fe59c4a282000b1521a2"]._props.Ergonomics = "-13", //same ergo as thunderbeast - so heavy, so it needs some balance lol
				
				//Daniel Defence Wave QD Sound Suppressor
				items["5cff9e84d7ad1a049e54ed55"]._props.Recoil = "-2", //21 sum
				items["5cff9e84d7ad1a049e54ed55"]._props.Ergonomics = "-9", //-10 sum
				
				//KAC PRS QDC 7.62x51 Sound Suppressor
				items["5dfa3d2b0dee1b22f862eade"]._props.Recoil = "-7", //26 sum - for sniper rifles basically
				items["5dfa3d2b0dee1b22f862eade"]._props.Ergonomics = "-17", //super bad ergo sum -20, for sniping
				
				//standalone
				
				//Gemtech ONE 7.62x51 Sound Suppressor
				items["5c7955c22e221644f31bfd5e"]._props.Recoil = "-23",
				items["5c7955c22e221644f31bfd5e"]._props.Ergonomics = "-14",
				
				//Sig-Sauer "SRD" 7.62x51 Sound Suppressor
				items["5fbe7618d6fa9c00c571bb6c"]._props.Recoil = "-23",
				items["5fbe7618d6fa9c00c571bb6c"]._props.Ergonomics = "-12" //low ergo penalty for being operator af
				
			}
		}
		
		//outliers
		{
			//Silencerco Hybrid 46 multi-caliber silencer
			items["59bffbb386f77435b379b9c2"]._props.Recoil = "-21", // this is stronger than usual because it can't go on top of a muzzle brake.
			items["59bffbb386f77435b379b9c2"]._props.Ergonomics = "-8", //this silencer is extremely ergonomic, because, well, it should be special in at least one way lol.
			
			//Rotor 43 .366TKM muzzle brake
			items["5a9fbb74a2750c0032157181"]._props.Recoil = "-21" //this gun still kicks like a mule, but hopefully it will be a little more fun now.

		}
		}
		if(Config.tweaks){
			
			
			Logger.info(`Making some final tweaks~`);
			//Iron Sights - why do some flip up irons have +1 and others don't...? I dont want MBUS sights on *everything*
			{
				let modErgo = "0"; //this matches the Magpul MBUS, and I'm sick of them
				{//front
					//FN SCAR front flip-up sight
					items["61816fcad92c473c770215cc"]._props.Ergonomics = modErgo,
					
					//HK MP7 flip-up front sight
					items["5ba26b01d4351e0085325a51"]._props.Ergonomics = modErgo,	
					
					//KAC Folding Micro front sight
					items["5dfa3d950dee1b22f862eae0"]._props.Ergonomics = modErgo,									
				
					//KAC Folding front sight
					items["5c17804b2e2216152006c02f"]._props.Ergonomics = modErgo,										
				
					//KRISS Defiance low profile flip-up front sight
					items["5fb6567747ce63734e3fa1dc"]._props.Ergonomics = modErgo,										
				
					//Magpul MBUS Gen2 flip-up front sight
					items["5bc09a30d4351e00367fb7c8"]._props.Ergonomics = modErgo,										
				
					//Magpul MBUS Gen2 flip-up front sight (FDE)
					items["5c18b90d2e2216152142466b"]._props.Ergonomics = modErgo,										
				
					//MCX flip-up front sight
					items["5fc0fa362770a0045c59c677"]._props.Ergonomics = modErgo,										
				
					//AR-15 Leapers UTG Low Profile A2 front sight
					items["55d4af3a4bdc2d972f8b456f"]._props.Ergonomics = modErgo,									
				
					//MPX flip-up front sight
					items["5894a73486f77426d259076c"]._props.Ergonomics = modErgo
					
				}
				{//rear
					//FN SCAR rear flip-up sight
					items["61817865d3a39d50044c13a4"]._props.Ergonomics = modErgo,
					
					//KAC Folding Micro rear sight
					items["5dfa3d7ac41b2312ea33362a"]._props.Ergonomics = modErgo,				
				
					//KAC Folding rear sight
					items["5c1780312e221602b66cc189"]._props.Ergonomics = modErgo,				
				
					//KRISS Defiance low profile flip-up rear sight
					items["5fb6564947ce63734e3fa1da"]._props.Ergonomics = modErgo,				
				
					//Magpul MBUS Gen2 flip-up rear sight
					items["5bc09a18d4351e003562b68e"]._props.Ergonomics = modErgo,
					
					//Magpul MBUS Gen2 flip-up rear sight (FDE)
					items["5c18b9192e2216398b5a8104"]._props.Ergonomics = modErgo,
					
					//MCX flip-up rear sight
					items["5fc0fa957283c4046c58147e"]._props.Ergonomics = modErgo,
					
					//HK MP7 flip-up rear sight
					items["5ba26b17d4351e00367f9bdd"]._props.Ergonomics = modErgo,
					
					//HK 416A5 flip-up rear sight
					items["5bb20e49d4351e3bac1212de"]._props.Ergonomics = modErgo,
					
					//MPX flip-up rear sight
					items["5894a81786f77427140b8347"]._props.Ergonomics = modErgo,
					
					//AR-15 Colt A2 rear sight
					items["55d5f46a4bdc2d1b198b4567"]._props.Ergonomics = modErgo
				}
				
				//now to buff the uppers :)
				{		
					
					//M4A1 5.56x45 upper receiver
					items["55d355e64bdc2d962f8b4569"]._props.Ergonomics += 2;
					
					//AR-15 Noveske Gen.3 5.56x45 upper receiver
					items["5c07a8770db8340023300450"]._props.Ergonomics += 2;
					
					//HK 416A5 5.56x45 upper receiver
					items["5bb20d53d4351e4502010a69"]._props.Ergonomics += 2;
					
					//ADAR 2-15 5.56x45 upper receiver
					items["5c0e2f26d174af02a9625114"]._props.Ergonomics += 2;
					
					//AR-15 Vltor MUR-1S 5.56x45 upper receiver
					items["59bfe68886f7746004266202"]._props.Ergonomics += 2;
					
					//SR-25 7.62x51 upper receiver
					items["5df8e4080b92095fd441e594"]._props.Ergonomics += 2;
					
					//TX-15 5.56x45 Lightweight upper receiver
					items["5d4405aaa4b9361e6a4e6bd3"]._props.Ergonomics += 2;	

					//FN SCAR-H 7.62x51 upper receiver
					items["6165adcdd3a39d50044c120f"]._props.Ergonomics += 2;
					
					//FN SCAR-H 7.62x51 upper receiver (FDE)
					items["6165aeedfaa1272e431521e3"]._props.Ergonomics += 2;
					
					//FN SCAR-L 5.56x45 upper receiver (FDE)
					items["618426d96c780c1e710c9b9f"]._props.Ergonomics += 2;
					
					//FN SCAR-L 5.56x45 upper receiver
					items["618405198004cc50514c3594"]._props.Ergonomics += 2;	

					//MCX GEN1 .300 BLK upper receiver
					items["5fbcc3e4d6fa9c00c571bb58"]._props.Ergonomics += 2;
					
					//MPX GEN1 9x19 upper receiver
					items["5894a5b586f77426d2590767"]._props.Ergonomics += 2;						
				}
			}
			
			
			
			
			
			
			
			
			
			
			
			
			//Basically, off-meta weapons are gonna get a buff here just to make them a little more viable.
			//MDR Tweaks 
			{			
				//406mm barrel for MDR and compatible 5.56x45
				items["5c48a2852e221602b21d5923"]._props.Recoil = "-21",
		
				//16 inch .308 barrel for MDR and compatible
				items["5dcbe9431e1f4616d354987e"]._props.Recoil = "-20"
			}
			
			//AKS-74u Tweaks
			{
				//AKS-74U Gas tube
				items["59d36a0086f7747e673f3946"]._props.Recoil = "-4"
			}
			
			//RFB Tweaks
			{
				//18" barrel for RFB 7.62x51				
				items["5f2aa46b878ef416f538b567"]._props.Recoil = "-21"
								
			}
			//MCX Rebalance
			{
				//rationale: in real life the .300 blackout has about 25% less kinetic energy than the 5.56x45; therefore, you should expect less recoil.
				//in Tarkov, the MCX kicks twice as hard as a murdered out M4. This must change!
				//Now a meta  MCX is about as good as a meta carbine length M4. A little more kick, but better ammo.
				//SIG Sauer Thin lightweight MCX/MPX stock
				items["5fbcc437d724d907e2077d5c"]._props.Recoil = "-34", // cloning the  Troy M7A1 stock
				items["5fbcc437d724d907e2077d5c"]._props.Ergonomics = "21",
				
				//SIG Sauer telescoping MCX/MPX stock
				items["5fbcc429900b1d5091531dd7"]._props.Recoil = "-37", // cloning the  Magpul MOE stock	
				items["5fbcc429900b1d5091531dd7"]._props.Ergonomics = "12",
				
				//SIG 8" keymod foregrip for MCX
				items["5fbc226eca32ed67276c155d"]._props.Recoil = "-3", // further balance changes
				items["5fbc226eca32ed67276c155d"]._props.Ergonomics = "16",
				
				//SIG 12" keymod foregrip for MCX
				items["5fbc227aa56d053a3543f79e"]._props.Recoil = "-3", // just to buff it a bit	
				items["5fbc227aa56d053a3543f79e"]._props.Ergonomics = "8",
				
				//Upper receiver of the first generation Sig-Sauer MCX
				items["5fbcc3e4d6fa9c00c571bb58"]._props.Recoil = "-4", // further balance changes
				items["5fbcc3e4d6fa9c00c571bb58"]._props.Ergonomics = "8",
				
				//Sig-Sauer charging handle for MCX
				items["5fbcc640016cce60e8341acc"]._props.Ergonomics = "3" //raptor clone

			}
			//as VAL rebalance
			{
				//Rationale: I think the VAL felt "right" in those early days of tarkov. The recent changes seem a bit stupid when some guns have like 29 recoil.
				// TSNIITochMash VSS Vintorez stock
				items["578395e82459774a0e553c7b"]._props.Recoil = "-34", // VSS is supposed to be the very low recoil version
				items["578395e82459774a0e553c7b"]._props.Ergonomics = "16",
				
				//TSNIITochMash AS VAL stock
				items["57c450252459772d28133253"]._props.Recoil = "-32", // Val is slightly more about ergo	
				items["57c450252459772d28133253"]._props.Ergonomics = "14",
				
				//VSS 9x39 integral barrel-suppressor
				items["57838c962459774a1651ec63"]._props.Recoil = "-34", // better recoil
				items["57838c962459774a1651ec63"]._props.Ergonomics = "-8",
				
				//AS VAL 9x39 integral barrel-suppressor
				items["57c44dd02459772d2e0ae249"]._props.Recoil = "-33", // better ergo
				items["57c44dd02459772d2e0ae249"]._props.Ergonomics = "-4",
				
				// AS VAL Pistol grip
				items["57c44fa82459772d2d75e415"]._props.Ergonomics = "10" //
			}
			
			//9mm ammo tweaks
			{
				//STM-9
				items["60339954d62c9b14ed777c06"]._props.defAmmo = "5efb0da7a29a85116f6ea05f",
				
				//Submachinegun PP-19-01 Vityaz-SN 9x19
				items["59984ab886f7743e98271174"]._props.defAmmo = "5efb0da7a29a85116f6ea05f",
				
				//TDI Kriss Vector Gen.2 9x19 submachinegun
				items["5fc3f2d5900b1d5091531e57"]._props.defAmmo = "5efb0da7a29a85116f6ea05f",
				
				//SIG MPX 9x19 Submachine gun
				items["58948c8e86f77409493f7266"]._props.defAmmo = "5efb0da7a29a85116f6ea05f",
				
				//B&T MP9-N 9x19 Submachinegun
				items["5de7bd7bfd6b4e6e2276dc25"]._props.defAmmo = "5efb0da7a29a85116f6ea05f"
			}
			
		}
		if(Config.experimental){
			Logger.info(`Doing Fershte's Experiments`);
			
			//Ammo Recoil Changes
			{
				//Rationale: I think that a lot of guns feel, uh, terrible, if you use meta ammo. Gonna squish that a bit.
				
				
				//"9x39BPammo"
				items["5c0d688c86f77413ae3407b2"]._props.ammoRec = "5",				
				
				//"9x39PABammo"
				items["61962d879bb3d20b0946d385"]._props.ammoRec = "0",
				
				//"9x39SP-5ammo"
				items["57a0dfb82459774d3078b56c"]._props.ammoRec = "-5",
				
				//"545igolnik"
				items["61962d879bb3d20b0946d385"]._props.ammoRec = "5",
				
				//"5457n40ammo"
				items["61962d879bb3d20b0946d385"]._props.ammoRec = "-20",
				
				//"545bsammo"
				items["61962d879bb3d20b0946d385"]._props.ammoRec = "0",
				
				//"545btammo"
				items["61962d879bb3d20b0946d385"]._props.ammoRec = "-5",
				
				//"BlackoutAP"
				items["5fd20ff893a8961fc660a954"]._props.ammoRec = "5",
				
				//"M995"
				items["59e690b686f7746c9f75e848"]._props.ammoRec = "5",
				
				//"M855A1"
				items["54527ac44bdc2d36668b4567"]._props.ammoRec = "0",
				
				//"M856A1"
				items["59e6906286f7746c9f75e847"]._props.ammoRec = "-5",
				
				//"M61"
				items["5a6086ea4f39f99cd479502f"]._props.ammoRec = "3",
				
				//"9x19PBP"
				items["5efb0da7a29a85116f6ea05f"]._props.ammoRec = "5",
				
				//"366 AP"
				items["5f0596629e22f464da6bbdd9"]._props.ammoRec = "0",
				
				//"PS12B"
				items["5cadf6eeae921500134b2799"]._props.ammoRec = "0"
				
			}
			
			//STM-9 Parts
			{
				//barrels (actually a problem lol)
				{
					//10.5" barrel for STM-9 9x19
					items["603372b4da11d6478d5a07ff"]._props.Recoil = "4.5",
					
					//12" barrel for STM-9 9x19
					items["603372d154072b51b239f9e1"]._props.Recoil = "4",
				
					//14" barrel for STM-9 9x19
					items["603372f153a60014f970616d"]._props.Recoil = "3.5",				
					
					//16" barrel for STM-9 9x19
					items["603373004e02ce1eaa358814"]._props.Recoil = "3",
					
					//STM-9 9x19 muzzle brake
					items["60337f5dce399e10262255d1"]._props.Recoil = "-18"
				}
				
				//Furniture
				{
					
					// Fab Defence GL Core Stock
					items["602e620f9b513876d4338d9a"]._props.Recoil = "-30",
					items["602e620f9b513876d4338d9a"]._props.Ergonomics = "19",
					
					//CMMG RipStock buttstock
					items["606587d11246154cad35d635"]._props.Recoil = "-29",
					items["606587d11246154cad35d635"]._props.Ergonomics = "24",
					
					//STM  9 inch M-LOK handguard for AR-15
					items["6034e3cb0ddce744014cb870"]._props.Recoil = "-2",
					items["6034e3cb0ddce744014cb870"]._props.Ergonomics = "16",
				
					//STM 12 inch M-LOK handguard for AR-15
					items["6034e3e20ddce744014cb878"]._props.Recoil = "-3",
					items["6034e3e20ddce744014cb878"]._props.Ergonomics = "8",					
					
					//STM 15 inch M-LOK handguard for AR-15
					items["6034e3d953a60014f970617b"]._props.Recoil = "-3",
					items["6034e3d953a60014f970617b"]._props.Ergonomics = "12"
					
				}				
			}
			//Kriss Vectors
			{
				//logic: best barrel + best can + best stock = -4 + -12 + - 38 = -54%
				//if we changed that to                      = -x + -25 + - 38 = -54%, x = -4 + 13 = +9
				//barrels +9 recoil from current
				//MOA changed to 4.6 (primary source)
				
				//barrels
				{
					//5" Vector barrel .45 ACP      5fb65363d1409e5ca04b54f5
					items["5fb65363d1409e5ca04b54f5"]._props.Recoil = "12",						
					items["5fb65363d1409e5ca04b54f5"]._props.CenterOfImpact = 0.14,
					
					//6" Vector barrel .45 ACP		5fb653962b1b027b1f50bd03
					items["5fb653962b1b027b1f50bd03"]._props.Recoil = "11",					
					items["5fb653962b1b027b1f50bd03"]._props.CenterOfImpact = 0.134,
					
					//5" barrel for Vector 9x19		5fbbc366ca32ed67276c1557
					items["5fbbc366ca32ed67276c1557"]._props.Recoil = "10",					
					items["5fbbc366ca32ed67276c1557"]._props.CenterOfImpact = 0.14,
					
					//6" barrel for Vector 9x19		5fbbc383d5cb881a7363194a
					items["5fbbc383d5cb881a7363194a"]._props.Recoil = "9",					
					items["5fbbc383d5cb881a7363194a"]._props.CenterOfImpact = 0.134;
				}
				//furniture
				{
					//KRISSVector Gen.2 folding stock
					items["5fb6558ad6f0b2136f2d7eb7"]._props.Recoil = "-34",	
					items["5fb6558ad6f0b2136f2d7eb7"]._props.Ergonomics = "21"
				}
			}
			//MP7s 
			{
				
				//HK MP7A1 4.6x30 submachine gun
				items["5ba26383d4351e00334c93d9"]._props.RecoilForceUp = "51",	
				items["5ba26383d4351e00334c93d9"]._props.RecoilForceBack = "175",	

				//HK MP7A2 4.6x30 submachine gun
				items["5bd70322209c4d00d7167b8f"]._props.RecoilForceUp = "51",	
				items["5bd70322209c4d00d7167b8f"]._props.RecoilForceBack = "175"	
				
			}
			//MP5s
			{
				//HK MP5K 9x19 submachine gun
				items["5d2f0d8048f0356c925bc3b0"]._props.RecoilForceUp = "49",	
				items["5d2f0d8048f0356c925bc3b0"]._props.RecoilForceBack = "195",	

				//HK MP5 9x19 submachine gun (Navy 3 Round Burst)
				items["5926bb2186f7744b1c6c6e60"]._props.RecoilForceUp = "33",	
				items["5926bb2186f7744b1c6c6e60"]._props.RecoilForceBack = "150",					
				
				//HK MP5 A2 stock
				items["5926d3c686f77410de68ebc8"]._props.Recoil = "0",	
				
				//HK MP5 A3 old model stock
				items["5926d40686f7740f152b6b7e"]._props.Recoil = "0"
				
			}
			//UMP
			{
				//HK UMP polymer stock
				items["5fc3e4ee7283c4046c5814af"]._props.Recoil = "0",	
				
				//HK UMP .45 ACP submachine gun
				items["5fc3e272f8b6a877a729eac5"]._props.RecoilForceUp = "49",	
				items["5fc3e272f8b6a877a729eac5"]._props.RecoilForceBack = "195",	
				
				//HK UMP .45 ACP 8 inch barrel
				items["5fc3e4a27283c4046c5814ab"]._props.Recoil = "5",	
				
				//HK UMP .45 ACP 8 inch threaded barrel
				items["6130c3dffaa1272e43151c7d"]._props.Recoil = "5"
				
				
			}
			//MPX
			{
				//logic: best barrel, best can, best handguard, best stock 
				// = -7 + -12 + - 4 + -39 = - 62%
				// sooo, we need to lose 13% between barrels, upper, and handguards
				// -7 for barrels, - 4 for handhuards, -2 for upper
				//barrels
				{
					//4.5" 9x19 barrel for MPX
					items["5c5db5852e2216003a0fe71a"]._props.Recoil = "4",	
					
					//6.5" 9x19 barrel for MPX
					items["5c5db5962e2216000e5e46eb"]._props.Recoil = "3",	
					
					//203 mm 9x19 barrel for MPX   2%
					items["5894a2c386f77427140b8342"]._props.Recoil = "2",	
					
					//10.5" 9x19 barrel for MPX  1%
					items["5c5db5b82e2216003a0fe71d"]._props.Recoil = "1",	
					
					//14" 9x19 barrel for MPX    0%
					items["5c5db5c62e22160012542255"]._props.Recoil = "0",	
					
					//165 mm 9x19 barrel for MPX-SD to 4%
					items["58aeaaa886f7744fc1560f81"]._props.Recoil = "-5"
				}
				//furniture
				{
					//Midwest 10.5 inch M-LOK foregrip for MPX
					items["5c5db6302e2216000e5e47f0"]._props.Recoil = "0",	
					items["5c5db6302e2216000e5e47f0"]._props.Ergonomics = "15",
					
					//Midwest 14 inch M-LOK foregrip for MPX
					items["5c5db63a2e2216000f1b284a"]._props.Recoil = "0",	
					items["5c5db63a2e2216000f1b284a"]._props.Ergonomics = "19",
					
					//Upper receiver of the first generation SIG MPX
					items["5894a5b586f77426d2590767"]._props.Recoil = "2"
				}
				//stocks
				{
					//Early produced SIG collapsing/telescoping MCX/MPX stock
					items["5894a13e86f7742405482982"]._props.Recoil = "-33",	
					items["5894a13e86f7742405482982"]._props.Ergonomics = "19",
					
					//Maxim Defence CQB collapsing/telescoping MCX/MPX stock
					items["5c5db6ee2e221600113fba54"]._props.Recoil = "-36",	
					items["5c5db6ee2e221600113fba54"]._props.Ergonomics = "14",
					
					//PMM "ULSS" foldable MCX/MPX stock
					items["5c5db6f82e2216003a0fe914"]._props.Recoil = "-39",	
					items["5c5db6f82e2216003a0fe914"]._props.Ergonomics = "1"
				}
				
				
			}
			//AR Gas Blocks - basically all these parts are available to meta weapons and should be the same to avoid forcing certain build appearances.
			{
					//AR-10 KAC Low Profile Gas Block
					items["5dfa3d45dfc58d14537c20b0"]._props.Recoil = "-4",	
					items["5dfa3d45dfc58d14537c20b0"]._props.Ergonomics = "-2",
					
					//JP Enterprises Gas System-5B
					items["5d00ec68d7ad1a04a067e5be"]._props.Recoil = "-4",	
					items["5d00ec68d7ad1a04a067e5be"]._props.Ergonomics = "-2",
					
					//JP Enterprises Gas System-6
					items["5a34fbadc4a28200741e230a"]._props.Recoil = "-4",	
					items["5a34fbadc4a28200741e230a"]._props.Ergonomics = "-2"				
			}
			//pistol caliber muzzle devices:
			{
				//Kriss Vector .45 ACP Flash hider
				items["5fb65424956329274326f316"]._props.Recoil = "-20",

				//KRISS Vector 9x19 Flash hider
				items["5fbbc3324e8a554c40648348"]._props.Recoil = "-20",	

				//A2 9x19 Flash hider for MPX
				items["58949dea86f77409483e16a8"]._props.Recoil = "-20",		

				//PP-19-01 "Vityaz" 9x19 sound suppressor
				items["59bfc5c886f7743bf6794e62"]._props.Recoil = "-25",

				//PP-19-01 "Vityaz" 9x19 muzzle brake-compensator
				items["5998597786f77414ea6da093"]._props.Recoil = "-15",	

				//Saiga-9 9x19 muzzle brake-compensator
				items["5998598e86f7740b3f498a86"]._props.Recoil = "-15",				
				
				//HK UMP B&T OEM .45 ACP sound suppressor
				items["6130c4d51cb55961fa0fd49f"]._props.Recoil = "-20",	

				//TACCOM Carbine Brake multi-caliber
				items["5cf6935bd7f00c06585fb791"]._props.Recoil = "-20",	

				//AAC Illusion 9 9x19 sound suppressor
				items["5c7e8fab2e22165df16b889b"]._props.Recoil = "-23",

				//SIG Sauer SRD9 9x19 sound suppressor
				items["5c6165902e22160010261b28"]._props.Recoil = "-22",

				//SilencerCo Osprey 9 9x19 sound suppressor
				items["5a32a064c4a28200741e22de"]._props.Recoil = "-23",

				//Rotor 43 9x19 muzzle brake-compensator
				items["5a9fb739a2750c003215717f"]._props.Recoil = "-18",				
				
				//SilencerCo Omega 45k .45 ACP sound suppressor
				items["5fc4b9b17283c4046c5814d7"]._props.Recoil = "-25",	
				items["5fc4b9b17283c4046c5814d7"]._props.Ergonomics = "-18"
				
			}
		}
	}
}
module.exports.Mod = Mod;

/*
{
	"optics":true,
	"pistolGrips":true,
	"furniture":true,
	"stocks":true,
	"foregrips":true,
	"muzzleDevices":true	
}
*/