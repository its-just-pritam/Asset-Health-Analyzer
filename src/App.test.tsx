import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import App from "./App";
import AppFooter from "./components/Footer";
import AppHeader from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import AppSidebar from "./components/SideBar";
configure({ adapter: new Adapter() });
describe("<IndexPage />", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
  describe("content", () => {
    it("contains required layout components", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(AppHeader)).toHaveLength(1);
      expect(wrapper.find(AppFooter)).toHaveLength(1);
      expect(wrapper.find(AppSidebar)).toHaveLength(1);
      expect(wrapper.find(PrivateRoutes)).toHaveLength(1);
    });
  });
});
