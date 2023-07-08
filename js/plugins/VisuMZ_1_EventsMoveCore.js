//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.24] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x139b=['isDashDisabled','_eventCopyData','setupRegionRestrictions','_shadowOpacity','nthHy','_spawnData','loadDataFile','USER-DEFINED\x201','turnAwayFromCharacter','_SavedEventLocations','Game_Player_checkEventTriggerThere','Spriteset_Map_createShadow','metCPC','BRBor','EventTemplates','characterPatternY','_eventOverload','_eventSpawnData','value','RXKYh','_saveEventLocations','note','iIzTj','Game_Character_forceMoveRoute','ARRAYSTR','isBigCharacter','setupSpawn','dVXUY','BitmapSmoothing','getEventIconData','Game_Interpreter_PluginCommand','Step2MapId','isSpawnedEvent','_labelWindows','_comments','_moveRouteIndex','setupEventsMoveCoreNotetags','LEFT\x20TO\x20RIGHT','smooth','offsetY','CJlwM','setupEventsMoveCoreEffects','jumpHeight','processMoveRouteStepTo','Alido','clear','right','_spriteOffsetX','COLLAPSE','stind','refreshIfNeeded','PostMorphJS','qNYzs','Region%1','isLabelVisible','gGSHU','lastSpawnedEvent','round','LFIZZ','AEFNF','DPvPX','XZQxA','tCmgG','event','processMoveRouteHugWall','loadCPC','ypsWx','getControlledFollowerID','reserveCommonEvent','Game_Event_checkEventTriggerAuto','string','activationProximityDistance','type','Hidden','drHfi','Game_Character_processMoveCommand','Game_Interpreter_executeCommand','VehicleAllow','TurnInPlaceDelay','TargetVariableId','EventLocationCreate','findTargetSprite','gqeJg','start','processMoveRouteAnimation','_spriteOffsetY','KlktJ','_frames','ANGER','isSaveEventLocations','log','_CPCs','addLoadListener','_moveSynch','CustomPageConditions','PageId','131398lruscZ','_pageIndex','isEventClickTriggered','updateMoveSynch','gwTff','_labelWindow','HEART','frontX','updateScale','unlock','mirror\x20vert','_type','createSpawnedEvent','Game_Map_unlockEvent','airship','square','PJgwX','moveSynchType','onLoadSuccess','updateShadowChanges','checkAdvancedSwitchVariablePresent','hasMoveOnlyRegions','ZsfdA','setDirection','isSaveEventLocation','iIOqg','kBpSd','_speed','pxDKu','checkEventsMoveCoreStringTags','1DrlQwa','autoEventIconBuffer','Game_Timer_stop','FollowerSetControl','onDatabaseLoaded','clearDestination','Game_CharacterBase_moveStraight','exit','shadowFilename','meetActivationRegionConditions','setStopFollowerChasing','processMoveRouteMoveRepeat','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','bMrJg','MUSIC-NOTE','_screenZoomScale','moveDiagonally','hFcon','switch1Id','All','processMoveSynchReverseMimic','moveBackToRandomHome','...','isEventRunning','RIGHT','lpvjN','WalkAllow','Window_ScrollText_startMessage','setPattern','nHlUv','execute','createSaveEventLocationData','character','screenY','processMoveSynchMirrorVert','autosaveEventLocation','_eventCache','canPass','filter','SpawnEventDespawnEventID','EventTimerFramesGain','LkmQW','SPIN\x20CCW','updateTilt','OFF','clearSpriteOffsets','unlockEvent','realMoveSpeed','_encounterEffectDuration','goQon','prepareSpawnedEventAtTerrainTag','processMoveRouteMoveUntilStop','_moveSpeed','BYSGD','PreMorphJS','rotation','approach','isLandOk','slice','Preserve','APPhp','_eventLabelOffsetY','SPIN\x20CLOCKWISE','getPlayerDiagonalSetting','needsUpdate','startMapCommonEventOnOK','nBOHF','VJrFW','PostSpawnJS','USER-DEFINED\x203','GwrGv','Game_SelfSwitches_value','Game_Map_parallelCommonEvents','SpawnEventDespawnAtXY','TiltVert','toUpperCase','_character','Game_Follower_initialize','OsIgp','qVAOH','setEventLabelsVisible','YvrOM','length','getPose','isNormalPriority','ZZZ','_tilemap','absDistance','Dock','SwitchId','pageIndex','JCStt','DefaultShadow','getDirectionFromPoint','copy','removeTemporaryMapSpawnedEvents','update','Game_CommonEvent_isActive','Toggle','useCarryPoseForIcons','Game_Switches_value','BufferX','random','processDrawIcon','_patternLocked','hasClickTrigger','Step2Preserve','IconSize','createLowerLayer','AdvancedSwitches','_target','195895HutWph','Game_Player_isDashing','_interpreter','regionId','qhBXk','QeLNF','isPassableByAnyDirection','AutoMoveEvents','Stop','PlayerMovementDiagonal','outlineColor','addChild','Sprite_Character_setCharacterBitmap','_cpc','LOWER\x20LEFT','region','PosY','bmOsF','setupDiagonalSupport','_eventErased','processMoveRouteStepToCharacter','rFmFf','xyojF','BFyNB','_DisablePlayerControl','isSpriteVS8dir','dir8','roundX','createLabelWindows','_visiblePlayerY','front','horizontal\x20mirror','forceCarrying','boat','ARRAYNUM','SpawnEventAtRegion','player','moveAwayFromPoint','FollowerReset','ShowShadows','_moveOnlyRegions','PosX','FollowerID','deleteSavedEventLocationKey','VehicleDock','deltaYFrom','trigger','isDashingEnabled','delay','description','jump','30930eISbpx','FavorHorz','xpluR','onCancel','iUJcb','correctFacingDirection','NOTE','requestAnimation','Movement','GjyAI','_eventScreenX','Game_Event_meetsConditions','onExpire','hasStepAnime','StopAutoMoveMessages','deltaY','_characterIndex','despawnEventId','isActive','Map%1-Event%2','Game_Vehicle_isLandOk','%1%2','directionOnLadderSpriteVS8dir','turnTowardCharacter','mirror\x20horz','%1Forbid','STR','labelWindowRange','processMoveRouteJumpToCharacter','_hidden','aMtHz','FALSE','XGAYb','mimic','Spriteset_Map_createLowerLayer','ARRKB','prepareSpawnedEventAtXY','processMoveSynchAway','Window_EventItem_onOk','_regionRules','xlDko','uhDGA','switches','ALwNR','ayFKR','setOpacity','WalkForbid','resume','bind','Template','roundXWithDirection','jujgZ','Disable','MmCgm','KQUCw','Game_CharacterBase_initMembers','vpelI','isRegionAllowPass','Game_Player_executeMove','pageId','switch1Valid','TerrainTags','okkWm','$preloadedMap_%1','List','getSavedEventLocation','onOk','updateParallel','isBoat','replace','Map%1.json','Kpgun','vQgyF','processMoveRouteSetIndex','Icon','Game_Event_clearPageSettings','_eventLabelOffsetX','Game_Event_refresh','isPassable','_activationProximity','_eventMorphData','processMoveSynchMirrorHorz','isWorking','lastSpawnedEventID','executeCommand','Player','resizeWindow','isPlaytest','_spawnPreserved','Passability','_PlayerDiagonalSetting','Game_Player_getInputDirection','checkRegionEventTrigger','nuzqR','hideShadows','initEventsMoveCore','meetActivationProximityConditions','isDestinationValid','DashEnableToggle','checkCollisionKeywords','moveRouteIndex','whxSo','naJfr','Sprite_Character_setTileBitmap','eventLabelsVisible','setDestination','removeChild','isRunning','drawIcon','text','MUSIC\x20NOTE','CXHkg','isSelfVariable','ARRAYEVAL','qxBvH','vert\x20mirror','turnAwayFromPoint','searchLimit','despawnRegions','FUNC','PkaSV','MorphEventTo','Game_Map_isDashDisabled','YzpsN','Game_Player_checkEventTriggerHere','_characterName','QINkW','Letter','_shadowGraphic','PreloadMaps','registerCommand','VyHHy','concat','VisuMZ_2_DragonbonesUnion','initMembers','_stopCount','initMembersEventsMoveCore','timer','target','_stepPattern','_vehicleType','getInputDirection','isEventTest','EventLocationSave','gaywN','AESnX','_characterSprites','indexOf','clearDashing','zoomScale','BfBtz','padZero','MapId','_reflection','FollowerSetGlobalChase','icwCD','Game_Map_event','KNEEL','createContents','Minutes','_lastPluginCommandInterpreter','isMoveOnlyRegionPassable','shadowY','processMoveSynch','Sprite_Balloon_setup','CjNtJ','Step1MapId','_clickTrigger','processMoveRouteFadeIn','prototype','isShip','Game_Character_setMoveRoute','Settings','updatePosition','EventID','Game_CharacterBase_moveDiagonally','vUEDe','mjYRX','FastForwardKey','fGQHD','ldglZ','eventsXyNt','FbVZi','clearStepPattern','GetMoveSynchTarget','_pose','AdvancedVariables','reverse\x20mimic','_EventsMoveCoreSettings','ARRAYFUNC','CallEvent','isMovementSucceeded','getPosingCharacterDirection','545106arLBOJ','split','onClickTrigger','LineHeight','Vehicle','makeDeepCopy','PostCopyJS','call','XJNGf','ship','setWaitMode','iconHeight','code','VisibleEventLabels','_moveRoute','removeMorph','PlayerIconChange','BalloonOffsetY','checkEventTriggerThere','SMqop','_eventId','findDiagonalDirectionTo','updateBitmapSmoothing','RegionOkTarget','setBalloonPose','VisuMZ_0_CoreEngine','createLabelWindowForTarget','convertVariableValuesInScriptCall','moveStraight','Walk','BalloonOffsetX','pluginCommandCallEvent','moveByInput','erase','VisuMZ_1_MessageCore','_counter','RemovePreserve','KEZWI','processMoveRouteStepFrom','registerSelfEvent','hasAdvancedSwitchVariable','wGAyp','getMapSpawnedEventData','244507OAdvSz','chaseCharacter','constructor','enable','pages','locate','setFrames','getInputDir8','ikgZr','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SLEEP','deleteSavedEventLocation','BeqOw','iconSize','YphBp','ShOAF','_selfTargetItemChoice','initEventsMoveCoreSettings','VariableId','column','isTile','WrklZ','setupEvents','height','isSupportDiagonalMovement','Self\x20Variable\x20%1','bvRHQ','ODclR','setMoveSpeed','Game_Event_event','getPreservedMorphEventData','sLAkN','updateSelfMovement','turnRight90','isJumping','TerrainTag','NVgbP','isDashingAndMoving','isTurnInPlace','_eventIcon','screenX','rMqek','KKvBh','Self\x20Switch\x20%1','IconIndex','$callEventMap','status','_eventOverloadThreshold','increaseSteps','CarryPose','updateVS8BalloonOffsets','gainFrames','isPressed','Game_Interpreter_updateWaitMode','processMoveSynchRandom','_selfTarget','createBitmap','Chase','page','_selfTargetNumberInput','_commonEventId','Kiqkz','floor','updatePeriodicRefresh','LSMlU','SelfSwitches','KEttf','_filename','advancedValue','_needsRefresh','turnLeft90','Region','IconBufferY','setChaseOff','mapId','charAt','updatePattern','FkrbT','findDirectionTo','_shadowSprite','blendMode','abs','HUfFP','Sprite_Character_update','aiyNn','processMoveCommand','canStartLocalEvents','moveAwayFromCharacter','AILNo','Enable','BQKwC','includes','Game_Message_add','EventAllow','EventLocationDelete','sUHtD','setBackgroundType','LIGHTBULB','opacity','BULB','determineEventOverload','SWEAT','isValid','Button','Game_CharacterBase_realMoveSpeed','default','RxSHT','bpkre','bxDpc','ZqWzI','events','activationRegionList','EnableDashTilt','_duration','_callEventData','processMoveCommandEventsMoveCore','DashingEnable','_activationProximityAutoTriggerBypass','FRUSTRATION','Game_Vehicle_isMapPassable','processMoveRouteBalloon','updateText','_commonEvents','OQJRn','splice','Frames','FUsyA','fittingHeight','TemplateName','zyAKM','PlayerForbid','EventId','Hours','EventIconChange','Game_Player_increaseSteps','TNQDz','ConvertParams','YrwTl','vehicle','processMoveRouteSelfVariable','labelWindowText','advancedFunc','FontSize','push','miAZA','turnTowardPoint','Game_Temp_setDestination','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','ShipSpeed','processMoveRouteTeleportTo','SpawnEventDespawnEverything','EventLabelVisible','variableId','ZpojR','xZfdq','reverse\x20copy','EventTimerPause','convertSelfVariableValuesInScriptCall','ZjUqh','isAutoBufferIcon','EventForbid','setupSpawnTest','Game_Vehicle_initMoveSpeed','fcQOw','checkEventTriggerEventsMoveCore','getDirectionToPoint','ZBKLj','registerSelfTarget','timerText','morphInto','ARRAYSTRUCT','Game_Enemy_meetsSwitchCondition','UgnaA','dAtjd','ZZtPB','PKIHG','changeSpeed','updateShadow','vioKD','%1Allow','LEFT','isTargetEventValidForLabelWindow','setLastPluginCommandInterpreter','vzsVn','deltaX','startMapCommonEventOnTouch','bnhPm','parent','_chaseOff','EXCLAMATION','template','despawnAtXY','clearCarrying','isInVehicle','Direction','spriteId','_randomHomeX','Speed','WzCww','scale','Game_CharacterBase_increaseSteps','getPosingCharacterPattern','VICTORY','RIGHT\x20TO\x20LEFT','PreCopyJS','Game_Troop_meetsConditions','setCommonEvent','processOk','TiltLeft','EventTimerSpeed','UNTITLED','variables','itemPadding','isCollidedWithPlayerCharacters','setItemChoice','despawnEverything','aWCBX','saveEventLocation','hasCPCs','stop','KOKuL','EventLabelRefresh','SelfVariableID','UWHLw','determineCommonEventsWithCPC','spawnPreserved','deltaXFrom','SILENCE','iconIndex','spawnEventId','Sprite_Balloon_updatePosition','setup','disable','utcjJ','eOiNf','RMqSz','isBattleTest','Scene_Boot_onDatabaseLoaded','dcuyE','OperateValues','updateMove','firstSpawnedEvent','filename','_moveAllowPlayerCollision','rpCrr','JQTNH','isShadowVisible','SlowerSpeed','deleteEventLocation','getLastPluginCommandInterpreter','_opacity','EnableDir8','isRegionForbidPass','_PreservedEventMorphData','Boat','IHNjt','KBnkX','pattern','zKVHh','Collision','startEncounterEffect','vOGYS','Game_CharacterBase_screenY','SfvGa','isSpawnHitboxCollisionOk','AutoBuffer','FPkok','Game_Event_setupPageSettings','KrdbK','executeMoveDir8','AYSTv','xZvit','WPPmp','name','parse','_forceDashing','EaegM','windowPadding','checkEventTriggerHere','deletePreservedMorphEventDataKey','QUESTION','getPosingCharacterIndex','yBHYl','eventId','AWKfK','Game_Event_moveTypeRandom','mokfq','dEaKj','iconWidth','isAirshipPassable','resetFontSettings','BQaYw','_diagonalSupport','JINDw','setupSaveEventLocations','SelfVariables','BlendMode','Window_NumberInput_processOk','processMoveSynchCustom','setFrame','setMoveRoute','_followerChaseOff','createIconSprite','deleteIconsOnEventsDataKey','VariableGetSelfVariableID','EventTimerResume','anfeA','Allow','randomInt','MessageCore','getSelfTarget','left','Step1EventId','savePreservedMorphEventDataKey','icmkV','zOUME','Game_CharacterBase_screenX','PNcBe','down','ITEM','processMoveRouteJumpTo','EnableTurnInPlace','width','frameCount','startCallEvent','uGpcA','ISLaS','mirror\x20horizontal','setupEventsMoveCoreCommentTags','IconBlendMode','LmvMX','rYEAf','isRegionDockable','trim','refresh','meetsCPC','startMapCommonEventOnOKTarget','setPose','isCollidedWithEvents','lineHeight','JCswK','checkNeedForPeriodicRefresh','Game_Event_locate','Game_Follower_chaseCharacter','processMoveRouteJumpForward','_visibleEventY','%1:%2','requestRefresh','PlayerIconDelete','list','MrTHR','checkActivationProximity','create','Airship','_MapSpawnedEventData','contents','anchor','none','EventAutoMovement','WbQtY','updateEventsMoveCoreTagChanges','IconBufferX','findProperPageIndex','AIfoO','isSelfSwitch','Window_Message_startMessage','Game_Timer_initialize','RegionOk','Game_CharacterBase_setDirection','1GLfWcu','moveTowardCharacter','visible','_callEventMap','switch2Id','processMoveRoutePatternLock','processMoveRouteMoveTo','wuwkV','min','away','qgHVF','backY','contentsOpacity','_spriteset','hasEventIcon','nevEl','Window_NumberInput_start','dashSpeedModifier','Scene_Map_startEncounterEffect','PreSpawnJS','Game_Switches_setValue','switch2Valid','_randomHomeY','isOnLadder','isAllowCharacterTilt','clamp','%1DockRegionOnly','canMove','USER-DEFINED\x204','BufferY','conditions','Scene_Load_onLoadSuccess','isMapPassable','posNt','_visibleEventX','selfValue','LIGHT\x20BULB','yzPnU','_dragonbones','NlAiv','createCharacterShadow','setEventIconDataKey','bitmap','_randomMoveWeight','Game_Troop_meetsConditionsCPC','parameters','smfNQ','prepareSpawnedEventAtRegion','loadSystem','isAnyEventStarting','CPCsMet','followers','Visibility','lItKX','setPlayerDiagonalSetting','setCharacterBitmap','_data','isDashing','characterIndex','Game_CharacterBase_direction','boxWidth','yeUJj','VS8','Game_System_initialize','Game_Message_setNumberInput','TargetSwitchId','createShadow','Game_Message_setItemChoice','custom','hPuCf','Label','JENJR','Game_Map_refresh','SelfSwitchID','tkYEZ','XiPTA','eLwFk','meetsConditions','Zngza','CPC','_expireCommonEvent','SpawnEventDespawnTerrainTags','ADDITIVE','characterName','processMoveRouteTeleportToCharacter','_lastMovedDirection','Forbid','SukfG','_seconds','XGjbw','lneyz','setAllowEventAutoMovement','SPIN\x20COUNTERCLOCKWISE','LOWER\x20RIGHT','updateEventIconSprite','Game_CharacterBase_hasStepAnime','qKXId','_needsPeriodicRefresh','adjustDir8MovementSpeed','Game_Event_updateParallel','_cacheSystemVisible','Game_SelfSwitches_setValue','radius','_spawnedEvents','format','reverseDir','mWnTZ','return\x200','roundY','checkEventTriggerAuto','add','rvFNS','createSpawnedEventWithData','morphIntoTemplate','isStopFollowerChasing','roundYWithDirection','Game_Map_update','parallelCommonEvents','apply','HURT','Game_Map_setupEvents','AllForbid','yXbmN','_event','fontSize','Game_Timer_start','moveTowardPoint','Game_CharacterBase_updatePattern','match','_working','EventTimerExpireEvent','_forceCarrying','Game_Timer_onExpire','WxCOh','isPlayerControlDisabled','Game_CharacterBase_isDashing','Game_Event_start','_advancedSwitchVariable','processMoveRouteMoveToCharacter','Setting','MnUXR','dlgGW','_cacheVisibility','4382LpkRZr','FxKKg','setSelfValue','StrictCollision','isMoving','map','VisuMZ_Setup_Preload_Map','EUmpN','visibleRange','_waitMode','forceDashing','setEventIconData','command108','Sprite_Character_characterPatternY','defaultFontSize','Game_Event_findProperPageIndex','Sprite_Character_initMembers','processMoveSynchMimic','EventsMoveCore','innerWidth','HMPH','Game_Map_events','YjNGZ','DashModifier','restoreSavedEventPosition','btXUB','OpacitySpeed','isAdvancedSwitch','createShadows','isAllowEventAutoMovement','Step2EventId','MUSIC','kPEFn','COBWEB','despawnTerrainTags','some','_erased','opacitySpeed','MapID','variableValid','remove','IconSet','RegionTouch','checkSmartEventCollision','isSmartEventCollisionOn','updateWaitMode','initEventsMoveCoreEffects','Game_Event_isCollidedWithPlayerCharacters','Value','setDashingEnabled','_EventIcons','version','Seconds','SpawnEventDespawnRegions','Game_Interpreter_character','Game_Player_isMapPassable','bufferY','SXyTH','setTileBitmap','setupCopyEvent','initFollowerController','toLowerCase','clearEventCache','isOnRope','mKuJn','zvXzr','dlyWD','nHVui','max','cHPGg','Window_EventItem_onCancel','kyLyb','posEventsMoveCore','setupPageSettings','_saveEventLocation','activationProximityType','eventsXy','setPlayerControlDisable','processMoveRouteFadeOut','requestBalloon','_addedHitbox','updatePose','_eventScreenY','289582ZuvkTB','Game_CharacterBase_pattern','hCZMo','XaGxT','Game_Variables_setValue','setDiagonalDirection','isPosing','checkExistingEntitiesAt','LFRky','ahMuN','SwitchGetSelfSwitchID','%1Dock','qKxlo','characterPatternYVS8','pause','bufferX','initialize','isBusy','lastMovedDirection','_scene','textSizeEx','VeNGJ','updatePatternEventsMoveCore','khUql','processMoveRouteStepToPlayer','_text','startMessage','_periodicRefreshTimer','SPIN\x20ANTICLOCKWISE','_trigger','RvmSt','deleteIconsOnEventsData','SpawnEventAtTerrainTag','executeMove','dLPTm','moveTypeRandom','mirror\x20vertical','processMoveSynchApproach','destinationY','Game_Map_setup','moveSynchTarget','Game_CharacterBase_canPass','_selfEvent','setValue','EKYPc','setupSpawnedEvents','canPassDiagonally','setControlledFollowerID','direction','characterIndexVS8','Zzgic','AirshipSpeed','Game_Variables_value','igcSG','hasDragonbones','_followerControlID','_paused','zoBTF','distance','_poseDuration','VbLwJ','_alwaysUpdateMove','meetsSwitchCondition','_mapId','lTNev','updateRoutineMove','AutoBalloon','clearSelfTarget','EventIconDelete','forceMoveRoute','_eventIconSprite','PreloadedMaps','checkValidEventerMap','getEventIconIndex','DPJQN','offsetX','_visiblePlayerX','PlayerMovementChange','dPGWe','clearPose','terrainTag','_inputTime','pos','bUiXf','setupChild','Name','Operation','QNenC','UPPER\x20LEFT','_pattern','_eventPageIndex','ypzhp','QFnuk','pJFZl','VRqdf','44aGGoDL','CommonEventID'];const _0x1d5a8d=_0x2a48;(function(_0x2abde0,_0x48e0ef){const _0x547cd9=_0x2a48;while(!![]){try{const _0x52e66b=-parseInt(_0x547cd9(0x383))*parseInt(_0x547cd9(0x212))+parseInt(_0x547cd9(0xf3))+parseInt(_0x547cd9(0x126))+parseInt(_0x547cd9(0x526))+parseInt(_0x547cd9(0x412))*-parseInt(_0x547cd9(0x4c4))+-parseInt(_0x547cd9(0x465))+-parseInt(_0x547cd9(0x544))*-parseInt(_0x547cd9(0x1e7));if(_0x52e66b===_0x48e0ef)break;else _0x2abde0['push'](_0x2abde0['shift']());}catch(_0x4cc620){_0x2abde0['push'](_0x2abde0['shift']());}}}(_0x139b,0x2b130));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1d5a8d(0xaa)](function(_0x17bc30){const _0x210163=_0x1d5a8d;return _0x17bc30[_0x210163(0x240)]&&_0x17bc30[_0x210163(0x124)][_0x210163(0x26d)]('['+label+']');})[0x0];VisuMZ[label][_0x1d5a8d(0x1d2)]=VisuMZ[label][_0x1d5a8d(0x1d2)]||{},VisuMZ[_0x1d5a8d(0x29a)]=function(_0x50866a,_0x4d2103){const _0x583e10=_0x1d5a8d;for(const _0x5959c6 in _0x4d2103){if(_0x583e10(0x3cf)===_0x583e10(0x3cf)){if(_0x5959c6[_0x583e10(0x403)](/(.*):(.*)/i)){if(_0x583e10(0x510)!=='opuOd'){const _0x503226=String(RegExp['$1']),_0x234be1=String(RegExp['$2'])[_0x583e10(0xcf)]()[_0x583e10(0x35f)]();let _0x23aba6,_0x4d969a,_0x7ebb6f;switch(_0x234be1){case'NUM':_0x23aba6=_0x4d2103[_0x5959c6]!==''?Number(_0x4d2103[_0x5959c6]):0x0;break;case _0x583e10(0x115):_0x4d969a=_0x4d2103[_0x5959c6]!==''?JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6]):[],_0x23aba6=_0x4d969a[_0x583e10(0x417)](_0x3f820e=>Number(_0x3f820e));break;case'EVAL':_0x23aba6=_0x4d2103[_0x5959c6]!==''?eval(_0x4d2103[_0x5959c6]):null;break;case _0x583e10(0x197):_0x4d969a=_0x4d2103[_0x5959c6]!==''?JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6]):[],_0x23aba6=_0x4d969a[_0x583e10(0x417)](_0x408eed=>eval(_0x408eed));break;case'JSON':_0x23aba6=_0x4d2103[_0x5959c6]!==''?JSON['parse'](_0x4d2103[_0x5959c6]):'';break;case'ARRAYJSON':_0x4d969a=_0x4d2103[_0x5959c6]!==''?JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6]):[],_0x23aba6=_0x4d969a['map'](_0x334422=>JSON[_0x583e10(0x324)](_0x334422));break;case _0x583e10(0x19d):_0x23aba6=_0x4d2103[_0x5959c6]!==''?new Function(JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6])):new Function(_0x583e10(0x3ee));break;case _0x583e10(0x1e3):_0x4d969a=_0x4d2103[_0x5959c6]!==''?JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6]):[],_0x23aba6=_0x4d969a['map'](_0x5eb4e7=>new Function(JSON[_0x583e10(0x324)](_0x5eb4e7)));break;case _0x583e10(0x140):_0x23aba6=_0x4d2103[_0x5959c6]!==''?String(_0x4d2103[_0x5959c6]):'';break;case _0x583e10(0x4de):_0x4d969a=_0x4d2103[_0x5959c6]!==''?JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6]):[],_0x23aba6=_0x4d969a['map'](_0x575708=>String(_0x575708));break;case'STRUCT':_0x7ebb6f=_0x4d2103[_0x5959c6]!==''?JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6]):{},_0x50866a[_0x503226]={},VisuMZ[_0x583e10(0x29a)](_0x50866a[_0x503226],_0x7ebb6f);continue;case _0x583e10(0x2bc):_0x4d969a=_0x4d2103[_0x5959c6]!==''?JSON[_0x583e10(0x324)](_0x4d2103[_0x5959c6]):[],_0x23aba6=_0x4d969a[_0x583e10(0x417)](_0x55d493=>VisuMZ[_0x583e10(0x29a)]({},JSON[_0x583e10(0x324)](_0x55d493)));break;default:continue;}_0x50866a[_0x503226]=_0x23aba6;}else{function _0x109aad(){const _0x40100b=_0x583e10;_0x3ba653[_0x40100b(0x424)][_0x40100b(0x524)]['loadCPC'](_0x117522);}}}}else{function _0x35219e(){const _0x98e448=_0x583e10;this[_0x98e448(0x1f1)](_0x98e448(0x1e4));}}}return _0x50866a;},(_0x5a9e7d=>{const _0x10d164=_0x1d5a8d,_0x454ad7=_0x5a9e7d[_0x10d164(0x323)];for(const _0x1930a7 of dependencies){if(_0x10d164(0x321)!==_0x10d164(0x321)){function _0xefc587(){const _0x45c330=_0x10d164;_0x416468=this[_0x45c330(0x30c)]-_0x565339,this[_0x45c330(0x153)](_0x4e56a4[_0x45c330(0x39c)](0x0,0xff));if(this[_0x45c330(0x30c)]>0x0)this[_0x45c330(0x4e9)]--;}}else{if(!Imported[_0x1930a7]){alert(_0x10d164(0x21b)[_0x10d164(0x3eb)](_0x454ad7,_0x1930a7)),SceneManager[_0x10d164(0x54b)]();break;}}}const _0x1dd219=_0x5a9e7d[_0x10d164(0x124)];if(_0x1dd219['match'](/\[Version[ ](.*?)\]/i)){if(_0x10d164(0x25f)!=='HTwMw'){const _0x429387=Number(RegExp['$1']);_0x429387!==VisuMZ[label]['version']&&(alert(_0x10d164(0x550)[_0x10d164(0x3eb)](_0x454ad7,_0x429387)),SceneManager[_0x10d164(0x54b)]());}else{function _0x222616(){const _0x2c2965=_0x10d164;if(_0x483e00[_0x2c2965(0x498)])this[_0x2c2965(0x22e)](_0x2d66a5['AirshipSpeed']);}}}if(_0x1dd219[_0x10d164(0x403)](/\[Tier[ ](\d+)\]/i)){if(_0x10d164(0x9d)!==_0x10d164(0x9d)){function _0x2f21b5(){const _0x35de0d=_0x10d164;this[_0x35de0d(0x100)]=!![];}}else{const _0x1205f1=Number(RegExp['$1']);_0x1205f1<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x454ad7,_0x1205f1,tier)),SceneManager['exit']()):tier=Math['max'](_0x1205f1,tier);}}VisuMZ[_0x10d164(0x29a)](VisuMZ[label][_0x10d164(0x1d2)],_0x5a9e7d[_0x10d164(0x3b0)]);})(pluginData),VisuMZ[_0x1d5a8d(0x301)]=function(_0x3e6343,_0x232496,_0x3212d7){switch(_0x3212d7){case'=':return _0x232496;break;case'+':return _0x3e6343+_0x232496;break;case'-':return _0x3e6343-_0x232496;break;case'*':return _0x3e6343*_0x232496;break;case'/':return _0x3e6343/_0x232496;break;case'%':return _0x3e6343%_0x232496;break;}return _0x3e6343;},PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0xfa),_0xc0b874=>{const _0x55307b=_0x1d5a8d;VisuMZ[_0x55307b(0x29a)](_0xc0b874,_0xc0b874);switch(_0xc0b874['Value']){case _0x55307b(0x345):$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0x55307b(0xfb):$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x55307b(0xe6):$gameSystem[_0x55307b(0x3de)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x1e4),_0x53f124=>{const _0x437aca=_0x1d5a8d;VisuMZ[_0x437aca(0x29a)](_0x53f124,_0x53f124);const _0x3cf953=$gameTemp[_0x437aca(0x30b)](),_0x40dc22={'mapId':_0x53f124['MapId'],'eventId':_0x53f124[_0x437aca(0x295)]||_0x3cf953[_0x437aca(0x32d)](),'pageId':_0x53f124[_0x437aca(0x525)]};if(_0x40dc22[_0x437aca(0x25c)]<=0x0)_0x40dc22['mapId']=$gameMap?$gameMap[_0x437aca(0x25c)]():0x1;$gameTemp[_0x437aca(0x30b)]()[_0x437aca(0x206)](_0x40dc22);}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x188),_0x1671f4=>{const _0x3270ac=_0x1d5a8d;VisuMZ[_0x3270ac(0x29a)](_0x1671f4,_0x1671f4);switch(_0x1671f4[_0x3270ac(0x442)]){case _0x3270ac(0x26b):$gameSystem['setDashingEnabled'](!![]);break;case _0x3270ac(0x15a):$gameSystem[_0x3270ac(0x443)](![]);break;case _0x3270ac(0xe6):$gameSystem[_0x3270ac(0x443)](!$gameSystem[_0x3270ac(0x122)]());break;}}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x297),_0x315fd1=>{const _0x53db7d=_0x1d5a8d;VisuMZ[_0x53db7d(0x29a)](_0x315fd1,_0x315fd1);const _0x1dc16f=$gameTemp[_0x53db7d(0x30b)]();_0x315fd1[_0x53db7d(0x1be)]=_0x315fd1['MapId']||$gameMap[_0x53db7d(0x25c)](),$gameSystem[_0x53db7d(0x3ac)](_0x315fd1[_0x53db7d(0x1be)],_0x315fd1[_0x53db7d(0x295)]||_0x1dc16f[_0x53db7d(0x32d)](),_0x315fd1[_0x53db7d(0x23e)],_0x315fd1[_0x53db7d(0x37b)],_0x315fd1[_0x53db7d(0x25a)],_0x315fd1[_0x53db7d(0x35b)]);}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x4a9),_0x34e92a=>{const _0x152919=_0x1d5a8d;VisuMZ[_0x152919(0x29a)](_0x34e92a,_0x34e92a);const _0x149949=$gameTemp[_0x152919(0x30b)]();_0x34e92a[_0x152919(0x1be)]=_0x34e92a[_0x152919(0x1be)]||$gameMap[_0x152919(0x25c)](),$gameSystem[_0x152919(0x341)](_0x34e92a[_0x152919(0x1be)],_0x34e92a[_0x152919(0x295)]||_0x149949[_0x152919(0x32d)]());}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x2ef),_0x582d19=>{const _0x3b8654=_0x1d5a8d;if($gameMap){if(_0x3b8654(0x31c)===_0x3b8654(0x31c))for(const _0x1311a6 of $gameMap[_0x3b8654(0x280)]()){_0x1311a6['refresh']();}else{function _0x417fab(){const _0xf93c31=_0x3b8654;_0x4213fc[_0xf93c31(0x424)][_0xf93c31(0x397)]['call'](this,_0x3d2d97,_0x5be235);}}}}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x2a9),_0xf555da=>{const _0xa26ffe=_0x1d5a8d;VisuMZ['ConvertParams'](_0xf555da,_0xf555da);switch(_0xf555da[_0xa26ffe(0x3b7)]){case'Visible':$gameSystem['setEventLabelsVisible'](!![]);break;case _0xa26ffe(0x50f):$gameSystem[_0xa26ffe(0xd4)](![]);break;case _0xa26ffe(0xe6):$gameSystem[_0xa26ffe(0xd4)](!$gameSystem[_0xa26ffe(0x18e)]());break;}}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x1b5),_0x2c7a90=>{const _0x44aa19=_0x1d5a8d;VisuMZ[_0x44aa19(0x29a)](_0x2c7a90,_0x2c7a90);const _0x2805be=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x4db4bd=$gameMap[_0x44aa19(0x505)](_0x2c7a90[_0x44aa19(0x295)]||_0x2805be['eventId']());if(_0x4db4bd)_0x4db4bd[_0x44aa19(0x2eb)]();}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x516),_0x43c7a1=>{const _0x170305=_0x1d5a8d;VisuMZ[_0x170305(0x29a)](_0x43c7a1,_0x43c7a1);const _0x30c6da=$gameTemp[_0x170305(0x30b)](),_0x233c23=_0x43c7a1[_0x170305(0x1be)]||$gameMap[_0x170305(0x25c)](),_0x32ee7a=_0x43c7a1[_0x170305(0x295)]||_0x30c6da[_0x170305(0x32d)](),_0x4f7d5e=_0x43c7a1[_0x170305(0x11c)]||0x0,_0x3f781e=_0x43c7a1['PosY']||0x0,_0x5c3226=_0x43c7a1[_0x170305(0x2d4)]||0x2,_0x481470=((_0x43c7a1[_0x170305(0x525)]||0x1)-0x1)[_0x170305(0x39c)](0x0,0x13),_0xbe3e81=_0x43c7a1['MoveRouteIndex']||0x0;$gameSystem[_0x170305(0xa3)](_0x233c23,_0x32ee7a,_0x4f7d5e,_0x3f781e,_0x5c3226,_0x481470,_0xbe3e81);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData['name'],_0x1d5a8d(0x270),_0x4f7f64=>{const _0x4a84b0=_0x1d5a8d;VisuMZ['ConvertParams'](_0x4f7f64,_0x4f7f64);const _0x4f0907=$gameTemp[_0x4a84b0(0x30b)](),_0x3e0db4=_0x4f7f64[_0x4a84b0(0x1be)]||$gameMap[_0x4a84b0(0x25c)](),_0x983770=_0x4f7f64['EventId']||_0x4f0907[_0x4a84b0(0x32d)]();$gameSystem['deleteSavedEventLocationKey'](_0x3e0db4,_0x983770);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData['name'],_0x1d5a8d(0x405),_0xf28bf=>{const _0x2eb1a7=_0x1d5a8d;VisuMZ[_0x2eb1a7(0x29a)](_0xf28bf,_0xf28bf);const _0x25e512=_0xf28bf[_0x2eb1a7(0x4c5)];$gameTimer['setCommonEvent'](_0x25e512);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData['name'],'EventTimerExpireClear',_0x475558=>{const _0x3731e1=_0x1d5a8d;$gameTimer[_0x3731e1(0x2e0)](0x0);}),PluginManager['registerCommand'](pluginData['name'],_0x1d5a8d(0xac),_0x163b39=>{const _0x16c772=_0x1d5a8d;if(!$gameTimer[_0x16c772(0x178)]())return;VisuMZ['ConvertParams'](_0x163b39,_0x163b39);let _0x51a1cf=0x0;_0x51a1cf+=_0x163b39[_0x16c772(0x28f)],_0x51a1cf+=_0x163b39['Seconds']*0x3c,_0x51a1cf+=_0x163b39[_0x16c772(0x1c5)]*0x3c*0x3c,_0x51a1cf+=_0x163b39[_0x16c772(0x296)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x51a1cf);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],'EventTimerFramesSet',_0x535080=>{const _0x2779e8=_0x1d5a8d;if(!$gameTimer[_0x2779e8(0x178)]())return;VisuMZ[_0x2779e8(0x29a)](_0x535080,_0x535080);let _0x50ddcb=0x0;_0x50ddcb+=_0x535080[_0x2779e8(0x28f)],_0x50ddcb+=_0x535080[_0x2779e8(0x446)]*0x3c,_0x50ddcb+=_0x535080[_0x2779e8(0x1c5)]*0x3c*0x3c,_0x50ddcb+=_0x535080[_0x2779e8(0x296)]*0x3c*0x3c*0x3c,$gameTimer[_0x2779e8(0x218)](_0x50ddcb);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x2ae),_0xbcdbf8=>{const _0x2d45f9=_0x1d5a8d;if(!$gameTimer['isWorking']())return;$gameTimer[_0x2d45f9(0x473)]();}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x343),_0x18d4ae=>{const _0x4fedf7=_0x1d5a8d;if(!$gameTimer['isWorking']())return;$gameTimer[_0x4fedf7(0x155)]();}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x2e3),_0x1b7c73=>{const _0x5d2e15=_0x1d5a8d;VisuMZ[_0x5d2e15(0x29a)](_0x1b7c73,_0x1b7c73);const _0x18628e=_0x1b7c73['Speed']||0x0;$gameTimer[_0x5d2e15(0x2c2)](_0x18628e);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x1c0),_0x32be49=>{const _0x381531=_0x1d5a8d;VisuMZ['ConvertParams'](_0x32be49,_0x32be49);const _0x3d2ad8=!_0x32be49[_0x381531(0x24b)];$gameSystem[_0x381531(0x54e)](_0x3d2ad8);}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],'FollowerSetTargetChase',_0x2243d1=>{const _0x1e6234=_0x1d5a8d;VisuMZ[_0x1e6234(0x29a)](_0x2243d1,_0x2243d1);const _0x1e744f=(_0x2243d1['FollowerID']||0x0)-0x1,_0x422444=!_0x2243d1[_0x1e6234(0x24b)],_0xf90465=$gamePlayer['followers']()['follower'](_0x1e744f);if(_0xf90465)_0xf90465[_0x1e6234(0x25b)](_0x422444);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x547),_0x2a697d=>{const _0x3375e8=_0x1d5a8d;VisuMZ[_0x3375e8(0x29a)](_0x2a697d,_0x2a697d);const _0x59dccc=_0x2a697d['FollowerID'];$gameSystem['setControlledFollowerID'](_0x59dccc);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x119),_0x40b966=>{const _0xffa820=_0x1d5a8d;VisuMZ[_0xffa820(0x29a)](_0x40b966,_0x40b966),$gameSystem[_0xffa820(0x494)](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x145dab of $gamePlayer['followers']()[_0xffa820(0x3bb)]){if(_0xffa820(0x23b)!=='rMqek'){function _0x1090d3(){const _0x3228fc=_0xffa820,_0x12b152=this[_0x3228fc(0x4c7)][_0x3228fc(0x25c)],_0x56561a=this[_0x3228fc(0x4c7)][_0x3228fc(0x32d)];return _0x5c3554[_0x3228fc(0x4ac)][_0x12b152][_0x3228fc(0x280)][_0x56561a];}}else{if(_0x145dab)_0x145dab[_0xffa820(0x25b)](![]);}}}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],'SwitchGetSelfSwitchABCD',_0x5e1dae=>{const _0x47984b=_0x1d5a8d;VisuMZ['ConvertParams'](_0x5e1dae,_0x5e1dae);const _0x3cb08c=$gameTemp[_0x47984b(0x30b)]();_0x5e1dae['MapId']=_0x5e1dae[_0x47984b(0x1be)]||$gameMap[_0x47984b(0x25c)]();const _0x49a247=[_0x5e1dae[_0x47984b(0x1be)],_0x5e1dae['EventId']||_0x3cb08c[_0x47984b(0x32d)](),_0x5e1dae[_0x47984b(0x1a5)]],_0x59ceaf=_0x5e1dae['TargetSwitchId'],_0x4ee073=$gameSelfSwitches[_0x47984b(0x4d8)](_0x49a247)||![];$gameSwitches['setValue'](_0x59ceaf,_0x4ee073);}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x46f),_0x1aa867=>{const _0x281079=_0x1d5a8d;VisuMZ[_0x281079(0x29a)](_0x1aa867,_0x1aa867);const _0x4cb8a7=$gameTemp[_0x281079(0x30b)]();_0x1aa867[_0x281079(0x1be)]=_0x1aa867[_0x281079(0x1be)]||$gameMap[_0x281079(0x25c)]();const _0x44f7c3=[_0x1aa867[_0x281079(0x1be)],_0x1aa867['EventId']||_0x4cb8a7['eventId'](),'Self\x20Switch\x20%1'[_0x281079(0x3eb)](_0x1aa867[_0x281079(0xdd)])],_0x428297=_0x1aa867[_0x281079(0x3c4)],_0x4ae3b8=$gameSelfSwitches[_0x281079(0x4d8)](_0x44f7c3)||![];$gameSwitches['setValue'](_0x428297,_0x4ae3b8);}),PluginManager['registerCommand'](pluginData['name'],_0x1d5a8d(0x342),_0x5b9de7=>{const _0x26a62b=_0x1d5a8d;VisuMZ['ConvertParams'](_0x5b9de7,_0x5b9de7);const _0x1f76bb=$gameTemp[_0x26a62b(0x30b)]();_0x5b9de7['MapId']=_0x5b9de7['MapId']||$gameMap[_0x26a62b(0x25c)]();const _0x16a142=[_0x5b9de7[_0x26a62b(0x1be)],_0x5b9de7['EventId']||_0x1f76bb['eventId'](),_0x26a62b(0x22b)[_0x26a62b(0x3eb)](_0x5b9de7[_0x26a62b(0x224)])],_0x32e91c=_0x5b9de7[_0x26a62b(0x515)],_0x594c4e=$gameSelfSwitches[_0x26a62b(0x4d8)](_0x16a142)||![];$gameVariables['setValue'](_0x32e91c,_0x594c4e);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x19f),_0x1089e1=>{const _0x41dedd=_0x1d5a8d;VisuMZ['ConvertParams'](_0x1089e1,_0x1089e1);if(!$gameMap)return;const _0x367868=$gameTemp[_0x41dedd(0x30b)](),_0x136e6c=_0x1089e1[_0x41dedd(0xee)];_0x1089e1[_0x41dedd(0x1cc)]=_0x1089e1[_0x41dedd(0x1cc)]||$gameMap[_0x41dedd(0x25c)](),_0x1089e1['Step2MapId']=_0x1089e1['Step2MapId']||$gameMap[_0x41dedd(0x25c)](),_0x1089e1[_0x41dedd(0x292)]=_0x1089e1[_0x41dedd(0x292)][_0x41dedd(0xcf)]()[_0x41dedd(0x35f)]();if(!_0x136e6c&&_0x1089e1[_0x41dedd(0x1cc)]!==$gameMap[_0x41dedd(0x25c)]())return;if($gameMap[_0x41dedd(0x25c)]()===_0x1089e1[_0x41dedd(0x1cc)]){const _0x4406ce=$gameMap[_0x41dedd(0x505)](_0x1089e1['Step1EventId']||_0x367868[_0x41dedd(0x32d)]());if(!_0x4406ce)return;if(_0x1089e1[_0x41dedd(0x292)]!==_0x41dedd(0x2e4)){if(_0x41dedd(0x555)!=='hFcon'){function _0x458f1a(){const _0x4f123a=_0x41dedd;_0x45a941=[-_0x48a382[_0x4f123a(0xce)],0x0,_0x516d47[_0x4f123a(0xce)]][this[_0x4f123a(0xd0)][_0x4f123a(0x313)]()];}}else _0x4406ce['morphIntoTemplate'](_0x1089e1[_0x41dedd(0x292)]);}else{if('SzZFV'===_0x41dedd(0x32e)){function _0x882efb(){const _0x2b26e1=_0x41dedd;return this[_0x2b26e1(0x47d)](_0x308218);}}else _0x4406ce['morphInto'](_0x1089e1[_0x41dedd(0x4e5)],_0x1089e1[_0x41dedd(0x430)]||_0x367868[_0x41dedd(0x32d)]());}}_0x136e6c&&$gameSystem[_0x41dedd(0x34b)](_0x1089e1[_0x41dedd(0x1cc)],_0x1089e1['Step1EventId'],_0x1089e1[_0x41dedd(0x292)],_0x1089e1['Step2MapId'],_0x1089e1['Step2EventId']);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],'MorphEventRemove',_0x3e7cda=>{const _0x85ea11=_0x1d5a8d;VisuMZ[_0x85ea11(0x29a)](_0x3e7cda,_0x3e7cda);if(!$gameMap)return;const _0x2efbc1=$gameTemp[_0x85ea11(0x30b)]();_0x3e7cda[_0x85ea11(0x1be)]=_0x3e7cda[_0x85ea11(0x1be)]||$gameMap[_0x85ea11(0x25c)]();if($gameMap['mapId']()===_0x3e7cda['MapId']){const _0x4d23e6=$gameMap['event'](_0x3e7cda['EventId']||_0x2efbc1[_0x85ea11(0x32d)]());_0x4d23e6[_0x85ea11(0x1f6)]();}if(_0x3e7cda[_0x85ea11(0x20b)]){if('KQUCw'!==_0x85ea11(0x15c)){function _0x1589c4(){const _0x4baab9=_0x85ea11;return!!this[_0x4baab9(0x4d7)];}}else $gameSystem['deletePreservedMorphEventDataKey'](_0x3e7cda[_0x85ea11(0x1be)],_0x3e7cda['EventId']||_0x2efbc1[_0x85ea11(0x32d)]());}}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x4b2),_0x31d0d8=>{const _0x44b3a1=_0x1d5a8d;VisuMZ[_0x44b3a1(0x29a)](_0x31d0d8,_0x31d0d8),$gameSystem[_0x44b3a1(0x45f)](!_0x31d0d8[_0x44b3a1(0x26b)]);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData['name'],_0x1d5a8d(0xfc),_0x4b10e1=>{const _0x3ed6f8=_0x1d5a8d;VisuMZ[_0x3ed6f8(0x29a)](_0x4b10e1,_0x4b10e1),$gameSystem[_0x3ed6f8(0x3b9)](_0x4b10e1[_0x3ed6f8(0x40e)]);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x1f7),_0x222c84=>{const _0x3d5c84=_0x1d5a8d;VisuMZ['ConvertParams'](_0x222c84,_0x222c84),$gameSystem[_0x3d5c84(0x41d)]($gamePlayer,_0x222c84[_0x3d5c84(0x23e)],_0x222c84[_0x3d5c84(0x37b)],_0x222c84[_0x3d5c84(0x25a)],_0x222c84['IconBlendMode']);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x36e),_0x258b0b=>{const _0x2c21b3=_0x1d5a8d;VisuMZ[_0x2c21b3(0x29a)](_0x258b0b,_0x258b0b),$gameSystem[_0x2c21b3(0x484)]($gamePlayer);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData['name'],'SelfSwitchABCD',_0x4ce750=>{const _0x4a393d=_0x1d5a8d;VisuMZ['ConvertParams'](_0x4ce750,_0x4ce750);const _0x45e8ed=$gameTemp[_0x4a393d(0x30b)]();_0x4ce750[_0x4a393d(0x1be)]=_0x4ce750[_0x4a393d(0x1be)]||$gameMap[_0x4a393d(0x25c)]();const _0x505ca5=[_0x4ce750[_0x4a393d(0x1be)],_0x4ce750['EventId']||_0x45e8ed['eventId'](),_0x4ce750[_0x4a393d(0x1a5)]];switch(_0x4ce750[_0x4a393d(0x442)]){case'ON':$gameSelfSwitches[_0x4a393d(0x490)](_0x505ca5,!![]);break;case _0x4a393d(0xb0):$gameSelfSwitches[_0x4a393d(0x490)](_0x505ca5,![]);break;case'Toggle':$gameSelfSwitches[_0x4a393d(0x490)](_0x505ca5,!$gameSelfSwitches[_0x4a393d(0x4d8)](_0x505ca5));break;}}),PluginManager['registerCommand'](pluginData['name'],_0x1d5a8d(0x3cc),_0x1e4e29=>{const _0x5278b1=_0x1d5a8d;VisuMZ[_0x5278b1(0x29a)](_0x1e4e29,_0x1e4e29);const _0x2f4eb7=$gameTemp[_0x5278b1(0x30b)]();_0x1e4e29[_0x5278b1(0x1be)]=_0x1e4e29[_0x5278b1(0x1be)]||$gameMap[_0x5278b1(0x25c)]();const _0x15e9fd=[_0x1e4e29[_0x5278b1(0x1be)],_0x1e4e29[_0x5278b1(0x295)]||_0x2f4eb7[_0x5278b1(0x32d)](),_0x5278b1(0x23d)['format'](_0x1e4e29[_0x5278b1(0xdd)])];switch(_0x1e4e29[_0x5278b1(0x442)]){case'ON':$gameSelfSwitches['setValue'](_0x15e9fd,!![]);break;case _0x5278b1(0xb0):$gameSelfSwitches[_0x5278b1(0x490)](_0x15e9fd,![]);break;case _0x5278b1(0xe6):$gameSelfSwitches[_0x5278b1(0x490)](_0x15e9fd,!$gameSelfSwitches[_0x5278b1(0x4d8)](_0x15e9fd));break;}}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x2f0),_0x44971d=>{const _0x521148=_0x1d5a8d;VisuMZ[_0x521148(0x29a)](_0x44971d,_0x44971d);const _0x5b2098=$gameTemp[_0x521148(0x30b)]();_0x44971d[_0x521148(0x1be)]=_0x44971d[_0x521148(0x1be)]||$gameMap[_0x521148(0x25c)]();const _0x4ba57a=[_0x44971d[_0x521148(0x1be)],_0x44971d[_0x521148(0x295)]||_0x5b2098[_0x521148(0x32d)](),_0x521148(0x22b)[_0x521148(0x3eb)](_0x44971d['VariableId'])],_0x31d409=VisuMZ[_0x521148(0x301)]($gameSelfSwitches[_0x521148(0x4d8)](_0x4ba57a),_0x44971d['Value'],_0x44971d[_0x521148(0x4bb)]);$gameSelfSwitches[_0x521148(0x490)](_0x4ba57a,_0x31d409);}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],'SpawnEventAtXY',_0x1dc448=>{const _0x2de79b=_0x1d5a8d;VisuMZ[_0x2de79b(0x29a)](_0x1dc448,_0x1dc448);const _0x5bd03c=$gameTemp[_0x2de79b(0x30b)](),_0x498d08={'template':_0x1dc448[_0x2de79b(0x292)],'mapId':_0x1dc448[_0x2de79b(0x1be)]||$gameMap[_0x2de79b(0x25c)](),'eventId':_0x1dc448[_0x2de79b(0x295)]||_0x5bd03c['eventId'](),'x':_0x1dc448['PosX'],'y':_0x1dc448[_0x2de79b(0x103)],'spawnPreserved':_0x1dc448[_0x2de79b(0xbf)],'spawnEventId':$gameMap['_spawnedEvents'][_0x2de79b(0xd6)]+0x3e8},_0xc3673f=_0x1dc448['SuccessSwitchId']||0x0,_0x478799=$gameMap[_0x2de79b(0x14a)](_0x498d08,_0x1dc448['Collision'],_0x1dc448['Passability']);_0xc3673f&&$gameSwitches[_0x2de79b(0x490)](_0xc3673f,!!_0x478799);}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x116),_0x3a6bcf=>{const _0x4dae41=_0x1d5a8d;VisuMZ['ConvertParams'](_0x3a6bcf,_0x3a6bcf);const _0x114526=$gameTemp[_0x4dae41(0x30b)](),_0x4a1ed7={'template':_0x3a6bcf['TemplateName'],'mapId':_0x3a6bcf[_0x4dae41(0x1be)]||$gameMap[_0x4dae41(0x25c)](),'eventId':_0x3a6bcf[_0x4dae41(0x295)]||_0x114526[_0x4dae41(0x32d)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x3a6bcf['Preserve'],'spawnEventId':$gameMap[_0x4dae41(0x3ea)][_0x4dae41(0xd6)]+0x3e8},_0x4c71d9=_0x3a6bcf['SuccessSwitchId']||0x0,_0xbc272d=$gameMap[_0x4dae41(0x3b2)](_0x4a1ed7,_0x3a6bcf[_0x4dae41(0x259)],_0x3a6bcf[_0x4dae41(0x315)],_0x3a6bcf[_0x4dae41(0x17f)]);if(_0x4c71d9){if(_0x4dae41(0x2f1)===_0x4dae41(0x2f1))$gameSwitches[_0x4dae41(0x490)](_0x4c71d9,!!_0xbc272d);else{function _0x547aa8(){const _0x2e82b1=_0x4dae41;_0x5165ac[_0x2e82b1(0x4ac)][_0x45865a]=_0x540aef[_0x3cd114],_0x194102[_0xba90cd]=_0x3d8ad2;}}}}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x485),_0x1eed10=>{const _0x181d48=_0x1d5a8d;VisuMZ[_0x181d48(0x29a)](_0x1eed10,_0x1eed10);const _0x33e4e7=$gameTemp[_0x181d48(0x30b)](),_0x19a6e6={'template':_0x1eed10[_0x181d48(0x292)],'mapId':_0x1eed10['MapId']||$gameMap[_0x181d48(0x25c)](),'eventId':_0x1eed10[_0x181d48(0x295)]||_0x33e4e7[_0x181d48(0x32d)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1eed10[_0x181d48(0xbf)],'spawnEventId':$gameMap[_0x181d48(0x3ea)]['length']+0x3e8},_0x456afc=_0x1eed10['SuccessSwitchId']||0x0,_0x5d0cc3=$gameMap[_0x181d48(0xb6)](_0x19a6e6,_0x1eed10['TerrainTags'],_0x1eed10[_0x181d48(0x315)],_0x1eed10[_0x181d48(0x17f)]);_0x456afc&&$gameSwitches['setValue'](_0x456afc,!!_0x5d0cc3);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0xab),_0x2dc479=>{const _0x1e51eb=_0x1d5a8d;VisuMZ['ConvertParams'](_0x2dc479,_0x2dc479);const _0x479834=$gameTemp[_0x1e51eb(0x30b)]();$gameMap['despawnEventId'](_0x2dc479['EventID']||_0x479834['eventId']());}),PluginManager[_0x1d5a8d(0x1a8)](pluginData['name'],_0x1d5a8d(0xcd),_0x337dfa=>{const _0x43b44f=_0x1d5a8d;VisuMZ[_0x43b44f(0x29a)](_0x337dfa,_0x337dfa);const _0x132f03=_0x337dfa[_0x43b44f(0x11c)],_0x59afe8=_0x337dfa[_0x43b44f(0x103)];$gameMap[_0x43b44f(0x2d1)](_0x132f03,_0x59afe8);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x447),_0x1e6fbb=>{const _0x225937=_0x1d5a8d;VisuMZ[_0x225937(0x29a)](_0x1e6fbb,_0x1e6fbb),$gameMap[_0x225937(0x19c)](_0x1e6fbb[_0x225937(0x259)]);}),PluginManager['registerCommand'](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x3d4),_0x220539=>{const _0x294841=_0x1d5a8d;VisuMZ[_0x294841(0x29a)](_0x220539,_0x220539),$gameMap[_0x294841(0x434)](_0x220539[_0x294841(0x163)]);}),PluginManager[_0x1d5a8d(0x1a8)](pluginData[_0x1d5a8d(0x323)],_0x1d5a8d(0x2a8),_0x5cf40a=>{const _0x1987cc=_0x1d5a8d;VisuMZ[_0x1987cc(0x29a)](_0x5cf40a,_0x5cf40a),$gameMap['despawnEverything']();}),VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x2ff)]=Scene_Boot['prototype'][_0x1d5a8d(0x548)],Scene_Boot[_0x1d5a8d(0x1cf)]['onDatabaseLoaded']=function(){const _0x10ae70=_0x1d5a8d;VisuMZ[_0x10ae70(0x424)]['Scene_Boot_onDatabaseLoaded'][_0x10ae70(0x1ee)](this),this[_0x10ae70(0x2a5)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x10ae70(0x424)][_0x10ae70(0x524)])VisuMZ[_0x10ae70(0x424)][_0x10ae70(0x524)][_0x10ae70(0x475)]();},VisuMZ['PreloadedMaps']=[],VisuMZ[_0x1d5a8d(0x4d4)]={},Scene_Boot[_0x1d5a8d(0x1cf)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0xec2f95=_0x1d5a8d;if(DataManager['isBattleTest']()||DataManager[_0xec2f95(0x1b4)]())return;const _0x1729e5=VisuMZ[_0xec2f95(0x424)][_0xec2f95(0x1d2)][_0xec2f95(0x157)],_0x22faa0=_0x1729e5[_0xec2f95(0x1a7)][_0xec2f95(0xbe)](0x0);for(const _0x50ba9e of _0x1729e5[_0xec2f95(0x166)]){_0x50ba9e[_0xec2f95(0x4ba)]=_0x50ba9e[_0xec2f95(0x4ba)][_0xec2f95(0xcf)]()[_0xec2f95(0x35f)](),VisuMZ['EventTemplates'][_0x50ba9e[_0xec2f95(0x4ba)]]=_0x50ba9e;if(!_0x22faa0[_0xec2f95(0x26d)](_0x50ba9e['MapID']))_0x22faa0['push'](_0x50ba9e[_0xec2f95(0x438)]);}for(const _0x343e65 of _0x22faa0){if(VisuMZ[_0xec2f95(0x4ac)][_0x343e65])continue;const _0x515143='Map%1.json'[_0xec2f95(0x3eb)](_0x343e65['padZero'](0x3)),_0x25ec55=_0xec2f95(0x165)['format'](_0x343e65);DataManager[_0xec2f95(0x4cc)](_0x25ec55,_0x515143),setTimeout(this[_0xec2f95(0x418)][_0xec2f95(0x156)](this,_0x343e65,_0x25ec55),0x64);}},Scene_Boot['prototype'][_0x1d5a8d(0x418)]=function(_0x5b1b38,_0x1ebfac){const _0x2e9c3c=_0x1d5a8d;if(window[_0x1ebfac])VisuMZ['PreloadedMaps'][_0x5b1b38]=window[_0x1ebfac],window[_0x1ebfac]=undefined;else{if('qDDcw'!=='qDDcw'){function _0x1a9784(){const _0x571568=_0x2a48;_0x19aa99[_0x571568(0x424)][_0x571568(0x511)]['call'](this,_0x476ace);}}else setTimeout(this[_0x2e9c3c(0x418)][_0x2e9c3c(0x156)](this,_0x5b1b38,_0x1ebfac),0x64);}},VisuMZ[_0x1d5a8d(0xf1)]=[],VisuMZ['SelfSwitches']=[],VisuMZ[_0x1d5a8d(0x1e0)]=[],VisuMZ[_0x1d5a8d(0x339)]=[],Scene_Boot[_0x1d5a8d(0x1cf)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0xefe383=_0x1d5a8d;for(let _0xbd4c1e=0x1;_0xbd4c1e<$dataSystem[_0xefe383(0x150)][_0xefe383(0xd6)];_0xbd4c1e++){if($dataSystem['switches'][_0xbd4c1e]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0xefe383(0xf1)]['push'](_0xbd4c1e);if($dataSystem[_0xefe383(0x150)][_0xbd4c1e][_0xefe383(0x403)](/<SELF>/i))VisuMZ[_0xefe383(0x253)][_0xefe383(0x2a1)](_0xbd4c1e);}for(let _0x351706=0x1;_0x351706<$dataSystem['variables'][_0xefe383(0xd6)];_0x351706++){if(_0xefe383(0x46e)===_0xefe383(0x12a)){function _0x1885d2(){const _0xb8358e=_0xefe383;if(_0xa58d47['isSaveEventLocations']())return!![];return this[_0xb8358e(0x45c)];}}else{if($dataSystem[_0xefe383(0x2e5)][_0x351706][_0xefe383(0x403)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0xefe383(0x1e0)]['push'](_0x351706);if($dataSystem[_0xefe383(0x2e5)][_0x351706][_0xefe383(0x403)](/<SELF>/i))VisuMZ[_0xefe383(0x339)][_0xefe383(0x2a1)](_0x351706);}}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x524)]={},VisuMZ[_0x1d5a8d(0x424)]['CustomPageConditions'][_0x1d5a8d(0x475)]=function(){this['_interpreter']=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x524)][_0x1d5a8d(0x2f2)]=function(){const _0x55b0f7=_0x1d5a8d;this['_commonEvents']=[];for(const _0x16cc8b of $dataCommonEvents){if(!_0x16cc8b)continue;VisuMZ[_0x55b0f7(0x424)][_0x55b0f7(0x524)][_0x55b0f7(0x507)](_0x16cc8b);if(_0x16cc8b['CPC'][_0x55b0f7(0xd6)]>0x0)this[_0x55b0f7(0x28c)][_0x55b0f7(0x2a1)](_0x16cc8b['id']);}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x524)]['metCPC']=function(_0x3cf4a3,_0x1cc248){const _0x26fb59=_0x1d5a8d;return this[_0x26fb59(0xf5)][_0x26fb59(0x2f9)](_0x3cf4a3,_0x1cc248),this[_0x26fb59(0xf5)][_0x26fb59(0xa2)](),this['_interpreter'][_0x26fb59(0x100)];},VisuMZ[_0x1d5a8d(0x424)]['CustomPageConditions']['loadCPC']=function(_0x493c49){const _0x201b8b=_0x1d5a8d;let _0x276f24=![];_0x493c49[_0x201b8b(0x3d2)]=[];for(const _0x55a460 of _0x493c49[_0x201b8b(0x36f)]){if([0x6c,0x198][_0x201b8b(0x26d)](_0x55a460[_0x201b8b(0x1f3)])){const _0x11f118=_0x55a460[_0x201b8b(0x3b0)][0x0];if(_0x11f118[_0x201b8b(0x403)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x276f24=!![];else _0x11f118[_0x201b8b(0x403)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x276f24=![]);}_0x276f24&&_0x493c49[_0x201b8b(0x3d2)][_0x201b8b(0x2a1)](_0x55a460);}},getSelfSwitchValue=function(_0x414dd5,_0x2e59c1,_0x54d22d){const _0x2ee904=_0x1d5a8d;let _0x162154=[_0x414dd5,_0x2e59c1,_0x2ee904(0x23d)['format'](_0x54d22d)];if(typeof _0x54d22d===_0x2ee904(0x50c)){if(_0x2ee904(0x311)===_0x2ee904(0x3ce)){function _0x2a905a(){const _0x19a0d4=_0x2ee904;_0x1ed9df[_0x19a0d4(0x2a1)](0x1,0x3,0x7,0x9);}}else _0x162154=[_0x414dd5,_0x2e59c1,_0x54d22d[_0x2ee904(0xcf)]()[_0x2ee904(0x35f)]()];}return $gameSelfSwitches[_0x2ee904(0x4d8)](_0x162154);},getSelfVariableValue=function(_0x11bce7,_0x7b41ba,_0x235816){const _0x4f44d0=_0x1d5a8d,_0x1e2b88=[_0x11bce7,_0x7b41ba,_0x4f44d0(0x22b)['format'](_0x235816)];return $gameSelfSwitches[_0x4f44d0(0x4d8)](_0x1e2b88);},setSelfSwitchValue=function(_0xa9838b,_0x55c88f,_0x161151,_0x84c495){const _0x3c1885=_0x1d5a8d;let _0x265009=[_0xa9838b,_0x55c88f,_0x3c1885(0x23d)[_0x3c1885(0x3eb)](_0x161151)];if(typeof _0x161151===_0x3c1885(0x50c)){if('yuijl'==='Ypgjq'){function _0x3070dc(){const _0x3d297c=_0x3c1885;this[_0x3d297c(0x414)](_0x5128f9,_0x54c9a8);}}else _0x265009=[_0xa9838b,_0x55c88f,_0x161151['toUpperCase']()[_0x3c1885(0x35f)]()];}},setSelfVariableValue=function(_0x16ee62,_0x754208,_0xcc0ea3,_0x3c5aaf){const _0x4444cd=_0x1d5a8d,_0x570f2f=[_0x16ee62,_0x754208,_0x4444cd(0x22b)[_0x4444cd(0x3eb)](_0xcc0ea3)];},DataManager['isAdvancedSwitch']=function(_0x5bb272){const _0x2022b7=_0x1d5a8d;if(SceneManager[_0x2022b7(0x478)][_0x2022b7(0x214)]===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0x2022b7(0x26d)](_0x5bb272);},DataManager['isAdvancedVariable']=function(_0x111b08){const _0x50752b=_0x1d5a8d;if(SceneManager[_0x50752b(0x478)][_0x50752b(0x214)]===Scene_Debug)return![];return VisuMZ[_0x50752b(0x1e0)][_0x50752b(0x26d)](_0x111b08);},DataManager[_0x1d5a8d(0x37e)]=function(_0x55e954){const _0x2866df=_0x1d5a8d;if(SceneManager[_0x2866df(0x478)][_0x2866df(0x214)]===Scene_Debug)return![];return VisuMZ[_0x2866df(0x253)][_0x2866df(0x26d)](_0x55e954);},DataManager[_0x1d5a8d(0x196)]=function(_0x317e07){const _0x19607f=_0x1d5a8d;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0x19607f(0x26d)](_0x317e07);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x2a4)]=Game_Temp['prototype'][_0x1d5a8d(0x18f)],Game_Temp[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x18f)]=function(_0x50103a,_0x12472e){const _0x2bc8cc=_0x1d5a8d;if(this[_0x2bc8cc(0x528)](_0x50103a,_0x12472e))return;VisuMZ[_0x2bc8cc(0x424)][_0x2bc8cc(0x2a4)]['call'](this,_0x50103a,_0x12472e);},Game_Temp[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x528)]=function(_0x2ed941,_0x3e31c9){const _0x29ff4a=_0x1d5a8d,_0x1c7d4=$gameMap[_0x29ff4a(0x45e)](_0x2ed941,_0x3e31c9);for(const _0x50e9e0 of _0x1c7d4){if('CXxNW'!==_0x29ff4a(0x502)){if(_0x50e9e0&&_0x50e9e0['hasClickTrigger']())return _0x50e9e0['onClickTrigger'](),!![];}else{function _0x42bcf6(){const _0x58ad2d=_0x29ff4a;if(this['_chaseOff'])return;if(_0x3f7a9b[_0x58ad2d(0x3f5)]())return;_0x1face4['EventsMoveCore']['Game_Follower_chaseCharacter'][_0x58ad2d(0x1ee)](this,_0x240482);}}}return![];},Game_Temp[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2c8)]=function(_0x456769){this['_lastPluginCommandInterpreter']=_0x456769;},Game_Temp[_0x1d5a8d(0x1cf)]['getLastPluginCommandInterpreter']=function(){const _0x5e9982=_0x1d5a8d;return this[_0x5e9982(0x1c6)];},Game_Temp['prototype'][_0x1d5a8d(0x2b9)]=function(_0x2b6ddd){const _0x354417=_0x1d5a8d;this[_0x354417(0x249)]=_0x2b6ddd;},Game_Temp['prototype']['clearSelfTarget']=function(){const _0x2e2af2=_0x1d5a8d;this[_0x2e2af2(0x249)]=undefined;},Game_Temp[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x348)]=function(){const _0x348e5f=_0x1d5a8d;return this[_0x348e5f(0x249)];},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3c2)]=Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x475)],Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x475)]=function(){const _0x23ab1f=_0x1d5a8d;VisuMZ['EventsMoveCore'][_0x23ab1f(0x3c2)]['call'](this),this[_0x23ab1f(0x185)](),this[_0x23ab1f(0x44e)]();},Game_System[_0x1d5a8d(0x1cf)]['initEventsMoveCore']=function(){const _0x30b84e=_0x1d5a8d;this[_0x30b84e(0x1e2)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this['_MapSpawnedEventData']=[],this[_0x30b84e(0x30f)]={},this[_0x30b84e(0x4cf)]={},this[_0x30b84e(0x10b)]=![],this['_PlayerDiagonalSetting']='default';},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x122)]=function(){const _0xe7f4d5=_0x1d5a8d;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0xe7f4d5(0x1e2)][_0xe7f4d5(0x286)]===undefined)this[_0xe7f4d5(0x185)]();return this[_0xe7f4d5(0x1e2)][_0xe7f4d5(0x286)];},Game_System[_0x1d5a8d(0x1cf)]['setDashingEnabled']=function(_0x1d2dc8){const _0x467a45=_0x1d5a8d;if(this[_0x467a45(0x1e2)]===undefined)this[_0x467a45(0x185)]();if(this[_0x467a45(0x1e2)][_0x467a45(0x286)]===undefined)this[_0x467a45(0x185)]();this[_0x467a45(0x1e2)][_0x467a45(0x286)]=_0x1d2dc8;},Game_System[_0x1d5a8d(0x1cf)]['isAllowEventAutoMovement']=function(){const _0xb30173=_0x1d5a8d;if(this['_EventsMoveCoreSettings']===undefined)this[_0xb30173(0x185)]();if(this[_0xb30173(0x1e2)]['EventAutoMovement']===undefined)this[_0xb30173(0x185)]();return this['_EventsMoveCoreSettings'][_0xb30173(0x378)];},Game_System['prototype'][_0x1d5a8d(0x3de)]=function(_0xdf53bb){const _0x37282d=_0x1d5a8d;if(this[_0x37282d(0x1e2)]===undefined)this[_0x37282d(0x185)]();if(this[_0x37282d(0x1e2)]['EventAutoMovement']===undefined)this['initEventsMoveCore']();this[_0x37282d(0x1e2)][_0x37282d(0x378)]=_0xdf53bb;},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x18e)]=function(){const _0x392db5=_0x1d5a8d;if(this['_EventsMoveCoreSettings']===undefined)this[_0x392db5(0x185)]();if(this[_0x392db5(0x1e2)][_0x392db5(0x1f4)]===undefined)this[_0x392db5(0x185)]();return this[_0x392db5(0x1e2)][_0x392db5(0x1f4)];},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xd4)]=function(_0x46a4eb){const _0x2b3154=_0x1d5a8d;if(this[_0x2b3154(0x1e2)]===undefined)this[_0x2b3154(0x185)]();if(this[_0x2b3154(0x1e2)][_0x2b3154(0x1f4)]===undefined)this[_0x2b3154(0x185)]();this['_EventsMoveCoreSettings'][_0x2b3154(0x1f4)]=_0x46a4eb;},Game_System['prototype'][_0x1d5a8d(0x409)]=function(){const _0x507f24=_0x1d5a8d;if(this[_0x507f24(0x10b)]===undefined){if(_0x507f24(0x46d)===_0x507f24(0x46d))this['_DisablePlayerControl']=![];else{function _0x3cd931(){const _0x291169=_0x507f24,_0x483e5d=this[_0x291169(0x136)]+_0x24b283(_0xb3d884['$1']);return this[_0x291169(0x16f)](_0x483e5d);}}}return this[_0x507f24(0x10b)];},Game_System[_0x1d5a8d(0x1cf)]['setPlayerControlDisable']=function(_0x2a4412){const _0x1d4278=_0x1d5a8d;this[_0x1d4278(0x10b)]=_0x2a4412;},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xc3)]=function(){const _0xce6f6b=_0x1d5a8d;return this[_0xce6f6b(0x180)];},Game_System['prototype']['setPlayerDiagonalSetting']=function(_0x22ef9d){const _0x158ace=_0x1d5a8d;this[_0x158ace(0x180)]=String(_0x22ef9d)[_0x158ace(0x44f)]()['trim']();},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4e3)]=function(_0x371df5){const _0x17ee3c=_0x1d5a8d;if(this[_0x17ee3c(0x444)]===undefined)this[_0x17ee3c(0x185)]();if(!_0x371df5)return null;if(_0x371df5===$gamePlayer){if(_0x17ee3c(0x27d)!==_0x17ee3c(0x27d)){function _0x2ee5c5(){const _0x182e85=_0x17ee3c;if(_0x5ced72[_0x182e85(0x15f)](_0x39ed60,_0x22ddf6,_0x34ad46,this[_0x182e85(0x531)]))return!![];if(_0x3c3fd7[_0x182e85(0x30e)](_0x896de2,_0x6a4226,_0x4ccc77,this[_0x182e85(0x531)]))return![];return _0x24b98a['EventsMoveCore'][_0x182e85(0x289)]['call'](this,_0x7ec2b3,_0x3298a1,_0x5f69c7);}}else return this[_0x17ee3c(0x444)][_0x17ee3c(0x17b)];}else{const _0x2d5c24=VisuMZ[_0x17ee3c(0x424)][_0x17ee3c(0x1d2)],_0x1f0bdf=_0x17ee3c(0x139)[_0x17ee3c(0x3eb)](_0x371df5[_0x17ee3c(0x4a4)],_0x371df5[_0x17ee3c(0x1fb)]);return this[_0x17ee3c(0x444)][_0x1f0bdf]=this[_0x17ee3c(0x444)][_0x1f0bdf]||{'iconIndex':0x0,'bufferX':_0x2d5c24[_0x17ee3c(0x170)][_0x17ee3c(0xe9)],'bufferY':_0x2d5c24[_0x17ee3c(0x170)][_0x17ee3c(0x3a0)],'blendMode':_0x2d5c24[_0x17ee3c(0x170)][_0x17ee3c(0x33a)]},this['_EventIcons'][_0x1f0bdf];}},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x41d)]=function(_0xa3e7f3,_0x5c4560,_0x1a0fcf,_0x158750,_0x22932e){const _0x26a25d=_0x1d5a8d;if(this[_0x26a25d(0x444)]===undefined)this[_0x26a25d(0x185)]();const _0x356d55=_0xa3e7f3===$gamePlayer?_0x26a25d(0x17b):'Map%1-Event%2'[_0x26a25d(0x3eb)](_0xa3e7f3[_0x26a25d(0x4a4)],_0xa3e7f3[_0x26a25d(0x1fb)]);this[_0x26a25d(0x444)][_0x356d55]={'iconIndex':_0x5c4560,'bufferX':_0x1a0fcf,'bufferY':_0x158750,'blendMode':_0x22932e};},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3ac)]=function(_0x5ee288,_0x41b9aa,_0x305723,_0x511991,_0x3ba5c7,_0x30be63){const _0x3567d5=_0x1d5a8d;if(this[_0x3567d5(0x444)]===undefined)this[_0x3567d5(0x185)]();const _0x3d93dc=_0x3567d5(0x139)[_0x3567d5(0x3eb)](_0x5ee288,_0x41b9aa);this[_0x3567d5(0x444)][_0x3d93dc]={'iconIndex':_0x305723,'bufferX':_0x511991,'bufferY':_0x3ba5c7,'blendMode':_0x30be63};},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x484)]=function(_0x1c29ab){const _0x3e1d7e=_0x1d5a8d;if(this[_0x3e1d7e(0x444)]===undefined)this['initEventsMoveCore']();if(!_0x1c29ab)return null;_0x1c29ab===$gamePlayer?delete this[_0x3e1d7e(0x444)][_0x3e1d7e(0x17b)]:this[_0x3e1d7e(0x341)](_0x1c29ab[_0x3e1d7e(0x4a4)],_0x1c29ab[_0x3e1d7e(0x1fb)]);},Game_System['prototype']['deleteIconsOnEventsDataKey']=function(_0x168194,_0x8c7c36){const _0x33866a=_0x1d5a8d;if(this['_EventIcons']===undefined)this[_0x33866a(0x185)]();const _0x52591e=_0x33866a(0x139)[_0x33866a(0x3eb)](_0x168194,_0x8c7c36);delete this['_EventIcons'][_0x52591e];},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x167)]=function(_0x50bd0e){const _0x25e3eb=_0x1d5a8d;if(this[_0x25e3eb(0x4cf)]===undefined)this[_0x25e3eb(0x185)]();if(!_0x50bd0e)return null;const _0x5bb902=_0x25e3eb(0x139)[_0x25e3eb(0x3eb)](_0x50bd0e[_0x25e3eb(0x4a4)],_0x50bd0e[_0x25e3eb(0x1fb)]);return this[_0x25e3eb(0x4cf)][_0x5bb902];},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2eb)]=function(_0x3a18f0){const _0x12f519=_0x1d5a8d;if(this[_0x12f519(0x4cf)]===undefined)this[_0x12f519(0x185)]();if(!_0x3a18f0)return;const _0x40bfdf=_0x12f519(0x139)[_0x12f519(0x3eb)](_0x3a18f0[_0x12f519(0x4a4)],_0x3a18f0[_0x12f519(0x1fb)]);this[_0x12f519(0x4cf)][_0x40bfdf]={'direction':_0x3a18f0['direction'](),'x':Math['round'](_0x3a18f0['x']),'y':Math[_0x12f519(0x4ff)](_0x3a18f0['y']),'pageIndex':_0x3a18f0[_0x12f519(0x527)],'moveRouteIndex':_0x3a18f0['_moveRouteIndex']};},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x21d)]=function(_0x23cf90){const _0x323f81=_0x1d5a8d;if(this[_0x323f81(0x4cf)]===undefined)this['initEventsMoveCore']();if(!_0x23cf90)return;this['deleteSavedEventLocationKey'](_0x23cf90[_0x323f81(0x4a4)],_0x23cf90[_0x323f81(0x1fb)]);},Game_System['prototype'][_0x1d5a8d(0x11e)]=function(_0x34ec8d,_0x5bfd66){const _0x500d91=_0x1d5a8d;if(this[_0x500d91(0x4cf)]===undefined)this[_0x500d91(0x185)]();const _0x5b3f80=_0x500d91(0x139)[_0x500d91(0x3eb)](_0x34ec8d,_0x5bfd66);delete this['_SavedEventLocations'][_0x5b3f80];},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa3)]=function(_0x267fe6,_0x4f93b6,_0x3bc976,_0x196035,_0x17291e,_0x25a0f3,_0x52c1af){const _0x5e43e2=_0x1d5a8d;if(this[_0x5e43e2(0x4cf)]===undefined)this[_0x5e43e2(0x185)]();const _0x4e7d0c=_0x5e43e2(0x139)[_0x5e43e2(0x3eb)](_0x267fe6,_0x4f93b6);this[_0x5e43e2(0x4cf)][_0x4e7d0c]={'direction':_0x17291e,'x':Math['round'](_0x3bc976),'y':Math[_0x5e43e2(0x4ff)](_0x196035),'pageIndex':_0x25a0f3,'moveRouteIndex':_0x52c1af};},Game_System['prototype'][_0x1d5a8d(0x230)]=function(_0x25ca2a){const _0x52711c=_0x1d5a8d;if(this['_PreservedEventMorphData']===undefined)this[_0x52711c(0x185)]();if(!_0x25ca2a)return;const _0x4f19e8='Map%1-Event%2'['format'](_0x25ca2a['_mapId'],_0x25ca2a[_0x52711c(0x1fb)]);return this[_0x52711c(0x30f)][_0x4f19e8];},Game_System[_0x1d5a8d(0x1cf)]['savePreservedMorphEventDataKey']=function(_0x451112,_0x3d17ee,_0x34befc,_0x94246d,_0x483cbe){const _0x1ba6f4=_0x1d5a8d;if(this['_PreservedEventMorphData']===undefined)this[_0x1ba6f4(0x185)]();const _0xc75781=_0x1ba6f4(0x139)[_0x1ba6f4(0x3eb)](_0x451112,_0x3d17ee);this[_0x1ba6f4(0x30f)][_0xc75781]={'template':_0x34befc,'mapId':_0x94246d,'eventId':_0x483cbe};},Game_System['prototype'][_0x1d5a8d(0x329)]=function(_0x295db8,_0x18d24e){const _0x26371b=_0x1d5a8d;if(this[_0x26371b(0x30f)]===undefined)this[_0x26371b(0x185)]();const _0x509ab1=_0x26371b(0x139)[_0x26371b(0x3eb)](_0x295db8,_0x18d24e);delete this[_0x26371b(0x30f)][_0x509ab1];},Game_System[_0x1d5a8d(0x1cf)]['getMapSpawnedEventData']=function(_0x52a519){const _0x5083c2=_0x1d5a8d;if(this[_0x5083c2(0x374)]===undefined)this[_0x5083c2(0x185)]();return this[_0x5083c2(0x374)][_0x52a519]=this[_0x5083c2(0x374)][_0x52a519]||[],this[_0x5083c2(0x374)][_0x52a519];},Game_System[_0x1d5a8d(0x1cf)]['removeTemporaryMapSpawnedEvents']=function(_0x4359f6){const _0x5a5a34=_0x1d5a8d,_0x56f922=this[_0x5a5a34(0x211)](_0x4359f6);for(const _0x9296a4 of _0x56f922){if(_0x5a5a34(0x4c1)!==_0x5a5a34(0x4c1)){function _0x13b54b(){return _0x2d9bb9>0x0?0x2:0x8;}}else{if(!_0x9296a4)continue;if(_0x9296a4[_0x5a5a34(0x17e)])continue;const _0x5573a3=_0x56f922[_0x5a5a34(0x1b9)](_0x9296a4);_0x56f922[_0x5573a3]=null;}}},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x44e)]=function(){const _0x4146c7=_0x1d5a8d;this[_0x4146c7(0x49c)]=0x0,this[_0x4146c7(0x33f)]=![];},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x509)]=function(){const _0x36b524=_0x1d5a8d;if(this['_followerControlID']===undefined)this[_0x36b524(0x44e)]();return this[_0x36b524(0x49c)];},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x494)]=function(_0x188821){const _0x5a8644=_0x1d5a8d;if(this[_0x5a8644(0x49c)]===undefined)this[_0x5a8644(0x44e)]();this['_followerControlID']=_0x188821;;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x448)]=Game_Interpreter[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa4)],Game_Interpreter[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa4)]=function(_0x4d2531){const _0x143f3c=_0x1d5a8d;if(!$gameParty['inBattle']()&&_0x4d2531<0x0){let _0x18a236=$gameSystem[_0x143f3c(0x509)]();if(_0x18a236>0x0)return $gamePlayer[_0x143f3c(0x3b6)]()['follower'](_0x18a236-0x1);}return VisuMZ[_0x143f3c(0x424)][_0x143f3c(0x448)][_0x143f3c(0x1ee)](this,_0x4d2531);},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f5)]=function(){const _0x2f1dbe=_0x1d5a8d;if(this[_0x2f1dbe(0x33f)]===undefined)this[_0x2f1dbe(0x44e)]();return this['_followerChaseOff'];},Game_System[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x54e)]=function(_0x407957){const _0x328ae0=_0x1d5a8d;if(this[_0x328ae0(0x33f)]===undefined)this[_0x328ae0(0x44e)]();this[_0x328ae0(0x33f)]=_0x407957;;},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x380)]=Game_Timer[_0x1d5a8d(0x1cf)]['initialize'],Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x475)]=function(){const _0x1d16d9=_0x1d5a8d;VisuMZ[_0x1d16d9(0x424)][_0x1d16d9(0x380)][_0x1d16d9(0x1ee)](this),this['initEventsMoveCore']();},Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x185)]=function(){const _0x48cda8=_0x1d5a8d;this[_0x48cda8(0x49d)]=![],this[_0x48cda8(0x541)]=-0x1,this[_0x48cda8(0x3d3)]=0x0;},Game_Timer[_0x1d5a8d(0x1cf)]['update']=function(_0x41c42a){const _0x3375de=_0x1d5a8d;if(!_0x41c42a)return;if(!this[_0x3375de(0x404)])return;if(this['_paused'])return;if(this['_frames']<=0x0)return;if(this[_0x3375de(0x541)]===undefined)this['initEventsMoveCore']();this[_0x3375de(0x51d)]+=this[_0x3375de(0x541)],this[_0x3375de(0x51d)]<=0x0&&this[_0x3375de(0x132)]();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x400)]=Game_Timer[_0x1d5a8d(0x1cf)]['start'],Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x519)]=function(_0x588428){const _0x180123=_0x1d5a8d;VisuMZ[_0x180123(0x424)][_0x180123(0x400)][_0x180123(0x1ee)](this,_0x588428);if(this[_0x180123(0x49d)]===undefined)this[_0x180123(0x185)]();this[_0x180123(0x49d)]=![];},VisuMZ['EventsMoveCore']['Game_Timer_stop']=Game_Timer[_0x1d5a8d(0x1cf)]['stop'],Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2ed)]=function(){const _0x1a01f3=_0x1d5a8d;VisuMZ[_0x1a01f3(0x424)][_0x1a01f3(0x546)]['call'](this);if(this[_0x1a01f3(0x49d)]===undefined)this[_0x1a01f3(0x185)]();this[_0x1a01f3(0x49d)]=![];},Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x473)]=function(){const _0x570b63=_0x1d5a8d;if(this[_0x570b63(0x51d)]<=0x0)return;this[_0x570b63(0x49d)]=!![],this[_0x570b63(0x404)]=!![];},Game_Timer['prototype'][_0x1d5a8d(0x155)]=function(){const _0x2930ca=_0x1d5a8d;if(this[_0x2930ca(0x51d)]<=0x0)return;this[_0x2930ca(0x49d)]=![],this[_0x2930ca(0x404)]=!![];},Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x245)]=function(_0x1423e9){const _0xeaa3f4=_0x1d5a8d;this[_0xeaa3f4(0x51d)]=this['_frames']||0x0,this[_0xeaa3f4(0x51d)]+=_0x1423e9,this['_working']=!![],this['_frames']=Math[_0xeaa3f4(0x456)](0x1,this['_frames']);},Game_Timer[_0x1d5a8d(0x1cf)]['setFrames']=function(_0x8f6a61){const _0x34dd43=_0x1d5a8d;this[_0x34dd43(0x51d)]=this[_0x34dd43(0x51d)]||0x0,this[_0x34dd43(0x51d)]=_0x8f6a61,this[_0x34dd43(0x404)]=!![],this['_frames']=Math[_0x34dd43(0x456)](0x1,this['_frames']);},Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2c2)]=function(_0x31eecb){const _0x2ea719=_0x1d5a8d;this['_speed']=_0x31eecb,this[_0x2ea719(0x404)]=!![],_0x31eecb>0x0&&(this['_frames']=Math[_0x2ea719(0x456)](this[_0x2ea719(0x51d)],0x1));},Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2e0)]=function(_0x4e574e){const _0x16879d=_0x1d5a8d;if(this[_0x16879d(0x3d3)]===undefined)this[_0x16879d(0x185)]();this[_0x16879d(0x3d3)]=_0x4e574e;},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x407)]=Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x132)],Game_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x132)]=function(){const _0x425ef6=_0x1d5a8d;if(this['_expireCommonEvent']===undefined)this[_0x425ef6(0x185)]();this[_0x425ef6(0x3d3)]?$gameTemp[_0x425ef6(0x50a)](this['_expireCommonEvent']):VisuMZ[_0x425ef6(0x424)]['Game_Timer_onExpire'][_0x425ef6(0x1ee)](this);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x26e)]=Game_Message['prototype'][_0x1d5a8d(0x3f1)],Game_Message[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f1)]=function(_0x338b20){const _0x430814=_0x1d5a8d;VisuMZ[_0x430814(0x424)][_0x430814(0x26e)][_0x430814(0x1ee)](this,_0x338b20),this[_0x430814(0x48f)]=$gameTemp[_0x430814(0x348)]();},Game_Message['prototype']['registerSelfEvent']=function(){const _0x1153a7=_0x1d5a8d;$gameTemp[_0x1153a7(0x2b9)](this[_0x1153a7(0x48f)]);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0xe8)]=Game_Switches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4d8)],Game_Switches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4d8)]=function(_0x1859d8){const _0x9e09cf=_0x1d5a8d;if(DataManager[_0x9e09cf(0x42d)](_0x1859d8))return!!this[_0x9e09cf(0x256)](_0x1859d8);else{if(DataManager['isSelfSwitch'](_0x1859d8)){if(_0x9e09cf(0x35d)===_0x9e09cf(0x128)){function _0x4a911d(){const _0x526979=_0x9e09cf;_0x232256[_0x526979(0x29a)](_0x50b8b6,_0x467ec9);const _0x50c3cd=_0x56a0d1[_0x526979(0x30b)]();_0x4f1980[_0x526979(0x1be)]=_0x128e02[_0x526979(0x1be)]||_0x40254c['mapId']();const _0x317c73=[_0x218250['MapId'],_0x3fc351[_0x526979(0x295)]||_0x50c3cd[_0x526979(0x32d)](),_0x526979(0x22b)[_0x526979(0x3eb)](_0x7eed70[_0x526979(0x224)])],_0x2d7c66=_0x16d6ad['TargetVariableId'],_0x14fdcf=_0xf68558[_0x526979(0x4d8)](_0x317c73)||![];_0x398f94[_0x526979(0x490)](_0x2d7c66,_0x14fdcf);}}else return!!this['selfValue'](_0x1859d8);}else{if(_0x9e09cf(0x4c3)===_0x9e09cf(0x2b8)){function _0x2f21eb(){return!![];}}else return VisuMZ[_0x9e09cf(0x424)][_0x9e09cf(0xe8)][_0x9e09cf(0x1ee)](this,_0x1859d8);}}},Game_Switches['advancedFunc']={},Game_Switches[_0x1d5a8d(0x1cf)]['advancedValue']=function(_0x91be9e){const _0x46b7c8=_0x1d5a8d;if(!Game_Switches['advancedFunc'][_0x91be9e]){if('qxBvH'!==_0x46b7c8(0x198)){function _0x6d4378(){const _0xbf8c0b=_0x46b7c8,_0x2fc541=_0x55aed4(_0x57332a['$1']);_0x2fc541!==_0x5eb4e2[_0x135f78][_0xbf8c0b(0x445)]&&(_0x603beb(_0xbf8c0b(0x550)[_0xbf8c0b(0x3eb)](_0x2d50fd,_0x2fc541)),_0x67bf49[_0xbf8c0b(0x54b)]());}}else{$dataSystem[_0x46b7c8(0x150)][_0x91be9e][_0x46b7c8(0x403)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x34b47b='return\x20%1'[_0x46b7c8(0x3eb)](String(RegExp['$1']));Game_Switches[_0x46b7c8(0x29f)][_0x91be9e]=new Function('switchId',_0x34b47b);}}const _0x367733=$gameTemp['getSelfTarget']()||this;return Game_Switches[_0x46b7c8(0x29f)][_0x91be9e]['call'](_0x367733,_0x91be9e);},Game_Switches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3a6)]=function(_0x4cb941){const _0x1408ca=_0x1d5a8d,_0x3f9381=$gameTemp[_0x1408ca(0x348)]()||this;if(_0x3f9381['constructor']!==Game_Event)return VisuMZ[_0x1408ca(0x424)][_0x1408ca(0xe8)][_0x1408ca(0x1ee)](this,_0x4cb941);else{const _0x1a6993=[_0x3f9381['_mapId'],_0x3f9381[_0x1408ca(0x1fb)],_0x1408ca(0x23d)[_0x1408ca(0x3eb)](_0x4cb941)];return $gameSelfSwitches[_0x1408ca(0x4d8)](_0x1a6993);}},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x397)]=Game_Switches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x490)],Game_Switches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x490)]=function(_0x1d71f1,_0x416750){const _0xc55a99=_0x1d5a8d;if(DataManager[_0xc55a99(0x37e)](_0x1d71f1)){if('ODclR'!==_0xc55a99(0x22d)){function _0x205b15(){const _0x426d45=_0xc55a99;if([0x2,0x4,0x6,0x8]['includes'](_0x1599b1))return 0x4;if([0x1,0x3,0x7,0x9][_0x426d45(0x26d)](_0x4a52ef))return 0x5;}}else this['setSelfValue'](_0x1d71f1,_0x416750);}else VisuMZ['EventsMoveCore']['Game_Switches_setValue'][_0xc55a99(0x1ee)](this,_0x1d71f1,_0x416750);},Game_Switches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x414)]=function(_0x2a74a5,_0x507275){const _0x4e006c=_0x1d5a8d,_0x48cd3c=$gameTemp[_0x4e006c(0x348)]()||this;if(_0x48cd3c[_0x4e006c(0x214)]!==Game_Event)VisuMZ['EventsMoveCore'][_0x4e006c(0x397)]['call'](this,_0x2a74a5,_0x507275);else{const _0x576031=[_0x48cd3c[_0x4e006c(0x4a4)],_0x48cd3c['_eventId'],_0x4e006c(0x23d)[_0x4e006c(0x3eb)](_0x2a74a5)];$gameSelfSwitches['setValue'](_0x576031,_0x507275);}},VisuMZ['EventsMoveCore']['Game_Variables_value']=Game_Variables[_0x1d5a8d(0x1cf)]['value'],Game_Variables[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4d8)]=function(_0x3b3e63){const _0x1628ab=_0x1d5a8d;if(DataManager['isAdvancedVariable'](_0x3b3e63)){if(_0x1628ab(0x144)===_0x1628ab(0x144))return this['advancedValue'](_0x3b3e63);else{function _0x5f53a3(){const _0x1dba2a=_0x1628ab;if(_0x3e4f51)this[_0x1dba2a(0x401)](_0x3252fa['x'],_0x4baafa['y']);}}}else{if(DataManager['isSelfVariable'](_0x3b3e63))return this[_0x1628ab(0x3a6)](_0x3b3e63);else{if(_0x1628ab(0x2be)!==_0x1628ab(0x24f))return VisuMZ[_0x1628ab(0x424)][_0x1628ab(0x499)][_0x1628ab(0x1ee)](this,_0x3b3e63);else{function _0x164f0d(){const _0x49eb65=_0x1628ab,_0x52a8d3=this[_0x49eb65(0x189)](_0x5d6164);return this[_0x49eb65(0x40d)](_0x1993a0,_0x52a8d3);}}}}},Game_Variables[_0x1d5a8d(0x29f)]={},Game_Variables[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x256)]=function(_0x52f4da){const _0x4ed0d0=_0x1d5a8d;if(!Game_Variables[_0x4ed0d0(0x29f)][_0x52f4da]){if('XqbFW'===_0x4ed0d0(0x508)){function _0x547af9(){const _0xd71a04=_0x4ed0d0;if(_0x1082f6[this['_callEventMap']])this[_0xd71a04(0x41b)]='',this[_0xd71a04(0x356)]();else return!![];}}else{$dataSystem['variables'][_0x52f4da][_0x4ed0d0(0x403)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x287fb7='return\x20%1'[_0x4ed0d0(0x3eb)](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x52f4da]=new Function(_0x4ed0d0(0x2aa),_0x287fb7);}}const _0x4289a3=$gameTemp[_0x4ed0d0(0x348)]()||this;return Game_Variables[_0x4ed0d0(0x29f)][_0x52f4da]['call'](_0x4289a3,_0x52f4da);},Game_Variables[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3a6)]=function(_0x28695a){const _0x5b75b7=_0x1d5a8d,_0x425272=$gameTemp['getSelfTarget']()||this;if(_0x425272[_0x5b75b7(0x214)]!==Game_Event)return VisuMZ[_0x5b75b7(0x424)][_0x5b75b7(0x499)][_0x5b75b7(0x1ee)](this,_0x28695a);else{if(_0x5b75b7(0x432)!==_0x5b75b7(0x432)){function _0x380a40(){const _0x3129e7=_0x5b75b7,_0x817d83=this['textSizeEx'](this[_0x3129e7(0x47e)]);this['width']=_0x817d83[_0x3129e7(0x354)]+(_0x5db36f[_0x3129e7(0x327)]()+this[_0x3129e7(0x2e6)]())*0x2,this[_0x3129e7(0x229)]=_0x232930[_0x3129e7(0x456)](this['lineHeight'](),_0x817d83['height'])+_0x2fa4c2[_0x3129e7(0x327)]()*0x2,this[_0x3129e7(0x1c4)]();}}else{const _0x4d0871=[_0x425272[_0x5b75b7(0x4a4)],_0x425272[_0x5b75b7(0x1fb)],'Self\x20Variable\x20%1'['format'](_0x28695a)];return $gameSelfSwitches['value'](_0x4d0871);}}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x469)]=Game_Variables[_0x1d5a8d(0x1cf)]['setValue'],Game_Variables[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x490)]=function(_0x6f3d26,_0x52b4fd){const _0x13e944=_0x1d5a8d;if(DataManager['isSelfVariable'](_0x6f3d26)){if(_0x13e944(0x467)===_0x13e944(0x1d9)){function _0x3d34d2(){return this['processMoveRouteMoveRepeat'](0x1,_0x124e2a(_0x2285d6['$1']));}}else this[_0x13e944(0x414)](_0x6f3d26,_0x52b4fd);}else VisuMZ[_0x13e944(0x424)][_0x13e944(0x469)][_0x13e944(0x1ee)](this,_0x6f3d26,_0x52b4fd);},Game_Variables[_0x1d5a8d(0x1cf)]['setSelfValue']=function(_0xbb8b40,_0x412e71){const _0x11e14e=_0x1d5a8d,_0x9f3f41=$gameTemp[_0x11e14e(0x348)]()||this;if(_0x9f3f41['constructor']!==Game_Event)VisuMZ['EventsMoveCore'][_0x11e14e(0x469)][_0x11e14e(0x1ee)](this,_0xbb8b40,_0x412e71);else{const _0x42f550=[_0x9f3f41[_0x11e14e(0x4a4)],_0x9f3f41[_0x11e14e(0x1fb)],_0x11e14e(0x22b)[_0x11e14e(0x3eb)](_0xbb8b40)];$gameSelfSwitches[_0x11e14e(0x490)](_0x42f550,_0x412e71);}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0xcb)]=Game_SelfSwitches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4d8)],Game_SelfSwitches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4d8)]=function(_0x1c568d){const _0x562828=_0x1d5a8d;if(_0x1c568d[0x2][_0x562828(0x403)](/SELF/i)){if(_0x562828(0x18b)!==_0x562828(0x293))return this['selfValue'](_0x1c568d);else{function _0x5b2445(){const _0x191b65=_0x562828,_0x4a727a=this[_0x191b65(0xe1)](_0x2b5e93,_0xf240ff,![]);if(_0x4a727a)this[_0x191b65(0x53d)](_0x4a727a);}}}else{return VisuMZ[_0x562828(0x424)]['Game_SelfSwitches_value'][_0x562828(0x1ee)](this,_0x1c568d);;}},Game_SelfSwitches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3a6)]=function(_0x14a448){const _0x4e9065=_0x1d5a8d;return _0x14a448[0x2][_0x4e9065(0x403)](/VAR/i)?this[_0x4e9065(0x3bb)][_0x14a448]||0x0:!!this[_0x4e9065(0x3bb)][_0x14a448];},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3e8)]=Game_SelfSwitches['prototype'][_0x1d5a8d(0x490)],Game_SelfSwitches[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x490)]=function(_0x494aba,_0x5a5df0){const _0x554118=_0x1d5a8d;if(_0x494aba[0x2][_0x554118(0x403)](/SELF/i)){if(_0x554118(0x454)!==_0x554118(0x3fd))this[_0x554118(0x414)](_0x494aba,_0x5a5df0);else{function _0x17c4c9(){const _0x156d70=_0x554118;this[_0x156d70(0x2b6)](_0x37d5c2);if(_0x6d3c3f['includes'](0x0)&&this['startMapCommonEventOnOKTarget']()==='standing')this[_0x156d70(0xc5)](this['x'],this['y']);else(_0x4827ed[_0x156d70(0x26d)](0x1)||_0x2e8bd6[_0x156d70(0x26d)](0x2))&&this[_0x156d70(0x2cb)]();}}}else{if(_0x554118(0x42b)==='UpGVu'){function _0x5e9089(){const _0x229815=_0x554118;return _0x22957a[_0x229815(0x10d)];}}else VisuMZ[_0x554118(0x424)][_0x554118(0x3e8)][_0x554118(0x1ee)](this,_0x494aba,_0x5a5df0);}},Game_SelfSwitches[_0x1d5a8d(0x1cf)]['setSelfValue']=function(_0x18641e,_0x30af99){const _0x5e02fd=_0x1d5a8d;this[_0x5e02fd(0x3bb)][_0x18641e]=_0x18641e[0x2]['match'](/VAR/i)?_0x30af99:!!_0x30af99,this['onChange']();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x2bd)]=Game_Enemy[_0x1d5a8d(0x1cf)]['meetsSwitchCondition'],Game_Enemy['prototype'][_0x1d5a8d(0x4a3)]=function(_0x54a25d){const _0x2b394e=_0x1d5a8d;$gameTemp['registerSelfTarget'](this);const _0x1b9c94=VisuMZ['EventsMoveCore'][_0x2b394e(0x2bd)][_0x2b394e(0x1ee)](this,_0x54a25d);return $gameTemp[_0x2b394e(0x4a8)](),_0x1b9c94;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x2df)]=Game_Troop['prototype'][_0x1d5a8d(0x3d0)],Game_Troop[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3d0)]=function(_0x4ccfab){const _0x2abf2a=_0x1d5a8d;$gameTemp[_0x2abf2a(0x2b9)](this);const _0x344087=VisuMZ[_0x2abf2a(0x424)]['Game_Troop_meetsConditions'][_0x2abf2a(0x1ee)](this,_0x4ccfab);return $gameTemp[_0x2abf2a(0x4a8)](),_0x344087;},VisuMZ['EventsMoveCore']['Game_Map_setup']=Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2f9)],Game_Map['prototype'][_0x1d5a8d(0x2f9)]=function(_0x273a5f){const _0x2fbe5d=_0x1d5a8d;this[_0x2fbe5d(0xe3)](_0x273a5f),this['clearEventCache'](),VisuMZ[_0x2fbe5d(0x424)]['Game_Map_setup'][_0x2fbe5d(0x1ee)](this,_0x273a5f),this[_0x2fbe5d(0x450)](),this[_0x2fbe5d(0x105)](),this[_0x2fbe5d(0x4c8)](),this[_0x2fbe5d(0x338)](),this['setupSpawnedEvents'](),this[_0x2fbe5d(0x450)]();},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x3fb)]=Game_Map['prototype'][_0x1d5a8d(0x228)],Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x228)]=function(){const _0x554f82=_0x1d5a8d;VisuMZ[_0x554f82(0x424)][_0x554f82(0x3fb)][_0x554f82(0x1ee)](this),this[_0x554f82(0x4f8)]();},Game_Map[_0x1d5a8d(0x241)]=0xc8,Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x276)]=function(){const _0x5ea9b5=_0x1d5a8d,_0x85340b=Game_Map[_0x5ea9b5(0x241)];this['_eventOverload']=this[_0x5ea9b5(0x280)]()[_0x5ea9b5(0xd6)]>_0x85340b;if(this[_0x5ea9b5(0x4d6)]&&$gameTemp[_0x5ea9b5(0x17d)]()){}},Game_Map[_0x1d5a8d(0x1cf)]['isEventOverloaded']=function(){return this['_eventOverload'];},Game_Map[_0x1d5a8d(0x1cf)]['clearEventCache']=function(){const _0x233010=_0x1d5a8d;this[_0x233010(0xa8)]=undefined;},Game_Map['prototype']['setupDiagonalSupport']=function(){const _0x1582c9=_0x1d5a8d;this[_0x1582c9(0x336)]=VisuMZ['EventsMoveCore'][_0x1582c9(0x1d2)][_0x1582c9(0x12e)][_0x1582c9(0x30d)];const _0x380eff=$dataMap[_0x1582c9(0x4db)]||'';if(_0x380eff[_0x1582c9(0x403)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x1582c9(0x336)]=!![];else _0x380eff[_0x1582c9(0x403)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x22a)]=function(){const _0x966502=_0x1d5a8d,_0x2a5f5d=$gameSystem['getPlayerDiagonalSetting']();if(_0x2a5f5d===_0x966502(0x215))return!![];if(_0x2a5f5d===_0x966502(0x2fa))return![];if(this['_diagonalSupport']===undefined)this[_0x966502(0x105)]();return this['_diagonalSupport'];},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x158)]=function(_0x48ba15,_0x5c99a9){const _0x5e7c44=_0x1d5a8d;if([0x1,0x4,0x7]['includes'](_0x5c99a9))_0x48ba15-=0x1;if([0x3,0x6,0x9][_0x5e7c44(0x26d)](_0x5c99a9))_0x48ba15+=0x1;return this[_0x5e7c44(0x10e)](_0x48ba15);},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f6)]=function(_0x5c32fe,_0x530633){const _0x2d1864=_0x1d5a8d;if([0x1,0x2,0x3]['includes'](_0x530633))_0x5c32fe+=0x1;if([0x7,0x8,0x9][_0x2d1864(0x26d)](_0x530633))_0x5c32fe-=0x1;return this[_0x2d1864(0x3ef)](_0x5c32fe);},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xdb)]=function(_0x281281,_0x4a3685,_0x2bd157,_0xb944a3){const _0x5e1fa2=_0x1d5a8d;return Math[_0x5e1fa2(0x456)](Math[_0x5e1fa2(0x263)](this[_0x5e1fa2(0x2ca)](_0x281281,_0x2bd157)),Math[_0x5e1fa2(0x263)](this['deltaY'](_0x4a3685,_0xb944a3)));},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4c8)]=function(){const _0x199d24=_0x1d5a8d,_0x53aa33=VisuMZ[_0x199d24(0x424)][_0x199d24(0x1d2)][_0x199d24(0x259)],_0x28bdcc={},_0xf01652=[_0x199d24(0x345),_0x199d24(0x3d9),_0x199d24(0xdc)],_0x1e52fd=[_0x199d24(0x557),_0x199d24(0x204),_0x199d24(0x17b),'Event',_0x199d24(0x1eb),_0x199d24(0x310),'Ship',_0x199d24(0x373)];for(const _0x51a5e1 of _0xf01652){for(const _0x38d57b of _0x1e52fd){const _0x1f989d=_0x199d24(0x13b)[_0x199d24(0x3eb)](_0x38d57b,_0x51a5e1);_0x53aa33[_0x1f989d]&&(_0x28bdcc[_0x1f989d]=_0x53aa33[_0x1f989d][_0x199d24(0xbe)](0x0));}}const _0x19add6=$dataMap['note']||'',_0x58ab83=_0x19add6[_0x199d24(0x403)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x58ab83){if('jxHTf'!==_0x199d24(0x53c))for(const _0x5a0ba4 of _0x58ab83){if('SMqop'!==_0x199d24(0x1fa)){function _0x113651(){const _0xc776e2=_0x199d24;_0xc8178b[_0xc776e2(0x20e)](),_0x5abf54[_0xc776e2(0x424)][_0xc776e2(0x37f)][_0xc776e2(0x1ee)](this),_0x13fd07[_0xc776e2(0x4a8)]();}}else{_0x5a0ba4['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x5d8842=String(RegExp['$1'])[_0x199d24(0x44f)]()['trim'](),_0x46a513=String(RegExp['$2'])['toLowerCase']()['trim']();const _0x298139=JSON[_0x199d24(0x324)]('['+RegExp['$3'][_0x199d24(0x403)](/\d+/g)+']');_0x5d8842=_0x5d8842[_0x199d24(0x25d)](0x0)[_0x199d24(0xcf)]()+_0x5d8842[_0x199d24(0xbe)](0x1),_0x46a513=_0x46a513[_0x199d24(0x25d)](0x0)[_0x199d24(0xcf)]()+_0x46a513[_0x199d24(0xbe)](0x1);const _0x4d84bb='%1%2'[_0x199d24(0x3eb)](_0x5d8842,_0x46a513);if(_0x28bdcc[_0x4d84bb])_0x28bdcc[_0x4d84bb]=_0x28bdcc[_0x4d84bb][_0x199d24(0x1aa)](_0x298139);}}else{function _0x32858a(){const _0x310c21=_0x199d24;delete this[_0x310c21(0x444)]['Player'];}}}this[_0x199d24(0x14d)]=_0x28bdcc;},Game_Map['prototype']['isRegionAllowPass']=function(_0x9e5618,_0x29bd2d,_0x42e56f,_0x4b25ec){const _0x143807=_0x1d5a8d,_0x1e04cb=this[_0x143807(0x158)](_0x9e5618,_0x42e56f),_0x3af95b=this[_0x143807(0x3f6)](_0x29bd2d,_0x42e56f),_0x240f99=this[_0x143807(0xf6)](_0x1e04cb,_0x3af95b),_0x220057=this[_0x143807(0x14d)];if(_0x220057['AllAllow'][_0x143807(0x26d)](_0x240f99))return!![];else{if(_0x4b25ec===_0x143807(0x117)){if(_0x143807(0x330)!==_0x143807(0x487))return _0x220057['PlayerAllow'][_0x143807(0x26d)](_0x240f99)||_0x220057[_0x143807(0x9e)][_0x143807(0x26d)](_0x240f99);else{function _0x1df6b8(){const _0x537cc9=_0x143807;_0x23f8cc=this[_0x537cc9(0x1fc)](_0xeb654a,_0x24c729);}}}else{if(_0x4b25ec===_0x143807(0x505))return _0x220057[_0x143807(0x26f)][_0x143807(0x26d)](_0x240f99)||_0x220057[_0x143807(0x9e)][_0x143807(0x26d)](_0x240f99);else{if(_0x220057[_0x143807(0x513)][_0x143807(0x26d)](_0x240f99)){if(_0x143807(0x2c1)!==_0x143807(0x3dc))return!![];else{function _0xa6d23(){const _0x1d9afb=_0x143807;this[_0x1d9afb(0x3e4)]=!![];return;}}}else{const _0xb6d8d4=_0x143807(0x2c5)[_0x143807(0x3eb)](_0x4b25ec[_0x143807(0x25d)](0x0)['toUpperCase']()+_0x4b25ec[_0x143807(0xbe)](0x1));if(_0x220057[_0xb6d8d4])return _0x220057[_0xb6d8d4][_0x143807(0x26d)](_0x240f99);}}}}return![];},Game_Map[_0x1d5a8d(0x1cf)]['isRegionForbidPass']=function(_0xec5044,_0x126a41,_0x88b52c,_0x4cc9c1){const _0x3e173b=_0x1d5a8d,_0x39378c=this[_0x3e173b(0x158)](_0xec5044,_0x88b52c),_0x1e5d88=this[_0x3e173b(0x3f6)](_0x126a41,_0x88b52c),_0x45db2e=this['regionId'](_0x39378c,_0x1e5d88),_0x5307ab=this[_0x3e173b(0x14d)];if(_0x5307ab[_0x3e173b(0x3fc)][_0x3e173b(0x26d)](_0x45db2e)){if(_0x3e173b(0x3e3)!==_0x3e173b(0x3ed))return!![];else{function _0x313d5a(){this['_shadowOpacity']=0xff;}}}else{if(_0x4cc9c1===_0x3e173b(0x117)){if(_0x3e173b(0xc6)===_0x3e173b(0xc6))return _0x5307ab[_0x3e173b(0x294)]['includes'](_0x45db2e)||_0x5307ab['WalkForbid']['includes'](_0x45db2e);else{function _0x322cd8(){const _0x4af261=_0x3e173b;_0x4a32f9[_0x4af261(0x29a)](_0x1c87a4,_0x141c67);const _0x15c3d8=_0x51c681[_0x4af261(0x30b)]();_0x5b6e8b[_0x4af261(0x137)](_0x39e7a5[_0x4af261(0x1d4)]||_0x15c3d8[_0x4af261(0x32d)]());}}}else{if(_0x4cc9c1==='event')return _0x5307ab[_0x3e173b(0x2b2)][_0x3e173b(0x26d)](_0x45db2e)||_0x5307ab[_0x3e173b(0x154)][_0x3e173b(0x26d)](_0x45db2e);else{if(_0x5307ab['VehicleForbid']['includes'](_0x45db2e))return!![];else{if('LpRfU'!==_0x3e173b(0x2cc)){const _0x383532=_0x3e173b(0x13f)['format'](_0x4cc9c1[_0x3e173b(0x25d)](0x0)[_0x3e173b(0xcf)]()+_0x4cc9c1[_0x3e173b(0xbe)](0x1));if(_0x5307ab[_0x383532])return _0x5307ab[_0x383532][_0x3e173b(0x26d)](_0x45db2e);}else{function _0x6d054b(){const _0x474f3d=_0x3e173b;this[_0x474f3d(0x336)]=![];}}}}}}return![];},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x35e)]=function(_0x2c5c1d,_0x53f2e4,_0x3fc9f3,_0x2e892a){const _0x303277=_0x1d5a8d;_0x3fc9f3=_0x2e892a==='airship'?0x5:_0x3fc9f3;const _0x25479a=this[_0x303277(0x158)](_0x2c5c1d,_0x3fc9f3),_0x20fa0c=this[_0x303277(0x3f6)](_0x53f2e4,_0x3fc9f3),_0x1ba574=this['regionId'](_0x25479a,_0x20fa0c),_0x45b51e=this[_0x303277(0x14d)];if(_0x45b51e[_0x303277(0x11f)][_0x303277(0x26d)](_0x1ba574))return!![];else{const _0x58353d=_0x303277(0x470)[_0x303277(0x3eb)](_0x2e892a[_0x303277(0x25d)](0x0)[_0x303277(0xcf)]()+_0x2e892a[_0x303277(0xbe)](0x1));if(_0x45b51e[_0x58353d])return _0x45b51e[_0x58353d]['includes'](_0x1ba574);}return![];},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3cb)]=Game_Map['prototype']['refresh'],Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x360)]=function(){const _0x41714d=_0x1d5a8d;VisuMZ[_0x41714d(0x424)][_0x41714d(0x3cb)][_0x41714d(0x1ee)](this),this[_0x41714d(0x367)]();},Game_Map['prototype'][_0x1d5a8d(0x367)]=function(){const _0x2e5644=_0x1d5a8d;this[_0x2e5644(0x3e4)]=![];if(this[_0x2e5644(0x280)]()[_0x2e5644(0x435)](_0x2727ad=>_0x2727ad[_0x2e5644(0x20f)]())){if('uppWE'==='ZEaxd'){function _0x4ecd8f(){const _0x4ec1f3=_0x2e5644;_0x4c7e52[_0x4ec1f3(0x29a)](_0x3f6f41,_0x3e700e);const _0x552b6f=_0x51d678['getLastPluginCommandInterpreter'](),_0x4a8ef7={'mapId':_0x590c79[_0x4ec1f3(0x1be)],'eventId':_0x493e0e[_0x4ec1f3(0x295)]||_0x552b6f[_0x4ec1f3(0x32d)](),'pageId':_0x16b2be[_0x4ec1f3(0x525)]};if(_0x4a8ef7[_0x4ec1f3(0x25c)]<=0x0)_0x4a8ef7[_0x4ec1f3(0x25c)]=_0x3271bb?_0x515d94['mapId']():0x1;_0x26fe1a['getLastPluginCommandInterpreter']()['pluginCommandCallEvent'](_0x4a8ef7);}}else{this[_0x2e5644(0x3e4)]=!![];return;}}if(this[_0x2e5644(0x280)]()[_0x2e5644(0x435)](_0x3ec05b=>_0x3ec05b['hasCPCs']())){this[_0x2e5644(0x3e4)]=!![];return;}if(this[_0x2e5644(0x28c)][_0x2e5644(0x435)](_0x2b81f9=>_0x2b81f9['hasAdvancedSwitchVariable']())){this[_0x2e5644(0x3e4)]=!![];return;}if(this[_0x2e5644(0x28c)]['some'](_0x4c896d=>_0x4c896d[_0x2e5644(0x2ec)]())){this[_0x2e5644(0x3e4)]=!![];return;}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3f7)]=Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xe4)],Game_Map[_0x1d5a8d(0x1cf)]['update']=function(_0x9b7340){const _0x21618a=_0x1d5a8d;this['updatePeriodicRefresh'](),VisuMZ[_0x21618a(0x424)][_0x21618a(0x3f7)]['call'](this,_0x9b7340);},Game_Map['prototype'][_0x1d5a8d(0x251)]=function(){const _0x2c8f2a=_0x1d5a8d;if(!this[_0x2c8f2a(0x3e4)])return;this[_0x2c8f2a(0x480)]=this['_periodicRefreshTimer']||0x3c,this[_0x2c8f2a(0x480)]--;if(this[_0x2c8f2a(0x480)]<=0x0){if('qNYzs'===_0x2c8f2a(0x4fa))this[_0x2c8f2a(0x36d)](),this[_0x2c8f2a(0x480)]=0x3c;else{function _0x1494a3(){const _0x562157=_0x2c8f2a;this[_0x562157(0x239)][_0x562157(0x474)]=_0x3914f6(_0xeb5abc['$1']);}}}},VisuMZ['EventsMoveCore']['Game_Map_isDashDisabled']=Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4c6)],Game_Map[_0x1d5a8d(0x1cf)]['isDashDisabled']=function(){const _0x4dccb1=_0x1d5a8d;if(!$gameSystem[_0x4dccb1(0x122)]())return!![];return VisuMZ[_0x4dccb1(0x424)][_0x4dccb1(0x1a0)][_0x4dccb1(0x1ee)](this);},Game_Map['prototype'][_0x1d5a8d(0x338)]=function(){const _0x1c277c=_0x1d5a8d;this['_saveEventLocations']=![];const _0x253804=$dataMap[_0x1c277c(0x4db)]||'';_0x253804['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x1c277c(0x4da)]=!![]);},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x51f)]=function(){const _0x5cd24b=_0x1d5a8d;if(this[_0x5cd24b(0x4da)]===undefined)this[_0x5cd24b(0x338)]();return this[_0x5cd24b(0x4da)];},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xe3)]=function(_0x476985){const _0x14aac6=_0x1d5a8d;_0x476985!==this[_0x14aac6(0x25c)]()&&$gamePlayer&&$gameSystem[_0x14aac6(0xe3)](this['mapId']());},Game_Map['prototype'][_0x1d5a8d(0x492)]=function(){const _0x1ef5d1=_0x1d5a8d;this['_spawnedEvents']=$gameSystem[_0x1ef5d1(0x211)](this['mapId']()),this[_0x1ef5d1(0x257)]=!![];},VisuMZ['EventsMoveCore']['Game_Map_events']=Game_Map['prototype'][_0x1d5a8d(0x280)],Game_Map['prototype'][_0x1d5a8d(0x280)]=function(){const _0x9f452a=_0x1d5a8d;if(this[_0x9f452a(0xa8)])return this['_eventCache'];const _0x36b16f=VisuMZ[_0x9f452a(0x424)][_0x9f452a(0x427)][_0x9f452a(0x1ee)](this),_0x4fc02f=_0x36b16f[_0x9f452a(0x1aa)](this[_0x9f452a(0x3ea)]||[]);return this[_0x9f452a(0xa8)]=_0x4fc02f[_0x9f452a(0xaa)](_0x3a2c21=>!!_0x3a2c21),this[_0x9f452a(0xa8)];},VisuMZ['EventsMoveCore']['Game_Map_event']=Game_Map['prototype'][_0x1d5a8d(0x505)],Game_Map['prototype'][_0x1d5a8d(0x505)]=function(_0x584599){const _0x2ad0bd=_0x1d5a8d;return _0x584599>=0x3e8?(_0x584599-=0x3e8,this[_0x2ad0bd(0x3ea)][_0x584599]):VisuMZ[_0x2ad0bd(0x424)][_0x2ad0bd(0x1c2)]['call'](this,_0x584599);},Game_Map[_0x1d5a8d(0x1cf)]['eraseEvent']=function(_0xe1bb49){const _0x1a239e=_0x1d5a8d,_0xe86229=this['event'](_0xe1bb49);if(_0xe86229)_0xe86229[_0x1a239e(0x208)]();},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2b3)]=function(){const _0x783b25=_0x1d5a8d,_0x2915ca={'template':_0x783b25(0x279),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x783b25(0x3ea)][_0x783b25(0xd6)]+0x3e8};this[_0x783b25(0x3f3)](_0x2915ca);},Game_Map[_0x1d5a8d(0x1cf)]['checkExistingEntitiesAt']=function(_0xbdc62d,_0x38462f){const _0x1c8888=_0x1d5a8d;if(this['eventsXy'](_0xbdc62d,_0x38462f)[_0x1c8888(0xd6)]>0x0)return!![];if($gamePlayer['x']===_0xbdc62d&&$gamePlayer['y']===_0x38462f)return!![];if(this[_0x1c8888(0x114)]()['posNt'](_0xbdc62d,_0x38462f))return!![];if(this[_0x1c8888(0x1f0)]()[_0x1c8888(0x3a4)](_0xbdc62d,_0x38462f))return!![];return![];},Game_Map[_0x1d5a8d(0x1cf)]['isSpawnHitboxCollisionOk']=function(_0x9197de,_0x1fd4c2,_0x10ad6a){const _0x139379=_0x1d5a8d;$gameTemp[_0x139379(0x4cb)]=_0x9197de;const _0x1e179c=new Game_Event(_0x9197de[_0x139379(0x25c)],_0x9197de['eventId']);$gameTemp['_spawnData']=undefined,_0x1e179c[_0x139379(0x360)]();let _0x2e64be=_0x1fd4c2-_0x1e179c[_0x139379(0x462)]['left'],_0x1a1e4c=_0x1fd4c2+_0x1e179c[_0x139379(0x462)]['left'],_0x38908b=_0x10ad6a-_0x1e179c['_addedHitbox']['up'],_0x221fb6=_0x10ad6a+_0x1e179c[_0x139379(0x462)][_0x139379(0x350)];for(let _0x3da67=_0x2e64be;_0x3da67<=_0x1a1e4c;_0x3da67++){if(_0x139379(0x408)!==_0x139379(0x408)){function _0x4e670d(){const _0x4fd19b=_0x139379,_0x477fc4=_0x53c04e[_0x4fd19b(0x4ff)](_0x257fe7(_0x387f26['$1'])/0x64*0xff);return this[_0x4fd19b(0x153)](_0x477fc4['clamp'](0x0,0xff));}}else for(let _0x2b3600=_0x38908b;_0x2b3600<=_0x221fb6;_0x2b3600++){if(_0x139379(0x29b)!==_0x139379(0x29b)){function _0x342da3(){return this['clearDashing']();}}else{if(this[_0x139379(0x46c)](_0x3da67,_0x2b3600))return![];}}}return!![];},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f3)]=function(_0x54cef0){const _0x134761=_0x1d5a8d;$gameTemp[_0x134761(0x4cb)]=_0x54cef0;const _0x31107f=new Game_Event(_0x54cef0[_0x134761(0x25c)],_0x54cef0[_0x134761(0x32d)]);$gameTemp[_0x134761(0x4cb)]=undefined,this[_0x134761(0x3ea)][_0x134761(0x2a1)](_0x31107f),_0x31107f['setupSpawn'](_0x54cef0),this[_0x134761(0x450)]();},Game_Map['prototype'][_0x1d5a8d(0x14a)]=function(_0x14f19d,_0x5ec10c,_0xc1a594){const _0x3d5f58=_0x1d5a8d,_0x4b8e2c=_0x14f19d['x'],_0x479677=_0x14f19d['y'];if(!this['isValid'](_0x4b8e2c,_0x479677))return![];if(_0x5ec10c){if(this['checkExistingEntitiesAt'](_0x4b8e2c,_0x479677))return![];if(!this[_0x3d5f58(0x31a)](_0x14f19d,_0x4b8e2c,_0x479677))return![];}if(_0xc1a594){if(!this['isPassableByAnyDirection'](_0x4b8e2c,_0x479677))return![];}return this[_0x3d5f58(0x3f3)](_0x14f19d),!![];},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3b2)]=function(_0x4187b0,_0x5a46d5,_0x1e3f56,_0x2f1da5){const _0x5672be=_0x1d5a8d,_0x35c883=[],_0x429d63=this[_0x5672be(0x354)](),_0x7c0b2e=this[_0x5672be(0x229)]();for(let _0x27e93e=0x0;_0x27e93e<_0x429d63;_0x27e93e++){for(let _0x377e6e=0x0;_0x377e6e<_0x7c0b2e;_0x377e6e++){if(_0x5672be(0x159)!=='jujgZ'){function _0x17208f(){const _0x4b7754=_0x5672be;return this[_0x4b7754(0x3bc)]();}}else{if(!_0x5a46d5[_0x5672be(0x26d)](this[_0x5672be(0xf6)](_0x27e93e,_0x377e6e)))continue;if(!this['isValid'](_0x27e93e,_0x377e6e))continue;if(_0x1e3f56){if(_0x5672be(0x459)!==_0x5672be(0x38a)){if(this['checkExistingEntitiesAt'](_0x27e93e,_0x377e6e))continue;if(!this[_0x5672be(0x31a)](_0x4187b0,_0x27e93e,_0x377e6e))continue;}else{function _0x119321(){const _0x5d51d2=_0x5672be,_0x34798a=_0x515ff7[_0x5d51d2(0x1de)](this[_0x5d51d2(0x48d)]());this[_0x5d51d2(0x269)](_0x34798a);}}}if(_0x2f1da5){if(!this['isPassableByAnyDirection'](_0x27e93e,_0x377e6e))continue;}_0x35c883[_0x5672be(0x2a1)]([_0x27e93e,_0x377e6e]);}}}if(_0x35c883[_0x5672be(0xd6)]>0x0){const _0x28b847=_0x35c883[Math[_0x5672be(0x346)](_0x35c883[_0x5672be(0xd6)])];return _0x4187b0['x']=_0x28b847[0x0],_0x4187b0['y']=_0x28b847[0x1],this[_0x5672be(0x3f3)](_0x4187b0),!![];}return![];},Game_Map['prototype']['prepareSpawnedEventAtTerrainTag']=function(_0x5ec88d,_0x5ebf7d,_0x30219c,_0x4e651d){const _0x257092=_0x1d5a8d,_0x3e3887=[],_0xaf1a5d=this[_0x257092(0x354)](),_0x1b87e3=this[_0x257092(0x229)]();for(let _0x47bbc6=0x0;_0x47bbc6<_0xaf1a5d;_0x47bbc6++){for(let _0x716219=0x0;_0x716219<_0x1b87e3;_0x716219++){if(!_0x5ebf7d[_0x257092(0x26d)](this[_0x257092(0x4b5)](_0x47bbc6,_0x716219)))continue;if(!this[_0x257092(0x278)](_0x47bbc6,_0x716219))continue;if(_0x30219c){if(_0x257092(0x1a1)!==_0x257092(0x1a1)){function _0x38ec53(){const _0x1ec2bd=_0x257092;_0xbee299[_0x1a6f41]=_0x38abb8[_0x15e69b][_0x1ec2bd(0xbe)](0x0);}}else{if(this[_0x257092(0x46c)](_0x47bbc6,_0x716219))continue;if(!this['isSpawnHitboxCollisionOk'](_0x5ec88d,_0x47bbc6,_0x716219))continue;}}if(_0x4e651d){if('ABXuo'==='dVOUF'){function _0x1ba02d(){const _0x263981=_0x257092;_0x546365[_0x263981(0x29a)](_0x31e436,_0x6b82dc);const _0x42539f=_0x222722[_0x263981(0x30b)](),_0x4142e4=_0x3a9ff1[_0x263981(0x1be)]||_0x3b45f6[_0x263981(0x25c)](),_0xcfebee=_0x3851af['EventId']||_0x42539f[_0x263981(0x32d)]();_0x5cc027[_0x263981(0x11e)](_0x4142e4,_0xcfebee);}}else{if(!this[_0x257092(0xf9)](_0x47bbc6,_0x716219))continue;}}_0x3e3887['push']([_0x47bbc6,_0x716219]);}}if(_0x3e3887['length']>0x0){if(_0x257092(0x26a)!==_0x257092(0x26a)){function _0x26102c(){const _0x5b9ca5=_0x257092;this[_0x5b9ca5(0x3fe)]=_0x2a3d46;const _0x20d695=new _0x125a97(0x0,0x0,_0x5e368e[_0x5b9ca5(0x3bf)]/0x4,this[_0x5b9ca5(0x291)](0x1));this[_0x5b9ca5(0x1ac)](),_0x211ad9['prototype'][_0x5b9ca5(0x475)][_0x5b9ca5(0x1ee)](this,_0x20d695),this['contentsOpacity']=0x0,this[_0x5b9ca5(0x272)](0x2),this['_text']='';}}else{const _0x20798f=_0x3e3887[Math[_0x257092(0x346)](_0x3e3887[_0x257092(0xd6)])];return _0x5ec88d['x']=_0x20798f[0x0],_0x5ec88d['y']=_0x20798f[0x1],this[_0x257092(0x3f3)](_0x5ec88d),!![];}}return![];},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xf9)]=function(_0x1aafff,_0x3461da){const _0x58d89d=_0x1d5a8d;if(this[_0x58d89d(0x174)](_0x1aafff,_0x3461da,0x2))return!![];if(this['isPassable'](_0x1aafff,_0x3461da,0x4))return!![];if(this[_0x58d89d(0x174)](_0x1aafff,_0x3461da,0x6))return!![];if(this[_0x58d89d(0x174)](_0x1aafff,_0x3461da,0x8))return!![];return![];},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x137)]=function(_0x5bbda9){const _0x5d8c3c=_0x1d5a8d;if(_0x5bbda9<0x3e8)return;if(!this[_0x5d8c3c(0x3ea)])return;const _0x2101ca=this[_0x5d8c3c(0x505)](_0x5bbda9);_0x2101ca[_0x5d8c3c(0x217)](-0x1,-0x1),_0x2101ca[_0x5d8c3c(0x208)](),this['_spawnedEvents'][_0x5bbda9-0x3e8]=null,this[_0x5d8c3c(0x450)]();},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x303)]=function(){const _0x50ebb5=_0x1d5a8d;for(const _0x374d46 of this[_0x50ebb5(0x3ea)]){if(_0x374d46)return _0x374d46;}return null;},Game_Map[_0x1d5a8d(0x1cf)]['firstSpawnedEventID']=function(){const _0x216bee=_0x1d5a8d,_0x342a6a=this[_0x216bee(0x303)]();return _0x342a6a?_0x342a6a[_0x216bee(0x1fb)]:0x0;},Game_Map[_0x1d5a8d(0x1cf)]['lastSpawnedEvent']=function(){const _0x41e6fe=_0x1d5a8d,_0xf84da4=this[_0x41e6fe(0x3ea)][_0x41e6fe(0xbe)](0x0)['reverse']();for(const _0xfee096 of _0xf84da4){if(_0x41e6fe(0x2ea)!==_0x41e6fe(0xad)){if(_0xfee096)return _0xfee096;}else{function _0x2a1224(){if(!_0x2d87f5['isWorking']())return;_0x7bc420['resume']();}}}return null;},Game_Map['prototype'][_0x1d5a8d(0x179)]=function(){const _0x13d042=_0x1d5a8d,_0x25e5c1=this[_0x13d042(0x4fe)]();return _0x25e5c1?_0x25e5c1[_0x13d042(0x1fb)]:0x0;},Game_Map['prototype'][_0x1d5a8d(0x2d1)]=function(_0x4e60f9,_0x12959){const _0x98bc44=_0x1d5a8d,_0x46ed67=this[_0x98bc44(0x45e)](_0x4e60f9,_0x12959);for(const _0x48113d of _0x46ed67){if(!_0x48113d)continue;if(_0x48113d['isSpawnedEvent']())this[_0x98bc44(0x137)](_0x48113d['_eventId']);}},Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x19c)]=function(_0x338d10){const _0x15f34f=_0x1d5a8d;for(const _0x5473c8 of this[_0x15f34f(0x3ea)]){if(!_0x5473c8)continue;_0x338d10[_0x15f34f(0x26d)](_0x5473c8[_0x15f34f(0xf6)]())&&this[_0x15f34f(0x137)](_0x5473c8['_eventId']);}},Game_Map['prototype'][_0x1d5a8d(0x434)]=function(_0x50b631){const _0x35f602=_0x1d5a8d;for(const _0x4df8bc of this['_spawnedEvents']){if(!_0x4df8bc)continue;_0x50b631[_0x35f602(0x26d)](_0x4df8bc[_0x35f602(0x4b5)]())&&this[_0x35f602(0x137)](_0x4df8bc[_0x35f602(0x1fb)]);}},Game_Map['prototype'][_0x1d5a8d(0x2e9)]=function(){const _0x272612=_0x1d5a8d;for(const _0x200ed1 of this['_spawnedEvents']){if(!_0x200ed1)continue;this[_0x272612(0x137)](_0x200ed1[_0x272612(0x1fb)]);}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x533)]=Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xb2)],Game_Map[_0x1d5a8d(0x1cf)]['unlockEvent']=function(_0xc1b456){const _0x492f7d=_0x1d5a8d;VisuMZ[_0x492f7d(0x424)]['Game_Map_unlockEvent']['call'](this,_0xc1b456);if(_0xc1b456>=0x3e8){const _0x48e542=this[_0x492f7d(0x505)](_0xc1b456);if(_0x48e542)_0x48e542[_0x492f7d(0x52f)]();}},Game_CommonEvent[_0x1d5a8d(0x1cf)]['hasAdvancedSwitchVariable']=function(){const _0x1bd58d=_0x1d5a8d,_0x35cfee=this[_0x1bd58d(0x505)]();return this[_0x1bd58d(0x138)]()&&_0x35cfee[_0x1bd58d(0x121)]>=0x1&&DataManager[_0x1bd58d(0x42d)](_0x35cfee['switchId']);},Game_CommonEvent[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2ec)]=function(){const _0x124bed=_0x1d5a8d;return VisuMZ['EventsMoveCore'][_0x124bed(0x524)][_0x124bed(0x28c)][_0x124bed(0x26d)](this['_commonEventId']);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0xe5)]=Game_CommonEvent[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x138)],Game_CommonEvent['prototype'][_0x1d5a8d(0x138)]=function(){const _0x368286=_0x1d5a8d;return VisuMZ[_0x368286(0x424)]['Game_CommonEvent_isActive'][_0x368286(0x1ee)](this)?!![]:VisuMZ[_0x368286(0x424)]['CustomPageConditions']['metCPC'](this['event']()[_0x368286(0x3d2)],this[_0x368286(0x24e)]);},VisuMZ['EventsMoveCore'][_0x1d5a8d(0xcc)]=Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f8)],Game_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f8)]=function(){const _0x29c794=_0x1d5a8d,_0x2d24a3=VisuMZ['EventsMoveCore'][_0x29c794(0xcc)][_0x29c794(0x1ee)](this),_0x4e90ae=VisuMZ[_0x29c794(0x424)][_0x29c794(0x524)][_0x29c794(0x28c)][_0x29c794(0x417)](_0x4d0c3d=>$dataCommonEvents[_0x4d0c3d]);return _0x2d24a3[_0x29c794(0x1aa)](_0x4e90ae)[_0x29c794(0xaa)]((_0xc7728,_0x4ba8b3,_0xc9f3b9)=>_0xc9f3b9[_0x29c794(0x1b9)](_0xc7728)===_0x4ba8b3);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x15d)]=Game_CharacterBase['prototype'][_0x1d5a8d(0x1ac)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1ac)]=function(){const _0x40bfef=_0x1d5a8d;VisuMZ[_0x40bfef(0x424)][_0x40bfef(0x15d)][_0x40bfef(0x1ee)](this),this[_0x40bfef(0x223)]();},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x223)]=function(){const _0x5a6485=_0x1d5a8d;this[_0x5a6485(0xec)]=![],this[_0x5a6485(0x4b4)](),this['clearDashing'](),this[_0x5a6485(0xb1)](),this[_0x5a6485(0x1dd)]();},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x10c)]=function(){const _0x37c02b=_0x1d5a8d;if(this['constructor']===Game_Player&&this[_0x37c02b(0x2d3)]())return this[_0x37c02b(0x29c)]()[_0x37c02b(0x3d6)]()[_0x37c02b(0x403)](/\[VS8\]/i);else return Imported[_0x37c02b(0x1ab)]&&this[_0x37c02b(0x49b)]()?!![]:this[_0x37c02b(0x3d6)]()['match'](/\[VS8\]/i);},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x3be)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x495)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x495)]=function(){const _0x14a718=_0x1d5a8d;if(this[_0x14a718(0x39a)]()&&!this[_0x14a718(0x234)]()&&this[_0x14a718(0x10c)]())return this[_0x14a718(0x13c)]();else{if(this[_0x14a718(0x39a)]()&&!this[_0x14a718(0x234)]()){if('aFTTK'!==_0x14a718(0x34d))return 0x8;else{function _0x2e16a2(){const _0x3c07e7=_0x14a718,_0x50fe98=_0xe6bcba[_0x3c07e7(0x348)]()||this;if(_0x50fe98[_0x3c07e7(0x214)]!==_0x3b0882)_0x17f250['EventsMoveCore'][_0x3c07e7(0x397)]['call'](this,_0x2b3f71,_0x7ca56f);else{const _0x12f6a2=[_0x50fe98['_mapId'],_0x50fe98[_0x3c07e7(0x1fb)],'Self\x20Switch\x20%1'[_0x3c07e7(0x3eb)](_0x18de08)];_0x25f096[_0x3c07e7(0x490)](_0x12f6a2,_0x35beb9);}}}}else{if(this['isPosing']()&&this[_0x14a718(0x10c)]()){if(_0x14a718(0x3da)!==_0x14a718(0x3da)){function _0x205e75(){const _0x267c42=_0x14a718;return _0x7409ca[_0x267c42(0x424)][_0x267c42(0x1d2)][_0x267c42(0x3c9)][_0x267c42(0x2a0)];}}else return this[_0x14a718(0x1e6)]();}else return VisuMZ[_0x14a718(0x424)]['Game_CharacterBase_direction'][_0x14a718(0x1ee)](this);}}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x382)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x53d)],Game_CharacterBase['prototype'][_0x1d5a8d(0x53d)]=function(_0xd325a3){const _0x140928=_0x1d5a8d;if(!this[_0x140928(0x10c)]())_0xd325a3=this['correctFacingDirection'](_0xd325a3);VisuMZ['EventsMoveCore'][_0x140928(0x382)][_0x140928(0x1ee)](this,_0xd325a3);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x12b)]=function(_0x24df8b){const _0xfeb4ea=_0x1d5a8d;if(_0x24df8b===0x1)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x24df8b===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x24df8b===0x7)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x24df8b===0x9)return this[_0xfeb4ea(0xa9)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x24df8b;},Game_CharacterBase['prototype']['isDiagonalDirection']=function(_0x101dce){const _0x315f4c=_0x1d5a8d;return[0x1,0x3,0x5,0x7,0x9][_0x315f4c(0x26d)](_0x101dce);},Game_CharacterBase['prototype'][_0x1d5a8d(0x477)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x54a)]=Game_CharacterBase['prototype'][_0x1d5a8d(0x203)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x203)]=function(_0x1c9995){const _0x1d2d12=_0x1d5a8d;this[_0x1d2d12(0x3d8)]=_0x1c9995,VisuMZ[_0x1d2d12(0x424)][_0x1d2d12(0x54a)][_0x1d2d12(0x1ee)](this,_0x1c9995);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x31f)]=function(_0x46ffa2){const _0x1b1422=_0x1d5a8d;if(!this['isDiagonalDirection'](_0x46ffa2))return this[_0x1b1422(0x203)](_0x46ffa2);let _0x506093=0x0,_0x219028=0x0;switch(_0x46ffa2){case 0x1:_0x506093=0x4,_0x219028=0x2;break;case 0x3:_0x506093=0x6,_0x219028=0x2;break;case 0x7:_0x506093=0x4,_0x219028=0x8;break;case 0x9:_0x506093=0x6,_0x219028=0x8;break;}if(VisuMZ[_0x1b1422(0x424)]['Settings']['Movement']['StrictCollision']){if(_0x1b1422(0x518)==='EkNLR'){function _0x4975af(){const _0x228c60=_0x1b1422;if(!this[_0x228c60(0x10c)]())_0x4f6676=this[_0x228c60(0x12b)](_0x186bd6);_0x1bb0a4[_0x228c60(0x424)]['Game_CharacterBase_setDirection'][_0x228c60(0x1ee)](this,_0x103300);}}else{if(!this[_0x1b1422(0xa9)](this['_x'],this['_y'],_0x506093))return this[_0x1b1422(0x203)](_0x219028);if(!this[_0x1b1422(0xa9)](this['_x'],this['_y'],_0x219028)){if('XZQxA'===_0x1b1422(0x503))return this[_0x1b1422(0x203)](_0x506093);else{function _0x2c1584(){const _0x29de19=_0x1b1422;if([0x6c,0x198]['includes'](_0x4f7951[_0x29de19(0x1f3)])){if(_0x4419d3!=='')_0x137c5a+='\x0a';_0x40ab01+=_0x3c523b[_0x29de19(0x3b0)][0x0];}}}}if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x506093,_0x219028)){let _0x371e11=VisuMZ[_0x1b1422(0x424)][_0x1b1422(0x1d2)][_0x1b1422(0x12e)][_0x1b1422(0x127)]?_0x506093:_0x219028;return this['moveStraight'](_0x371e11);}}}this['_lastMovedDirection']=_0x46ffa2,this['moveDiagonally'](_0x506093,_0x219028);},VisuMZ['EventsMoveCore']['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase['prototype'][_0x1d5a8d(0xb3)],Game_CharacterBase[_0x1d5a8d(0x1cf)]['realMoveSpeed']=function(){const _0x1f9706=_0x1d5a8d;let _0x3dcc31=this[_0x1f9706(0xb8)];if(this['isDashing']()){if(_0x1f9706(0x501)!==_0x1f9706(0x536))_0x3dcc31+=this[_0x1f9706(0x394)]();else{function _0x508924(){return 0x4;}}}return this['adjustDir8MovementSpeed'](_0x3dcc31);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x394)]=function(){const _0xda6d17=_0x1d5a8d,_0x46ed69=VisuMZ[_0xda6d17(0x424)][_0xda6d17(0x1d2)][_0xda6d17(0x12e)];if(_0x46ed69[_0xda6d17(0x429)]!==undefined){if('nHVui'===_0xda6d17(0x455))return _0x46ed69[_0xda6d17(0x429)];else{function _0x234219(){const _0x4e3a96=_0xda6d17;return this[_0x4e3a96(0x16f)](_0x3969ab(_0x14550f['$1']));}}}else return VisuMZ['EventsMoveCore'][_0xda6d17(0x27a)][_0xda6d17(0x1ee)](this)-this[_0xda6d17(0xb8)];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3e5)]=function(_0x127e25){const _0x123620=_0x1d5a8d,_0x5a40c2=VisuMZ['EventsMoveCore'][_0x123620(0x1d2)][_0x123620(0x12e)];if(!_0x5a40c2[_0x123620(0x309)])return _0x127e25;if([0x1,0x3,0x7,0x9][_0x123620(0x26d)](this[_0x123620(0x3d8)])){if('jrZMU'!==_0x123620(0x319))_0x127e25*=_0x5a40c2['DiagonalSpeedMultiplier']||0.01;else{function _0x26c30b(){if(_0x597e15)return _0x2c9663;}}}return _0x127e25;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x40a)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3bc)],Game_CharacterBase['prototype'][_0x1d5a8d(0x3bc)]=function(){const _0x180547=_0x1d5a8d;if(this[_0x180547(0x325)])return!![];return VisuMZ[_0x180547(0x424)][_0x180547(0x40a)]['call'](this);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x237)]=function(){return this['isDashing']();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x466)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x313)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x313)]=function(){const _0x3450a0=_0x1d5a8d;if(this[_0x3450a0(0x46b)]())return this[_0x3450a0(0x2db)]();else{if(_0x3450a0(0x2fd)!==_0x3450a0(0x28d))return VisuMZ[_0x3450a0(0x424)]['Game_CharacterBase_pattern'][_0x3450a0(0x1ee)](this);else{function _0x179b33(){const _0x11aa55=_0x3450a0;_0x33fe6a['ConvertParams'](_0x2a0dca,_0x2c2c78);const _0x1c7961=_0x18cc98[_0x11aa55(0x11d)];_0x51866c[_0x11aa55(0x494)](_0x1c7961);}}}},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x2da)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x242)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x242)]=function(){const _0x526605=_0x1d5a8d;VisuMZ[_0x526605(0x424)][_0x526605(0x2da)][_0x526605(0x1ee)](this),this['clearPose']();},VisuMZ[_0x1d5a8d(0x424)]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x1d5a8d(0x1cf)]['characterIndex'],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3bd)]=function(){const _0xeb1e0d=_0x1d5a8d;if(this[_0xeb1e0d(0x10c)]())return this[_0xeb1e0d(0x496)]();return VisuMZ[_0xeb1e0d(0x424)]['Game_CharacterBase_characterIndex']['call'](this);},Game_CharacterBase['prototype'][_0x1d5a8d(0x496)]=function(){const _0x51fe8c=_0x1d5a8d,_0x38df75=this[_0x51fe8c(0x495)]();if(this[_0x51fe8c(0x234)]()){if(_0x51fe8c(0x44b)!==_0x51fe8c(0x44b)){function _0x12b0a9(){const _0xd00eb7=_0x51fe8c;return _0x3c898e[_0xd00eb7(0x424)]['Game_CharacterBase_pattern'][_0xd00eb7(0x1ee)](this);}}else{if([0x2,0x4,0x6,0x8][_0x51fe8c(0x26d)](_0x38df75))return 0x4;if([0x1,0x3,0x7,0x9][_0x51fe8c(0x26d)](_0x38df75))return 0x5;}}else{if(this[_0x51fe8c(0x39a)]()){if(_0x51fe8c(0x3b1)!=='smfNQ'){function _0x558307(){const _0x30609f=_0x51fe8c;return this[_0x30609f(0x53d)](0x1);}}else return 0x6;}else{if(this[_0x51fe8c(0x46b)]()){if(_0x51fe8c(0x104)!==_0x51fe8c(0x104)){function _0x4cff4a(){const _0x3aaf73=_0x51fe8c;for(const _0x2da490 of _0x40e585){_0x2da490['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x1e4f88=_0x178d8e(_0x4bc1ac['$1'])[_0x3aaf73(0x44f)]()[_0x3aaf73(0x35f)](),_0x27b8e9=_0x36ade4(_0xa10e2e['$2'])[_0x3aaf73(0x44f)]()[_0x3aaf73(0x35f)]();const _0x16a89b=_0x587233[_0x3aaf73(0x324)]('['+_0x5eaa30['$3'][_0x3aaf73(0x403)](/\d+/g)+']');_0x1e4f88=_0x1e4f88[_0x3aaf73(0x25d)](0x0)['toUpperCase']()+_0x1e4f88['slice'](0x1),_0x27b8e9=_0x27b8e9[_0x3aaf73(0x25d)](0x0)[_0x3aaf73(0xcf)]()+_0x27b8e9['slice'](0x1);const _0x3ece8e='%1%2'[_0x3aaf73(0x3eb)](_0x1e4f88,_0x27b8e9);if(_0x137466[_0x3ece8e])_0x19215b[_0x3ece8e]=_0x4ada89[_0x3ece8e][_0x3aaf73(0x1aa)](_0x16a89b);}}}else return this[_0x51fe8c(0x32b)]();}else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x51fe8c(0x26d)](_0x38df75))return 0x4;if([0x1,0x3,0x7,0x9][_0x51fe8c(0x26d)](_0x38df75))return 0x5;}else{if(this[_0x51fe8c(0x391)]()&&this[_0x51fe8c(0xe7)]()){if([0x2,0x4,0x6,0x8][_0x51fe8c(0x26d)](_0x38df75))return 0x4;if([0x1,0x3,0x7,0x9][_0x51fe8c(0x26d)](_0x38df75))return 0x5;}else{if(this[_0x51fe8c(0x237)]()){if([0x2,0x4,0x6,0x8][_0x51fe8c(0x26d)](_0x38df75))return 0x2;if([0x1,0x3,0x7,0x9][_0x51fe8c(0x26d)](_0x38df75))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x38df75))return 0x0;if([0x1,0x3,0x7,0x9][_0x51fe8c(0x26d)](_0x38df75))return 0x1;}}}}}}},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xe7)]=function(){const _0x1c2544=_0x1d5a8d;return VisuMZ[_0x1c2544(0x424)][_0x1c2544(0x1d2)][_0x1c2544(0x3c1)][_0x1c2544(0x243)];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x451)]=function(){const _0x3b8c31=_0x1d5a8d;return this[_0x3b8c31(0x39a)]()&&this[_0x3b8c31(0x4b5)]()===VisuMZ[_0x3b8c31(0x424)][_0x3b8c31(0x1d2)][_0x3b8c31(0x235)]['Rope'];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x13c)]=function(){const _0x363e62=_0x1d5a8d;if(this[_0x363e62(0x451)]()){if(_0x363e62(0xf7)!==_0x363e62(0xc0))return 0x4;else{function _0x2e6ae7(){const _0x4d61b7=_0x363e62;for(let _0x2345f6=-this[_0x4d61b7(0x462)]['up'];_0x2345f6<=this[_0x4d61b7(0x462)][_0x4d61b7(0x350)];_0x2345f6++){if(!_0x90c42['prototype']['canPass'][_0x4d61b7(0x1ee)](this,_0x2b521e+_0x35a2fb,_0x16a8df+_0x2345f6,_0x5e5027))return![];}}}}else{if('gwwse'!=='oRihX')return 0x2;else{function _0x4c098c(){const _0x2b66ee=_0x363e62,_0x58cdc8=_0xc6ede2[_0x2b66ee(0x1de)](this[_0x2b66ee(0x48d)]());this[_0x2b66ee(0x384)](_0x58cdc8);}}}},VisuMZ[_0x1d5a8d(0x424)]['Game_CharacterBase_update']=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xe4)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xe4)]=function(){const _0x5f0465=_0x1d5a8d;VisuMZ[_0x5f0465(0x424)]['Game_CharacterBase_update']['call'](this),this[_0x5f0465(0x463)]();},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x463)]=function(){const _0x4fadd5=_0x1d5a8d;this[_0x4fadd5(0x4a0)]=this[_0x4fadd5(0x4a0)]||0x0;if(this['_poseDuration']>0x0){if(_0x4fadd5(0x146)==='WyqGv'){function _0x10fbe6(){const _0x504918=_0x4fadd5;_0x25545c['EventsMoveCore']['Game_Switches_setValue'][_0x504918(0x1ee)](this,_0x169cad,_0x477d9d);}}else{this[_0x4fadd5(0x4a0)]--;if(this[_0x4fadd5(0x4a0)]<=0x0&&this['_pose']!==_0x4fadd5(0xd9))this[_0x4fadd5(0x4b4)]();}}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x1d5)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x554)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x554)]=function(_0x143076,_0x4ad1af){const _0x2e9740=_0x1d5a8d;VisuMZ[_0x2e9740(0x424)]['Game_CharacterBase_moveDiagonally'][_0x2e9740(0x1ee)](this,_0x143076,_0x4ad1af);if(this[_0x2e9740(0x10c)]())this[_0x2e9740(0x46a)](_0x143076,_0x4ad1af);},Game_CharacterBase[_0x1d5a8d(0x1cf)]['setDiagonalDirection']=function(_0x448bba,_0x45f775){const _0x29dd59=_0x1d5a8d;if(_0x448bba===0x4&&_0x45f775===0x2)this[_0x29dd59(0x53d)](0x1);if(_0x448bba===0x6&&_0x45f775===0x2)this['setDirection'](0x3);if(_0x448bba===0x4&&_0x45f775===0x8)this[_0x29dd59(0x53d)](0x7);if(_0x448bba===0x6&&_0x45f775===0x8)this['setDirection'](0x9);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3e2)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x133)],Game_CharacterBase['prototype'][_0x1d5a8d(0x133)]=function(){const _0x276b87=_0x1d5a8d;if(this[_0x276b87(0x46b)]()&&this[_0x276b87(0xd7)]()===_0x276b87(0xd9))return!![];return VisuMZ['EventsMoveCore'][_0x276b87(0x3e2)][_0x276b87(0x1ee)](this);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x363)]=function(_0x303594,_0x3c4287){const _0x416782=_0x1d5a8d;if(_0x303594['match'](/Z/i))_0x303594='ZZZ';if(_0x303594[_0x416782(0x403)](/SLEEP/i))_0x303594=_0x416782(0xd9);this[_0x416782(0x10c)]()&&(this[_0x416782(0x1df)]=_0x303594['toUpperCase']()[_0x416782(0x35f)](),this['_poseDuration']=_0x3c4287||Infinity);},Game_CharacterBase['prototype'][_0x1d5a8d(0xd7)]=function(){const _0x1f794f=_0x1d5a8d;if(this['isSpriteVS8dir']())return(this['_pose']||'')[_0x1f794f(0xcf)]()[_0x1f794f(0x35f)]();else{if('WPPmp'!==_0x1f794f(0x322)){function _0x11226e(){const _0x45fe2f=_0x1f794f;return this[_0x45fe2f(0x3d8)]||0x0;}}else return''['toUpperCase']()[_0x1f794f(0x35f)]();}},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1ff)]=function(_0x16f6f9,_0x3b4a04){const _0x3ceea8=_0x1d5a8d;if(this[_0x3ceea8(0x10c)]()){const _0x1928ec=['',_0x3ceea8(0x2cf),_0x3ceea8(0x32a),_0x3ceea8(0x194),'HEART','ANGER',_0x3ceea8(0x277),'COBWEB',_0x3ceea8(0x2f5),_0x3ceea8(0x3a7),_0x3ceea8(0xd9),'','','','',''][_0x16f6f9];this[_0x3ceea8(0x363)](_0x1928ec,_0x3b4a04);}},Game_CharacterBase['prototype'][_0x1d5a8d(0x4b4)]=function(){const _0x3b9a23=_0x1d5a8d;this[_0x3b9a23(0x1df)]='',this[_0x3b9a23(0x4a0)]=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){return this['isSpriteVS8dir']()&&!!this['_pose'];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x32b)]=function(){const _0x3e6e35=_0x1d5a8d,_0xab81db=this[_0x3e6e35(0x1df)][_0x3e6e35(0xcf)]();switch(this[_0x3e6e35(0x1df)][_0x3e6e35(0xcf)]()['trim']()){case _0x3e6e35(0x351):case'HMPH':case _0x3e6e35(0x2dc):case _0x3e6e35(0x3fa):case _0x3e6e35(0x1c3):case _0x3e6e35(0x4f6):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype']['getPosingCharacterDirection']=function(){const _0x4cbf3f=_0x1d5a8d;switch(this['_pose'][_0x4cbf3f(0xcf)]()){case _0x4cbf3f(0x2cf):case _0x4cbf3f(0x32a):case _0x4cbf3f(0x194):case'!':case'?':return 0x2;break;case _0x4cbf3f(0x52c):case'ANGER':case'SWEAT':return 0x4;break;case _0x4cbf3f(0x351):case _0x4cbf3f(0x426):case _0x4cbf3f(0x2dc):case _0x4cbf3f(0x433):case _0x4cbf3f(0x2f5):case'LIGHT\x20BULB':return 0x6;break;case'HURT':case _0x4cbf3f(0x1c3):case'COLLAPSE':case _0x4cbf3f(0xd9):case _0x4cbf3f(0x21c):return 0x8;break;default:return VisuMZ[_0x4cbf3f(0x424)][_0x4cbf3f(0x382)][_0x4cbf3f(0x1ee)](this);break;}},Game_CharacterBase[_0x1d5a8d(0x1cf)]['getPosingCharacterPattern']=function(){const _0x452c23=_0x1d5a8d;switch(this[_0x452c23(0x1df)][_0x452c23(0xcf)]()){case _0x452c23(0x351):case _0x452c23(0x3fa):case'EXCLAMATION':case'!':case _0x452c23(0x52c):case'COBWEB':return 0x0;break;case _0x452c23(0x426):case _0x452c23(0x1c3):case'QUESTION':case'?':case _0x452c23(0x51e):case _0x452c23(0x2f5):return 0x1;break;case'VICTORY':case'COLLAPSE':case _0x452c23(0x194):case _0x452c23(0x277):case _0x452c23(0x3a7):return 0x2;break;default:return VisuMZ[_0x452c23(0x424)]['Game_CharacterBase_pattern'][_0x452c23(0x1ee)](this);break;}},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x113)]=function(){const _0x3756cf=_0x1d5a8d;this[_0x3756cf(0x406)]=!![];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2d2)]=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x41c)]=function(){const _0x2b401d=_0x1d5a8d;this[_0x2b401d(0x325)]=!![];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1ba)]=function(){const _0x29e987=_0x1d5a8d;this[_0x29e987(0x325)]=![];},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x308)]=function(){const _0x1a4b28=_0x1d5a8d;if(this[_0x1a4b28(0x226)]())return![];if(this['_isObjectCharacter'])return![];if(this['_transparent'])return![];if(this[_0x1a4b28(0x1a3)]==='')return![];if(this['constructor']===Game_Vehicle)return![];return!![];},Game_CharacterBase['prototype']['isShadowShrink']=function(){const _0x531157=_0x1d5a8d;if(this[_0x531157(0x39a)]())return!![];if(this['constructor']===Game_Player&&this[_0x531157(0x2d3)]())return!![];return![];},Game_CharacterBase['prototype'][_0x1d5a8d(0x54c)]=function(){const _0x42f05b=_0x1d5a8d;return VisuMZ[_0x42f05b(0x424)][_0x42f05b(0x1d2)][_0x42f05b(0x12e)]['DefaultShadow'];},Game_CharacterBase['prototype']['shadowX']=function(){const _0x112e9c=_0x1d5a8d;return this[_0x112e9c(0x23a)]();},Game_CharacterBase['prototype'][_0x1d5a8d(0x1c8)]=function(){const _0x1a9a74=_0x1d5a8d;return this[_0x1a9a74(0xa5)]()+this['shiftY']()+this[_0x1a9a74(0x4f0)]();},Game_Character[_0x1d5a8d(0x1cf)]['findDiagonalDirectionTo']=function(_0x2ae9e4,_0x286992){const _0x29f901=_0x1d5a8d,_0x7db7f=this[_0x29f901(0x19b)](),_0xb215c9=$gameMap['width'](),_0x2f20bb=[],_0x23451f=[],_0x1f2637=[],_0x1b9d32={};let _0x39a9c9=_0x1b9d32;if(this['x']===_0x2ae9e4&&this['y']===_0x286992)return 0x0;_0x1b9d32[_0x29f901(0x2cd)]=null,_0x1b9d32['x']=this['x'],_0x1b9d32['y']=this['y'],_0x1b9d32['g']=0x0,_0x1b9d32['f']=$gameMap['distance'](_0x1b9d32['x'],_0x1b9d32['y'],_0x2ae9e4,_0x286992),_0x2f20bb[_0x29f901(0x2a1)](_0x1b9d32),_0x23451f[_0x29f901(0x2a1)](_0x1b9d32['y']*_0xb215c9+_0x1b9d32['x']);while(_0x2f20bb['length']>0x0){if('zKCWa'===_0x29f901(0x1dc)){function _0x8742d4(){const _0x343b2a=_0x29f901;if(this[_0x343b2a(0x444)]===_0x4e25ec)this[_0x343b2a(0x185)]();const _0x4ceba6='Map%1-Event%2'['format'](_0x1d7ed8,_0x1d5301);this[_0x343b2a(0x444)][_0x4ceba6]={'iconIndex':_0xf3a1d,'bufferX':_0x7b6243,'bufferY':_0x5a488e,'blendMode':_0x5edcf8};}}else{let _0x591b18=0x0;for(let _0x33adac=0x0;_0x33adac<_0x2f20bb[_0x29f901(0xd6)];_0x33adac++){_0x2f20bb[_0x33adac]['f']<_0x2f20bb[_0x591b18]['f']&&(_0x591b18=_0x33adac);}const _0x24b894=_0x2f20bb[_0x591b18],_0x58f6a0=_0x24b894['x'],_0x114f8d=_0x24b894['y'],_0x312fce=_0x114f8d*_0xb215c9+_0x58f6a0,_0x5b5f65=_0x24b894['g'];_0x2f20bb['splice'](_0x591b18,0x1),_0x23451f['splice'](_0x23451f[_0x29f901(0x1b9)](_0x312fce),0x1),_0x1f2637[_0x29f901(0x2a1)](_0x312fce);if(_0x24b894['x']===_0x2ae9e4&&_0x24b894['y']===_0x286992){_0x39a9c9=_0x24b894;break;}if(_0x5b5f65>=_0x7db7f){if(_0x29f901(0x35c)===_0x29f901(0x35c))continue;else{function _0xc60fd7(){const _0x55f7e3=_0x29f901;if(!this[_0x55f7e3(0x53e)]())return;this[_0x55f7e3(0x2eb)]();}}}const _0x2ac922=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x183c5e=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x3da1f3=0x1;_0x3da1f3<0xa;_0x3da1f3++){if(_0x3da1f3===0x5)continue;const _0x11310d=_0x3da1f3,_0xbd2e5e=_0x2ac922[_0x3da1f3],_0x52a4f7=_0x183c5e[_0x3da1f3],_0x110fcf=$gameMap[_0x29f901(0x158)](_0x58f6a0,_0x11310d),_0x4f7b9f=$gameMap[_0x29f901(0x3f6)](_0x114f8d,_0x11310d),_0x161b3a=_0x4f7b9f*_0xb215c9+_0x110fcf;if(_0x1f2637[_0x29f901(0x26d)](_0x161b3a))continue;if(this[_0x29f901(0x214)]===Game_Player&&VisuMZ[_0x29f901(0x424)][_0x29f901(0x1d2)]['Movement'][_0x29f901(0x415)]){if(!this[_0x29f901(0xa9)](_0x58f6a0,_0x114f8d,_0xbd2e5e))continue;if(!this[_0x29f901(0xa9)](_0x58f6a0,_0x114f8d,_0x52a4f7))continue;}if(!this[_0x29f901(0x493)](_0x58f6a0,_0x114f8d,_0xbd2e5e,_0x52a4f7))continue;const _0x2f3b5c=_0x5b5f65+0x1,_0x90c025=_0x23451f[_0x29f901(0x1b9)](_0x161b3a);if(_0x90c025<0x0||_0x2f3b5c<_0x2f20bb[_0x90c025]['g']){let _0xedff8f={};if(_0x90c025>=0x0)_0xedff8f=_0x2f20bb[_0x90c025];else{if(_0x29f901(0x152)==='uhyMZ'){function _0x2d1af2(){const _0x2c5017=_0x29f901;_0x27f716[0x2]=_0x1bc3bf(_0x51f50b)[_0x2c5017(0x25d)](0x0)[_0x2c5017(0xcf)]()['trim']();}}else _0x2f20bb['push'](_0xedff8f),_0x23451f['push'](_0x161b3a);}_0xedff8f[_0x29f901(0x2cd)]=_0x24b894,_0xedff8f['x']=_0x110fcf,_0xedff8f['y']=_0x4f7b9f,_0xedff8f['g']=_0x2f3b5c,_0xedff8f['f']=_0x2f3b5c+$gameMap[_0x29f901(0x49f)](_0x110fcf,_0x4f7b9f,_0x2ae9e4,_0x286992),(!_0x39a9c9||_0xedff8f['f']-_0xedff8f['g']<_0x39a9c9['f']-_0x39a9c9['g'])&&(_0x39a9c9=_0xedff8f);}}}}let _0x5b38c0=_0x39a9c9;while(_0x5b38c0['parent']&&_0x5b38c0[_0x29f901(0x2cd)]!==_0x1b9d32){_0x5b38c0=_0x5b38c0[_0x29f901(0x2cd)];}const _0x5dec0c=$gameMap[_0x29f901(0x2ca)](_0x5b38c0['x'],_0x1b9d32['x']),_0x5b466d=$gameMap[_0x29f901(0x135)](_0x5b38c0['y'],_0x1b9d32['y']);if(_0x5dec0c<0x0&&_0x5b466d>0x0)return 0x1;if(_0x5dec0c>0x0&&_0x5b466d>0x0)return 0x3;if(_0x5dec0c<0x0&&_0x5b466d<0x0)return 0x7;if(_0x5dec0c>0x0&&_0x5b466d<0x0)return 0x9;if(_0x5b466d>0x0)return 0x2;if(_0x5dec0c<0x0)return 0x4;if(_0x5dec0c>0x0)return 0x6;if(_0x5b466d<0x0)return 0x8;const _0x277d35=this[_0x29f901(0x2f4)](_0x2ae9e4),_0x4ab415=this['deltaYFrom'](_0x286992);if(Math[_0x29f901(0x263)](_0x277d35)>Math[_0x29f901(0x263)](_0x4ab415))return _0x277d35>0x0?0x4:0x6;else{if(_0x4ab415!==0x0){if(_0x29f901(0x4fd)==='gGSHU')return _0x4ab415>0x0?0x8:0x2;else{function _0x5ef3bc(){return![];}}}}return 0x0;},VisuMZ[_0x1d5a8d(0x424)]['Game_CharacterBase_canPass']=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa9)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa9)]=function(_0x36de7f,_0x4d2718,_0x3a3cff){const _0x3d003a=_0x1d5a8d;if(this['_vehicleType']==='airship'){if('naJfr'===_0x3d003a(0x18c))return this['vehicle']()['isAirshipPassable'](_0x36de7f,_0x4d2718,_0x3a3cff);else{function _0x445603(){const _0x36ff88=_0x3d003a;if(_0x2c096c!=='')_0x1dd2cd+='\x0a';_0x120d8b+=_0x1eb43b[_0x36ff88(0x3b0)][0x0];}}}else{if(_0x3d003a(0x4f2)!=='Alido'){function _0x9951ce(){const _0x504907=_0x3d003a,_0x733f7d=_0x4208a4[_0x504907(0x424)][_0x504907(0x1d2)],_0x4fe3f=_0x504907(0x139)['format'](_0xa1b1c1['_mapId'],_0x581924['_eventId']);return this[_0x504907(0x444)][_0x4fe3f]=this['_EventIcons'][_0x4fe3f]||{'iconIndex':0x0,'bufferX':_0x733f7d[_0x504907(0x170)][_0x504907(0xe9)],'bufferY':_0x733f7d[_0x504907(0x170)]['BufferY'],'blendMode':_0x733f7d[_0x504907(0x170)][_0x504907(0x33a)]},this['_EventIcons'][_0x4fe3f];}}else return VisuMZ[_0x3d003a(0x424)][_0x3d003a(0x48e)][_0x3d003a(0x1ee)](this,_0x36de7f,_0x4d2718,_0x3a3cff);}},Game_CharacterBase['prototype'][_0x1d5a8d(0xb1)]=function(){const _0x1bcdbb=_0x1d5a8d;this[_0x1bcdbb(0x4f5)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x34e)]=Game_CharacterBase[_0x1d5a8d(0x1cf)]['screenX'],Game_CharacterBase['prototype'][_0x1d5a8d(0x23a)]=function(){const _0x5d7a0c=_0x1d5a8d;return VisuMZ[_0x5d7a0c(0x424)][_0x5d7a0c(0x34e)][_0x5d7a0c(0x1ee)](this)+(this[_0x5d7a0c(0x4f5)]||0x0);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x318)]=Game_CharacterBase['prototype'][_0x1d5a8d(0xa5)],Game_CharacterBase['prototype'][_0x1d5a8d(0xa5)]=function(){const _0x322889=_0x1d5a8d;return VisuMZ[_0x322889(0x424)][_0x322889(0x318)]['call'](this)+(this[_0x322889(0x51b)]||0x0);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1dd)]=function(){const _0x626b2a=_0x1d5a8d;this[_0x626b2a(0x1b1)]='';},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x402)]=Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x25e)],Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x25e)]=function(){const _0x258f4d=_0x1d5a8d;if(this['_patternLocked'])return;if(this[_0x258f4d(0x47b)]())return;VisuMZ[_0x258f4d(0x424)][_0x258f4d(0x402)][_0x258f4d(0x1ee)](this);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x47b)]=function(){const _0x457e6c=_0x1d5a8d;if(!this[_0x457e6c(0x133)]()&&this[_0x457e6c(0x1ad)]>0x0)return![];switch(String(this[_0x457e6c(0x1b1)])['toUpperCase']()[_0x457e6c(0x35f)]()){case _0x457e6c(0x4eb):this[_0x457e6c(0x4be)]+=0x1;if(this[_0x457e6c(0x4be)]>0x2)this['setPattern'](0x0);break;case _0x457e6c(0x2dd):this['_pattern']-=0x1;if(this[_0x457e6c(0x4be)]<0x0)this[_0x457e6c(0xa0)](0x2);break;case _0x457e6c(0xc2):case'SPIN\x20CW':this[_0x457e6c(0x233)]();break;case _0x457e6c(0x3df):case _0x457e6c(0xae):case _0x457e6c(0x481):case'SPIN\x20ACW':this[_0x457e6c(0x258)]();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x1d5a8d(0x4e3)]=function(){const _0x12cff7=_0x1d5a8d;return $gameSystem[_0x12cff7(0x4e3)](this);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x391)]=function(){const _0x3378a6=_0x1d5a8d,_0x4c4fb2=this[_0x3378a6(0x4e3)]();if(!_0x4c4fb2)return![];return _0x4c4fb2['iconIndex']>0x0;},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x52d)]=function(){const _0x2a3371=_0x1d5a8d,_0x5e3990=this[_0x2a3371(0x495)]();return $gameMap[_0x2a3371(0x158)](this['x'],_0x5e3990);},Game_CharacterBase['prototype']['frontY']=function(){const _0x3a762c=_0x1d5a8d,_0x2cc2eb=this[_0x3a762c(0x495)]();return $gameMap['roundYWithDirection'](this['y'],_0x2cc2eb);},Game_CharacterBase[_0x1d5a8d(0x1cf)]['backX']=function(){const _0x3d17a7=_0x1d5a8d,_0x535c58=this[_0x3d17a7(0x3ec)](this['direction']());return $gameMap[_0x3d17a7(0x158)](this['x'],_0x535c58);},Game_CharacterBase[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x38e)]=function(){const _0x2cc8b4=_0x1d5a8d,_0x39d2f4=this[_0x2cc8b4(0x3ec)](this[_0x2cc8b4(0x495)]());return $gameMap[_0x2cc8b4(0x3f6)](this['y'],_0x39d2f4);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x1d1)]=Game_Character['prototype'][_0x1d5a8d(0x33e)],Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x33e)]=function(_0x135422){const _0x56681c=_0x1d5a8d;route=JsonEx[_0x56681c(0x1ec)](_0x135422),VisuMZ['EventsMoveCore'][_0x56681c(0x1d1)][_0x56681c(0x1ee)](this,route);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x4dd)]=Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4aa)],Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4aa)]=function(_0x107919){const _0x17ef46=_0x1d5a8d;route=JsonEx[_0x17ef46(0x1ec)](_0x107919),VisuMZ[_0x17ef46(0x424)][_0x17ef46(0x4dd)][_0x17ef46(0x1ee)](this,route);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x511)]=Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x267)],Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x267)]=function(_0x550718){const _0x39410e=_0x1d5a8d,_0xe92d6e=Game_Character,_0x26b0b7=_0x550718[_0x39410e(0x3b0)];if(_0x550718[_0x39410e(0x1f3)]===_0xe92d6e['ROUTE_SCRIPT']){if('HUfFP'===_0x39410e(0x264)){let _0x2e53eb=_0x550718[_0x39410e(0x3b0)][0x0];_0x2e53eb=this[_0x39410e(0x202)](_0x2e53eb),_0x2e53eb=this[_0x39410e(0x2af)](_0x2e53eb),this[_0x39410e(0x285)](_0x550718,_0x2e53eb);}else{function _0x3a5494(){const _0x81631e=_0x39410e;_0x5c47f7['ConvertParams'](_0x1eea07,_0x56dd19);const _0x22af73=_0x506437[_0x81631e(0x4c5)];_0x4e067b[_0x81631e(0x2e0)](_0x22af73);}}}else VisuMZ['EventsMoveCore'][_0x39410e(0x511)][_0x39410e(0x1ee)](this,_0x550718);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x202)]=function(_0x436fe1){const _0x2182e7=_0x1d5a8d,_0x4a8507=/\$gameVariables\.value\((\d+)\)/gi,_0x2f02a7=/\\V\[(\d+)\]/gi;while(_0x436fe1[_0x2182e7(0x403)](_0x4a8507)){_0x436fe1=_0x436fe1[_0x2182e7(0x16b)](_0x4a8507,(_0x494ed0,_0x5ea89f)=>$gameVariables[_0x2182e7(0x4d8)](parseInt(_0x5ea89f)));}while(_0x436fe1[_0x2182e7(0x403)](_0x2f02a7)){if(_0x2182e7(0x15e)===_0x2182e7(0x551)){function _0x250445(){const _0x5261ec=_0x2182e7;return this[_0x5261ec(0x113)]();}}else _0x436fe1=_0x436fe1['replace'](_0x2f02a7,(_0x269f86,_0x179b76)=>$gameVariables[_0x2182e7(0x4d8)](parseInt(_0x179b76)));}return _0x436fe1;},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2af)]=function(_0x3be66e){const _0x1a6abe=_0x1d5a8d,_0x862546=/\\SELFVAR\[(\d+)\]/gi;while(_0x3be66e['match'](_0x862546)){_0x3be66e=_0x3be66e[_0x1a6abe(0x16b)](_0x862546,(_0x498cc3,_0x4b736c)=>getSelfVariableValue(this[_0x1a6abe(0x4a4)],this['_eventId'],parseInt(_0x4b736c)));}return _0x3be66e;},Game_Character[_0x1d5a8d(0x1cf)]['processMoveCommandEventsMoveCore']=function(_0x12db5c,_0x4ef52d){const _0x1473e0=_0x1d5a8d;if(_0x4ef52d[_0x1473e0(0x403)](/ANIMATION:[ ](\d+)/i))return this[_0x1473e0(0x51a)](Number(RegExp['$1']));if(_0x4ef52d['match'](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x4ef52d[_0x1473e0(0x403)](/FADE IN:[ ](\d+)/i))return this[_0x1473e0(0x1ce)](Number(RegExp['$1']));if(_0x4ef52d[_0x1473e0(0x403)](/FADE OUT:[ ](\d+)/i)){if(_0x1473e0(0x31e)!==_0x1473e0(0x31e)){function _0x321d70(){const _0x42dc58=_0x1473e0;this[_0x42dc58(0x49d)]=![],this[_0x42dc58(0x541)]=-0x1,this[_0x42dc58(0x3d3)]=0x0;}}else return this[_0x1473e0(0x460)](Number(RegExp['$1']));}if(_0x4ef52d['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x1473e0(0xc7)!==_0x1473e0(0xdf))return this[_0x1473e0(0x113)]();else{function _0x20b9b1(){const _0x163db7=_0x1473e0,_0x4bced4=[_0x16b860[_0x163db7(0x4a4)],_0x242efb[_0x163db7(0x1fb)],_0x163db7(0x23d)[_0x163db7(0x3eb)](_0x27189a)];return _0x41e875['value'](_0x4bced4);}}}if(_0x4ef52d['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x1473e0(0x542)===_0x1473e0(0x27c)){function _0x261811(){const _0x1482a3=_0x1473e0;if(this['_followerControlID']===_0x508c1a)this[_0x1482a3(0x44e)]();this[_0x1482a3(0x49c)]=_0x56987b;;}}else return this[_0x1473e0(0x2d2)]();}if(_0x4ef52d[_0x1473e0(0x403)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x1473e0(0x41c)]();if(_0x4ef52d['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)){if(_0x1473e0(0x1b6)===_0x1473e0(0x27e)){function _0x5b2048(){const _0xe5f116=_0x1473e0;this[_0xe5f116(0x1df)]='',this['_poseDuration']=0x0;}}else return this[_0x1473e0(0x1ba)]();}if(_0x4ef52d[_0x1473e0(0x403)](/HUG:[ ]LEFT/i)){if(_0x1473e0(0x2fb)!==_0x1473e0(0x2fb)){function _0x2441e1(){const _0x2a6671=_0x1473e0;_0x4a9dd6[_0x2a6671(0x37e)](_0x3d24a5)?this[_0x2a6671(0x414)](_0x2291ad,_0x51d754):_0x3e6306[_0x2a6671(0x424)][_0x2a6671(0x397)][_0x2a6671(0x1ee)](this,_0xbb08ac,_0x373241);}}else return this['processMoveRouteHugWall'](_0x1473e0(0x349));}if(_0x4ef52d[_0x1473e0(0x403)](/HUG:[ ]RIGHT/i)){if('PhjBq'!==_0x1473e0(0x26c))return this[_0x1473e0(0x506)](_0x1473e0(0x4f4));else{function _0x5a1e74(){const _0x5bb576=_0x1473e0;_0x179191[_0x5bb576(0x1cf)][_0x5bb576(0x4f3)][_0x5bb576(0x1ee)](this),this[_0x5bb576(0x100)]=![];}}}if(_0x4ef52d[_0x1473e0(0x403)](/INDEX:[ ](\d+)/i))return this[_0x1473e0(0x16f)](Number(RegExp['$1']));if(_0x4ef52d[_0x1473e0(0x403)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x239029=this[_0x1473e0(0x136)]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0x239029);}if(_0x4ef52d[_0x1473e0(0x403)](/JUMP FORWARD:[ ](\d+)/i)){if(_0x1473e0(0x2fc)!==_0x1473e0(0x2fc)){function _0x41ad23(){const _0x5f40d0=_0x1473e0,_0xa23681={'template':_0x5f40d0(0x279),'mapId':0x1,'eventId':0xc,'x':_0x45f0ea['x']+0x1,'y':_0x4775e0['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x5f40d0(0x3ea)][_0x5f40d0(0xd6)]+0x3e8};this[_0x5f40d0(0x3f3)](_0xa23681);}}else return this['processMoveRouteJumpForward'](Number(RegExp['$1']));}if(_0x4ef52d[_0x1473e0(0x403)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x1473e0(0x3dd)!==_0x1473e0(0x3dd)){function _0x336d26(){const _0x57be2e=_0x1473e0;this['_spriteOffsetX']=_0x3590c3(_0x2371f9['$1']),this[_0x57be2e(0x51b)]=_0x4350e1(_0x5bec8c['$2']);}}else return this[_0x1473e0(0x352)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x4ef52d[_0x1473e0(0x403)](/JUMP TO EVENT:[ ](\d+)/i)){if('UwrYf'!==_0x1473e0(0x2b5)){const _0x3a7f81=$gameMap['event'](Number(RegExp['$1']));return this[_0x1473e0(0x142)](_0x3a7f81);}else{function _0x3847c7(){const _0xcb50b3=_0x1473e0;_0x2b01be=this[_0xcb50b3(0x260)](_0x124a40,_0xacb4a4);}}}if(_0x4ef52d['match'](/JUMP TO PLAYER/i))return this[_0x1473e0(0x142)]($gamePlayer);if(_0x4ef52d[_0x1473e0(0x403)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if(_0x1473e0(0x419)!=='EUmpN'){function _0x44ddef(){const _0x3f08bb=_0x1473e0;return this[_0x3f08bb(0x53d)](0x3);}}else{const _0x19d793=String(RegExp['$1']),_0x5b4c0e=this[_0x1473e0(0x189)](_0x4ef52d);return this[_0x1473e0(0xb7)](_0x19d793,_0x5b4c0e);}}if(_0x4ef52d[_0x1473e0(0x403)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x1473e0(0x53f)===_0x1473e0(0x53f)){const _0x118444=Number(RegExp['$1']),_0x5afb88=Number(RegExp['$2']),_0x276246=this[_0x1473e0(0x189)](_0x4ef52d);return this[_0x1473e0(0x389)](_0x118444,_0x5afb88,_0x276246);}else{function _0x3ff284(){const _0x2e6e79=_0x1473e0;if(_0x5a680a||this[_0x2e6e79(0x10c)]()){if(_0x2baf1f>0x0&&_0x555f29<0x0)return 0x9;if(_0x85e45a<0x0&&_0xfb32b6<0x0)return 0x7;if(_0x43b21b>0x0&&_0x404c7>0x0)return 0x3;if(_0x7ec455<0x0&&_0x463820>0x0)return 0x1;}}}}if(_0x4ef52d[_0x1473e0(0x403)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x24e78b=$gameMap['event'](Number(RegExp['$1'])),_0x250eeb=this[_0x1473e0(0x189)](_0x4ef52d);return this[_0x1473e0(0x40d)](_0x24e78b,_0x250eeb);}if(_0x4ef52d[_0x1473e0(0x403)](/MOVE TO PLAYER/i)){const _0x61ec86=this['checkCollisionKeywords'](_0x4ef52d);return this[_0x1473e0(0x40d)]($gamePlayer,_0x61ec86);}if(_0x4ef52d[_0x1473e0(0x403)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x1473e0(0x54f)](0x1,Number(RegExp['$1']));if(_0x4ef52d[_0x1473e0(0x403)](/MOVE DOWN:[ ](\d+)/i))return this[_0x1473e0(0x54f)](0x2,Number(RegExp['$1']));if(_0x4ef52d[_0x1473e0(0x403)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x1473e0(0x54f)](0x3,Number(RegExp['$1']));if(_0x4ef52d[_0x1473e0(0x403)](/MOVE LEFT:[ ](\d+)/i)){if(_0x1473e0(0x379)==='kGwtj'){function _0x1035fc(){const _0x27bc2a=_0x1473e0;if(!_0x3a4ac4['isWorking']())return;_0x44b504['ConvertParams'](_0x554941,_0x3b7af7);let _0x3783f6=0x0;_0x3783f6+=_0x2a4f35[_0x27bc2a(0x28f)],_0x3783f6+=_0x154302['Seconds']*0x3c,_0x3783f6+=_0x74fdb6[_0x27bc2a(0x1c5)]*0x3c*0x3c,_0x3783f6+=_0x24d072['Hours']*0x3c*0x3c*0x3c,_0x50997f['gainFrames'](_0x3783f6);}}else return this[_0x1473e0(0x54f)](0x4,Number(RegExp['$1']));}if(_0x4ef52d[_0x1473e0(0x403)](/MOVE RIGHT:[ ](\d+)/i)){if(_0x1473e0(0xca)===_0x1473e0(0xca))return this[_0x1473e0(0x54f)](0x6,Number(RegExp['$1']));else{function _0x3582da(){const _0x2b9522=_0x1473e0;this[_0x2b9522(0x40c)]=!![];}}}if(_0x4ef52d[_0x1473e0(0x403)](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x4ef52d[_0x1473e0(0x403)](/MOVE UP:[ ](\d+)/i)){if('BqZne'!=='nfWkk')return this[_0x1473e0(0x54f)](0x8,Number(RegExp['$1']));else{function _0x5807ae(){const _0x2904ab=_0x1473e0;if(this[_0x2904ab(0x30f)]===_0x542c9a)this[_0x2904ab(0x185)]();if(!_0x4f99a1)return;const _0x4314e7=_0x2904ab(0x139)[_0x2904ab(0x3eb)](_0x52292e[_0x2904ab(0x4a4)],_0x189c45[_0x2904ab(0x1fb)]);return this['_PreservedEventMorphData'][_0x4314e7];}}}if(_0x4ef52d[_0x1473e0(0x403)](/MOVE UPPER RIGHT:[ ](\d+)/i)){if(_0x1473e0(0x370)==='MrTHR')return this[_0x1473e0(0x54f)](0x9,Number(RegExp['$1']));else{function _0x27d962(){const _0x43fa7a=_0x1473e0;_0x16a6d2[_0x43fa7a(0x50a)](_0x344cf9[_0x332e29]);}}}if(_0x4ef52d[_0x1473e0(0x403)](/OPACITY:[ ](\d+)([%％])/i)){const _0x512ef3=Math[_0x1473e0(0x4ff)](Number(RegExp['$1'])/0x64*0xff);return this[_0x1473e0(0x153)](_0x512ef3[_0x1473e0(0x39c)](0x0,0xff));}if(_0x4ef52d[_0x1473e0(0x403)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x322b04=this['_opacity']+Math[_0x1473e0(0x4ff)](Number(RegExp['$1'])/0x64*0xff);return this[_0x1473e0(0x153)](_0x322b04[_0x1473e0(0x39c)](0x0,0xff));}if(_0x4ef52d['match'](/OPACITY:[ ]([\+\-]\d+)/i)){if('PYveP'===_0x1473e0(0x2b0)){function _0x3623a2(){const _0x3e847e=_0x1473e0;this[_0x3e847e(0x3ae)]=_0x3e93c4(_0x3ad20c['$1'])||0x0;}}else{const _0x4200b9=this[_0x1473e0(0x30c)]+Number(RegExp['$1']);return this['setOpacity'](_0x4200b9[_0x1473e0(0x39c)](0x0,0xff));}}if(_0x4ef52d[_0x1473e0(0x403)](/PATTERN LOCK:[ ](\d+)/i))return this['processMoveRoutePatternLock'](Number(RegExp['$1']));if(_0x4ef52d['match'](/PATTERN UNLOCK/i)){if(_0x1473e0(0x40f)===_0x1473e0(0x483)){function _0x5e7365(){const _0x548adc=_0x1473e0,_0xda0aec=_0x1fce63[_0x548adc(0x348)]()||this;if(_0xda0aec['constructor']!==_0x397011)_0x49b652[_0x548adc(0x424)][_0x548adc(0x469)][_0x548adc(0x1ee)](this,_0x3ef395,_0x2c0f7e);else{const _0x3117c5=[_0xda0aec[_0x548adc(0x4a4)],_0xda0aec[_0x548adc(0x1fb)],_0x548adc(0x22b)[_0x548adc(0x3eb)](_0x5dd6ec)];_0x4b30fb['setValue'](_0x3117c5,_0x48740d);}}}else return this['_patternLocked']=![];}if(_0x4ef52d[_0x1473e0(0x403)](/POSE:[ ](.*)/i)){const _0x5c5db7=String(RegExp['$1'])[_0x1473e0(0xcf)]()['trim']();return this['setPose'](_0x5c5db7);}if(_0x4ef52d[_0x1473e0(0x403)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x1473e0(0x344)!==_0x1473e0(0x307)){const _0x174119=Number(RegExp['$1']),_0x52a33b=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x174119,_0x52a33b);}else{function _0x5d995f(){const _0x2efc69=_0x1473e0;this['_poseDuration']--;if(this[_0x2efc69(0x4a0)]<=0x0&&this[_0x2efc69(0x1df)]!=='ZZZ')this[_0x2efc69(0x4b4)]();}}}if(_0x4ef52d[_0x1473e0(0x403)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x1fcd18=$gameMap[_0x1473e0(0x505)](Number(RegExp['$1']));return this[_0x1473e0(0x107)](_0x1fcd18);}if(_0x4ef52d[_0x1473e0(0x403)](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToPlayer']($gamePlayer);if(_0x4ef52d['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x1473e0(0x21a)===_0x1473e0(0x4d3)){function _0xe58cec(){const _0x29dec9=_0x1473e0;return _0x47b6b9[_0x29dec9(0x424)][_0x29dec9(0x1c2)][_0x29dec9(0x1ee)](this,_0x1581c1);}}else return this['moveAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x4ef52d[_0x1473e0(0x403)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x2d8da0=$gameMap[_0x1473e0(0x505)](Number(RegExp['$1']));return this[_0x1473e0(0x269)](_0x2d8da0);}if(_0x4ef52d['match'](/STEP AWAY FROM PLAYER/i))return this[_0x1473e0(0x269)]($gamePlayer);if(_0x4ef52d['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x1473e0(0x47c)!=='PSrpx')return this[_0x1473e0(0x401)](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x4ed5f3(){const _0x57d091=_0x1473e0;if([0x2,0x4,0x6,0x8][_0x57d091(0x26d)](_0x4522e3))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x3ae12b))return 0x3;}}}if(_0x4ef52d[_0x1473e0(0x403)](/TURN TO EVENT:[ ](\d+)/i)){const _0xb29d4c=$gameMap[_0x1473e0(0x505)](Number(RegExp['$1']));return this[_0x1473e0(0x13d)](_0xb29d4c);}if(_0x4ef52d[_0x1473e0(0x403)](/TURN TO PLAYER/i)){if(_0x1473e0(0x252)!==_0x1473e0(0x3c8))return this['turnTowardCharacter']($gamePlayer);else{function _0x32d595(){const _0x1b79ec=_0x1473e0;if(this[_0x1b79ec(0x3d3)]===_0x230208)this[_0x1b79ec(0x185)]();this[_0x1b79ec(0x3d3)]=_0x1167bf;}}}if(_0x4ef52d[_0x1473e0(0x403)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x1473e0(0x19a)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x4ef52d[_0x1473e0(0x403)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x3e10f1=$gameMap[_0x1473e0(0x505)](Number(RegExp['$1']));return this[_0x1473e0(0x4ce)](_0x3e10f1);}if(_0x4ef52d['match'](/TURN AWAY FROM PLAYER/i))return this[_0x1473e0(0x4ce)]($gamePlayer);if(_0x4ef52d[_0x1473e0(0x403)](/TURN LOWER LEFT/i))return this[_0x1473e0(0x53d)](0x1);if(_0x4ef52d[_0x1473e0(0x403)](/TURN LOWER RIGHT/i))return this[_0x1473e0(0x53d)](0x3);if(_0x4ef52d[_0x1473e0(0x403)](/TURN UPPER LEFT/i)){if(_0x1473e0(0x10a)!==_0x1473e0(0x27f))return this[_0x1473e0(0x53d)](0x7);else{function _0x4283ce(){const _0x19cf79=_0x1473e0;_0x413f1e[_0x19cf79(0x549)](),this[_0x19cf79(0x519)]();}}}if(_0x4ef52d[_0x1473e0(0x403)](/TURN UPPER RIGHT/i)){if(_0x1473e0(0x21e)!==_0x1473e0(0x21e)){function _0x4f94e2(){const _0x53ee98=_0x1473e0;this[_0x53ee98(0x99)]();}}else return this[_0x1473e0(0x53d)](0x9);}if(_0x4ef52d[_0x1473e0(0x403)](/Self Switch[ ](.*):[ ](.*)/i)){if('LFIZZ'===_0x1473e0(0x500))return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);else{function _0x5c8926(){const _0x51076b=_0x1473e0,_0x3d06bf=_0xe5161a[_0x51076b(0x167)](this);if(!_0x3d06bf)return;this[_0x51076b(0x217)](_0x3d06bf['x'],_0x3d06bf['y']),this[_0x51076b(0x53d)](_0x3d06bf['direction']),this[_0x51076b(0x527)]===_0x3d06bf['pageIndex']&&(this['_moveRouteIndex']=_0x3d06bf['moveRouteIndex']);}}}if(_0x4ef52d[_0x1473e0(0x403)](/Self Variable[ ](.*):[ ](.*)/i)){if(_0x1473e0(0x14f)===_0x1473e0(0x14f))return this[_0x1473e0(0x29d)](RegExp['$1'],RegExp['$2']);else{function _0x170a10(){const _0x143240=_0x1473e0;this[_0x143240(0x261)][_0x143240(0x2d9)]['x']=_0x47a89c['max'](0x0,this[_0x143240(0x261)]['scale']['x']-0.1),this['_shadowSprite'][_0x143240(0x2d9)]['y']=_0x305041[_0x143240(0x456)](0x0,this['_shadowSprite'][_0x143240(0x2d9)]['y']-0.1);}}}if(_0x4ef52d[_0x1473e0(0x403)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('EKYPc'!==_0x1473e0(0x491)){function _0x143659(){const _0xa0de1e=_0x1473e0;this[_0xa0de1e(0xe3)](_0x43954c),this['clearEventCache'](),_0x22842b[_0xa0de1e(0x424)][_0xa0de1e(0x48c)][_0xa0de1e(0x1ee)](this,_0x5a3757),this[_0xa0de1e(0x450)](),this[_0xa0de1e(0x105)](),this[_0xa0de1e(0x4c8)](),this[_0xa0de1e(0x338)](),this[_0xa0de1e(0x492)](),this['clearEventCache']();}}else return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x4ef52d[_0x1473e0(0x403)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x1473e0(0x312)===_0x1473e0(0x2ac)){function _0x519838(){const _0x2060ea=_0x1473e0;return _0x5d05f3[_0x2060ea(0x424)][_0x2060ea(0x41f)][_0x2060ea(0x1ee)](this);}}else{const _0x547591=$gameMap[_0x1473e0(0x505)](Number(RegExp['$1']));return this[_0x1473e0(0x3d7)](_0x547591);}}if(_0x4ef52d[_0x1473e0(0x403)](/TELEPORT TO PLAYER/i))return this[_0x1473e0(0x3d7)]($gamePlayer);try{if('mZmTn'!==_0x1473e0(0x320))VisuMZ[_0x1473e0(0x424)]['Game_Character_processMoveCommand'][_0x1473e0(0x1ee)](this,_0x12db5c);else{function _0x8e13bc(){const _0x466086=_0x1473e0;_0x221829[_0x466086(0x424)][_0x466086(0x395)][_0x466086(0x1ee)](this),this['_spriteset'][_0x466086(0x184)]();}}}catch(_0xe9a1b6){if($gameTemp['isPlaytest']())console[_0x1473e0(0x520)](_0xe9a1b6);}},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x51a)]=function(_0x40b3e8){const _0x3c77cd=_0x1d5a8d;$gameTemp[_0x3c77cd(0x12d)]([this],_0x40b3e8);},Game_Character[_0x1d5a8d(0x1cf)]['processMoveRouteBalloon']=function(_0x988e5e){const _0x33a916=_0x1d5a8d;let _0x1d9160=0x0;switch(_0x988e5e[_0x33a916(0xcf)]()[_0x33a916(0x35f)]()){case'!':case _0x33a916(0x2cf):_0x1d9160=0x1;break;case'?':case _0x33a916(0x32a):_0x1d9160=0x2;break;case _0x33a916(0x431):case _0x33a916(0x12c):case _0x33a916(0x194):case _0x33a916(0x552):case'MUSICNOTE':_0x1d9160=0x3;break;case'HEART':case'LOVE':_0x1d9160=0x4;break;case _0x33a916(0x51e):_0x1d9160=0x5;break;case _0x33a916(0x277):_0x1d9160=0x6;break;case'COBWEB':case'ANNOYED':case _0x33a916(0x288):_0x1d9160=0x7;break;case _0x33a916(0x2f5):case _0x33a916(0x9a):_0x1d9160=0x8;break;case'LIGHT':case _0x33a916(0x275):case _0x33a916(0x3a7):case'LIGHT-BULB':case _0x33a916(0x273):_0x1d9160=0x9;break;case'Z':case'ZZ':case _0x33a916(0xd9):case _0x33a916(0x21c):_0x1d9160=0xa;break;case _0x33a916(0x4cd):_0x1d9160=0xb;break;case'USER-DEFINED\x202':_0x1d9160=0xc;break;case _0x33a916(0xc9):_0x1d9160=0xd;break;case _0x33a916(0x39f):_0x1d9160=0xe;break;case'USER-DEFINED\x205':_0x1d9160=0xf;break;}$gameTemp[_0x33a916(0x461)](this,_0x1d9160);},Game_Character[_0x1d5a8d(0x1cf)]['processMoveRouteFadeIn']=function(_0x279b7e){const _0x4a669f=_0x1d5a8d;_0x279b7e+=this['_opacity'],this[_0x4a669f(0x153)](_0x279b7e[_0x4a669f(0x39c)](0x0,0xff));if(this[_0x4a669f(0x30c)]<0xff)this[_0x4a669f(0x4e9)]--;},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x460)]=function(_0x343f7d){const _0x522c10=_0x1d5a8d;_0x343f7d=this[_0x522c10(0x30c)]-_0x343f7d,this[_0x522c10(0x153)](_0x343f7d[_0x522c10(0x39c)](0x0,0xff));if(this[_0x522c10(0x30c)]>0x0)this[_0x522c10(0x4e9)]--;},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x506)]=function(_0x4601e3){const _0x506f91=_0x1d5a8d,_0x3c69ac=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x4fd842=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x1bbd14=this[_0x506f91(0x495)](),_0x4d1cfe=(_0x4601e3===_0x506f91(0x349)?_0x3c69ac:_0x4fd842)[_0x1bbd14],_0x34589f=(_0x4601e3===_0x506f91(0x349)?_0x4fd842:_0x3c69ac)[_0x1bbd14];if(this[_0x506f91(0xa9)](this['x'],this['y'],_0x4d1cfe)){if(_0x4601e3===_0x506f91(0x349)){if(_0x506f91(0x2c4)==='HzYJq'){function _0x4861f0(){const _0x3c479c=_0x506f91;for(const _0x4b8d51 of _0x56c011[_0x3c479c(0x280)]()){_0x4b8d51[_0x3c479c(0x360)]();}}}else this[_0x506f91(0x258)]();}else{if(_0x506f91(0x504)!=='rOAkB')this[_0x506f91(0x233)]();else{function _0x16298d(){const _0x35d42d=_0x506f91;if(!_0x17c898&&_0x3dbd0d[_0x35d42d(0x9b)]())return![];if(!_0x5e8a69&&_0x4144d8['isAnyEventStarting']())return![];if([_0x35d42d(0x377),_0x35d42d(0x102)]['includes'](this[_0x35d42d(0x45d)]()))return!![];return _0x340e27[_0x35d42d(0x186)](this);}}}}else{if(!this[_0x506f91(0xa9)](this['x'],this['y'],this[_0x506f91(0x495)]())){if(_0x506f91(0x471)!==_0x506f91(0x32c)){if(this[_0x506f91(0xa9)](this['x'],this['y'],_0x34589f)){if(_0x4601e3===_0x506f91(0x349)){if('ZpojR'===_0x506f91(0x2ab))this[_0x506f91(0x233)]();else{function _0x2cfcfc(){const _0x4b046b=_0x506f91;if(_0x2f88e5[_0x4b046b(0x403)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x3d11cc=_0x779fba(_0x4940cf['$1'])[_0x4b046b(0x44f)]()['trim'](),_0x4432f6=_0x5b8c36(_0x381e8e['$2']);this[_0x4b046b(0x462)][_0x3d11cc]=_0x4432f6;}}}}else{if(_0x506f91(0x52a)===_0x506f91(0x52a))this[_0x506f91(0x258)]();else{function _0x19f077(){const _0x230c79=_0x506f91,_0x4b0530=_0x147c18[_0x230c79(0x424)][_0x230c79(0x1d2)][_0x230c79(0x12e)];if(!_0x4b0530['EnableTurnInPlace'])return![];if(_0xd8b809['isDestinationValid']())return![];if(this[_0x230c79(0x3bc)]()||this['isMoving']()||this[_0x230c79(0x39a)]())return![];return this[_0x230c79(0x4b6)]<_0x4b0530[_0x230c79(0x514)];}}}}else this['turn180']();}else{function _0xfcb83(){return![];}}}}if(this[_0x506f91(0xa9)](this['x'],this['y'],this[_0x506f91(0x495)]())){if('rLbir'===_0x506f91(0x497)){function _0x1a0102(){const _0x2290b3=_0x506f91;this[_0x2290b3(0x38f)]+=this[_0x2290b3(0x437)]();}}else this['moveForward']();}},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x16f)]=function(_0x135029){const _0x3e67a9=_0x1d5a8d;if(ImageManager[_0x3e67a9(0x4df)](this[_0x3e67a9(0x1a3)]))return;_0x135029=_0x135029[_0x3e67a9(0x39c)](0x0,0x7),this['setImage'](this[_0x3e67a9(0x1a3)],_0x135029);},Game_Character['prototype'][_0x1d5a8d(0x36a)]=function(_0x551f11){const _0x58b201=_0x1d5a8d;switch(this['direction']()){case 0x1:this[_0x58b201(0x125)](-_0x551f11,_0x551f11);break;case 0x2:this[_0x58b201(0x125)](0x0,_0x551f11);break;case 0x3:this['jump'](_0x551f11,_0x551f11);break;case 0x4:this[_0x58b201(0x125)](-_0x551f11,0x0);break;case 0x6:this[_0x58b201(0x125)](_0x551f11,0x0);break;case 0x7:this[_0x58b201(0x125)](-_0x551f11,-_0x551f11);break;case 0x8:this['jump'](0x0,-_0x551f11);break;case 0x9:this['jump'](_0x551f11,-_0x551f11);break;}},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x352)]=function(_0x116d8f,_0x5b12fc){const _0x5e86c3=_0x1d5a8d,_0x3302ba=Math[_0x5e86c3(0x4ff)](_0x116d8f-this['x']),_0x4a8eda=Math[_0x5e86c3(0x4ff)](_0x5b12fc-this['y']);this[_0x5e86c3(0x125)](_0x3302ba,_0x4a8eda);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x142)]=function(_0x3df851){const _0x2b8482=_0x1d5a8d;if(_0x3df851)this[_0x2b8482(0x352)](_0x3df851['x'],_0x3df851['y']);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4f1)]=function(_0x2b5c27,_0x2e2fd6,_0x1112a5){const _0x3971d5=_0x1d5a8d;let _0x139836=0x0;if(_0x1112a5)$gameTemp['_moveAllowPlayerCollision']=!![];if($gameMap['isSupportDiagonalMovement']()){if('lnQuB'!==_0x3971d5(0x108))_0x139836=this[_0x3971d5(0x1fc)](_0x2b5c27,_0x2e2fd6);else{function _0x7727ea(){const _0xfd783a=_0x3971d5;_0x3024c9[_0xfd783a(0x424)][_0xfd783a(0x546)][_0xfd783a(0x1ee)](this);if(this[_0xfd783a(0x49d)]===_0x2ba6d0)this[_0xfd783a(0x185)]();this['_paused']=![];}}}else _0x139836=this[_0x3971d5(0x260)](_0x2b5c27,_0x2e2fd6);if(_0x1112a5)$gameTemp[_0x3971d5(0x305)]=![];this['executeMoveDir8'](_0x139836),this['setMovementSuccess'](!![]);},Game_Character['prototype'][_0x1d5a8d(0x107)]=function(_0x4d22c0){if(_0x4d22c0)this['processMoveRouteStepTo'](_0x4d22c0['x'],_0x4d22c0['y']);},Game_Character['prototype'][_0x1d5a8d(0x20d)]=function(_0x14e212,_0x53b8e0){const _0x4f8340=_0x1d5a8d,_0x23eab0=this[_0x4f8340(0x2f4)](_0x14e212),_0x5da49f=this[_0x4f8340(0x120)](_0x53b8e0);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x189)]=function(_0x222bb5){const _0x3d41d9=_0x1d5a8d;if(_0x222bb5[_0x3d41d9(0x403)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x222bb5[_0x3d41d9(0x403)](/(?:AVOID|EVADE|DODGE)/i))return![];else{if(_0x3d41d9(0x227)!=='WrklZ'){function _0x26d508(){const _0x16f087=_0x3d41d9;if(_0x28c39f[_0x16f087(0x2e5)][_0x438471]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x1972bd[_0x16f087(0x1e0)][_0x16f087(0x2a1)](_0x3a6514);if(_0x411eb8[_0x16f087(0x2e5)][_0x447be5][_0x16f087(0x403)](/<SELF>/i))_0x125ddc[_0x16f087(0x339)][_0x16f087(0x2a1)](_0xa0f76d);}}else return![];}}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x441)]=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2e7)],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2e7)]=function(_0xfe2ae0,_0x3a6903){const _0x163b42=_0x1d5a8d;if($gameTemp[_0x163b42(0x305)])return![];return VisuMZ[_0x163b42(0x424)]['Game_Event_isCollidedWithPlayerCharacters']['call'](this,_0xfe2ae0,_0x3a6903);},Game_Character['prototype'][_0x1d5a8d(0xb7)]=function(_0x349a49,_0x55980f){const _0x19c9af=_0x1d5a8d,_0x118e25=['',_0x19c9af(0x101),'DOWN',_0x19c9af(0x3e0),_0x19c9af(0x2c6),'',_0x19c9af(0x9c),_0x19c9af(0x4bd),'UP','UPPER\x20RIGHT'],_0x2d7993=_0x118e25[_0x19c9af(0x1b9)](_0x349a49[_0x19c9af(0xcf)]()[_0x19c9af(0x35f)]());if(_0x2d7993<=0x0)return;if(_0x55980f)$gameTemp['_moveAllowPlayerCollision']=!![];if(this['canPass'](this['x'],this['y'],_0x2d7993)){if(_0x19c9af(0x326)!==_0x19c9af(0x326)){function _0x399793(){return this['processMoveRouteFadeIn'](_0x40936e(_0x470fc2['$1']));}}else{if(_0x55980f)$gameTemp[_0x19c9af(0x305)]=![];this[_0x19c9af(0x31f)](_0x2d7993),this[_0x19c9af(0x4e9)]-=0x1;}}if(_0x55980f)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x389)]=function(_0x527af4,_0x2c4d6a,_0x5da7ff){this['processMoveRouteStepTo'](_0x527af4,_0x2c4d6a,_0x5da7ff);if(this['x']!==_0x527af4||this['y']!==_0x2c4d6a)this['_moveRouteIndex']--;},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x40d)]=function(_0x3433a4,_0x1cf903){const _0x19eb5a=_0x1d5a8d;if(_0x3433a4)this[_0x19eb5a(0x389)](_0x3433a4['x'],_0x3433a4['y'],_0x1cf903);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x54f)]=function(_0x3113ae,_0x39be32){const _0x220ea6=_0x1d5a8d;_0x39be32=_0x39be32||0x0;const _0x2c4c41={'code':0x1,'indent':null,'parameters':[]};_0x2c4c41[_0x220ea6(0x1f3)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x3113ae],this[_0x220ea6(0x1f5)]['list'][this[_0x220ea6(0x4e9)]][_0x220ea6(0x3b0)][0x0]='';while(_0x39be32--){this[_0x220ea6(0x1f5)][_0x220ea6(0x36f)][_0x220ea6(0x28e)](this[_0x220ea6(0x4e9)]+0x1,0x0,_0x2c4c41);}},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x388)]=function(_0x35ae3a){this['_patternLocked']=!![],this['setPattern'](_0x35ae3a);},Game_Character[_0x1d5a8d(0x1cf)]['processMoveRouteSelfSwitch']=function(_0x41cf19,_0x3d0f77){const _0x474d1c=_0x1d5a8d;if(this===$gamePlayer)return;const _0x227827=[this[_0x474d1c(0x4a4)],this[_0x474d1c(0x1fb)],'A'];if(_0x41cf19['match'](/\b[ABCD]\b/i)){if('YvrOM'!==_0x474d1c(0xd5)){function _0x49ab48(){const _0x1ab3a4=_0x474d1c;if(!_0x7b6a79&&_0x23e3cb[_0x1ab3a4(0x9b)]())return![];if(!_0x53e5ea&&_0x5c47aa[_0x1ab3a4(0x3b4)]())return![];if(this['activationRegionList']()<=0x0)return!![];return _0x587791[_0x1ab3a4(0x54d)](this);}}else _0x227827[0x2]=String(_0x41cf19)[_0x474d1c(0x25d)](0x0)['toUpperCase']()[_0x474d1c(0x35f)]();}else{if(_0x474d1c(0x3d1)===_0x474d1c(0x3d1))_0x227827[0x2]=_0x474d1c(0x23d)[_0x474d1c(0x3eb)](_0x41cf19);else{function _0x567aea(){const _0x541dff=_0x474d1c;return this[_0x541dff(0x1b2)]===_0x541dff(0x534)?this['vehicle']()[_0x541dff(0x333)](_0x21c38f,_0x422141,_0x2d0038):_0x330492[_0x541dff(0x424)]['Game_CharacterBase_canPass']['call'](this,_0x3dbf0d,_0x3eb5db,_0x5876e8);}}}switch(_0x3d0f77[_0x474d1c(0xcf)]()['trim']()){case'ON':case'TRUE':$gameSelfSwitches[_0x474d1c(0x490)](_0x227827,!![]);break;case _0x474d1c(0xb0):case _0x474d1c(0x145):$gameSelfSwitches[_0x474d1c(0x490)](_0x227827,![]);break;case _0x474d1c(0xe6):$gameSelfSwitches['setValue'](_0x227827,!$gameSelfSwitches[_0x474d1c(0x4d8)](_0x227827));break;}},Game_Character[_0x1d5a8d(0x1cf)]['processMoveRouteSelfVariable']=function(_0xdf6dc3,_0x3b64df){const _0x3c57c7=_0x1d5a8d;if(this===$gamePlayer)return;const _0x9d3fbc=[this[_0x3c57c7(0x4a4)],this['_eventId'],_0x3c57c7(0x22b)[_0x3c57c7(0x3eb)](switchId)];$gameSelfSwitches[_0x3c57c7(0x490)](_0x9d3fbc,Number(_0x3b64df));},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2a7)]=function(_0x224747,_0x1c4289){const _0x197ecd=_0x1d5a8d;this[_0x197ecd(0x217)](_0x224747,_0x1c4289);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3d7)]=function(_0x370b2b){const _0x4addae=_0x1d5a8d;if(_0x370b2b)this[_0x4addae(0x2a7)](_0x370b2b['x'],_0x370b2b['y']);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x233)]=function(){const _0x3cbd18=_0x1d5a8d;switch(this[_0x3cbd18(0x495)]()){case 0x1:this[_0x3cbd18(0x53d)](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0x3cbd18(0x53d)](0x1);break;case 0x4:this[_0x3cbd18(0x53d)](0x8);break;case 0x6:this['setDirection'](0x2);break;case 0x7:this[_0x3cbd18(0x53d)](0x9);break;case 0x8:this[_0x3cbd18(0x53d)](0x6);break;case 0x9:this[_0x3cbd18(0x53d)](0x3);break;}},Game_Character['prototype'][_0x1d5a8d(0x258)]=function(){const _0x4cac91=_0x1d5a8d;switch(this[_0x4cac91(0x495)]()){case 0x1:this[_0x4cac91(0x53d)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x4cac91(0x53d)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x4cac91(0x53d)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x4cac91(0x53d)](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character['prototype'][_0x1d5a8d(0x2b7)]=function(_0x3315ed,_0x2cb7d3,_0x7b955f){const _0x5e0897=_0x1d5a8d,_0x325a9a=this[_0x5e0897(0x2f4)](_0x3315ed),_0x5011dc=this[_0x5e0897(0x120)](_0x2cb7d3);if($gameMap[_0x5e0897(0x22a)]()){if(_0x5e0897(0x540)===_0x5e0897(0x358)){function _0x459bd2(){const _0xda101=_0x5e0897,_0x48d44a=this[_0xda101(0x4fe)]();return _0x48d44a?_0x48d44a[_0xda101(0x1fb)]:0x0;}}else{if(_0x7b955f||this[_0x5e0897(0x10c)]()){if(_0x325a9a>0x0&&_0x5011dc<0x0)return 0x1;if(_0x325a9a<0x0&&_0x5011dc<0x0)return 0x3;if(_0x325a9a>0x0&&_0x5011dc>0x0)return 0x7;if(_0x325a9a<0x0&&_0x5011dc>0x0)return 0x9;}}}if(Math[_0x5e0897(0x263)](_0x325a9a)>Math[_0x5e0897(0x263)](_0x5011dc))return _0x325a9a>0x0?0x4:0x6;else{if(_0x5011dc!==0x0)return _0x5011dc>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype'][_0x1d5a8d(0xe1)]=function(_0x50d326,_0x46cc16,_0x438e06){const _0x5c0030=_0x1d5a8d,_0x1b31f2=this[_0x5c0030(0x2f4)](_0x50d326),_0x294cdd=this[_0x5c0030(0x120)](_0x46cc16);if($gameMap['isSupportDiagonalMovement']()){if('fIhVJ'!==_0x5c0030(0xb5)){if(_0x438e06||this['isSpriteVS8dir']()){if('tkYEZ'===_0x5c0030(0x3cd)){if(_0x1b31f2>0x0&&_0x294cdd<0x0)return 0x9;if(_0x1b31f2<0x0&&_0x294cdd<0x0)return 0x7;if(_0x1b31f2>0x0&&_0x294cdd>0x0)return 0x3;if(_0x1b31f2<0x0&&_0x294cdd>0x0)return 0x1;}else{function _0x2e0d78(){const _0x12e689=_0x5c0030;return''[_0x12e689(0xcf)]()[_0x12e689(0x35f)]();}}}}else{function _0x2af722(){const _0x4ea509=_0x5c0030;return _0x48ddd9[_0x4ea509(0x237)]();}}}if(Math[_0x5c0030(0x263)](_0x1b31f2)>Math['abs'](_0x294cdd))return _0x1b31f2>0x0?0x6:0x4;else{if(_0x294cdd!==0x0)return _0x294cdd>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype'][_0x1d5a8d(0x401)]=function(_0x20fe94,_0x474799){const _0x428fbe=_0x1d5a8d,_0x423306=this[_0x428fbe(0x2b7)](_0x20fe94,_0x474799,!![]);if(_0x423306)this[_0x428fbe(0x31f)](_0x423306);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x118)]=function(_0x1d1c30,_0x28b943){const _0xd03688=_0x1d5a8d,_0x38a895=this[_0xd03688(0xe1)](_0x1d1c30,_0x28b943,!![]);if(_0x38a895)this[_0xd03688(0x31f)](_0x38a895);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2a3)]=function(_0x4cf432,_0x15216a){const _0x560917=_0x1d5a8d,_0x25e364=this[_0x560917(0x2b7)](_0x4cf432,_0x15216a,![]);if(_0x25e364)this[_0x560917(0x53d)](_0x25e364);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x19a)]=function(_0x23639a,_0x2e886b){const _0x5903b3=_0x1d5a8d,_0x124086=this[_0x5903b3(0xe1)](_0x23639a,_0x2e886b,![]);if(_0x124086)this[_0x5903b3(0x53d)](_0x124086);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x384)]=function(_0x14dd5d){const _0x38d9f0=_0x1d5a8d;if(_0x14dd5d)this[_0x38d9f0(0x401)](_0x14dd5d['x'],_0x14dd5d['y']);},Game_Character['prototype'][_0x1d5a8d(0x269)]=function(_0x15d0bc){const _0x5a5b0d=_0x1d5a8d;if(_0x15d0bc)this[_0x5a5b0d(0x118)](_0x15d0bc['x'],_0x15d0bc['y']);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x13d)]=function(_0x6150ea){const _0x14b819=_0x1d5a8d;if(_0x6150ea)this[_0x14b819(0x2a3)](_0x6150ea['x'],_0x6150ea['y']);},Game_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4ce)]=function(_0x3f96cb){if(_0x3f96cb)this['turnAwayFromPoint'](_0x3f96cb['x'],_0x3f96cb['y']);},VisuMZ['EventsMoveCore'][_0x1d5a8d(0xf4)]=Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3bc)],Game_Player[_0x1d5a8d(0x1cf)]['isDashing']=function(){const _0x3dbe70=_0x1d5a8d;if(this[_0x3dbe70(0x325)])return!![];return VisuMZ['EventsMoveCore'][_0x3dbe70(0xf4)][_0x3dbe70(0x1ee)](this);},Game_Player[_0x1d5a8d(0x1cf)]['isDashingAndMoving']=function(){const _0x79009c=_0x1d5a8d;return this[_0x79009c(0x3bc)]()&&(this[_0x79009c(0x416)]()||this['getInputDirection']()!==0x0&&this['canPass'](this['_x'],this['_y'],this[_0x79009c(0x1b3)]())||$gameTemp[_0x79009c(0x187)]());},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x181)]=Game_Player['prototype'][_0x1d5a8d(0x1b3)],Game_Player['prototype'][_0x1d5a8d(0x1b3)]=function(){const _0x1981d5=_0x1d5a8d;return $gameMap[_0x1981d5(0x22a)]()?this[_0x1981d5(0x219)]():VisuMZ['EventsMoveCore'][_0x1981d5(0x181)][_0x1981d5(0x1ee)](this);},Game_Player[_0x1d5a8d(0x1cf)]['getInputDir8']=function(){const _0x32ba08=_0x1d5a8d;return Input[_0x32ba08(0x10d)];},Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x207)]=function(){const _0x3223f6=_0x1d5a8d;if($gameSystem[_0x3223f6(0x409)]())return 0x0;if(!this[_0x3223f6(0x416)]()&&this[_0x3223f6(0x39e)]()){if(_0x3223f6(0x23c)==='cndzg'){function _0x49e76f(){const _0xc32bea=_0x3223f6;return _0x448a54[_0xc32bea(0x1cf)][_0xc32bea(0x4e3)][_0xc32bea(0x1ee)](this);}}else{let _0x1e91e1=this[_0x3223f6(0x1b3)]();if(_0x1e91e1>0x0){if(_0x3223f6(0x2c0)!==_0x3223f6(0x1a4))$gameTemp['clearDestination']();else{function _0xb4772e(){const _0x72a504=_0x3223f6;this[_0x72a504(0x52b)]['text']=this['_labelWindow']['text'][_0x72a504(0x16b)](/\\V\[(\d+)\]/gi,(_0x238c51,_0x34b8dc)=>_0x58bce8[_0x72a504(0x4d8)](_0x188007(_0x34b8dc)));}}}else{if($gameTemp[_0x3223f6(0x187)]()){if(_0x3223f6(0x413)===_0x3223f6(0x413)){const _0x2cbd2e=$gameTemp['destinationX'](),_0x53227f=$gameTemp[_0x3223f6(0x48b)](),_0x2b1947=$gameMap[_0x3223f6(0x22a)](),_0x512f87=$gameMap['isPassableByAnyDirection'](_0x2cbd2e,_0x53227f),_0x7896f8=$gameMap['eventsXyNt'](_0x2cbd2e,_0x53227f)[_0x3223f6(0xd6)]<=0x0;_0x2b1947&&_0x512f87&&_0x7896f8?_0x1e91e1=this['findDiagonalDirectionTo'](_0x2cbd2e,_0x53227f):_0x1e91e1=this[_0x3223f6(0x260)](_0x2cbd2e,_0x53227f);}else{function _0x575768(){const _0x1ad0a7=_0x3223f6;this[_0x1ad0a7(0x4da)]=![];const _0x196682=_0x35f7a1[_0x1ad0a7(0x4db)]||'';_0x196682[_0x1ad0a7(0x403)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);}}}}if(_0x1e91e1>0x0){if(_0x3223f6(0x49e)===_0x3223f6(0x49e))this['_inputTime']=this['_inputTime']||0x0,this['isTurnInPlace']()?this['setDirection'](_0x1e91e1):this['executeMove'](_0x1e91e1),this['_inputTime']++;else{function _0x56a613(){const _0x38ec80=_0x3223f6,_0x66d7b5=_0x20d58e(_0x29ccca['$1']),_0x49a4dd=_0x302caf(_0x199af2['$2']),_0x44066a=this['checkCollisionKeywords'](_0x2c5abf);return this[_0x38ec80(0x389)](_0x66d7b5,_0x49a4dd,_0x44066a);}}}else this[_0x3223f6(0x4b6)]=0x0;}}},Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x238)]=function(){const _0x53ec69=_0x1d5a8d,_0x354090=VisuMZ['EventsMoveCore']['Settings'][_0x53ec69(0x12e)];if(!_0x354090[_0x53ec69(0x353)])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x53ec69(0x3bc)]()||this[_0x53ec69(0x416)]()||this[_0x53ec69(0x39a)]())return![];return this['_inputTime']<_0x354090['TurnInPlaceDelay'];},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x160)]=Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x486)],Game_Player['prototype']['executeMove']=function(_0x3871a4){const _0x251bc9=_0x1d5a8d;if($gameMap[_0x251bc9(0x22a)]())this['executeMoveDir8'](_0x3871a4);else{if(_0x251bc9(0x3aa)===_0x251bc9(0x221)){function _0x34844f(){const _0x2b16f0=_0x251bc9;if(_0x3a58f5[_0x2b16f0(0x305)])return![];return _0xa58fb9[_0x2b16f0(0x424)][_0x2b16f0(0x441)][_0x2b16f0(0x1ee)](this,_0x29ebea,_0x2eae3f);}}else VisuMZ[_0x251bc9(0x424)][_0x251bc9(0x160)][_0x251bc9(0x1ee)](this,_0x3871a4);}},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x449)]=Game_Player['prototype'][_0x1d5a8d(0x3a3)],Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3a3)]=function(_0x38995f,_0x4e351e,_0x2fee3f){const _0x4a354b=_0x1d5a8d;if($gameMap['isRegionAllowPass'](_0x38995f,_0x4e351e,_0x2fee3f,_0x4a354b(0x117))){if(_0x4a354b(0x300)===_0x4a354b(0x300)){if(this[_0x4a354b(0x2d3)]()&&this[_0x4a354b(0x29c)]()){if(_0x4a354b(0x210)==='UyRoq'){function _0xd8fa9b(){const _0xe46ff6=_0x4a354b;_0x3d1625[_0xe46ff6(0x261)]=new _0x114253(),_0x289883[_0xe46ff6(0x261)][_0xe46ff6(0x255)]=_0x506552[_0xe46ff6(0xd0)]['shadowFilename'](),_0x2607a0[_0xe46ff6(0x261)][_0xe46ff6(0x3ad)]=_0x4b61e3['loadSystem'](_0x1e2790[_0xe46ff6(0x261)][_0xe46ff6(0x255)]),_0x341a23[_0xe46ff6(0x261)]['anchor']['x']=0.5,_0x350596[_0xe46ff6(0x261)][_0xe46ff6(0x376)]['y']=0x1,_0x3e47cc[_0xe46ff6(0x261)]['z']=0x0,this['_tilemap']['addChild'](_0x4d16be[_0xe46ff6(0x261)]);}}else return this[_0x4a354b(0x29c)]()[_0x4a354b(0x3a3)](_0x38995f,_0x4e351e,_0x2fee3f);}else return!![];}else{function _0x26cd68(){const _0x210161=_0x4a354b;_0x4382f3['CPC']===_0x1a9626&&_0x19e45a[_0x210161(0x424)][_0x210161(0x524)][_0x210161(0x507)](_0x5e0f6e);if(_0x4d7346[_0x210161(0x3d2)][_0x210161(0xd6)]>0x0)return _0x4768e3[_0x210161(0x424)][_0x210161(0x524)][_0x210161(0x4d2)](_0x5dbf84[_0x210161(0x3d2)],0x0);return!![];}}}if($gameMap[_0x4a354b(0x30e)](_0x38995f,_0x4e351e,_0x2fee3f,_0x4a354b(0x117)))return![];return VisuMZ[_0x4a354b(0x424)][_0x4a354b(0x449)][_0x4a354b(0x1ee)](this,_0x38995f,_0x4e351e,_0x2fee3f);},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x1a2)]=Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x328)],Game_Player['prototype']['checkEventTriggerHere']=function(_0x3250f8){const _0x532b6f=_0x1d5a8d;VisuMZ['EventsMoveCore'][_0x532b6f(0x1a2)]['call'](this,_0x3250f8);if(this[_0x532b6f(0x268)]()){this['checkEventTriggerEventsMoveCore'](_0x3250f8);if(_0x3250f8[_0x532b6f(0x26d)](0x0)&&this[_0x532b6f(0x362)]()==='standing'){if(_0x532b6f(0x317)===_0x532b6f(0x317))this[_0x532b6f(0xc5)](this['x'],this['y']);else{function _0x1367ec(){const _0x54b7a2=_0x532b6f;this['_labelWindow'][_0x54b7a2(0x4b0)]=_0x2c1a42(_0x49ca84['$1']),this[_0x54b7a2(0x52b)][_0x54b7a2(0x4ed)]=_0x3224f6(_0x18bfdf['$2']);}}}else(_0x3250f8['includes'](0x1)||_0x3250f8['includes'](0x2))&&this[_0x532b6f(0x2cb)]();}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x4d0)]=Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1f9)],Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1f9)]=function(_0x4e0441){const _0x36b98b=_0x1d5a8d;VisuMZ[_0x36b98b(0x424)]['Game_Player_checkEventTriggerThere'][_0x36b98b(0x1ee)](this,_0x4e0441);if(this['canStartLocalEvents']()&&_0x4e0441[_0x36b98b(0x26d)](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x36b98b(0x111)){const _0x22c650=this[_0x36b98b(0x495)](),_0x52e210=$gameMap[_0x36b98b(0x158)](this['x'],_0x22c650),_0xdfa13a=$gameMap[_0x36b98b(0x3f6)](this['y'],_0x22c650);this[_0x36b98b(0xc5)](_0x52e210,_0xdfa13a);}},Game_Player['prototype'][_0x1d5a8d(0x2b6)]=function(_0x4f08f1){const _0x1f40cf=_0x1d5a8d;if($gameMap['isEventRunning']())return;if($gameMap[_0x1f40cf(0x3b4)]())return;const _0x1000b3=$gameMap[_0x1f40cf(0x280)]();for(const _0x507287 of _0x1000b3){if(_0x1f40cf(0x37d)!=='xaSjI'){if(!_0x507287)continue;if(!_0x507287['isTriggerIn'](_0x4f08f1))continue;if(this[_0x1f40cf(0x54d)](_0x507287))return _0x507287[_0x1f40cf(0x519)]();if(this['meetActivationProximityConditions'](_0x507287))return _0x507287[_0x1f40cf(0x519)]();}else{function _0x420e6f(){const _0x113e30=_0x1f40cf,_0x37de97=[_0x5c0dce[_0x113e30(0x4a4)],_0x2d097f[_0x113e30(0x1fb)],_0x113e30(0x23d)[_0x113e30(0x3eb)](_0x4ac4bc)];_0x489ce4[_0x113e30(0x490)](_0x37de97,_0x20d792);}}}},Game_Player[_0x1d5a8d(0x1cf)]['meetActivationRegionConditions']=function(_0x267e8d){const _0x550038=_0x1d5a8d;if($gameMap[_0x550038(0x9b)]())return![];if($gameMap[_0x550038(0x3b4)]())return![];return _0x267e8d[_0x550038(0x281)]()[_0x550038(0x26d)](this['regionId']());},Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x186)]=function(_0x3c1c13){const _0x28835d=_0x1d5a8d;if($gameMap[_0x28835d(0x9b)]())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x28835d(0x377),_0x28835d(0x102)][_0x28835d(0x26d)](_0x3c1c13['activationProximityType']()))return![];const _0x36807a=_0x3c1c13[_0x28835d(0x45d)](),_0x4e433d=_0x3c1c13['activationProximityDistance']();switch(_0x36807a){case _0x28835d(0x3e9):const _0x5ad5a9=$gameMap[_0x28835d(0x49f)](this['x'],this['y'],_0x3c1c13['x'],_0x3c1c13['y']);return _0x3c1c13[_0x28835d(0x50d)]()>=_0x5ad5a9;break;case _0x28835d(0x535):return _0x4e433d>=Math['abs'](_0x3c1c13['deltaXFrom'](this['x']))&&_0x4e433d>=Math['abs'](_0x3c1c13[_0x28835d(0x120)](this['y']));break;case'row':return _0x4e433d>=Math[_0x28835d(0x263)](_0x3c1c13[_0x28835d(0x120)](this['y']));break;case _0x28835d(0x225):return _0x4e433d>=Math[_0x28835d(0x263)](_0x3c1c13['deltaXFrom'](this['x']));break;case _0x28835d(0x27b):return![];break;}},Game_Player['prototype']['startMapCommonEventOnOK']=function(_0x4c3d34,_0x5a4ad0){const _0x341ddb=_0x1d5a8d;if($gameMap[_0x341ddb(0x9b)]())return;if($gameMap['isAnyEventStarting']())return;let _0x3589fb=VisuMZ[_0x341ddb(0x424)]['Settings'][_0x341ddb(0x381)],_0x4785f8=$gameMap[_0x341ddb(0xf6)](_0x4c3d34,_0x5a4ad0);const _0x10b88e='Region%1'[_0x341ddb(0x3eb)](_0x4785f8);if(_0x3589fb[_0x10b88e]){if(_0x341ddb(0x266)!==_0x341ddb(0x34f))$gameTemp[_0x341ddb(0x50a)](_0x3589fb[_0x10b88e]);else{function _0x1ddabb(){const _0x336eb1=_0x341ddb;if(this[_0x336eb1(0x39a)]())return!![];if(this['constructor']===_0x2d9b7d&&this[_0x336eb1(0x2d3)]())return!![];return![];}}}},Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x362)]=function(){const _0x53cbb6=_0x1d5a8d;return VisuMZ[_0x53cbb6(0x424)][_0x53cbb6(0x1d2)][_0x53cbb6(0x1fe)];},Game_Player['prototype'][_0x1d5a8d(0x2cb)]=function(){const _0x484eb2=_0x1d5a8d;if($gameMap[_0x484eb2(0x9b)]())return;if($gameMap[_0x484eb2(0x3b4)]())return;let _0x5847a0=VisuMZ[_0x484eb2(0x424)][_0x484eb2(0x1d2)][_0x484eb2(0x43c)];const _0x16b900=_0x484eb2(0x4fb)[_0x484eb2(0x3eb)](this[_0x484eb2(0xf6)]());_0x5847a0[_0x16b900]&&$gameTemp[_0x484eb2(0x50a)](_0x5847a0[_0x16b900]);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x298)]=Game_Player['prototype'][_0x1d5a8d(0x242)],Game_Player[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x242)]=function(){const _0x2fb4ca=_0x1d5a8d;VisuMZ[_0x2fb4ca(0x424)][_0x2fb4ca(0x298)]['call'](this),VisuMZ['MoveAllSynchTargets'](0x0);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0xd1)]=Game_Follower['prototype'][_0x1d5a8d(0x475)],Game_Follower[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x475)]=function(_0x6ea24){const _0x1e5334=_0x1d5a8d;VisuMZ[_0x1e5334(0x424)][_0x1e5334(0xd1)][_0x1e5334(0x1ee)](this,_0x6ea24),this['_chaseOff']=![];},Game_Follower[_0x1d5a8d(0x1cf)]['isDashing']=function(){const _0x12ac4d=_0x1d5a8d;return $gamePlayer[_0x12ac4d(0x3bc)]();},Game_Follower[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x237)]=function(){const _0x19ee9a=_0x1d5a8d;return $gamePlayer[_0x19ee9a(0x237)]();},Game_Follower[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xb3)]=function(){const _0x3f8410=_0x1d5a8d;return $gamePlayer[_0x3f8410(0xb3)]();},Game_Follower['prototype'][_0x1d5a8d(0x25b)]=function(_0x31e4db){const _0x34bccb=_0x1d5a8d;this[_0x34bccb(0x2ce)]=_0x31e4db;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x369)]=Game_Follower[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x213)],Game_Follower[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x213)]=function(_0xf39b7){const _0x2e9f5f=_0x1d5a8d;if(this[_0x2e9f5f(0x2ce)])return;if($gameSystem[_0x2e9f5f(0x3f5)]())return;VisuMZ['EventsMoveCore'][_0x2e9f5f(0x369)][_0x2e9f5f(0x1ee)](this,_0xf39b7);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x289)]=Game_Vehicle[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3a3)],Game_Vehicle['prototype'][_0x1d5a8d(0x3a3)]=function(_0x46fb1a,_0x5aeb99,_0x1bb371){const _0x1da487=_0x1d5a8d;if($gameMap[_0x1da487(0x15f)](_0x46fb1a,_0x5aeb99,_0x1bb371,this['_type']))return!![];if($gameMap[_0x1da487(0x30e)](_0x46fb1a,_0x5aeb99,_0x1bb371,this[_0x1da487(0x531)]))return![];return VisuMZ['EventsMoveCore']['Game_Vehicle_isMapPassable'][_0x1da487(0x1ee)](this,_0x46fb1a,_0x5aeb99,_0x1bb371);},Game_Vehicle[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x333)]=function(_0x5a7b,_0x39920f,_0x4ad439){const _0x385353=_0x1d5a8d;if($gameMap[_0x385353(0x15f)](_0x5a7b,_0x39920f,_0x4ad439,this[_0x385353(0x531)]))return!![];if($gameMap[_0x385353(0x30e)](_0x5a7b,_0x39920f,_0x4ad439,this[_0x385353(0x531)]))return![];return VisuMZ[_0x385353(0x424)][_0x385353(0x48e)][_0x385353(0x1ee)]($gamePlayer,_0x5a7b,_0x39920f,_0x4ad439);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x13a)]=Game_Vehicle[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xbd)],Game_Vehicle[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xbd)]=function(_0x4da493,_0x45c19e,_0x3a3b98){const _0x46493b=_0x1d5a8d;if($gameMap[_0x46493b(0x35e)](_0x4da493,_0x45c19e,_0x3a3b98,this[_0x46493b(0x531)]))return!![];const _0x42f338=this[_0x46493b(0x531)][_0x46493b(0x25d)](0x0)[_0x46493b(0xcf)]()+this[_0x46493b(0x531)][_0x46493b(0xbe)](0x1),_0x168481=_0x46493b(0x39d)[_0x46493b(0x3eb)](_0x42f338);if(VisuMZ['EventsMoveCore'][_0x46493b(0x1d2)][_0x46493b(0x259)][_0x168481])return![];else{if(_0x46493b(0x231)!==_0x46493b(0x337))return VisuMZ['EventsMoveCore'][_0x46493b(0x13a)][_0x46493b(0x1ee)](this,_0x4da493,_0x45c19e,_0x3a3b98);else{function _0x4949c8(){const _0x21776c=_0x46493b;this[_0x21776c(0x2ce)]=_0x2a6ad1;}}}},VisuMZ[_0x1d5a8d(0x424)]['Game_Vehicle_initMoveSpeed']=Game_Vehicle[_0x1d5a8d(0x1cf)]['initMoveSpeed'],Game_Vehicle[_0x1d5a8d(0x1cf)]['initMoveSpeed']=function(){const _0xbed160=_0x1d5a8d;VisuMZ['EventsMoveCore'][_0xbed160(0x2b4)][_0xbed160(0x1ee)](this);const _0x326b40=VisuMZ[_0xbed160(0x424)][_0xbed160(0x1d2)][_0xbed160(0x12e)];if(this[_0xbed160(0x16a)]()){if(_0xbed160(0x335)!=='WQnlX'){if(_0x326b40['BoatSpeed'])this['setMoveSpeed'](_0x326b40['BoatSpeed']);}else{function _0x28ec72(){const _0x5d547c=_0xbed160,_0x41443a=_0x4e4f87(_0x1a127b['$1'])[_0x5d547c(0x44f)]()[_0x5d547c(0x35f)](),_0xb2446a=_0x2f0e19(_0x1fa344['$2']);this[_0x5d547c(0x462)][_0x41443a]=_0xb2446a;}}}else{if(this[_0xbed160(0x1d0)]()){if(_0xbed160(0x38d)!==_0xbed160(0x38d)){function _0xf84148(){const _0x1dc058=_0xbed160;return _0x3dda1b[_0x1dc058(0x26f)][_0x1dc058(0x26d)](_0x174b11)||_0x5a5864[_0x1dc058(0x9e)][_0x1dc058(0x26d)](_0x1dcc29);}}else{if(_0x326b40['ShipSpeed'])this[_0xbed160(0x22e)](_0x326b40[_0xbed160(0x2a6)]);}}else{if(this['isAirship']()){if(_0xbed160(0x1d7)==='mjYRX'){if(_0x326b40[_0xbed160(0x498)])this[_0xbed160(0x22e)](_0x326b40['AirshipSpeed']);}else{function _0x3977b(){const _0x768d69=_0xbed160;if(this[_0x768d69(0x10c)]()){const _0xd9dbe2=['',_0x768d69(0x2cf),_0x768d69(0x32a),_0x768d69(0x194),_0x768d69(0x52c),_0x768d69(0x51e),_0x768d69(0x277),_0x768d69(0x433),_0x768d69(0x2f5),_0x768d69(0x3a7),'ZZZ','','','','',''][_0x5f55ba];this[_0x768d69(0x363)](_0xd9dbe2,_0x381161);}}}}}}},VisuMZ[_0x1d5a8d(0x424)]['Game_Event_initialize']=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x475)],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x475)]=function(_0x517203,_0x7fdb81){const _0x2374fb=_0x1d5a8d;VisuMZ['EventsMoveCore']['Game_Event_initialize']['call'](this,_0x517203,_0x7fdb81),this[_0x2374fb(0x44d)](),this['setupMorphEvent'](),this['restoreSavedEventPosition']();},VisuMZ[_0x1d5a8d(0x424)]['Game_Event_event']=Game_Event[_0x1d5a8d(0x1cf)]['event'],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x505)]=function(){const _0x296af2=_0x1d5a8d;if(this[_0x296af2(0x176)]!==undefined){if(_0x296af2(0x4d9)===_0x296af2(0x4d9)){const _0x91c4b6=this['_eventMorphData'][_0x296af2(0x25c)],_0x3205dc=this[_0x296af2(0x176)]['eventId'];return VisuMZ['PreloadedMaps'][_0x91c4b6][_0x296af2(0x280)][_0x3205dc];}else{function _0x56247e(){const _0xc60722=_0x296af2;if(this[_0xc60722(0x4da)]===_0x20f5d8)this[_0xc60722(0x338)]();return this['_saveEventLocations'];}}}if(this[_0x296af2(0x4c7)]!==undefined){const _0x3b7d4d=this['_eventCopyData']['mapId'],_0x96b14b=this[_0x296af2(0x4c7)][_0x296af2(0x32d)];return VisuMZ[_0x296af2(0x4ac)][_0x3b7d4d]['events'][_0x96b14b];}if(this[_0x296af2(0x4d7)]!==undefined){if(_0x296af2(0x16e)===_0x296af2(0x1da)){function _0x14ca75(){const _0x4b8de3=_0x296af2;this[_0x4b8de3(0x4f5)]=_0x577707(_0x446e88['$1']);}}else{const _0x26617a=this[_0x296af2(0x4d7)][_0x296af2(0x25c)],_0x19e6ee=this[_0x296af2(0x4d7)][_0x296af2(0x32d)];return VisuMZ[_0x296af2(0x4ac)][_0x26617a][_0x296af2(0x280)][_0x19e6ee];}}if($gameTemp[_0x296af2(0x4cb)]!==undefined){const _0x4e64b2=$gameTemp[_0x296af2(0x4cb)]['mapId'],_0x496f02=$gameTemp[_0x296af2(0x4cb)]['eventId'];return VisuMZ['PreloadedMaps'][_0x4e64b2]['events'][_0x496f02];}return VisuMZ[_0x296af2(0x424)][_0x296af2(0x22f)][_0x296af2(0x1ee)](this);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4ad)]=function(_0x2b9a01,_0x3734de){const _0x3f7ae1=_0x1d5a8d;if(_0x2b9a01===0x0||_0x3734de===0x0)return![];if(!VisuMZ[_0x3f7ae1(0x4ac)][_0x2b9a01]){if(_0x3f7ae1(0xf8)!==_0x3f7ae1(0x271)){if($gameTemp['isPlaytest']()){if(_0x3f7ae1(0x1cb)===_0x3f7ae1(0x1cb))console[_0x3f7ae1(0x520)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.'[_0x3f7ae1(0x3eb)](_0x2b9a01));else{function _0xb72477(){const _0x24e15b=_0x3f7ae1;if(this[_0x24e15b(0xa8)])return this[_0x24e15b(0xa8)];const _0x504626=_0x1634a8['EventsMoveCore'][_0x24e15b(0x427)]['call'](this),_0x43f3fc=_0x504626[_0x24e15b(0x1aa)](this[_0x24e15b(0x3ea)]||[]);return this['_eventCache']=_0x43f3fc[_0x24e15b(0xaa)](_0x1defa7=>!!_0x1defa7),this['_eventCache'];}}}return![];}else{function _0x3f049c(){const _0x3d29d7=_0x3f7ae1;return this[_0x3d29d7(0x54f)](0x3,_0x4d934c(_0x3f44f6['$1']));}}}return!![];},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x40b)]=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x519)],Game_Event[_0x1d5a8d(0x1cf)]['start']=function(){const _0x26b07f=_0x1d5a8d;VisuMZ['EventsMoveCore'][_0x26b07f(0x40b)][_0x26b07f(0x1ee)](this);if(Imported[_0x26b07f(0x209)]&&Input[_0x26b07f(0x246)](VisuMZ[_0x26b07f(0x347)][_0x26b07f(0x1d2)]['General'][_0x26b07f(0x1d8)])){if(_0x26b07f(0x149)===_0x26b07f(0x4ee)){function _0x183cb2(){const _0x33dc2a=_0x26b07f;_0xad50f8['ConvertParams'](_0x701ca7,_0x4e19a2);const _0x26f316=_0x6ffabf[_0x33dc2a(0x30b)](),_0x2c282f=_0x500663['MapId']||_0x43ae45['mapId'](),_0x111fcd=_0x29bff7['EventId']||_0x26f316[_0x33dc2a(0x32d)](),_0x2beb82=_0x56d9f9[_0x33dc2a(0x11c)]||0x0,_0x765dce=_0x3fba5d[_0x33dc2a(0x103)]||0x0,_0x2264ce=_0x1ca793[_0x33dc2a(0x2d4)]||0x2,_0xbf1546=((_0x762d66[_0x33dc2a(0x525)]||0x1)-0x1)[_0x33dc2a(0x39c)](0x0,0x13),_0x220ecc=_0x3c74a8['MoveRouteIndex']||0x0;_0x19cb3b[_0x33dc2a(0xa3)](_0x2c282f,_0x111fcd,_0x2beb82,_0x765dce,_0x2264ce,_0xbf1546,_0x220ecc);}}else Input[_0x26b07f(0x4f3)]();}},Game_Event['prototype'][_0x1d5a8d(0x44d)]=function(){const _0x212258=_0x1d5a8d,_0xcaadc4=this[_0x212258(0x505)]()[_0x212258(0x4db)];if(_0xcaadc4==='')return;if(DataManager[_0x212258(0x2fe)]()||DataManager[_0x212258(0x1b4)]())return;const _0x4f851d=VisuMZ[_0x212258(0x424)][_0x212258(0x1d2)][_0x212258(0x157)];let _0x5ae6cb=null,_0x410770=0x0,_0x28ca9b=0x0;if(_0xcaadc4[_0x212258(0x403)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x410770=Number(RegExp['$1']),_0x28ca9b=Number(RegExp['$2']);else{if(_0xcaadc4['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x410770=Number(RegExp['$1']),_0x28ca9b=Number(RegExp['$2']);else{if(_0xcaadc4['match'](/<COPY EVENT:[ ](.*?)>/i)){if(_0x212258(0x452)===_0x212258(0x452)){const _0x99797a=String(RegExp['$1'])[_0x212258(0xcf)]()[_0x212258(0x35f)]();_0x5ae6cb=VisuMZ[_0x212258(0x4d4)][_0x99797a];if(!_0x5ae6cb)return;_0x410770=_0x5ae6cb['MapID'],_0x28ca9b=_0x5ae6cb[_0x212258(0x1d4)];}else{function _0x26cd06(){const _0xdb4680=_0x212258;return this[_0xdb4680(0x28a)](_0x426f79(_0x2f1721['$1']));}}}}}if(!this[_0x212258(0x4ad)](_0x410770,_0x28ca9b))return;_0x4f851d[_0x212258(0x2de)][_0x212258(0x1ee)](this,_0x410770,_0x28ca9b,this);if(_0x5ae6cb)_0x5ae6cb['PreCopyJS'][_0x212258(0x1ee)](this,_0x410770,_0x28ca9b,this);this[_0x212258(0x4c7)]={'mapId':_0x410770,'eventId':_0x28ca9b},this[_0x212258(0x527)]=-0x2,this[_0x212258(0x360)](),_0x4f851d[_0x212258(0x1ed)][_0x212258(0x1ee)](this,_0x410770,_0x28ca9b,this);if(_0x5ae6cb)_0x5ae6cb[_0x212258(0x1ed)]['call'](this,_0x410770,_0x28ca9b,this);$gameMap[_0x212258(0x450)]();},Game_Event['prototype']['setupMorphEvent']=function(){const _0x5cb748=_0x1d5a8d,_0x179424=$gameSystem[_0x5cb748(0x230)](this);if(!_0x179424)return;const _0x2f166b=_0x179424[_0x5cb748(0x2d0)][_0x5cb748(0xcf)]()['trim']();if(_0x2f166b!=='UNTITLED'){if(_0x5cb748(0x1c1)!==_0x5cb748(0x3c0))this[_0x5cb748(0x3f4)](_0x2f166b,!![]);else{function _0xb171a1(){const _0xb9e278=_0x5cb748;_0x58522c!==this['mapId']()&&_0x4bcdaf&&_0x1c5842[_0xb9e278(0xe3)](this[_0xb9e278(0x25c)]());}}}else this['morphInto'](_0x179424[_0x5cb748(0x25c)],_0x179424[_0x5cb748(0x32d)],!![]);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2bb)]=function(_0x344240,_0x3827b6,_0x13fe2f){const _0x4cd95d=_0x1d5a8d;if(!this[_0x4cd95d(0x4ad)](_0x344240,_0x3827b6))return;const _0xd7efff=VisuMZ['EventsMoveCore'][_0x4cd95d(0x1d2)][_0x4cd95d(0x157)];if(!_0x13fe2f)_0xd7efff['PreMorphJS'][_0x4cd95d(0x1ee)](this,_0x344240,_0x3827b6,this);this[_0x4cd95d(0x176)]={'mapId':_0x344240,'eventId':_0x3827b6},this[_0x4cd95d(0x527)]=-0x2,this[_0x4cd95d(0x360)]();if(!_0x13fe2f)_0xd7efff[_0x4cd95d(0x4f9)][_0x4cd95d(0x1ee)](this,_0x344240,_0x3827b6,this);$gameMap[_0x4cd95d(0x450)]();},Game_Event[_0x1d5a8d(0x1cf)]['morphIntoTemplate']=function(_0xe2d306,_0x102dd8){const _0x24291f=_0x1d5a8d;_0xe2d306=_0xe2d306['toUpperCase']()[_0x24291f(0x35f)]();const _0x411041=VisuMZ['EventTemplates'][_0xe2d306];if(!_0x411041)return;const _0x3a0a8f=_0x411041[_0x24291f(0x438)],_0x213f0a=_0x411041[_0x24291f(0x1d4)];if(!this[_0x24291f(0x4ad)](_0x3a0a8f,_0x213f0a))return;if(!_0x102dd8)_0x411041[_0x24291f(0xba)][_0x24291f(0x1ee)](this,_0x3a0a8f,_0x213f0a,this);this[_0x24291f(0x2bb)](_0x3a0a8f,_0x213f0a,_0x102dd8);if(!_0x102dd8)_0x411041[_0x24291f(0x4f9)][_0x24291f(0x1ee)](this,_0x3a0a8f,_0x213f0a,this);if($gameMap)$gameMap[_0x24291f(0x450)]();},Game_Event[_0x1d5a8d(0x1cf)]['removeMorph']=function(){const _0x38e123=_0x1d5a8d;this['_eventMorphData']=undefined,this[_0x38e123(0x527)]=-0x2,this['refresh']();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4e0)]=function(_0x894b46){const _0x4746cb=_0x1d5a8d,_0x4c881d=VisuMZ['EventsMoveCore'][_0x4746cb(0x1d2)][_0x4746cb(0x157)],_0xc429c4=_0x894b46[_0x4746cb(0x2d0)][_0x4746cb(0xcf)]()[_0x4746cb(0x35f)](),_0x4ab52f=!['',_0x4746cb(0x2e4)]['includes'](_0xc429c4);let _0x5e19b4=0x0,_0x1a8956=0x0;if(_0x4ab52f){const _0x5a392c=VisuMZ[_0x4746cb(0x4d4)][_0xc429c4];if(!_0x5a392c)return;_0x5e19b4=_0x5a392c[_0x4746cb(0x438)],_0x1a8956=_0x5a392c[_0x4746cb(0x1d4)];}else _0x5e19b4=_0x894b46[_0x4746cb(0x25c)],_0x1a8956=_0x894b46[_0x4746cb(0x32d)];if(!this[_0x4746cb(0x4ad)](_0x5e19b4,_0x1a8956))return;if(_0x4ab52f){if(_0x4746cb(0xb9)!=='BYSGD'){function _0x52552b(){const _0x42f6de=_0x4746cb;if(!_0x6297e[_0x42f6de(0x178)]())return;_0x3a8c27[_0x42f6de(0x473)]();}}else{const _0x368519=VisuMZ[_0x4746cb(0x4d4)][_0xc429c4];_0x368519['PreSpawnJS']['call'](this,_0x5e19b4,_0x1a8956,this);}}_0x4c881d[_0x4746cb(0x396)][_0x4746cb(0x1ee)](this,_0x5e19b4,_0x1a8956,this),this[_0x4746cb(0x4d7)]=_0x894b46,this[_0x4746cb(0x527)]=-0x2,this['_mapId']=$gameMap[_0x4746cb(0x25c)](),this[_0x4746cb(0x1fb)]=_0x894b46[_0x4746cb(0x2f7)],this[_0x4746cb(0x17e)]=_0x894b46[_0x4746cb(0x2f3)],this[_0x4746cb(0x217)](_0x894b46['x'],_0x894b46['y']),this[_0x4746cb(0x53d)](_0x894b46[_0x4746cb(0x495)]),this[_0x4746cb(0x360)]();if(_0x4ab52f){const _0x4dfc6e=VisuMZ['EventTemplates'][_0xc429c4];if(!_0x4dfc6e)return;_0x4dfc6e[_0x4746cb(0xc8)][_0x4746cb(0x1ee)](this,_0x5e19b4,_0x1a8956,this);}_0x4c881d[_0x4746cb(0xc8)][_0x4746cb(0x1ee)](this,_0x5e19b4,_0x1a8956,this);const _0x1ed8ed=SceneManager[_0x4746cb(0x478)];if(_0x1ed8ed&&_0x1ed8ed['_spriteset'])_0x1ed8ed[_0x4746cb(0x390)][_0x4746cb(0x532)](this);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4e6)]=function(){const _0x10421b=_0x1d5a8d;return!!this[_0x10421b(0x4d7)];},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x173)]=Game_Event['prototype']['refresh'],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x360)]=function(){const _0x8debc7=_0x1d5a8d,_0x59b394=this[_0x8debc7(0x527)];VisuMZ[_0x8debc7(0x424)][_0x8debc7(0x173)][_0x8debc7(0x1ee)](this),_0x59b394!==this[_0x8debc7(0x527)]&&this['setupEventsMoveCoreEffects']();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x171)]=Game_Event[_0x1d5a8d(0x1cf)]['clearPageSettings'],Game_Event[_0x1d5a8d(0x1cf)]['clearPageSettings']=function(){const _0x3da9a4=_0x1d5a8d;VisuMZ[_0x3da9a4(0x424)][_0x3da9a4(0x171)][_0x3da9a4(0x1ee)](this),this[_0x3da9a4(0x440)]();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x31d)]=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x45b)],Game_Event[_0x1d5a8d(0x1cf)]['setupPageSettings']=function(){const _0x44dc10=_0x1d5a8d;this[_0x44dc10(0x287)]=!![],VisuMZ[_0x44dc10(0x424)]['Game_Event_setupPageSettings']['call'](this),this[_0x44dc10(0x4ef)](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event['prototype'][_0x1d5a8d(0x4ef)]=function(){const _0x842674=_0x1d5a8d;if(!this[_0x842674(0x505)]())return;this[_0x842674(0x440)](),this[_0x842674(0x4ea)](),this[_0x842674(0x35a)](),this[_0x842674(0x37a)]();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4ea)]=function(){const _0x382703=_0x1d5a8d,_0x47aede=this[_0x382703(0x505)]()[_0x382703(0x4db)];if(_0x47aede==='')return;this[_0x382703(0x543)](_0x47aede);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x35a)]=function(){const _0xc516ff=_0x1d5a8d;if(!this[_0xc516ff(0x24c)]())return;const _0x1a8324=this['list']();let _0x3b8efd='';for(const _0x4c5cfe of _0x1a8324){if([0x6c,0x198][_0xc516ff(0x26d)](_0x4c5cfe[_0xc516ff(0x1f3)])){if(_0xc516ff(0x4b8)===_0xc516ff(0x1bc)){function _0x547536(){const _0x580460=_0xc516ff;return _0xc27eb8[_0x580460(0x17d)]()&&_0x296278[_0x580460(0x520)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.'[_0x580460(0x3eb)](_0x3fb73b)),![];}}else{if(_0x3b8efd!=='')_0x3b8efd+='\x0a';_0x3b8efd+=_0x4c5cfe[_0xc516ff(0x3b0)][0x0];}}}this['checkEventsMoveCoreStringTags'](_0x3b8efd);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x440)]=function(){const _0x1199b1=_0x1d5a8d,_0x297327=VisuMZ[_0x1199b1(0x424)][_0x1199b1(0x1d2)];this[_0x1199b1(0x175)]={'type':_0x1199b1(0x377),'distance':0x0,'regionList':[]},this[_0x1199b1(0x4a2)]=![],this[_0x1199b1(0x1cd)]=![],this[_0x1199b1(0x462)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_eventIcon']=$gameSystem['getEventIconData'](this),this[_0x1199b1(0x52b)]={'text':'','visibleRange':_0x297327[_0x1199b1(0x3c9)]['VisibleRange'],'offsetX':_0x297327[_0x1199b1(0x3c9)]['OffsetX'],'offsetY':_0x297327['Label']['OffsetY']},this[_0x1199b1(0x11b)]=[],this[_0x1199b1(0x523)]={'target':-0x1,'type':_0x1199b1(0xea),'delay':0x1},this[_0x1199b1(0x3ae)]=_0x297327['Movement']['RandomMoveWeight']??0x0,this[_0x1199b1(0x45c)]=![],this[_0x1199b1(0x1a6)]={'visible':!![],'filename':_0x297327['Movement'][_0x1199b1(0xe0)]},this[_0x1199b1(0xb1)](),this[_0x1199b1(0x1dd)]();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x543)]=function(_0x19a357){const _0x439f0d=_0x1d5a8d;if(_0x19a357[_0x439f0d(0x403)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x439f0d(0x175)]['regionList']=JSON[_0x439f0d(0x324)]('['+RegExp['$1']['match'](/\d+/g)+']'),this['_activationProximity'][_0x439f0d(0x50e)]='region';else _0x19a357['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x439f0d(0x44f)]()['trim'](),this[_0x439f0d(0x175)][_0x439f0d(0x50e)]=type,this[_0x439f0d(0x175)]['distance']=Number(RegExp['$2']));if(_0x19a357[_0x439f0d(0x403)](/<ALWAYS UPDATE MOVEMENT>/i)){if(_0x439f0d(0x3b8)===_0x439f0d(0x366)){function _0x1e14e6(){const _0x472b7c=_0x439f0d;if(this['_EventsMoveCoreSettings']===_0xf4e3bf)this[_0x472b7c(0x185)]();if(this[_0x472b7c(0x1e2)][_0x472b7c(0x1f4)]===_0x52dc26)this['initEventsMoveCore']();return this[_0x472b7c(0x1e2)][_0x472b7c(0x1f4)];}}else this['_alwaysUpdateMove']=!![];}_0x19a357[_0x439f0d(0x403)](/<CLICK TRIGGER>/i)&&(this[_0x439f0d(0x1cd)]=!![]);const _0x2224e2=_0x19a357['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x2224e2)for(const _0x3e1e49 of _0x2224e2){if(_0x439f0d(0x4a1)!==_0x439f0d(0x4a1)){function _0x2894b5(){const _0x171aa1=_0x439f0d;this[_0x171aa1(0x523)]['target']=_0x4ef4e0(_0x2237c8['$1']);}}else{if(_0x3e1e49[_0x439f0d(0x403)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x1dafac=String(RegExp['$1'])[_0x439f0d(0x44f)]()[_0x439f0d(0x35f)](),_0x40f24b=Number(RegExp['$2']);this['_addedHitbox'][_0x1dafac]=_0x40f24b;}}}if(_0x19a357[_0x439f0d(0x403)](/<ICON:[ ](\d+)>/i)){if(_0x439f0d(0x4c2)!==_0x439f0d(0x4c2)){function _0xf63909(){if(_0x43b2df)return _0x53f449;}}else this['_eventIcon'][_0x439f0d(0x2f6)]=Number(RegExp['$1']);}if(_0x19a357['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x439f0d(0x4bc)!==_0x439f0d(0x4bc)){function _0x4633e9(){const _0x45ff62=_0x439f0d;this[_0x45ff62(0x4a0)]=this[_0x45ff62(0x4a0)]||0x0;if(this[_0x45ff62(0x4a0)]>0x0){this[_0x45ff62(0x4a0)]--;if(this[_0x45ff62(0x4a0)]<=0x0&&this['_pose']!==_0x45ff62(0xd9))this[_0x45ff62(0x4b4)]();}}}else this['_eventIcon'][_0x439f0d(0x474)]=Number(RegExp['$1']);}if(_0x19a357['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x439f0d(0x1ef)!==_0x439f0d(0x195))this[_0x439f0d(0x239)]['bufferY']=Number(RegExp['$1']);else{function _0x26e053(){const _0xfce525=_0x439f0d;if(this[_0xfce525(0x3d3)]===_0xdbbe50)this[_0xfce525(0x185)]();this[_0xfce525(0x3d3)]?_0x4ec00e['reserveCommonEvent'](this[_0xfce525(0x3d3)]):_0x4e8ad1[_0xfce525(0x424)]['Game_Timer_onExpire'][_0xfce525(0x1ee)](this);}}}_0x19a357[_0x439f0d(0x403)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x439f0d(0x239)][_0x439f0d(0x474)]=Number(RegExp['$1']),this[_0x439f0d(0x239)]['bufferY']=Number(RegExp['$2']));if(_0x19a357['match'](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x439f0d(0x1d6)!=='bhWhj'){const _0x2206a6=String(RegExp['$1'])[_0x439f0d(0xcf)]()[_0x439f0d(0x35f)](),_0x4bb334=['NORMAL',_0x439f0d(0x3d5),'MULTIPLY','SCREEN'];this['_eventIcon'][_0x439f0d(0x262)]=_0x4bb334[_0x439f0d(0x1b9)](_0x2206a6)[_0x439f0d(0x39c)](0x0,0x3);}else{function _0x3459f1(){const _0x5b92cd=_0x439f0d,_0x4cc9f6=_0x616ba[_0x5b92cd(0x216)][_0x288d7e[_0x5b92cd(0x161)]-0x1][_0x5b92cd(0x36f)];this[_0x5b92cd(0x4b9)](_0x4cc9f6,this['eventId']());}}}_0x19a357['match'](/<LABEL:[ ](.*?)>/i)&&(this[_0x439f0d(0x52b)][_0x439f0d(0x193)]=String(RegExp['$1'])['trim']());_0x19a357[_0x439f0d(0x403)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x439f0d(0x52b)][_0x439f0d(0x193)]=String(RegExp['$1'])[_0x439f0d(0x35f)]());if(_0x19a357[_0x439f0d(0x403)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x439f0d(0xa1)===_0x439f0d(0xa1))this[_0x439f0d(0x52b)][_0x439f0d(0x4b0)]=Number(RegExp['$1']);else{function _0x35bd2c(){const _0x482f3c=_0x439f0d;_0x5405ad=_0x5b052d(_0x2dc517['$1'])['toLowerCase']()['trim'](),this[_0x482f3c(0x175)][_0x482f3c(0x50e)]=_0x37b1b0,this[_0x482f3c(0x175)][_0x482f3c(0x49f)]=_0x437346(_0x362d9b['$2']);}}}_0x19a357['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x439f0d(0x52b)]['offsetY']=Number(RegExp['$1']));_0x19a357['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x439f0d(0x52b)][_0x439f0d(0x4b0)]=Number(RegExp['$1']),this[_0x439f0d(0x52b)][_0x439f0d(0x4ed)]=Number(RegExp['$2']));$gameTemp['registerSelfTarget'](this);for(;;){if(this[_0x439f0d(0x52b)][_0x439f0d(0x193)][_0x439f0d(0x403)](/\\V\[(\d+)\]/gi)){if(_0x439f0d(0x4ca)!=='nthHy'){function _0x143539(){const _0x1f72ed=_0x439f0d,_0x20a5cf=_0x1f72ed(0x2c5)[_0x1f72ed(0x3eb)](_0x309f99[_0x1f72ed(0x25d)](0x0)[_0x1f72ed(0xcf)]()+_0x723ae8[_0x1f72ed(0xbe)](0x1));if(_0x1d2314[_0x20a5cf])return _0x448d92[_0x20a5cf][_0x1f72ed(0x26d)](_0x2f5e93);}}else this[_0x439f0d(0x52b)]['text']=this['_labelWindow'][_0x439f0d(0x193)][_0x439f0d(0x16b)](/\\V\[(\d+)\]/gi,(_0x5c6ef8,_0x5da9dc)=>$gameVariables['value'](parseInt(_0x5da9dc)));}else{if(_0x439f0d(0x4e1)===_0x439f0d(0x4e1))break;else{function _0x12f814(){const _0x28d61f=_0x439f0d;return this['isSpriteVS8dir']()?this[_0x28d61f(0x472)]():_0x4d5a09[_0x28d61f(0x424)]['Sprite_Character_characterPatternY'][_0x28d61f(0x1ee)](this);}}}}$gameTemp[_0x439f0d(0x4a8)]();if(_0x19a357['match'](/<LABEL RANGE:[ ](\d+)>/i)){if(_0x439f0d(0x34c)!==_0x439f0d(0x34c)){function _0x4f5f28(){const _0x57d89a=_0x439f0d;_0x17bda6['EventsMoveCore'][_0x57d89a(0x469)][_0x57d89a(0x1ee)](this,_0x240138,_0x4bb86f);}}else this[_0x439f0d(0x52b)][_0x439f0d(0x41a)]=Number(RegExp['$1']);}if(_0x19a357[_0x439f0d(0x403)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if('ZdKHf'!=='ZdKHf'){function _0x5a7b82(){const _0xbdc843=_0x439f0d;_0x52e72b(this['VisuMZ_Setup_Preload_Map'][_0xbdc843(0x156)](this,_0x3bded6,_0x244f1e),0x64);}}else{const _0x44b530=JSON['parse']('['+RegExp['$1'][_0x439f0d(0x403)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x439f0d(0x11b)][_0x439f0d(0x1aa)](_0x44b530),this[_0x439f0d(0x11b)][_0x439f0d(0x43a)](0x0);}}if(_0x19a357['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x439f0d(0xd3)!==_0x439f0d(0xd3)){function _0x55e260(){const _0x166a54=_0x439f0d;return _0x168d3e['EventsMoveCore'][_0x166a54(0x34e)][_0x166a54(0x1ee)](this)+(this[_0x166a54(0x4f5)]||0x0);}}else{const _0x3134de=String(RegExp['$1']);if(_0x3134de[_0x439f0d(0x403)](/PLAYER/i))this[_0x439f0d(0x523)][_0x439f0d(0x1b0)]=0x0;else{if(_0x3134de[_0x439f0d(0x403)](/EVENT[ ](\d+)/i)){if(_0x439f0d(0x16d)===_0x439f0d(0x16d))this[_0x439f0d(0x523)][_0x439f0d(0x1b0)]=Number(RegExp['$1']);else{function _0x1a3e61(){const _0x4f1901=_0x439f0d;if(this[_0x4f1901(0x444)]===_0x3a0a5d)this[_0x4f1901(0x185)]();if(!_0x21b2d2)return null;if(_0xa32359===_0x6c1050)return this['_EventIcons']['Player'];else{const _0x2d2e20=_0x191733[_0x4f1901(0x424)]['Settings'],_0x1afbf0=_0x4f1901(0x139)['format'](_0xb9c183[_0x4f1901(0x4a4)],_0x5a88c0[_0x4f1901(0x1fb)]);return this['_EventIcons'][_0x1afbf0]=this['_EventIcons'][_0x1afbf0]||{'iconIndex':0x0,'bufferX':_0x2d2e20[_0x4f1901(0x170)][_0x4f1901(0xe9)],'bufferY':_0x2d2e20[_0x4f1901(0x170)][_0x4f1901(0x3a0)],'blendMode':_0x2d2e20[_0x4f1901(0x170)]['BlendMode']},this[_0x4f1901(0x444)][_0x1afbf0];}}}}}}}_0x19a357[_0x439f0d(0x403)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch'][_0x439f0d(0x50e)]=String(RegExp['$1'])['toLowerCase']()[_0x439f0d(0x35f)]());if(_0x19a357[_0x439f0d(0x403)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x439f0d(0x183)===_0x439f0d(0x183))this[_0x439f0d(0x523)][_0x439f0d(0x123)]=Number(RegExp['$1']);else{function _0x3d93f8(){const _0x4c4641=_0x439f0d;_0x3a8811[_0x4c4641(0x424)][_0x4c4641(0x469)][_0x4c4641(0x1ee)](this,_0x26de5b,_0x288541);}}}if(_0x19a357[_0x439f0d(0x403)](/<TRUE RANDOM MOVE>/i)){if(_0x439f0d(0x2ee)===_0x439f0d(0x4f7)){function _0x2acb70(){const _0x4c1474=_0x439f0d;_0x530f9a[_0x4c1474(0x424)][_0x4c1474(0x148)]['call'](this),this[_0x4c1474(0x10f)]();}}else this[_0x439f0d(0x3ae)]=0x0;}else{if(_0x19a357['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if(_0x439f0d(0x220)!==_0x439f0d(0x12f))this[_0x439f0d(0x3ae)]=Number(RegExp['$1'])||0x0;else{function _0x209e42(){const _0x442191=_0x439f0d;return _0x9a7868[_0x442191(0x424)][_0x442191(0xe5)]['call'](this)?!![]:_0x5dc46e['EventsMoveCore'][_0x442191(0x524)]['metCPC'](this[_0x442191(0x505)]()['CPC'],this[_0x442191(0x24e)]);}}}}_0x19a357[_0x439f0d(0x403)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocation']=!![]);if(_0x19a357[_0x439f0d(0x403)](/<HIDE SHADOW>/i)){if(_0x439f0d(0x4af)==='qdpdA'){function _0x55d8d0(){const _0x27ee3e=_0x439f0d;if(this[_0x27ee3e(0x49c)]===_0x4812d2)this[_0x27ee3e(0x44e)]();return this['_followerControlID'];}}else this[_0x439f0d(0x1a6)][_0x439f0d(0x385)]=![];}_0x19a357['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this['_shadowGraphic'][_0x439f0d(0x304)]=String(RegExp['$1']));if(_0x19a357[_0x439f0d(0x403)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x439f0d(0x4dc)===_0x439f0d(0x4dc))this[_0x439f0d(0x4f5)]=Number(RegExp['$1']);else{function _0x1c9212(){const _0x1d621b=_0x439f0d,_0x4c4428=_0x263b61['eventsXyNt'](_0x57dd6a,_0x5f12fe)[_0x1d621b(0xaa)](_0x40acf1=>_0x40acf1!==this&&_0x40acf1[_0x1d621b(0xd8)]());return _0x4c4428[_0x1d621b(0xd6)]>0x0;}}}_0x19a357['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x439f0d(0x51b)]=Number(RegExp['$1'])),_0x19a357[_0x439f0d(0x403)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x439f0d(0x4f5)]=Number(RegExp['$1']),this[_0x439f0d(0x51b)]=Number(RegExp['$2'])),_0x19a357[_0x439f0d(0x403)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x439f0d(0x1b1)]=String(RegExp['$1'])['toUpperCase']()[_0x439f0d(0x35f)]());},Game_Event['prototype']['updateEventsMoveCoreTagChanges']=function(){const _0x501e5f=_0x1d5a8d;this[_0x501e5f(0x539)]();},Game_Event[_0x1d5a8d(0x1cf)]['isNearTheScreen']=function(){const _0x3ed039=_0x1d5a8d;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x3ed039(0x1cf)]['isNearTheScreen']['call'](this);},VisuMZ[_0x1d5a8d(0x424)]['Game_Event_updateSelfMovement']=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x232)],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x232)]=function(){const _0x3ef301=_0x1d5a8d;if(this['isPreventSelfMovement']())return;VisuMZ[_0x3ef301(0x424)]['Game_Event_updateSelfMovement'][_0x3ef301(0x1ee)](this);if(this[_0x3ef301(0x416)]()){if('Srovn'===_0x3ef301(0x2bf)){function _0x57ca9f(){const _0x4df5a1=_0x3ef301,_0x18cf95=this[_0x4df5a1(0x505)]()[_0x4df5a1(0x4db)];if(_0x18cf95==='')return;if(_0x357d86[_0x4df5a1(0x2fe)]()||_0x2a64f5['isEventTest']())return;const _0x522d0b=_0x549c5a[_0x4df5a1(0x424)]['Settings'][_0x4df5a1(0x157)];let _0x475c2e=null,_0x276de6=0x0,_0x149c30=0x0;if(_0x18cf95['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x276de6=_0x49b7eb(_0x40c6d0['$1']),_0x149c30=_0x43124a(_0x2f002c['$2']);else{if(_0x18cf95[_0x4df5a1(0x403)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x276de6=_0xc72bad(_0xe6d307['$1']),_0x149c30=_0x279a4d(_0x245b48['$2']);else{if(_0x18cf95[_0x4df5a1(0x403)](/<COPY EVENT:[ ](.*?)>/i)){const _0x13aca5=_0x344d5a(_0x3e6889['$1'])[_0x4df5a1(0xcf)]()[_0x4df5a1(0x35f)]();_0x475c2e=_0x5c9b93[_0x4df5a1(0x4d4)][_0x13aca5];if(!_0x475c2e)return;_0x276de6=_0x475c2e[_0x4df5a1(0x438)],_0x149c30=_0x475c2e[_0x4df5a1(0x1d4)];}}}if(!this[_0x4df5a1(0x4ad)](_0x276de6,_0x149c30))return;_0x522d0b[_0x4df5a1(0x2de)]['call'](this,_0x276de6,_0x149c30,this);if(_0x475c2e)_0x475c2e['PreCopyJS']['call'](this,_0x276de6,_0x149c30,this);this['_eventCopyData']={'mapId':_0x276de6,'eventId':_0x149c30},this[_0x4df5a1(0x527)]=-0x2,this[_0x4df5a1(0x360)](),_0x522d0b[_0x4df5a1(0x1ed)][_0x4df5a1(0x1ee)](this,_0x276de6,_0x149c30,this);if(_0x475c2e)_0x475c2e[_0x4df5a1(0x1ed)][_0x4df5a1(0x1ee)](this,_0x276de6,_0x149c30,this);_0x56323a[_0x4df5a1(0x450)]();}}else VisuMZ['MoveAllSynchTargets'](this[_0x3ef301(0x1fb)]);}},Game_Event[_0x1d5a8d(0x1cf)]['isPreventSelfMovement']=function(){const _0x9e952b=_0x1d5a8d,_0xd7fad3=VisuMZ[_0x9e952b(0x424)][_0x9e952b(0x1d2)]['Movement'];if($gameMap[_0x9e952b(0x9b)]()&&_0xd7fad3['StopAutoMoveEvents'])return!![];if($gameMessage[_0x9e952b(0x476)]()&&_0xd7fad3[_0x9e952b(0x134)])return!![];if(!$gameSystem[_0x9e952b(0x42f)]())return!![];if(this[_0x9e952b(0x48d)]()>=0x0)return!![];return![];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x539)]=function(){const _0x342acf=_0x1d5a8d,_0x3cbd21=SceneManager['_scene'][_0x342acf(0x390)];if(_0x3cbd21){const _0x2165ec=_0x3cbd21['findTargetSprite'](this);if(_0x2165ec&&_0x2165ec[_0x342acf(0x261)]&&_0x2165ec['_shadowSprite'][_0x342acf(0x255)]!==this['shadowFilename']()){if(_0x342acf(0x428)===_0x342acf(0x109)){function _0x1f2c79(){const _0x4cb21e=_0x342acf;return this[_0x4cb21e(0x54f)](0x2,_0x27be87(_0x4857f5['$1']));}}else _0x2165ec['_shadowSprite'][_0x342acf(0x255)]=this[_0x342acf(0x54c)](),_0x2165ec[_0x342acf(0x261)][_0x342acf(0x3ad)]=ImageManager[_0x342acf(0x3b3)](_0x2165ec['_shadowSprite']['_filename']);}}},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x54c)]=function(){const _0x14bd7d=_0x1d5a8d;return this[_0x14bd7d(0x1a6)]['filename'];},Game_Event['prototype'][_0x1d5a8d(0x308)]=function(){const _0x439ae6=_0x1d5a8d;if(!this['_shadowGraphic'][_0x439ae6(0x385)])return![];return Game_CharacterBase['prototype']['isShadowVisible'][_0x439ae6(0x1ee)](this);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x29e)]=function(){const _0x19d49d=_0x1d5a8d;return this[_0x19d49d(0x52b)][_0x19d49d(0x193)];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x141)]=function(){const _0x43c333=_0x1d5a8d;return this['_labelWindow'][_0x43c333(0x41a)];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3a3)]=function(_0x234152,_0x1d92d3,_0x12de93){const _0x401fe9=_0x1d5a8d;if(this[_0x401fe9(0x53b)]())return this[_0x401fe9(0x1c7)](_0x234152,_0x1d92d3,_0x12de93);if($gameMap[_0x401fe9(0x15f)](_0x234152,_0x1d92d3,_0x12de93,'event'))return!![];if($gameMap[_0x401fe9(0x30e)](_0x234152,_0x1d92d3,_0x12de93,_0x401fe9(0x505)))return![];return Game_Character[_0x401fe9(0x1cf)][_0x401fe9(0x3a3)]['call'](this,_0x234152,_0x1d92d3,_0x12de93);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x53b)]=function(){const _0xbd29b7=_0x1d5a8d;if(this[_0xbd29b7(0x11b)]===undefined)this[_0xbd29b7(0x440)]();return this[_0xbd29b7(0x11b)][_0xbd29b7(0xd6)]>0x0;},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1c7)]=function(_0x50404d,_0x2afe0f,_0x3355cc){const _0x1c005b=_0x1d5a8d,_0x178311=$gameMap['roundXWithDirection'](_0x50404d,_0x3355cc),_0x18ab08=$gameMap[_0x1c005b(0x3f6)](_0x2afe0f,_0x3355cc),_0x45b3d2=$gameMap[_0x1c005b(0xf6)](_0x178311,_0x18ab08);return this[_0x1c005b(0x11b)][_0x1c005b(0x26d)](_0x45b3d2);},VisuMZ[_0x1d5a8d(0x424)]['Game_Event_findProperPageIndex']=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x37c)],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x37c)]=function(){const _0x1b9bb3=_0x1d5a8d;return this[_0x1b9bb3(0x40c)]=![],this[_0x1b9bb3(0x521)]=![],this[_0x1b9bb3(0x505)]()?VisuMZ[_0x1b9bb3(0x424)][_0x1b9bb3(0x421)][_0x1b9bb3(0x1ee)](this):-0x1;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x131)]=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3d0)],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3d0)]=function(_0x122b81){const _0x180e77=_0x1d5a8d;this[_0x180e77(0x53a)](_0x122b81),$gameTemp['registerSelfTarget'](this);const _0x3245f3=VisuMZ[_0x180e77(0x424)][_0x180e77(0x131)][_0x180e77(0x1ee)](this,_0x122b81);return $gameTemp[_0x180e77(0x4a8)](),_0x3245f3;},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x20f)]=function(){const _0x32180d=_0x1d5a8d;return this[_0x32180d(0x40c)];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x53a)]=function(_0x3e4717){const _0x2ff0d5=_0x1d5a8d,_0xf806f1=_0x3e4717['conditions'];if(_0xf806f1['switch1Valid']&&DataManager[_0x2ff0d5(0x42d)](_0xf806f1[_0x2ff0d5(0x556)])){if(_0x2ff0d5(0x453)==='pozGk'){function _0x24b577(){const _0x52835f=_0x2ff0d5;this[_0x52835f(0x3ab)](_0x21b39d);}}else this[_0x2ff0d5(0x40c)]=!![];}else{if(_0xf806f1['switch2Valid']&&DataManager[_0x2ff0d5(0x42d)](_0xf806f1['switch2Id']))this['_advancedSwitchVariable']=!![];else _0xf806f1[_0x2ff0d5(0x439)]&&DataManager['isAdvancedVariable'](_0xf806f1[_0x2ff0d5(0x2aa)])&&(this[_0x2ff0d5(0x40c)]=!![]);}},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xed)]=function(){const _0x32da5e=_0x1d5a8d;if(this['_erased'])return![];return this[_0x32da5e(0x1cd)];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1e9)]=function(){const _0x3a64bb=_0x1d5a8d;$gameTemp[_0x3a64bb(0x549)](),this[_0x3a64bb(0x519)]();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4b7)]=function(_0x3621b6,_0x5c4546){const _0x54450c=_0x1d5a8d;if(this[_0x54450c(0x462)]){if(_0x54450c(0xd2)==='OsIgp')return this[_0x54450c(0x45a)](_0x3621b6,_0x5c4546);else{function _0xdb0a04(){const _0x20643a=_0x54450c;if(this[_0x20643a(0x46b)]()&&this[_0x20643a(0xd7)]()===_0x20643a(0xd9))return!![];return _0x10d681[_0x20643a(0x424)][_0x20643a(0x3e2)][_0x20643a(0x1ee)](this);}}}else return Game_Character[_0x54450c(0x1cf)]['pos'][_0x54450c(0x1ee)](this,_0x3621b6,_0x5c4546);},Game_Event['prototype'][_0x1d5a8d(0x45a)]=function(_0x237451,_0x4c38b7){const _0x1e8c03=_0x1d5a8d;var _0x140e82=this['x']-this[_0x1e8c03(0x462)][_0x1e8c03(0x349)],_0x49e3b0=this['x']+this[_0x1e8c03(0x462)][_0x1e8c03(0x4f4)],_0x3d44e8=this['y']-this[_0x1e8c03(0x462)]['up'],_0x38a006=this['y']+this[_0x1e8c03(0x462)][_0x1e8c03(0x350)];return _0x140e82<=_0x237451&&_0x237451<=_0x49e3b0&&_0x3d44e8<=_0x4c38b7&&_0x4c38b7<=_0x38a006;},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa9)]=function(_0x305ed,_0x4df64d,_0x3fb91a){const _0x255a61=_0x1d5a8d;for(let _0x50b8b4=-this[_0x255a61(0x462)][_0x255a61(0x349)];_0x50b8b4<=this[_0x255a61(0x462)][_0x255a61(0x4f4)];_0x50b8b4++){for(let _0x2efc3f=-this[_0x255a61(0x462)]['up'];_0x2efc3f<=this[_0x255a61(0x462)][_0x255a61(0x350)];_0x2efc3f++){if(!Game_Character[_0x255a61(0x1cf)]['canPass'][_0x255a61(0x1ee)](this,_0x305ed+_0x50b8b4,_0x4df64d+_0x2efc3f,_0x3fb91a)){if(_0x255a61(0x3a8)===_0x255a61(0x3a8))return![];else{function _0x1e6d25(){const _0x5590d1=_0x255a61;return _0x121f8c[_0x5590d1(0x3bc)]();}}}}}return!![];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x364)]=function(_0x40cd2f,_0x3d7933){const _0x175281=_0x1d5a8d;if(Imported[_0x175281(0x200)]&&this[_0x175281(0x43e)]())return this[_0x175281(0x43d)](_0x40cd2f,_0x3d7933);else{if(_0x175281(0x151)==='QzRkU'){function _0x3fe45e(){const _0x58b126=_0x175281,_0x580937=this[_0x58b126(0x495)](),_0x3d0e0c=_0xd06ef4['roundXWithDirection'](this['x'],_0x580937),_0x5ba895=_0x3392ba[_0x58b126(0x3f6)](this['y'],_0x580937);this['startMapCommonEventOnOK'](_0x3d0e0c,_0x5ba895);}}else{const _0x5c4621=$gameMap[_0x175281(0x1db)](_0x40cd2f,_0x3d7933)[_0x175281(0xaa)](_0x4d8b77=>_0x4d8b77!==this);return _0x5c4621['length']>0x0;}}},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x43d)]=function(_0x10d4bb,_0x5a5205){const _0x385e0f=_0x1d5a8d;if(!this[_0x385e0f(0xd8)]()){if('nsGaG'!==_0x385e0f(0x3ca))return![];else{function _0x1466f9(){const _0x4dea20=_0x385e0f,_0x3cd94e=/\\SELFVAR\[(\d+)\]/gi;while(_0x3c80b8[_0x4dea20(0x403)](_0x3cd94e)){_0x3c4af7=_0x12dcda[_0x4dea20(0x16b)](_0x3cd94e,(_0x2283d6,_0x593c25)=>_0x5549b8(this[_0x4dea20(0x4a4)],this[_0x4dea20(0x1fb)],_0x5b0f77(_0x593c25)));}return _0x45a8a5;}}}else{if(_0x385e0f(0x468)!=='bniJI'){const _0x184545=$gameMap['eventsXyNt'](_0x10d4bb,_0x5a5205)['filter'](_0x145d45=>_0x145d45!==this&&_0x145d45[_0x385e0f(0xd8)]());return _0x184545[_0x385e0f(0xd6)]>0x0;}else{function _0x1b2cf5(){const _0x2b828c=_0x385e0f;if(this['_followerChaseOff']===_0x4cac55)this[_0x2b828c(0x44e)]();return this['_followerChaseOff'];}}}},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x45d)]=function(){const _0xac6dcd=_0x1d5a8d;return this[_0xac6dcd(0x175)][_0xac6dcd(0x50e)]||_0xac6dcd(0x377);},Game_Event[_0x1d5a8d(0x1cf)]['activationProximityDistance']=function(){const _0x48ce15=_0x1d5a8d;return this[_0x48ce15(0x175)][_0x48ce15(0x49f)]||0x0;},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x281)]=function(){const _0x84085c=_0x1d5a8d;return this[_0x84085c(0x175)]['regionList']||[];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x242)]=function(){const _0x3da268=_0x1d5a8d;Game_Character[_0x3da268(0x1cf)][_0x3da268(0x242)]['call'](this);if([_0x3da268(0x377),_0x3da268(0x102)]['includes'](this[_0x3da268(0x45d)]()))return;$gamePlayer[_0x3da268(0x2b6)]([0x2]);},VisuMZ['EventsMoveCore']['Game_Event_checkEventTriggerAuto']=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f0)],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3f0)]=function(){const _0x4e5ef6=_0x1d5a8d;if(this[_0x4e5ef6(0x482)]!==0x3)return;if(this[_0x4e5ef6(0x287)])return;if(!this[_0x4e5ef6(0x182)](![]))return;if(!this[_0x4e5ef6(0x371)](![]))return;VisuMZ['EventsMoveCore'][_0x4e5ef6(0x50b)][_0x4e5ef6(0x1ee)](this);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3e6)]=Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x169)],Game_Event['prototype'][_0x1d5a8d(0x169)]=function(){const _0x4eac94=_0x1d5a8d;if(!this[_0x4eac94(0xf5)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ[_0x4eac94(0x424)][_0x4eac94(0x3e6)][_0x4eac94(0x1ee)](this);},Game_Event[_0x1d5a8d(0x1cf)]['checkRegionEventTrigger']=function(_0x10f2b6){const _0x549560=_0x1d5a8d;if(!_0x10f2b6&&$gameMap[_0x549560(0x9b)]())return![];if(!_0x10f2b6&&$gameMap[_0x549560(0x3b4)]())return![];if(this[_0x549560(0x281)]()<=0x0)return!![];return $gamePlayer[_0x549560(0x54d)](this);},Game_Event[_0x1d5a8d(0x1cf)]['checkActivationProximity']=function(_0x1e22a0){const _0x403681=_0x1d5a8d;if(!_0x1e22a0&&$gameMap[_0x403681(0x9b)]())return![];if(!_0x1e22a0&&$gameMap[_0x403681(0x3b4)]())return![];if([_0x403681(0x377),_0x403681(0x102)][_0x403681(0x26d)](this['activationProximityType']()))return!![];return $gamePlayer[_0x403681(0x186)](this);},VisuMZ['MoveAllSynchTargets']=function(_0x28d2a2){const _0x3fcb4a=_0x1d5a8d;for(const _0x7790e6 of $gameMap[_0x3fcb4a(0x280)]()){if('KlktJ'===_0x3fcb4a(0x51c)){if(!_0x7790e6)continue;if(_0x7790e6[_0x3fcb4a(0x48d)]()===_0x28d2a2){if('miAZA'!==_0x3fcb4a(0x2a2)){function _0x1184c1(){const _0xd40c5=_0x3fcb4a;if(this[_0xd40c5(0x46c)](_0x5839ca,_0x321ab2))return![];}}else _0x7790e6[_0x3fcb4a(0x529)]();}}else{function _0x19d092(){const _0x336982=_0x3fcb4a;this[_0x336982(0xf2)][_0x336982(0xd0)][_0x336982(0x1ff)](_0x194812,this[_0x336982(0x283)]);}}}},VisuMZ[_0x1d5a8d(0x1de)]=function(_0x41394b){const _0x39450a=_0x1d5a8d;if(_0x41394b===0x0)return $gamePlayer;return $gameMap[_0x39450a(0x505)](_0x41394b);},Game_Event[_0x1d5a8d(0x1cf)]['moveSynchTarget']=function(){const _0x5f2e34=_0x1d5a8d;return this[_0x5f2e34(0x523)]['target'];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x537)]=function(){const _0x37524c=_0x1d5a8d;return this[_0x37524c(0x523)][_0x37524c(0x50e)];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xb3)]=function(){const _0x5d8333=_0x1d5a8d;if(this[_0x5d8333(0x48d)]()>=0x0){if(_0x5d8333(0x47a)===_0x5d8333(0x254)){function _0xb8102f(){const _0x13f847=_0x5d8333;_0x279cd9[0x2]=_0x13f847(0x23d)[_0x13f847(0x3eb)](_0x53f847);}}else{const _0x1ed8f2=VisuMZ[_0x5d8333(0x1de)](this[_0x5d8333(0x48d)]());if(_0x1ed8f2)return _0x1ed8f2['realMoveSpeed']();}}return Game_Character[_0x5d8333(0x1cf)][_0x5d8333(0xb3)][_0x5d8333(0x1ee)](this);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x529)]=function(){const _0x2b5922=_0x1d5a8d;this[_0x2b5922(0x523)]['timer']=this[_0x2b5922(0x523)]['timer']||0x0,this[_0x2b5922(0x523)][_0x2b5922(0x1af)]--;if(this[_0x2b5922(0x523)][_0x2b5922(0x1af)]>0x0)return;this['_moveSynch'][_0x2b5922(0x1af)]=this[_0x2b5922(0x523)][_0x2b5922(0x123)],this[_0x2b5922(0x1c9)]();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1c9)]=function(){const _0x13c591=_0x1d5a8d;switch(this['moveSynchType']()){case'random':this[_0x13c591(0x248)]();break;case _0x13c591(0xbc):this[_0x13c591(0x48a)]();break;case _0x13c591(0x38c):this[_0x13c591(0x14b)]();break;case _0x13c591(0x3c7):this['processMoveSynchCustom']();break;case _0x13c591(0x147):case _0x13c591(0xe2):this[_0x13c591(0x423)]();break;case _0x13c591(0x1e1):case _0x13c591(0x2ad):this[_0x13c591(0x98)]();break;case _0x13c591(0x359):case _0x13c591(0x112):case _0x13c591(0x13e):case'horz\x20mirror':this['processMoveSynchMirrorHorz']();break;case _0x13c591(0x489):case'vertical\x20mirror':case _0x13c591(0x530):case _0x13c591(0x199):this[_0x13c591(0xa6)]();break;default:this['processMoveSynchRandom']();break;}this['update']();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x248)]=function(){const _0x2087a3=_0x1d5a8d,_0x8a8555=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x8a8555[_0x2087a3(0x2a1)](0x1,0x3,0x7,0x9);const _0x51c59b=[];for(const _0x2efc50 of _0x8a8555){if(this[_0x2087a3(0xa9)](this['x'],this['y'],_0x2efc50))_0x51c59b['push'](_0x2efc50);}if(_0x51c59b[_0x2087a3(0xd6)]>0x0){const _0x529b49=_0x51c59b[Math[_0x2087a3(0x346)](_0x51c59b[_0x2087a3(0xd6)])];this[_0x2087a3(0x31f)](_0x529b49);}},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x48a)]=function(){const _0x236229=_0x1d5a8d,_0x4f5f31=VisuMZ[_0x236229(0x1de)](this['moveSynchTarget']());this[_0x236229(0x384)](_0x4f5f31);},Game_Event[_0x1d5a8d(0x1cf)]['processMoveSynchAway']=function(){const _0x550d8c=_0x1d5a8d,_0x44c7ec=VisuMZ[_0x550d8c(0x1de)](this[_0x550d8c(0x48d)]());this[_0x550d8c(0x269)](_0x44c7ec);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x33c)]=function(){const _0x4239f7=_0x1d5a8d;this[_0x4239f7(0x4a6)]();},Game_Event[_0x1d5a8d(0x1cf)]['processMoveSynchMimic']=function(){const _0x1bc3ad=_0x1d5a8d,_0x14fb18=VisuMZ[_0x1bc3ad(0x1de)](this[_0x1bc3ad(0x48d)]());this['executeMoveDir8'](_0x14fb18[_0x1bc3ad(0x477)]());},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x98)]=function(){const _0x15d075=_0x1d5a8d,_0x497800=VisuMZ[_0x15d075(0x1de)](this[_0x15d075(0x48d)]()),_0x269bfb=this[_0x15d075(0x3ec)](_0x497800[_0x15d075(0x477)]());this[_0x15d075(0x31f)](this[_0x15d075(0x3ec)](_0x497800[_0x15d075(0x495)]()));},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x177)]=function(){const _0x131dc7=_0x1d5a8d,_0xfa1273=VisuMZ[_0x131dc7(0x1de)](this[_0x131dc7(0x48d)]()),_0x36d07f=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0xfa1273[_0x131dc7(0x477)]()];this[_0x131dc7(0x31f)](_0x36d07f);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa6)]=function(){const _0xff9674=_0x1d5a8d,_0x3a3efa=VisuMZ[_0xff9674(0x1de)](this[_0xff9674(0x48d)]()),_0x432b04=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x3a3efa[_0xff9674(0x477)]()];this['executeMoveDir8'](_0x432b04);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x42a)]=function(){const _0x3d396d=_0x1d5a8d,_0x470ce7=$gameSystem[_0x3d396d(0x167)](this);if(!_0x470ce7)return;this[_0x3d396d(0x217)](_0x470ce7['x'],_0x470ce7['y']),this['setDirection'](_0x470ce7[_0x3d396d(0x495)]);if(this[_0x3d396d(0x527)]===_0x470ce7[_0x3d396d(0xde)]){if('MSgHH'==='MSgHH')this[_0x3d396d(0x4e9)]=_0x470ce7[_0x3d396d(0x18a)];else{function _0x2a29d5(){const _0xecffae=_0x3d396d;this[_0xecffae(0x239)]['bufferX']=_0x3558f5(_0x118e2f['$1']),this[_0xecffae(0x239)][_0xecffae(0x44a)]=_0x59746f(_0x408044['$2']);}}}},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x302)]=function(){const _0x8f8db9=_0x1d5a8d;Game_Character[_0x8f8db9(0x1cf)][_0x8f8db9(0x302)]['call'](this),this[_0x8f8db9(0xa7)]();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x53e)]=function(){const _0x3eb2ae=_0x1d5a8d;if($gameMap[_0x3eb2ae(0x51f)]())return!![];return this[_0x3eb2ae(0x45c)];},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xa7)]=function(){const _0x21d870=_0x1d5a8d;if(!this['isSaveEventLocation']())return;this[_0x21d870(0x2eb)]();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2eb)]=function(){const _0x45c5e4=_0x1d5a8d;$gameSystem[_0x45c5e4(0x2eb)](this);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x30a)]=function(){const _0x3e4758=_0x1d5a8d;$gameSystem[_0x3e4758(0x21d)](this);},Game_Event['prototype'][_0x1d5a8d(0x4e3)]=function(){const _0x232a62=_0x1d5a8d;return $gameSystem['getEventIconData'](this)?Game_Character['prototype'][_0x232a62(0x4e3)][_0x232a62(0x1ee)](this):{'iconIndex':0x0,'bufferX':settings[_0x232a62(0x170)][_0x232a62(0xe9)],'bufferY':settings[_0x232a62(0x170)][_0x232a62(0x3a0)],'blendMode':settings[_0x232a62(0x170)][_0x232a62(0x33a)]};},Game_Event[_0x1d5a8d(0x1cf)]['hasCPCs']=function(){const _0x821bca=_0x1d5a8d;return this[_0x821bca(0x521)];},VisuMZ['EventsMoveCore']['Game_Event_meetsConditionsCPC']=Game_Event['prototype'][_0x1d5a8d(0x3d0)],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3d0)]=function(_0xbc1233){const _0x39b0c3=_0x1d5a8d,_0x39e107=VisuMZ['EventsMoveCore']['Game_Event_meetsConditionsCPC'][_0x39b0c3(0x1ee)](this,_0xbc1233);if(!_0x39e107)return![];return this[_0x39b0c3(0x361)](_0xbc1233);},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x361)]=function(_0x44913b){const _0x369d78=_0x1d5a8d;VisuMZ['EventsMoveCore'][_0x369d78(0x524)][_0x369d78(0x507)](_0x44913b),this[_0x369d78(0x521)]=_0x44913b[_0x369d78(0x3d2)][_0x369d78(0xd6)]>0x0;if(_0x44913b[_0x369d78(0x3d2)]===undefined){if(_0x369d78(0x2d8)===_0x369d78(0x410)){function _0x11437b(){const _0x163435=_0x369d78;_0xd91b11[_0x163435(0x490)](_0x5eece6,!!_0x4d4a5e);}}else VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x369d78(0x507)](_0x44913b);}if(_0x44913b[_0x369d78(0x3d2)][_0x369d78(0xd6)]>0x0)return $gameMap[_0x369d78(0x505)](this['_eventId'])&&VisuMZ[_0x369d78(0x424)]['CustomPageConditions'][_0x369d78(0x4d2)](_0x44913b[_0x369d78(0x3d2)],this[_0x369d78(0x1fb)]);return!![];},VisuMZ[_0x1d5a8d(0x424)]['Game_Troop_meetsConditionsCPC']=Game_Troop[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3d0)],Game_Troop[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3d0)]=function(_0x3ea795){const _0x26ac4c=_0x1d5a8d;var _0xa00869=VisuMZ['EventsMoveCore'][_0x26ac4c(0x3af)][_0x26ac4c(0x1ee)](this,_0x3ea795);return _0xa00869&&this['CPCsMet'](_0x3ea795);},Game_Troop['prototype'][_0x1d5a8d(0x3b5)]=function(_0x5e9fe3){const _0x2f9af7=_0x1d5a8d;_0x5e9fe3['CPC']===undefined&&VisuMZ[_0x2f9af7(0x424)]['CustomPageConditions'][_0x2f9af7(0x507)](_0x5e9fe3);if(_0x5e9fe3[_0x2f9af7(0x3d2)][_0x2f9af7(0xd6)]>0x0){if('NVgbP'!==_0x2f9af7(0x236)){function _0x5c8aa8(){const _0x28e8ce=_0x2f9af7;return this[_0x28e8ce(0x203)](_0x886279);}}else return VisuMZ[_0x2f9af7(0x424)][_0x2f9af7(0x524)][_0x2f9af7(0x4d2)](_0x5e9fe3[_0x2f9af7(0x3d2)],0x0);}return!![];},VisuMZ['EventsMoveCore']['Game_Event_locate']=Game_Event[_0x1d5a8d(0x1cf)]['locate'],Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x217)]=function(_0x21c8fe,_0x477637){const _0x4dafc4=_0x1d5a8d;VisuMZ[_0x4dafc4(0x424)][_0x4dafc4(0x368)]['call'](this,_0x21c8fe,_0x477637),this[_0x4dafc4(0x2d6)]=_0x21c8fe,this[_0x4dafc4(0x399)]=_0x477637;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x32f)]=Game_Event['prototype'][_0x1d5a8d(0x488)],Game_Event[_0x1d5a8d(0x1cf)]['moveTypeRandom']=function(){const _0x59b402=_0x1d5a8d,_0x148904=$gameMap[_0x59b402(0x49f)](this['x'],this['y'],this[_0x59b402(0x2d6)],this[_0x59b402(0x399)]),_0x21c995=_0x148904*(this[_0x59b402(0x3ae)]||0x0);Math['random']()>=_0x21c995?VisuMZ[_0x59b402(0x424)][_0x59b402(0x32f)][_0x59b402(0x1ee)](this):this[_0x59b402(0x99)]();},Game_Event[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x99)]=function(){const _0x2d8cd6=_0x1d5a8d,_0x22299d=this[_0x2d8cd6(0x2f4)](this['_randomHomeX']),_0x5519e4=this[_0x2d8cd6(0x120)](this[_0x2d8cd6(0x399)]);if(Math[_0x2d8cd6(0x263)](_0x22299d)>Math[_0x2d8cd6(0x263)](_0x5519e4)){if(_0x2d8cd6(0x14e)===_0x2d8cd6(0x14e))this[_0x2d8cd6(0x203)](_0x22299d>0x0?0x4:0x6),!this[_0x2d8cd6(0x1e5)]()&&_0x5519e4!==0x0&&this['moveStraight'](_0x5519e4>0x0?0x8:0x2);else{function _0xfc1be7(){const _0x5d3d82=_0x2d8cd6,_0x427c2b=_0x340c9d[_0x5d3d82(0x230)](this);if(!_0x427c2b)return;const _0x3b8789=_0x427c2b[_0x5d3d82(0x2d0)][_0x5d3d82(0xcf)]()['trim']();_0x3b8789!=='UNTITLED'?this[_0x5d3d82(0x3f4)](_0x3b8789,!![]):this['morphInto'](_0x427c2b[_0x5d3d82(0x25c)],_0x427c2b['eventId'],!![]);}}}else{if(_0x5519e4!==0x0){if(_0x2d8cd6(0x306)!=='pjFKD')this[_0x2d8cd6(0x203)](_0x5519e4>0x0?0x8:0x2),!this[_0x2d8cd6(0x1e5)]()&&_0x22299d!==0x0&&this[_0x2d8cd6(0x203)](_0x22299d>0x0?0x4:0x6);else{function _0x34ee4c(){const _0x1c3a79=_0x2d8cd6;return this[_0x1c3a79(0x203)](_0x5e28b1);}}}}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x247)]=Game_Interpreter['prototype'][_0x1d5a8d(0x43f)],Game_Interpreter[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x43f)]=function(){const _0xd25489=_0x1d5a8d;if(this[_0xd25489(0x41b)]===_0xd25489(0x1e4)){if('vFKwd'!=='vFKwd'){function _0x3dc082(){const _0x2ff5c1=_0xd25489;_0x4520e2[_0x2ff5c1(0x2b9)](this);const _0x272ca2=_0x48ae62[_0x2ff5c1(0x424)][_0x2ff5c1(0x2bd)][_0x2ff5c1(0x1ee)](this,_0x4be7a2);return _0x19e7c8[_0x2ff5c1(0x4a8)](),_0x272ca2;}}else{if(window[this[_0xd25489(0x386)]]){if('pwJHs'!==_0xd25489(0x357))this['_waitMode']='',this[_0xd25489(0x356)]();else{function _0x15a12f(){const _0x426152=_0xd25489;_0x570ce6=_0x2a7778[_0x426152(0x2cd)];}}}else{if(_0xd25489(0x4a5)!=='lTNev'){function _0x4151ce(){const _0x1698b3=_0xd25489;if(this['isPassable'](_0x35a427,_0x2d3e64,0x2))return!![];if(this[_0x1698b3(0x174)](_0x34fec6,_0x122088,0x4))return!![];if(this[_0x1698b3(0x174)](_0x1810ff,_0x419d4d,0x6))return!![];if(this[_0x1698b3(0x174)](_0x3fd813,_0x4761a8,0x8))return!![];return![];}}else return!![];}}}else return VisuMZ[_0xd25489(0x424)]['Game_Interpreter_updateWaitMode'][_0xd25489(0x1ee)](this);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x512)]=Game_Interpreter['prototype'][_0x1d5a8d(0x17a)],Game_Interpreter['prototype'][_0x1d5a8d(0x17a)]=function(){const _0x414b56=_0x1d5a8d,_0x2464f7=$gameMap&&this[_0x414b56(0x1fb)]?$gameMap[_0x414b56(0x505)](this[_0x414b56(0x1fb)]):null;$gameTemp[_0x414b56(0x2b9)](_0x2464f7);const _0x30e59f=VisuMZ['EventsMoveCore'][_0x414b56(0x512)]['call'](this);return $gameTemp['clearSelfTarget'](),_0x30e59f;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x4e4)]=Game_Interpreter[_0x1d5a8d(0x1cf)]['command357'],Game_Interpreter[_0x1d5a8d(0x1cf)]['command357']=function(_0xf72302){const _0x3c736a=_0x1d5a8d;return $gameTemp[_0x3c736a(0x2c8)](this),VisuMZ[_0x3c736a(0x424)][_0x3c736a(0x4e4)][_0x3c736a(0x1ee)](this,_0xf72302);},Game_Interpreter['prototype'][_0x1d5a8d(0x206)]=function(_0x1d682d){const _0x581cb4=_0x1d5a8d;this[_0x581cb4(0x284)]=_0x1d682d;const _0x333fb7=_0x581cb4(0x16c)[_0x581cb4(0x3eb)](_0x1d682d['mapId'][_0x581cb4(0x1bd)](0x3));this[_0x581cb4(0x386)]=_0x581cb4(0x23f)+Graphics[_0x581cb4(0x355)]+'_'+this['eventId'](),DataManager[_0x581cb4(0x4cc)](this['_callEventMap'],_0x333fb7),window[this[_0x581cb4(0x386)]]?this['startCallEvent']():this[_0x581cb4(0x1f1)](_0x581cb4(0x1e4));},Game_Interpreter[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x356)]=function(){const _0x51e2a5=_0x1d5a8d,_0x4b605b=this['_callEventData'],_0x683e3d=window[this[_0x51e2a5(0x386)]],_0x47c13c=_0x683e3d[_0x51e2a5(0x280)][_0x4b605b[_0x51e2a5(0x32d)]];if(_0x47c13c&&_0x47c13c['pages'][_0x4b605b[_0x51e2a5(0x161)]-0x1]){const _0x45723a=_0x47c13c[_0x51e2a5(0x216)][_0x4b605b[_0x51e2a5(0x161)]-0x1][_0x51e2a5(0x36f)];this[_0x51e2a5(0x4b9)](_0x45723a,this['eventId']());}window[this['_callEventMap']]=undefined,this[_0x51e2a5(0x386)]=undefined,this[_0x51e2a5(0x284)]=undefined;};function _0x2a48(_0x427a15,_0x534e7f){_0x427a15=_0x427a15-0x98;let _0x139b06=_0x139b[_0x427a15];return _0x139b06;}function Game_CPCInterpreter(){const _0x5b5eda=_0x1d5a8d;this[_0x5b5eda(0x475)][_0x5b5eda(0x3f9)](this,arguments);};Game_CPCInterpreter[_0x1d5a8d(0x1cf)]=Object[_0x1d5a8d(0x372)](Game_Interpreter[_0x1d5a8d(0x1cf)]),Game_CPCInterpreter['prototype'][_0x1d5a8d(0x214)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4f3)]=function(){const _0x17af43=_0x1d5a8d;Game_Interpreter[_0x17af43(0x1cf)][_0x17af43(0x4f3)][_0x17af43(0x1ee)](this),this[_0x17af43(0x100)]=![];},Game_CPCInterpreter['prototype']['execute']=function(){const _0x47508e=_0x1d5a8d;while(this[_0x47508e(0x191)]()){if('LmFse'===_0x47508e(0x1b7)){function _0x2f867a(){const _0x37232c=_0x47508e;this[_0x37232c(0x233)]();}}else this[_0x47508e(0x17a)]();}},Game_CPCInterpreter[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x41e)]=function(_0x191521){const _0x2dd20c=_0x1d5a8d;return Game_Interpreter[_0x2dd20c(0x1cf)]['command108'][_0x2dd20c(0x1ee)](this,_0x191521),this[_0x2dd20c(0x4e8)][_0x2dd20c(0x435)](_0x1c81b0=>_0x1c81b0[_0x2dd20c(0x403)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x2dd20c(0x100)]=!![]),!![];},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x395)]=Scene_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x316)],Scene_Map['prototype'][_0x1d5a8d(0x316)]=function(){const _0x1bbe98=_0x1d5a8d;VisuMZ['EventsMoveCore'][_0x1bbe98(0x395)]['call'](this),this[_0x1bbe98(0x390)][_0x1bbe98(0x184)]();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3a2)]=Scene_Load[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x538)],Scene_Load['prototype'][_0x1d5a8d(0x538)]=function(){const _0x46658d=_0x1d5a8d;if($gameMap)$gameMap[_0x46658d(0x450)]();VisuMZ[_0x46658d(0x424)][_0x46658d(0x3a2)][_0x46658d(0x1ee)](this);},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x422)]=Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1ac)],Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1ac)]=function(){const _0xfe278d=_0x1d5a8d;VisuMZ[_0xfe278d(0x424)][_0xfe278d(0x422)]['call'](this),this[_0xfe278d(0x1ae)](),this[_0xfe278d(0x340)]();},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1ae)]=function(){const _0x454dc2=_0x1d5a8d;this[_0x454dc2(0x4c9)]=0xff;},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x340)]=function(){const _0x6db8f2=_0x1d5a8d;this[_0x6db8f2(0x4ab)]=new Sprite(),this[_0x6db8f2(0x4ab)]['bitmap']=ImageManager['loadSystem'](_0x6db8f2(0x43b)),this['_eventIconSprite'][_0x6db8f2(0x3ad)][_0x6db8f2(0x4ec)]=![],this[_0x6db8f2(0x4ab)][_0x6db8f2(0x33d)](0x0,0x0,0x0,0x0),this[_0x6db8f2(0x4ab)][_0x6db8f2(0x376)]['x']=0.5,this['_eventIconSprite'][_0x6db8f2(0x376)]['y']=0x1,this[_0x6db8f2(0xfe)](this['_eventIconSprite']);},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x10c)]=function(){const _0x4b64d7=_0x1d5a8d;return this[_0x4b64d7(0x1a3)]&&this['_characterName'][_0x4b64d7(0x403)](/\[VS8\]/i);},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2b1)]=function(){const _0x38cc63=_0x1d5a8d;return this[_0x38cc63(0x10c)]()&&VisuMZ[_0x38cc63(0x424)][_0x38cc63(0x1d2)][_0x38cc63(0x3c1)][_0x38cc63(0x31b)];},VisuMZ['EventsMoveCore']['Sprite_Character_update']=Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xe4)],Sprite_Character['prototype'][_0x1d5a8d(0xe4)]=function(){const _0x5eb653=_0x1d5a8d;VisuMZ[_0x5eb653(0x424)][_0x5eb653(0x265)]['call'](this);if(VisuMZ[_0x5eb653(0x424)]['Settings'][_0x5eb653(0x12e)][_0x5eb653(0x282)]){if(_0x5eb653(0x49a)!=='igcSG'){function _0x5f21e3(){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x24733f);}}else this[_0x5eb653(0xaf)]();}this[_0x5eb653(0x261)]&&this['updateShadow'](),this[_0x5eb653(0x4ab)]&&this[_0x5eb653(0x3e1)]();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x18d)]=Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x44c)],Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x44c)]=function(){const _0x148338=_0x1d5a8d;VisuMZ[_0x148338(0x424)]['Sprite_Character_setTileBitmap'][_0x148338(0x1ee)](this),this[_0x148338(0x3ad)][_0x148338(0x522)](this[_0x148338(0x1fd)][_0x148338(0x156)](this));},VisuMZ['EventsMoveCore'][_0x1d5a8d(0xff)]=Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3ba)],Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3ba)]=function(){const _0x4a9230=_0x1d5a8d;VisuMZ[_0x4a9230(0x424)][_0x4a9230(0xff)][_0x4a9230(0x1ee)](this),this['bitmap']['addLoadListener'](this['updateBitmapSmoothing'][_0x4a9230(0x156)](this));},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1fd)]=function(){const _0x21c7da=_0x1d5a8d;if(!this[_0x21c7da(0x3ad)])return;this[_0x21c7da(0x3ad)][_0x21c7da(0x4ec)]=!!VisuMZ[_0x21c7da(0x424)][_0x21c7da(0x1d2)]['Movement'][_0x21c7da(0x4e2)];},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x41f)]=Sprite_Character['prototype'][_0x1d5a8d(0x4d5)],Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4d5)]=function(){const _0x18991b=_0x1d5a8d;if(this[_0x18991b(0x10c)]()){if(_0x18991b(0x4b3)!==_0x18991b(0x4b3)){function _0x138581(){const _0x2aef68=_0x18991b,_0x5650da=_0x5fc581[_0x2aef68(0x3a1)];if(_0x5650da[_0x2aef68(0x162)]&&_0x58220d['isAdvancedSwitch'](_0x5650da[_0x2aef68(0x556)]))this[_0x2aef68(0x40c)]=!![];else{if(_0x5650da[_0x2aef68(0x398)]&&_0x42b141[_0x2aef68(0x42d)](_0x5650da[_0x2aef68(0x387)]))this[_0x2aef68(0x40c)]=!![];else _0x5650da[_0x2aef68(0x439)]&&_0xc0546['isAdvancedVariable'](_0x5650da[_0x2aef68(0x2aa)])&&(this[_0x2aef68(0x40c)]=!![]);}}}else return this[_0x18991b(0x472)]();}else{if('dEaKj'!==_0x18991b(0x331)){function _0x1fccda(){const _0x328025=_0x18991b;for(const _0x42b81d of _0x10a4d0){if(_0x42b81d['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x304837=_0x280f99(_0x4149f2['$1'])[_0x328025(0x44f)]()[_0x328025(0x35f)](),_0xe4e31e=_0x5f0869(_0x3b6bf4['$2']);this[_0x328025(0x462)][_0x304837]=_0xe4e31e;}}}}else return VisuMZ[_0x18991b(0x424)][_0x18991b(0x41f)]['call'](this);}},Sprite_Character[_0x1d5a8d(0x1cf)]['characterPatternYVS8']=function(){const _0x5e88e8=_0x1d5a8d,_0x45c3cb=this['_character'][_0x5e88e8(0x495)](),_0x28305=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x28305[_0x45c3cb]-0x2)/0x2;},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xaf)]=function(){const _0xcdb5b7=_0x1d5a8d;this[_0xcdb5b7(0xbb)]=0x0;if(this[_0xcdb5b7(0x39b)]()){if(_0xcdb5b7(0x164)==='pIbJy'){function _0x2669cb(){const _0x5bec60=_0xcdb5b7;if([0x2,0x4,0x6,0x8][_0x5bec60(0x26d)](_0x239c3e))return 0x0;if([0x1,0x3,0x7,0x9][_0x5bec60(0x26d)](_0x1750b0))return 0x1;}}else{const _0x608563=VisuMZ[_0xcdb5b7(0x424)]['Settings'][_0xcdb5b7(0x12e)],_0x17a286=this[_0xcdb5b7(0xd0)]['direction']();let _0x481f91=0x0;if([0x1,0x4,0x7][_0xcdb5b7(0x26d)](_0x17a286))_0x481f91=_0x608563[_0xcdb5b7(0x2e2)];if([0x3,0x6,0x9][_0xcdb5b7(0x26d)](_0x17a286))_0x481f91=_0x608563['TiltRight'];if([0x2,0x8][_0xcdb5b7(0x26d)](_0x17a286)){if('KEZWI'!==_0xcdb5b7(0x20c)){function _0x3ca4cb(){const _0x31cae6=_0xcdb5b7,_0x51da1e=_0x417c58[_0x31cae6(0xc3)]();if(_0x51da1e===_0x31cae6(0x215))return!![];if(_0x51da1e===_0x31cae6(0x2fa))return![];if(this[_0x31cae6(0x336)]===_0x478443)this[_0x31cae6(0x105)]();return this['_diagonalSupport'];}}else _0x481f91=[-_0x608563['TiltVert'],0x0,_0x608563['TiltVert']][this[_0xcdb5b7(0xd0)][_0xcdb5b7(0x313)]()];}if(this[_0xcdb5b7(0x1bf)])_0x481f91*=-0x1;this[_0xcdb5b7(0xbb)]=_0x481f91;}}},Sprite_Character[_0x1d5a8d(0x1cf)]['isAllowCharacterTilt']=function(){const _0x51c7e3=_0x1d5a8d;if(this[_0x51c7e3(0x3a9)])return![];return this[_0x51c7e3(0xd0)][_0x51c7e3(0x237)]()&&!this[_0x51c7e3(0xd0)][_0x51c7e3(0x39a)]()&&!this['_character'][_0x51c7e3(0x46b)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2c3)]=function(){const _0x1197d6=_0x1d5a8d;this['_shadowSprite']['x']=this['_character']['shadowX'](),this[_0x1197d6(0x261)]['y']=this[_0x1197d6(0xd0)][_0x1197d6(0x1c8)](),this[_0x1197d6(0x261)][_0x1197d6(0x274)]=this[_0x1197d6(0x274)],this[_0x1197d6(0x261)][_0x1197d6(0x385)]=this['_character'][_0x1197d6(0x308)](),this[_0x1197d6(0x261)][_0x1197d6(0x143)]=this[_0x1197d6(0x143)];if(!this[_0x1197d6(0xd0)]['isShadowShrink']())this[_0x1197d6(0x261)][_0x1197d6(0x2d9)]['x']=Math[_0x1197d6(0x38b)](0x1,this[_0x1197d6(0x261)][_0x1197d6(0x2d9)]['x']+0.1),this[_0x1197d6(0x261)][_0x1197d6(0x2d9)]['y']=Math[_0x1197d6(0x38b)](0x1,this[_0x1197d6(0x261)][_0x1197d6(0x2d9)]['y']+0.1);else{if(_0x1197d6(0x4c0)===_0x1197d6(0x457)){function _0x35bad8(){const _0x2c08ad=_0x1197d6;_0x257ef5[_0x2c08ad(0x2e0)](0x0);}}else this[_0x1197d6(0x261)]['scale']['x']=Math[_0x1197d6(0x456)](0x0,this['_shadowSprite']['scale']['x']-0.1),this[_0x1197d6(0x261)][_0x1197d6(0x2d9)]['y']=Math['max'](0x0,this[_0x1197d6(0x261)][_0x1197d6(0x2d9)]['y']-0.1);}},Sprite_Character[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3e1)]=function(){const _0x231f08=_0x1d5a8d,_0x3d9c36=this['_eventIconSprite'],_0x312867=this[_0x231f08(0x4ae)]();if(_0x312867<=0x0){if(_0x231f08(0x19e)===_0x231f08(0x314)){function _0x129944(){const _0x379443=_0x231f08,_0xac8d2f=_0xca0fe5[_0x379443(0x505)](_0x548def[_0x379443(0x34a)]||_0x1bf618[_0x379443(0x32d)]());if(!_0xac8d2f)return;_0x48db29[_0x379443(0x292)]!=='UNTITLED'?_0xac8d2f[_0x379443(0x3f4)](_0x447c1a[_0x379443(0x292)]):_0xac8d2f[_0x379443(0x2bb)](_0x1980a5['Step2MapId'],_0x2d6b70[_0x379443(0x430)]||_0x51141f[_0x379443(0x32d)]());}}else return _0x3d9c36[_0x231f08(0x33d)](0x0,0x0,0x0,0x0);}else{const _0x29d7cf=ImageManager[_0x231f08(0x332)],_0x31ad89=ImageManager[_0x231f08(0x1f2)],_0x58483c=_0x312867%0x10*_0x29d7cf,_0xb4c498=Math[_0x231f08(0x250)](_0x312867/0x10)*_0x31ad89;_0x3d9c36['setFrame'](_0x58483c,_0xb4c498,_0x29d7cf,_0x31ad89),this['visible']=!![];}const _0x2a34b7=this[_0x231f08(0xd0)][_0x231f08(0x4e3)]();if(this[_0x231f08(0x2b1)]())this[_0x231f08(0x545)](_0x3d9c36);else{if('daepO'!=='daepO'){function _0xed355f(){const _0x5727dd=_0x231f08;if(this[_0x5727dd(0x33f)]===_0x32d0d6)this[_0x5727dd(0x44e)]();this['_followerChaseOff']=_0x2ec0a7;;}}else _0x3d9c36['x']=_0x2a34b7?_0x2a34b7[_0x231f08(0x474)]:0x0,_0x3d9c36['y']=_0x2a34b7?-this[_0x231f08(0x229)]+_0x2a34b7[_0x231f08(0x44a)]:0x0;}_0x3d9c36[_0x231f08(0x262)]=_0x2a34b7?_0x2a34b7[_0x231f08(0x262)]:0x0,this[_0x231f08(0x190)](_0x3d9c36),this[_0x231f08(0xfe)](_0x3d9c36),_0x3d9c36[_0x231f08(0xbb)]=-this[_0x231f08(0xbb)];},Sprite_Character[_0x1d5a8d(0x1cf)]['autoEventIconBuffer']=function(_0x4feba6){const _0x337271=_0x1d5a8d;_0x4feba6['x']=0x0,_0x4feba6['y']=-this['height']+this[_0x337271(0x229)]*0x2/0x5;if(this[_0x337271(0xd0)]['pattern']()!==0x1){if(_0x337271(0x15b)!=='ueerp')_0x4feba6['y']+=0x1;else{function _0x52449b(){const _0x241c06=_0x337271;if(this['_EventsMoveCoreSettings']===_0x2f91d2)this[_0x241c06(0x185)]();if(this[_0x241c06(0x1e2)][_0x241c06(0x286)]===_0x4d3307)this['initEventsMoveCore']();this[_0x241c06(0x1e2)][_0x241c06(0x286)]=_0x3f64fa;}}}},Sprite_Character['prototype'][_0x1d5a8d(0x4ae)]=function(){const _0x4d6bea=_0x1d5a8d;if(!this[_0x4d6bea(0xd0)])return 0x0;if(this[_0x4d6bea(0xd0)][_0x4d6bea(0x436)])return 0x0;const _0x56b793=this[_0x4d6bea(0xd0)][_0x4d6bea(0x4e3)]();return _0x56b793?_0x56b793['iconIndex']||0x0:0x0;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x1ca)]=Sprite_Balloon[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2f9)],Sprite_Balloon['prototype'][_0x1d5a8d(0x2f9)]=function(_0x4d434d,_0x5d2242){const _0x376c41=_0x1d5a8d;VisuMZ[_0x376c41(0x424)]['Sprite_Balloon_setup'][_0x376c41(0x1ee)](this,_0x4d434d,_0x5d2242);if(VisuMZ[_0x376c41(0x424)][_0x376c41(0x1d2)][_0x376c41(0x3c1)][_0x376c41(0x4a7)]){if(_0x376c41(0x290)===_0x376c41(0x290))this[_0x376c41(0xf2)]['_character'][_0x376c41(0x1ff)](_0x5d2242,this[_0x376c41(0x283)]);else{function _0x13e5fd(){const _0x9553c3=_0x376c41;_0x50afae['EventsMoveCore']['Game_System_initialize'][_0x9553c3(0x1ee)](this),this['initEventsMoveCore'](),this[_0x9553c3(0x44e)]();}}}},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x2f8)]=Sprite_Balloon['prototype'][_0x1d5a8d(0x1d3)],Sprite_Balloon[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1d3)]=function(){const _0x3a7c22=_0x1d5a8d;VisuMZ['EventsMoveCore'][_0x3a7c22(0x2f8)]['call'](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon['prototype'][_0x1d5a8d(0x244)]=function(){const _0x4ec713=_0x1d5a8d;this['_target'][_0x4ec713(0xd0)]['isSpriteVS8dir']()&&(this['x']+=VisuMZ[_0x4ec713(0x424)][_0x4ec713(0x1d2)][_0x4ec713(0x3c1)][_0x4ec713(0x205)],this['y']+=VisuMZ['EventsMoveCore'][_0x4ec713(0x1d2)]['VS8'][_0x4ec713(0x1f8)]);},Sprite_Timer[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x24a)]=function(){const _0x2dcf75=_0x1d5a8d;this[_0x2dcf75(0x3ad)]=new Bitmap(Math['round'](Graphics['boxWidth']/0x2),0x30),this[_0x2dcf75(0x3ad)]['fontFace']=this['fontFace'](),this['bitmap'][_0x2dcf75(0x3ff)]=this[_0x2dcf75(0x3ff)](),this[_0x2dcf75(0x3ad)]['outlineColor']=ColorManager[_0x2dcf75(0xfd)]();},Sprite_Timer['prototype'][_0x1d5a8d(0x2ba)]=function(){const _0x16380b=_0x1d5a8d,_0x391b3b=Math['floor'](this[_0x16380b(0x3db)]/0x3c/0x3c),_0x23f07e=Math['floor'](this['_seconds']/0x3c)%0x3c,_0x1e7fe5=this[_0x16380b(0x3db)]%0x3c;let _0x5e0954=_0x23f07e[_0x16380b(0x1bd)](0x2)+':'+_0x1e7fe5[_0x16380b(0x1bd)](0x2);if(_0x391b3b>0x0)_0x5e0954=_0x16380b(0x36c)['format'](_0x391b3b,_0x5e0954);return _0x5e0954;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x148)]=Spriteset_Map[_0x1d5a8d(0x1cf)]['createLowerLayer'],Spriteset_Map['prototype'][_0x1d5a8d(0xf0)]=function(){const _0x4643e4=_0x1d5a8d;VisuMZ['EventsMoveCore']['Spriteset_Map_createLowerLayer'][_0x4643e4(0x1ee)](this),this[_0x4643e4(0x10f)]();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x4d1)]=Spriteset_Map['prototype'][_0x1d5a8d(0x3c5)],Spriteset_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x3c5)]=function(){const _0x467d78=_0x1d5a8d;VisuMZ[_0x467d78(0x424)][_0x467d78(0x4d1)]['call'](this),this[_0x467d78(0x42e)]();},Spriteset_Map['prototype'][_0x1d5a8d(0x42e)]=function(){const _0x191ca4=_0x1d5a8d;if(!VisuMZ['EventsMoveCore'][_0x191ca4(0x1d2)]['Movement'][_0x191ca4(0x11a)])return;for(const _0x1e3ada of this[_0x191ca4(0x1b8)]){if('TNQDz'===_0x191ca4(0x299))this[_0x191ca4(0x3ab)](_0x1e3ada);else{function _0x3704f6(){const _0x45d95a=_0x191ca4;this[_0x45d95a(0x176)]=_0x571c62,this[_0x45d95a(0x527)]=-0x2,this[_0x45d95a(0x360)]();}}}},Spriteset_Map['prototype'][_0x1d5a8d(0x3ab)]=function(_0x466362){const _0x1a499d=_0x1d5a8d;_0x466362[_0x1a499d(0x261)]=new Sprite(),_0x466362['_shadowSprite']['_filename']=_0x466362[_0x1a499d(0xd0)][_0x1a499d(0x54c)](),_0x466362[_0x1a499d(0x261)][_0x1a499d(0x3ad)]=ImageManager[_0x1a499d(0x3b3)](_0x466362[_0x1a499d(0x261)][_0x1a499d(0x255)]),_0x466362['_shadowSprite'][_0x1a499d(0x376)]['x']=0.5,_0x466362['_shadowSprite'][_0x1a499d(0x376)]['y']=0x1,_0x466362[_0x1a499d(0x261)]['z']=0x0,this['_tilemap'][_0x1a499d(0xfe)](_0x466362[_0x1a499d(0x261)]);},Spriteset_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x184)]=function(){const _0x5df666=_0x1d5a8d;if(!VisuMZ[_0x5df666(0x424)][_0x5df666(0x1d2)][_0x5df666(0x12e)][_0x5df666(0x11a)])return;for(const _0x6eff1f of this['_characterSprites']){this[_0x5df666(0xda)][_0x5df666(0x190)](_0x6eff1f[_0x5df666(0x261)]);}},Spriteset_Map['prototype'][_0x1d5a8d(0x10f)]=function(){const _0x5587af=_0x1d5a8d;this[_0x5587af(0x4e7)]=[];for(const _0x5d6345 of $gameMap[_0x5587af(0x280)]()){this['createLabelWindowForTarget'](_0x5d6345);}},Spriteset_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x201)]=function(_0xc5592c){const _0xfaf989=_0x1d5a8d;if(!this[_0xfaf989(0x2c7)](_0xc5592c))return;const _0x2ebfca=new Window_EventLabel(_0xc5592c);_0x2ebfca['z']=0x8,_0x2ebfca[_0xfaf989(0x2d5)]=Sprite[_0xfaf989(0x20a)]++,this[_0xfaf989(0xda)][_0xfaf989(0xfe)](_0x2ebfca),this[_0xfaf989(0x4e7)]['push'](_0x2ebfca);},Spriteset_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2c7)]=function(_0x1c86aa){const _0x436b87=_0x1d5a8d,_0x19de4a=_0x1c86aa[_0x436b87(0x505)]();if(_0x19de4a[_0x436b87(0x4db)]['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x19de4a['note'][_0x436b87(0x403)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x4b4c2c of _0x19de4a[_0x436b87(0x216)]){if(_0x436b87(0x3f2)!==_0x436b87(0x1a9)){let _0x23792c='';for(const _0x21ed02 of _0x4b4c2c[_0x436b87(0x36f)]){if([0x6c,0x198][_0x436b87(0x26d)](_0x21ed02['code'])){if(_0x436b87(0x22c)!=='FFDeG')_0x23792c+=_0x21ed02[_0x436b87(0x3b0)][0x0];else{function _0x9fab5d(){const _0x12c73e=_0x436b87;_0x126f09[_0x12c73e(0x29a)](_0x372fa7,_0x1f5eca);const _0x492738=_0x318073[_0x12c73e(0x2d7)]||0x0;_0x35bdbe[_0x12c73e(0x2c2)](_0x492738);}}}}if(_0x23792c[_0x436b87(0x403)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x23792c[_0x436b87(0x403)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x436b87(0x2c9)===_0x436b87(0x2c9))return!![];else{function _0x5edaa4(){const _0x30a6ca=_0x436b87;this[_0x30a6ca(0x52b)][_0x30a6ca(0x4b0)]=_0x422b09(_0x445221['$1']);}}}}else{function _0x1330f0(){return this['processMoveRouteSelfVariable'](_0x4db664['$1'],_0x225038['$2']);}}}return![];},Spriteset_Map[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x532)]=function(_0x2933a5){const _0x14ff28=_0x1d5a8d;this['_characterSprites']=this['_characterSprites']||[];const _0x167443=new Sprite_Character(_0x2933a5);this[_0x14ff28(0x1b8)][_0x14ff28(0x2a1)](_0x167443),this[_0x14ff28(0xda)][_0x14ff28(0xfe)](_0x167443),this['createCharacterShadow'](_0x167443),this[_0x14ff28(0x201)](_0x2933a5),_0x167443['update']();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3c3)]=Game_Message[_0x1d5a8d(0x1cf)]['setNumberInput'],Game_Message[_0x1d5a8d(0x1cf)]['setNumberInput']=function(_0x936270,_0x589daa){const _0x5f3967=_0x1d5a8d;this['_selfTargetNumberInput']=$gameTemp['getSelfTarget'](),VisuMZ['EventsMoveCore'][_0x5f3967(0x3c3)][_0x5f3967(0x1ee)](this,_0x936270,_0x589daa);},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x393)]=Window_NumberInput[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x519)],Window_NumberInput[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x519)]=function(){const _0x308e66=_0x1d5a8d;$gameTemp[_0x308e66(0x2b9)]($gameMessage[_0x308e66(0x24d)]),VisuMZ[_0x308e66(0x424)][_0x308e66(0x393)]['call'](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x33b)]=Window_NumberInput[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2e1)],Window_NumberInput['prototype'][_0x1d5a8d(0x2e1)]=function(){const _0x2fa7b1=_0x1d5a8d;$gameTemp[_0x2fa7b1(0x2b9)]($gameMessage[_0x2fa7b1(0x24d)]),VisuMZ[_0x2fa7b1(0x424)][_0x2fa7b1(0x33b)][_0x2fa7b1(0x1ee)](this),$gameTemp[_0x2fa7b1(0x4a8)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x3c6)]=Game_Message[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2e8)],Game_Message[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x2e8)]=function(_0x55ef69,_0x4269b0){const _0x4b9dca=_0x1d5a8d;this['_selfTargetItemChoice']=$gameTemp[_0x4b9dca(0x348)](),VisuMZ['EventsMoveCore'][_0x4b9dca(0x3c6)]['call'](this,_0x55ef69,_0x4269b0);},VisuMZ['EventsMoveCore'][_0x1d5a8d(0x14c)]=Window_EventItem[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x168)],Window_EventItem['prototype'][_0x1d5a8d(0x168)]=function(){const _0x22665f=_0x1d5a8d;$gameTemp[_0x22665f(0x2b9)]($gameMessage[_0x22665f(0x222)]),VisuMZ[_0x22665f(0x424)][_0x22665f(0x14c)]['call'](this),$gameTemp[_0x22665f(0x4a8)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ['EventsMoveCore']['Window_EventItem_onCancel']=Window_EventItem[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x129)],Window_EventItem['prototype'][_0x1d5a8d(0x129)]=function(){const _0x1131e5=_0x1d5a8d;$gameTemp[_0x1131e5(0x2b9)]($gameMessage[_0x1131e5(0x222)]),VisuMZ['EventsMoveCore'][_0x1131e5(0x458)][_0x1131e5(0x1ee)](this),$gameTemp[_0x1131e5(0x4a8)](),$gameMessage[_0x1131e5(0x222)]=undefined;},VisuMZ[_0x1d5a8d(0x424)]['Window_Message_startMessage']=Window_Message['prototype']['startMessage'],Window_Message['prototype'][_0x1d5a8d(0x47f)]=function(){const _0x492bfe=_0x1d5a8d;$gameMessage[_0x492bfe(0x20e)](),VisuMZ[_0x492bfe(0x424)][_0x492bfe(0x37f)][_0x492bfe(0x1ee)](this),$gameTemp[_0x492bfe(0x4a8)]();},VisuMZ[_0x1d5a8d(0x424)][_0x1d5a8d(0x9f)]=Window_ScrollText[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x47f)],Window_ScrollText['prototype'][_0x1d5a8d(0x47f)]=function(){const _0x1ce091=_0x1d5a8d;$gameMessage[_0x1ce091(0x20e)](),VisuMZ[_0x1ce091(0x424)]['Window_ScrollText_startMessage'][_0x1ce091(0x1ee)](this),$gameTemp[_0x1ce091(0x4a8)]();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel['prototype']=Object[_0x1d5a8d(0x372)](Window_Base[_0x1d5a8d(0x1cf)]),Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x214)]=Window_EventLabel,Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x475)]=function(_0x3190e2){const _0x417873=_0x1d5a8d;this['_event']=_0x3190e2;const _0x1d684c=new Rectangle(0x0,0x0,Graphics[_0x417873(0x3bf)]/0x4,this['fittingHeight'](0x1));this[_0x417873(0x1ac)](),Window_Base[_0x417873(0x1cf)][_0x417873(0x475)][_0x417873(0x1ee)](this,_0x1d684c),this[_0x417873(0x38f)]=0x0,this[_0x417873(0x272)](0x2),this[_0x417873(0x47e)]='';},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x1ac)]=function(){const _0x12ccfe=_0x1d5a8d;this[_0x12ccfe(0x106)]=![],this[_0x12ccfe(0x553)]=$gameScreen[_0x12ccfe(0x1bb)](),this['_eventScreenX']=this[_0x12ccfe(0x3fe)][_0x12ccfe(0x23a)](),this['_eventScreenY']=this[_0x12ccfe(0x3fe)]['screenY'](),this[_0x12ccfe(0x172)]=this[_0x12ccfe(0x3fe)][_0x12ccfe(0x52b)][_0x12ccfe(0x4b0)],this['_eventLabelOffsetY']=this[_0x12ccfe(0x3fe)][_0x12ccfe(0x52b)][_0x12ccfe(0x4ed)],this[_0x12ccfe(0x4bf)]=this[_0x12ccfe(0x3fe)]['_pageIndex'],this[_0x12ccfe(0x411)]=this[_0x12ccfe(0x4fc)](),this[_0x12ccfe(0x3e7)]=$gameSystem['eventLabelsVisible'](),this['_visiblePlayerX']=$gamePlayer['x'],this[_0x12ccfe(0x110)]=$gamePlayer['y'],this[_0x12ccfe(0x3a5)]=this[_0x12ccfe(0x3fe)]['x'],this[_0x12ccfe(0x36b)]=this[_0x12ccfe(0x3fe)]['y'];},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xe4)]=function(){const _0x37c06c=_0x1d5a8d;Window_Base[_0x37c06c(0x1cf)][_0x37c06c(0xe4)][_0x37c06c(0x1ee)](this);if(!this['needsUpdate']())return;this['updateText'](),this[_0x37c06c(0x52e)](),this[_0x37c06c(0x1d3)](),this['updateOpacity']();},Window_EventLabel['prototype'][_0x1d5a8d(0xc4)]=function(){const _0x75b838=_0x1d5a8d;if(!this[_0x75b838(0x3fe)])return![];if(!this[_0x75b838(0x3fe)][_0x75b838(0x52b)])return![];if(this[_0x75b838(0x4bf)]!==this['_event'][_0x75b838(0x527)])return!![];if(this['_event'][_0x75b838(0x436)]&&!this[_0x75b838(0x106)])return!![];if(this['_event'][_0x75b838(0x52b)][_0x75b838(0x193)]==='')return![];if(this[_0x75b838(0x553)]!==$gameScreen[_0x75b838(0x1bb)]())return!![];if(this[_0x75b838(0x130)]!==this[_0x75b838(0x3fe)][_0x75b838(0x23a)]())return!![];if(this[_0x75b838(0x464)]!==this[_0x75b838(0x3fe)][_0x75b838(0xa5)]())return!![];if(this[_0x75b838(0x172)]!==this[_0x75b838(0x3fe)]['_labelWindow'][_0x75b838(0x4b0)])return!![];if(this[_0x75b838(0xc1)]!==this[_0x75b838(0x3fe)][_0x75b838(0x52b)][_0x75b838(0x4ed)])return!![];if(this[_0x75b838(0x4b1)]!==$gamePlayer['x'])return!![];if(this[_0x75b838(0x110)]!==$gamePlayer['y'])return!![];if(this[_0x75b838(0x3a5)]!==this[_0x75b838(0x3fe)]['x'])return!![];if(this['_visibleEventY']!==this[_0x75b838(0x3fe)]['y'])return!![];if(this[_0x75b838(0x3e7)]!==$gameSystem[_0x75b838(0x18e)]())return!![];if(this[_0x75b838(0x411)]&&this['contentsOpacity']<0xff)return!![];if(!this[_0x75b838(0x411)]&&this[_0x75b838(0x38f)]>0x0)return!![];if(SceneManager[_0x75b838(0x478)][_0x75b838(0xb4)]>0x0)return!![];return![];},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x28b)]=function(){const _0x52dbd0=_0x1d5a8d;this[_0x52dbd0(0x3fe)][_0x52dbd0(0x29e)]()!==this[_0x52dbd0(0x47e)]&&(this[_0x52dbd0(0x47e)]=this[_0x52dbd0(0x3fe)]['labelWindowText'](),this[_0x52dbd0(0x360)]());},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x52e)]=function(){const _0x498893=_0x1d5a8d;this[_0x498893(0x2d9)]['x']=0x1/$gameScreen['zoomScale'](),this[_0x498893(0x2d9)]['y']=0x1/$gameScreen['zoomScale'](),this['_screenZoomScale']=$gameScreen[_0x498893(0x1bb)]();},Window_EventLabel[_0x1d5a8d(0x1cf)]['updatePosition']=function(){const _0x3ba987=_0x1d5a8d;if(!SceneManager[_0x3ba987(0x478)])return;if(!SceneManager[_0x3ba987(0x478)][_0x3ba987(0x390)])return;const _0x2a2ff2=SceneManager['_scene']['_spriteset'][_0x3ba987(0x517)](this[_0x3ba987(0x3fe)]);if(!_0x2a2ff2)return;this['x']=Math[_0x3ba987(0x4ff)](this['_event']['screenX']()-Math[_0x3ba987(0x250)](this[_0x3ba987(0x354)]*this['scale']['x']/0x2)),this['x']+=this['_event'][_0x3ba987(0x52b)][_0x3ba987(0x4b0)],this['y']=this[_0x3ba987(0x3fe)]['screenY']()-_0x2a2ff2['height'],this['y']+=Math[_0x3ba987(0x4ff)]($gameSystem['windowPadding']()*0.5),this['y']-=Math[_0x3ba987(0x4ff)](this[_0x3ba987(0x229)]*this[_0x3ba987(0x2d9)]['y']),this['y']+=this[_0x3ba987(0x3fe)]['_labelWindow'][_0x3ba987(0x4ed)],this[_0x3ba987(0x106)]=this['_event'][_0x3ba987(0x436)],this[_0x3ba987(0x130)]=this[_0x3ba987(0x3fe)][_0x3ba987(0x23a)](),this['_eventScreenY']=this['_event']['screenY'](),this[_0x3ba987(0x172)]=this[_0x3ba987(0x3fe)][_0x3ba987(0x52b)][_0x3ba987(0x4b0)],this[_0x3ba987(0xc1)]=this[_0x3ba987(0x3fe)][_0x3ba987(0x52b)][_0x3ba987(0x4ed)],this['_eventPageIndex']=this[_0x3ba987(0x3fe)]['_pageIndex'],this[_0x3ba987(0x106)]&&(this[_0x3ba987(0x38f)]=0x0);},Window_EventLabel['prototype']['updateOpacity']=function(){const _0x55a05d=_0x1d5a8d;if(this[_0x55a05d(0x4fc)]())this[_0x55a05d(0x38f)]+=this[_0x55a05d(0x437)]();else SceneManager[_0x55a05d(0x478)][_0x55a05d(0xb4)]>0x0?this[_0x55a05d(0x38f)]=0x0:this['contentsOpacity']-=this[_0x55a05d(0x437)]();},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x4fc)]=function(){const _0xb7c85a=_0x1d5a8d;if(!$gameSystem[_0xb7c85a(0x18e)]())return![];if(this[_0xb7c85a(0x3fe)]?.[_0xb7c85a(0x436)])return![];if(SceneManager[_0xb7c85a(0x478)][_0xb7c85a(0xb4)]>0x0)return![];const _0x4ac4d8=$gamePlayer['x'],_0x5d6552=$gamePlayer['y'],_0xa05260=this[_0xb7c85a(0x3fe)]['x'],_0x297384=this['_event']['y'];if(this['_visiblePlayerX']===_0x4ac4d8&&this['_visiblePlayerY']===_0x5d6552&&this[_0xb7c85a(0x3a5)]===_0xa05260&&this[_0xb7c85a(0x36b)]===_0x297384){if('nevEl'!==_0xb7c85a(0x392)){function _0x4ee2cd(){const _0xda7952=_0xb7c85a;this[_0xda7952(0x1f5)]['list'][_0xda7952(0x28e)](this[_0xda7952(0x4e9)]+0x1,0x0,_0x1d68ca);}}else return this[_0xb7c85a(0x411)];}this[_0xb7c85a(0x4b1)]=$gamePlayer['x'],this[_0xb7c85a(0x110)]=$gamePlayer['y'],this[_0xb7c85a(0x3a5)]=this[_0xb7c85a(0x3fe)]['x'],this['_visibleEventY']=this[_0xb7c85a(0x3fe)]['y'];if($gameMap[_0xb7c85a(0xdb)](_0x4ac4d8,_0x5d6552,_0xa05260,_0x297384)>this[_0xb7c85a(0x3fe)][_0xb7c85a(0x141)]())return this[_0xb7c85a(0x411)]=![],![];return this[_0xb7c85a(0x411)]=!![],!![];},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x437)]=function(){const _0x5c1e71=_0x1d5a8d;return VisuMZ['EventsMoveCore'][_0x5c1e71(0x1d2)][_0x5c1e71(0x3c9)][_0x5c1e71(0x42c)];},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x17c)]=function(){const _0x7b794e=_0x1d5a8d,_0x1fec3f=this[_0x7b794e(0x479)](this[_0x7b794e(0x47e)]);this['width']=_0x1fec3f[_0x7b794e(0x354)]+($gameSystem[_0x7b794e(0x327)]()+this['itemPadding']())*0x2,this['height']=Math[_0x7b794e(0x456)](this[_0x7b794e(0x365)](),_0x1fec3f[_0x7b794e(0x229)])+$gameSystem[_0x7b794e(0x327)]()*0x2,this['createContents']();},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x365)]=function(){const _0x492b48=_0x1d5a8d;return VisuMZ['EventsMoveCore'][_0x492b48(0x1d2)][_0x492b48(0x3c9)][_0x492b48(0x1ea)];},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x334)]=function(){const _0xe54d38=_0x1d5a8d;Window_Base['prototype'][_0xe54d38(0x334)][_0xe54d38(0x1ee)](this),this['contents'][_0xe54d38(0x3ff)]=this['defaultFontSize']();},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x420)]=function(){const _0xe9f034=_0x1d5a8d;return VisuMZ[_0xe9f034(0x424)][_0xe9f034(0x1d2)][_0xe9f034(0x3c9)][_0xe9f034(0x2a0)];},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x360)]=function(){const _0x25788a=_0x1d5a8d;this[_0x25788a(0x17c)](),this[_0x25788a(0x375)][_0x25788a(0x4f3)]();const _0x5dc0aa=this[_0x25788a(0x47e)][_0x25788a(0x1e8)](/[\r\n]+/);let _0x1843a6=0x0;for(const _0x59f0d3 of _0x5dc0aa){const _0x51d833=this[_0x25788a(0x479)](_0x59f0d3),_0x4005af=Math['floor']((this[_0x25788a(0x425)]-_0x51d833[_0x25788a(0x354)])/0x2);this['drawTextEx'](_0x59f0d3,_0x4005af,_0x1843a6),_0x1843a6+=_0x51d833['height'];}},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0xeb)]=function(_0x3e75a5,_0x49366d){const _0x18a467=_0x1d5a8d;_0x49366d['drawing']&&this[_0x18a467(0x192)](_0x3e75a5,_0x49366d['x']+0x2,_0x49366d['y']),_0x49366d['x']+=Math[_0x18a467(0x38b)](this['iconSize'](),ImageManager[_0x18a467(0x332)])+0x4;},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x192)]=function(_0x4e087d,_0x3b83bb,_0x1610fa){const _0x2df05b=_0x1d5a8d,_0x19cc3b=ImageManager[_0x2df05b(0x3b3)](_0x2df05b(0x43b)),_0x1dfc3a=ImageManager['iconWidth'],_0x35c2cb=ImageManager['iconHeight'],_0x270d30=_0x4e087d%0x10*_0x1dfc3a,_0x4e9cca=Math['floor'](_0x4e087d/0x10)*_0x35c2cb,_0x4a5c01=Math[_0x2df05b(0x38b)](this[_0x2df05b(0x21f)]()),_0x4ab8bc=Math[_0x2df05b(0x38b)](this[_0x2df05b(0x21f)]());this['contents']['blt'](_0x19cc3b,_0x270d30,_0x4e9cca,_0x1dfc3a,_0x35c2cb,_0x3b83bb,_0x1610fa,_0x4a5c01,_0x4ab8bc);},Window_EventLabel[_0x1d5a8d(0x1cf)][_0x1d5a8d(0x21f)]=function(){const _0x144708=_0x1d5a8d;return VisuMZ[_0x144708(0x424)][_0x144708(0x1d2)]['Label'][_0x144708(0xef)];};