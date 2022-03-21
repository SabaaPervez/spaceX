import React from "react";
import enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import ButtonPanel from "../components/test-component/ButtonPanel";

enzyme.configure({ adapter: new Adapter() });

describe("button panel should display and work correctly", () => {
  let buttonClickSpy;
  let component;
  beforeEach(() => {
    buttonClickSpy = sinon.spy();
    component = mount(<ButtonPanel clickHandler={buttonClickSpy} />);
  });
  afterEach(() => {
    component.unmount();
  });
  it("should render buttons for numbers 0 to 9", () => {
    const button0 = component.find('[name="0"]');
    expect(button0.length).to.equal(1);

    expect(component.find('[name="1"]').length).to.equal(1);
    expect(component.find('[name="2"]').length).to.equal(1);
    expect(component.find('[name="3"]').length).to.equal(1);
    expect(component.find('[name="4"]').length).to.equal(1);
    expect(component.find('[name="5"]').length).to.equal(1);
    expect(component.find('[name="6"]').length).to.equal(1);
    expect(component.find('[name="7"]').length).to.equal(1);
    expect(component.find('[name="8"]').length).to.equal(1);
    expect(component.find('[name="9"]').length).to.equal(1);
  });
  it("should send numbers if number button is clicked", () => {
    const button2 = component.find('[name="2"] button');
    expect(button2.length).to.equal(1);

    button2.simulate("click");
    expect(buttonClickSpy.calledOnce).to.be.true;
    expect(buttonClickSpy.calledWith("2")).to.be.true;
  });
  it("should send operator if operator button is clicked", () => {
    const buttonPlus = component.find('[name="+"] button');
    expect(buttonPlus.length).to.equal(1);

    buttonPlus.simulate("click");
    expect(buttonClickSpy.calledOnce).to.be.true;
    expect(buttonClickSpy.calledWith("+")).to.be.true;
  });
});
