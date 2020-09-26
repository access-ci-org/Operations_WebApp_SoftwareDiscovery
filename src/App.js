import React, { Component } from "react";
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
      loading: true,
      result: [],
      aggregations: [],
      searchTerm: ""
    };
  }

  handleSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  async componentDidMount() {
    //https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?resource_groups=Software&page=1
    //https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?resource_groups=Software&page=1&format=json
    const url =
      "https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?format=json&aggregations=type,affiliation,resourcegroup&search_terms=" +
      this.state.searchTerm;

    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      result: data.results,
      aggregations: data.aggregations,
      total: data.total_results,
      loading: false
    });
  }

  render() {
    const { loading, result, aggregations, total } = this.state;
    if (loading) return <div>Loading...</div>;

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
              <Row>
                <Col xs={2}>
                  <b>Affiliation</b> <br />
                  Any: {total} <br />
                  {aggregations.Affiliation[0].Name}:{" "}
                  {aggregations.Affiliation[0].count} <br />
                  {aggregations.Affiliation[1].Name}:{" "}
                  {aggregations.Affiliation[1].count} <br />
                  <b>Resource Group</b> <br />
                  {aggregations.ResourceGroup[0].Name}:{" "}
                  {aggregations.ResourceGroup[0].count} <br />
                  {aggregations.ResourceGroup[1].Name}:{" "}
                  {aggregations.ResourceGroup[1].count} <br />
                  {aggregations.ResourceGroup[2].Name}:{" "}
                  {aggregations.ResourceGroup[2].count} <br />
                  {aggregations.ResourceGroup[3].Name}:{" "}
                  {aggregations.ResourceGroup[3].count} <br />
                  {aggregations.ResourceGroup[4].Name}:{" "}
                  {aggregations.ResourceGroup[4].count} <br />
                  {aggregations.ResourceGroup[5].Name}:{" "}
                  {aggregations.ResourceGroup[5].count} <br />
                  {aggregations.ResourceGroup[6].Name}:{" "}
                  {aggregations.ResourceGroup[6].count} <br />
                  <b>Type</b> <br />
                  {aggregations.Type[0].Name}: {aggregations.Type[0].count}{" "}
                  <br />
                  {aggregations.Type[1].Name}: {aggregations.Type[1].count}{" "}
                  <br />
                  {aggregations.Type[2].Name}: {aggregations.Type[2].count}{" "}
                  <br />
                  {aggregations.Type[3].Name}: {aggregations.Type[3].count}{" "}
                  <br />
                  {aggregations.Type[4].Name}: {aggregations.Type[4].count}{" "}
                  <br />
                  {aggregations.Type[5].Name}: {aggregations.Type[5].count}{" "}
                  <br />
                  {aggregations.Type[6].Name}: {aggregations.Type[6].count}{" "}
                  <br />
                  {aggregations.Type[7].Name}: {aggregations.Type[7].count}{" "}
                  <br />
                  {aggregations.Type[8].Name}: {aggregations.Type[8].count}{" "}
                  <br />
                  {aggregations.Type[9].Name}: {aggregations.Type[9].count}{" "}
                  <br />
                </Col>
                <Col xs={10}>
                  {result.map((resource) => (
                    <div key={resource.ID} class="article">
                      <article class="article">
                        Name: {resource.Name}
                        <br />
                        Description: {resource.Description}
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
    );
  }
}

export default App;
