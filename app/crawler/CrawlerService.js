"use strict";
exports.__esModule = true;
exports.CrawlerService = void 0;
var cheerio_1 = require("cheerio");
var CrawlerService = /** @class */ (function () {
    function CrawlerService(html) {
        this.html = html;
        this.$ = cheerio_1["default"].load(html, { decodeEntities: true });
    }
    CrawlerService.prototype.TryListTags = function () {
        var tagContent = this.$("div.post-tags");
        var tags = tagContent.text().replace("└ Tags: ", "").split(",");
        return tags.map(function (tag) {
            return tag.trim();
        });
    };
    CrawlerService.prototype.TryGetNextPage = function () {
        return this.$("a.navi.navi-next").attr("href") || "";
    };
    return CrawlerService;
}());
exports.CrawlerService = CrawlerService;
