var React = require('react');
var Modal = require('react-modal');
var Select = require('./select');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			classification: this.props.category,
			classificationId: this.props.categoryId,
			subject: this.props.item.Subject,
			section: this.props.item.Section,
			comments: this.props.item.Comments,
			url: this.props.item.URL,
			use: this.props.item.Use,
			rootUrl : this.props.rootUrl,
			key: this.props.keyid,
			originalClassification : this.props.category,
			originalClassificationId : this.props.categoryId,
			open: false, 
			updated: false,
			modalIsOpen: false
		}
	},
	componentWillReceiveProps: function(nextProps){

		this.setState({
			classification: nextProps.category,
			classificationId: nextProps.categoryId,
			originalClassification : nextProps.category,
			originalClassificationId : nextProps.categoryId,
			subject: nextProps.item.Subject,
			section: nextProps.item.Section,
			comments: nextProps.item.Comments,
			url: nextProps.item.URL,
			use: nextProps.item.Use,
			rootUrl : nextProps.rootUrl,
			key: nextProps.keyid,
			open: false, 
			updated: false
		});
	},
	componentWillMount: function() {
		
	},
	getClassificationId : function(classification) {
		var selectionId = "";
		this.props.selectionItems.selectValues.map(function(item, i) {
			if (item.option === classification) {
				selectionId = item.itemId;
			}
		});

		return selectionId;
	},
	render: function() {
		const customStyles = {
		  content : {
		    top                   : '50%',
		    left                  : '50%',
		    right                 : 'auto',
		    bottom                : 'auto',
		    marginRight           : '-50%',
		    transform             : 'translate(-50%, -50%)'
		  },
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    zIndex			  : 100,
		    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
		  },
		};

		var style2 = {
		    'textAlign' : 'left',
	    };
	    var hrefStyle = {
	    	'fontSize' : '14px',
	    	'marginTop' : '6px',
	    	'width' : '600px'
	    };
	    var useStyle = {
	    	'width' : "130px"
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
	    var hideStyle = {
	    	'display' : 'none'
	    };
	    var smallerButton = {
	    	'width' : '90px',
	    	'marginRight' : '10px'
	    };
	    var marginTopStyle = {
	    	'marginLeft' : '10px',
	    	'marginTop' : '10px',
	    	'width' : '50px'

	    };
	    var width100 = {
	    	'width' : '100px'
	    };
		return <div className="row"><div className={this.state.updated ? "row-height" : ""}>
					<Modal
			          isOpen={this.state.modalIsOpen}
			          onRequestClose={this.closeModal}
			          style={customStyles} >

			          <form>
			            <input type="text" style={hrefStyle}
								className="form-control"
								value={this.state.url}
								onChange={this.handleUrlUpdate}
						/>
						<button type="button" className="btn btn-primary" style={marginTopStyle} onClick={this.handleUrlSave}>Save</button>
			            <button type="button" className="btn btn-danger" style={marginTopStyle} onClick={this.closeModal}>Close</button>
			          </form>
			        </Modal>
					<Select selval={this.state.classification} whenSelected={this.handleCategorySelection} selectionItems={this.props.selectionItems}/>
					<div className="col-lg-1 widen">
						<div className="input-group">
							<input type="text"
								className="form-control"
								value={this.state.section}
								onChange={this.handleSectionChange}
							/>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="input-group">
							<input type="text"
								className="form-control"
								value={this.state.comments}
								onChange={this.handleCommentsChange}
							/>
						</div>
					</div>
					<div className="col-lg-1 link-button" >
						<button className="btn btn-info" style={smallerButton} type="button" onClick={this.openModal}>
  							Edit Link<span className="glyphicon glyphicon-eye-open" style={iconStyle}></span>
						</button>
						<button className="btn btn-info" style={smallerButton} type="button" onClick={this.popOpenUrl}>
  							Open Link<span className="glyphicon glyphicon-new-window" style={iconStyle}></span>
						</button>
						<div className="input-group" style={hideStyle}>
						 	<a href={this.state.url} target="_blank">{this.state.url}</a>	
						</div>
					</div>
					<div className="col-lg-1" style={useStyle}> 
						<div className="input-group">
							<div className="input-group-btn" style={useStyle2}>
								<button type="button" className={"btn btn-default dropdown-toggle"} 
									style={width100}
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
	popOpenUrl : function () {
		window.open(this.state.url);
	},
	handleUrlSave : function () {
		this.setState({updated: true});
		this.closeModal();
	},
	handleCommentsChange : function(event) {
		this.setState({comments: event.target.value});
	},	
	handleUrlUpdate : function (event) {
		this.setState({ url: event.target.value, updated: true})
	},
	openModal: function() {
	    this.setState({modalIsOpen: true});
	},
	closeModal: function() {
		this.setState({modalIsOpen: false});
	 },
	handleCommentsChange : function(event) {
		this.setState({comments: event.target.value, updated: true});
	},
	handleSectionChange : function(event) {
		this.setState({section: event.target.value, updated: true});
	},
	handleCategorySelection : function(category) {
		this.setState({updated: true, classification: category, classificationId : this.getClassificationId(category)});

	},
	handleSaveClick : function() {

		if ( (this.state.classification === 'Action') || (this.state.classification == undefined)) {
			alert("A subject classification is required");
			return;
		}

		// remove the record so that when we add a new one it has a new key
		this.fb = new Firebase(this.state.rootUrl + this.state.originalClassificationId + '/' + encodeURIComponent(this.state.originalClassification) + '/' + this.state.key);
		this.fb.remove();
		console.log(this.state.rootUrl + this.state.originalClassificationId + '/' + encodeURIComponent(this.state.originalClassification) + '/' + this.state.key);
		console.log(this.state.rootUrl + this.getClassificationId(this.state.classification) + '/' + encodeURIComponent(this.state.classification) + '/');

		// now add as new
		this.fb = new Firebase(this.state.rootUrl + this.getClassificationId(this.state.classification) + '/' + encodeURIComponent(this.state.classification) + '/');

		this.fb.push({
			Use : this.state.use,
			Classification : this.state.classification,
			ClassificationId : this.state.classificationId,
			Comments : this.state.comments,
			Section : this.state.section,
			URL : this.state.url
		});

		this.setState({updated: false});
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
							return (<li onClick={this.handleSelection.bind(this, item.option)}><a href="#">{item.option}</a></li>
					);
				}, this)}
			</ul>
	},
	handleSelection : function (option) {
		this.setState({ open: false} );
		this.setState({ use: option});
		this.setState({ updated: true});
	}
});