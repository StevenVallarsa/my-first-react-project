import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

export default class CampsiteInfo extends Component {
  renderCampsite(campsite) {
    return (
      <div class="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  renderComments(comments) {
    if (comments) {
      return (
        <div class="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map((comment) => {
            return (
              <p>
                {comment.text}
                <br />
                -- {comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            );
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    if (this.props.campsite) {
      return (
        <div class="row">
          {this.renderCampsite(this.props.campsite)}
          {this.renderComments(this.props.campsite.comments)}
        </div>
      );
    } else {
      return (
        <div class="row">
          <div className="col-md-10 m-1 text-center font-weight-bold text-success">
            <p className="p-2 text-center">
              Select A Campsite To View Its Information
            </p>
          </div>
        </div>
      );
    }
  }
}
