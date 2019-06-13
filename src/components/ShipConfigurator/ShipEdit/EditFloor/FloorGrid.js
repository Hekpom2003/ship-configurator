import React from 'react';
import CounterInput from '../../../CounterInput';
import Utils from '../../../../Utils';

class FloorGrid extends React.Component {

  constructor(props) {
    super(props);

    this._onChangeMatrix = this._onChangeMatrix.bind(this);
  }

  /**
   * Берем матрицу
   * Транспонируем если у нас событие в колонках
   * Добавляем/удаляем строки
   * Транспонируем если у нас событие в колонках
   * Сохраняем состояние
   *
   * @param action
   * @param newValue
   * @param oldValue
   * @private
   */
  _onChangeMatrix(action, newValue, oldValue) {
    let { gridMatrix } = this.props;

    if (action === 'cols') {
      gridMatrix = Utils.transpose(gridMatrix);
    }

    const delta = newValue - oldValue;

    if (delta > 0) {
      gridMatrix = Utils.addRowToMatrix(gridMatrix,delta)
    }

    if (delta < 0) {
      gridMatrix = Utils.removeRowFromMatrix(gridMatrix,Math.abs(delta))
    }

    if (action === 'cols') {
      gridMatrix = Utils.transpose(gridMatrix);
    }

    this.props._onChangeState({gridMatrix});
  }

  render() {

    const { gridMatrix, floorKey } = this.props;

    const rows = gridMatrix.length;
    const cols = gridMatrix[0].length;

    console.table('gridMatrix',gridMatrix);

    return (
      <div className="ship-floor__grid">
        <CounterInput
          label={'Строк:'}
          id={'floorGridRows' + floorKey}
          value={rows}
          _onChange={(value) => this._onChangeMatrix('rows', value, rows)}
        />

        <CounterInput
          label={'Столбцов:'}
          id={'floorGridColumns' + floorKey}
          value={cols}
          _onChange={(value) => this._onChangeMatrix('cols', value, cols)}
        />
      </div>
    );
  }
}

export default FloorGrid;