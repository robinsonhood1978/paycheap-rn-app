test('1', () => {
    expect(1).toBe(1);
});

import { textRegexFunction } from '../src/utils/utils'
import { setNickname, getNickname,removeNickname } from '../src/utils/auth'

beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
})

test("textRegexFunction number range function", () => {
  expect(textRegexFunction('3000',true,1,3000,null,m=>{console.log(m)})).toBeTruthy();
  expect(textRegexFunction('1',true,1,3000,null,m=>{console.log(m)})).toBeTruthy();
  expect(textRegexFunction('aa',true,1,3000,null,m=>{console.log("Should be noNumber: "+m)})).toBeFalsy();
  expect(textRegexFunction('30000',true,1,3000,null,m=>{console.log("Should be large: "+m)})).toBeFalsy();
})

test("textRegexFunction String Length function", () => {
  expect(textRegexFunction('1',false,1,8,null,m=>{console.log(m)})).toBeTruthy();
  expect(textRegexFunction('88888888',false,1,8,null,m=>{console.log(m)})).toBeTruthy();
  expect(textRegexFunction('',false,1,8,null,m=>{console.log("Should be isRequired: "+m)})).toBeFalsy();
  expect(textRegexFunction('999999999',false,1,8,null,m=>{console.log("Should be long: "+m)})).toBeFalsy();
  expect(textRegexFunction('1',false,2,8,null,m=>{console.log("Should be short: "+m)})).toBeFalsy();
})


test("textRegexFunction Chinese Phone function", () => {
  expect(textRegexFunction('13771963719',false,0,1000,"+86",()=>{})).toBeTruthy();
  expect(textRegexFunction('1377196719',false,0,1000,"+86",m=>{console.log("Should be noCPhone: "+m)})).toBeFalsy();
  expect(textRegexFunction('224851222',false,0,1000,"+86",m=>{console.log("Should be noCPhone: "+m)})).toBeFalsy();
  expect(textRegexFunction('accasda',false,0,1000,"+86",m=>{console.log("Should be noCPhone: "+m)})).toBeFalsy();
})

test("textRegexFunction New Zealand Phone function", () => {
  expect(textRegexFunction('225851213',false,0,1000,"+64",()=>{})).toBeTruthy();
  expect(textRegexFunction('13771963719',false,0,1000,"+64",m=>{console.log("Should be noNPhone: "+m)})).toBeFalsy();
  expect(textRegexFunction('1377196719',false,0,1000,"+64",m=>{console.log("Should be noNPhone: "+m)})).toBeFalsy();
  expect(textRegexFunction('accasda',false,0,1000,"+64",m=>{console.log("Should be noNPhone: "+m)})).toBeFalsy();
})

test("textRegexFunction US Phone function", () => {
  expect(textRegexFunction('2252851213',false,0,1000,"+1",()=>{})).toBeTruthy();
  expect(textRegexFunction('13771963719',false,0,1000,"+1",m=>{console.log("Should be noUPhone: "+m)})).toBeFalsy();
  expect(textRegexFunction('137719619',false,0,1000,"+1",m=>{console.log("Should be noUPhone: "+m)})).toBeFalsy();
  expect(textRegexFunction('accasda',false,0,1000,"+1",m=>{console.log("Should be noUPhone: "+m)})).toBeFalsy();
})

test("textRegexFunction Password function", () => {
  expect(textRegexFunction('22a252851213',false,0,1000,"password",()=>{})).toBeTruthy();
  expect(textRegexFunction('22A252851213',false,0,1000,"password",()=>{})).toBeTruthy();
  expect(textRegexFunction('as223',false,0,1000,"password",m=>{console.log("Should be noPassword: "+m)})).toBeFalsy();
  expect(textRegexFunction('137719619',false,0,1000,"password",m=>{console.log("Should be noPassword: "+m)})).toBeFalsy();
  expect(textRegexFunction('accasda',false,0,1000,"password",m=>{console.log("Should be noPassword: "+m)})).toBeFalsy();
})


test('1',()=>{
  const regex=/([a-zA-Z0-9+/=]{24})/;
  const str="123"
  const str2="5nwQp+j7/AxADgR7uaBWoQ=="
  const str3="*nwQp+j7/AxADgR7uaBWoQ=="
  const str4="nwQp+j7/AxADgR7uaBWoQ=="
  expect(regex.test(str)).toBeFalsy();
  expect(regex.test(str2)).toBeTruthy();
  expect(regex.test(str3)).toBeFalsy();
  expect(regex.test(str4)).toBeFalsy();
})
test("Set and Get user name", done => {
  setNickname("abc").then(() => {
    getNickname().then(name => {
      expect(name).toBe("abc");
      removeNickname().then(()=>{
        getNickname().then(name=>{
          expect(name).toBeFalsy()
          done();
        })
      })
    })
  })
})