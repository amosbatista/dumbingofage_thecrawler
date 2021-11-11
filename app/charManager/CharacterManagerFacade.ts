

import { CharacterManagerClass } from './CharacterManagerClass';

class CharacterManagerFacade {
  constructor (
    private characterManager = new CharacterManagerClass()
  )  {}
  
  TryAddCharacterPage(chars: Array<string>): void {
    chars.forEach(name => {
      this.characterManager.TryAddCharacter({name});
    });
    const allNodes = this.characterManager.GenerateNodes();
    const onlyCurrentNodes = allNodes.filter( node => {
      return chars.find( char => {
        return char === node.label
      });
    });
    
    this.characterManager.AddNodesMomentum(onlyCurrentNodes);
  }
  
  GenerateNodesAndEdges(): any {
    return {
      nodes: this.characterManager.GenerateNodes(),
      edges: this.characterManager.GenerateEdges()
    }
  }
  
}

export {
  CharacterManagerFacade
}