import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./scss/style.scss";
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
import Pagination from "react-js-pagination";

function ProviderIDMapping(CurrentProviderID, ProviderArray) {
  for (let i = 0; i < ProviderArray.length; i++) {
    if (CurrentProviderID === ProviderArray[i].ID) {
      return <span>&nbsp;{ProviderArray[i].Name}</span>;
    }
  }
  return <span>&nbsp;No Provider</span>;
}

function TypeMapping(CurrentResourceType) {
  if (CurrentResourceType === "Executable Software") {
    return <FontAwesomeIcon size="sm" icon={faRunning} />;
  } else if (CurrentResourceType === "Online Service") {
    return <FontAwesomeIcon size="sm" icon={faLaptop} />;
  } else if (CurrentResourceType === "Cloud Image") {
    return <FontAwesomeIcon size="sm" icon={faCloud} />;
  } else if (CurrentResourceType === "Vendor Software") {
    return <FontAwesomeIcon size="sm" icon={faUsers} />;
  } else {
    return <FontAwesomeIcon size="sm" icon={faCog} />;
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
        <b>Quality Level : </b>
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
        <b>Audience : </b>
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
      affiliation: window.SETTINGS.affiliation,
      resourceGroup: window.SETTINGS.resourceGroup,
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
              <div className="w-100">
                <h1>{this.getTitle()}</h1>
                <div className=" w-100 d-flex flex-row">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.handleSearchTerm}
                  />
                  <button
                    className="btn btn-primary ml-1 pt-0 pb-0"
                    onClick={() => this.handleSearchButton()}
                  >
                    <FontAwesomeIcon size="xs" icon={faSearch} />
                  </button>
                </div>
                <div className="w-100 d-flex flex-row">
                    <b className="pl-0 pr-2 pt-2 pb-2">
                      Search Fields (at least one required):
                    </b>
                    <div className="d-flex flex-row">
                      <div className="form-check m-2">
                        <input className="form-check-input bg-dark" type="checkbox" checked={this.state.checkedName}
                              onChange={this.handleCheckbox("checkedName")}
                              value="checkedName" id="checkedName" />
                        <label className="form-check-label" htmlFor="checkedName">
                          Name
                        </label>
                      </div>

                      <div className="form-check m-2">
                        <input className="form-check-input bg-dark" type="checkbox" checked={this.state.checkedDescription}
                              onChange={this.handleCheckbox("checkedDescription")} id="checkedDescription" />
                        <label className="form-check-label" htmlFor="checkedDescription">
                          Description
                        </label>
                      </div>

                      <div className="form-check m-2">
                        <input className="form-check-input bg-dark" type="checkbox" checked={this.state.checkedTopics}
                              onChange={this.handleCheckbox("checkedTopics")} id="checkedTopics" />
                        <label className="form-check-label" htmlFor="checkedTopics">
                          Topics
                        </label>
                      </div>


                      <div className="form-check m-2">
                        <input className="form-check-input bg-dark" type="checkbox" checked={this.state.checkedKeywords}
                              onChange={this.handleCheckbox("checkedKeywords")} id="checkedKeywords" />
                        <label className="form-check-label" htmlFor="checkedKeywords">
                          Keywords
                        </label>
                      </div>

                    </div>
                </div>
                <div className="w-100">
                  {this.state.activePage * 25 <= total && (
                      <small>
                        Viewing: {(this.state.activePage - 1) * 25 + 1} -{" "}
                        {this.state.activePage * 25} of {total}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp; Click on a title to view item
                        details.
                      </small>
                    )}
                    {this.state.activePage * 25 > total && (
                      <small>
                        Viewing: {(this.state.activePage - 1) * 25 + 1} -{" "}
                        {total} of {total} &nbsp;&nbsp;&nbsp;&nbsp; Click on a
                        title to view item details.
                      </small>
                    )}
                </div>

                <div className="row mt-3">
                  <div className="col-lg-3 col-sm-12">
                    <button
                      className="btn btn-outline-secondary w-100"
                      type="button"
                      onClick={() => this.handleClick()}
                    >
                      <FontAwesomeIcon className="mr-3" size="1x" icon={faWindowRestore} />
                      Reset Filters
                    </button>
                    <br />
                    <ul className="w-100 list-unstyled">
                      {aggregations.Affiliation && aggregations.Affiliation.length > 1 ?

                        <li>
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
                        </li>: null
                      }

                      {aggregations.ResourceGroup && aggregations.ResourceGroup.length > 1 ?

                        <li>
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
                        </li>: null
                      }

                      {aggregations.ResourceGroup && aggregations.ResourceGroup.length > 1 ?
                        <li>
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
                        </li> : null
                      }

                      <li>
                        <small>By Provider:</small>
                        <ul className="list-unstyled">
                          {aggregations.ProviderID.map((Provider, ProviderIndex) => (
                          <li key={ProviderIndex}>
                            <Link
                              to={this.props}
                              className="btn btn-link"
                              onClick={() =>
                                this.setState({
                                  provider: Provider.ID
                                })
                              }
                            >
                              {/*<FontAwesomeIcon size="sm" icon={faCog} />{" "}*/}
                              <small>{Provider.Name}</small>
                            </Link>
                            {" (" + Provider.count + ")"}
                            <br />
                          </li>
                        ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    {result.map((resource, resourceIndex) => (
                      <div className="w-100 mb-2" key={resourceIndex}>
                        {/*<h3>{resource.Affiliation}</h3>*/}
                        <h3 className="mb-0">
                          <Link
                            to={this.props}
                            className="btn btn-link text-dark"
                            onClick={() =>
                              this.setState({
                                resourceID: resource.ID,
                                individualTrue: true
                              })
                            }
                          >
                            {resource.ShortDescription}
                          </Link>
                        </h3>
                        <div className="w-100">
                          <div className="w-100 d-flex">
                            <div>
                              <div className="d-inline p-1">
                                {TypeMapping(resource.Type)}
                              </div>
                              <div className="d-inline p-1 small">
                                {resource.Type}
                              </div>
                            </div>
                            <div>
                              <div className="d-inline p-1">
                                <FontAwesomeIcon size="sm" icon={faCog} />
                              </div>
                              <div className="d-inline p-1 small">
                                {ProviderIDMapping(
                                  resource.ProviderID,
                                  aggregations.ProviderID
                                )}
                              </div>
                            </div>
                          </div>
                          {/*<div className="w-100 overflow-hidden" style={{maxHeight: "100px"}}*/}
                          {/*  dangerouslySetInnerHTML={{*/}
                          {/*    __html: resource.Description*/}
                          {/*  }}*/}
                          {/*></div>*/}
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 w-100">
                    <Pagination
                        className="mb-0"
                      itemClass="page-item"
                      activeClass="bg-dark text-white"
                      linkClass="page-link"
                      activeLinkClass="bg-dark text-white"
                      activePage={this.state.activePage}
                      itemsCountPerPage={25}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      hideFirstLastPages={true}
                      onChange={this.handlePageChange.bind(this)}
                    />
                    <small className="text-medium">
                      Query Took: {this.state.searchTime}ms
                    </small>
                </div>
                  </div>
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
          <div className="page">
            <h1 className="title">{this.getTitle()}</h1>
            <button className="btn btn-dark" onClick={this.BackPage}>
              <FontAwesomeIcon size="1x" icon={faArrowLeft} />
            </button>
            <Row>
              <Col xs={10}>
                <div className="results">
                  {result.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="article">
                      <article className="result">
                        <h2>{resource.ShortDescription}</h2>
                        <div className="w-100 mt-3">
                          <h3>Description</h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: resource.Description
                            }}
                          ></div>
                        </div>

                        <div className="w-100 mt-3">
                          <h3>{resource.ResourceGroup} Type:&nbsp;</h3>
                          <div>{resource.Type}</div>
                        </div>

                        <div className="w-100 mt-3">
                          <h3>Attributes</h3>
                          {KeyWords(resource.Keywords)}
                          {QualityLevel(resource.QualityLevel)}
                          {Audience(resource.Affiliation)}
                        </div>

                        <div className="w-100 mt-3 mb-3">
                          <h3>Relations</h3>
                          {resource.Relations &&
                            resource.Relations.map((relation, relationIndex) => (
                              <div key={relationIndex}>
                                <b>{relation.RelationType} : </b>
                                {relation.Name}
                              </div>
                            ))
                          }
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
