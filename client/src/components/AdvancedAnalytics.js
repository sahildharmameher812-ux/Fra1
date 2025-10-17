import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList
} from 'recharts';
import './AdvancedAnalytics.css';

const AdvancedAnalytics = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [filters, setFilters] = useState({
    timeframe: '12m',
    state: '',
    district: ''
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/analytics-graphs/advanced-dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async (chartType) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/analytics-graphs/charts/${chartType}?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSelectedChart(data.chart);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Custom chart components
  const CustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Chart rendering functions
  const renderLineChart = (data) => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={data.xAxis} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {data.yAxis.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={data.colors[index]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = (data) => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={data.xAxis} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {data.yAxis.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={data.colors[index]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = (data) => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={CustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="area"
        >
          {data.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderAreaChart = (data) => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={data.xAxis} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {data.yAxis.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stackId="1"
            stroke={data.colors[index]}
            fill={data.colors[index]}
            fillOpacity={0.6}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderFunnelChart = (data) => (
    <ResponsiveContainer width="100%" height={400}>
      <FunnelChart>
        <Funnel
          dataKey="count"
          data={data.data}
          isAnimationActive
        >
          <LabelList position="center" fill="#fff" stroke="none" />
        </Funnel>
        <Tooltip />
      </FunnelChart>
    </ResponsiveContainer>
  );

  const renderProcessingHeatmap = (data) => (
    <div className="heatmap-container">
      <h4>{data.title}</h4>
      <div className="heatmap-grid">
        <div className="heatmap-header">
          <div className="empty-cell"></div>
          {data.xAxis.map(category => (
            <div key={category} className="header-cell">{category}</div>
          ))}
        </div>
        {data.yAxis.map(state => (
          <div key={state} className="heatmap-row">
            <div className="row-header">{state}</div>
            {data.xAxis.map(category => {
              const stateData = data.data.find(d => d.state === state);
              const value = stateData[category];
              const intensity = (value - data.colorScale.min) / (data.colorScale.max - data.colorScale.min);
              const color = intensity > 0.7 ? '#EF4444' : intensity > 0.4 ? '#F59E0B' : '#10B981';
              
              return (
                <div 
                  key={`${state}-${category}`} 
                  className="heatmap-cell"
                  style={{ backgroundColor: color }}
                  title={`${state} - ${category}: ${value} days`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderChart = (chartData) => {
    switch (chartData.type) {
      case 'line':
        return renderLineChart(chartData);
      case 'bar':
      case 'stacked-bar':
        return renderBarChart(chartData);
      case 'pie':
      case 'donut':
        return renderPieChart(chartData);
      case 'area':
      case 'multi-line':
        return renderAreaChart(chartData);
      case 'funnel':
        return renderFunnelChart(chartData);
      case 'heatmap':
        return renderProcessingHeatmap(chartData);
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  const KPICard = ({ kpi }) => (
    <div className="kpi-card">
      <div className="kpi-label">{kpi.label}</div>
      <div className="kpi-value">{kpi.value}</div>
      <div className={`kpi-change ${kpi.trend}`}>
        <span className={`trend-icon ${kpi.trend}`}>
          {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
        </span>
        {kpi.change}
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => (
    <div className={`alert-card ${alert.type}`}>
      <div className="alert-header">
        <span className={`alert-icon ${alert.type}`}>
          {alert.type === 'warning' ? '⚠️' : alert.type === 'success' ? '✅' : 'ℹ️'}
        </span>
        <span className="alert-type">{alert.type.toUpperCase()}</span>
      </div>
      <div className="alert-message">{alert.message}</div>
      <div className="alert-action">{alert.action}</div>
    </div>
  );

  const ChartCard = ({ chart, onSelect }) => (
    <div className="chart-card" onClick={() => onSelect(chart)}>
      <div className="chart-header">
        <h3>{chart.title}</h3>
        <span className="chart-type">{chart.type}</span>
      </div>
      <div className="chart-preview">
        {renderChart(chart.data)}
      </div>
      {chart.data.insights && (
        <div className="chart-insights">
          <h4>Key Insights:</h4>
          <ul>
            {chart.data.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading advanced analytics...</p>
      </div>
    );
  }

  return (
    <div className="advanced-analytics">
      <div className="analytics-header">
        <h1>Advanced FRA Analytics Dashboard</h1>
        <div className="filter-controls">
          <select
            value={filters.timeframe}
            onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
          >
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
            <option value="24m">Last 24 Months</option>
          </select>
          <select
            value={filters.state}
            onChange={(e) => setFilters({...filters, state: e.target.value})}
          >
            <option value="">All States</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Tripura">Tripura</option>
            <option value="Odisha">Odisha</option>
            <option value="Telangana">Telangana</option>
          </select>
        </div>
      </div>

      <div className="analytics-tabs">
        <button
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-button ${activeTab === 'charts' ? 'active' : ''}`}
          onClick={() => setActiveTab('charts')}
        >
          Interactive Charts
        </button>
        <button
          className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          Advanced Analysis
        </button>
      </div>

      {activeTab === 'dashboard' && dashboardData && (
        <div className="dashboard-content">
          {/* KPI Section */}
          <div className="kpi-section">
            <h2>Key Performance Indicators</h2>
            <div className="kpi-grid">
              {dashboardData.kpis.map((kpi, index) => (
                <KPICard key={index} kpi={kpi} />
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <h2>Analytics Overview</h2>
            <div className="charts-grid">
              {dashboardData.charts.map((chart) => (
                <ChartCard
                  key={chart.id}
                  chart={chart}
                  onSelect={() => fetchChartData(chart.id)}
                />
              ))}
            </div>
          </div>

          {/* Alerts Section */}
          <div className="alerts-section">
            <h2>System Alerts & Notifications</h2>
            <div className="alerts-grid">
              {dashboardData.alerts.map((alert, index) => (
                <AlertCard key={index} alert={alert} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'charts' && (
        <div className="interactive-charts">
          <div className="chart-selector">
            <h2>Select Chart Type</h2>
            <div className="chart-buttons">
              {[
                'claim-timeline',
                'state-performance',
                'processing-funnel',
                'land-use-analysis',
                'tribal-demographics',
                'processing-time-heatmap',
                'satellite-analysis-trends',
                'economic-impact',
                'gender-analysis',
                'document-digitization'
              ].map((chartType) => (
                <button
                  key={chartType}
                  className="chart-button"
                  onClick={() => fetchChartData(chartType)}
                >
                  {chartType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {selectedChart && (
            <div className="selected-chart-container">
              <div className="chart-details">
                <h2>{selectedChart.title}</h2>
                <p className="chart-subtitle">{selectedChart.subtitle}</p>
                <div className="chart-visualization">
                  {renderChart(selectedChart)}
                </div>
                {selectedChart.insights && (
                  <div className="detailed-insights">
                    <h3>Detailed Insights</h3>
                    <ul>
                      {selectedChart.insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="advanced-analysis">
          <div className="analysis-tools">
            <h2>Advanced Analysis Tools</h2>
            <div className="analysis-buttons">
              <button className="analysis-button">
                Correlation Analysis
              </button>
              <button className="analysis-button">
                Predictive Modeling
              </button>
              <button className="analysis-button">
                Anomaly Detection
              </button>
              <button className="analysis-button">
                Trend Forecasting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;
