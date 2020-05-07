import { expect } from "chai";
import axios from "axios";
import { mount } from "@vue/test-utils";
import OurMap from "@/components/Map.vue";

describe("Map.vue", () => {
  let wrapper = null;

  it("renders when called", () => {
    // Setup
    wrapper = mount(OurMap);

    // Assert
    expect(wrapper.get("GmapMap")).to.be.an("object");
    expect(wrapper.exists()).to.be.true;
    expect(wrapper.isVisible()).to.be.true;

    // Teardown
    wrapper.destroy();
    wrapper = null;
  });

  it("has markers on the page", () => {
    wrapper = mount(OurMap);

    expect(wrapper.vm.$data.markers).to.be.deep.equal([]);

    wrapper.destroy();
    wrapper = null;
  });

  it.skip("can receive a click", () => {
    wrapper = mount(OurMap);

    console.log("<--- $listeners --->\n", wrapper.vm.$listeners);
    wrapper.vm.$on("test", function(msg) {
      console.log(msg);
    });
    wrapper.vm.$emit("test", "hi");
    // => "hi"

    wrapper.destroy();
    wrapper = null;
  });

  it.skip("can receive a click and drag, the map moves", () => {
    wrapper = mount(OurMap);

    /*
      Emit a Click
      Emit a Drag
      Check to see if the center has changed
    */

    wrapper.destroy();
    wrapper = null;
  });

  it.skip("can zoom in when zoom in button is clicked", () => {
    wrapper = mount(OurMap);

    /*
      Access the Gmap's Zoom Function
      Emit a Click
      Record it and Validate it
    */

    wrapper.destroy();
    wrapper = null;
  });

  it.skip("shows markers on the home page", async () => {
    wrapper = mount(OurMap);

    /*
      Async/Await
      Check to see if we can check a specific marker
    */

    const shopLocation = await axios.get("/api/locations");
    console.log(shopLocation);
    // let markers = shopLocation.data;

    // markers = markers.map((shop) => {
    //   return {
    //     position: { lat: shop.latitude, lng: shop.longitude },
    //     type: shop.type,
    //   };
    // });

    // console.log(markers[0]);

    // expect(wrapper.get("marker")).to.be.true;

    wrapper.destroy();
    wrapper = null;
  });
});
