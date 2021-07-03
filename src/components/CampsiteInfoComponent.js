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
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      rating: "",
      author: "",
      text: "",
      touched: {
        rating: false,
        author: false,
        text: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState((prev) => ({ isModalOpen: !prev.isModalOpen }));
  }

  handleSubmit = (values) => {
    console.log(this.state.rating);
    alert(JSON.stringify(values));
    console.log(JSON.stringify(values));
    this.toggleModal();
  };

  render() {
    return (
      <div>
        <Button
          className="mb-2"
          outline
          color="secondary"
          onClick={this.toggleModal}
        >
          <i className="fa fa-pencil fa-lg"></i> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
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
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    minLength: "Your name must be at least 2 characters long",
                    maxLength: "Your name must be a maximum of 15 characters",
                  }}
                />
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
