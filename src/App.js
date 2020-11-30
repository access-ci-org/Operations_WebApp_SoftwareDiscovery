import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Resourcedetails from "./resourcedetails";

class App_resources extends Component {
  render() {
    return <Resourcedetails resources={this.state.resources} />;
  }

  state = {
    resources: []
  };

  loadData = (resourceID) => {
    fetch(
      `https://info.xsede.org/wh1/resource-api/v3/resource/id/${resourceID}/`
    )
      .then((r) => r.json())
      .then((data) => this.setState({ resources: data.results }));
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.loadData(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.resources !== this.state.resources) {
      this.loadData(this.props.match.params.id);
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: [],
      aggregations: [],
      total: "0"
    };
  }

  async componentDidMount() {
    const url =
      "https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?format=json&aggregations=type,affiliation,resourcegroup";

    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      result: data.results,
      aggregations: data.aggregations,
      loading: false,
      total: data.total_results
    });
  }

  render() {
    const { loading, result, aggregations, total } = this.state;
    if (loading)
      return (
        <div>
          <center>Loading...</center>
        </div>
      );

    return (
      <Router>
        <React.Fragment>
          <Container fluid>
            <div class="App" className="page">
              <h1>Resource Discovery</h1>
              <input type="text" />
              <button onClick={() => this.componentDidMount()}>Search</button>
              <button onClick={this.DecreaseItem}>Prev Page</button>
              <button onClick={this.IncrementItem}>Next Page</button>
              <Row>
                <Col xs={2}>
                  <div class="terms">
                    <b>
                      <u>Affiliation</u>
                    </b>{" "}
                    <br />
                    Any: {total} <br />
                    {aggregations.Affiliation.map((affiliation) => (
                      <div key={aggregations.Affiliation.Name}>
                        {affiliation.Name}
                        {": \n"}
                        {affiliation.count}
                      </div>
                    ))}
                    <b>
                      <u>Resource Group</u>
                    </b>{" "}
                    <br />
                    {aggregations.ResourceGroup.map((ResourceGroup) => (
                      <div key={aggregations.ResourceGroup.Name}>
                        {ResourceGroup.Name}
                        {": \n"}
                        {ResourceGroup.count}
                      </div>
                    ))}
                    <b>
                      <u>Type</u>
                    </b>{" "}
                    <br />
                    {aggregations.Type.map((Type) => (
                      <div key={aggregations.Type.Name}>
                        {Type.Name}
                        {": \n"}
                        {Type.count}
                      </div>
                    ))}
                  </div>
                </Col>
                <Col xs={10}>
                  <div className="results">
                    {result.map((resource) => (
                      <div key={resource.ID}>
                        <article className="result">
                          <h3>{resource.Type}</h3>
                          <h2>
                            Name:{" "}
                            <Link to={`/${resource.ID}`}>{resource.Name}</Link>
                            <Route path="/:id" component={App_resources} />
                          </h2>
                          <br />
                          <div className="details">
                            <u>Description: </u>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: resource.Description
                              }}
                            ></div>
                            <br />
                            <FontAwesomeIcon size="1x" icon={faBuilding} />
                            {"  " + resource.Affiliation + "  "}
                            <FontAwesomeIcon size="1x" icon={faArchive} />
                            {"  " + resource.ResourceGroup + "  "}
                            <FontAwesomeIcon size="1x" icon={faDatabase} />
                            {"  " + resource.Type + "  "}
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
