'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || '';
const supabaseTableName = process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseData = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from(supabaseTableName)
          .select('*');

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

  return (
    <div className="container">
      <h2 className="title">Supabase Data</h2>
      <ul className="data-list">
        {data.map((item: any) => (
          <li key={item.id} className="data-item">
            {Object.entries(item).map(([key, value]) => (
              <div key={`${item.id}-${key}`} className="data-field">
                <strong className="data-key">{key}:</strong> <span className="data-value">{String(value)}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupabaseData;
