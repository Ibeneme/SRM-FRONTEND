import React from "react";
import { MdSend } from "react-icons/md";

interface HistoryLogItem {
  reference: string;
  status: string;
  created_at: string;
  customer: any;
  title: string;
  email: string;
  image: string;
}

interface HistoryLogProps {
  data: HistoryLogItem[];
}

const HistoryLog: React.FC<HistoryLogProps> = ({ data }) => {
  return (
    <div className="history-log">
      <p className="history-log-p"> All Tickets </p>
      {/* <h2 className='logs-header'>Recent Tickets</h2> */}
      <table className="log-table">
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Title</th>
            <th>Ticket ID</th>
            {/* <th>Status</th> */}
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className="log-item">
              <td>
                <span className="center-column-span">
                  <img
                    className="center-column-image"
                    src={item?.image}
                    alt="item"
                  />
                  <span className="center-column">
                    <p className="center-column-title">
                      {item.customer?.first_name} {""}{" "}
                      {item.customer?.last_name}
                    </p>
                    <p className="center-column-p"> {item.customer?.email}</p>
                  </span>
                </span>
                <p className="center-column-p-title">
                  {" "}
                  Ticket Title: {item.title}
                </p>
              </td>
              <td>{item.title}</td>
              <td>{item.reference}</td>

              {/*     <td>
            <p
                  style={{
                    color: item.status === "Overdue" ? "red" : "#0000ff",
                    backgroundColor:
                      item.status === "Overdue" ? "#ff000012" : "#0000ff12",
                    width: 100,
                    textAlign: "center",
                    padding: 2,
                    borderRadius: 30,
                  }}
                >
                  {" "}
                  {item.status}
                </p> 
              </td>*/}
              <td>{item.created_at?.toLocaleString()}</td>
              <td>
                {" "}
                <p className="view-tickets">
                  View ticket <MdSend />{" "}
                </p>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryLog;
