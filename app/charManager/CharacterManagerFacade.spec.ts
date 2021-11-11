jest.mock("./CharacterManagerClass");
import { CharacterManagerClass } from "./CharacterManagerClass";

import { CharacterManagerFacade } from "./CharacterManagerFacade";

describe ("char managger facade", ()=> {
  it("must receive a list of names and return a list of nodes and vertices", () => {
    const mockManager = new CharacterManagerClass();
    mockManager.GenerateNodes = jest.fn(() => [{
      id: 1, label: "Joyce" 
    }, {
      id: 2, label: "Sarah" 
    }, {
      id: 3, label: "Dorothy"
    }]);
    mockManager.GenerateEdges = jest.fn(() =>  [
      { from: 2, to: 1, value: 1 },
      { from: 3, to: 1, value: 2 },
      { from: 3, to: 2, value: 1 },
    ]);
    
    const facade = new CharacterManagerFacade(mockManager);
    
    const charList = ["Joyce", "Sarah", "Dorothy"];
    facade.TryAddCharacterPage(charList);
    
    const expected = {
      nodes: [{
        id: 1,
        label: "Joyce"
      },{
        id: 2,
        label: "Sarah"
      }, {
        id: 3,
        label: "Dorothy"
      }],
      edges: [
        { from: 2, to: 1, value: 1 },
        { from: 3, to: 1, value: 2 },
        { from: 3, to: 2, value: 1 },
      ]
    };
    expect(facade.GenerateNodesAndEdges()).toEqual(expected);
  });
  
  it("must receive 2 lists of differents names and return a list of nodes and vertices", () => {
    const mockManager = new CharacterManagerClass();
    const GenerateNodesMock = jest.fn()
      .mockReturnValueOnce([{
          id: 1, label: "Walky" 
        }, {
          id: 2, label: "Danny" 
        }, {
          id: 3, label: "Sal"
        }])
      .mockReturnValue([{
          id: 1, label: "Walky" 
        }, {
          id: 2, label: "Danny" 
        }, {
          id: 3, label: "Sal"
        }, {
          id: 4, label: "Joe"
        }, {
          id: 3, label: "Ethan"
        }]);
    mockManager.GenerateNodes = GenerateNodesMock;
    mockManager.GenerateEdges = jest.fn(() =>  [
      { from: 2, to: 1, value: 1 },
      { from: 3, to: 1, value: 2 },
      { from: 3, to: 2, value: 1 },
    ]);
    const AddNodesMomentumMock = jest.fn();
    mockManager.AddNodesMomentum = AddNodesMomentumMock;
    
    const facade = new CharacterManagerFacade(mockManager);
    
    const charList = ["Walky", "Danny", "Sal"];
    facade.TryAddCharacterPage(charList);
    
    const charList2 = ["Joe", "Ethan"];
    facade.TryAddCharacterPage(charList2);
    
    const expected = {
      nodes: [{
        id: 1, label: "Walky" 
      }, {
        id: 2, label: "Danny" 
      }, {
        id: 3, label: "Sal"
      }, {
        id: 4, label: "Joe"
      }, {
        id: 3, label: "Ethan"
      }],
      edges: [
        { from: 2, to: 1, value: 1 },
        { from: 3, to: 1, value: 2 },
        { from: 3, to: 2, value: 1 },
      ]
    };
    expect(facade.GenerateNodesAndEdges()).toEqual(expected);
    expect(AddNodesMomentumMock).toHaveBeenLastCalledWith([{
      id: 4, label: "Joe"
    }, {
      id: 3, label: "Ethan"
    }]);
  });
});