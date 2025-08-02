export const DOMTestHelpers = {
  isVisible: (element: HTMLElement): boolean => {
    return element.offsetParent !== null;
  },

  simulateClick: (element: HTMLElement) => {
    element.click();
  },

  simulateInput: (element: HTMLInputElement, value: string) => {
    element.value = value;
    element.dispatchEvent(new Event("input", { bubbles: true }));
  },

  simulateSubmit: (form: HTMLFormElement) => {
    form.dispatchEvent(new Event("submit", { bubbles: true }));
  },
};
