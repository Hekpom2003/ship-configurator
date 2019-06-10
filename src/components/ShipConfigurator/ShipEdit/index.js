import React from 'react';
import EditFloor from './EditFloor';
import './style.scss';
import { connect } from 'react-redux';
import { SHIP_EDIT__SET_ITEM } from '../../../constants/shipEdit';
import Preloader from '../../Preloader';
import ShipEditComponent from './ShipEditComponent';


class ShipEdit extends React.Component {

  componentDidMount() {
    const shipId = this.props.match.params.shipId || false;

    this.props._setDataFromServer(this.props.shipsList[shipId]);
  }

  render() {

    console.log('shipEdit', this.props.shipEdit);

    if (Object.keys(this.props.shipEdit).length === 0) {
      return (
        <Preloader/>
      )
    } else {
      return (
        <ShipEditComponent/>
      )
    }


    // const { ship } = this.props;


    // return (
    //   <div className={'ship-edit'}>
    //     <div className="ship-edit__header">
    //       <div className="ship-edit__title">Редактирование корабля</div>
    //
    //     </div>
    //     <div className="ship-edit__body">
    //
    //       <div className="ship-edit__name">
    //         <label htmlFor="shipName">Название корабля</label>
    //         <input type="text"
    //                value={this.state.shipName}
    //                onChange={e => this.setState({ shipName: e.target.value })}/>
    //       </div>
    //
    //       <div className="ship-edit__description">
    //         <label htmlFor="shipDescription">Описание корабля</label>
    //         <textarea name="shipDescription"
    //                   id="shipDescription"
    //                   cols="30"
    //                   rows="10"
    //                   onChange={e => this.setState({ shipDescription: e.target.value })}
    //                   value={this.state.shipDescription}
    //         />
    //       </div>
    //
    //       <div className="ship-edit__floors">
    //         {
    //           ship.floors.map(item => <EditFloor key={item.id} {...item}/>)
    //         }
    //       </div>
    //
    //     </div>
    //     <div className="ship-edit__footer">
    //       <div className="ship-edit__save">Сохранить</div>
    //       <div className="ship-edit__cancel" onClick={() => this.props._cancelEdit()}>Отмена</div>
    //     </div>
    //
    //
    //   </div>
    // );
  }
}

const mapStateProp = state => ({
  shipEdit: state.shipEdit,
  shipsList: state.shipsList,
});

const mapDispachProps = dispatch => {
  return {
    _setDataFromServer: data => dispatch({ type: SHIP_EDIT__SET_ITEM, payload: data }),

  }
};

export default connect(mapStateProp, mapDispachProps)(ShipEdit);