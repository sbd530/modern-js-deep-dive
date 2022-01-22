## 자료구조

- 자바스크립트는 자바의 java.util 패키지와 같은 편리한 자료구조를 제공하지 않습니다. 대신 npm 을 사용해서 외부 라이브러리를 임포트하여 사용하곤 합니다.

- 자바스크립트의 내장 자료구조라고 한다면, `Array`나 `Map`, `Set`이 있습니다. 하지만 `Array`는 C나 자바같은 언어의 배열과 다르게, 프로퍼티를 갖는 자바스크립트의 일반적인 객체입니다.
  - 이로 인해, `Array`의 요소가 추가되거나 삭제가 된다면, 객체의 프로퍼티 키가 재정렬되는 상황이 일어납니다. 의도와 관계없이 O(N) 의 정렬 과정이 일어나게 되는 것입니다.

```js
const array = ["a", "b", "c", "d"];
console.log(array);
// ['a', 'b', 'c', 'd']
// 0: "a"
// 1: "b"
// 2: "c"
// 3: "d"
// length: 4
// [[Prototype]]: Array(0)

const newArray = array.splice(2);
console.log(newArray);
// ['c', 'd']
// 0: "c"
// 1: "d"
// length: 2
// [[Prototype]]: Array(0)
```

- 스택이나 큐와 같은 자료구조는 `Array`를 이용하여 구현할 수 있지만, 우리는 링크드리스트의 노드 연결 방식(메모리주소 참조)을 통해 데이터의 추가와 삭제를 구현해보겠습니다.

### 환경 설정

- 첫번째 과제에서 jest 를 위한 설정을 똑같이 해줍니다.

### 기능 구현

- `Stack` 클래스와 `Queue` 클래스를 작성합니다.

  - 시간이 남는다면 `Deque` 이나 `LinkedList` 까지 구현해봅시다.
  - 그래도 시간이 남는다면(?), 이진트리인 `BinaryTree` 까지 구현해봅시다.

- 스택과 큐는 동일하게 `size` 프로퍼티(데이터 수)를 가지며, 메서드는 데이터를 추가하는 `push(data)`와, 데이터를 추출하는 `pop()`을 갖도록 구현합니다.

  - 덱은 `appendRight(data)`, `appendLeft(data)`와 `removeRight()`, `removeLeft()`를 구현합니다.

- 구현한 기능은 Jest를 통해 테스트를 진행합니다.

- 구현한 스택과 큐를 `Array`를 사용할 때와 비교해봅시다.

  - 스택 &rarr; `Array.prototype.push()`, `Array.prototype.pop()`과 비교.
  - 큐 &rarr; `Array.prototype.push()`, `Array.prototype.shift()`과 비교.

- 성능 테스트(시간)
  - 1000개의 데이터를 메모리에 올리고, 모두 제거할 때까지 걸리는 시간
  - 100,000개의 데이터를 메모리에 올려둔 상태에서, push와 pop을 번갈아며 100,000번 수행했을 때 걸리는 시간
