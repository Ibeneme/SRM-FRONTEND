// CSVViewer.tsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface CSVViewerProps {
  url: string;
}

const CSVViewer: React.FC<CSVViewerProps> = ({ url }) => {
  const [csvData, setCSVData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();

        Papa.parse(text, {
          complete: (result) => {
            // `result.data` contains the parsed CSV data as an array of objects
            setCSVData(result.data);
          },
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchCSVData();
  }, [url]);

  return (
    <div>
      <h2>CSV Data</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Group</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              <td>{row.first_name}</td>
              <td>{row.last_name}</td>
              <td>{row.email}</td>
              <td>{row.group}</td>
              <td>{row.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVViewer;
