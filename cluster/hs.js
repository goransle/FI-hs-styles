import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/highcharts-more.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/exporting.src.js'
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'

async function fetchSheet(googleSpreadsheetKey, worksheet) {
    var url = [
        'https://spreadsheets.google.com/feeds/cells',
        googleSpreadsheetKey,
        worksheet,
        'public/values?alt=json'
    ].join('/');
  
    return new Promise((resolve, reject) => {
        Highcharts.ajax({
            url: url,
            dataType: 'json',
            success: function (json) {
                const cells = json.feed.entry;
                const data = [];
                const seriesDataSets = {};

                cells.forEach(cell => {

                    const colIndex = cell.gs$cell.col;
                    const rowIndex = cell.gs$cell.row;

                    if (!data[rowIndex]) {
                        data[rowIndex] = [];
                    }

                    if (!data[rowIndex][colIndex]) {
                        data[rowIndex][colIndex] = (
                            (cell.gs$cell.numericValue && parseInt(cell.gs$cell.numericValue)) ||
                            cell.gs$cell.$t
                        );
                    }
                    //console.log(data[2]);

                });

                data.forEach((row, index) => {

                    if (index <= 1) {
                        return;
                    }

                    if (!seriesDataSets[row[3]]) {
                        seriesDataSets[row[3]] = [];
                    }
                    seriesDataSets[1]
                    seriesDataSets[row[3]].push({
                        name: row[1],
                        value: row[2]
                    });

                });

                // console.log(seriesDataSets);
                resolve(seriesDataSets);

            },
            error: function (
                xhr,
                text
            ) {
                reject(text, xhr);
            }
        });
    });
}

let hoverFx;
const chart = Highcharts.chart(
    'container',
    {
        chart: {
            type: 'packedbubble',
            height: '70%',
            events: {
                addSeries: function () {

                    const seriesArray = chart.series;
                    var timesRun = 0;

                    if (!hoverFx) {
                        
                        hoverFx = window.setInterval(function () {

                            if (!seriesArray.length) {
                                return;
                            }

                            let hoverSeries = (
                                chart.hoverPoint && chart.hoverPoint.series ||
                                chart.hoverSeries
                            );

                            if (hoverSeries) {
                                hoverSeries.points[0].onMouseOut();
                            }

                            if (!hoverSeries || hoverSeries.index >= (seriesArray.length - 1)) {
                                hoverSeries = seriesArray[0];
                            } else {
                                hoverSeries = seriesArray[hoverSeries.index + 1];
                            }

                            hoverSeries.points[0].onMouseOver();

                            // A this if stops the infinite hovering after ca. 120 seconds.
                            // Can be deleted if infinite hovering is wanted.
                            timesRun++;
                            if(timesRun === 60) {
                                hoverSeries.onMouseOut();
                                clearInterval(hoverFx)
                            }
                        }, 2000);
                    }
                }
            }
        },
        title: {
            text: 'Medlemmar i clusteret'
        },
        //colors: ['#F0F', '#0F0', 'blue', 'pink','yellow'],
        // tooltip are turned off, the information is only valuable due to bubble sizes
        tooltip: {
            style: {
                display: 'none'
            }
        },
        plotOptions: {
            
            packedbubble: {
                minSize: '10%',
                maxSize: '100%',
                zMin: 0,
                zMax: 100,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal',
                    width: '3px'
                }
            }
        }, // Plot options
        //series :{},
    }
);
 
fetchSheet('1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw', 4)
    .then(
        seriesDataSets => {
            //console.log(seriesDataSets);
            Highcharts.objectEach(
                seriesDataSets,
                (data, name) => chart.addSeries({ name, data })
            )
        }
    )
    .catch(
        error => {
            console.error(error);
        }
    );