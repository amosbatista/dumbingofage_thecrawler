import cheerio, { CheerioAPI } from 'cheerio';

class CrawlerService {
  private $:CheerioAPI;
  
  constructor (
    private html: string
  ) {
    this.$ = cheerio.load(html, { decodeEntities: true });
  }
  
  TryListTags (): Array<string> {
    const tagContent = this.$("div.post-tags");
    const tags = tagContent.text().replace("└ Tags: ", "").split(",");
    
    return tags.map(tag => {
      return tag.trim();
    });
  }
  
  TryGetNextPage (): string {
    return this.$("a.navi.navi-next").attr("href") || "";
  }
}

export {
  CrawlerService
}