import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      rating: "",
      author: "",
      text: "",
    };
    this.toggle = this.toggle.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState((prev) => ({ modalOpen: !prev.modalOpen }));
  }

  handleSubmit = (values) => {
    console.log(this.state.rating);
    alert(JSON.stringify(values));
  };

  render() {
    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>
          <i className="fa fa-pencil fa-lg"></i> Submit Comment
        </Button>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Label htmlFor="rating">Rating</Label>
              <div className="form-group">
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option value=""></option>
                  <option value="5">5 * * * * *</option>
                  <option value="4">4 * * * *</option>
                  <option value="3">3 * * *</option>
                  <option value="2">2 * *</option>
                  <option value="1">1 *</option>
                </Control.select>
              </div>
              <Label htmlFor="author">Your Name</Label>
              <div className="form-group">
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                ></Control.text>
              </div>
              <Label htmlFor="text">Comment</Label>
              <div className="form-group">
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  className="form-control"
                  rows="6"
                ></Control.textarea>
              </div>
              <Button type="submit" color="primary">
                Submit Comment
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div class="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
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
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/directory">Directory</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
              </Breadcrumb>
              <h2>{props.campsite.name}</h2>
              <hr />
            </div>
          </div>
          <div className="row">
            <RenderCampsite campsite={props.campsite} />
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </>
    );
  }
  return <div />;
}

export default CampsiteInfo;
