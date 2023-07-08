//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Char_Converter.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.15) alert("OcRam core v1.15 or greater is required!");

OcRam.addPlugin("Char_Converter", "1.00");

/*:
 * @target MZ
 * @plugindesc v1.00 This plugin is used to convert RTP (and similar 48px x 48px) character sheets into diagonal and/or tall character sheets!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS - None
 * ============================================================================
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Diagonal sheets
 * @type boolean
 * @desc Parameters for diagonal character sheets.
 * @default true
 *
 * @param Wider up face
 * @parent Diagonal sheets
 * @type boolean
 * @desc Draw wider face for diagonal up sprites?
 * @default true
 *
 * @param Diagonal up ears
 * @parent Diagonal sheets
 * @type boolean
 * @desc Draw ears for diagonal up sprites? (May have some pixels to adjust)
 * @default true
 *
 * @param Tall sheets
 * @type boolean
 * @desc Parameters for tall character sheets.
 * @default true
 * 
 * @param Smaller head
 * @parent Tall sheets
 * @type boolean
 * @desc Smaller (-1px from all sides) head when using "tall" conversion?
 * @default true
 * 
 * @param Longer legs
 * @parent Tall sheets
 * @type boolean
 * @desc Stretch legs longer when using "tall" conversion? (May have some pixels to adjust)
 * @default true
 *
 * @param Very tall
 * @parent Tall sheets
 * @type boolean
 * @desc true = add 16px to character height, false = add 8px to character height
 * @default false
 * 
 * @param Work path
 * @type text
 * @desc Working path for individual character indexes.
 * @default img/ocram
 *
 * @param Merge path
 * @type text
 * @desc Merge path for complete and finished character sheets. (Converted with -1 index)
 * @default img/characters
 *
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * This plugin allows you to convert desired characters or character sheets 
 * (based on RTP-humanoids and similar 48 x 48 bases) into diagonal/tall 
 * sprite sheets.Converted sheets are naturally supported by OcRam_Movement.
 *
 * Char Converter was developped because I'm really bad pixel artist. But I can
 * write a plugin to make bases for me so I can just adjust just few pixels! ;)
 *
 * Please make sure that work directory exists (defaults to img/ocram)! This 
 * directory is used as work directory for all conversions. And if only 1 
 * index is converted this is the place where it'll be also saved.
 * 
 * Tutorial video on YouTube: https://youtube.com/watch?v=KzoX8pXYzaM
 *
 * ================================= WARNING! =================================
 * Files will be overwritten! Example: When converting Actor1 to diagonal >>
 * files Actor1_1! and Actor1_2! will be overwritten, if they exist.
 *
 * ================================== NOTES ===================================
 * NOTE 1: This plugin won't replace pixel artist (even BAD one like myself)!
 *         It offers solid bases to work on. So some pixels may have to be 
 *         manually adjusted for good / high quality results!
 *
 * NOTE 2: Using -1 on index will convert all indexes AND merges results
 *         to output dir (defaults to img/characters)
 *
 * NOTE 3: This plugin is utility plugin and it can (should?) be turned OFF
 *         in released projects!
 *         
 * NOTE 4: Some helmets, hats and sprites with "long face" like werewolf 
 *         etc... requires a bit more manual work for good result.
 *         Usually just resizes or copy part from 4-dir frames does the trick!
 *
 * CREDITS TO GrandmaDeb FOR INSPIRATION (not same approach, but similar)
 * https://forums.rpgmakerweb.com/index.php?threads/rtp-diagonal.27431/
 *
 * ----------------------------------------------------------------------------
 * Usage of this plugin described below
 * ============================================================================
 * 
 * --------------------------- Diagonal conversion ----------------------------
 * 
 * Start play test and hit F12 (or F8) for developer console.
 * Then just write: OcRam.Char_Converter.convertToDiagonal('my_sheet', -1);
 * 
 * Diagonal sheets are now saved as: ./img/characters/my_sheet_1!.png and 
 * ./img/characters/my_sheet_2!.png (diagonal sprites reserves double width)
 * 
 * Then you may use those sheets normally (indexes 0, 2, 4, 6).
 * Indexes 1, 3, 5 and 7 are reserved for diagonal sprites.
 * 
 * ------------------------ Conversion to tall sprites ------------------------
 * 
 * After possible edits to diagonal sheets you may now start conversion
 * to taller sprites!
 * 
 * Start play test and hit F12 (or F8) for developer console.
 * Then just write: OcRam.Char_Converter.convertToTall('my_sheet_1!', -1);
 * 
 * TALL sheets AND DIAGONAL are now saved as:
 * ./img/characters/my_sheet_1_TALL!.png
 * 
 * Make desired pixel adjustments and you've got brand new diagonal TALL 
 * characters in your project!
 * 
 * NON-DIAGONAL tall sheets are converted sameway (just skip diagonal part).
 *
 * ----------------------------------------------------------------------------
 * JavaScript
 * ============================================================================
 * Character.convertToDiagonal() // Saves diagonal sprite sheet of this char
 * Character.convertToTall() // Saves tall sprite sheet of this char
 *
 * OcRam.Char_Converter.convertToDiagonal(name, index); // -1 ALL indexes
 * OcRam.Char_Converter.convertToTall(name, index); // -1 ALL indexes
 *
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE & COMMERCIAL USE: Free to use with credits to 'OcRam'
 * 
 * NOTE: IF YOU SHARE character sheets created with this plugin (edited or not)
 *       Please give credits in that case also.
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2022, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2022/08/14 v1.00 - Initial release
 * 
 * ----------------------------------------------------------------------------
 * RMMZ overrides (destructive declarations) are listed here
 * ============================================================================
 * -None-
 */

if (!OcRam.isMZ()) {

    StorageManager.fsWriteFile = function (path, data) {
        const fs = require("fs");
        fs.writeFileSync(path, data);
    };

    StorageManager.fsRename = function (oldPath, newPath) {
        const fs = require("fs");
        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
        }
    };

    StorageManager.fsUnlink = function (path) {
        const fs = require("fs");
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    };

    StorageManager.fsReadFile = function (path) {
        const fs = require("fs");
        if (fs.existsSync(path)) {
            return fs.readFileSync(path, { encoding: "utf8" });
        } else {
            return null;
        }
    };

}

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this;

    const _longerLegs = OcRam.getBoolean(this.parameters['Longer legs']);
    const _smallerHead = OcRam.getBoolean(this.parameters['Smaller head']);
    const _diagonalEars = OcRam.getBoolean(this.parameters['Diagonal up ears']);
    const _widerFace = OcRam.getBoolean(this.parameters['Wider up face']);
    const _veryTall = OcRam.getBoolean(this.parameters['Very tall']);
    const _exportPath = this.parameters['Work path'] || "img/ocram";
    const _mergePath = this.parameters['Merge path'] || "img/characters";

    let _diagonalSideSlice = 15;
    let _eyeY = 22;
    let _eyeLR = [16, (48 - 16)];

    ImageManager.loadConvertedCharacter = function (filename) {
        return this.loadBitmap(_exportPath + "/", filename);
    };

    /**
     * Performs a block transfer. And clears given source rect.
     *
     * @param {Bitmap} source - The bitmap to draw.
     * @param {number} sx - The x coordinate in the source.
     * @param {number} sy - The y coordinate in the source.
     * @param {number} sw - The width of the source image.
     * @param {number} sh - The height of the source image.
     * @param {number} dx - The x coordinate in the destination.
     * @param {number} dy - The y coordinate in the destination.
     * @param {number} [dw=sw] The width to draw the image in the destination.
     * @param {number} [dh=sh] The height to draw the image in the destination.
     */
    Bitmap.prototype.bltCut = function (source, sx, sy, sw, sh, dx, dy, dw, dh) {
        dw = dw || sw;
        dh = dh || sh;
        try {
            const new_bm = new Bitmap(sw, sh);
            new_bm.blt(source, sx, sy, sw, sh, 0, 0);
            this.context.clearRect(sx, sy, sw, sh);
            this._baseTexture.update();
            this.blt(new_bm, 0, 0, sw, sh, dx, dy, dw, dh);
        } catch (e) { }
    };

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    const fileDirectoryPath = function () {
        const path = require("path");
        const base = path.dirname(process.mainModule.filename);
        return path.join(base, _exportPath + "/");
    };

    const mergeToDirectoryPath = function () {
        const path = require("path");
        const base = path.dirname(process.mainModule.filename);
        return path.join(base, _mergePath + "/");
    };

    const saveToFile = (fn, data, merge) => {
        if (merge) {
            StorageManager.fsWriteFile(mergeToDirectoryPath() + fn + ".png", data, { encoding: "utf8" });
        } else {
            StorageManager.fsWriteFile(fileDirectoryPath() + fn + ".png", data, { encoding: "utf8" });
        }
    };

    const removeFile = (fn) => {
        StorageManager.fsUnlink(fileDirectoryPath() + fn);
    };

    const loadCharacterBitmap = (name, index, double_width, cb) => {
        const bm = ImageManager.loadCharacter(name);
        bm.addLoadListener(() => {
            const bw = bm.width / 4; const bh = bm.height * 0.5;
            const new_bm = new Bitmap(double_width ? bw * 2 : bw, double_width ? bh : (_veryTall ? bh + (16 * 4) : bh + (8 * 4)));
            new_bm.blt(bm, bw * (index % 4), index < 4 ? 0 : bh, bw, bh, 0, 0, bw, bh);
            cb.call(this, new_bm)
        });
    };

    const getImageBinary = bitmap => { // Works only with Node.js! Else would have to use Uint8Array...
        if (!bitmap) return null; if (!bitmap._canvas) return null;
        return Buffer.from(bitmap._canvas.toDataURL().split(",")[1], "base64");
    };

    const mergeSheets = (name, suffix) => {

        _this.debug("MERGE STARTED:", name, suffix);

        let bm = null; let loader_count = 0;

        if (suffix == "!") { // DIAGONAL

            for (let i = 0; i < 4; i++) {

                const src = ImageManager.loadConvertedCharacter(name + "_" + i + suffix);

                src.addLoadListener(function () {
                    if (!bm) {
                        _this.debug("MERGE SHEETS TO: new Bitmap:", src.width * 2, src.height * 2);
                        bm = new Bitmap(src.width * 2, src.height * 2);
                    } const dx = (i == 0 || i == 2) ? 0 : src.width;
                    const dy = (i > 1) ? src.height : 0;
                    bm.blt(src, 0, 0, src.width, src.height, dx, dy, src.width, src.height);
                    removeFile(name + "_" + i + "!.png");
                    if (++loader_count == 3) { // ALL SHOULD HAVE BEEN LOADED
                        requestAnimationFrame(() => {

                            saveToFile(name + "_1!", getImageBinary(bm), true);

                            loader_count = 0; bm = null;

                            for (let i = 0; i < 4; i++) {
                                const src = ImageManager.loadConvertedCharacter(name + "_" + (i + 4) + suffix);
                                src.addLoadListener(function () {
                                    if (!bm) {
                                        _this.debug("MERGE SHEETS TO: new Bitmap:", src.width * 2, src.height * 2);
                                        bm = new Bitmap(src.width * 2, src.height * 2);
                                    } const dx = (i == 0 || i == 2) ? 0 : src.width;
                                    const dy = (i > 1) ? src.height : 0;
                                    bm.blt(src, 0, 0, src.width, src.height, dx, dy, src.width, src.height);
                                    removeFile(name + "_" + (i + 4) + "!.png");
                                    if (++loader_count == 3) { // ALL SHOULD HAVE BEEN LOADED
                                        requestAnimationFrame(() => {
                                            saveToFile(name + "_2!", getImageBinary(bm), true);
                                        });
                                    }
                                });
                            }

                        });
                    }
                });

            }

        } else { // TALL

            for (let i = 0; i < 8; i++) {
                const src = ImageManager.loadConvertedCharacter(name + "_" + i + suffix);
                src.addLoadListener(function () {
                    if (!bm) {
                        _this.debug("MERGE SHEETS TO: new Bitmap:", src.width * 4, src.height * 2);
                        bm = new Bitmap(src.width * 4, src.height * 2);
                    } const dx = src.width * (i % 4);
                    const dy = (i > 3) ? src.height : 0;
                    bm.blt(src, 0, 0, src.width, src.height, dx, dy, src.width, src.height);
                    removeFile(name + "_" + i + "_TALL.png");
                    if (++loader_count == 8) {
                        const name1 = name.indexOf("!") ? name.replace("!", "_TALL!") : name + "_TALL";
                        saveToFile(name1, getImageBinary(bm), true);
                    }
                });
            }

        }

    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    let _loaderCount = 0; let _allIndexes = false;

    this.convertToDiagonal = (name, index) => {
        
        if (index < 0) {
            _loaderCount = 0; _allIndexes = true;
            for (let idx = 0; idx < 8; idx++) {
                this.convertToDiagonal(name, idx, true);
            } return;
        } _this.debug("convertToDiagonal:", name, index);

        // Char sheet as defined in OcRam_Movement
        // down  x 3  |  down right x 3
        // left  x 3  |  down left  x 3
        // right x 3  |  up right   x 3
        // up    x 3  |  up left    x 3

        loadCharacterBitmap(name, index < 0 ? 0 : index, true, bm => {

            bm._smooth = false;
            bm.context.imageSmoothingEnabled = false;
            bm._canvas.style.imageRendering = "pixelated"; // crisp-edges?

            const bmw = bm.width; const bw = bmw / 6;
            const bmh = bm.height; const bh = bmh / 4;
            const large_slice = bw - _diagonalSideSlice;
            const one_third = bh / 3;

            // Down right
            for (let i = 0; i < 3; i++) {
                const cx = i * bw;
                bm.blt(bm, cx, 0, _diagonalSideSlice + 4, bh,
                    cx + (bmw * 0.5), bh, _diagonalSideSlice + 4, bh); // Take small slice (15px + 4px) from down pose (left side)
                bm.blt(bm, cx + _diagonalSideSlice, bh, large_slice, bh,
                    cx + (bmw * 0.5 + _diagonalSideSlice), bh, large_slice, bh); // Take big slice (48px - 15px) from left pose (left side)
                bm.blt(bm, cx, bh + _diagonalSideSlice, one_third, one_third,
                    cx + (bmw * 0.5), bh + _diagonalSideSlice, one_third, one_third); // Take face from left pose
            }

            // Down left
            for (let i = 0; i < 3; i++) {
                const cx = i * bw;
                bm.blt(bm, cx + (bw - (_diagonalSideSlice + 4)), 0, _diagonalSideSlice + 4, bh,
                    cx + (bmw * 0.5) + (bw - (_diagonalSideSlice + 4)), 0, _diagonalSideSlice + 4, bh); // Take small slice (15px + 4px) from down pose (right side)
                bm.blt(bm, cx, bh * 2, large_slice, bh,
                    cx + (bmw * 0.5), 0, large_slice, bh); // Take big slice (48px - 15px) from right pose (right side)
                bm.blt(bm, cx + one_third * 2, bh * 2 + _diagonalSideSlice, one_third, one_third,
                    cx + (bmw * 0.5) + (one_third * 2), 0 + _diagonalSideSlice, one_third, one_third); // Take face from right pose
            }

            const uy = bmh - bh;

            // Up right
            for (let j = 0; j < 3; j++) {

                const nx = (bmw * 0.5) + (bw * j);

                /*bm.blt(bm, (bw * j), uy, bw, bh, nx, (bh * 2), bw, bh); // Copy 1:1 */

                bm.blt(bm, (bw * j) + 32, uy, 16, bh,
                    nx + 32, (bh * 2), 16, bh);
                bm.blt(bm, (bw * j) + 24, uy, 8, bh,
                    nx + 24, (bh * 2), 8, bh - 1);
                bm.blt(bm, (bw * j) + 16, uy, 8, bh,
                    nx + 16, (bh * 2), 8, bh - 3);
                bm.blt(bm, (bw * j) + 8, uy, 8, bh,
                    nx + 8, (bh * 2), 8, bh - 5);
                bm.blt(bm, (bw * j) + 0, uy, 8, bh,
                    nx + 0, (bh * 2), 8, bh - 7);

                if (_widerFace) {
                    bm.context.clearRect(nx + 31, (bh * 2), 17, 28);
                    bm.blt(bm, (bw * j) + 31, bh * 2, 17, 32,
                        nx + 31, (bh * 2), 17, 32); // Face
                    if (_diagonalEars) {
                        bm.blt(bm, (bw * j) + 16, bh * 2 + 18, 3, 9,
                            nx + 28, (bh * 2) + 18, 3, 9); // Ear
                    }
                } else {
                    bm.context.clearRect(nx + 33, (bh * 2), 15, 28);
                    bm.blt(bm, (bw * j) + 33, bh * 2, 15, 32,
                        nx + 33, (bh * 2), 15, 32); // Face
                    if (_diagonalEars) {
                        bm.blt(bm, (bw * j) + 16, bh * 2 + 18, 3, 9,
                            nx + 30, (bh * 2) + 18, 3, 9); // Ear
                    }
                }

            }

            // Up left
            for (let j = 0; j < 3; j++) {

                const nx = (bmw * 0.5) + (bw * j);

                /*bm.blt(bm, (bw * j), uy, bw, bh, nx, (bh * 3), bw, bh); // Copy 1:1 */

                bm.blt(bm, (bw * j) + 0, uy, 16, bh,
                    nx + 0, (bh * 3), 16, bh);
                bm.blt(bm, (bw * j) + 16, uy, 8, bh,
                    nx + 16, (bh * 3), 8, bh - 1);
                bm.blt(bm, (bw * j) + 24, uy, 8, bh,
                    nx + 24, (bh * 3), 8, bh - 2);
                bm.blt(bm, (bw * j) + 32, uy, 8, bh,
                    nx + 32, (bh * 3), 8, bh - 3);
                bm.blt(bm, (bw * j) + 40, uy, 8, bh,
                    nx + 40, (bh * 3), 8, bh - 4);

                if (_widerFace) {
                    bm.context.clearRect(nx, (bh * 3), 16, 28);
                    bm.blt(bm, (bw * j), bh, 16, 32,
                        nx, (bh * 3), 16, 32); // Face
                    if (_diagonalEars) {
                        bm.blt(bm, (bw * j) + 28, bh + 18, 3, 9,
                            nx + 16, (bh * 3) + 18, 3, 9); // Ear
                    }
                } else {
                    bm.context.clearRect(nx, (bh * 3), 15, 28);
                    bm.blt(bm, (bw * j), bh, 15, 32,
                        nx, (bh * 3), 15, 32); // Face
                    if (_diagonalEars) {
                        bm.blt(bm, (bw * j) + 28, bh + 18, 3, 9,
                            nx + 15, (bh * 3) + 18, 3, 9); // Ear
                    }
                }

            }

            // Copy left eye! (for top row)
            for (let i = 0; i < 3; i++) {

                const cx = i * bw + (_eyeLR[0]);

                bm.blt(bm, cx + 0, bh + _eyeY - (i == 1 ? 1 : 0), 1, 5,
                    (i * bw) + (_eyeLR[1]) + (bmw * 0.5) + 2, (_eyeY - 1) - (i == 1 ? 1 : 0), 1, 5);
                bm.blt(bm, cx + 1, bh + _eyeY - (i == 1 ? 1 : 0), 1, 5,
                    (i * bw) + (_eyeLR[1]) + (bmw * 0.5) + 1, (_eyeY - 1) - (i == 1 ? 1 : 0), 1, 5);
                bm.blt(bm, cx + 2, bh + _eyeY - (i == 1 ? 1 : 0), 1, 5,
                    (i * bw) + (_eyeLR[1]) + (bmw * 0.5) + 0, (_eyeY - 1) - (i == 1 ? 1 : 0), 1, 5);
                
                bm.blt(bm, (i * bw) + 25 + (bmw * 0.5), 16, 7, 13,
                    (i * bw) + 25 + (bmw * 0.5) - 1, 16, 7, 13); // Move right eye

            }

            // Copy right eye! (for 2nd row)
            for (let i = 0; i < 3; i++) {

                const cx = i * bw + (_eyeLR[1]) - 4;

                bm.blt(bm, cx + 0, (bh * 2) + _eyeY - (i == 1 ? 1 : 0), 1, 5,
                    (i * bw) + (_eyeLR[0] - 4) + (bmw * 0.5) + 2, (bh + _eyeY - 1) - (i == 1 ? 1 : 0), 1, 5);
                bm.blt(bm, cx + 1, (bh * 2) + _eyeY - (i == 1 ? 1 : 0), 1, 5,
                    (i * bw) + (_eyeLR[0] - 4) + (bmw * 0.5) + 1, (bh + _eyeY - 1) - (i == 1 ? 1 : 0), 1, 5);
                bm.blt(bm, cx + 2, (bh * 2) + _eyeY - (i == 1 ? 1 : 0), 1, 5,
                    (i * bw) + (_eyeLR[0] - 4) + (bmw * 0.5) + 0, (bh + _eyeY - 1) - (i == 1 ? 1 : 0), 1, 5);

                bm.blt(bm, (i * bw) + 15 + (bmw * 0.5), 16 + bh, 7, 13,
                    (i * bw) + 15 + (bmw * 0.5) + 1, 16 + bh, 7, 13); // Move left eye

            }


            // This is for wider eye gap diagonal down left + right
            const tx = bmw * 0.5;
            const face_color = bm.getPixel(20, 28); // Not center to avoid glasses etc...
            const face_color_dark = bm.getPixel(tx + 30, 26); // Darker face color
            for (let i = 0; i < 3; i++) {

                // Slice and dice
                bm.bltCut(bm, tx + (i * 48), 0, 31, 48, tx + (i * 48), 0, 30, 48);
                bm.bltCut(bm, (tx + 16) + (i * 48), 48, 32, 48, (tx + 17) + (i * 48), 48, 31, 48);

                let ya = i == 1 ? -1 : 0; // Adjustment for middle frame...

                // Copy 1px slice
                bm.blt(bm, (tx + 29) + (i * 48), 0, 1, 48, (tx + 30) + (i * 48), 0, 1, 48);
                bm.blt(bm, (tx + 17) + (i * 48), 48, 1, 48, (tx + 16) + (i * 48), 48, 1, 48);

                // Adjust some pixels...
                bm.fillRect((tx + 29) + (i * 48), 26 + ya, 3, 1, face_color);
                bm.fillRect((tx + 29) + (i * 48), 24 + ya, 3, 1, face_color_dark);
                bm.fillRect((tx + 31) + (i * 48), 25 + ya, 1, 1, face_color); // For more diagonal feel
                bm.fillRect((tx + 31) + (i * 48), 23 + ya, 1, 1, face_color_dark); // For more diagonal feel

                bm.fillRect((tx + 15) + (i * 48), 48 + 26 + ya, 3, 1, face_color);
                bm.fillRect((tx + 15) + (i * 48), 48 + 24 + ya, 3, 1, face_color_dark);
                bm.fillRect((tx + 15) + (i * 48), 48 + 25 + ya, 1, 1, face_color); // For more diagonal feel
                bm.fillRect((tx + 15) + (i * 48), 48 + 23 + ya, 1, 1, face_color_dark); // For more diagonal feel

                // Right between the eyes!
                bm.fillRect((tx + 30) + (i * 48), 22 + ya, 1, 5, face_color);
                bm.fillRect((tx + 16) + (i * 48), 22 + 48 + ya, 1, 5, face_color);
                
            }

            saveToFile(name + "_" + index + "!", getImageBinary(bm));

            if (_allIndexes) { if (++_loaderCount > 7) mergeSheets(name, "!"); }

        });

    };

    this.convertToTall = (name, index) => {

        if (index < 0) {
            _loaderCount = 0; _allIndexes = true;
            for (let idx = 0; idx < 8; idx++) {
                this.convertToTall(name, idx, true);
            } return;
        } const is_diagonal = name.right(1) == "!";

        _this.debug("convertToTall (" + (is_diagonal ? "DIAGONAL" : "4-dir") + "):", name, index);

        loadCharacterBitmap(name, index < 0 ? 0 : index, false, bm => {

            bm._smooth = false;
            bm.context.imageSmoothingEnabled = false;
            bm._canvas.style.imageRendering = "pixelated"; // crisp-edges

            const bmw = bm.width; const bw = bmw / 6;
            const bmh = bm.height; const bh = bmh / 4;

            // Shift characters
            for (let i = 3; i > 0; i--) {
                bm.bltCut(bm, 0, 48 * i, 48 * 3, 48,
                    0, bh * i, 48 * 3, 48);
            }

            if (_smallerHead) { // Head -1px from left, right and top
                for (let yi = 0; yi < 4; yi++) {
                    for (let xi = 0; xi < 3; xi++) {
                        bm.bltCut(bm, 48 * xi, bh * yi, 48, 32,
                            48 * xi + 1, bh * yi + 1, 46, 31);
                    }
                }
            }

            if (_veryTall) { // Body height + 16px, width + 4px
                for (let yi = 0; yi < 4; yi++) {
                    for (let xi = 0; xi < 3; xi++) {
                        if (_longerLegs) {
                            if (is_diagonal && !!(index % 2) && yi > 1) {
                                bm.bltCut(bm, 48 * xi, bh * yi + 32, 48, 16,
                                    (48 * xi) - 2, (bh * yi) + 32, 52, 32); // Whole body
                            } else {
                                bm.bltCut(bm, 48 * xi, bh * yi + 32, 48, 16,
                                    (48 * xi) - 2, (bh * yi) + 32, 52, 24); // Upper body
                                bm.bltCut(bm, 48 * xi, bh * yi + 48, 48, 8,
                                    48 * xi, (bh * yi) + 48, 48, 16); // Legs
                            }
                        } else {
                            bm.bltCut(bm, 48 * xi, bh * yi + 32, 48, 16,
                                (48 * xi) - 2, (bh * yi) + 32, 52, 32); // Whole body
                        }
                    }
                }
            } else { // Body height + 8px, width + 0px
                for (let yi = 0; yi < 4; yi++) {
                    for (let xi = 0; xi < 3; xi++) {
                        if (_longerLegs) {
                            if (is_diagonal && !!(index % 2) && yi > 1) {
                                bm.bltCut(bm, 48 * xi, bh * yi + 32, 48, 16,
                                    (48 * xi), (bh * yi) + 32, 48, 24); // Whole body
                            } else {
                                bm.bltCut(bm, 48 * xi, bh * yi + 32, 48, 16,
                                    (48 * xi), (bh * yi) + 32, 48, 20); // Upper body
                                bm.bltCut(bm, 48 * xi, bh * yi + 48, 48, 4,
                                    48 * xi, (bh * yi) + 48, 48, 8); // Legs
                            }
                        } else {
                            bm.bltCut(bm, 48 * xi, bh * yi + 32, 48, 16,
                                (48 * xi), (bh * yi) + 32, 48, 24); // Whole body
                        }
                    }
                }
            }
            
            saveToFile(name + "_" + index + "_TALL", getImageBinary(bm));

            if (_allIndexes) { if (++_loaderCount > 7) mergeSheets(name, "_TALL"); }

        });

    };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Game_Character.prototype.convertToDiagonal = function () {
        _this.convertToDiagonal(this._characterName, this._characterIndex);
    };

    Game_Character.prototype.convertToTall = function () {
        _this.convertToTall(this._characterName, this._characterIndex);
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = sm => { };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    /*PluginManager.registerCommand(this.name, "cmd", args => {
        doSomething(args.param);
    });*/

}.bind(OcRam.Char_Converter)());