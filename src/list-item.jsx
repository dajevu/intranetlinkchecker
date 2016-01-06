var React = require('react');
var Select = require('./select');
var rootUrl = 'https://sizzling-heat-2682.firebaseio.com/';

module.exports = React.createClass({
	getInitialState: function() {
		return {
			classification: this.props.item.Page,
			subject: this.props.item.Subject,
			section: this.props.item.Section,
			url: this.props.item.URL,
			use: this.props.item.Use,
			key: this.keyid,
			open: false, 
			updated: false	
		}
	},
	componentWillReceiveProps: function(nextProps){
		this.fb = new Firebase(nextProps.rootUrl + nextProps.categoryId + '/' + encodeURIComponent(nextProps.category) + '/' + nextProps.keyid + "/");

		this.setState({
			classification: nextProps.item.Page,
			subject: nextProps.item.Subject,
			section: nextProps.item.Section,
			url: nextProps.item.URL,
			use: nextProps.item.Use,
			key: nextProps.keyid,
			open: false, 
			updated: false
		});
	},
	componentWillMount: function() {
		
	},
	render: function() {

		var selval = this.state.classification;
		var style2 = {
		    'textAlign' : 'left',
	    };
	    var hrefStyle = {
	    	'fontSize' : '16px',
	    	'marginTop' : '6px'
	    };
	    var useStyle = {
	    	'width' : "200px"
	    };
	    var iconStyle = {
	    	'paddingLeft ': '5px',
	    	'paddingTop' : '2px'
	    };
	    var useStyle2 = {
	    	'width': '150px'
	    };
	    var bckStyle = {
	    	'backgroundColor' : "lightGrey",
	    	'height' : '40px'
	    };
		return <div className="row"><div className={this.state.updated ? "row-height" : ""}>
					<Select selval={selval} whenSelected={this.handleCategorySelection} selectionItems={this.props.selectionItems}/>
					<div className="col-lg-1">
						<div className="input-group">
							<input type="text"
								className="form-control"
								value={this.state.section}
								onChange={this.handleSectionChange}
							/>
						</div>
					</div>
					<div className="col-lg-2">
						<div className="input-group">
							<input type="text"
								className="form-control"
								value={this.state.subject}
								onChange={this.handleSubjectChange}
							/>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="input-group" style={hrefStyle}>
						 	<a href={this.state.url} target="_blank">{this.state.url}</a>	
						</div>
					</div>
					<div className="col-lg-1" style={useStyle}>
						<div className="input-group">
							<div className="input-group-btn" style={useStyle2}>
								<button type="button" className={"btn btn-default dropdown-toggle"} 
									onClick={this.handleClick}
									>{ (this.state.use === '') ? 'Select...' : this.state.use }<span className="caret"></span>
								</button>
								{this.buildUseUl()}
					    	</div>
					    	<div style={iconStyle}>
						    	<button type="button" className="btn default" aria-label="Left Align" onClick={this.handleSaveClick}>
	  								<span className="glyphicon glyphicon-saved" aria-hidden="true"></span>
								</button>
							</div>
						</div>
					</div>
				</div></div>
	},
	handleSubjectChange : function(event) {
		this.setState({subject: event.target.value});
	},
	handleSectionChange : function(event) {
		this.setState({section: event.target.value});
	},
	handleCategorySelection : function(category) {
		this.setState({updated: true});
		this.setState({classification: category});
	},
	handleSaveClick : function() {
		this.fb.update({
			Use : this.state.use,
			Page : this.state.classification,
			Section : this.state.section,
			URL : this.state.url
		});
		this.setState({updated: false});
		alert(this.state.use);
	},
	handleClick : function() {
		this.setState({ open: !this.state.open});
		this.setState({updated: true});
	}, 
	buildUseUl : function() {
		return <ul className={"dropdown-menu " + (this.state.open ? "show" : "")}>
					{ this.props.selectionItems.useValues.useNotUse.map (function(item, i) {
						if (item.option === 'All') 
							return ;
						else
							return (<li onClick={this.handleSelection.bind(this, item.option)}>{item.option}</li>
					);
				}, this)}
			</ul>
	},
	handleSelection : function (option) {
		this.setState({ open: false} );
		this.setState({ use: option});
		this.setState({updated: true});
	}
});