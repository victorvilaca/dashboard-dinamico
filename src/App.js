import React, { Component } from 'react';
import './App.css';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

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
                    <MenuItem value={null} primaryText={false} />
                </SelectField>
                <RaisedButton label="Adicionar" style={style.botao} primary={true}/>
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
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
