import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Table from './Table';
import Resourcedetails from './resourcedetails'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'

class App_resources extends Component {

  render() {
    return (
        <Resourcedetails resources={this.state.resources}/>
    )
  }

  state = {
    resources: []
  };

  loadData = resourceID => {
    // console.log('resource=', resourceID)
    fetch(`https://info.xsede.org/wh1/resource-api/v3/resource/id/${resourceID}/`)
        .then(r => r.json())
        .then(data => this.setState({resources: data.results}));

    /*
    const url = `https://info.xsede.org/wh1/resource-api/v3/resource/id//${resourceID}/`;
    const request = async () => {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      this.setState({
        resources: json.results,
      })
    }
    request();
     */
  };

  /*
  fetchdata(account = 1) {
    const url = `http://jsonplaceholder.typicode.com/users/${account}`;
    const request = async () => {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      this.setState({
        contact: json,
      })
    }
    request();
  }
   */

  componentDidMount() {
    const {id} = this.props.match.params;
    // console.log('Resource id======', id);
    this.loadData(id);
  }

  componentDidUpdate(prevProps, prevState) {
    /*
    if (this.props.match.params.id !== prevProps.id) {
      this.loadData(this.props.match.params.id);
    }
     */
    if (prevState.resources !== this.state.resources) {
      this.loadData(this.props.match.params.id);
    }
  }

}

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <h2>Resources</h2>
          <ul>
            <li><Link to="/urn:glue2:ApplicationHandle:module:1.0.psc_path.bridges.psc.xsede.org.61560768618ae9db6cfc12be71436a6e">psc_path</Link></li>
            <li><Link to="/urn:ogf:glue2:info.xsede.org:resource:jetstream.xsede.org:openstack.image:2de46d11-416d-5777-b24c-2702e75e9747">Ubuntu 14.04.3 - Phylogenetics</Link></li>
            <li><Link to="/urn:glue2:ApplicationHandle:module:1.3-2.xdinfo.bridges.psc.xsede.org.748612f3ee4032fe877aaa7d3e0a27ec">xdinfo</Link></li>
          </ul>
            <Route path='/:id' component={App_resources} />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
