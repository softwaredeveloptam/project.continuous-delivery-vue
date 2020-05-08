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
});
