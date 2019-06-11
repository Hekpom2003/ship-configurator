import React from 'react';

class FloorPlanImage extends React.Component{

  constructor(props) {
    super(props);

    this.state={
      floorPlanImage:false,
    };

    this._onChangeState=this._onChangeState.bind(this);
  }

  _onChangeState(obj){
    console.log(obj);
    this.props._onChangeState(obj);
    this.setState(obj);
  }


  _readFile(file) {
    const reader = new FileReader();
    reader.onloadend = e => this._onChangeState({ floorPlanImage: e.target.result });
    reader.readAsDataURL(file);
  }


  render() {

    const{floorKey} = this.props;

    return (
      <div className="ship-floor__plan">
        <label htmlFor={"floorPlanImage" + floorKey}>Загрузите план палубы</label>
        <input type="file"
               id={"floorPlanImage" + floorKey}
               onChange={e => this._readFile(e.target.files[0])}/>
      </div>
    );
  }
}

export default FloorPlanImage;