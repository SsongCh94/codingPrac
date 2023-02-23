// Callback Hell sample

class Userstorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "ssong" && password === "chulhwan") ||
        (id === "coder" && password === "sparta")
      ) {
        onSuccess(id); // onSuccess 라는 전달받은 콜백 불러줌, id를 전달해줌
      } else {
        onError(new Error("not found")); // onError 콜백, Error 라는 object 만들어서 'not found' 전달해줌
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ssong" || 'coder') {
        onSuccess({ name: `${user}`, role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new Userstorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
  id,
  password,
  user => {
    userStorage.getRoles(
        user, 
        userWithRole => {
            alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)
        },
        error => {
            console.log(error);
        }
        );
  },
  error => {
    console.log(error);
  }
);
