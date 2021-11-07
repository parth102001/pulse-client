import React from "react";

const TaskRow = (props) => {
  return (
    <div>
      <tr>
        <th scope="row">{props.key}</th>
        <td>{props.title}</td>
        <td>{props.hour}</td>
        {/* <td>
          <Button className=" btn-danger" >Pending</Button>
        </td> */}
      </tr>
    </div>
  );
};

export default TaskRow;
