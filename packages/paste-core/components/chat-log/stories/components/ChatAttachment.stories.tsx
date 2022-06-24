import * as React from 'react';
import {Box} from '@twilio-paste/box';
import {CustomizationProvider} from '@twilio-paste/customization';
import {Spinner} from '@twilio-paste/spinner';
import {Stack} from '@twilio-paste/stack';
import {DownloadIcon} from '@twilio-paste/icons/esm/DownloadIcon';

import type {StoryFn} from '@storybook/react';
import {
  ChatMessage,
  ChatBubble,
  ChatAttachment,
  ComposerAttachmentCard,
  ChatAttachmentLink,
  ChatAttachmentDescription,
} from '../../src';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/ChatLog',
};

export const InboundChatMessageWithAttachment: StoryFn = () => (
  <ChatMessage variant="inbound">
    <ChatBubble>
      <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
        <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
        <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
      </ChatAttachment>
    </ChatBubble>
  </ChatMessage>
);

export const OutboundChatMessageWithAttachment: StoryFn = () => (
  <ChatMessage variant="outbound">
    <ChatBubble>
      <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
        <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
        <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
      </ChatAttachment>
    </ChatBubble>
  </ChatMessage>
);

const StateExampleAttachmentContainer: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const attachmentIcon = loading ? <Spinner decorative={false} title="loading..." /> : <DownloadIcon decorative />;

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout((): void => setLoading(false), 2500);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <ComposerAttachmentCard onDismiss={() => {}}>
      <ChatAttachment attachmentIcon={attachmentIcon}>
        <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
        <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
      </ChatAttachment>
    </ComposerAttachmentCard>
  );
};

export const AttachmentContainerForComposer: StoryFn = () => (
  <Stack orientation="vertical" spacing="space60">
    <ComposerAttachmentCard>
      <ChatAttachment attachmentIcon={<Spinner decorative={false} title="loading..." />}>
        <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
        <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
      </ChatAttachment>
    </ComposerAttachmentCard>
    <ComposerAttachmentCard onDismiss={() => {}}>
      <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
        <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
        <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
      </ChatAttachment>
    </ComposerAttachmentCard>
    <StateExampleAttachmentContainer />
  </Stack>
);

export const CustomizedChatAttachments: StoryFn = () => (
  <CustomizationProvider
    baseTheme="default"
    elements={{
      COMPOSER_ATTACHMENT_CARD: {
        paddingY: 'space100',
      },
      COMPOSER_ATTACHMENT_CARD_REMOVE_ATTACHMENT_BUTTON: {
        color: 'colorTextIconNeutral',
      },
      COMPOSER_ATTACHMENT_CARD_CLOSE_ICON: {
        size: 'sizeIcon50',
      },
      CHAT_ATTACHMENT: {
        marginLeft: 'space50',
      },
      CHAT_ATTACHMENT_ICON: {
        color: 'colorTextIconBrandHighlight',
      },
      CHAT_ATTACHMENT_BODY: {
        marginLeft: 'space50',
      },
      CHAT_ATTACHMENT_STACK: {
        padding: 'space20',
      },
      CHAT_ATTACHMENT_LINK: {
        fontSize: 'fontSize50',
      },
      CHAT_ATTACHMENT_DESCRIPTION: {
        color: 'colorText',
      },
      MY_COMPOSER_ATTACHMENT_CARD: {
        paddingY: 'space60',
      },
      MY_COMPOSER_ATTACHMENT_CARD_REMOVE_ATTACHMENT_BUTTON: {
        color: 'colorTextIconSuccess',
      },
      MY_COMPOSER_ATTACHMENT_CARD_CLOSE_ICON: {
        size: 'sizeIcon40',
      },
      MY_CHAT_ATTACHMENT: {
        marginLeft: 'space30',
      },
      MY_CHAT_ATTACHMENT_ICON: {
        color: 'colorTextIconError',
      },
      MY_CHAT_ATTACHMENT_BODY: {
        marginLeft: 'space40',
      },
      MY_CHAT_ATTACHMENT_STACK: {
        padding: 'space40',
      },
      MY_CHAT_ATTACHMENT_LINK: {
        fontSize: 'fontSize40',
      },
      MY_CHAT_ATTACHMENT_DESCRIPTION: {
        color: 'colorTextError',
      },
    }}
  >
    <Box as="ul" width="100%">
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
    </Box>
    <ComposerAttachmentCard onDismiss={() => {}}>
      <ChatAttachment attachmentIcon={<DownloadIcon decorative />}>
        <ChatAttachmentLink href="www.google.com">Document-FINAL.doc</ChatAttachmentLink>
        <ChatAttachmentDescription>123 MB</ChatAttachmentDescription>
      </ChatAttachment>
    </ComposerAttachmentCard>
    <ComposerAttachmentCard element="MY_COMPOSER_ATTACHMENT_CARD" onDismiss={() => {}}>
      <ChatAttachment element="MY_CHAT_ATTACHMENT" attachmentIcon={<DownloadIcon decorative />}>
        <ChatAttachmentLink element="MY_CHAT_ATTACHMENT_LINK" href="www.google.com">
          Document-FINAL.doc
        </ChatAttachmentLink>
        <ChatAttachmentDescription element="MY_CHAT_ATTACHMENT_DESCRIPTION">123 MB</ChatAttachmentDescription>
      </ChatAttachment>
    </ComposerAttachmentCard>
  </CustomizationProvider>
);
