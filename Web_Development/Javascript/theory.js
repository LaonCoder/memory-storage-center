/* 모듈 패턴(Module Pattern)
- 모듈을 즉시 실행 함수 안에 작성하여 실행하면 이름이 충돌하는 상황을 피할 수 있다.
- 즉시 실행 함수에 객체로 구현한 이름 공간을 전역 변수로 넘겨서 공개할 함수를 이름 공간에 추가한다.
- 모듈의 내부 구조(변수 또는 함수)는 은폐하고 원하는 함수만 공개할 수 있다.
*/

var Module = Module || {};  // 이미 모듈이 정의되어 있으면 해당 모듈을 사용하고, 아니라면 빈 객체를 생성함.
(function(_Module) {

    var name = "Unnamed";
    
    function getName()  // private 메소드
    {
        return name;
    }

    _Module.showName = function()  // public 메소드
    {
        console.log(getName());
    };

    _Module.setName = function(x)
    {
        name = x;
    };
})(Module);

Module.setName("Tom");
Module.showName();


/* 메모이제이션(Memoization)
- 함수를 호출했을 때의 인수와 반환값을 한 쌍으로 만들어 저장해두는 기법
*/
function fibonacci(n) {
    if (n < 2) return n;
    if (!(n in fibonacci)) {
        fibonacci[n] = fibonacci(n-1) + fibonacci(n-2);
    }
    return fibonacci[n];
}

for (var i = 0; i <= 20; i++) {
    console.log(("  " + i).slice(-2) + ":" + fibonacci(i));
}


/* 메모이제이션(Memoization)2*/
function memorize(f) {
    var cache = {};
    return function(x) {
        if (cache[x] == undefined) cache[x] = f(x);
        return cache[x];
    };
}

var fibonacci = memorize(function(n) {
    if (n < 2) return n;
    return fibonacci(n-1) + fibonacci(n-2);
});

for (var i = 0; i <= 20; i++) {
    console.log(("  " + i).slice(-2) + ":" + fibonacci(i));
}


/*forEach문*/
var a = [5, 4, 3];
a.forEach( function(val) { console.log(val); } );


/* 이터레이터(Iterator)
- 반복 처리가 가능한 객체
- 이터레이터는 next 메서드를 갖는다.
- next 메서드의 반환값은 value 프로퍼티와 done 프로퍼티를 갖는 객체(iterator result)이다.
  이때 value에는 꺼낸 값이 저장되고, done에는 반복이 끝난는지를 뜻하는 논리값이 저장된다.
*/
var a = [5, 4, 3];
var iter = a[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// 배열의 이터레이터를 반환하는 함수
function makeIterator(array) {
    var index = 0;
    return {
        next : function() {
            if (index < array.length) {
                return {value : array[index++], done : false};
            } else {
                return {value : undefined, done : true};
            }
        }
    };
}
var iter = makeIterator(["A, B, C"]);
console.log(iter.next());  // → Object {value : "A", done : false}
console.log(iter.next());  // → Object {value : "B", done : false}
console.log(iter.next());  // → Object {value : "C", done : false}
console.log(iter.next());  // → Object {value : undefined, done : true}


/* for/of문
- 이터레이터를 활용한 반복 처리를 자동으로(간결하게) 할 수 있게 한다.
- 단, Symbol.iterator 메서드를 가지고 있고 반환값으로 이터레이터를 반환할 수 있는 객체를 반복 처리한다.
  (Symbol.iterator 메소드를 가진 객체를 '반복 가능(iterable) 객체'라고 한다.)
- 이터레이터를 반복처리하려면 이터러블 객체를 생성해야 한다.
*/
var a = [5, 4, 3];
for (var v of a) console.log(v);

var iterable = {};
iterable[Symbol.iterator] = function() { return iter; };
for (var v of iterable) console.log(v);


/* 제네레이터(Generator)
- 제네레이터의 성질 )
  · 반복 가능한 이터레이터를 값으로 반환한다.
  · 작업의 일시 정지와 재시작이 가능하며 자신의 상태를 관리한다.
- 제네레이터는 function* 문으로 정의한 함수이며, 하나 이상의 yield 표현식을 포함한다.
  (yield는 프로그램이 일시적으로 정지하는 위치이다.)

- 제네레이터 사용 과정 )
  · 제네레이터 함수는 이터레이터를 반환한다.
  · 이터레이터의 next 메소드가 호출되면 함수의 첫 번째 yield 연산자의 위치까지 실행하며, 결괏값으로 iterator result를 반환한다.
    (value 프로퍼티 값으로 yield 표현식에 지정한 값을 저장하고, done 프로퍼티 값으로 제네레이터 함수를 끝까지 실행했는지 저장한다.)
  · 제네레이터 함수 내부 처리는 point1에서 멈추고 일지 정지 상태가 된다.
  · 다시 next 메소드가 호출되면 처리를 해당 위치에서 처리를 재개한다.
*/
function* gen() { 
    yield 1;  // point1 
    yield 2;
    yield 3;
}

var iter = gen();
console.log(iter.next());  // → Object {value : 1, done : false}
console.log(iter.next());  // → Object {value : 2, done : false}
console.log(iter.next());  // → Object {value : 3, done : false}
console.log(iter.next());  // → Object {value : undefined, done : true}


/* 프로토타입(Prototype)
- 함수의 prototype 프로퍼티가 가리키는 객체를 그 함수의 프로토타입 객체라고 한다.
- prototype 프로퍼티는 기본적으로 빈 객체를 가리킨다.
- 프로토타입 객체의 프로퍼티는 생성자로 생성한 모든 인스턴스에서 그 인스턴스의 프로퍼티처럼 사용할 수 있다.
- 프로토타입 객체의 프로퍼티는 읽기만 가능하고 수정이 불가능하다.
- 인스턴스의 프로퍼티에 값을 대입했을 때 이름이 같은 프로퍼티가 있으면 그 프로퍼티에 값을 대입한다.
- 프로토타입 객체의 프로퍼티를 인스턴스에서 참조할 수 있는 상황을 '인스턴스가 프로토타입 객체를 상속하고 있다'라고 하며, 상속 구조는 '프로토타입 체인'이라는 메커니즘을 바탕으로 구현되어 있다.
- 생성자의 프로토타입 객체에 메서드를 추가하면 인스턴스에 메서드를 추가하지 않아도 인스턴스가 프로토타입 객체의 메서드를 사용할 수 있으므로 메모리의 낭비를 피할 수 있다.
*/
function F() {};
console.log(F.prototype);  // {}

F.prototype.prop = "prototype value";
var obj = new F();
console.log(obj.prop);  // prototype value
 
obj.prop = "instance value";
console.log(obj.prop);         // instance value
console.log(F.prototype.prop)  // prototype value


// Circle 생성자
function Circle(center, radius) {
    this.center = center;
    this.radius = radius;
}
// Circle 생성자의 prototype 프로퍼티에 area 메서드를 추가
Circle.prototype.area = function() {
    return Math.PI * this.radius * this.radius;
}
// Circle 생성자로 인스턴스를 생성
var c1 = new Circle({x:0, y:0}, 1);
var c2 = new Circle({x:3, y:4}, 5);
console.log("Area : " + c1.area());


/* 상속(Inheritance)
- 자바스크립트에서는 클래스가 아닌 객체를 상속하며, 프로토타입 체인이라는 객체의 자료구조를 사용한다.
- 모든 객체는 내부 프로퍼티 [[Prototype]]을 가지고 있고, 해당 값은 __proto__ 프로퍼티에 저장된다.
- 객체의 __proto__ 프로퍼티는 그 객체에게 상속을 해 준 부모 객체를 가리킨다.
- 자신이 갖고 있지 않은 프로퍼티는 __proto__ 프로퍼티가 가리키는 객체를 차례대로 거슬러 올라가며 검색한다.
- 이를 '프로토타입 체인(Prototype Chain)'이라고 한다. (프로토타입 상속을 하는 객체 지향 언어를 프로토타입 기반 객체 지향 언어라고 한다.)
*/
var objA = {
    name: "Tom",
    sayHello: function() { console.log("Hello, " + this.name);}
};

var objB = {
    name: "Huck"
};

objB.__proto__ = objA;
var objC = {};
objC.__proto__ = objB;
objC.sayHello(); // Hello, Huck


// 객체의 프로토타입은 Object.getPrototypeOf 메소드로 가져올 수 있다.
function F() {}
var obj = new F();
console.log(Object.getPrototypeOf(obj));  // {}

// 함수를 정의하면 함수 객체는 기본적으로 prototype 프로퍼티를 갖게 된다.
// prototype 프로퍼티는 프로토타입 객체를 가리키며, 프로토타입 객체는 기본적으로 constructor 프로퍼티와 [[Prototype]](__proto__)을 갖는다.

// constructor 프로퍼티는 함수 객체의 참조를 값으로 갖는다.
function F() {};
obj = new F();
console.log(obj.constructor);          // [Function: F]
console.log(F.prototype.constructor);  // [Function: F]


/* 데이터의 캡슐화
- 접근자 프로퍼티를 이용해서 간접적으로 데이터 프로퍼티를 읽거나 쓸 수 있다.
- 즉시 실행 함수로 클로저를 생성하면 데이터를 객체 외부에서 읽고 쓸 수 없도록 숨기고 접근자 프로퍼티로만 읽고 쓰도록 만들 수 있다.
*/
var person = (function() {
    var _name = "Tom";
    return {
        get name() {
            return _name;
        },
        
        set name(value) {
            var str = value.charAt(0).toUpperCase() + value.substring(1);
            _name = str;
        }
    };
})();

console.log(person.name);  // Tom
person.name = "huck";
console.log(person.name);  // Huck


/* 믹스인(Mixin)
- 특정 객체에 다른 객체가 가지고 있는 프로퍼티를 붙여 뒤섞는 기법
- 상속을 사용하지 않는 대신에 특정 객체의 프로퍼티를 동적으로 다른 객체에 추가한다.
*/
function mixin(target, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            target[property] = source[property];
        }
    }
    return target;
}

var obj1 = {a:1, b:2};
var obj2 = {b:3, c:4};
var obj = mixin(obj1, obj2);
console.log(obj);  // { a: 1, b: 3, c: 4 }

// 객체의 접근자 프로퍼티를 다른 객체에 믹스인하려면 프로퍼티를 생성할 때 Object.defineProperty 메서드를 사용한다.
function mixin(target, source) {
    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        var descriptor = Object.getOwnPropertyDescriptor(source, keys[i]);
        Object.defineProperty(target, keys[i], descriptor);
    }
    return target;
}

var person1 = {
    _name: "Tom",
    get name() {
        return this._name
    }
}

var person2 = {};
mixin(person2, person1);
person2.name = "Huck";
console.log(person2.name);
console.log(person2);


/* JSON(Javascript Object Notation)
- 자바스크립트 객체를 문자열로 표현하는 데이터 포맷
- JSON을 사용하면 객체를 직렬화(Serialize)할 수 있다.
- 직렬화란 컴퓨터의 메모리 속에 있는 객체를 똑같은 객체로 환원할 수 있는 문자열로 변환하는 과정이다.
*/

// 자바스크립트 객체를 JSON 문자열로 변환 : JSON.stringify
// JSON.stringify(value[, replacer[, space]])
JSON.stringify({x:1, y:2, z:3}, ["x", "z"]);  // '{"x":1, "y":2}'
JSON.stringify({x:1, y:2}, null, '\t'); 
// →  '{
//        "x":1
//        "y":2
//     }'

// JSON 문자열을 자바스크립트 객체로 변환 : JSON.parse(text[, reviver])
JSON.parse('{"x":1, "y":2}');

// JSON.stringify와 JSON.parse 메소드를 사용하면 깊은 복사를 할 수가 가능하다. (어떠한 경우에서나 깊은 복사를 올바르게 사용하려면 Object.assign 메소드를 사용한다.)
var copy = JSON.parse(JSON.stringify(obj));


 /* Promise를 사용한 비동기 처리 */
 function buyAsync(mymoney) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var payment = parseInt(prompt("지불하고자 하는 금액을 입력하십시오"));
            var balance = mymoney - payment;
            if (balance > 0) {
                document.write(`${payment}원을 지불했습니다.`);
                resolve(balance);
            } else {
                reject(`잔액은 ${mymoney}원입니다. 구매할 수 없습니다.`);
            }
        }, 1000);
    });
}

buyAsync(500)
    .then(function(balance) {
        document.write(`잔액은 ${balance}원입니다.`);
    })
    .catch(function(error) {
        document.write(error);
    });


 