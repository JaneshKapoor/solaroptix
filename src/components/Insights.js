// src/components/Insights.js
import React, { useState } from 'react';
import { Button, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const Insights = () => {
  const [data, setData] = useState([]);  // State to hold CSV data
  const [calculatedData, setCalculatedData] = useState([]);  // State to hold calculated units

  // Define table columns for CSV content
  const columns = [
    { title: 'Appliance', dataIndex: 'Appliance', key: 'Appliance' },
    { title: 'Load (Watts)', dataIndex: 'Load', key: 'Load' },
    { title: 'Hours', dataIndex: 'Hours', key: 'Hours' },
    { title: 'Units Consumed (kWh)', dataIndex: 'Units', key: 'Units' },  // New column for calculated units
  ];

  // Handle CSV Upload and Parsing
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        // Exclude the header row and calculate units consumed
        const parsedData = result.data.slice(1).map((row) => ({
          Appliance: row[0],
          Load: parseFloat(row[1]),
          Hours: parseFloat(row[2]),
          Units: ((parseFloat(row[1]) * parseFloat(row[2])) / 1000).toFixed(2),  // Calculate units consumed
        }));

        setData(parsedData);  // Store parsed data
        toast.success("File uploaded successfully!");
      },
      header: false,
    });
    return false;  // Prevent automatic upload
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Your Appliance CSV File</h2>
      <p>The CSV should have the following columns: Appliance, Load (Watts), Hours.</p>

      {/* Upload Button */}
      <Upload beforeUpload={handleFileUpload} accept=".csv">
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>

      {/* Display the parsed CSV data in a table */}
      {data.length > 0 && (
        <>
          <h3 style={{ marginTop: '20px' }}>Uploaded Data</h3>
          <Table dataSource={data} columns={columns} pagination={false} />
        </>
      )}
    </div>
  );
};

export default Insights;
