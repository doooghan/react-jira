import { useMount, useArray } from "@/utils";

export const TryUseArray = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 18 },
    { name: "ma", age: 30 },
  ];

  const { add, removeIndex, clear, value } = useArray(persons);
  useMount(() => {
    // console.log(value.notExist);
    // add({ name: "test" });
    // removeIndex("123");
  });

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 99 })}>增加jhon</button>
      <button onClick={() => removeIndex(1)}>删除第一项</button>
      <button onClick={() => clear()}>clear</button>
      <div>
        {value.map((person, index) => {
          return (
            <div>
              <span>{index}</span>
              <span>{person.name}</span>
              <span>{person.age}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
