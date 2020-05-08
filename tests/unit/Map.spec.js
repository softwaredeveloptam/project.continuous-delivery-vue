import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import OurMap from "@/components/Map.vue";

describe("Map.vue", () => {
  it.skip("renders when called", () => {
    const msg = "new message";
    const wrapper = shallowMount(OurMap, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });

  it.skip("has markers on the page", () => {});

  it.skip("can receive a click", () => {});

  it.skip("can receive a click and drag, the map moves", () => {});

  it.skip("can zoom in when zoom in button is clicked", () => {});

  it.skip("shows markers on the home page", () => {});
});
