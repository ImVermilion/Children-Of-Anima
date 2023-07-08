/*:
 * @target MZ
 * @plugindesc My OcRam extensions
 * @author Me/You/Anyone
 * @url https://ocram-codes.net
 * @orderAfter OcRam_Weather_System
 * @orderAfter OcRam_Time_System
 * @
 * 
 * @param Rain Switch Id
 * @type switch
 * @desc Rain switch to toggle
 * @default 0
 * 
 * @help
 * This plugin is an example how to extend "OcRam.Weather_System.onNewWeather"
 * and "OcRam.Time_System.onDayPhase" methods!
 * 
 * Applies pretty much to any other extensions also! :)
 * 
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Do what ever you like with this plugin.
 * 
 * HAPPY RPG MAKING!
 */

(function (parameters) { // Let's not pollute global name space...

    // Get our rain switch id, which we can adjust in plugin manager
    const _rainSwitchId = Number(parameters["Rain Switch Id"] || 0);

    let _prevWeatherId = 0; // Previous weather id
    let _prevDayPhase = 0; // Previous day phase

    // Get weather variable id from OcRam_Weather_System
    const _weatherVarId = Number(OcRam.Weather_System.parameters["Weather Variable"]);
    if (_weatherVarId) { // Just check if this parameter is defined...
        const _OcRam_Weather_System_onNewWeather = OcRam.Weather_System.onNewWeather; // Get all previous extensions...
        OcRam.Weather_System.onNewWeather = function () {
            _OcRam_Weather_System_onNewWeather.call(this); // Important to call previously added stuff!
            const current_weather_id = Number($gameVariables.value(_weatherVarId));
            if (current_weather_id != _prevWeatherId) { // Has it actually changed?!
                if (_rainSwitchId) { // Just check if this parameter is defined...
                    if ($gameVariables.value(_weatherVarId) === -1) {
                        $gameSwitches.setValue(_rainSwitchId, true); // It's raining (RM core 'rain' weather)
                    } else {
                        $gameSwitches.setValue(_rainSwitchId, false); // It's not raining
                    } console.log($gameVariables.value(_weatherVarId)); // Just prints weather variable to console (F12 in-game)...
                } _prevWeatherId = current_weather_id; // Set previous
            }
        };
    } else { console.warn("'Weather Variable' not defined!"); }

    // Get day phase variable id from OcRam_Time_System
    const _dayPhaseVarId = Number(OcRam.Time_System.parameters["Day phase variable Id"]);
    if (_dayPhaseVarId) { // Just check if this parameter is defined...
        const _OcRam_Time_System_onDayPhase = OcRam.Time_System.onDayPhase; // Get all previous extensions...
        OcRam.Time_System.onDayPhase = function () {
            _OcRam_Time_System_onDayPhase.call(this); // Important to call previously added stuff!
            const current_day_phase = Number($gameVariables.value(_dayPhaseVarId));
            if (current_day_phase != _prevDayPhase) { // Has it actually changed?!
                switch ($gameVariables.value(_dayPhaseVarId)) { // Handle day phases
                    case 1: console.log("IT'S NIGHT"); break;
                    case 2: console.log("IT'S DAWN"); break;
                    case 3: console.log("IT'S DAY"); break;
                    case 4: console.log("IT'S EVENING"); break;
                    default: console.log("WARNING! Unknown 'Day Phase'?!"); break;
                } _prevDayPhase = current_day_phase; // Set previous
            }
        };
    } else { console.warn("'Day phase variable Id' not defined!"); }

})(PluginManager.parameters("My_OcRam_Extensions")); // Anonymous function wrap up and pass plugin parameters.