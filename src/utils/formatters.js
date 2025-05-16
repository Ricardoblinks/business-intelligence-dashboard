// Utility functions for formatting data

// Format currency
export const formatCurrency = (value, options = {}) => {
  const defaults = {
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    compact: false
  };
  
  const settings = { ...defaults, ...options };
  
  if (settings.compact) {
    if (value >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: settings.currency,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value / 1000000) + 'M';
    } else if (value >= 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: settings.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value / 1000) + 'K';
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: settings.currency,
    minimumFractionDigits: settings.minimumFractionDigits,
    maximumFractionDigits: settings.maximumFractionDigits,
  }).format(value);
};

// Format percentage
export const formatPercentage = (value, options = {}) => {
  const defaults = {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    plusSign: false
  };
  
  const settings = { ...defaults, ...options };
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: settings.minimumFractionDigits,
    maximumFractionDigits: settings.maximumFractionDigits,
  }).format(value / 100);
  
  return value > 0 && settings.plusSign ? `+${formatted}` : formatted;
};

// Format date
export const formatDate = (dateString, format = 'medium') => {
  const date = new Date(dateString);
  
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    numeric: { month: 'numeric', day: 'numeric', year: 'numeric' },
    time: { hour: 'numeric', minute: 'numeric' },
    dateTime: { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }
  };
  
  return new Intl.DateTimeFormat('en-US', options[format]).format(date);
};

// Format large numbers
export const formatNumber = (value, options = {}) => {
  const defaults = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    compact: false
  };
  
  const settings = { ...defaults, ...options };
  
  if (settings.compact) {
    if (value >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value / 1000000) + 'M';
    } else if (value >= 1000) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value / 1000) + 'K';
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: settings.minimumFractionDigits,
    maximumFractionDigits: settings.maximumFractionDigits,
  }).format(value);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};