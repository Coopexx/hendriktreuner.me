const renderGraph = (dataObj) => {
    dataObj.hourly.length = 16;

    const labels = [];
    const data = [];

    for (let i = 0; i < dataObj.hourly.length; i += 2) {
        labels.push(dataObj.hourly[i].hour + ':00');
        data.push(Math.round(dataObj.hourly[i].temp));
    }

    const tempMin = Math.min(...data) - 2;
    const tempMax = Math.max(...data) + 2;

    const ctx = document.querySelector('.statistics__graph').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: '',
                    data: data,
                    backgroundColor: ['#fff'],
                    borderColor: ['#fff'],
                    borderWidth: 3,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    min: tempMin,
                    max: tempMax,
                    ticks: {
                        stepSize: 2,
                        callback: function (val) {
                            return val + ' °';
                        },
                    },
                },
            },
        },
    });
};
