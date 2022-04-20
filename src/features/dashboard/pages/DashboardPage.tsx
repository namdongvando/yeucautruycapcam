import React from 'react';
import { useParams } from 'react-router-dom';

export const DashboardPage = () => {
  const { id, abc, pa } = useParams<{ id: string; abc: string; pa: string }>();
  console.log('detail nek');
  return <div>Prfile</div>;
};
