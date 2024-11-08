import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

interface MiniTrendGraphProps {
  data: { value: number }[];
  color: string;
}

export function MiniTrendGraph({ data, color }: MiniTrendGraphProps) {
  return (
    <div className="h-[40px] w-[80px] sm:w-[120px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}