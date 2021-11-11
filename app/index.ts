import navigateTo from "./crawler/request";
import { CrawlerService } from './crawler/CrawlerService';
import { CharacterManagerFacade} from "./charManager/CharacterManagerFacade";
import saveJson from "./fileManager/FileManager";

const charManager = new CharacterManagerFacade();

const navigateToNext = async(url: string, count: number) => {
  if(count > 60) {
    return;
  }
  console.log("reading page ", url);
  const page = await navigateTo(url);
  const crawler = new CrawlerService(page);
  
  const tags = crawler.TryListTags();
  charManager.TryAddCharacterPage(tags);
  await navigateToNext(crawler.TryGetNextPage(), count + 1);
}

const exec = async () => {
  await navigateToNext("https://www.dumbingofage.com/2010/comic/book-1/01-move-in-day/home", 0);
  
  const result = charManager.GenerateNodesAndEdges();
  saveJson("./export/nodes.json", result.nodes);
  saveJson("./export/edges.json", result.edges);
  
  console.log("end of processing");
}; 

console.log("starting app");
exec();

