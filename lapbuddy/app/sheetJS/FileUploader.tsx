import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const FileUploader = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [visibleData, setVisibleData] = useState<any[]>([]);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        if (file.name.endsWith('.csv')) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileContent = event.target?.result;
                const jsonData = XLSX.utils.sheet_to_json(XLSX.read(fileContent, { type: 'binary' }).Sheets.Sheet1, { header: 1 });
                setData(jsonData);
                setVisibleData(jsonData.slice(0, 40)); // Update visibleData with the first 40 lines
                await sendDataToApi(jsonData);
            };
            reader.readAsBinaryString(file);
        } else {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileContent = event.target?.result;
                const workbook = XLSX.read(fileContent, { type: 'binary' });
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
                setData(jsonData);
                setVisibleData(jsonData.slice(0, 40)); // Update visibleData with the first 40 lines
                await sendDataToApi(jsonData);
            };
            reader.readAsBinaryString(file);
        }
    };

    const sendDataToApi = async (jsonData: any[]) => {
        try {
            const response = await fetch('https://your-api-endpoint.com/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('API Response:', result);
        } catch (error) {
            console.error('Error sending data to API:', error);
        }
    };

    return (
      <>
      <h1
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text 
        text-center text-4xl font-medium tracking-tight text-transparent md:text-5xl mb-4"
      >
        Lap Analysis
      </h1>
      <p className="text-center text-gray-400 mb-8">Please upload a recent lap file to be analyzed</p>
      <div className="flex justify-center">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          <input type="file" onChange={handleFile} className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700" />
          {fileName && <h3 className="text-xl mb-4">File: {fileName}</h3>}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 text-white border-collapse border border-gray-500">
              <thead>
                <tr>
                  {data[0]?.map((col: string, index: number) => (
                    <th key={index} className="border border-gray-600 px-4 py-2">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleData.map((row: any[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <td key={cellIndex} className="border border-gray-600 px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
    );
};

export default FileUploader;
