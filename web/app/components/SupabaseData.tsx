'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || '';
const supabaseTableName = process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME || '';

const supabase = createClient(supabaseUrl, supabaseKey);

type SensorData = {
  id: number;
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
};

const SupabaseData = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from(supabaseTableName)
          .select('*')
          .order('timestamp', { ascending: true });

        if (error) {
          setError(error);
        } else {
          setData(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unexpected error occurred'));
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div className="no-data">データがありません</div>;
  }

  const temperatureData = {
    labels: data.map((item) => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature',
        data: data.map((item) => item.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const humidityData = {
    labels: data.map((item) => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Humidity',
        data: data.map((item) => item.humidity),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const pressureData = {
    labels: data.map((item) => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Pressure',
        data: data.map((item) => item.pressure),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sensor Data',
      },
    },
  };

  const exportToCSV = () => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map((header) => {
        const value = (row as any)[header];
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sensor_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container">
      <h2 className="title">Sensor Data</h2>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => setShowChart(true)}
        >
          Chart
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowChart(false)}
        >
          Table
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={exportToCSV}
        >
          Export CSV
        </button>
      </div>
      {showChart ? (
        <>
          <div className="mb-4">
            <h3>Temperature</h3>
            <Line options={chartOptions} data={temperatureData} />
          </div>
          <div className="mb-4">
            <h3>Humidity</h3>
            <Line options={chartOptions} data={humidityData} />
          </div>
          <div className="mb-4">
            <h3>Pressure</h3>
            <Line options={chartOptions} data={pressureData} />
          </div>
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Timestamp
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Temperature
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Humidity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pressure
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.temperature}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.humidity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pressure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupabaseData;
