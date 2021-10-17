import React from "react";
// name export
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({
  adapter: new Adapter(),
});

describe("<NavigationItems />", () => {
  // beforeEach
  // afterEach
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render two <NavigationItems /> elements if not authenticated", () => {
    // shallow must pass an react element/jsx
    // wrapper = shallow(<NavigationItems />)
    // Navigation is just a function, we are looking for!!
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItems /> elements is authenticated", () => {
    // shallow must pass an react element/jsx
    // Navigation is just a function, we are looking for!!
    // wrapper = shallow(<NavigationItems isAuthenticated />)
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should show logout button when authenticated true", () => {
    // shallow must pass an react element/jsx
    // wrapper = shallow(<NavigationItems />)
    // Navigation is just a function, we are looking for!!
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
  it("should show Authenticate when authenticated false", () => {
    // shallow must pass an react element/jsx
    // wrapper = shallow(<NavigationItems />)
    // Navigation is just a function, we are looking for!!
    wrapper.setProps({ isAuthenticated: false });
    expect(
      wrapper.contains(<NavigationItem link="/auth">Authenticate</NavigationItem>)
    ).toEqual(true);
  });
});
