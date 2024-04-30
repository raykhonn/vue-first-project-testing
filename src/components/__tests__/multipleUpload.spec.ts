import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Multiple from "../multipleUpload.vue";
import { nextTick } from "vue";
import { uploadSingle } from "../../service/api";

describe("multipleUpload", () => {
  it("should render File input", () => {
    const wrapper = mount(Multiple, {
      props: {
        maxSize: 10 * 1024 * 1024,
        maxElementCount: 10,
        isMultiple: true,
      },
    });

    expect(wrapper.find("input").html()).matchSnapshot();
  });

  it("should show error message when uploaded file more than 4bytes when maxSize is 4", async () => {
    const wrapper = mount(Multiple, {
      props: {
        maxSize: 4,
        maxElementCount: 10,
        isMultiple: true,
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
    (wrapper.getCurrentComponent().exposed as unknown as any).multiChange({
      target: { files: mockFileList },
    });
    await nextTick();

    const element = wrapper.find("label");

    expect(element.attributes("id")).toBe("large-file");
  });

  it("should display error message when exceeding max file count", async () => {
    const wrapper = mount(Multiple, {
      props: {
        maxSize: 25,
        maxElementCount: 4,
        isMultiple: true,
      },
    });
    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;

    const mockFileList = Object.create(inputElement.files);

    (mockFileList[0] = new File(["File content"], "file1.txt", {
      type: "text/plain",
    })),
      (mockFileList[1] = new File(["Another file content"], "file2.txt", {
        type: "text/plain",
      })),
      (mockFileList[2] = new File(["Another file content"], "file3.txt", {
        type: "text/plain",
      })),
      (mockFileList[3] = new File(["Another file content"], "file4.txt", {
        type: "text/plain",
      })),
      (mockFileList[4] = new File(["Another file content"], "file5.txt", {
        type: "text/plain",
      })),
      (mockFileList[5] = new File(["Another file content"], "file6.txt", {
        type: "text/plain",
      })),
      (mockFileList[6] = new File(["Another file content"], "file7.txt", {
        type: "text/plain",
      })),
      Object.defineProperty(mockFileList, "length", { value: 7 });

    (wrapper.getCurrentComponent().exposed as unknown as any).multiChange({
      target: { files: mockFileList },
    });

    await wrapper.vm.$nextTick();

    const element = wrapper.find("label[data]");

    expect(element.exists()).toBe(true);
  });

  it("should not show an error message unless the maximum number of files is exceeded", async () => {
    const wrapper = mount(Multiple, {
      props: {
        maxSize: 25,
        maxElementCount: 8,
        isMultiple: true,
      },
    });
    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;

    const mockFileList = Object.create(inputElement.files);

    (mockFileList[0] = new File(["File content"], "file1.txt", {
      type: "text/plain",
    })),
      (mockFileList[1] = new File(["Another file content"], "file2.txt", {
        type: "text/plain",
      })),
      (mockFileList[2] = new File(["Another file content"], "file3.txt", {
        type: "text/plain",
      })),
      (mockFileList[3] = new File(["Another file content"], "file4.txt", {
        type: "text/plain",
      })),
      (mockFileList[4] = new File(["Another file content"], "file5.txt", {
        type: "text/plain",
      })),
      Object.defineProperty(mockFileList, "length", { value: 5 });

    (wrapper.getCurrentComponent().exposed as unknown as any).multiChange({
      target: { files: mockFileList },
    });

    await wrapper.vm.$nextTick();

    const element = wrapper.find("label");

    // expect(element.attributes('class')).toEqual(undefined);
  });

  it("should input type isMultiple", () => {
    const wrapper = mount(Multiple, {
      props: {
        maxSize: 10 * 1024 * 1024,
        maxElementCount: 5,
        isMultiple: true,
      },
    });

    const multipleInputFind = wrapper.find("input[multiple]");

    expect(multipleInputFind.exists()).toBe(true);
  });

  it("should handle API response success", async () => {
    const wrapper = mount(Multiple, {
      props: {
        maxSize: 10,
        maxElementCount: 10,
        isMultiple: true,
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
});
