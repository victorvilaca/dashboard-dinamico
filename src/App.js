import React, { Component } from 'react';
import './App.css';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './Dashboard';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
            graficos: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.renderizaGrafico = this.renderizaGrafico.bind(this);
        this.getSelectWidget = this.getSelectWidget.bind(this);
    }
    renderizaGrafico(){
        const grafico = this.state.value;
        const graficos = this.state.graficos;
        graficos.push(grafico);
        this.setState({graficos})
    };

    handleChange = (event, index, value) => {
        this.setState({
            value,
        });
    };

    getSelectWidget(){
        const style = {
            botao: {
                margin: 12,
            },
            selectWidget: {
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center'
            }
        };
        return(
            <div style={style.selectWidget}>
                <SelectField
                    hintText="Selecione um widget"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <MenuItem value="Line" primaryText="Line"/>
                    <MenuItem value="Bar" primaryText="Bar"/>
                    <MenuItem value="Spline" primaryText="Spline"/>
                    <MenuItem value="3D Columns" primaryText="3D Columns"/>
                    <MenuItem value="Drilldown" primaryText="Drilldown"/>
                </SelectField>
                <RaisedButton
                    label="Adicionar"
                    style={style.botao}
                    primary={true}
                    onClick={this.renderizaGrafico}/>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <header className="App-header">
                        <img src='https://viridis.energy/sites/default/files/logoViridisWhite.png' className="App-logo" alt="logo" />
                        <h1 className="App-title">Dashboard Dinâmico</h1>
                    </header>
                    {this.getSelectWidget()}
                    <Dashboard onLayoutChange={() => this.onLayoutChange}
                               onBreakpointChange={() => this.onBreakpointChange}
                               widgets={this.state.graficos}/>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
