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
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

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
  }

  toggleModal = () => {
    this.setState((prev) => ({ isModalOpen: !prev.isModalOpen }));
  };

  handleSubmit = (values) => {
    this.toggleModal();
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
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
      <FadeTransform
        in
        transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
      >
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, campsiteId }) {
  if (comments) {
    return (
      <div class="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in key={comment.id}>
                <div>
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
                </div>
              </Fade>
            );
          })}
        </Stagger>
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errorMessage) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errorMessage}</h4>
          </div>
        </div>
      </div>
    );
  }
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
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              campsiteId={props.campsite.id}
            />
          </div>
        </div>
      </>
    );
  }
  return <div />;
}

export default CampsiteInfo;
