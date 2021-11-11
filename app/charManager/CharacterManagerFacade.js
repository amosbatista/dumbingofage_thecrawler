"use strict";
exports.__esModule = true;
exports.CharacterManagerFacade = void 0;
var CharacterManagerClass_1 = require("./CharacterManagerClass");
var CharacterManagerFacade = /** @class */ (function () {
    function CharacterManagerFacade(characterManager) {
        if (characterManager === void 0) { characterManager = new CharacterManagerClass_1.CharacterManagerClass(); }
        this.characterManager = characterManager;
    }
    CharacterManagerFacade.prototype.TryAddCharacterPage = function (chars) {
        var _this = this;
        chars.forEach(function (name) {
            _this.characterManager.TryAddCharacter({ name: name });
        });
        var allNodes = this.characterManager.GenerateNodes();
        var onlyCurrentNodes = allNodes.filter(function (node) {
            return chars.find(function (char) {
                return char === node.label;
            });
        });
        this.characterManager.AddNodesMomentum(onlyCurrentNodes);
    };
    CharacterManagerFacade.prototype.GenerateNodesAndEdges = function () {
        return {
            nodes: this.characterManager.GenerateNodes(),
            edges: this.characterManager.GenerateEdges()
        };
    };
    return CharacterManagerFacade;
}());
exports.CharacterManagerFacade = CharacterManagerFacade;
