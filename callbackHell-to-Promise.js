// Callback Hell sample

class Userstorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === "ssong" && password === "chulhwan") ||
          (id === "coder" && password === "sparta")
        ) {
          resolve(id);
        } else {
          reject(new Error("not found")); // onError 콜백, Error 라는 object 만들어서 'not found' 전달해줌
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === "ssong" || "coder") {
          resolve({ name: `${user}`, role: "admin" });
        } else {
          reject(new Error("no access"));
        }
      }, 1000);
    });
  }
}

const userStorage = new Userstorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage
  .loginUser(id, password)
  .then(userStorage.gatRoles)
  .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
  .catch(console.log);