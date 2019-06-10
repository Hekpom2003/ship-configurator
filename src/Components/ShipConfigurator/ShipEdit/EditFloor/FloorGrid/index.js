import React from "react";
import GridCell from "./GridCell";

class FloorGrid extends React.Component {
	
	render() {
		const height = this.props.imgHeight - this.props.offset.top - this.props.offset.bottom;
		const width = this.props.imgWidth - this.props.offset.left - this.props.offset.right;
		const viewBox = '0 0 ' + width + ' ' + height;
		
		const intercellPaddingLeft = 3, // assign to props?
			intercellPaddingTop = 3,
			cellWidth = width / this.props.cols - intercellPaddingLeft,
			cellHeight = height / this.props.rows - intercellPaddingTop,
			numCellsHorizontal = Math.floor(width / (cellWidth + intercellPaddingLeft)),
			numCellsVertical = Math.floor(height / (cellHeight + intercellPaddingTop));
		
		let cells = [];
		
		for (let x = 0; x < numCellsHorizontal; x++) {
			for (let y = 0; y < numCellsVertical; y++) {
				cells.push(
					<GridCell
						top={(intercellPaddingTop + cellHeight) * y}
						left={(intercellPaddingLeft + cellWidth) * x}
						cellWidth={cellWidth}
						cellHeight={cellHeight}
						key={x + "," + y}
						cellStatus={this.props.tileStatus[x + "," + y]}
					/>
				);
			}
		}
		
		return (
			<div className="floor-grid__overlay"
			     style={{
				     top: this.props.offset.top,
				     left: this.props.offset.left,
				     right: this.props.offset.right,
				     bottom: this.props.offset.bottom,
			     }}
			>
				<svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
					{cells}
				</svg>
			</div>
		)
	}
}

export default FloorGrid;