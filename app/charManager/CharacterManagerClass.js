"use strict";
exports.__esModule = true;
exports.CharacterManagerClass = void 0;
var CharacterManagerClass = /** @class */ (function () {
    function CharacterManagerClass() {
        this.nodesFromObject = {};
        this.lastNodeId = 0;
        this.edgesFromObject = {};
    }
    CharacterManagerClass.prototype.GetEdgeObject = function () {
        return this.edgesFromObject;
    };
    CharacterManagerClass.prototype.GenerateEdges = function () {
        var _this = this;
        return Object.keys(this.edgesFromObject).reduce(function (edges, nodeFrom) {
            Object.keys(_this.edgesFromObject[nodeFrom]).forEach(function (nodeTo) {
                edges.push({
                    from: Number.parseInt(nodeFrom),
                    to: Number.parseInt(nodeTo),
                    value: Number.parseInt(_this.edgesFromObject[nodeFrom][nodeTo])
                });
            });
            return edges;
        }, new Array());
    };
    CharacterManagerClass.prototype.GenerateNodes = function () {
        var _this = this;
        return Object.keys(this.nodesFromObject).reduce(function (final, current) {
            final.push({
                id: _this.nodesFromObject[current],
                label: current
            });
            return final;
        }, new Array());
    };
    CharacterManagerClass.prototype.TryAddCharacter = function (character) {
        if (!this.nodesFromObject[character.name]) {
            this.nodesFromObject[character.name] = ++this.lastNodeId;
        }
    };
    CharacterManagerClass.prototype.AddInteraction = function (node1, node2) {
        var _a;
        if (!this.edgesFromObject[node1.id]) {
            this.edgesFromObject[node1.id] = (_a = {},
                _a[node2.id] = 0,
                _a);
        }
        var interactionValue = this.edgesFromObject[node1.id][node2.id] || 0;
        this.edgesFromObject[node1.id][node2.id] = interactionValue + 1;
    };
    CharacterManagerClass.prototype.AddNodesMomentum = function (_nodes) {
        var _this = this;
        var nodes = _nodes.slice(0);
        if (nodes.length <= 1) {
            return;
        }
        var currentNode = nodes.pop();
        if (!currentNode) {
            return;
        }
        nodes.forEach(function (node) {
            _this.AddInteraction(currentNode, node);
        });
        this.AddNodesMomentum(nodes);
    };
    return CharacterManagerClass;
}());
exports.CharacterManagerClass = CharacterManagerClass;
