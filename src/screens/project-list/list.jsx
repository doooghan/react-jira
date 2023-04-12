export const List = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>名称</td>
          <td>负责人</td>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => {
          return (
            <tr>
              <td>{project.name}</td>
              <td>{project.personName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
