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
10. url 进行状态管理
    1.  projects?name='快递',可以有效
11. 使用 wdyr 进行无限渲染排查
12. useState 传入函数的意义是 state 的惰性初始化
    1.  所以用 useState 保存函数，不能直接传入函数，传入一个返回函数的函数
13. useReducer 和 useUndo
    1.  useReducer 轻量级的 redux， 状态管理但不是全局状态管理
    2.  什么时候
        1.  useState 适合单个状态
        2.  useReducer 适合互相影响的状态
14. redux
    1.  为什么需要redux-thunk：将获取异步数据的逻辑细节隐藏起来
        1.  实现细节，使用中间件，返回函数以后异步处理
        2.  获取异步数据的逻辑交给redux去处理，而不是组件本身去处理
    2.  rtk
        1.  rtk的reducers看起来采用可变的，实际使用了immer，会返回新的state
15. 新的状态管理
    1.  react-query, tanstack-query, swr
    2.  使用react-query，完成乐观更新
16. react-beautiful-dnd
17. 自动化测试
    1. 目的，防止出现新代码破坏旧代码的无限循环
    2.  分类
        1.  单元测试：传统单元测试，组件测试，hook测试
        2.  集成测试
        3.  e2e测试

## 细节
1. 防抖节流的应用
2. url 的状态管理
3. id 的 number 与 string 的互相转换
4. 重新 fetch 时 loading 状态干扰

## hook
1. useMountedRef:阻止在已卸载组件上赋值的 hook
2. useMemo和useCallback的使用时间，如果定义了基本类型要做依赖，就需要使用

## 进行状态管理
1. 小场面
   1. 状态提升，常见但是有 props chilling 问题
   2. component compositon，可以控制反转
2. 缓存状态：服务端返回的数据
   1. react-query/swr
3. 客户端状态
   1. url
   2. context
   3. redux 等大型状态管理库