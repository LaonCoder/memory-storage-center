1.**Dart Basic**
===  

## < *Contents* >
- [1. Variables and Data-Types](#%EF%B8%8F-1-variables-and-data-types)
- [2. Functions and Operators](#%EF%B8%8F-2-functions-and-operators)

---  

</br>

## ✔️ 1. **Variables and Data Types**

### 1) **main 함수**
- Dart program의 entry point로, 반드시 작성해야 한다. (main 함수 내에서 작성한 코드가 호출된다.)  
- 반드시 문장의 끝에 세미콜론을 작성해야 한다.
    ```dart
    void main() {
        print("hello world!");
    }
    ```  

</br>  

### 2) **변수**
- `var` 키워드로 변수를 선언할 수 있다.
    - 선언과 동시에 초기화를 하는 경우, 타입 추론(Type Inference)을 통해 해당 타입이 되며, 다른 타입으로 타입 변경이 불가능하다.
    - 선언만 하는 경우, dynamic 타입이 되며, 타입 추론 및 타입 변경이 모두 가능하다. 
    ```dart
    var a = "A";           
    print(a.runtimeType);  // string
    a = 1;                 // Error!

    var b;
    b = "B";
    print(b.runtimeType);  // string (dynamic)
    b = 1;
    print(b.runtimeType);  // int (dynamic)
    ```  
- 다음과 같이 명시적으로 타입을 지정해줄 수도 있다.
    ```dart
    void main() {
        String a = "A";
        print(a);
    }
    ```  
- 관습적으로 함수나 메소드 내부에 지역변수를 선언할 때에는 `var`를 사용하고,  
클래스에서 변수나 프로퍼티를 선언할 때에는 타입을 지정해준다.  

</br>  

- 여러가지 타입을 가질 수 있는 변수에는 `dynamic` 타입을 사용한다.  
- 조건문을 통해 `dynamic` 타입의 변수가 블럭 안에서 어떤 타입으로 사용될지를 명시할 수 있다. (자동 완성 기능 사용 가능)
    ```dart
    void main() {
        var a;
        a = "A";
        a = true;
        a = 1; 

        if (a is String) {
            a.// String과 관련된 자동 완성 기능 사용 가능
        }
    }
    ```  

</br>

- **Null Safety** 는 개발자가 `null` 값을 참조할 수 없도록 하는 것이다.  
(dart의 변수는 기본적으로 `non-nullable`이다!)
- dart에서는 어떤 변수가 `null` 값을 가질 수 있음을 정확히 표시해주어야 한다.
- 참고 : https://dart.dev/null-safety/understanding-null-safety
    ```dart
    void main() {
        String a = "a";  // Only String
        a = null;  // (!) Type 'Null' can't be assigned to a variable of type 'String'.

        String? b = "B";  // String or Null
        b = null;  
        b.length;  // (!) Property 'length' can't be unconditionally accessed because the receiver can be 'null'.

        if (b != null) {
            b.length;
        }

        b?.length;  // If 'b' is not null, get 'length' property.
    }
    ```  

</br>

- dart에서 변수에 할당한 값을 수정할 수 없게 만들기 위해선 `final` 키워드를 사용한다.
- 자바스크립트의 `const` 키워드와 같은 역할을 한다.
- 타입을 명시해주지 않아도 컴파일러가 알아서 타입을 추론해준다.
    ```dart
    void main() {
        final a = "A";
        a = "B";  // (!) The final variable 'a' can only be set once.
    }
    ```  

</br>

- `late` 키워드를 사용하면 `non-nullable` 변수의 초기화를 선언 이후에 할 수 있다.  
(`non-nullable`로 의도한 변수를 `nullable`로 선언하게 되면, 의도치 않게 `null` 값이 들어가는 문제가 생길 수 있다.)
- 값이 할당되지 않은 변수를 사용하지 못하게 막는 역할을 한다.
    ```dart
    void main() {
        late final String a;
        // do something, go to API...
        print(a);  // The late local variable 'a' is definitely unassigned at this point.
        
        a = "A";  
        print(a);
    }
    ```  

</br>

- dart에서 `const` 키워드를 사용하면 Compile-Time Constant (컴파일 할 때 값을 미리 알고 있어야 하는 변수)를 만들 수 있다.  
- `final`과 달리 `const`는 Run-Time에 결정되는 값을 저장할 수 없다.
    ```dart
    void main() {
        const api_key = "fk31kdmvo239fdsA34";
    }
    ```  

</br>

- **String Interpolation(문자열 보간)**
    ```dart
    void main() {
        var name = "James";
        var age = 24;
        print("Hi, I'm $name. I'm ${age - 4}");  // Hi, I'm James. I'm 20.
    }
    ```  

</br>

### 3) **데이터 타입**
- (1) **Built-In Types**
    - Numbers (`int, double`)
    - Strings (`String`)
    - Booleans (`bool`)
    - Lists (`List`, also known as arrays)
    - Sets (`Set`)
    - Maps (`Map`)
    - Runes (`Runes`; often replaced by the characters API)
    - Symbols (`Symbol`)
    - The value null (`Null`)

</br>

- (2) **List**
    ```dart
    void main() {
        var nums1 = [ 1, 2, 3, 4 ]; // List<int>

        var nums2 = const [ 3, 4, 5, 6 ]; // Compile-Time Constant  (nums2[1] = 0; → error)

        var a = "nine";
        // Collection if
        List<int> nums3 = [5, 6, 7, 8, if (a == "ten") 10 else 9]; // [5, 6, 7, 8, 9]

        // Spread operator
        var nums4 = [1, 2, ...nums2]; // [1, 2, 3, 4, 5, 6]
        print(nums4);

        // Collection for
        var oldFriends = ["Tom", "Susan", "Anna"];
        var newFriends = ["John", "Kate", "Brian", for (var friend in oldFriends) "♡ $friend"];
        // → [John, Kate, Brian, ♡ Tom, ♡ Susan, ♡ Anna]
        print(newFriends);
    }
    ```  

</br>

- (3) **Map**
    ```dart
    void main() {
        // Type: Map<String, Object>
        var player = { 
            'name': 'Jones',
            'age': 24,
            'superpower': false,
        };

        player.update('name', (value) => 'Kane');
        print(player['name']);  // Kane

        Map<int, bool> bits = {
            0: true,
            1: false,
            2: true,
            3: true,
        };

        Map<String, List<int>> strBits = {
            'A': [1, 0, 1, 0],
            'B': [1, 0, 1, 1],
            'C': [1, 1, 0, 0],
        };
    }
    ```  

</br>

- (4) **Set**
    ```dart
    void main() {
        Set<int> nums = {1, 2, 3, 4};
        nums.add(3);
        nums.add(4);
        nums.add(5);
        nums.add(6);
        print(nums);  // {1, 2, 3, 4, 5, 6}

        final constantMap = const {  // Compile-time Constant
            2: 'Helium',
            10: 'Neon',
            18: 'Argon',
        };
    }
    ```  

</br>

## ✔️ 2. **Functions and Operators**
- 함수의 기본적인 사용법은 다음과 같다.
    ```dart
    void sayHello(String name) {
        print("Hello $name, Nice to meet you!");
    }

    // Fat Arrow Syntax (Immediate return), Positional Parameters
    num plus(num a, num b) => a + b;  

    // Named parameters 
    // - Null Safety를 지키기 위해 Default value를 설정하거나, 'required' 키워드를 사용해야 한다.
    String playerInfo({
        String name = "John Doe",        // Default value
        required age,                    // 'required' keyword
    }) => "name: $name / age: $age";

    // Optional positional parameters
    // - 함수를 호출할 때 지정할 필요가 없는 변수. Default value가 없으면 null이 기본값이 된다.
    String say(String from, String msg, [String? device]) {
        var result = '$from says $msg';
        if (device != null) {
            result = '$result with a $device';
        }
        return result;
    }

    void main() {
        sayHello("Tom");                        // → Hello Tom, Nice to meet you!
        print(plus(1, 3));                      // → 4
        print(playerInfo(age: 22));             // → name: John Doe / age: 22
        print(say("Sara", "'Bonjour!'"));       // → Sara says 'Bonjour!
        print(say("Jerry", "'Hi!'", "phone"));  // → Jerry says 'Hi!' with a phone
    }
    ```  

</br>

- Dart에서 함수는 **일급 객체(first-class object)** 이다.  
- 즉, 함수를 다른 함수의 인자로 넘기거나 변수에 할당할 수 있다.
    ```dart
    void printElement(int element) {
        print(element);
    }

    void main() {
        var list = [1, 2, 3];

        // Pass function as a parameter.
        list.forEach(printElement);

        // Assign function to a variable.
        var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
        print(loudify('hello'));  // → !!! HELLO !!!
    }
    ```  

</br>

- **Anonymous functions(익명 함수)**
    ```dart
    ([[Type] param1[, …]]) {
        codeBlock;
    };
    ```
    ```dart
    const list = ['apples', 'bananas', 'oranges'];
    list.map((item) {
        return item.toUpperCase();
    }).forEach((item) {
        print('$item: ${item.length}');
    });
    ```  

</br>

- **Closure(클로저)**
    - 클로저는 함수와 함수가 선언된 렉시컬(Lexical) 환경을 말한다.
    - 클로저는 함수를 리턴하면서, 리턴한 함수가 참조하는 변수가 함수 내부에 있는 함수이다.  
    (쉽게 말하자면 클로저는 객체의 특성(인스턴스 변수)을 갖는 함수이다.)
    - 참고 : https://dart.dev/guides/language/language-tour#lexical-scope
    ```dart
    // Returns a function that adds [addBy] to the function's argument.
    Function makeAdder(int addBy) {
        return (int i) => addBy + i;
    }

    void main() {
        // Create a function that adds 2.
        var add2 = makeAdder(2);

        // Create a function that adds 4.
        var add4 = makeAdder(4);

        assert(add2(3) == 5);  
        assert(add4(3) == 7);
    }
    ```  

</br>

- **QQ Operators**
    - `??` 연산자의 좌항이 `null`이 아니라면 좌항을 반환하고, `null`이라면 우항을 반환한다.
    ```dart
    String capitalizeTitle(String? title) => title?.toUpperCase() ?? "NONE";

    void main() {
        print(capitalizeTitle("super_man"));  // → SUPER_MAN
        print(capitalizeTitle(null));         // → NONE
    }
    ```  
- **QQ Assignment Operator**
    - `??=` 연산자의 좌항이 `null`이라면 우항을 할당한다.
    ```dart
    void main() {
        String? a;
        String? b = "C";
        a ??= "A";
        b ??= "B";  // (!) The left operand can't be null, so the right operand is never executed.
        print(a + ", " + b);  // → A, C
    }
    ```  

</br>

- **typedef**
    - 데이터 타입에 대한 alias를 만들 때 사용한다.
    ```dart
    typedef ListOfInts = List<int>;  // alias of 'List<int>'

    ListOfInts reverseListOfNumbers(ListOfInts list) {
        var reversed = list.reversed;
        return reversed.toList();
    }

    void main() {
        print(reverseListOfNumbers([1, 2, 3, 4, 5]));
    }
    ```  

</br>




