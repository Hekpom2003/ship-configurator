import React from 'react';
import './style.scss';

class EditFloor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floorName: this.props.name,
      floorPlanImage: this.props.planImage,
    };

    this._readFile = this._readFile.bind(this);
    this._drawFloorPlan = this._drawFloorPlan.bind(this);
    this._drawBackgroundImage = this._drawBackgroundImage.bind(this);
    this._drawGrid = this._drawGrid.bind(this);
  }

  _readFile(file) {
    const reader = new FileReader();
    reader.onloadend = e => this.setState({ floorPlanImage: e.target.result });
    reader.readAsDataURL(file);
  }

  _drawFloorPlan() {
    return <div className={"floor-grid"}>
      {this._drawBackgroundImage()}
      {this._drawGrid()}
    </div>
  }

  _drawGrid() {
  }

  _drawBackgroundImage() {

    return <div><img src={this.state.floorPlanImage} alt="План палубы"/></div>


  }

  render() {

    const { id } = this.props;

    const floorPlan = (this.state.floorPlanImage) ? this._drawFloorPlan() : 'нет плана';

    return (
      <div className="edit-ship-floor">
        {/*Название палубы*/}
        <div className="edit-ship-floor__name">
          <label htmlFor={"floorName" + id}>Название палубы</label>
          <input type="text"
                 id={"floorName" + id}
                 value={this.state.floorName}
                 onChange={e => this.setState({ floorName: e.target.value })}/>
        </div>
        <div className="edit-ship-floor__background-map">
          <label htmlFor={"floorPlanImage" + id}>Загрузите план палубы</label>
          <input type="file"
                 id={"floorPlanImage" + id}
                 onChange={e => this._readFile(e.target.files[0])}/>
        </div>

        {floorPlan}

      </div>

    );
  }
}

export default EditFloor;