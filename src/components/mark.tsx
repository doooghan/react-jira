import React from "react";

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  const arr2 = arr.map((str) => <span>{str}</span>);
  // const arr3 = arr2.join(<span>{keyword}</span>)
  return (
    <>
      {arr2.map((item, index) => (
        <>
          {item}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </>
      ))}
    </>
  );
};
// export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
//   if (!keyword) {
//     return <>{name}</>;
//   }
//   const arr = name.split(keyword);
//   return (
//     <>
//       {arr.map((str, index) => (
//         <span key={index}>
//           {str}
//           {index === arr.length - 1 ? null : (
//             <span style={{ color: "#257AFD" }}>{keyword}</span>
//           )}
//         </span>
//       ))}
//     </>
//   );
// };
