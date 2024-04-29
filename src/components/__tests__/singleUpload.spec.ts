import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import Single from "../singleUpload.vue";
import { nextTick } from "vue";
import { uploadSingle } from "../../service/api";

describe.concurrent("singleleUpload", () => {
  it("should render File input", () => {
    const wrapper = mount(Single);

    expect(wrapper.find("input").html()).matchSnapshot();
  });

  it("should show error message when uploaded file more than 4bytes when maxSize is 4", async () => {
    const wrapper = mount(Single, {
      props: {
        maxSize: 4,
      },
    });
    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;
    const file = new File(["27877"], "foo.txt", {
      type: "text/plain",
    });
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });
    (wrapper.getCurrentComponent().exposed as unknown as any).singleChange({
      target: { files: mockFileList },
    });
    await nextTick();

    const element = wrapper.find("label");

    expect(element.attributes("data")).toEqual("large-file");
  });

  it("If maxSize is 4, no error message should be displayed when a file is loaded with less than 4 bytes", async () => {
    const wrapper = mount(Single, {
      props: {
        maxSize: 6,
      },
    });
    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;
    const file = new File(["2777"], "foo.txt", {
      type: "text/plain",
    });
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });
    (wrapper.getCurrentComponent().exposed as unknown as any).singleChange({
      target: { files: mockFileList },
    });
    await nextTick();

    const element = wrapper.find("label");

    expect(element.attributes("data")).toEqual(undefined);
  });

  it("should handle API response success", async () => {
    const wrapper = mount(Single, {
      props: {
        maxSize: 10,
      },
    });

    const file = new File(["27"], "foo.txt", {
      type: "text/plain",
    });

    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });

    const response = await uploadSingle(mockFileList[0]);

    await wrapper.vm.$nextTick();

    expect(response.status).toBe(200);
  });

  it("should file mime type", async () => {
    const wrapper = mount(Single, {
      props: {
        maxSize: 10,
      },
    });
    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;
    const file = new File(["27432"], "foo.pdf", {
      type: "application/pdf",
    });
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });
    (wrapper.getCurrentComponent().exposed as unknown as any).singleChange({
      target: { files: mockFileList },
    });
    await nextTick();

    const element = wrapper.find("label");
    expect(element.attributes("id")).toEqual("type-success");
  });
});
