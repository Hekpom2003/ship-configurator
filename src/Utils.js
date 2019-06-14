class Utils {

  /**
   * Транспонирование матрицы
   *
   * @param matrix
   * @returns {*}
   */
  static transpose = matrix => matrix.reduce(($, row) =>
      row.map((_, i) => [...($[i] || []), row[i]]),
    []
  );

  /**
   * Добавление строк
   *
   * @param gridMatrix
   * @param value
   * @returns {*}
   */
  static addRowToMatrix(gridMatrix,value) {
    const lineToAdd = [];

    for (let i = 0; i < gridMatrix[0].length; i++) {
      lineToAdd.push(0);
    }

    for (let i = 0; i < value; i++) {
      gridMatrix.push(lineToAdd);
    }
    return gridMatrix;
  }

  /**
   * Удаление строк
   *
   * @param gridMatrix
   * @param value
   * @returns {*}
   */
  static removeRowFromMatrix(gridMatrix,value) {
    gridMatrix.splice(-1, value);

    return gridMatrix;
  }
}

export default Utils;