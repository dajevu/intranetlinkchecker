var React = require('react');
var ReactDOM = require('react-dom')
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://sizzling-heat-2682.firebaseio.com/';
var Header = require('./header');
var List = require('./list');
var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
  	return {
  		items: {}, 
  		loaded: false, 
      use: "All",
      categoryId : "",
      category: "", 
      rootUrl: rootUrl
  	}
  },
  getDefaultProps: function() {
      return {
        "useValues":
          {
            "useNotUse":
              [
                { "option" : "Use"},
                { "option" : "Do Not Use"},
                { "option" : "All"}
              ]
          },
        "selectValues":
          [
            { "option" : "Care", "itemId" : "14"},
            { "option" : "Development", "itemId" : "8"},
            { "option" : "Directory", "itemId" : "9"},
            { "option" : "Facilities", "itemId" : "5"},
            { "option" : "Help Desk", "itemId" : "1"},
            { "option" : "Home", "itemId" : "4"},
            { "option" : "How to Guides", "itemId" : "3"},
            { "option" : "Human Resources", "itemId" : "13"},
            { "option" : "Implementation", "itemId" : "7"},
            { "option" : "Information Technology", "itemId" : "11"},
            { "option" : "International", "itemId" : "12"},
            { "option" : "Marketing", "itemId" : "0"},
            { "option" : "Operations", "itemId" : "10"},
            { "option" : "Pricing", "itemId" : "6"},
            { "option" : "Tools", "itemId" : "2"}
          ]
      }
    },
  componentWillMount: function() {

  },
  handleSelection : function(option, optionId, filter) {
    
    this.setState({loaded: false});

    this.setState({category : option, categoryId: optionId});

    fb = new Firebase(rootUrl + optionId + '/' + encodeURIComponent(option) + '/');
    if (filter === "All" || filter === undefined)
      filter = '';
    this.bindAsObject(fb.orderByChild("Use").equalTo(encodeURIComponent(filter)), 'items'); 
    
    fb.once('value', this.handleDataLoaded);

  },
  render: function() {
    return  <div>
        			<div className="row" >
    		    		<div className="col-lg-12">
    		    			<h2 className="text-center">Intranet Manager</h2>
    		    		</div>
    		    	</div>
  	    			<Header itemsStore={this.firebaseRefs.items} whenClicked={this.handleSelection} selectionItems={this.props} />
              <div className="row">
    	    			<div className={"content " + (this.state.loaded ? 'loaded' : '')}>
    	    				<List rootUrl={this.state.rootUrl} category={this.state.category} categoryId={this.state.categoryId} items={this.state.items} selectionItems={this.props} itemsStore={this.firebase}/>
    	    			</div>
              </div>
    		</div>
  },
  handleDataLoaded: function() {
    console.log("data loaded");
  	this.setState({loaded: true});
  },
  componentWillUnmount: function() {
    this.firebaseRefs.off();
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.mycontainer'));
