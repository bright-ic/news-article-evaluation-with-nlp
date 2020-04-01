import {checkForName} from "../src/js/nameChecker";
describe("Submit function", ()=> {
  test('it should return  "EMPTY" ',  () => {
      let text = "";
        expect(checkForName(text)).toEqual("EMPTY");
  });

  test('it should return  backend url of "http://localhost:3000/evaluate/url"',  () => {
    let text = "https://www.legit.ng/1316601-coronavirus-el-rufais-wife-tests-negative-covid-19.html";
      expect(checkForName(text)).toEqual("http://localhost:3000/evaluate/url");
  });

  test('it should return  backend url of "http://localhost:3000/evaluate/text"',  () => {
    let text = "I am happy today";
      expect(checkForName(text)).toEqual("http://localhost:3000/evaluate/text");
  });
});