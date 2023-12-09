import React from "react";

const DataTables = ({ transaction }) => {
  return (
    <div>
   <div className="container">
  <div className="row ">
  <table className="table border text-center border-1 shadow-lg mt-3">
        <thead>
          <tr>
            <th scope="col">
              <small>SL.No</small>
            </th>
            <th scope="col">
              <small>Amount</small>
            </th>
            <th scope="col">
              <small>Category</small>
            </th>
            <th scope="col">
              <small>Refrence</small>
            </th>
            <th scope="col">
              <small>Date</small>
            </th>

            <th scope="col">
              <small>Actions</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {transaction &&
            transaction.map((data, index) => {
              return (
                <>
                  <tr>
                    <td>
                      <small>{index + 1}</small>
                    </td>
                    <td>
                      <small>{data.amount}</small>
                    </td>
                    <td>
                      <small>{data.category}</small>
                    </td>
                    <td>
                      <small>{data.refrence}</small>
                    </td>
                    <td>
                      <small>{data.date.slice(0, 10)}</small>
                    </td>

                    <td>
                      <button className="btn btn-sm text-success me-2">
                        Edit
                      </button>
                      <button className="btn btn-sm text-danger ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
  </div>
   </div>
    </div>
  );
};

export default DataTables;
