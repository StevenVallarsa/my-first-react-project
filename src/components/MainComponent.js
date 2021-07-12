import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners,
  postFeedback,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapDispatchToProps = {
  postComment: (campsiteId, rating, author, text) =>
    postComment(campsiteId, rating, author, text),
  fetchCampsites: () => fetchCampsites(),
  resetFeedbackForm: () => actions.reset("feedbackForm"),
  fetchComments: () => fetchComments(),
  fetchPromotions: () => fetchPromotions(),
  fetchPartners: () => fetchPartners(),
  postFeedback: (feedback) => postFeedback(feedback),
};

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    promotions: state.promotions,
    partners: state.partners,
  };
};
class Main extends Component {
  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          campsite={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.featured
            )[0]
          }
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrorMessage={this.props.campsites.errorMessage}
          promotion={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0]
          }
          promotionLoading={this.props.promotions.isLoading}
          promotionsErrorMessage={this.props.promotions.errorMessage}
          partner={
            this.props.partners.partners.filter(
              (partner) => partner.featured
            )[0]
          }
          partnersLoading={this.props.partners.isLoading}
          partnersErrorMessage={this.props.partners.errorMessage}
        />
      );
    };

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          campsite={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          isLoading={this.props.campsites.isLoading}
          errorMessage={this.props.campsites.errorMessage}
          comments={this.props.comments.comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
          commentsErrorMessage={this.props.comments.errorMessage}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/directory"
                render={() => <Directory campsites={this.props.campsites} />}
              />
              <Route
                exact
                path="/aboutus"
                render={() => <About partners={this.props.partners} />}
              />
              <Route path="/directory/:campsiteId" component={CampsiteWithId} />
              <Route
                exact
                path="/contactus"
                render={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
