var React = require('react');
var Modal = require('react-modal');
var Firebase = require('firebase');
var rootUrl = 'https://sizzling-heat-2682.firebaseio.com/';

module.exports = React.createClass({

	getInitialState: function() {
		return {
			open: false,
			useOpen: false,
			text: "",
			itemSelected: "Select a Category...",
			itemSelectedId: '',
			useSelected: "All",
			modalIsOpen: false,
			newClassification: "",
			newClassificationId: "",
			newSubSection: "",
			newComments: "",
			newURL : ""
		}
	},
	handleClick : function() {
		this.setState({ open: !this.state.open});
	},
	handleClassification : function(event) {
		this.setState({ newClassification : this.findClassification(event.target.value)});
		this.setState({ newClassificationId : event.target.value});
	},
	findClassification(id) {
		var selectedCat;
		this.props.selectionItems.selectValues.map(function(item, i) {
			if (item.itemId === id) {
				console.log(item.option);
				selectedCat = item.option;
			}
		});
		return selectedCat;
	},
	findSelectionById : function(id) {
		var selectText = "";
		this.props.selectionItems.selectValues.map(function(item, i) {
			if (item.itemId === id) {
				selectText = item.option;
			}
		});

		return selectText;
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
	closeModal: function() {
		this.setState({modalIsOpen: false});
	},
	openModal: function() {
	   	this.setState({modalIsOpen: true});
	},
	newSubSection: function(e) {
		this.setState({newSubSection : e.target.value});
	},
	newComments: function(e) {
		this.setState({newComments : e.target.value});
	},
	newURL: function(e) {
		this.setState({newURL : e.target.value});
	},
	handleNewSave : function() {
		fb = new Firebase(this.props.rootUrl + this.state.newClassificationId + '/' + encodeURIComponent(this.state.newClassification)+ "/");
		console.log(this.props.rootUrl + this.state.newClassificationId + '/' + encodeURIComponent(this.state.newClassification)+ "/");

		fb.push({
			Use : "Use",
			Classification : this.state.newClassification,
			Comments : this.state.newComments,
			Section : this.state.newSubSection,
			URL : this.state.newURL
		});
		this.setState({modalIsOpen: false});
		this.props.whenClicked(this.state.newClassification, this.state.newClassificationId);
	},
	render: function () {
		var validationOk = false

		if (this.state.newClassificationId == "" || this.state.newURL == "") {
			validationOk = false;
		} else
			validationOk = true;

		const customStyles = {
		  content : {
		    top                   : '50%',
		    left                  : '50%',
		    right                 : 'auto',
		    bottom                : 'auto',
		    marginRight           : '-50%',
		    transform             : 'translate(-50%, -50%)',
		    backgroundColor		  : 'LightYellow'
		  },
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    zIndex			  : 100,
		    backgroundColor   : 'rgba(255, 255, 255, 0.65)',
		  },
		};
		var style = {
	      'marginLeft': '-15px',
	    };
	    var style2 = {
	    'backgroundColor': 'LightYellow',
	    'textAlign' : 'left'
	    };
	    var smallButtonStyle = {
	    	'width': '55px',
	    	'marginRight' : '10px'
	    };
	   	var medButtonStyle = {
	    	'width': '175px',
	    	'marginRight' : '10px'
	    };
	    var wideInputStyle = {
	    	'width' : '400px'
	    };
		return 	<div className="row" >
				<Modal
		          isOpen={this.state.modalIsOpen}
		          onRequestClose={this.closeModal}
		          style={customStyles} 
		          >
				    <form>
						<div className="form-group" style={wideInputStyle}>
							<label>Classification</label><br></br>
							<select className="form-control" onChange={this.handleClassification}>
								<option/>
								{ this.props.selectionItems.selectValues.map(function(item, i) {
									return <option value={item.itemId}>{item.option}</option>
								}, this)}
							</select>
					    </div>
				        <div className="form-group" style={wideInputStyle}>
				            <label>Sub-Section</label>
				            <input type="text" className="form-control" onChange={this.newSubSection} placeholder="" style={wideInputStyle}/>
				        </div>
				        <div className="form-group" style={wideInputStyle}>
				            <label>Comments</label>
				            <input type="text" className="form-control" placeholder="" style={wideInputStyle} onChange={this.newComments}/>
				        </div>
				        <div className="form-group" onChange={this.newURL} style={wideInputStyle}>
				            <label>URL</label>
				            <input type="text" onChange={this.newURL}  className="form-control" placeholder="" style={wideInputStyle}/>
				        </div>
				        <button type="submit" onClick={this.handleNewSave} className={"btn btn-primary " + (!validationOk ? "disabled" : "")} style={smallButtonStyle}>&nbsp;Save</button>
				        <button type="submit" className="btn btn-danger" style={smallButtonStyle} onClick={this.closeModal}>Cancel</button>
				    </form>

		        </Modal>
			     
				 <div className="col-lg-1" style={style}>
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
				
				<div className="col-lg-1" >
					<div className="input-group">
						<div className="input-group-btn">
							<button type="button" className={"btn btn-default dropdown-toggle " + ((this.state.itemSelected === "Select a Category...") ? "hide"  : "") } 
								onClick={this.handleClick2} style={style2}
								>{this.state.useSelected}<span className="caret"></span>
							</button>
							{this.buildUl2()}
					    </div>
					</div>				
				</div>

				<div className="col-lg-7"/>
				<div className="col-lg-1 shortenMore">
					<button type="button" onClick={this.openModal} className={"btn btn-success " + ( (this.state.itemSelected === "Select a Category...") ? "hide"  : "")}>
						<span>Add New</span>
					</button>
				</div>
				<div className="col-lg-1 shorten"/>
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