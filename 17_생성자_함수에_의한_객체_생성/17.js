// console.log(new Object());

function Circle(radius) {
  // 객체 생성시, 암묵적으로 인스턴스가 생성되고 this 에 바인딩함.
  console.log(this); // Circle {}

  // 현재의 인스턴스를 초기화. (프로퍼티를 초기화)
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // this 가 암묵적으로 반환됨.

  //   return this;
}

const circle = new Circle(1);
console.log(circle);

console.log(global);

const person = { name: "Lee" };

person;
