import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

export default class CampsiteInfo extends Component {
  renderCampsite(campsite) {
    return (
      <div className="col-md-5 m-1">
        {/* Added button to clear selected campsite 
            with function passed through via props from
            parent component (DirectoryComponent) */}
        <button
          className="btn btn-primary btn-sm"
          style={{ position: "relative", top: 55, left: 20, zIndex: 10 }}
          onClick={this.props.removeCampsite}
        >
          Clear Campsite
        </button>
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
        <div className="col-md-5 m-1">
          <h4 className="pt-4">Comments</h4>
          {comments.map((comment) => {
            return (
              <p key={comment.id}>
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
        <div className="row">
          {this.renderCampsite(this.props.campsite)}
          {this.renderComments(this.props.campsite.comments)}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
