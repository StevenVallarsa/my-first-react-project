import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import CampsiteInfo from "./CampsiteInfoComponent";

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCampsite: null,
    };

    // Added refs to scroll to bottom to selected campsite,
    // and back to top when campsite deselected
    this.topRef = React.createRef();
    this.bottomRef = React.createRef();
  }

  onCampsiteSelect(campsite) {
    this.setState({ selectedCampsite: campsite });

    // Needed to add this setTimeout to allow for the rendering
    // of the CamsiteInfo, else it wouldn't work on first render
    setTimeout(
      () => this.bottomRef.current.scrollIntoView({ behavior: "smooth" }),
      500
    );
  }

  // Added method to display information at top of page
  // to let user know to click images and to scroll to
  // bottom to view information of selected campsite
  renderHeading(campsite) {
    let headerLine;
    if (campsite) {
      headerLine = (
        <p className="p-2 text-center">
          Viewing Information About{" "}
          <span className="font-weight-bold">{campsite.name}</span> Below
        </p>
      );
    } else {
      headerLine = (
        <p className="p-2 text-center">
          Select A Campsite To View Its Information
        </p>
      );
    }

    return (
      <div className="row">
        <div
          className="col-md-10 m-1 text-center text-primary"
          style={{ maxHeight: 40 }}
        >
          {headerLine}
        </div>
      </div>
    );
  }

  removeCampsite() {
    this.setState({ selectedCampsite: null });
    this.topRef.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const directory = this.props.campsites.map((campsite) => {
      return (
        <div key={campsite.id} className="col-md-5 m-1">
          <Card onClick={() => this.onCampsiteSelect(campsite)}>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
              <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container" ref={this.topRef}>
        {/* Calls method to display header information on top of page */}
        <div>{this.renderHeading(this.state.selectedCampsite)}</div>

        <div className="row">{directory}</div>
        <div ref={this.bottomRef}> </div>
        <CampsiteInfo
          removeCampsite={() => this.removeCampsite()}
          campsite={this.state.selectedCampsite}
        />
      </div>
    );
  }
}

export default Directory;
