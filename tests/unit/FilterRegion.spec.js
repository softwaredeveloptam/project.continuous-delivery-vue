import { expect } from "chai";
import { mount } from "@vue/test-utils";
import FilterRegion from "@/components/FilterRegion.vue";

describe("FilterRegion.vue", () => {
  let wrapper = null;

  it("renders when called", () => {
    // Setup
    wrapper = mount(FilterRegion);

    // Assert
    expect(wrapper.exists()).to.be.true;

    // Teardown
    wrapper.destroy();
    wrapper = null;
  });

  it("can filter based on State", () => {});

  it("removes all other selections outside of state", () => {});

  it("shows a list of Cities when State is selected", () => {});

  it("can filter based on City selection", () => {});

  it("when a city and selected are selected, I can see a highways list", () => {});

  it("when I select a highway, all other locations disappear", () => {});

  it("Should only see travel stops when selected", () => {});

  it("Should only see country stops when selected", () => {});

  it("Should show both travel and country stores when I select them", () => {});

  it("Should show all locations country and travel stops when each box is unselected", () => {});
});
