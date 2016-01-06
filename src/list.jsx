var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
	getInitialState: function() {
	console.log("getting initial state");
	  return {
	  	items: {}
	  }
	 },
	componentWillMount : function() {
		console.log("Inside componentWillMount");
		return {
	  		items: {}
	  	}
	},
	componentWillReceiveProps: function(nextProps){
		this.setState({ items: {}});
		console.log("Inside componentWillReceiveProps");
		console.log(nextProps);
		this.setState({ items: nextProps.items});
	},
	render: function() {

		var style = {
	      'marginBottom': '10px'
	    };
	    var header2 = {
	    	"backgroundColor": "black",
	    	'color' : 'white'
	    };
		return <div>
			<div className="row" style={style}>
				<div className="col-lg-1"><button  style={header2} type="button" className="btn btn-default dropdown-toggle">Subject Classification</button></div>
				<div className="col-lg-1"><button  style={header2} type="button" className="btn btn-default dropdown-toggle">Sub-Section</button></div>	
				<div className="col-lg-2"><button  style={header2} type="button" className="btn btn-default dropdown-toggle">Page Title</button></div>	
				<div className="col-lg-3"><button  style={header2} type="button" className="btn btn-default dropdown-toggle">Link</button></div>	
			</div>
			{this.renderList()}
		</div>	
	},
	renderList: function() {
		console.log("Rendering list");
		console.log(this.state.items.length);

			var children = [];

			{for (var key in this.state.items) {
				console.log("key is: " + key);
				var item = this.state.items[key];
				var itemKey = key;
				children.push(
					<ListItem
						item = {item}
						keyid = {itemKey}
						selectionItems = {this.props.selectionItems}
						itemsStore = {this.props.itemsStore}
						category = {this.props.category}
						categoryId = {this.props.categoryId}
						rootUrl = {this.props.rootUrl}

					/>
				)
			}

			return children;
		}
	}
});