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
