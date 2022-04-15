## What does this mod do ?

This mod allows the creation of custom AI difficulty levels, without needing to modify any base game files.

Please note: If you are also using Fin's AI Tweaks (FAIT), then ALL config settings in Fin's AI Loader (FAIL) will be ignored, except for the setting "aiTemplateName", which FAIT will use in place of its normal hard-coded AI template.

How to use this mod:

	How the templates work:
	
		Every setting in the template is in the 'array' format. This is indicated by the square brackets [] around the entry. In an array, every item is considered to be on a list, with the first item in the array at positon 0.
			Example: ["a", "tree", 4, true]. "a" is in position 0. 4 is in position 3.
		
		Difficulty options will be selected using these positions.
			Example: "MAX_AIMING_UPGRADE_BY_TIME": [1.5,1.5,1.35,1.15,1,0.85,0.7] a bot with difficulty '3' will have their MAX_AIMING_UPGRADE_BY_TIME setting set to 1.15
			
		If the difficulty setting of a bot is higher than the number of positions in a setting, the mod will decide what the difficulty value is in one of two ways:
		
			If the values in the array are increasing as you go from left to right:
				The mod will take the difference between the last two values, and assume that every missing position would have increased by that amount.
					Example: "MIDDLE_DIST": [35,50,65]. The difference between 50 and 65 is 15, so a bot with difficulty '5' would have 65 + 15 + 15 + 15 = 110 as their setting.
			If the values in the array are decreasing as you go from left to right:
				The mod will take the percentage decrease between the last two values, and assume that every missing position would have decreased by that percent, compared to its predecessor. This is so that decreasing values don't accidentally go below 0.
					Example: "FarDeltaTimeSec": [4.7,4.1,3.5,3]. The final value is 85.7% of the second-to-last value, so a bot with difficulty '6' would have 3 * 0.857 * 0.857 * 0.857 = 1.888268379 as their setting.
			
			If the difficulty setting of a bot is below zero, the above two functions are performed in reverse, using the first two values in the array.
			
			This means that if the final two entries in one of these arrays are identical, then that 'caps' the setting at that value, regardless of how high a bot's difficulty setting is.
				Example: "FarDeltaTimeSec": [4.7,4.1,3.5,3,2.4,1.8,1.5,1.2,1,1]. The last and second to last values are each the same, so the difference between them is 0, thus they can neither be increased or decreased by the above two methods.
				
		How the difficulty settings in the config file work:
		
			Any bot in the botDifficulties list (in the config) will use the value they are assigned, plus the overallAIDifficultyMod setting, as their difficulty value.
			
			Any bot in the botsToLeaveUnchanged list will be unchanged.
			
			Any bots not on either of these lists (Except for bosses) will use the defaultDifficulty setting plus the overallAIDifficultyMod setting as their difficulty value.
			
			An important note: FAIT, among its many oddities, does not start bots out at a difficulty setting of 0. FAIT starts low level AIs out at a difficulty of 3, mid levels at 4, and high levels at 5. Please keep this in mind if you try and compare difficulties between FAIT and FAIL.
			
		How the difficulty settings ingame work:
		
			Only bots placed in the botsToLeaveUnchanged list will be affected by ingame difficulty settings.
			
			