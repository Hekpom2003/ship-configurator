import React from 'react';
import CounterInput from '../../../CounterInput';

class FloorGrid extends React.Component{
  render() {

    const {floorGrid,floorKey} = this.props;

    return (
      <div className="ship-floor__grid">
        <CounterInput
        label={'Строк:'}
        id={'floorGridRows' + floorKey}
        value={floorGrid.rows}
        _onChange={ (rows)=>this.props._onChangeState({floorGrid:{...floorGrid,rows}})}
        />

        <CounterInput
          label={'Столбцов:'}
          id={'floorGridColumns' + floorKey}
          value={floorGrid.cols}
          _onChange={ (cols)=>this.props._onChangeState({floorGrid:{...floorGrid,cols}})}
        />
      </div>
    );
  }
}
export default FloorGrid;