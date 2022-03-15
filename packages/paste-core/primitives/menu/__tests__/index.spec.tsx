import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  useMenuPrimitiveState,
  MenuPrimitive,
  MenuPrimitiveItem,
  MenuPrimitiveButton,
  MenuPrimitiveSeparator,
} from '../src';
import type {MenuPrimitiveButtonProps} from '../src';

const PreferencesMenu = React.forwardRef<HTMLButtonElement, MenuPrimitiveButtonProps>((props, ref) => {
  const menu = useMenuPrimitiveState({baseId: 'sub-menu'});
  return (
    <>
      <MenuPrimitiveButton ref={ref} {...menu} {...props} data-testid="example-submenu-trigger">
        Preferences
      </MenuPrimitiveButton>
      <MenuPrimitive {...menu} aria-label="Preferences" data-testid="example-submenu">
        <MenuPrimitiveItem {...menu} data-testid="example-submenu-item">
          Settings
        </MenuPrimitiveItem>
        <MenuPrimitiveItem {...menu} disabled data-testid="example-disabled-submenu-item">
          Extensions
        </MenuPrimitiveItem>
        <MenuPrimitiveSeparator {...menu} />
        <MenuPrimitiveItem {...menu}>Keyboard shortcuts</MenuPrimitiveItem>
      </MenuPrimitive>
    </>
  );
});

const MenuMock: React.FC = () => {
  const menu = useMenuPrimitiveState({baseId: 'menu-example'});
  return (
    <>
      <MenuPrimitiveButton {...menu}>Code</MenuPrimitiveButton>
      <MenuPrimitive {...menu} aria-label="Code">
        <MenuPrimitiveItem {...menu} data-testid="example-menu-item">
          About Visual Studio Code
        </MenuPrimitiveItem>
        <MenuPrimitiveItem {...menu}>Check for Updates...</MenuPrimitiveItem>
        <MenuPrimitiveSeparator {...menu} data-testid="example-menu-separator" />
        <MenuPrimitiveItem {...menu} as={PreferencesMenu} />
      </MenuPrimitive>
    </>
  );
};

describe('Menu Primitive', () => {
  describe('Render', () => {
    it('should render', () => {
      const {asFragment} = render(<MenuMock />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render a menu button with aria attributes', () => {
      render(<MenuMock />);
      const renderedMenuButton = screen.getByRole('button');
      expect(renderedMenuButton.getAttribute('aria-haspopup')).toEqual('menu');
      expect(renderedMenuButton.getAttribute('aria-controls')).toEqual('menu-example');
    });

    it('should render a menu', () => {
      render(<MenuMock />);
      const renderedMenu = screen.getByLabelText('Code');
      expect(renderedMenu.getAttribute('role')).toEqual('menu');
      expect(renderedMenu.getAttribute('aria-orientation')).toEqual('vertical');
    });

    it('should render a menu item', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-menu-item');
      expect(renderedMenuItem.getAttribute('role')).toEqual('menuitem');
    });

    it('should render a menu separator', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-menu-separator');
      expect(renderedMenuItem.getAttribute('aria-orientation')).toEqual('horizontal');
      expect(renderedMenuItem.tagName).toEqual('HR');
    });

    it('should render a sub menu trigger', () => {
      render(<MenuMock />);
      const renderedSubMenuTrigger = screen.getByTestId('example-submenu-trigger');
      expect(renderedSubMenuTrigger.getAttribute('role')).toEqual('menuitem');
      expect(renderedSubMenuTrigger.getAttribute('aria-haspopup')).toEqual('menu');
      expect(renderedSubMenuTrigger.getAttribute('aria-expanded')).toEqual('false');
    });

    it('should render a submenu', () => {
      render(<MenuMock />);
      const renderedMenu = screen.getByTestId('example-submenu');
      expect(renderedMenu.getAttribute('role')).toEqual('menu');
      expect(renderedMenu.getAttribute('aria-orientation')).toEqual('vertical');
    });

    it('should render a sub menu item', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-submenu-item');
      expect(renderedMenuItem.getAttribute('role')).toEqual('menuitem');
    });

    it('should render a disabled sub menu item', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-disabled-submenu-item');
      expect(renderedMenuItem.getAttribute('role')).toEqual('menuitem');
      expect(renderedMenuItem.getAttribute('aria-disabled')).toEqual('true');
    });
  });

  describe('interaction', () => {
    it('should control expanded attribute on the button', async () => {
      render(<MenuMock />);
      const renderedMenuButton = screen.getByRole('button');
      expect(renderedMenuButton.getAttribute('aria-expanded')).toEqual('false');
      await waitFor(() => {
        userEvent.click(renderedMenuButton);
      });
      expect(renderedMenuButton.getAttribute('aria-expanded')).toEqual('true');
      if (document.activeElement != null) {
        await waitFor(() => {
          userEvent.keyboard('{esc}');
        });
        // eslint-disable-next-line jest/no-conditional-expect
        expect(renderedMenuButton.getAttribute('aria-expanded')).toEqual('false');
      }
    });

    it('should focus menu when open', async () => {
      render(<MenuMock />);
      await waitFor(() => {
        userEvent.click(screen.getByRole('button'));
      });
      if (document.activeElement != null) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(screen.getByRole('menu')).toEqual(document.activeElement);
      }
    });

    it('should move focus menu item when using arrow keys', async () => {
      render(<MenuMock />);
      await waitFor(() => {
        screen.getByRole('button').focus();
        userEvent.keyboard('{arrowdown}');
      });
      if (document.activeElement != null) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(document.activeElement).toEqual(screen.getByText('About Visual Studio Code'));
      }
    });
  });
});
