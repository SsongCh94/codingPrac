"use strict";

//Promise

//1. Producer
// 새로운 Promise 가 생성될 때, executor(resolve, reject) 가 자동으로! 바로 실행된다.

const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log("doing something");
  setTimeout(() => {
    resolve("ssong"); //성공시
    reject(new Error("no network")); //실패시
  }, 1000);
});

//2. Consumers: then, catch, finally
promise //
  .then((value) => {
    // resolve 일 때 then
    console.log(value); //value 는 ssong 을 받는다.
  })
  .catch((error) => {
    // reject 일 때 catch
    console.log(error); // 위 promise의 Error: no network 를 리턴
  })
  .finally(() => {
    // 성공이든 실패든 finally
    console.log("finally");
  });

//3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      //then 은 promise를 전달할 수 있다.
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

//4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("🐓"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 🥚`), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen() //
  .then((hen) => getEgg(hen)) //getHen의 resolve 를 hen으로 받고, hen을 getEgg의 인수로 넣어준다.
  .then(cook) //한가지만 받아서 그대로 전달할 때에는 생략이 가능하다.
  .then(console.log); //cook의 resolve 를 meal로 받고, meal을 console에 찍어준다.
//🐓 => 🥚 => 🍳

// 위의 토탈 과정은 1000ms 씩 세번, 총 3초가 걸린다.
//resolve 까먹지 말자.

// 4-1 Error Handling.
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("🐓"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`error! ${hen} => 🥚`), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen() //
  .then((hen) => getEgg(hen))
  .catch(error => {     // reject 시 계란을 못가져오고, 빵을 내보냄
    return '🥮';
  })
  .then(cook) 
  .then(console.log)
  .catch(console.log);  // Error: error! 🐓 => 🥚
  //에러!