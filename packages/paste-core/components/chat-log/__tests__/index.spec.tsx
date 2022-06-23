import * as React from 'react';
import {screen, render} from '@testing-library/react';
// @ts-ignore typescript doesn't like js imports
import axe from '../../../../../.jest/axe-helper';
import {
  ChatMessage,
  ChatBubble,
  ChatMessageMeta,
  ChatMessageMetaItem,
  ChatAttachment,
  ChatAttachmentLink,
  ChatAttachmentDescription,
  ComposerAttachmentCard,
} from '../src';

import {Box} from '@twilio-paste/box';
import {Spinner} from '@twilio-paste/spinner';
import {DownloadIcon} from '@twilio-paste/icons/esm/DownloadIcon';
import {Theme} from '@twilio-paste/theme';

describe('ChatMessage', () => {
  it('should render a list element', () => {
    render(<ChatMessage variant="inbound">test</ChatMessage>);
    expect(screen.getByRole('listitem')).toBeDefined();
  });
});

describe('ChatBubble', () => {
  it('should render', () => {
    render(
      <ChatMessage variant="inbound">
        <ChatBubble>test</ChatBubble>
      </ChatMessage>
    );
    expect(screen.getByText('test')).toBeDefined();
  });
});

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

describe('ChatMessageMeta', () => {
  it('should render', () => {
    render(
      <ChatMessage variant="inbound">
        <ChatMessageMeta aria-label="sent at 5:04pm">
          <ChatMessageMetaItem>5:04pm</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
    );
    expect(screen.getByText('5:04pm')).toBeDefined();
  });

  it('should have aria-label when pass the aria-label prop', () => {
    render(
      <ChatMessage variant="inbound">
        <ChatMessageMeta data-testid="test-meta" aria-label="said by Gibby Radki at 5:04pm">
          <ChatMessageMetaItem>Gibby Radki</ChatMessageMetaItem>
          <ChatMessageMetaItem>5:04pm</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
    );
    expect(screen.getByTestId('test-meta')).toHaveAttribute('aria-label', 'said by Gibby Radki at 5:04pm');
  });

  it('should have justifyContent flex-end if there is one child', () => {
    render(
      <ChatMessage variant="inbound">
        <ChatMessageMeta data-testid="test-meta" aria-label="sent at 5:04pm">
          <ChatMessageMetaItem>5:04pm</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
    );
    expect(screen.getByTestId('test-meta')).toHaveStyleRule('justify-content', 'flex-end');
  });

  it('should have justifyContent space-between if there is more than one child', () => {
    render(
      <ChatMessage variant="inbound">
        <ChatMessageMeta data-testid="test-meta" aria-label="said by Gibby Radki at 5:04pm">
          <ChatMessageMetaItem>Gibby Radki</ChatMessageMetaItem>
          <ChatMessageMetaItem>5:04pm</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
    );
    expect(screen.getByTestId('test-meta')).toHaveStyleRule('justify-content', 'space-between');
  });

  it('should have textAlign right if there is one child', () => {
    render(
      <ChatMessage variant="inbound">
        <ChatMessageMeta data-testid="test-meta" aria-label="sent at 5:04pm">
          <ChatMessageMetaItem>5:04pm</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
    );
    expect(screen.getByTestId('test-meta')).toHaveStyleRule('text-align', 'right');
  });

  it('should not set textAlign if there is more than one child', () => {
    render(
      <ChatMessage variant="inbound">
        <ChatMessageMeta data-testid="test-meta" aria-label="said by Gibby Radki at 5:04pm">
          <ChatMessageMetaItem>Gibby Radki</ChatMessageMetaItem>
          <ChatMessageMetaItem>5:04pm</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
    );
    expect(screen.getByTestId('test-meta')).not.toHaveStyleRule('text-align', 'right');
  });
});

describe('Accessibility', () => {
  it('Should have no accessibility violations', async () => {
    const {container} = render(
      // todo: replace with ChatLog component
      <ul>
        <ChatMessage variant="inbound">
          <ChatBubble>test</ChatBubble>
          <ChatMessageMeta aria-label="said by Gibby Radki at 5:04pm">
            <ChatMessageMetaItem>Gibby Radki</ChatMessageMetaItem>
            <ChatMessageMetaItem>5:04pm</ChatMessageMetaItem>
          </ChatMessageMeta>
        </ChatMessage>
        <ChatMessage variant="outbound">
          <ChatBubble>test</ChatBubble>
          <ChatMessageMeta aria-label="said by you 2 minutes ago">
            <ChatMessageMetaItem>2 minutes ago</ChatMessageMetaItem>
          </ChatMessageMeta>
        </ChatMessage>
        <ChatMessage variant="inbound">
          <ChatBubble>
            <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
              <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
              <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
            </ChatAttachment>
          </ChatBubble>
        </ChatMessage>
        <ChatMessage variant="outbound">
          <ChatBubble>
            <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
              <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
              <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
            </ChatAttachment>
          </ChatBubble>
        </ChatMessage>
      </ul>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
