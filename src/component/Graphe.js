import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Graphe({ temperatureData }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy(); 
        }

        if (temperatureData && temperatureData.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: temperatureData.map((entry, index) => `Jour ${index + 1}`),
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: temperatureData,
                            borderColor: 'rgb(255, 171, 64)',                          
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    
                },
            });
        }
    }, [temperatureData]);

    return (
        <div className="graphe">
            <canvas ref={chartRef} id="temperature-chart"></canvas>
        </div>
    );
}

export default Graphe;
