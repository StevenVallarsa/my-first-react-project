import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import CampsiteInfo from "./CampsiteInfoComponent";

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCampsite: null,
    };
  }

  onCampsiteSelect(campsite) {
    this.setState({ selectedCampsite: campsite });
  }

  // Added method to display information at top of page
  // to let user know to click images and to scroll to
  // bottom to view information of selected campsite
  renderHeading(campsite) {
    if (campsite) {
      return (
        <div class="row">
          <div
            className="col-md-10 m-1 text-center text-primary"
            style={{ maxHeight: 40 }}
          >
            <p className="p-2 text-center">
              Viewing Information About{" "}
              <span className="font-weight-bold">{campsite.name}</span> Below
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div class="row">
          <div
            style={{ maxHeight: 40 }}
            className="col-md-10 m-1 text-center font-weight-bold text-primary"
          >
            <p className="p-2 text-center">
              Select A Campsite To View Its Information
            </p>
          </div>
        </div>
      );
    }
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
      <div className="container">
        {/* calls method to display header information on top of page */}
        <div>{this.renderHeading(this.state.selectedCampsite)}</div>
        <div className="row">{directory}</div>
        <CampsiteInfo
          removeCampsite={() => this.setState({ selectedCampsite: null })}
          campsite={this.state.selectedCampsite}
        />
      </div>
    );
  }
}

export default Directory;
