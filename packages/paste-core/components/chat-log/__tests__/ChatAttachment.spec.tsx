import * as React from 'react';
import {screen, render} from '@testing-library/react';
// @ts-ignore typescript doesn't like js imports
import axe from '../../../../../.jest/axe-helper';
import {ChatAttachment, ChatAttachmentLink, ChatAttachmentDescription, ComposerAttachmentCard} from '../src';

import {Spinner} from '@twilio-paste/spinner';
import {DownloadIcon} from '@twilio-paste/icons/esm/DownloadIcon';
import {Theme} from '@twilio-paste/theme';

describe('ChatAttachment', () => {
  it('should render an icon, anchor, and text', () => {
    const {container} = render(
      <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
        <ChatAttachmentLink href="www.google.com">document</ChatAttachmentLink>
        <ChatAttachmentDescription>description</ChatAttachmentDescription>
      </ChatAttachment>
    );
    expect(container.querySelector('[data-paste-element="ICON"]')).toBeDefined();
    expect(screen.getByRole('link')).toBeDefined();
    expect(screen.getByText('description')).toBeDefined();
  });
});

describe('ComposerAttachmentCard', () => {
  it('should render a dismiss button if there is an onDismiss prop', () => {
    render(
      <Theme.Provider theme="default">
        <ComposerAttachmentCard onDismiss={() => {}}>
          <ChatAttachment attachmentIcon={<Spinner decorative={false} title="loading..." />}>
            <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
            <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
          </ChatAttachment>
        </ComposerAttachmentCard>
      </Theme.Provider>
    );
    expect(screen.getByRole('button')).toBeDefined();
  });
  it('should not render a dismiss button if there is no onDismiss prop', () => {
    render(
      <Theme.Provider theme="default">
        <ComposerAttachmentCard>
          <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
            <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
            <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
          </ChatAttachment>
        </ComposerAttachmentCard>
      </Theme.Provider>
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});
describe('Accessibility', () => {
  it('Should have no accessibility violations', async () => {
    const {container} = render(
      <ComposerAttachmentCard>
        <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
          <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
          <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
        </ChatAttachment>
      </ComposerAttachmentCard>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
