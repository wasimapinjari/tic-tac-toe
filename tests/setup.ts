import { act } from 'react';
import '@testing-library/jest-dom';
import { delay } from '@/utils/helperFunctions';

vi.stubGlobal('matchMedia', (query: string) => ({
  matches: true,
  media: query,
  onchange: null,
}));

HTMLMediaElement.prototype.play = () => Promise.resolve();

export const testElement = (element: HTMLElement) =>
  expect(element).toBeInTheDocument();

export const testText = (
  element: HTMLElement,
  ...texts: (RegExp | string)[]
) => {
  for (const text of texts) {
    expect(element).toHaveTextContent(text);
  }
};

export const testHTML = (element: HTMLElement, text: string) =>
  expect(element).toContainHTML(text);

export const testAttribute = (
  element: HTMLElement,
  attribute: string,
  value?: string
) => expect(element).toHaveAttribute(attribute, value);

export const delayUpdate = (seconds: number) =>
  act(async () => await delay(seconds));
