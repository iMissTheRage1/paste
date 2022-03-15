import * as React from 'react';

import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PlusIcon} from '@twilio-paste/icons/esm/PlusIcon';
import {CustomizationProvider} from '@twilio-paste/customization';
import {Button} from '../src';

const NOOP = (): void => {};
const HREF = 'https://twilio.paste.design';

describe('Button', () => {
  describe('Button Errors', () => {
    it('Throws an error when a href is passed but an "a" tag is not', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button variant="primary" href={HREF}>
            Go to Paste
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when an "a" tag is passed but a href is not', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button as="a" variant="primary">
            Go to Paste
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when the user should use an Anchor component instead', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button as="a" variant="link" href={HREF}>
            Go to Paste
          </Button>
        )
      ).toThrow();
      expect(() =>
        render(
          <Button as="a" variant="inverse_link" href={HREF}>
            Go to Paste
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when an "a" tag is passed but not using correct variant', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button as="a" href="#" variant="destructive">
            Go to Paste
          </Button>
        )
      ).toThrow();
      expect(() =>
        render(
          <Button as="a" href="#" variant="destructive_secondary">
            Go to Paste
          </Button>
        )
      ).toThrow();
      expect(() =>
        render(
          <Button as="a" href="#" variant="inverse">
            Go to Paste
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when an "a" tag is passed with disabled or loading state', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button as="a" href="#" variant="primary" disabled>
            Go to Paste
          </Button>
        )
      ).toThrow();

      expect(() =>
        render(
          <Button as="a" href="#" variant="primary" loading>
            Go to Paste
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when size=reset is not applied to variant=reset', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button variant="reset" size="small">
            Submit
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when using fullWidth with an icon sizing', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button variant="primary" fullWidth size="icon">
            X
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when using fullWidth with an icon_small sizing', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      expect(() =>
        render(
          <Button variant="primary" fullWidth size="icon_small">
            X
          </Button>
        )
      ).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when not passing children', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      // @ts-expect-error
      expect(() => render(<Button variant="primary" />)).toThrow();
      spy.mockRestore();
    });

    it('Throws an error when passing an invalid tabIndex', () => {
      // hide console errors from terminal when throwing expected errors
      const spy = jest.spyOn(console, 'error');
      spy.mockImplementation(() => {});
      // @ts-expect-error
      expect(() => render(<Button variant="primary" tabIndex="-2" />)).toThrow();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('Button aria attributes', () => {
    it('Has an aria-expanded attribute', () => {
      const {getByRole} = render(
        <Button variant="secondary" aria-expanded="true">
          button
        </Button>
      );

      expect(getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('Has an aria-haspopup attribute', () => {
      const {getByRole} = render(
        <Button variant="secondary" aria-haspopup="true">
          button
        </Button>
      );

      expect(getByRole('button')).toHaveAttribute('aria-haspopup', 'true');
    });

    it('Has an aria-controls attribute', () => {
      const {getByRole} = render(
        <Button variant="secondary" aria-controls="some-id">
          button
        </Button>
      );

      expect(getByRole('button')).toHaveAttribute('aria-controls', 'some-id');
    });

    it('Has an aria-busy attribute when loading', () => {
      const {getByRole} = render(
        <CustomizationProvider baseTheme="default">
          <Button variant="secondary" loading>
            button
          </Button>
        </CustomizationProvider>
      );

      const button = getByRole('button');

      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });

    it('Has disabled set on HTML when disabled', () => {
      const {getByRole} = render(
        <Button variant="secondary" disabled>
          button
        </Button>
      );

      expect(getByRole('button')).toBeDisabled();
    });
  });

  describe('Button data attributes', () => {
    it('Has an data-foo attribute', () => {
      const {getByRole} = render(
        <Button variant="secondary" data-foo="test">
          button
        </Button>
      );

      expect(getByRole('button')).toHaveAttribute('data-foo', 'test');
    });
  });

  describe('Button render as', () => {
    it('Renders a button as a link', () => {
      const {getByRole} = render(
        <Button as="a" variant="secondary" href="/tests">
          button
        </Button>
      );

      expect(getByRole('link')).toBeInTheDocument();
    });
  });

  describe('Button margin styles', () => {
    it('Renders a button with margin: space0', () => {
      const {getByTestId} = render(
        <Button variant="primary" data-testid="button-margin">
          button
        </Button>
      );
      expect(getByTestId('button-margin')).toHaveStyleRule('margin', 'space0');
    });
  });

  describe('Button inner padding', () => {
    it('should not set padding for buttons with only one child', () => {
      const {getByText} = render(<Button variant="primary">Hello</Button>);
      expect(getByText('Hello')).not.toHaveStyleRule('padding', 'undefined');
    });
    it('should set padding between rendered children', () => {
      const {getByText} = render(
        <Button variant="primary">
          Hello
          <PlusIcon decorative />
        </Button>
      );
      expect(getByText('Hello')).toHaveStyleRule('column-gap', 'space20');
    });
  });

  describe('button event handlers', () => {
    it('Should call the appropriate event handlers', () => {
      const onClickMock: jest.Mock = jest.fn();
      const onMouseDownMock: jest.Mock = jest.fn();
      const onMouseUpMock: jest.Mock = jest.fn();
      const onMouseEnterMock: jest.Mock = jest.fn();
      const onMouseLeaveMock: jest.Mock = jest.fn();
      const onFocusMock: jest.Mock = jest.fn();
      const onBlurMock: jest.Mock = jest.fn();

      const {getByRole} = render(
        <Button
          variant="primary"
          onClick={onClickMock}
          onMouseDown={onMouseDownMock}
          onMouseUp={onMouseUpMock}
          onMouseEnter={onMouseEnterMock}
          onMouseLeave={onMouseLeaveMock}
          onFocus={onFocusMock}
          onBlur={onBlurMock}
        >
          Hello
        </Button>
      );

      const button = getByRole('button');

      userEvent.click(button);
      expect(onMouseDownMock).toHaveBeenCalledTimes(1);
      expect(onMouseUpMock).toHaveBeenCalledTimes(1);
      expect(onClickMock).toHaveBeenCalledTimes(1);

      userEvent.hover(button);
      expect(onMouseEnterMock).toHaveBeenCalledTimes(2);

      userEvent.unhover(button);
      expect(onMouseLeaveMock).toHaveBeenCalledTimes(1);

      userEvent.tab();
      expect(onFocusMock).toHaveBeenCalledTimes(1);

      userEvent.tab();
      expect(onBlurMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('button default styles', () => {
    it('should have the correct styles for the primary variant', () => {
      const {getByTestId, getByText} = render(
        <Button variant="primary" data-testid="primary-styles">
          Primary
        </Button>
      );

      const button = getByTestId('primary-styles');

      expect(button).not.toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextInverse');
      expect(button).toHaveStyleRule('background-color', 'colorBackgroundPrimary');
      expect(button).toHaveStyleRule('box-shadow', 'shadowBorderPrimary');

      expect(getByText('Primary')).toHaveStyleRule('justify-content', 'center');
    });

    it('should have the correct styles for the primary_icon variant', () => {
      const {getByTestId} = render(
        <Button variant="primary_icon" data-testid="primary-icon-styles" size="reset" onClick={NOOP}>
          <PlusIcon decorative={false} title="add more" />
        </Button>
      );

      const button = getByTestId('primary-icon-styles');

      expect(button).not.toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextLink');
    });

    it('should have the correct styles for the secondary variant', () => {
      const {getByTestId, getByText} = render(
        <Button variant="secondary" data-testid="secondary-styles">
          Secondary
        </Button>
      );

      const button = getByTestId('secondary-styles');

      expect(button).not.toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorText');
      expect(button).toHaveStyleRule('background-color', 'colorBackgroundBody');
      expect(button).toHaveStyleRule('box-shadow', 'shadowBorder');

      expect(getByText('Secondary')).toHaveStyleRule('justify-content', 'center');
    });

    it('should have the correct styles for the secondary_icon variant', () => {
      const {getByTestId} = render(
        <Button variant="secondary_icon" data-testid="secondary-icon-styles" size="reset" onClick={NOOP}>
          <PlusIcon decorative={false} title="add more" />
        </Button>
      );

      const button = getByTestId('secondary-icon-styles');

      expect(button).not.toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextIcon');
    });

    it('should have the correct styles for the destructive variant', () => {
      const {getByTestId, getByText} = render(
        <Button variant="destructive" data-testid="destructive-styles">
          Destructive
        </Button>
      );

      const button = getByTestId('destructive-styles');

      expect(button).not.toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextInverse');
      expect(button).toHaveStyleRule('background-color', 'colorBackgroundDestructive');
      expect(button).toHaveStyleRule('box-shadow', 'shadowBorderDestructive');

      expect(getByText('Destructive')).toHaveStyleRule('justify-content', 'center');
    });

    it('should have the correct styles for the destructive_icon variant', () => {
      const {getByTestId} = render(
        <Button variant="destructive_icon" data-testid="destructive-icon-styles" size="reset" onClick={NOOP}>
          <PlusIcon decorative={false} title="add more" />
        </Button>
      );

      const button = getByTestId('destructive-icon-styles');

      expect(button).not.toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextLinkDestructive');
    });

    it('should have the correct styles for the destructive_secondary variant', () => {
      const {getByTestId, getByText} = render(
        <Button variant="destructive_secondary" data-testid="destructive_secondary-styles">
          Destructive secondary
        </Button>
      );

      const button = getByTestId('destructive_secondary-styles');
      expect(button).not.toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextLinkDestructive');
      expect(button).toHaveStyleRule('background-color', 'colorBackgroundBody');
      expect(button).toHaveStyleRule('box-shadow', 'shadowBorderDestructive');

      expect(getByText('Destructive secondary')).toHaveStyleRule('justify-content', 'center');
    });

    it('should have the correct styles for the destructive_link variant', () => {
      const {getByTestId, getByText} = render(
        <Button variant="destructive_link" data-testid="destructive_link-styles">
          Destructive link
        </Button>
      );

      const button = getByTestId('destructive_link-styles');

      expect(button).toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextLinkDestructive');
      expect(button).toHaveStyleRule('transition', 'none');
      expect(getByText('Destructive link')).not.toHaveStyleRule('justify-content', 'center');
    });

    it('should have the correct styles for the link variant', () => {
      const {getByTestId, getByText} = render(
        <Button variant="link" data-testid="link-styles">
          Link
        </Button>
      );

      const button = getByTestId('link-styles');

      expect(button).toHaveStyleRule('text-align', 'left');
      expect(button).toHaveStyleRule('color', 'colorTextLink');
      expect(button).toHaveStyleRule('transition', 'none');

      expect(getByText('Link')).not.toHaveStyleRule('justify-content', 'center');
    });

    it('should have the correct styles for the reset variant', () => {
      const {getByText, getByTestId} = render(
        <Button variant="reset" data-testid="reset-styles">
          Reset
        </Button>
      );

      expect(getByText('Reset')).not.toHaveStyleRule('justify-content', 'center');
      expect(getByTestId('reset-styles')).not.toHaveStyleRule('text-align', 'left');
    });

    it('should have the correct styles for a link button in loading state', () => {
      const {getByText, getByTestId} = render(
        <CustomizationProvider baseTheme="default" data-testid="wrapping-div">
          <Button variant="link" loading data-testid="loading-link-styles">
            Loading link
          </Button>
        </CustomizationProvider>
      );

      const buttonContent = getByText('Loading link');
      const themeWrapper = getByTestId('wrapping-div').firstChild as ChildNode;
      const loadingIconWrapper = themeWrapper.lastChild as ChildNode;

      expect(getByTestId('loading-link-styles')).toHaveStyleRule('text-align', 'left');

      expect(buttonContent).toHaveAttribute('aria-hidden', 'true');
      expect(buttonContent).toHaveAttribute('opacity', '0');

      expect(loadingIconWrapper).toHaveStyleRule('position', 'absolute');
      expect(loadingIconWrapper).toHaveStyleRule('top', '0');
      expect(loadingIconWrapper).toHaveStyleRule('right', '0');
      expect(loadingIconWrapper).toHaveStyleRule('bottom', '0');
      expect(loadingIconWrapper).toHaveStyleRule('left', '0');
      expect(loadingIconWrapper).toHaveStyleRule('display', 'flex');
      expect(loadingIconWrapper).toHaveStyleRule('align-items', 'center');
      expect(loadingIconWrapper).toHaveStyleRule('justify-content', 'center');
    });

    it('should have the correct styles for the link variant in disabled state', () => {
      const {getByTestId, getByText} = render(
        <Button variant="link" disabled data-testid="disabled-link-styles">
          Disabled link
        </Button>
      );

      const buttonComponent = getByTestId('disabled-link-styles');
      const buttonContent = getByText('Disabled link');

      expect(buttonComponent).toHaveStyleRule('text-align', 'left');
      expect(buttonComponent).toHaveStyleRule('color', 'colorTextLinkWeak');

      expect(buttonComponent).toHaveStyleRule('cursor', 'not-allowed');
      expect(buttonContent).toHaveAttribute('aria-hidden', 'false');
    });
  });
});
