import React from "react";

class GridCell extends React.Component {
	render() {
		const translate = this.props.left + ' ' + this.props.top;
		const dismensions = 'M0,0 H' + this.props.cellWidth + ' V' + this.props.cellHeight + ' H0 L0,0';
		
		let fill = "red";
		if(typeof this.props.cellStatus !== 'undefined'){
			if(this.props.cellStatus === 'busy')
				fill = "yellow";
			else if (this.props.cellStatus === 'selected')
				fill = "green";
		}
		
		return <g transform={'translate(' + translate + ')'}>
			<path d={dismensions} fill={fill}/>
		</g>
	}
}

export default GridCell;