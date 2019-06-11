import React from 'react';

class DrawGrid extends React.Component {
  render() {

    let grid = [];

    const {floorGrid,cellStyle,tileSize} = this.props;


    for (let row = 0; row < floorGrid.rows; row++) {
      for (let col = 0; col < floorGrid.cols; col++) {

        // Сдвиг для группы
        const translate = (col * tileSize.width) + ',' + (row * tileSize.height);

        // Путь тайла
        const path = 'M 0,0 H' + tileSize.width + ' V' + tileSize.height + ' H0 L0,0';

        const cell = <g transform={'translate(' + translate + ')'} key={translate}>
          <path d={path} {...cellStyle} />
        </g>;

        grid.push(cell);
      }
    }

    return (
      <g id={"grid"} transform={'translate(' + this.props.containerOffset + ')'}>
        {grid}
      </g>
    );
  }
}

export default DrawGrid;