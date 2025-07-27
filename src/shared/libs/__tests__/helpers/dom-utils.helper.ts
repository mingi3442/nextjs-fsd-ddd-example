/**
 * DOM 테스트 유틸리티
 */

/**
 * DOM 테스트 헬퍼 (React 컴포넌트 테스트용)
 */
export const DOMTestHelpers = {
  /**
   * 요소가 화면에 보이는지 확인
   */
  isVisible: (element: HTMLElement): boolean => {
    return element.offsetParent !== null;
  },

  /**
   * 클릭 이벤트 시뮬레이션
   */
  simulateClick: (element: HTMLElement) => {
    element.click();
  },

  /**
   * 입력 이벤트 시뮬레이션
   */
  simulateInput: (element: HTMLInputElement, value: string) => {
    element.value = value;
    element.dispatchEvent(new Event("input", { bubbles: true }));
  },

  /**
   * 폼 제출 이벤트 시뮬레이션
   */
  simulateSubmit: (form: HTMLFormElement) => {
    form.dispatchEvent(new Event("submit", { bubbles: true }));
  },
};
