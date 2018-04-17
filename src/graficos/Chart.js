import React, { Component } from 'react';
import Highcharts from 'highcharts';

export default class Chart extends Component {
    componentDidMount() {
        console.log('props', this.props);
        this.chart = new Highcharts[this.props.type || 'Chart'](
            this.chartEl,
            this.props.options
        );
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return <div ref={el => (this.chartEl = el)} />;
    }
}