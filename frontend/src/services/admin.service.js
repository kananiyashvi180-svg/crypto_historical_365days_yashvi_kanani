import apiClient from '../api/apiClient';

export const adminService = {
  // Overview KPI stats
  getStats: async () => {
    const res = await apiClient.get('/api/v1/admin/stats');
    return res.data;
  },

  // User management
  getUsers: async (params = {}) => {
    const res = await apiClient.get('/api/v1/admin/users', { params });
    return res.data;
  },

  getUserById: async (id) => {
    const res = await apiClient.get(`/api/v1/admin/users/${id}`);
    return res.data;
  },

  updateUserRole: async (id, role) => {
    const res = await apiClient.patch(`/api/v1/admin/users/${id}/role`, { role });
    return res.data;
  },

  updateUserStatus: async (id, isActive) => {
    const res = await apiClient.patch(`/api/v1/admin/users/${id}/status`, { isActive });
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await apiClient.delete(`/api/v1/admin/users/${id}`);
    return res.data;
  },

  // Activity logs
  getLogs: async (params = {}) => {
    const res = await apiClient.get('/api/v1/admin/logs', { params });
    return res.data;
  },

  // Analytics
  getWatchlistAnalytics: async () => {
    const res = await apiClient.get('/api/v1/admin/analytics/watchlist');
    return res.data;
  },

  getPortfolioAnalytics: async () => {
    const res = await apiClient.get('/api/v1/admin/analytics/portfolio');
    return res.data;
  },

  getSearchAnalytics: async (params = {}) => {
    const res = await apiClient.get('/api/v1/admin/analytics/search', { params });
    return res.data;
  },

  // System health
  getHealth: async () => {
    const res = await apiClient.get('/api/v1/admin/health');
    return res.data;
  },

  // Coin analytics (reuse analytics endpoints)
  getCoinAnalytics: async () => {
    const [overview, trending, gainers, losers, catDist] = await Promise.allSettled([
      apiClient.get('/api/v1/analytics/overview'),
      apiClient.get('/api/v1/analytics/coins/trending'),
      apiClient.get('/api/v1/analytics/coins/top-gainers'),
      apiClient.get('/api/v1/analytics/coins/top-losers'),
      apiClient.get('/api/v1/analytics/market/category-distribution'),
    ]);
    const ok = (r) => (r.status === 'fulfilled' ? r.value.data : null);
    return {
      overview: ok(overview),
      trending: ok(trending),
      gainers: ok(gainers),
      losers: ok(losers),
      categoryDistribution: ok(catDist),
    };
  },
};

export default adminService;
