/** @jsx React.DOM */
var ElmtNavigation = React.createClass({
    onClick: function() {
        this.props.elmtSelectionne(this.props.elmt);
    },
    render: function() {
        return (
            <li onClick={this.onClick}>
                {this.props.elmt.data.display_name}
            </li>
        );
    }
});
var MenuNavigation = React.createClass({
    setSelectedItem: function(elmt) {
        this.props.elmtSelectionne(elmt);
    },
    render: function() {
        var _this = this;
        var elmts = this.props.elmts.map(function(elmt) {
            return (
                <ElmtNavigation key={elmt.data.id}
                    elmt={elmt} elmtSelectionne={_this.setSelectedItem}
                    selected={elmt.data.url} />
            );
        });
        return (
            <div className="navigation">
                <div className="header">Navigation</div>
                <ul>
                    {elmts}
                </ul>
            </div>
        );
    }
});
var ListeSignets = React.createClass({
    render: function() {
        var ListeSignets = this.props.elmts.map(function(elmt) {
            return (
                <tr>
                    <td>
                        <p className="score">{elmt.data.score}</p>
                    </td>
                    <td>
                        <p className="titre">
                            <a href={elmt.data.url}>
                                {elmt.data.title}
                            </a>
                        </p>
                        <p className="auteur">
                            Posté par <b>{elmt.data.author}</b>
                        </p>
                    </td>
                </tr>
            );
        });
        return (
            <table>
                <tbody>
                    {ListeSignets}
                </tbody>
            </table>
        );
    }
});
var Application = React.createClass({
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
            <div>
                <h1>{this.state.titre}</h1>
                <MenuNavigation     
                    elmts={this.state.ElmtNavigations}
                    elmtSelectionne={this.setSelectedItem} />
                <ListeSignets elmts={this.state.ElmtsSignet} />
            </div>
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
React.renderComponent(<Application />,document.body);