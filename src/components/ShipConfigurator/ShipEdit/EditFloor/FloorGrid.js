import React from 'react';
import CounterInput from '../../../CounterInput';

class FloorGrid extends React.Component {

  constructor(props) {
    super(props);

    this._onChangeMatrix = this._onChangeMatrix.bind(this);
  }

  _onChangeMatrix() {

  }



  render() {

    const { gridMatrix, floorKey } = this.props;

    const rows = gridMatrix.length;
    const cols = gridMatrix[0].length;

    return (
      <div className="ship-floor__grid">
        <CounterInput
          label={'Строк:'}
          id={'floorGridRows' + floorKey}
          value={rows}
          // _onChange={ (rows)=>this.props._onChangeState({floorGrid:{...floorGrid,rows}})}
        />

        <CounterInput
          label={'Столбцов:'}
          id={'floorGridColumns' + floorKey}
          value={cols}
          // _onChange={ (cols)=>this.props._onChangeState({floorGrid:{...floorGrid,cols}})}
        />
      </div>
    );
  }
}

export default FloorGrid;