React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			open: false,
			classification: this.props.selval
		}
	},
	componentWillReceiveProps: function(nextProps){
		this.setState({
			classification: nextProps.selval,
			open: false, 
		});
	},
	handleClick : function() {
		this.setState({ open: !this.state.open});
	},
	handleSelection : function(option, id) {
		this.setState({ classification : option});
		this.setState({ open: false});
		this.props.whenSelected(option, id);
	},
	render: function() {
		var selval = this.state.classification;
		var show = false;
		console.log(selval);

		return <div className="col-lg-1">
					<div className="input-group">
						<div className="input-group-btn">
						<button type="button" className="btn btn-default dropdown-toggle" 
							onClick={this.handleClick}
							>{this.state.classification ? this.state.classification : "Action"}<span className="caret"></span>
						</button>
						{this.buildUl()}
					    </div>
					</div>
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
})