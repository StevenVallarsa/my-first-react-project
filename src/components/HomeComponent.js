import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderCard({ item, isLoading, errorMessage }) {
  if (isLoading) {
    return <Loading />;
  }
  if (errorMessage) {
    return <h4>{errorMessage}</h4>;
  }
  console.log(baseUrl + item.image);
  return (
    <Card>
      <CardImg src={baseUrl + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard
            item={props.campsite}
            isLoading={props.campsitesLoading}
            errorMessage={props.campsitesErrorMessage}
          />
        </div>
        <div className="col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promotionLoading}
            errorMessage={props.promotionErrorMessage}
          />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.partner} />
        </div>
      </div>
    </div>
  );
}

export default Home;
