var React = require('react');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			open: false,
			useOpen: false,
			text: "",
			itemSelected: "Select a Category...",
			itemSelectedId: '',
			useSelected: "All"
		}
	},
	handleClick : function() {
		this.setState({ open: !this.state.open});
	},
	handleClick2 : function() {
		this.setState({ useOpen: !this.state.useOpen});
	},
	handleSelection : function(option, id) {
		this.setState({ itemSelected : option});
		this.setState({ itemSelectedId: id});
		this.setState({ open: false});
		this.props.whenClicked(option, id);
	},
	handleSelection2 : function(option, id, subject) {
		this.setState({ useSelected : subject});
		this.setState({ useOpen: false});
		this.props.whenClicked(option, id, subject);
	},
	render: function () {
		var style = {
	      'marginLeft': '-15px',
	    };
	    var style2 = {
	    'backgroundColor': 'LightYellow',
	    'textAlign' : 'left'
	    };
		return <div className="row" >
				 <div className="col-lg-2" style={style}>
					<div className="input-group">
						<div className="input-group-btn">
							<button type="button" className="btn btn-default dropdown-toggle" 
								onClick={this.handleClick} style={style2}
								>{this.state.itemSelected}<span className="caret"></span>
							</button>
							{this.buildUl()}
					    </div>
					</div>
				</div>
				
				<div className="col-lg-1" style={style}>
					<div className="input-group">
						<div className="input-group-btn">
							<button type="button" className={"btn btn-default dropdown-toggle " + ( (this.state.itemSelected === "Select a Category...") ? "hide"  : "")} 
								onClick={this.handleClick2} style={style2}
								>{this.state.useSelected}<span className="caret"></span>
							</button>
							{this.buildUl2()}
					    </div>
					</div>				
				</div>

				<div className="col-lg-9"/>
			</div>
	},
	buildUl : function() {
		return <ul className={"dropdown-menu " + (this.state.open ? "show" : "")}>
				{ this.props.selectionItems.selectValues.map(function(item, i) {
					return (<li onClick={this.handleSelection.bind(this, item.option, item.itemId)}><a href="#">{item.option}</a></li>
				);
				}, this)}
			</ul>
	},
	 buildUl2 : function() {
		return <ul className={"dropdown-menu " + (this.state.useOpen ? "show" : "")}>
				{ this.props.selectionItems.useValues.useNotUse.map(function(item, i) {
					return (<li onClick={this.handleSelection2.bind(this, this.state.itemSelected, this.state.itemSelectedId, item.option)}><a href="#">{item.option}</a></li>
				);
				}, this)}
			</ul>
	}
})