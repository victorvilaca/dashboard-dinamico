import React from "react";
import _ from "lodash";
import Chart from './graficos/Chart';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: this.props.widgets,
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            layouts: { lg: this.props.initialLayout }
        };
    }

    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function() {},
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        initialLayout: generateLayout()
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    onRemoveItem(i) {
        const widgets = this.state.widgets;
        const index = widgets.indexOf(i);
        if (index !== -1) widgets.splice(index, 1);
        this.setState({widgets});
    }

    generateDOM() {
        return _.map(this.state.widgets, (i) => {
            let options;
            switch(i){
                case 'Line':
                    options = {
                        title: {
                            text: 'Fruit Consumption',
                        },
                        xAxis: {
                            categories: [
                                'Apples',
                                'Bananas',
                                'Oranges',
                                'Pineapples',
                                'Blueberries',
                            ],
                        },
                        yAxis: {
                            title: {
                                text: 'Fruit eaten',
                            },
                        },
                        chart: {
                            type: 'line',
                        },
                        series: [
                            {
                                name: 'Jane',
                                data: [1, 0, 4, 0, 3],
                            },
                            {
                                name: 'John',
                                data: [5, 7, 3, 2, 4],
                            },
                            {
                                name: 'Doe',
                                data: [0, 0, 0, 1, 0],
                            },
                        ],
                    };
                    break;
                case 'Bar':
                    options = {

                        chart: {
                            type: 'bar',
                            marginLeft: 150
                        },
                        title: {
                            text: 'Most popular ideas by April 2016'
                        },
                        subtitle: {
                            text: 'Source: <a href="https://highcharts.uservoice.com/forums/55896-highcharts-javascript-api">UserVoice</a>'
                        },
                        xAxis: {
                            type: 'category',
                            title: {
                                text: null
                            },
                            min: 0,
                            max: 4,
                            scrollbar: {
                                enabled: true
                            },
                            tickLength: 0
                        },
                        yAxis: {
                            min: 0,
                            max: 1200,
                            title: {
                                text: 'Votes',
                                align: 'high'
                            }
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Votes',
                            data: [
                                ["Gantt chart", 1000],
                                ["Autocalculation and plotting of trend lines", 575],
                                ["Allow navigator to have multiple data series", 523],
                                ["Implement dynamic font size", 427],
                                ["Multiple axis alignment control", 399],
                                ["Stacked area (spline etc) in irregular datetime series", 309],
                                ["Adapt chart height to legend height", 278],
                                ["Export charts in excel sheet", 239],
                                ["Toggle legend box", 235],
                                ["Venn Diagram", 203],
                                ["Add ability to change Rangeselector position", 182],
                                ["Draggable legend box", 157],
                                ["Sankey Diagram", 149],
                                ["Add Navigation bar for Y-Axis in Highstock", 144],
                                ["Grouped x-axis", 143],
                                ["ReactJS plugin", 137],
                                ["3D surface charts", 134],
                                ["Draw lines over a stock chart, for analysis purpose", 118],
                                ["Data module for database tables", 118],
                                ["Draggable points", 117]
                            ]
                        }]
                    };
                    break;
                case 'Spline':
                    options = {
                        chart: {
                            type: 'spline'
                        },

                        title: {
                            text: 'Spline'
                        },

                        legend: {
                            symbolWidth: 80
                        },

                        plotOptions: {
                            series: {
                                color: '#000000'
                            }
                        },

                        series: [{
                            data: [1, 3, 2, 4, 5, 4, 6, 2, 3, 5, 6],
                            dashStyle: 'longdash'
                        }, {
                            data: [2, 4, 1, 3, 4, 2, 9, 1, 2, 3, 4, 5],
                            dashStyle: 'shortdot'
                        }]
                    };
                    break;
                case '3D Columns':
                    options = {
                        chart: {
                            type: 'column',
                            margin: 75,
                            options3d: {
                                enabled: true,
                                alpha: 15,
                                beta: 15,
                                depth: 50
                            }
                        },
                        title: {
                            text: '3D Columns'
                        },
                        plotOptions: {
                            column: {
                                depth: 25
                            }
                        },
                        series: [{
                            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                        }]
                    };
                    break;
                case 'Drilldown':
                    options = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Basic drilldown'
                        },
                        xAxis: {
                            type: 'category'
                        },

                        legend: {
                            enabled: false
                        },

                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },

                        series: [{
                            name: 'Things',
                            colorByPoint: true,
                            data: [{
                                name: 'Animals',
                                y: 5,
                                drilldown: 'animals'
                            }, {
                                name: 'Fruits',
                                y: 2,
                                drilldown: 'fruits'
                            }, {
                                name: 'Cars',
                                y: 4,
                                drilldown: 'cars'
                            }]
                        }],
                        drilldown: {
                            series: [{
                                id: 'animals',
                                data: [
                                    ['Cats', 4],
                                    ['Dogs', 2],
                                    ['Cows', 1],
                                    ['Sheep', 2],
                                    ['Pigs', 1]
                                ]
                            }, {
                                id: 'fruits',
                                data: [
                                    ['Apples', 4],
                                    ['Oranges', 2]
                                ]
                            }, {
                                id: 'cars',
                                data: [
                                    ['Toyota', 4],
                                    ['Opel', 2],
                                    ['Volkswagen', 2]
                                ]
                            }]
                        }
                    };
                    break;
                default:
                    options = {
                        title: {
                            text: 'Fruit Consumption',
                        },
                        xAxis: {
                            categories: [
                                'Apples',
                                'Bananas',
                                'Oranges',
                                'Pineapples',
                                'Blueberries',
                            ],
                        },
                        yAxis: {
                            title: {
                                text: 'Fruit eaten',
                            },
                        },
                        chart: {
                            type: 'line',
                        },
                        series: [
                            {
                                name: 'Jane',
                                data: [1, 0, 4, 0, 3],
                            },
                            {
                                name: 'John',
                                data: [5, 7, 3, 2, 4],
                            },
                            {
                                name: 'Doe',
                                data: [0, 0, 0, 1, 0],
                            },
                        ],
                    };
                    break;
            }

            const removeStyle = {
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer"
            };

            return (
                <div key={i} data-grid={{x: 0, y: 0, w: 3, h: 10}}>
                    <Paper>
                        <Chart options={options}/>
                        <FontIcon
                            className="material-icons"
                            style={removeStyle}
                            onClick={this.onRemoveItem.bind(this, i)}
                        >delete_forever</FontIcon>
                    </Paper>
                </div>
            );
        });
    }

    onBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    };

    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layout={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    measureBeforeMount={false}
                    useCSSTransforms={this.state.mounted}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                >
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

function generateLayout() {
    return _.map(_.range(0, 25), function(item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}
