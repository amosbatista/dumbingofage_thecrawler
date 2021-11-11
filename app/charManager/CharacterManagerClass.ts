interface Edges {
  from: number,
  to: number,
  value: number
}

interface Nodes {
  id: number, 
  label: string, 
}

interface Character {
  name: string
}

class CharacterManagerClass {
  private nodesFromObject: any = {};
  private lastNodeId = 0;
  
  private edgesFromObject: any = {};
  
  GetEdgeObject(): any {
    return this.edgesFromObject;
  }
  
  GenerateEdges (): Array<Edges> {
    
    return Object.keys(this.edgesFromObject).reduce((edges, nodeFrom) => {
      
      Object.keys(this.edgesFromObject[nodeFrom]).forEach(nodeTo => {
        edges.push({
          from: Number.parseInt(nodeFrom),
          to: Number.parseInt(nodeTo),
          value: Number.parseInt(this.edgesFromObject[nodeFrom][nodeTo])
        });  
      });
      
      return edges;
    },  new Array<Edges>());
  }

  GenerateNodes ():Array<Nodes> {
    return Object.keys(this.nodesFromObject).reduce((final, current) => {
      final.push({
        id: this.nodesFromObject[current] as number,
        label: current,
      });

      return final;
    }, new Array<Nodes>());
  }

  TryAddCharacter (character: Character) :void {
    if(!this.nodesFromObject[character.name]) {
      this.nodesFromObject[character.name] = ++this.lastNodeId;
    }
  }
  
  AddInteraction (node1: Nodes, node2: Nodes) {
    if(!this.edgesFromObject[node1.id]) {
      this.edgesFromObject[node1.id] = {
        [node2.id]: 0
      };
    }
    const interactionValue = this.edgesFromObject[node1.id][node2.id] || 0;
    this.edgesFromObject[node1.id][node2.id] = interactionValue + 1;
  }
  
  AddNodesMomentum(_nodes: Array<Nodes>): void {
    const nodes = _nodes.slice(0);
    
    if(nodes.length <= 1) {
      return;
    }
    
    const currentNode = nodes.pop();
    
    if(!currentNode) {
      return;
    }
    
    nodes.forEach(node => {
      this.AddInteraction(currentNode, node);
    });
    
    this.AddNodesMomentum(nodes);
  }
}

export { 
  CharacterManagerClass,
  Edges,
  Nodes,
  Character
} ;