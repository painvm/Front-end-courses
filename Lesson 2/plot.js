function Plot(a, b, c) {
    function equationForPlot(x) {
        return a == 0 ? b*x-c : (a*Math.pow(x,2)+b*x+c);
    }
    var ctx = document.getElementById("scatterChart");
    var scatterChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: "equation",
                fill: false,
                data: [{
                    x: -10,
                    y: equationForPlot(-10)}, {
                    x: -9,
                    y: equationForPlot(-9)
                }, {
                    x: -8,
                    y: equationForPlot(-8)
                } ,
                    {
                        x: -7,
                        y: equationForPlot(-7)
                    } ,
                    {
                        x: -6,
                        y: equationForPlot(-6)
                    } ,
                    {
                        x: -5,
                        y: equationForPlot(-5)
                    } ,
                    {
                        x: -4,
                        y: equationForPlot(-4)
                    } ,
                    {
                        x: -3,
                        y: equationForPlot(-3)
                    } ,
                    {
                        x: -2,
                        y: equationForPlot(-2)
                    } ,
                    {
                        x: -1,
                        y: equationForPlot(-1)
                    } ,
                    {
                        x: 0,
                        y: equationForPlot(0)
                    } ,
                    {
                        x: 1,
                        y: equationForPlot(1)
                    },
                    {
                        x: 2,
                        y: equationForPlot(2)
                    } ,
                    {
                        x: 3,
                        y: equationForPlot(3)
                    } ,
                    {
                        x: 4,
                        y: equationForPlot(4)
                    } ,
                    {
                        x: 5,
                        y: equationForPlot(5)
                    } ,
                    {
                        x: 6,
                        y: equationForPlot(6)
                    } ,
                    {
                        x: 7,
                        y: equationForPlot(7)
                    } ,
                    {
                        x: 8,
                        y: equationForPlot(8)
                    } ,
                    {
                        x: 9,
                        y: equationForPlot(9)
                    },
                    {
                        x: 10,
                        y: equationForPlot(10)}
                ]
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
}
