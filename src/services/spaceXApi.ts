import axios from 'axios';

import type { Launch } from '../types/Launch';

const SPACEX_API = 'https://api.spacexdata.com/v5/launches';

export const spaceXService = {
  async getNextLaunch(): Promise<Launch> {
    const response = await fetch(`${SPACEX_API}/next`);
    return response.json();
  },

  async getLaunches(filter: 'all' | 'success' | 'failed' = 'all'): Promise<Launch[]> {
    const response = await fetch(`${SPACEX_API}/past`);
    let launches = await response.json() as Launch[];
    
    launches.sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());
    
    if (filter === 'success') {
      launches = launches.filter(launch => launch.success);
    } else if (filter === 'failed') {
      launches = launches.filter(launch => !launch.success);
    }
    
    return launches.slice(0, 10);
  }
};