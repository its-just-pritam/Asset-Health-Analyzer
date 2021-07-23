import { fireEvent,render } from "@testing-library/react";
import { configure, shallow } from "enzyme";
/// <reference types="jest"/>
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { createMemoryHistory } from "history";
import { DashboardClass } from "./Dashboard";
import ClientProfile from "./ClientProfile";
import Routes from "../routes/index";
import UserComponent from "../components/userInfo";
import Appfooter from "../components/Footer";
import { ParamIcon } from "../components/paramIcon";
import { Router } from "react-router-dom";

const data = JSON.stringify({
  temperature: {
    root: "common",
    icon: "temperature-hot",
    unit: "° C",
  },
  humidity: {
    root: "common",
    icon: "cloud-rain",
    unit: " %",
  },
});

describe("paramIcon should work properly", () => {
  const variables = "temperature";
  it("should return only outliers values", () => {
    expect(ParamIcon(variables)).toEqual(["common", "temperature-hot", "° C"]);
  });
  const variable = "power";
  it("should return only outliers values", () => {
    expect(ParamIcon(variable)).toEqual(["building", "dashboard", ""]);
  });
});

configure({ adapter: new Adapter() });
describe("<IndexPage />", () => {
  it("renders without crashing", () => {
    shallow(<Home />);
  });
  it("button should work properly", () => {
    const { getByText } = render(<Home />);
    fireEvent.click(getByText("Learn More"));
  });
});

configure({ adapter: new Adapter() });
const history = createMemoryHistory();
history.push("/");
describe("<IndexPage />", () => {
  it("renders without crashing", () => {
    shallow(<Dashboard />);
  });
  it("renders without crashing", () => {
    shallow(<DashboardClass history={history} />);
  });
  it("button works properly", () => {
    const { getByTestId } = render(<Router history={history}><DashboardClass history={history}/></Router>);
    fireEvent.click(getByTestId("Asset"));
  });
});

describe("<IndexPage />", () => {
  it("renders without crashing", () => {
    shallow(<ClientProfile />);
  });
});

describe("<IndexPage />", () => {
  it("renders without crashing", () => {
    shallow(<Routes />);
  });
});

describe("<IndexPage />", () => {
  it("renders without crashing", () => {
    shallow(<UserComponent />);
  });
});

describe("<IndexPage />", () => {
  it("renders without crashing", () => {
    shallow(<Appfooter />);
  });
});






