// Stock data structure with mock data
const stockData = {
    AAPL: {
        name: "Apple Inc.",
        symbol: "AAPL",
        currentPrice: 175.43,
        change: 2.15,
        changePercent: 1.24,
        open: 173.28,
        high: 176.82,
        low: 172.95,
        volume: "45.2M",
        marketCap: "$2.75T",
        peRatio: 28.45,
        weekLow: 124.17,
        weekHigh: 199.62,
        beta: 1.29,
        eps: 6.16,
        dividend: "0.50%",
        avgVolume: "52.3M",
        priceData: {
            "1D": generateMockData(24, 175.43, 0.5),
            "1W": generateMockData(7, 175.43, 2),
            "1M": generateMockData(30, 175.43, 5),
            "3M": generateMockData(90, 175.43, 10),
            "1Y": generateMockData(365, 175.43, 25)
        }
    },
    GOOGL: {
        name: "Alphabet Inc.",
        symbol: "GOOGL",
        currentPrice: 2847.52,
        change: -15.32,
        changePercent: -0.54,
        open: 2862.84,
        high: 2875.91,
        low: 2831.47,
        volume: "1.2M",
        marketCap: "$1.82T",
        peRatio: 25.73,
        weekLow: 2193.62,
        weekHigh: 3042.93,
        beta: 1.12,
        eps: 110.21,
        dividend: "0.00%",
        avgVolume: "1.4M",
        priceData: {
            "1D": generateMockData(24, 2847.52, 8),
            "1W": generateMockData(7, 2847.52, 35),
            "1M": generateMockData(30, 2847.52, 80),
            "3M": generateMockData(90, 2847.52, 150),
            "1Y": generateMockData(365, 2847.52, 400)
        }
    },
    MSFT: {
        name: "Microsoft Corp.",
        symbol: "MSFT",
        currentPrice: 412.83,
        change: 8.47,
        changePercent: 2.09,
        open: 404.36,
        high: 415.29,
        low: 403.12,
        volume: "18.7M",
        marketCap: "$3.06T",
        peRatio: 34.12,
        weekLow: 309.45,
        weekHigh: 468.35,
        beta: 0.89,
        eps: 12.05,
        dividend: "0.68%",
        avgVolume: "22.1M",
        priceData: {
            "1D": generateMockData(24, 412.83, 3),
            "1W": generateMockData(7, 412.83, 12),
            "1M": generateMockData(30, 412.83, 25),
            "3M": generateMockData(90, 412.83, 45),
            "1Y": generateMockData(365, 412.83, 85)
        }
    },
    TSLA: {
        name: "Tesla Inc.",
        symbol: "TSLA",
        currentPrice: 248.91,
        change: -4.23,
        changePercent: -1.67,
        open: 253.14,
        high: 256.78,
        low: 246.32,
        volume: "89.4M",
        marketCap: "$789.2B",
        peRatio: 62.45,
        weekLow: 138.80,
        weekHigh: 299.29,
        beta: 2.34,
        eps: 3.98,
        dividend: "0.00%",
        avgVolume: "95.7M",
        priceData: {
            "1D": generateMockData(24, 248.91, 4),
            "1W": generateMockData(7, 248.91, 15),
            "1M": generateMockData(30, 248.91, 35),
            "3M": generateMockData(90, 248.91, 60),
            "1Y": generateMockData(365, 248.91, 120)
        }
    },
    AMZN: {
        name: "Amazon.com Inc.",
        symbol: "AMZN",
        currentPrice: 153.74,
        change: 1.89,
        changePercent: 1.24,
        open: 151.85,
        high: 154.92,
        low: 151.23,
        volume: "42.8M",
        marketCap: "$1.59T",
        peRatio: 47.83,
        weekLow: 118.35,
        weekHigh: 170.87,
        beta: 1.15,
        eps: 3.21,
        dividend: "0.00%",
        avgVolume: "48.3M",
        priceData: {
            "1D": generateMockData(24, 153.74, 2),
            "1W": generateMockData(7, 153.74, 8),
            "1M": generateMockData(30, 153.74, 18),
            "3M": generateMockData(90, 153.74, 32),
            "1Y": generateMockData(365, 153.74, 65)
        }
    }
};

// Generate mock price data
function generateMockData(points, basePrice, volatility) {
    const data = [];
    let currentPrice = basePrice;
    const now = new Date();
    
    for (let i = points - 1; i >= 0; i--) {
        const date = new Date(now);
        if (points === 24) {
            date.setHours(date.getHours() - i);
        } else {
            date.setDate(date.getDate() - i);
        }
        
        // Add some realistic price movement
        const change = (Math.random() - 0.5) * volatility;
        currentPrice += change;
        
        // Ensure price doesn't go negative
        currentPrice = Math.max(currentPrice, basePrice * 0.5);
        
        data.push({
            x: date,
            y: parseFloat(currentPrice.toFixed(2))
        });
    }
    
    return data;
}

// Global variables
let currentStock = 'AAPL';
let currentTimeRange = '1D';
let chart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateStockDisplay();
    initializeChart();
});

// Event listeners
function initializeEventListeners() {
    // Stock tab listeners
    const stockTabs = document.querySelectorAll('.stock-tab');
    stockTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const stockSymbol = this.getAttribute('data-stock');
            selectStock(stockSymbol);
        });
    });

    // Time range listeners
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const range = this.getAttribute('data-range');
            selectTimeRange(range);
        });
    });
}

// Select stock function
function selectStock(stockSymbol) {
    currentStock = stockSymbol;
    
    // Update active tab
    document.querySelectorAll('.stock-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-stock="${stockSymbol}"]`).classList.add('active');
    
    // Update display and chart
    updateStockDisplay();
    updateChart();
}

// Select time range function
function selectTimeRange(range) {
    currentTimeRange = range;
    
    // Update active button
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-range="${range}"]`).classList.add('active');
    
    // Update chart
    updateChart();
}

// Update stock display
function updateStockDisplay() {
    const stock = stockData[currentStock];
    
    // Update main info
    document.getElementById('current-stock-name').textContent = `${stock.name} (${stock.symbol})`;
    document.getElementById('current-price').textContent = `$${stock.currentPrice.toFixed(2)}`;
    
    // Update price change
    const priceChangeElement = document.getElementById('price-change');
    const changeText = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.change >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%)`;
    priceChangeElement.textContent = changeText;
    priceChangeElement.className = stock.change >= 0 ? 'positive' : 'negative';
    
    // Update metrics
    document.getElementById('open-price').textContent = `$${stock.open.toFixed(2)}`;
    document.getElementById('high-price').textContent = `$${stock.high.toFixed(2)}`;
    document.getElementById('low-price').textContent = `$${stock.low.toFixed(2)}`;
    document.getElementById('volume').textContent = stock.volume;
    document.getElementById('market-cap').textContent = stock.marketCap;
    document.getElementById('pe-ratio').textContent = stock.peRatio.toFixed(2);
    
    // Update 52-week range
    document.getElementById('week-low').textContent = `$${stock.weekLow.toFixed(2)}`;
    document.getElementById('week-high').textContent = `$${stock.weekHigh.toFixed(2)}`;
    
    // Update range position
    const rangePercent = ((stock.currentPrice - stock.weekLow) / (stock.weekHigh - stock.weekLow)) * 100;
    document.querySelector('.current-position').style.left = `${rangePercent}%`;
    
    // Update key statistics
    document.getElementById('beta').textContent = stock.beta.toFixed(2);
    document.getElementById('eps').textContent = `$${stock.eps.toFixed(2)}`;
    document.getElementById('dividend').textContent = stock.dividend;
    document.getElementById('avg-volume').textContent = stock.avgVolume;
}

// Initialize chart
function initializeChart() {
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Price',
                data: stockData[currentStock].priceData[currentTimeRange],
                borderColor: '#4299e1',
                backgroundColor: 'rgba(66, 153, 225, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#4299e1',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 32, 44, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#4a5568',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            const date = new Date(context[0].parsed.x);
                            if (currentTimeRange === '1D') {
                                return date.toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                });
                            } else {
                                return date.toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: currentTimeRange === '1Y' ? 'numeric' : undefined
                                });
                            }
                        },
                        label: function(context) {
                            return `$${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            hour: 'HH:mm',
                            day: 'MMM DD',
                            week: 'MMM DD',
                            month: 'MMM YYYY'
                        }
                    },
                    grid: {
                        color: 'rgba(74, 85, 104, 0.3)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0aec0',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(74, 85, 104, 0.3)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0aec0',
                        callback: function(value) {
                            return `$${value.toFixed(2)}`;
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            hover: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Update chart
function updateChart() {
    if (chart) {
        const newData = stockData[currentStock].priceData[currentTimeRange];
        chart.data.datasets[0].data = newData;
        
        // Update color based on performance
        const firstPrice = newData[0].y;
        const lastPrice = newData[newData.length - 1].y;
        const isPositive = lastPrice >= firstPrice;
        
        chart.data.datasets[0].borderColor = isPositive ? '#48bb78' : '#f56565';
        chart.data.datasets[0].backgroundColor = isPositive ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)';
        
        chart.update('active');
    }
}

// Simulate real-time updates (optional)
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Only update if on 1D view for real-time effect
        if (currentTimeRange === '1D') {
            const stock = stockData[currentStock];
            const volatility = stock.currentPrice * 0.002; // 0.2% volatility
            const change = (Math.random() - 0.5) * volatility;
            
            // Update current price
            stock.currentPrice += change;
            stock.change = stock.currentPrice - stock.open;
            stock.changePercent = (stock.change / stock.open) * 100;
            
            // Add new data point
            const now = new Date();
            stock.priceData['1D'].push({
                x: now,
                y: parseFloat(stock.currentPrice.toFixed(2))
            });
            
            // Keep only last 24 hours of data
            if (stock.priceData['1D'].length > 24) {
                stock.priceData['1D'].shift();
            }
            
            // Update display
            updateStockDisplay();
            if (currentTimeRange === '1D') {
                updateChart();
            }
        }
    }, 5000); // Update every 5 seconds
}

// Start real-time simulation (uncomment to enable)
// simulateRealTimeUpdates();

// Add some interactive features
document.addEventListener('keydown', function(e) {
    const stocks = Object.keys(stockData);
    const currentIndex = stocks.indexOf(currentStock);
    
    // Navigate stocks with arrow keys
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        selectStock(stocks[currentIndex - 1]);
    } else if (e.key === 'ArrowRight' && currentIndex < stocks.length - 1) {
        selectStock(stocks[currentIndex + 1]);
    }
    
    // Navigate time ranges with number keys
    const timeRanges = ['1D', '1W', '1M', '3M', '1Y'];
    const timeIndex = parseInt(e.key) - 1;
    if (timeIndex >= 0 && timeIndex < timeRanges.length) {
        selectTimeRange(timeRanges[timeIndex]);
    }
});

// Add loading states for better UX
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // You could show a user-friendly error message here
});

// Performance optimization: debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (chart) {
            chart.resize();
        }
    }, 250);
});