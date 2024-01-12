import React from "react";

interface HistoryLogItem {
  ticketId: string;
  status: string;
  date: string;
  assignedTo: string;
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
      {/* <h2 className='logs-header'>Recent Tickets</h2> */}
      <table className="log-table">
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Ticket ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="log-item">
              <td>
                <span className="center-column-span">
                  <img
                    className="center-column-image"
                    src={item?.image}
                    alt="item"
                  />
                  <span className="center-column">
                    <p className="center-column-title">{item.assignedTo}</p>
                    <p className="center-column-p">{item.email}</p>
                  </span>
                </span>
              </td>
              <td>{item.ticketId}</td>
              <td>
                <p
                  style={{
                    color: item.status === "Overdue" ? "red" : "#0000ff",
                    backgroundColor:
                      item.status === "Overdue" ? "#ff000012" : "#0000ff12",
                      width:100,
                      textAlign:'center',
                      padding:2,
                      borderRadius: 30
                  }}
                >
                  {" "}
                  {item.status}
                </p>
              </td>
              <td>{item.date}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryLog;
