/** @jsx React.DOM */
var ElmtNavigation = React.createClass({displayName: "ElmtNavigation",
    onClick: function() {
        this.props.elmtSelectionne(this.props.elmt);
    },
    render: function() {
        return (
            React.createElement("li", {onClick: this.onClick}, 
                this.props.elmt.data.display_name
            )
        );
    }
});
var MenuNavigation = React.createClass({displayName: "MenuNavigation",
    setSelectedItem: function(elmt) {
        this.props.elmtSelectionne(elmt);
    },
    render: function() {
        var _this = this;
        var elmts = this.props.elmts.map(function(elmt) {
            return (
                React.createElement(ElmtNavigation, {key: elmt.data.id, 
                    elmt: elmt, elmtSelectionne: _this.setSelectedItem, 
                    selected: elmt.data.url})
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
var ListeSignets = React.createClass({displayName: "ListeSignets",
    render: function() {
        var ListeSignets = this.props.elmts.map(function(elmt) {
            return (
                React.createElement("tr", null, 
                    React.createElement("td", null, 
                        React.createElement("p", {className: "score"}, elmt.data.score)
                    ), 
                    React.createElement("td", null, 
                        React.createElement("p", {className: "titre"}, 
                            React.createElement("a", {href: elmt.data.url}, 
                                elmt.data.title
                            )
                        ), 
                        React.createElement("p", {className: "auteur"}, 
                            "Posté par ", React.createElement("b", null, elmt.data.author)
                        )
                    )
                )
            );
        });
        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                    ListeSignets
                )
            )
        );
    }
});
var Application = React.createClass({displayName: "Application",
    componentDidMount: function() {
        var _this = this;
        var nomfct = "fn" ;
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
                    elmts: this.state.ElmtNavigations, 
                    elmtSelectionne: this.setSelectedItem}), 
                React.createElement(ListeSignets, {elmts: this.state.ElmtsSignet})
            )
        );
    },
    setSelectedItem: function(elmt) {
        var _this = this;
        var nomfct = "fn" + Date.now();
        var script = document.createElement("script");
        script.src = "http://www.reddit.com/" + elmt.data.url + ".json?sort=top&t=month&jsonp=" + nomfct;
        window[nomfct] = function(jsonData) {
            _this.setState({ElmtsSignet: jsonData.data.children});
            delete window[nomfct];
        };
        
        document.head.appendChild(script);
        this.setState({
            titre: elmt.data.display_name
        });
    }
});
React.renderComponent(React.createElement(Application, null),document.body);