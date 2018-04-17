import React from "react";
import _ from "lodash";
import Chart from './graficos/Chart';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class AddRemoveLayout extends React.Component {
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function() {},
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        initialLayout: generateLayout()
    };

    state = {
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false,
        layouts: { lg: this.props.initialLayout }
    };


    componentDidMount() {
        this.setState({ mounted: true });
    }

    generateDOM() {
        return _.map(this.props.widgets, function(i) {
            const options = {
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
            return (
                <div key={i} >
                    <Chart key={i} options={options}/>
                </div>
            );
        });
    }

    onBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    onCompactTypeChange = () => {
        const { compactType: oldCompactType } = this.state;
        const compactType =
            oldCompactType === "horizontal"
                ? "vertical"
                : oldCompactType === "vertical" ? null : "horizontal";
        this.setState({ compactType });
    };

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    };

    onNewLayout = () => {
        this.setState({
            layouts: { lg: generateLayout() }
        });
    };

    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
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

// module.exports = AddRemoveLayout;

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

// if (require.main === module) {
//     require("../test-hook.jsx")(module.exports);
// }