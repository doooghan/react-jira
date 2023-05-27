# react-jira

[老师文档](https://www.notion.so/React-491ad0643476437cafde50bee4dde6ed)

## mock

[Mock 方案对比](https://www.notion.so/2-3-Mock-d42d2ee2ae7c4347b458b96ce3e7d7c3)

1. 采用 json-server

## 学习

1. useEffect 内不能返回 async
2. unknown 可以被任何值赋值，但是自身不能赋值给别人
3. ts 是鸭子类型：面向接口编程，而不是面向对象编程

```ts
interface Base {
  id: number;
}
const test = (p: Base) => {};

// ts 会有提示
test({ id: 1, name: "123" });

// 这里不会有提示
const a = { id: 1, name: "123" };
test(a);
```

4. ts 一些区别
   1. js 中的 typeof 是在 runtime 运行的。 ts 是在静态检查时运行的。
   2. ts 中的 keyof 可以返回所有键
5. ts 的 Utility type

   1. Partial 是将所有属性变成可选
   2. Omit 是将 interface 指定属性删除，`Omit<Person, 'name'| 'age'>`
   3. Pick 是选 interface 属性
   4. Exclude 是属性中删属性

   ```ts
   interface Person {
     name: string;
     age: number;
   }

   const xiaoming: Partial<Person> = {};
   const shenmiren1: Omit<Person, "name" | "age"> = {};
   const shenmiren2: Omit<Person, "name"> = { age: 18 };

   type PersonKeys = keyof Person;
   type PersonOnlyName = Pick<Person, "name">;
   type Age = Exclude<PersonKeys, "name">;
   ```

6. css in js - emotion
   1. 学习使用基本操作
   2. 高级操作类似组件的 Row
   3. css 并改变 jsx 编译器
7. grid 和 flex 的应用场景
   1. 考虑布局场景
      1. 一维布局使用 flex
      2. 二维布局使用 grid
   2. 考虑是从内容出发还是布局出发
      1. 从内容出发 flex：先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
      2. 从布局出发 grid：先规划网格（数量一般比较固定），然后把元素填充进去
8. vite 调整 svg
   1. import svgr from 'vite-plugin-svgr'
9. react hook 与闭包经典的坑
   1. 查看 test.tsx 文件
   2. 闭包，在执行时会生成一个闭包区域
