import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualTrue: false,
      loading: true,
      result: [],
      aggregations: [],
      searchTerm: "",
      pageNumber: 0,
      individualID: "",
      affiliations: "",
      resourceGroup: "",
      type: ""
    };
  }

  handleSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value,
      pageNumber: 0
    });
  };

  IncrementItem = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    console.log(this.state.pageNumber);
    this.componentDidMount();
  };

  DecreaseItem = () => {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
    console.log(this.state.pageNumber);
    this.componentDidMount();
  };

  SingleItem = () => {
    this.setState({ individualTrue: true });
    console.log("Hi");
    console.log(this.props);
    this.componentDidMount();
  };

  async componentDidMount() {
    //https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?resource_groups=Software&page=1
    //https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?resource_groups=Software&page=1&format=json
    if (this.state.individualTrue === false) {
      const url =
        "https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?format=json&aggregations=type,affiliation,resourcegroup&search_terms=" +
        this.state.searchTerm +
        "&page=" +
        this.state.pageNumber;

      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        result: data.results,
        aggregations: data.aggregations,
        total: data.total_results,
        loading: false
      });
    } else if (this.state.individualTrue === true) {
      //const { id } = this.props.id;
      console.log(this.props);
      const url =
        "https://info.xsede.org/wh1/resource-api/v3/resource/id/" +
        //{id} +
        "urn:ogf:glue2:uiuc.edu:resource:89616" +
        //this.state.individualID +
        "/?format=json";

      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        result: data.results,
        loading: false
      });
    }
  }

  render() {
    const { loading, result, aggregations, total, individualTrue } = this.state;
    if (loading)
      return (
        <div>
          <center>Loading...</center>
        </div>
      );

    if (individualTrue === false) {
      return (
        <Router>
          <React.Fragment>
            <Container fluid>
              <div class="App" className="page">
                <div className="archive">
                  <ul>
                    <h1>Resource List</h1>
                    <input
                      type="text"
                      value={this.state.searchTerm}
                      onChange={this.handleSearchTerm}
                    />
                    <button onClick={() => this.componentDidMount()}>
                      Search
                    </button>
                    <button onClick={this.DecreaseItem}>Prev Page</button>
                    <button onClick={this.IncrementItem}>Next Page</button>
                    <Row>
                      <Col xs={2}>
                        <b>Affiliation</b> <br />
                        Any: {total} <br />
                        {aggregations.Affiliation.map((affiliation) => (
                          <div>
                            {affiliation.Name}
                            {": \n"}
                            {affiliation.count}
                          </div>
                        ))}
                        <b>Resource Group</b> <br />
                        {aggregations.ResourceGroup.map((ResourceGroup) => (
                          <div>
                            {ResourceGroup.Name}
                            {": \n"}
                            {ResourceGroup.count}
                          </div>
                        ))}
                        <b>Type</b> <br />
                        {aggregations.Type.map((Type) => (
                          <div>
                            {Type.Name}
                            {": \n"}
                            {Type.count}
                          </div>
                        ))}
                      </Col>
                      <Col xs={10}>
                        {result.map((resource) => (
                          <div key={resource.ID} class="article">
                            <article class="article">
                              Name:{" "}
                              <button class="link" onClick={this.SingleItem}>
                                <Link to={"/" + resource.ID}>
                                  {resource.Name}
                                </Link>
                              </button>
                              <Route path="/:id" />
                              <br />
                              Description:{" "}
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
                            </article>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </ul>
                </div>
              </div>
            </Container>
          </React.Fragment>
        </Router>
      );
    }
    if (individualTrue === true) {
      return (
        <Container fluid>
          <div class="App" className="page">
            <div className="archive">
              <ul>
                <h1>Resource List</h1>
                <input
                  type="text"
                  value={this.state.searchTerm}
                  onChange={this.handleSearchTerm}
                />
                <button onClick={() => this.componentDidMount()}>Search</button>
                <button onClick={this.DecreaseItem}>Prev Page</button>
                <button onClick={this.IncrementItem}>Next Page</button>
                <Row>
                  <Col xs={10}>
                    {result.map((resource) => (
                      <div key={resource.ID} class="article">
                        <article class="article">
                          <b>{resource.Name}</b>
                          <br />
                          Affiliation: {resource.Affiliation}
                          <br />
                          Resource Group: {resource.ResourceGroup}
                          <br />
                          Type: {resource.Type}
                          <br />
                          Description:
                          <div
                            dangerouslySetInnerHTML={{
                              __html: resource.Description
                            }}
                          ></div>
                          <br />
                          <br />
                          {resource.Relations &&
                            resource.Relations.map((resource) => (
                              <div>
                                {resource.RelationType} {resource.Name}
                              </div>
                            ))}
                        </article>
                      </div>
                    ))}
                  </Col>
                </Row>
              </ul>
            </div>
          </div>
        </Container>
      );
    }
  }
}

export default App;
