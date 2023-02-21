import React from "react";

const Data = () => {
  const Details = [
    { name: "name1", id: 1 },
    { name: "name1", id: 1 },
    { name: "name1", id: 1 },
  ];
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Id</th>
        </tr>
        {Details.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.id}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Data;
