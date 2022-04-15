General outline:
    This is an API that i created to help me in the creation of my mods.

    I will be adding more functionality as time goes on, my goal with this is not only to aid myself in mod making but also others.

Important notes:
    Some lines of code (Specified with "//CoreMod Line") overlap with CoreMod (API made by Ereshkigal) however this was quite unavoidable,
    all lines of code overlaping with CoreMod have be provided with permission from Ereshkigal.

    Ereshkigal's licence aswell as my own have been included in this package, and should stay with this package unless stated otherwise.

How to setup for use within your mod:
    To define my api please use:
        const KaijuApi = require("../../Kaiju-api/api");

        This is important as my api wont work without it.
    
    To call a function within my api:
        KaijuApi.functionNameHere(arguments);

        Arguments are important as the function wont be able to access the data without them.
        See "api.js" for function names.
    
Constructive feedback?:
    You can reach out to me either on Guilded (Le Kaiju) or Discord (Le Kaiju#2317)

Thank you for taking the time to read this and good luck.