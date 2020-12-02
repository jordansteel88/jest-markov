const { MarkovMachine } = require("./markov");

describe('markov machine tests', function () {
    test('makes chains', function () {
      let mm = new MarkovMachine("a b c a");
  
      expect(mm.chains).toEqual(new Map([
        ["a", ["b", null]],
        ["b", ["c"]],
        ["c", ["a"]]
      ]));
    });
  
    test('choice picks random element from array', function () {
      expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]));
    });
  
    test('null param ends text with last word', function () {
      let mm = new MarkovMachine("the cat in the hat");
      let output = mm.makeText();
      expect(output.endsWith('hat')).toBe(true);
    });
  });