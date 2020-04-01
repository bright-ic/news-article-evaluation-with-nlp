import {submit} from "../src/js/formHandler";
describe("Submit function", ()=> {
  test('it should return  "Please enter text or blog url." ',  () => {
      let text = "";
      return  submit(text).then(response => {
        expect(response.message).toEqual("Please enter text or blog url.");
      })
  });
});