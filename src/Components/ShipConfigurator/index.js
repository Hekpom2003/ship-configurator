import React from 'react';
import ShipList from './ShipList';
import ShipEdit from './ShipEdit';

class ShipConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editShip: false,
      editCruise: false,
    }
  }

  render() {

    const { shipList } = this.props.data;

    let component;

    switch (this.state.editShip) {
      case false:
        component = <ShipList
          shipList={shipList}
          _onEditShip={key => this.setState({ editShip: key })}
          _onEditCruise={key => this.setState({ editCruise: key })}
        />;
        break;
      case true :
        component = <ShipEdit/>;
        break;
      default:
        component = <ShipEdit
          ship={shipList[this.state.editShip]}

          _cancelEdit={() => this.setState({ editShip: false })}
        />;

    }

    return (
      <div className={'ship-configurator'}>
        <div className="ship-configurator__title">Конфигуратор корабля</div>

        {component}

      </div>
    );
  }
}

export default ShipConfigurator;
