/** @jsx React.DOM */
var ElmtNavigation = React.createClass({displayName: "ElmtNavigation",

    render: function() {
        return (
            React.createElement("li", null, 
                this.props.elmt.data.display_name
            )
        );
    }
});

var MenuNavigation = React.createClass({displayName: "MenuNavigation",
  
    render: function() {
        var _this = this;

        var elmts = this.props.elmts.map(function(elmt) {
            return (
                React.createElement(ElmtNavigation, {key: elmt.data.id, 
                    elmt: elmt})
            );
        });

        return (
            React.createElement("div", {className: "navigation"}, 
                React.createElement("div", {className: "header"}, "Navigation"), 
                React.createElement("ul", null, 
                    elmts
                )
            )
        );
    }

});

var Application = React.createClass({displayName: "Application",
    componentDidMount: function() {
        var _this = this;
        var nomfct = "fn";
        var script = document.createElement("script");
        script.src = "http://www.reddit.com/reddits.json?jsonp=" + nomfct;

        window[nomfct] = function(jsonData) {
            _this.setState({
                ElmtNavigations: jsonData.data.children
            });
            delete window[nomfct];
        };

        document.head.appendChild(script);
    },
    getInitialState: function() {
        return ({
            ElmtNavigations: [],
            ElmtsSignet: [],
            titre: "Choisissez une rubrique"
        });
    },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, this.state.titre), 
                React.createElement(MenuNavigation, {
                    elmts: this.state.ElmtNavigations})
            )
        );
    }
});

React.renderComponent(React.createElement(Application, null),document.body);