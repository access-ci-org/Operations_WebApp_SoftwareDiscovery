import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faRunning } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

function ProviderIDMapping(CurrentProviderID, ProviderArray) {
  for (let i = 0; i < ProviderArray.length; i++) {
    if (CurrentProviderID === ProviderArray[i].ID) {
      return <p>&nbsp;{ProviderArray[i].Name}</p>;
    }
  }
  return <p>&nbsp;No Provider</p>;
}

function TypeMapping(CurrentResourceType) {
  if (CurrentResourceType === "Executable Software") {
    return <FontAwesomeIcon size="1x" icon={faRunning} />;
  } else if (CurrentResourceType === "Online Service") {
    return <FontAwesomeIcon size="1x" icon={faLaptop} />;
  } else if (CurrentResourceType === "Cloud Image") {
    return <FontAwesomeIcon size="1x" icon={faCloud} />;
  } else if (CurrentResourceType === "Vendor Software") {
    return <FontAwesomeIcon size="1x" icon={faUsers} />;
  } else {
    return <FontAwesomeIcon size="1x" icon={faCog} />;
  }
}
function KeyWords(CurrentKeyWords) {
  if (CurrentKeyWords !== "" && CurrentKeyWords !== null) {
    return (
      <React.Fragment>
        <b>&nbsp;KeyWords&nbsp;</b>
        <div className="attributes">{CurrentKeyWords}</div>
        <br />
      </React.Fragment>
    );
  }
  return;
}
function QualityLevel(CurrentQualityLevel) {
  if (CurrentQualityLevel !== "" && CurrentQualityLevel !== null) {
    return (
      <React.Fragment>
        <b>&nbsp;Quality Level&nbsp;</b>
        <div className="attributes">{CurrentQualityLevel}</div>
        <br />
      </React.Fragment>
    );
  }
  return;
}
function Audience(CurrentAudience) {
  if (CurrentAudience !== "" && CurrentAudience !== null) {
    return (
      <React.Fragment>
        <b>&nbsp;Audience&nbsp;</b>
        <div className="attributes">{CurrentAudience}</div>
        <br />
      </React.Fragment>
    );
  }
  return;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualTrue: false,
      loading: true,
      result: [],
      aggregations: [],
      searchTerm: "",
      searchField: "",
      total: 0,
      resourceID: "",
      affiliation: "",
      resourceGroup: "",
      type: "",
      provider: "",
      activePage: 1,
      checkedName: true,
      checkedDescription: true,
      checkedTopics: true,
      checkedKeywords: true,
      searchTime: 0
    };
  }

  handleCheckbox = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleSearchButton = () => {
    this.setState({
      activePage: 1
    });
    this.componentDidMount();
  };

  handlePageChange(activePage) {
    //console.log(`active page is ${pageNumber - 1}`);
    this.setState({
      activePage: activePage,
      searchTerm: ""
    });
  }

  BackPage = () => {
    console.log("back page");
    this.setState({ individualTrue: false });
  };

  handleClick = () => {
    console.log("reset");
    this.setState({
      individualTrue: false,
      searchTerm: "",
      searchField: "",
      resourceID: "",
      affiliation: "",
      resourceGroup: "",
      type: "",
      provider: "",
      activePage: 1,
      checkedName: true,
      checkedDescription: true,
      checkedTopics: true,
      checkedKeywords: true
    });
    this.componentDidMount();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.individualTrue !== this.state.individualTrue ||
      //prevState.activePage !== this.state.activePage ||
      prevState.affiliation !== this.state.affiliation ||
      prevState.resourceGroup !== this.state.resourceGroup ||
      prevState.type !== this.state.type ||
      prevState.provider !== this.state.provider
    ) {
      this.setState({
        activePage: 1
      });
      this.componentDidMount();
    } else if (prevState.activePage !== this.state.activePage) {
      this.componentDidMount();
    }
  }

  async componentDidMount() {
    console.log("didmount called....");
    console.log("individualTrue = ", this.state.individualTrue);
    //https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?resource_groups=Software&page=1
    //https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?resource_groups=Software&page=1&format=json
    if (this.state.individualTrue === false) {
      this.state.searchField = "";
      if (this.state.checkedName === true) {
        this.state.searchField = this.state.searchField + "Name,";
      }
      if (this.state.checkedDescription === true) {
        this.state.searchField =
          this.state.searchField + "ShortDescription,Description,";
      }
      if (this.state.checkedTopics === true) {
        this.state.searchField = this.state.searchField + "Topics,";
      }
      if (this.state.checkedKeywords === true) {
        this.state.searchField = this.state.searchField + "Keywords,";
      }
      if (
        this.state.checkedName === false &&
        this.state.checkedDescription === false &&
        this.state.checkedTopics === false &&
        this.state.checkedKeywords === false
      ) {
        this.state.checkedName = true;
        this.state.checkedDescription = true;
        this.state.checkedTopics = true;
        this.state.checkedKeywords = true;
      }
      console.log(this.state.searchField);
      //this.state.pageNumber = this.state.activePage - 1;
      const url =
        "https://operations-api.access-ci.org/wh2/resource/v4/resource_esearch/?format=json&aggregations=type,affiliation,resourcegroup,providerid&search_terms="+
        // "https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?format=json&aggregations=type,affiliation,resourcegroup,providerid&search_terms=" +
        this.state.searchTerm +
        "&page=" +
        this.state.activePage +
        "&affiliations=" +
        this.state.affiliation +
        "&resource_groups=" +
        this.state.resourceGroup +
        "&types=" +
        this.state.type +
        "&providers=" +
        this.state.provider +
        "&search_fields=" +
        this.state.searchField;
      //const url = "https://info.xsede.org/wh1/resource-api/v3/resource_esearch/?format=json&aggregations=type,affiliation,resourcegroup&search_terms="

      console.log(this.state.searchTerm);
      console.log(url);
      var currentTimeInMillisecondsBefore = Date.now();
      const response = await fetch(url);
      const data = await response.json();
      var currentTimeInMillisecondsAfter = Date.now();
      //this.state.searchTime = currentTimeInMillisecondsAfter - currentTimeInMillisecondsBefore;

      let stateFromSettings = {}
      if (window.SETTINGS.resourceGroup) {
        data.aggregations.ResourceGroup = data.aggregations.ResourceGroup
                            .filter(({Name}) => Name === window.SETTINGS.resourceGroup);

        stateFromSettings["resourceGroup"] = window.SETTINGS.resourceGroup;
      }

      if (window.SETTINGS.affiliation) {
        data.aggregations.Affiliation = data.aggregations.Affiliation
                            .filter(({Name}) => Name === window.SETTINGS.affiliation);

        stateFromSettings["affiliation"] = window.SETTINGS.affiliation;
      }

      this.setState({
        searchTime:
          currentTimeInMillisecondsAfter - currentTimeInMillisecondsBefore,
        result: data.results,
        aggregations: data.aggregations,
        total: data.count,
        loading: false,
        resourceGroup: "Software",
        ...stateFromSettings
      });
    } else if (this.state.individualTrue === true) {
      // const { id } = this.props.id;
      // const {id} = this.props.match.params;
      // console.log('properties = ', this.props);
      // console.log('id = ', id);
      const r_id = this.state.resourceID; // window.location.pathname;
      const url =
        "https://operations-api.access-ci.org/wh2/resource/v4/resource/id/" +
        // "https://info.xsede.org/wh1/resource-api/v3/resource/id/" +
        r_id +
        "/?format=json";

      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        result: data.results,
        loading: false
      });
    }
  }

  getTitle() {
    if (window.SETTINGS.title) {
        return window.SETTINGS.title
    } else {
        return "Resource Tools and Services Discovery"
    }
  }

  render() {
    const { loading, result, aggregations, total, individualTrue } = this.state;
    if (loading) {
      return (
        <div>
          <center>Loading...</center>
        </div>
      );
    }

    if (individualTrue === false) {
      return (
        <Router>
          <React.Fragment>
            <Container fluid>
              <div className="page">
                <h1 className="title">{this.getTitle()}</h1>
                <Row>
                  <Col xs={{ span: 8, offset: 4 }} lg={{ span: 10, offset: 2 }}>
                    <div className="input-box">
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.searchTerm}
                        onChange={this.handleSearchTerm}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleSearchButton()}
                      >
                        <FontAwesomeIcon size="1x" icon={faSearch} />
                      </button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 8, offset: 4 }} lg={{ span: 10, offset: 2 }}>
                    <b className="textCSS">
                      Search Fields (at least one required): &nbsp;
                    </b>
                    <div className="noNewLine">
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedName}
                              onChange={this.handleCheckbox("checkedName")}
                              value="checkedName"
                              color="primary"
                            />
                          }
                          label="Name"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedDescription}
                              onChange={this.handleCheckbox(
                                "checkedDescription"
                              )}
                              value="checkedDescription"
                              color="primary"
                            />
                          }
                          label="Description"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedTopics}
                              onChange={this.handleCheckbox("checkedTopics")}
                              value="checkedTopics"
                              color="primary"
                            />
                          }
                          label="Topics"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedKeywords}
                              onChange={this.handleCheckbox("checkedKeywords")}
                              value="checkedKeywords"
                              color="primary"
                            />
                          }
                          label="Keywords"
                        />
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 8, offset: 4 }} lg={{ span: 10, offset: 2 }}>
                    {this.state.activePage * 25 <= total && (
                      <div>
                        <b className="textCSS">
                          Viewing: {(this.state.activePage - 1) * 25 + 1} -{" "}
                          {this.state.activePage * 25} of {total}{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp; Click on a title to view item
                          details.
                        </b>
                      </div>
                    )}
                    {this.state.activePage * 25 > total && (
                      <div>
                        <b className="textCSS">
                          Viewing: {(this.state.activePage - 1) * 25 + 1} -{" "}
                          {total} of {total} &nbsp;&nbsp;&nbsp;&nbsp; Click on a
                          title to view item details.
                        </b>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs="4" lg="2">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => this.handleClick()}
                    >
                      <FontAwesomeIcon size="1x" icon={faWindowRestore} />
                      &nbsp;&nbsp;Reset
                    </button>
                    <br />
                    <div className="terms">
                      {aggregations.Affiliation && aggregations.Affiliation.length > 1 ?

                        <>
                          <b className="selectionHeader">
                          By Affiliation:</b> <br />
                          {aggregations.Affiliation.map((affiliation, affiliationIndex) => (
                        <div
                          className="selectionDetails"
                          key={affiliationIndex}
                        >
                          <Link
                            to={this.props}
                            onClick={() =>
                              this.setState({
                                affiliation: affiliation.Name
                              })
                            }
                          >
                            <FontAwesomeIcon size="1x" icon={faCog} />{" "}
                            {affiliation.Name}
                          </Link>
                          {" (" + affiliation.count + ")"}
                        </div>
                      ))}
                        </>: null
                      }

                      {aggregations.ResourceGroup && aggregations.ResourceGroup.length > 1 ?

                        <>
                          <b className="selectionHeader">By Resource Group:</b>{" "}
                          <br />
                          {aggregations.ResourceGroup.map((ResourceGroup, ResourceGroupIndex) => (
                            <div
                              className="selectionDetails"
                              key={ResourceGroupIndex}
                            >
                              <Link
                                to={this.props}
                                onClick={() =>
                                  this.setState({
                                    resourceGroup: ResourceGroup.Name
                                  })
                                }
                              >
                                <FontAwesomeIcon size="1x" icon={faCog} />{" "}
                                {ResourceGroup.Name}
                              </Link>
                              {" (" + ResourceGroup.count + ")"}
                              <br />
                            </div>
                          ))}
                        </>: null
                      }

                      <b className="selectionHeader">By Type:</b> <br />
                      {aggregations.Type.map((Type, TypeIndex) => (
                        <div
                          className="selectionDetails"
                          key={TypeIndex}
                        >
                          <Link
                            to={this.props}
                            onClick={() =>
                              this.setState({
                                type: Type.Name
                              })
                            }
                          >
                            {TypeMapping(Type.Name)}
                            {" " + Type.Name}
                          </Link>
                          {" (" + Type.count + ")"}
                          <br />
                        </div>
                      ))}
                      <b className="selectionHeader">By Provider:</b> <br />
                      {aggregations.ProviderID.map((Provider, ProviderIndex) => (
                        <div
                          className="selectionDetails"
                          key={ProviderIndex}
                        >
                          <Link
                            to={this.props}
                            onClick={() =>
                              this.setState({
                                provider: Provider.ID
                              })
                            }
                          >
                            <FontAwesomeIcon size="1x" icon={faCog} />{" "}
                            {Provider.Name}
                          </Link>
                          {" (" + Provider.count + ")"}
                          <br />
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col xs="8" lg="10">
                    <div className="results">
                      {result.map((resource, resourceIndex) => (
                        <div key={resourceIndex}>
                          <article className="result">
                            {/*<h3>{resource.Affiliation}</h3>*/}
                            <h2>
                              <Link
                                to={this.props}
                                onClick={() =>
                                  this.setState({
                                    resourceID: resource.ID,
                                    individualTrue: true
                                  })
                                }
                              >
                                {resource.ShortDescription}
                              </Link>
                            </h2>
                            <div className="details">
                              <div className="smallDetails">
                                {TypeMapping(resource.Type)}
                                {"  " +
                                  resource.Type +
//                                  "; Affiliation: " +
//                                  resource.Affiliation +
                                  " "
                                  }
                                <div className="noNewLine">
                                  <FontAwesomeIcon size="1x" icon={faCog} />
                                  <div className="noNewLine">
                                    {ProviderIDMapping(
                                      resource.ProviderID,
                                      aggregations.ProviderID
                                    )}
                                  </div>
                                </div>
                              </div>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: resource.Description
                                }}
                              ></p>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 8, offset: 4 }} lg={{ span: 10, offset: 2 }}>
                    <Pagination
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={this.state.activePage}
                      itemsCountPerPage={25}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      hideFirstLastPages={true}
                      onChange={this.handlePageChange.bind(this)}
                    />
                    <b className="textCSS">
                      Query Took: {this.state.searchTime}ms
                    </b>
                  </Col>
                </Row>
              </div>
            </Container>
          </React.Fragment>
        </Router>
      );
    }
    if (individualTrue === true) {
      return (
        <Container fluid>
          <div className="page">
            <h1 className="title">{this.getTitle()}</h1>
            <button className="btn btn-primary" onClick={this.BackPage}>
              <FontAwesomeIcon size="1x" icon={faArrowLeft} />
            </button>
            <Row>
              <Col xs={10}>
                <div className="results">
                  {result.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="article">
                      <article className="result">
                        <div className="individualh1">
                          <b>{resource.ShortDescription}</b>
                        </div>
                        <br />
                        <div className="details">
                          <b>Description:</b>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: resource.Description
                            }}
                          ></div>
                          <br />
                          <h1>{resource.ResourceGroup} Type:&nbsp;</h1>
                          <h2> {" " + resource.Type}</h2>
                          <br />
                          <h1>Attributes</h1>
                          <br />
                          {KeyWords(resource.Keywords)}
                          {QualityLevel(resource.QualityLevel)}
                          {Audience(resource.Affiliation)}
                          <br />
                          <h1>Relations</h1>
                          <br />
                          {resource.Relations &&
                            resource.Relations.map((resource, resourceIndex) => (
                              <div key={resourceIndex}>
                                <b>&nbsp;{resource.RelationType}&nbsp;</b>
                                {resource.ShortDescription}
                              </div>
                            ))}
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      );
    }
  }
}
export default App;
